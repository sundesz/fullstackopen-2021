import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital &nbsp;
        {country.capital.map((capital, i) => (
          <span key={i}>{capital}</span>
        ))}
      </div>
      <div>population {country.population}</div>

      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} height='100' />
    </div>
  )
}

export default Country
