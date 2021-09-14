import * as d3Proj from 'd3-geo-projection'
import * as d3Main from 'd3'
import exports from '../../data/export.json'
const d3 = {...d3Proj, ...d3Main}

/* drawTradeLines and highlightCountries: functions that help update the map */
const drawTradeLines = (projection, data) => {
  d3.select('svg#map')
    .selectAll('path.tradeLines')
    .data(data)
    .join(
      (enter) =>
        enter
          .append('path')
          .attr('d', (d) =>
            d3.line()([
              projection(d.centroids.coordinates),
              projection(d.interp(0)),
            ]),
          )
          .attr('stroke-width', (d) => 3 * d.export_value)
          .attr('stroke-opacity', (d) =>
            Math.max(d.export_value / 7.2 + 0.4, 1),
          )
          .attr('stroke', 'black')
          .attr('stroke-dasharray', '20 20')
          .attr('fill', 'none')
          .attr('class', 'tradeLines'),
      (update) =>
        update.attr('d', (d) =>
          d3.line()([
            projection(d.centroids.coordinates),
            projection(d.partner_centroids.coordinates),
          ]),
        ),
      (exit) =>
        exit.transition().duration(100).attr('stroke-opacity', 0).remove(),
    )
}

const highlightCountries = (yr, data) => {
  const traders = data.map((d) => d.partner_code)
  d3.selectAll('path.nation')
    .transition()
    .duration(250)
    .style('fill', (d) => {
      const loans = d.properties.info[0]

      //if there's a loan for this country that was given in
      // the year matching the slider input, highlight it red
      if (
        Array.isArray(loans) &&
        loans?.some((loan) => yr.toString() === loan.date.substring(0, 4))
      ) {
        return '#C93135'
      }
      //if it's a trade partner (i.e. one of the top
      // export-receiving/importing countries) color it blue
      if (traders.includes(d.properties.imf_code)) return '#1375B7'
      //otherwise, color it green
      return '#7AB199'
    })
}

const updateMap = (projection) => {
  const yr = +d3.select('#slider').node().value
  const data = exports.filter((d) => d.year === yr)
  drawTradeLines(projection, data)
  highlightCountries(yr, data)
}

export default updateMap
