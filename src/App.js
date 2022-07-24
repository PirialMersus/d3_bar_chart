import React, {useState} from 'react';
import {scaleBand, scaleLinear, extent, format} from 'd3';
import {useData} from "./hooks/useData";
import {AxisBottom} from "./components/AxisBottom";
import {AxisLeft} from "./components/AxisLeft";
import {Marks} from "./components/Marks";
import './App.css'
import {Dropdown} from "./components/Dropdown";

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = {top: 20, bottom: 65, left: 90, right: 30}
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

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
  const initialXAttribute = 'petal_length'
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute]
  const xAxisLabel = getLabel(xAttribute)

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const initialYAttribute = 'sepal_width'
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute]
  const yAxisLabel = getLabel(yAttribute)

  const data = useData();
  if (!data) {
    return <pre>Loading...</pre>;
  }


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

  return (<>
      <label htmlFor="x-select">X</label>
      <Dropdown
        options={attributes}
        id="x-select"
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <label htmlFor="y-select">Y</label>
      <Dropdown
        options={attributes}
        id="y-select"
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
      />
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
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </>
  );
};

export default App;
