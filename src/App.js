import React, {} from 'react';
import {scaleTime, scaleLinear, extent, timeFormat, bin, timeMonths, sum, max} from 'd3';
import {useData} from "./hooks/useData";
import {AxisBottom} from "./components/AxisBottom";
import {AxisLeft} from "./components/AxisLeft";
import {Marks} from "./components/Marks";
import './App.css'

const width = 960;
const height = 500;
const margin = {top: 20, bottom: 65, left: 90, right: 30}
const xAxisLabelOffset = 80;
const yAxisLabelOffset = 45;


const App = () => {

  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d['Reported Date']
  const xAxisLabel = 'Time'

  const yValue = d => d['Total Dead and Missing']
  const yAxisLabel = 'Total Dead and Missing'

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();



  const [start, stop] = xScale.domain()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }) )

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])

  console.log('yScale.domain()', yScale.domain())
  // console.log(data[0]);

  // d['Total Dead and Missing'] = +d['Total Dead and Missing'];
  // d['Reported Date'] = new Date(d['Reported Date'])


  // d.sepal_length = +d.sepal_length;
  // d.sepal_width = +d.sepal_width;
  // d.petal_length = +d.petal_length;
  // d.petal_width = +d.petal_width;

  const xAxisTickFormat = timeFormat('%m/%d/%Y')


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
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={d => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  );
};

export default App;
