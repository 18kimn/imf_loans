import {easeCubicInOut} from 'd3-ease'
import {
  geoProjection,
  GeoRawProjection,
  ExtendedFeatureCollection,
  geoEqualEarthRaw, geoNaturalEarth1Raw,
} from 'd3-geo'
import {
  geoHammerRaw,
  geoBoggsRaw,
  geoVanDerGrinten4Raw,
  geoHomolosineRaw,
  geoLarriveeRaw,
  geoSinuMollweideRaw,
  geoPolyconicRaw,
  geoFoucautRaw,
  geoEisenlohrRaw,
  geoWagnerRaw,
  geoWinkel3Raw,
  geoHealpixRaw,
  geoHammerRetroazimuthalRaw,
} from 'd3-geo-projection'
const projs = [
  geoNaturalEarth1Raw,
  geoVanDerGrinten4Raw,
  geoLarriveeRaw,
  geoFoucautRaw,
  geoHammerRetroazimuthalRaw(0),
  geoEisenlohrRaw,
  geoPolyconicRaw,
  geoHealpixRaw(4),
  geoEqualEarthRaw,
  geoBoggsRaw,
  geoWinkel3Raw,
  geoHomolosineRaw,
  geoSinuMollweideRaw,
  geoWagnerRaw(65 / 180 * Math.PI, 60 / 180 * Math.PI, 0, 200),
  geoHammerRaw(2),
] as GeoRawProjection[]

/*
  See https://bl.ocks.org/mbostock/3711652
  and https://observablehq.com/@d3/projection-transitions
*/

/** Interpolates between two raw projections */
function interp(
    [x0, y0]: [number, number],
    [x1, y1]: [number, number],
    t: number,
): [number, number] {
  return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1]
}

/** Interpolates between two scales */
function lerp1(x0: number, x1: number, t: number) {
  return (1 - t) * x0 + t * x1
}

/** Hanldes timing calculations and setup */
function tweenGenerator(
    shapes: ExtendedFeatureCollection,
    cycleTime: number,
) {
  let fromIndex = 0
  let toIndex = 1

  const projInfo = projs.map((proj) => {
    const p = geoProjection(proj)
        .fitExtent([
          [0, 0],
          [1.3 * window.innerWidth, 1.2 * window.innerHeight],
        ], shapes)
    return {scale: p.scale(), translate: p.translate()}
  })

  // inside the render function: every-frame calculations
  return (milliseconds: number) => {
    const t = milliseconds / cycleTime
    const timerIndex = Math.floor(t) % projs.length

    if (timerIndex !== fromIndex) {
      // shift the current indexes forward by 1
      //  and go back to zero if we have to
      toIndex = (toIndex + 1) % projs.length
      fromIndex = (fromIndex + 1) % projs.length
    }

    const raw0 = projs[fromIndex]
    const raw1 = projs[toIndex]

    const eased = easeCubicInOut(t - Math.floor(t))
    return geoProjection((x, y) => interp(raw0(x, y), raw1(x, y), eased))
        .scale(lerp1(projInfo[fromIndex].scale, projInfo[toIndex].scale, eased))
        .translate(interp(projInfo[fromIndex].translate,
            projInfo[toIndex].translate, eased))
        .precision(0.1)
        .rotate([performance.now() / 100, 0, 0])
  }
}


export default tweenGenerator
