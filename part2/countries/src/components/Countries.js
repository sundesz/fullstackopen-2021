import React from 'react'
import Country from './Country'
import CountryList from './CountryList'

const Countries = ({ countries, showCountry, searchText }) => {
  if (countries.length === 0) {
    return null
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length <= 10) {
    return <CountryList countries={countries} showCountry={showCountry} />
  }

  if (searchText !== '' && countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return null
}

export default Countries
