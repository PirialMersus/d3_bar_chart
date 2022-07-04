import React, {} from 'react';
import {scaleBand, scaleLinear, max, format} from 'd3';
import {useData} from "./hooks/useData";
import {AxisBottom} from "./components/AxisBottom";
import {AxisLeft} from "./components/AxisLeft";
import {Marks} from "./components/Marks";
import './App.css'

const width = 960;
const height = 500;
const margin = {top: 20, bottom: 65, left: 220, right: 30}
const xAxisLabelOffset = 50;


const App = () => {

  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }
  // console.log(data[0]);
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = d => d.Country
  const xValue = d => d.Population

  const siFormat = format('.2s')
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.2)

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}/>
        <AxisLeft yScale={yScale}/>
        <text
          className='axis-label'
          x={innerWidth / 2}
          textAnchor='middle'
          y={innerHeight + xAxisLabelOffset}
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

export default App;
