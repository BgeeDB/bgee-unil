import { useState, useRef, useMemo, useEffect } from "react";
import * as d3 from "d3";
import Bulma from '../../../../../components/Bulma';
import { Renderer } from "./Renderer";
import { Tooltip } from "./Tooltip";
import { DetailView } from "./DetailView";
import { COLORS, THRESHOLDS, COLOR_LEGEND_HEIGHT } from "./constants";
import { ColorLegend } from "./ColorLegend";
// import 'bulma/css/bulma.min.css';

export const Heatmap = ({ 
  width, 
  height,
  backgroundColor,
  data,
  getChildData,
  getHomologsData,
  yTerms,
  // setYTerms,
  termProps,
  // setTermProps,
  yLabelJustify = 'right',
  onToggleExpandCollapse,
}) => {
  // COMPONENT STATE
  const [hoveredCell, setHoveredCell] = useState(null);
  const [clickedCell, setClickedCell] = useState(null);
  const [showLegend, setShowLegend] = useState(true);
  const [yLabelAlign, setYLabelAlign] = useState(yLabelJustify);
  const [graphWidth, setGraphWidth] = useState(width);
  const [graphHeight, setGraphHeight] = useState(height);
  const [colorPalette, setColorPalette] = useState('viridis');
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [marginLeft, setMarginLeft] = useState(200);
  const [showDescMax, setShowDescMax] = useState('none');
  const [showMissingData, setShowMissingData] = useState(true);
  const [showHomologs, setShowHomologs] = useState(false);
  const [drilldown, setDrilldown] = useState([]);
  const [showSettings, setShowSettings] = useState(false);


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
  const updateColorPalette = (event) => {
    setColorPalette(event.target.value);
  }
  const updateBgColor = (event) => {
    setBgColor(event.target.value);
  }
  const updateShowDescMax = (event) => {
    setShowDescMax(event.target.value);
  }
  const updateShowMissingData = () => {
    setShowMissingData(!showMissingData);
  }
  const updateShowHomologs = () => {
    setShowHomologs(!showHomologs);
    getHomologsData();
  }
  const updateShowSettings = () => {
    setShowSettings(!showSettings);
  };

  // DEBUG: remove console log in prod
  // console.log(`[Heatmap] yTerms:\n${JSON.stringify(yTerms, null, 2)}`);
  console.log(`[Heatmap] data:\n${JSON.stringify(data)}`);

  // prepare initial drilldown state
  useEffect(() => {    
    // setDrilldown(yLabels);
    setDrilldown(yTerms);
  }, []);

  // choose plot dimensions based on number of visible terms (y axis) and longest term label
  useEffect(() => {
    console.log(`[Heatmap] (Re)calculating graph height...`);
    // console.log(`[Heatmap] drilldown:\n${JSON.stringify(drilldown)}`);
    function countVisibleTerms(terms) {
      let count = 0;
      let maxLabelLength = 0;
    
      function traverse(item) {
        count += 1;
        maxLabelLength = Math.max(maxLabelLength, item.label.length);
        if (item.isExpanded) {
          if (item.children && item.children.length > 0) {
            item.children.forEach(traverse);
          }
        }
      }
    
      terms.forEach(traverse);
      return { count, maxLabelLength };
    }

    const { count: numVisibleTerms, maxLabelLength}  = countVisibleTerms(yTerms);
    console.log(`[Heatmap] ${numVisibleTerms} visible terms`);
    console.log(`[Heatmap] drilldown:\n${JSON.stringify(yTerms, null, 2)}`);
    const flexHeight = Math.max(numVisibleTerms * 20 + COLOR_LEGEND_HEIGHT, 250);
    setGraphHeight(flexHeight);
    setMarginLeft(maxLabelLength * 7 + 50);
  }, [yTerms]);

  // Color scale is computed here bc it must be passed to both the renderer and the legend
  const values = data
    .map((d) => d.value)
    .filter((d) => d !== null);
  const max = d3.max(values) || 0;

  // make sure both Renderer and ColorLegend re-render when updating colorPalette
  const colors = COLORS[colorPalette];
  const colorScale = d3
      .scaleLinear()
      // .scaleLinear<string>()
      .domain(THRESHOLDS)
      .domain(THRESHOLDS.map((t) => t * max))  // rescale the legend to the max value
      .range(colors);
  
  // sort entries by y coordinate
  const displayData = data.sort((a, b) => a.y.localeCompare(b.y));

  const downloadTsv = () => {
    if (!data) return;

    // Extract headers from the first object
    const headers = Object.keys(data[0]);

    // Convert headers to a tab-separated string
    const headerString = headers.join("\t");

    // Convert each JSON object to a tab-separated string
    const dataStrings = data.map(obj => (
      headers.map(header => obj[header]).join("\t")
    ));


    // Combine headers and data strings into a single string
    const tsvString = [headerString, ...dataStrings].join("\n");

    
    const tsvBlob = new Blob([tsvString], { type: 'text/tab-separated-values;charset=utf-8' });
    const tsvUrl = URL.createObjectURL(tsvBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = tsvUrl;
    downloadLink.download = 'Bgee-genex-heatmap.tsv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const svgRef = useRef();
  const downloadSvg = () => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'Bgee-genex-heatmap.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  

  return (
    <>
      <div style={{ position: "relative", backgroundColor: bgColor }}>

      <div className="my-2 is-flex is-justify-content-flex-end">
        <Bulma.Button
          className="download-btn is-small"
          onClick={downloadTsv}
          renderAs="a"
          target="_blank"
          rel="noreferrer"
        >
          Download data as TSV
          <span className="icon is-small ml-1">
            <ion-icon name="download-outline" />
          </span>
        </Bulma.Button>
      </div>

      <div className="my-2 is-flex is-justify-content-flex-end">
        <Bulma.Button
          className="download-btn is-small"
          onClick={downloadSvg}
          renderAs="a"
          target="_blank"
          rel="noreferrer"
        >
          Export current plot as SVG
          <span className="icon is-small ml-1">
            <ion-icon name="download-outline" />
          </span>
        </Bulma.Button>
      </div>

      <div className="columns">
      <div className="column">
      <Renderer
        ref={svgRef}
        width={graphWidth}
        height={graphHeight - COLOR_LEGEND_HEIGHT}
        backgroundColor={bgColor}
        data={displayData}
        getChildData={getChildData}
        yTerms={yTerms}
        // drilldown={drilldown}
        drilldown={yTerms}
        termProps={termProps}
        // termProps={termPropsRef.current}
        hoveredCell={hoveredCell}
        setHoveredCell={setHoveredCell}
        clickedCell={clickedCell}
        setClickedCell={setClickedCell}
        // setDrilldown={setDrilldown}
        // setDrilldown={setYTerms}
        // setTermProps={setTermProps}
        onToggleExpandCollapse={onToggleExpandCollapse}
        colorScale={colorScale}
        marginLeft={marginLeft}
        yLabelJustify={yLabelAlign}
        showLegend={showLegend}
        showMissingData={showMissingData}
        showDescMax={showDescMax}
        colorLegendWidth={200}
        colorLegendHeight={COLOR_LEGEND_HEIGHT}
      />

      <Tooltip
        interactionData={hoveredCell}
        width={graphWidth}
        height={graphHeight - COLOR_LEGEND_HEIGHT}
      />
      </div>
      <div className="column" style={{ position: 'relative', zIndex: 2 }}>
      <DetailView
        interactionData={clickedCell}
        xPos={0}
        yPos={0}
        width={500}
        height={graphHeight}
        style={{ position: 'relative' }}
      />
      </div>
      </div>
    </div>
      
    <div className="card"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <header className="card-header">
        <p className="card-header-title">
          Settings
          <span style={{ marginLeft: "10px" }} />
          <a href="#collapsible-settings" data-action="collapse" onClick={updateShowSettings}>
            {showSettings ? "Collapse" : "Expand"}
          </a>
        </p>
      </header>

      <div 
        id="collapsible-settings" 
        className={`is-collapsible ${showSettings ? "is-active" : ""}`}
      >
      {showSettings ? 
        <div className="card-content">
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
                    <td>color palette:</td>
                    <td>
                      <select value={colorPalette} onChange={updateColorPalette}>
                          <option value="magma">magma</option>
                          <option value="inferno">inferno</option>
                          <option value="plasma">plasma</option>
                          <option value="viridis">viridis</option>
                          <option value="cividis">cividis</option>
                          <option value="rocket">rocket</option>
                          <option value="mako">mako</option>
                          <option value="turbo">turbo</option>
                        </select>
                    </td>
                  </tr>
                  <tr>
                    <td>background color:</td>
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
                  <tr>
                    <td>Show homologs:</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={showHomologs}
                        onChange={updateShowHomologs}
                      />
                    </td>
                  </tr>
                  { false ? (
                  <tr>
                    <td>Show max. descendant score as:</td>
                    <td>
                      <select value={showDescMax} onChange={updateShowDescMax}>
                          <option value="border">border</option>
                          <option value="center">center</option>
                          <option value="split">split cell</option>
                          <option value="none">none</option>
                        </select>
                    </td>
                  </tr>
                  ): null
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      : null}
      </div>
    </div>

    </>
  );
};

export default Heatmap;