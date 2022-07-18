import React, {} from 'react';
import {scaleBand, scaleLinear, extent, format} from 'd3';
import {useData} from "./hooks/useData";
import {AxisBottom} from "./components/AxisBottom";
import {AxisLeft} from "./components/AxisLeft";
import {Marks} from "./components/Marks";
import './App.css'

const width = 960;
const height = 500;
const margin = {top: 20, bottom: 65, left: 90, right: 30}
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;


const App = () => {

  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }
  // console.log(data[0]);
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.sepal_length
  const xAxisLabel = 'Sepal Length'

  const yValue = d => d.sepal_width
  const yAxisLabel = 'Sepal Width'


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

  return (
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
  );
};

export default App;
