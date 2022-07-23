import React from "react";
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3'

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

export const Marks = ({data: {land, interiors}}) => {
  // console.log(data.features)
  return (<g className='marks'>
    <path className='sphere' d={path({type: 'Sphere'})}/>
    <path className='graticules' key={Math.random()} d={path(graticule())}/>
    {
      land.features.map((feature) => (
        <path className='land' key={Math.random()} d={path(feature)}/>
      ))}
    <path className='interiors' d={path(interiors)}/>

  </g>)
}