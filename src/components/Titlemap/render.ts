import {timer} from 'd3'
import {
  GeoProjection,
  ExtendedFeatureCollection,
  geoPath,
  geoGraticule10,
} from 'd3-geo'
import projTweenGenerator from './projectionTweener'
import colorTweenGenerator from './colorTweener'
import opacityTweenGenerator from './opacityTweener'

const graticule = geoGraticule10()
/** Handles Canvas2D logic to draw a single frame of the map */
function draw(
    context: CanvasRenderingContext2D,
    projection: GeoProjection,
    shapes: ExtendedFeatureCollection,
    colors: string[],
    opacities: number[],
) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  const path = geoPath().projection(projection).context(context)

  context.beginPath()
  path({type: 'Sphere'})
  context.globalAlpha = 1
  context.lineWidth = 0.5
  context.strokeStyle = '#000000'
  context.stroke()

  context.restore()
  context.beginPath()
  path(graticule)
  context.globalAlpha = 0.5
  context.lineWidth = 0.1
  context.strokeStyle = '#000000'
  context.stroke()

  context.restore()
  shapes.features.forEach((shape, i) => {
    context.beginPath()
    path(shape)
    context.globalAlpha = opacities[i]
    context.fillStyle = colors[i]
    context.fill()
    context.restore()
  })
}

/** A wrapper function for draw(); handles timing logic
 * and brings the color, projection, and opacity tweeners together
 */
function render(
    context: CanvasRenderingContext2D,
    shapes: ExtendedFeatureCollection,
): void {
  const projectionTweener = projTweenGenerator(shapes, 5000)
  const colorTweener = colorTweenGenerator(shapes.features.length, 3500)
  const opacityTweener = opacityTweenGenerator(shapes.features.length, 7500)

  context.save()
  // tried to do this the d3 way using d3.transition()
  // unfortunately it doesn't seem to work with mismatched cycles on a canvas
  // so going with the more imperative timer approach
  timer((elapsed) =>
    draw(
        context,
        projectionTweener(elapsed),
        shapes,
        colorTweener(elapsed),
        opacityTweener(elapsed),
    ),
  )
}

export default render
