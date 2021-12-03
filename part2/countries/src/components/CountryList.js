import React from 'react'

const CountryList = ({ countries, showCountry }) =>
  countries.map((c) => (
    <div key={c.cca2}>
      {c.name.common} <button onClick={showCountry(c.name.common)}>show</button>
    </div>
  ))

export default CountryList
