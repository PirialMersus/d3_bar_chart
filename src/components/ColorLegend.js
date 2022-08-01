const ColorLegend = ({fadeOpacity, hoveredValue, onHover, tickTextOffset = 20, colorScale, tickSpacing = 20, tickSize = 10}) => {

  return colorScale.domain().map((domainValue, i) => {
    return (
      <g
        opacity={!hoveredValue || hoveredValue === domainValue ? 1 : fadeOpacity}
        onMouseEnter={() => onHover(domainValue)}
        onMouseOut={() => onHover(null)}
        className='tick' transform={`translate(0,${i * tickSpacing})`}>
        <circle fill={colorScale(domainValue)} r={tickSize}/>
        <text x={tickTextOffset} dy=".32em">{domainValue}</text>
      </g>
    )
  })
}
export default ColorLegend;