import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>

      <h2>Spoken languages</h2>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} height='100' />

      <Weather capital={country.capital[0]} />
    </div>
  )
}

export default Country
