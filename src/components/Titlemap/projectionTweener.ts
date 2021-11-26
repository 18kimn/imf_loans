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

/** Interpolates between two geometries */
function interp(
    [x0, y0]: [number, number],
    [x1, y1]: [number, number],
    t: number,
): [number, number] {
  return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1]
}

/** this handles some "busy work", or timing calculations */
function tweenGenerator(
    shapes: ExtendedFeatureCollection,
    cycleTime: number,
) {
  let fromIndex = 0
  let toIndex = 1

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

    return geoProjection((x, y) => interp(
        projs[fromIndex](x, y), projs[toIndex](x, y),
        easeCubicInOut(t - Math.floor(t)),
    )).fitExtent([
      [0, 0],
      [window.innerWidth, window.innerHeight],
    ], shapes)
  }
}


export default tweenGenerator
