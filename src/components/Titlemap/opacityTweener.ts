import {interpolateNumber} from 'd3-interpolate'

/** Wrapper for the closure of the opacity tweener.
 * This is very, very similar to the color tweener (./colorTweener.ts)
 */
function tweenGenerator(n: number, cycleTime: number) {
  const fadeIn = interpolateNumber(0, 1)
  const fadeOut = interpolateNumber(1, 0)

  const opacityAssignments = Array(n)
      .fill(0)
      .map(() => Math.floor(Math.random() * 2))
  const lastColorTimes = Array(n).fill(0)

  return (milliseconds: number) => {
    const colors = Array(n).fill(0)
        .map((_, i) => {
          // stagger color generation so that no cycle is synced
          const staggeredTime = (milliseconds + i * 50) / cycleTime
          const t = staggeredTime - Math.floor(staggeredTime)
          // lastColorTimes[i] > t implies that
          // there was a rollover to the next cycle
          if (lastColorTimes[i] > t) {
            opacityAssignments[i] = Number(!opacityAssignments[i])
          }
          lastColorTimes[i] = t
          return [fadeIn, fadeOut][opacityAssignments[i]](t)
        })
    return colors
  }
}

export default tweenGenerator
