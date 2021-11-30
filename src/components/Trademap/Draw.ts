import * as d3Inertia from 'd3-inertia'
import {
  now,
  select,
  geoPath,
  geoGraticule,
  geoInterpolate,
  timer,
  zoom,
} from 'd3'
import updateMap from './Update'
import {Countries, Country} from './types'
const d3 = {
  ...d3Inertia,
  now,
  select,
  geoPath,
  geoGraticule,
  geoInterpolate,
  timer,
  zoom,
}
import {D3ZoomEvent} from 'd3-zoom'

const config = {
  speed: 0.005,
  verticalTilt: -15,
  horizontalTilt: -15,
}

/*
This function handles the initial draw, rotation, and drag elements of the
map depicting trade relationships between IMF loan recipient countries and
their export partners.

*/
const drawMap = async (projection: d3.GeoProjection) => {
  // const exports = (await fetch('/data/export.json')
  //     .then((res) => res.json())) as unknown as Trade[]
  const imf = (await fetch('/data/imf.json')
      .then((res) => res.json())) as unknown as Countries

  const path: any = d3.geoPath().projection(projection)
  const graticule = d3.geoGraticule().step([10, 10])

  const svg = d3.select('#mapcontainer').append('svg').attr('id', 'map')
  const g = svg.append('g')
  let focusedCountry: any
  let lastTransform: string
  let lastTime = d3.now()


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
      .on('mousemove', (_: any, d: Country) => {
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

  updateMap(projection)

  const rotateGlobe = (t: number) => {
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
        .attr('d', (d: any) =>
          path({
            type: 'LineString',
            coordinates: [
              d.interp && d.interp(Math.min(t, 1)),
              d.centroids['coordinates'],
            ],
          }),
        )
        .attr('stroke-dashoffset', 250 * Math.max(t, 1))
  }

  let stoppedTime = 0
  let currentTime = 0
  const autorotate = (elapsed: number) => {
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

  const zoom: any = d3.zoom().scaleExtent([0.1, 8]).on('zoom', zoomed)
  svg.call(zoom)

  /** Transforms all SVG paths and labels to match zoom */
  function zoomed(event: D3ZoomEvent<Element, any>): void {
    lastTransform = event.transform as unknown as string
    svg
        .selectAll('path') // To prevent stroke width from scaling
        .transition()
        .duration(50)
        .attr('transform', lastTransform)

    svg
        .selectAll('.countryLabel')
        .transition()
        .duration(50)
        .attr('transform', lastTransform)
  }
  return timer
}

export default drawMap
