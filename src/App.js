import React, {} from 'react';
import {scaleBand, scaleLinear, max} from 'd3';
import {useData} from "./hooks/useData";
import {AxisBottom} from "./components/AxisBottom";
import {AxisLeft} from "./components/AxisLeft";
import {Marks} from "./components/Marks";

const width = 960;
const height = 500;
const margin = {top: 20, bottom: 20, left: 200, right: 20}


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

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight}/>
        <AxisLeft yScale={yScale}/>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default App;
