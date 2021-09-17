interface Point {
  type: String
  coordinates: number[]
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

export {Point, Trade}
