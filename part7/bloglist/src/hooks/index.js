import { useState } from 'react'
import { capitalize } from '../utils'

const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(() => e.target.value)
  }

  const reset = () => {
    setValue(() => '')
  }

  return {
    type,
    placeholder: capitalize(name),
    name,
    value,
    onChange,
    reset,
  }
}

export default useField
