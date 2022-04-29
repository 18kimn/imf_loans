import {Trade} from './types'
import {select, selectAll} from 'd3-selection'
import {geoInterpolate, GeoProjection} from 'd3-geo'
import {line} from 'd3-shape'

/*

This file contains functions to update the map
depicting trade relationships between
IMF loan recipient countries and their export partners.

By "update", I mean that when the slider for the year viewed changes
colors on the map and lines showing which countries received
loans where they sent their exports must change.
This handles that logic.

*/

const drawTradeLines = (
    projection: d3.GeoProjection,
    data: Trade[],
) => {
  select('svg#map')
      .selectAll('path.tradeLines')
      .data(data)
      .join(
          (enter) =>
            enter
                .append('path')
                .attr('d', (d: Trade) => {
                  return line()([
                    projection(d.centroids.coordinates) || [0, 0],
                    projection(d.interp && d.interp(0)) || [0, 0],
                  ])
                })
                .attr('stroke-width', (d) => 3 * d.export_value)
                .attr('stroke-opacity', (d) =>
                  Math.max(d.export_value / 7.2 + 0.4, 1),
                )
                .attr('stroke', 'black')
                .attr('stroke-dasharray', '20 20')
                .attr('fill', 'none')
                .attr('class', 'tradeLines'),
          (update) =>
            update.attr('d', (d: Trade) =>
              line()([
                projection(d.centroids.coordinates) || [0, 0],
                projection(d.partner_centroids.coordinates) || [0, 0],
              ]),
            ),
          (exit) =>
            exit
                .transition()
                .duration(100)
                .attr('stroke-opacity', 0)
                .remove(),
      )
}

const highlightCountries = (yr: number, data: Trade[]) => {
  const traders = data.map((d) => d.partner_code)
  selectAll('path.nation')
      .transition()
      .duration(250)
      .style('fill', (d: any) => {
        const loans = d.properties!.info[0]
        // if there's a loan for this country that was given in
        // the year matching the slider input, highlight it red
        if (
          Array.isArray(loans) &&
        loans?.some(
            (loan) => yr.toString() === loan.date.substring(0, 4),
        )
        ) {
          return '#C93135'
        }
        // if it's a trade partner (i.e. one of the top
        // export-receiving/importing countries) color it blue
        if (traders.includes(d.properties!.imf_code)) return '#1375B7'
        // otherwise, color it green
        return '#7AB199'
      })
}

const updateMap = async (projection: GeoProjection, year = 1993) => {
  const trades = (await fetch('/data/export.json').then((res) =>
    res.json(),
  )) as unknown as Trade[]

  const data = trades.filter((d: Trade) => d.year === Number(year))

  data.forEach((d: Trade) => {
    d.interp = geoInterpolate(
        d.centroids.coordinates,
        d.partner_centroids.coordinates,
    )
  })
  console.log({trades, data, year})
  drawTradeLines(projection, data)
  highlightCountries(year, data)
}

export default updateMap
