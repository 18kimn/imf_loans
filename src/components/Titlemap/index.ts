import {select} from 'd3-selection'
import {ExtendedFeatureCollection} from 'd3-geo'
import render from './render'

/** Basic wrapper function;
 * appends the canvas DOM element and call the render function */
async function drawMap(
    dataPromise: Promise<ExtendedFeatureCollection>,
): Promise<void> {
  const shapes = await dataPromise

  const canvas = select('#introMapContainer')
      .append('canvas')
      .attr('id', 'map')
      // eslint-disable-next-line max-len
      .attr('aria-label', 'A world map rotates steadily on the screen and shifts between several different map projections. Countries on the world map transition between red and black.')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight)
      .style('width', '100%')
      .style('height', '100%')
      .node()
  // importantly canvas can't just receive css 100% width etc
  // it hsa to have meaningful pixel values as attrs i think ?
  const context = canvas?.getContext('2d')
  if (!canvas || !context) return

  render(context, shapes)
}

export default drawMap
