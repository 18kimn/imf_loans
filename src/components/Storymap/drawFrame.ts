import type {ZoomTransform} from 'd3-zoom'
import {easeCubic} from 'd3-ease'

/* See https://docs.mapbox.com/mapbox-gl-js/example/add-image-animated/ for the mapbox animation */

/** Highlights a location on the map with a pulsing dot */
function pulsingDot(
    context: CanvasRenderingContext2D,
    time: number,
    point: [number, number],
) {
  /* the pulsing dot */
  // void ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
  // Draw the outer circle.
  context.beginPath()
  context.arc(point[0], point[1], 5 + 95 * time, 0, Math.PI * 2)
  context.fillStyle = `rgba(255, 200, 200, ${1 - time})`
  context.fill()

  // Draw the inner circle.
  context.beginPath()
  context.arc(point[0], point[1], 5, 0, Math.PI * 2)
  context.fillStyle = 'rgba(255, 100, 100, 1)'
  context.strokeStyle = 'white'
  context.fill()
  context.stroke()
}

/** Draws a single frame of the map */
function drawFrame(
    context: CanvasRenderingContext2D,
    path2d: Path2D,
    time: number,
    point: [number, number] | undefined,
    transform: ZoomTransform,
) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  context.save()

  // feels gross to have to render the countries every time
  // but we need a context.clearReact() for the pulsing dot
  // still get 60 fps though
  context.translate(transform.x, transform.y)
  context.scale(transform.k, transform.k)
  context.beginPath()
  context.strokeStyle = 'black'
  context.fillStyle = 'lightgray'
  context.fill(path2d)
  context.stroke(path2d)
  context.restore()

  if (!point) return
  pulsingDot(context, easeCubic(time), point)
}

export default drawFrame
