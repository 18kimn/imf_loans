import {timer} from 'd3'
import {GeoProjection, ExtendedFeatureCollection, geoPath} from 'd3-geo'
import projTweenGenerator from './projectionTweener'
import colorTweenGenerator from './colorTweener'
import opacityTweenGenerator from './opacityTweener'
/** Handles Canvas2D logic to draw a single frame of the map */
function draw(
    context: CanvasRenderingContext2D,
    projection: GeoProjection,
    shapes: ExtendedFeatureCollection,
    currentColors: string[],
    currentOpacities: number[],
) {
  const path = geoPath().projection(projection).context(context)
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  context.save()
  shapes.features.forEach((shape, i) => {
    context.beginPath()
    path(shape)
    context.globalAlpha = currentOpacities[i] // should be tweened ()
    context.fillStyle = currentColors[i] // should be tweened
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

  // tried to do this the d3 way using d3.transition()
  // unfortunately it doesn't seem to work with mismatched cycles
  // so going with the more imperative timer approach
  timer((elapsed) => draw(
      context,
      projectionTweener(elapsed),
      shapes,
      colorTweener(elapsed),
      opacityTweener(elapsed),
  ))
}

export default render
