import { useState } from "react";
import * as d3 from "d3";
import { Renderer } from "./Renderer";
import { Tooltip } from "./Tooltip";
import { COLORS, THRESHOLDS, COLOR_LEGEND_HEIGHT } from "./constants";
import { ColorLegend } from "./ColorLegend";
// import 'bulma/css/bulma.min.css';

export const Heatmap = ({ 
  width, 
  height,
  backgroundColor,
  data,
  getChildData,
  yTerms,
  yLabelJustify = 'right'
}) => {
  // COMPONENT STATE
  const [hoveredCell, setHoveredCell] = useState(null);
  const [showLegend, setShowLegend] = useState(true);
  const [yLabelAlign, setYLabelAlign] = useState(yLabelJustify);
  const [graphWidth, setGraphWidth] = useState(width);
  const [graphHeight, setGraphHeight] = useState(height);
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [marginLeft, setMarginLeft] = useState(450)
  const [showMissingData, setShowMissingData] = useState(true);

  // handle display property changes
  const updateGraphWidth = (event) => {
    setGraphWidth(event.target.value);
  }
  const updateGraphHeight = (event) => {
    setGraphHeight(event.target.value);
  }
  const updateShowLegend = () => {
    setShowLegend(!showLegend);
  }
  const updateYLabelWidth = (event) => {
    setMarginLeft(event.target.value);
  }
  const updateYLabelAlign = (event) => {
    setYLabelAlign(event.target.value);
  }
  const updateBgColor = (event) => {
    setBgColor(event.target.value);
  }
  const updateShowMissingData = () => {
    setShowMissingData(!showMissingData);
  }

  // DEBUG: remove console log in prod
  console.log(`[Heatmap] yTerms:\n${JSON.stringify(yTerms)}`);
  console.log(`[Heatmap] data:\n${JSON.stringify(data)}`);

  const tprops = {};

  function prepYLabelsHierarchically(terms) {
    // Helper function to recursively traverse the array
    function traverse(node) {
      if (!node || !Array.isArray(node)) return [];
  
      // Add property to each element in the current level
      return node.map(item => {
        if (!(item.id in tprops)) {
          tprops[item.id] = {};
        }
        const newItem = JSON.parse(JSON.stringify(item)); // { ...item };
        newItem.children = traverse(newItem.children); // Recursively traverse children
        newItem.isPopulated = false;
        if ((data.filter(d => (d.y === item.label)).length > 0) || newItem.children.some(c => c.isPopulated)) {
          newItem.isPopulated = true;
          tprops[item.id].isPopulated = true
        }
        newItem.hasBeenQueried = false; // Has data for children been retrieved?
        newItem.isExpanded = (item.children.length > 0); // Are there child terms to be displayed?
        // console.log(`[Heatmap] prepYLabelsHierarchically:\n${JSON.stringify(newItem)}`);
        return newItem;
      });
    }
  
    // Start traversal from the root
    return traverse(terms);
  }
  // const yLabels = yTerms;
  const yLabels = prepYLabelsHierarchically(yTerms);
  // TODO: debug - why is "isPopulated" property not passed on correctly to Renderer?
  // DEBUG: remove console log in prod
  console.log(`[Heatmap] yLabels:\n${JSON.stringify(yLabels)}`);
  const yLabelsCopy = JSON.parse(JSON.stringify(yLabels));
  console.log(`[Heatmap] yLabelsCopy:\n${JSON.stringify(yLabelsCopy)}`);
  const [drilldown, setDrilldown] = useState(yLabelsCopy);
  console.log(`[Heatmap] drilldown:\n${JSON.stringify(drilldown)}`);

  console.log(`[Heatmap] tprops:\n${JSON.stringify(tprops)}`);
  // const [termProps, setTermProps] = useState(tprops);
  const termProps = tprops;  

  // Color scale is computed here bc it must be passed to both the renderer and the legend
  const values = data
    .map((d) => d.value)
    .filter((d) => d !== null);
  const max = d3.max(values) || 0;

  const colorScale = d3
  .scaleLinear()
    // .scaleLinear<string>()
    .domain(THRESHOLDS)
    .domain(THRESHOLDS.map((t) => t * max))  // rescale the legend to the max value
    .range(COLORS);

  // sort entries by y coordinate
  const displayData = data.sort((a, b) => a.y.localeCompare(b.y));

  return (
    <>
      <div style={{ position: "relative", backgroundColor: bgColor }}>
        <Renderer
          width={graphWidth}
          height={graphHeight - COLOR_LEGEND_HEIGHT}
          backgroundColor={bgColor}
          data={displayData}
          getChildData={getChildData}
          yTerms={yTerms}
          drilldown={drilldown}
          termProps={termProps}
          setHoveredCell={setHoveredCell}
          setDrilldown={setDrilldown}
          colorScale={colorScale}
          marginLeft={marginLeft}
          yLabelJustify={yLabelAlign}
          showMissingData={showMissingData}
        />

        <Tooltip
          interactionData={hoveredCell}
          width={graphWidth}
          height={graphHeight - COLOR_LEGEND_HEIGHT}
        />

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {
          showLegend ?
            <ColorLegend
              height={COLOR_LEGEND_HEIGHT}
              width={200}
              backgroundColor={bgColor}
              colorScale={colorScale}
              interactionData={hoveredCell}
            />
          : null
        }
        </div>
      </div>
      
      <div className="columns">
        <div className="column">
          <h1>DISPLAY</h1>
          <table>
            <tbody>
              <tr>
                <td>Graph width:</td>
                <td>
                  <input 
                    type="text"
                    size="10"
                    value={graphWidth}
                    onChange={updateGraphWidth}
                  />
                </td>
              </tr>
              <tr>
                <td>Graph height:</td>
                <td>
                  <input 
                    type="text"
                    size="10"
                    value={graphHeight}
                    onChange={updateGraphHeight}
                  />
                </td>
              </tr>
              <tr>
                <td>Show Legend:</td>
                <td>
                  <input
                    type="checkbox"
                    checked={showLegend}
                    onChange={updateShowLegend}
                  />
                </td>
              </tr>
              <tr>
                <td>Y label width:</td>
                <td>
                  <input 
                    type="text"
                    size="10"
                    value={marginLeft}
                    onChange={updateYLabelWidth}
                  />
                </td>
              </tr>
              <tr>
                <td>Y label justify:</td>
                <td>
                  <select value={yLabelAlign} onChange={updateYLabelAlign}>
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="column">
          <h1>STYLE</h1>
          <table>
            <tbody>
              <tr>
                <td>background-color:</td>
                <td>
                <input 
                    type="text"
                    size="10"
                    value={bgColor}
                    onChange={updateBgColor}
                  />
                </td>
              </tr>
            </tbody>
            </table>
        </div>
        <div className="column">
          <h1>DATA</h1>
          <table>
            <tbody>
              <tr>
                <td>Show missing data:</td>
                <td>
                  <input
                    type="checkbox"
                    checked={showMissingData}
                    onChange={updateShowMissingData}
                  />
                </td>
              </tr>
            </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default Heatmap;