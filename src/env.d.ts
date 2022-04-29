// / <reference types="vite/client" />
declare module 'd3-inertia' {
  import {GeoProjection} from 'd3-geo'
  export function geoInertiaDrag(
    svg: any,
    rotater: Function,
    projection: GeoProjection,
    opts: object
  ): void
}

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>
  export default component
}
