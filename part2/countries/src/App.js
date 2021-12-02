import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(() => response.data))
  }, [])

  const filteredCountries =
    searchText === ''
      ? countries
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(searchText.toLowerCase())
        )

  const handleSearch = (e) => setSearchText(() => e.target.value)

  return (
    <div>
      <Filter searchText={searchText} handleSearch={handleSearch} />

      {filteredCountries.length === 1 && (
        <Country country={filteredCountries[0]} />
      )}
      {filteredCountries.length < 10 &&
        filteredCountries.map((c) => <div key={c.cca2}>{c.name.common}</div>)}
      {searchText && filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  )
}

export default App
