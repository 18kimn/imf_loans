import './styles/App.css'
import './styles/base.css'
import Story from './components/Story'
import {useEffect, useState} from 'react'
import {drawMap, updateMap} from './imf_loans'

function App() {
  const [year, setYear] = useState(1993)
  useEffect(() => {
    drawMap()
  }, [])

  useEffect(() => {
    updateMap()
  }, [year])
  return (
    <>
      <Story />
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
    </>
  )
}

export default App
