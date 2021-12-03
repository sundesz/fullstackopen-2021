import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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
  const handleShow = (country) => () => setSearchText(() => country)

  return (
    <div>
      <Filter searchText={searchText} handleSearch={handleSearch} />

      <Countries
        searchText={searchText}
        countries={filteredCountries}
        showCountry={handleShow}
      />
    </div>
  )
}

export default App
