import React from "react";
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3'

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

export const Marks = ({
                        worldAtlas: {land, interiors},
                        cities,
                        sizeScale,
                        sizeValue
                      }) => {
  // console.log('cities', cities)
  return (<g className='marks'>
    <path className='sphere' d={path({type: 'Sphere'})}/>
    <path className='graticules' key={Math.random()} d={path(graticule())}/>
    {
      land.features.map((feature) => (
        <path className='land' key={Math.random()} d={path(feature)}/>
      ))}
    <path className='interiors' d={path(interiors)}/>
    {cities.map(d => {
      const [x, y] = projection([d.lng, d.lat])
      return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))}/>
    })}
  </g>)
}