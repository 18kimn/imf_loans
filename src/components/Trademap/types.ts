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
