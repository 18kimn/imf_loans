/// <reference types="vite/client" />
/// <reference types="reveal" />
declare module 'd3-inertia' {
  import * as d3 from 'd3'
  import * as Inertia from 'd3-inertia'
  export function geoInertiaDrag(
    svg: any,
    rotater: Function,
    projection: d3.GeoProjection,
    opts: object,
  ): void
}

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
