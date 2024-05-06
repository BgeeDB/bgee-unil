import { useMemo } from "react";
import * as d3 from "d3";
// import styles from "./renderer.module.css";

const MARGIN = { top: 10, right: 10, bottom: 50, left: 200 };

export const Renderer = ({
  width,
  height,
  data,
  getChildData,
  yTerms,
  drilldown,
  termProps,
  setHoveredCell,
  setDrilldown,
  colorScale,
  marginLeft,
  yLabelJustify,
  showMissingData
}) => {
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - marginLeft;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // show only selected and top-level data points
  const dataShow = data.filter((d) => (
    d.ylvl === 0 || (drilldown && drilldown.expanded.has(d.y))
  ));

  // TODO: debug - why is "isPopulated" property not passed on correctly from Heatmap??
  // DEBUG: remove console log in prod
  console.log(`[Renderer] drilldown:\n${JSON.stringify(drilldown)}`);
  console.log(`[Renderer] termProps:\n${JSON.stringify(termProps)}`);

  // reorder y-axis terms according to hierarchy
  function orderLabelsHierarchically(objectList) {
    const orderedLabels = [];

    function traverse(children, depth, visible, embedLvls) {
      if (!children || !Array.isArray(children)) return;

      // Sort the children based on the label
      children.sort((a, b) => a.label.localeCompare(b.label));
  
      // Push the labels at the current depth
      children.forEach((child, idx, arr) => {
        if (visible && (termProps[child.id].isPopulated || showMissingData)) {
          const newLabel = { 
            id: child.id, 
            label: child.label, 
            depth, isPopulated: 
            child.isPopulated, 
            isExpanded: child.isExpanded, 
            isLastChild: (idx === arr.length-1),
            embeddedInLvls: (idx === arr.length-1) ? [...(embedLvls.filter(x => x!==depth))] : [...embedLvls],
          }
          orderedLabels.push(newLabel);
          traverse(child.children, depth + 1, child.isExpanded, [...(newLabel.embeddedInLvls), depth+1]);
        } else {
          // DEBUG: remove console log in prod
          console.log(`[Renderer] not visible:\n${JSON.stringify(child)}`);
        }
      });
    }
  
    // Start traversal from the root
    traverse(objectList, 0, true, []);
  
    return orderedLabels;
  }
  const drilldownCopy = JSON.parse(JSON.stringify(drilldown));
  const yTermsOrdered = orderLabelsHierarchically(drilldownCopy);
  // TODO: filter out missing data?
  const yTermsOrderedCopy = JSON.parse(JSON.stringify(yTermsOrdered));
  const yLblOrdered = yTermsOrderedCopy;

  // updates component state!
  const updateDrilldown = (termId) => {
  // DEBUG: remove console log in prod
    console.log(`[Heatmap Renderer] UpdateDrilldown:\n${termId}`);

    function updateExpandedStateHierarchically(terms) {
      // Helper function to recursively traverse the array
      function traverse(node) {
        if (!node || !Array.isArray(node)) return []; // break condition
    
        // Add property to each element in the current level
        return node.map(item => {
          const newItem = JSON.parse(JSON.stringify(item)); // { ...item };
          if (item.id === termId) {
            // get data for descendants
            if (!newItem.isExpanded && !item.hasBeenQueried) {
              console.log(`[Heatmap Renderer] UpdateDrilldown - get child data for:\n${termId}`);
              getChildData(termId);
              newItem.hasBeenQueried = true;
            }
            newItem.isExpanded = !item.isExpanded; // Flip expanded state
            // newItem.isPopulated = item.isPopulated; // Keep populated state
            newItem.isPopulated = 5; // TEST
          }
          newItem.children = traverse(newItem.children); // Recursively traverse children
          if (item.termId === termId) {
            // DEBUG: remove console log in prod
            console.log(JSON.stringify(newItem));
          }
          return newItem;
        });
      }
    
      // Start traversal from the root
      return traverse(terms);
    }

    const newDrilldown = updateExpandedStateHierarchically(drilldown);
    setDrilldown(newDrilldown);
  }

  // const allYGroups = useMemo(() => [...new Set(dataShow.map((d) => d.y))], [dataShow]);
  const allXGroups = useMemo(() => [...new Set(dataShow.map((d) => d.x))], [dataShow]);
  const allYGroups = useMemo(() => [...new Set(yLblOrdered.map((d) => d.label))], [yLblOrdered]);

  const [min = 0, max = 0] = d3.extent(data.map((d) => d.value)); // extent can return [undefined, undefined], default to [0,0] to fix types

  const xScale = useMemo(() => (
    d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01)
  ), [dataShow, width]);

  const yScale = useMemo(() => (
    d3
      .scaleBand()
      .range([0, boundsHeight])
      .domain(allYGroups)
      .padding(0.01)
  ), [dataShow, height]);

  /*
  var colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([min, max]);
  */

  // Build the rectangles
  const allShapes = dataShow.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);
    if (d.value === null || !x || !y) {
      return null;
    }
    const idx = i;

    return (
      <rect
        key={idx}
        r={4}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={d.isExpressed ? colorScale(d.value) : '#cccccc'}
        rx={5}
        stroke="white"
        onMouseEnter={(e) => {
          setHoveredCell({
            xLabel: `group ${d.x}`,
            yLabel: `group ${d.y}`,
            xPos: x + xScale.bandwidth() + marginLeft,
            yPos: y + xScale.bandwidth() / 2 + MARGIN.bottom,
            value: Math.round(d.value * 100) / 100,
            isExpressed: d.isExpressed,
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        cursor="pointer"
        // onClick={() => updateDrilldown(d.y)}
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const x = xScale(name);
    const xCoord = x + xScale.bandwidth() / 2;
    const yCoord = boundsHeight + 10 + (i % 2) * 20; // stagger x labels

    if (!x) {
      return null;
    }

    const idx = i;
    return (
      <text
        key={idx}
        x={xCoord}
        y={yCoord}
        textAnchor="middle"
        dominantBaseline="middle"             
        fontSize={15}
        // transform="`rotate(-10) translate(${xCoord}, ${yCoord})`"
      >
        {name}
      </text>
    );
  });

  // const yLabels = allYGroups.map((name, i) => {
  const yLabels = yLblOrdered.map((term, i) => {
    const y = yScale(term.label);

    if (!y) {
      return null;
    }
  
    const idx = i;
    // Calculate x position based on yLabelJustify
    const xPos = yLabelJustify === "left" ? -1 * marginLeft : -5;
    const anchor = yLabelJustify === "left" ? "start" : "end";
    // Calculate y position
    const yPos = y + yScale.bandwidth() / 2;
    // Change display depending on hierarchical level
    let lblTree = '';
    let lblIndicator = '';
    const lblTerm = term.label;
    if (term.depth > 0) {
      lblIndicator = '?'; // '(?)';
      if (term.isExpanded) lblIndicator = '\u{025B3}'; // '^'
      else if(term.hasBeenQueried) lblIndicator = '\u{025BD}'; // 'v';

      if (yLabelJustify === "left") {
        lblTree = `${'-'.repeat(2*term.depth)}${lblIndicator} ${term.label}`;
      }
      else {
        let postfix = '';
        for (let lvl=1; lvl <= term.depth; lvl+=1) {
          if (lvl === term.depth) {
            if (term.isLastChild) {
              postfix = `\u{02500}\u{02518}${postfix}`; // lower-right corner
            } else {
              // postfix = `\u{02500}\u{02525}${postfix}`;
              postfix = `\u{02500}\u{02524}${postfix}`; // t-crossing left
            }
          } else if (term.embeddedInLvls.includes(lvl)) {
            // postfix = `\u{02500}\u{02502}${postfix}`;
            postfix = `\u{000A0}\u{02502}${postfix}`; // vertical line
          } else {
            postfix = `\u{000A0}\u{000A0}${postfix}`; // blank space
          }
        }
        // displayText = `${term.label} ${indicator}${'-'.repeat(2*term.depth)}`;
        lblTree = `${postfix}`;
      }
    }
    console.log(`[Renderer] yLabel: ${JSON.stringify(term)}`);
       
      // term.label + '\u{02518}' // '.'.repeat(2*term.depth);
      // term.label + ' '.repeat(2*term.depth);

    return (
      <text
        key={idx}
        x={xPos}
        y={yPos}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize={15}
        fontFamily="monospace"
        onClick={() => updateDrilldown(term.id)}
      >
        <tspan fontFamily="sans-serif">{lblTerm} </tspan>
        <tspan fill="red">{lblIndicator}</tspan>
        {lblTree}
      </text>
    );
  });

  return (
    <svg width={width} height={height} style={{ backgroundColor: 'white' }}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[marginLeft, MARGIN.top].join(",")})`}
      >
        {allShapes}
        {xLabels}
        {yLabels}
      </g>
    </svg>
  );
};

export default Renderer;