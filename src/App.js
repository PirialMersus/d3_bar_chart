import React, {useState} from 'react';
import {scaleLinear, extent, format, scaleOrdinal} from 'd3';
import {useData} from "./hooks/useData";
import {AxisBottom} from "./components/AxisBottom";
import {AxisLeft} from "./components/AxisLeft";
import {Marks} from "./components/Marks";
import './App.css'
import 'react-dropdown/style.css';
import ReactDropdown from "react-dropdown";
import ColorLegend from "./components/ColorLegend";

const width = 960;
const menuHeight = 82;
const height = 500 - menuHeight;
const margin = {top: 20, bottom: 65, left: 90, right: 200}
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const circleRadius = 7
const coloLegendLabel = 'Species';
const fadeOpacity = 0.2;

const attributes = [
  {value: 'sepal_length', label: 'Sepal Length'},
  {value: 'sepal_width', label: 'Sepal Width'},
  {value: 'petal_length', label: 'Petal Length'},
  {value: 'petal_width', label: 'Petal Width'},
  {value: 'species', label: 'Species'}
];

const getLabel = (value) => {
  const neededAttribute = attributes.find(attribute => attribute.value === value)
  return neededAttribute.label
}


const App = () => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const initialXAttribute = 'petal_length'
  const [xAttribute, setXAttribute] = useState(initialXAttribute);


  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const initialYAttribute = 'sepal_width'
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  const xValue = d => d[xAttribute]
  const xAxisLabel = getLabel(xAttribute)

  const yValue = d => d[yAttribute]
  const yAxisLabel = getLabel(yAttribute)

  const colorValue = d => d.species

  const data = useData();
  if (!data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = data.filter(d => hoveredValue === colorValue(d));
  // d.sepal_length = +d.sepal_length;
  // d.sepal_width = +d.sepal_width;
  // d.petal_length = +d.petal_length;
  // d.petal_width = +d.petal_width;

  const siFormat = format('.2s')
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')


  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice()

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A'])

  const onHover = (domainValue) => {
    setHoveredValue(domainValue)
  }

  return (<>
      <div className='menus-container'>
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={option => setXAttribute(option.value)}
        />

        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={option => setYAttribute(option.value)}
        />
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />

          <text
            className='axis-label'
            // x={-yAxisLabelOffset}
            // y={innerHeight / 2}
            textAnchor='middle'
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
          <text
            className='axis-label'
            x={innerWidth / 2}
            textAnchor='middle'
            y={innerHeight + xAxisLabelOffset}
          >
            {xAxisLabel}
          </text>
          <g transform={`translate(${innerWidth + 60},60)`}>
            <text
              x={35}
              y={-25}
              className="axis-label"
              textAnchor="middle">
              {coloLegendLabel}
            </text>
            <ColorLegend fadeOpacity={fadeOpacity} hoveredValue={hoveredValue} onHover={onHover} tickTextOffset={12} colorScale={colorScale} tickSpacing={22}
                         tickSize={circleRadius}/>
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}

              xScale={xScale}
              xValue={xValue}

              yScale={yScale}
              yValue={yValue}

              colorScale={colorScale}
              colorValue={colorValue}

              tooltipFormat={xAxisTickFormat}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            data={filteredData}

            xScale={xScale}
            xValue={xValue}

            yScale={yScale}
            yValue={yValue}

            colorScale={colorScale}
            colorValue={colorValue}

            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </>
  );
};

export default App;
