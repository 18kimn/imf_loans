import { interpolateRgb } from "d3-interpolate"

/** Environment to create a closure for the color tweener
 * @param n Number of elements to create colors for
 * @param cycleTime Length of each red-to-black or vice versa cycle
 * in milliseconds
 */
function tweenGenerator(n: number, cycleTime: number) {
  const redToBlack = interpolateRgb("red", "black")
  const blackToRed = interpolateRgb("black", "red")
  const colorAssignments = Array(n)
    .fill(0)
    .map(() => Math.floor(Math.random() * 2))
  const lastColorTimes = Array(n).fill(0)

  return (milliseconds: number) => {
    const colors = Array(n)
      .fill(0)
      .map((_, i) => {
        // stagger color generation so that no cycle is synced
        const staggeredTime = (milliseconds + i * 50) / cycleTime
        const t = staggeredTime - Math.floor(staggeredTime)
        // lastColorTimes[i] > t implies that
        // there was a rollover to the next cycle
        if (lastColorTimes[i] > t) {
          colorAssignments[i] = Number(!colorAssignments[i])
        }
        lastColorTimes[i] = t
        return [redToBlack, blackToRed][colorAssignments[i]](t)
      })
    return colors
  }
}

export default tweenGenerator
