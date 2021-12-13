import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue((value) => e.target.value)
  }

  const reset = () => {
    setValue((value) => '')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export default useField
