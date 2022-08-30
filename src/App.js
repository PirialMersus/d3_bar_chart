import React, {} from 'react';
import {useWorldAtlas} from "./hooks/useWorldAtlas";
import {useData} from "./hooks/useData";
import {scaleSqrt, max} from 'd3'

import {Marks} from "./components/Marks";
import './App.css'

const width = 960;
const height = 500;


const App = () => {

  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = (d) => d['Total Dead and Missing'];
  const maxRadius = 15

  const sizeScale = scaleSqrt()
    .domain([0, max(data,sizeValue)])
    .range([0, maxRadius])

  return (
    <svg width={width} height={height}>
      <Marks
        data={data}
        worldAtlas={worldAtlas}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};

export default App;
