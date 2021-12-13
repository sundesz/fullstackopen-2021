import axios from 'axios'
import { useEffect, useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const setCountryByName = async (name) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${name}`
      )
      if (response.data.status) {
        setCountry(response.data)
      } else {
        setCountry(response.data[0])
      }
    } catch (error) {
      setCountry(null)
    }
  }

  useEffect(() => {
    if (name !== '') {
      const fetchCountry = async () => {
        await setCountryByName(name)
      }

      fetchCountry()
    }
  }, [name])

  return country
}

export default useField
