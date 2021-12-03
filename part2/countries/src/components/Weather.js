import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => setWeather(response.data))
  }, [capital])

  return (
    Object.keys(weather).length && (
      <div>
        <h2> Weather in {capital}</h2>
        <div>
          <b>temperature:</b> {weather.main.temp} Celsius
        </div>
        <div>
          <b>wind:</b> {weather.wind.speed}
        </div>
      </div>
    )
  )
}

export default Weather
