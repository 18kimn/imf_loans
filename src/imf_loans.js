import exports from './data/export.json'
import imf from './data/imf.json'

import * as d3Proj from 'd3-geo-projection'
import * as d3Inertia from 'd3-inertia'
import * as d3Main from 'd3'
const d3 = {...d3Proj, ...d3Inertia, ...d3Main}
/* globals */
const config = {
  speed: 0.005,
  verticalTilt: -15,
  horizontalTilt: -15,
}
const projection = d3
  .geoOrthographic()
  .translate([(window.innerWidth * 0.7) / 2, window.innerHeight / 2])
  .scale((window.innerWidth * 0.7) / 3)
const path = d3.geoPath().projection(projection)
const graticule = d3.geoGraticule().step([10, 10])

/* drawTradeLines and highlightCountries: functions that help update the map */
const drawTradeLines = (data) => {
  console.log(data)
  const d = data[0]
  console.log({
    d: d3.line()([
      projection(d.centroids.coordinates),
      projection(d.interp(0)),
    ]),
    strokewidth: 3 * d.export_value,
  })
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

const updateMap = () => {
  const yr = +d3.select('#slider').node().value
  const data = exports.filter((d) => d.year === yr)
  drawTradeLines(data)
  highlightCountries(yr, data)
}

const drawMap = () => {
  const svg = d3.select('#mapcontainer').append('svg').attr('id', 'map')
  const g = svg.append('g')
  svg.call(() => d3.zoom().scaleExtent([0.1, 8]).on('zoom', zoomed))
  let focusedCountry,
    lastTransform,
    lastTime = d3.now()

  // creates interpolation functions between the exporters and the importers
  // to determine how lines should be drawn
  exports.forEach((d) => {
    d.interp = d3.geoInterpolate(
      d.centroids.coordinates,
      d.partner_centroids.coordinates,
    )
  })

  const outline = g
    .append('path')
    .datum({type: 'Sphere'})
    .attr('id', 'outline')
    .attr('d', path)

  // Graticule lines (behind the land)
  const gratLines = g
    .selectAll('path.graticule')
    .data([graticule()])
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'graticule')

  const countryShapes = g
    .selectAll('path.nation')
    .data(imf.features)
    .enter()
    .append('path')
    .attr('class', 'nation')
    .attr('d', path)
    .on('mousemove', (_, d) => {
      focusedCountry = d
      const centroid = path.centroid(d)
      svg.selectAll('.countryLabel').remove()

      if (isNaN(centroid[0])) return
      svg
        .append('text')
        .text(focusedCountry.properties.name)
        .attr('transform', lastTransform)
        .attr('class', 'countryLabel')
        .attr('x', centroid[0])
        .attr('y', centroid[1])
    })
    .on('mouseout', () => {
      svg.selectAll('.countryLabel').remove()
    })

  updateMap()

  const rotateGlobe = (t) => {
    outline.attr('d', path)
    gratLines.attr('d', path)
    countryShapes.attr('d', path)
    if (svg.selectAll('.countryLabel').size()) {
      const centroid = d3
        .geoPath()
        .projection(projection)
        .centroid(focusedCountry)
      if (!isNaN(centroid[0])) {
        svg
          .selectAll('.countryLabel')
          .attr('x', centroid[0])
          .attr('y', centroid[1])
      }
    }
    d3.select('svg#map')
      .selectAll('path.tradeLines')
      .attr('d', (d) =>
        path({
          type: 'LineString',
          coordinates: [d.interp(Math.min(t, 1)), d.centroids['coordinates']],
        }),
      )
      .attr('stroke-dashoffset', 250 * Math.max(t, 1))
  }

  let stoppedTime = 0
  let currentTime = 0
  const autorotate = (elapsed) => {
    currentTime = elapsed
    const now = d3.now()
    const diff = now - lastTime
    if (diff < elapsed) {
      let rotation = projection.rotate()[0]
      rotation += diff * (6 / 1000)
      projection.rotate([rotation, config.verticalTilt, config.horizontalTilt])
      rotateGlobe((elapsed + stoppedTime) / 10000)
    }
    lastTime = now
  }

  const timer = d3.timer(autorotate)

  const restartTimer = () => {
    stoppedTime = currentTime
    config.verticalTilt = projection.rotate()[1]
    config.horizontalTilt = projection.rotate()[2]
    timer.restart(autorotate)
  }

  d3.geoInertiaDrag(svg, rotateGlobe, projection, {
    time: 1500,
    start: () => timer.stop(),
    end: restartTimer,
    stop: restartTimer,
    finish: restartTimer,
  })

  function zoomed(event) {
    lastTransform = event.transform
    g.selectAll('path') // To prevent stroke width from scaling
      .transition()
      .duration(50)
      .attr('transform', event.transform)

    svg
      .selectAll('.countryLabel')
      .transition()
      .duration(50)
      .attr('transform', event.transform)
  }
}

export {drawMap, updateMap}
