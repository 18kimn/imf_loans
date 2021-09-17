import {MultiPolygon} from 'geojson'

interface Point {
  type: String
  coordinates: [number, number]
}
interface Trade {
  export_value: number
  loan_id: number
  centroids: Point
  partner_centroids: Point
  year: number
  partner_code: string
  interp?: Function
}
const obj = {
  'info': [
    [
      {'loan_id': 77, 'date': '1994-05-27 04:00:00', 'amt': 457.2},
      {'loan_id': 84, 'date': '1995-05-22 04:00:00', 'amt': 1169.28},
      {'loan_id': 117, 'date': '1993-07-14 04:00:00', 'amt': 42.36},
    ],
  ],
}

interface Loan {
  loan_id: number
  date: string
  amt: number
}

interface Country {
  type: string
  properties: {
    iso_code: string
    name: string
    imf_code: string
    info: [Loan[]]
  }
  geometry: MultiPolygon
}

interface Countries {
  type: 'FeatureCollection'
  'features': Country[]
}

export {Point, Trade, Country, Countries}
