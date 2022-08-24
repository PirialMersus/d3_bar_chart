import React, {} from 'react';
import {useWorldAtlas} from "./hooks/useWorldAtlas";
import {useCities} from "./hooks/useCities";
import {scaleSqrt, max} from 'd3'

import {Marks} from "./components/Marks";
import './App.css'

const width = 960;
const height = 500;


const App = () => {

  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = (d) => d.population;
  const maxRadius = 15

  const sizeScale = scaleSqrt()
    .domain([0, max(cities,sizeValue)])
    .range([0, maxRadius])

  return (
    <svg width={width} height={height}>
      <Marks
        cities={cities}
        worldAtlas={worldAtlas}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};

export default App;
