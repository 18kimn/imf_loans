import '../../styles/App.css'
import '../../styles/base.css'
import {useEffect, useState} from 'react'
import drawMap from './Draw'
import updateMap from './Update'
import {geoOrthographic} from 'd3-geo'

const projection = geoOrthographic()
  .translate([(window.innerWidth * 0.7) / 2, window.innerHeight / 2])
  .scale((window.innerWidth * 0.7) / 3)

const Trademap = () => {
  const [year, setYear] = useState(1993)
  useEffect(() => {
    drawMap(projection)
  }, [])

  useEffect(() => {
    updateMap(projection)
  }, [year])

  return (
    <div id="mapcontainer">
      <div id="slidecontainer">
        <input
          type="range"
          min="1993"
          max="2020"
          step="1"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          id="slider"
        />
        <p id="sliderLabel">Year: {year}</p>
      </div>
    </div>
  )
}

export default Trademap
