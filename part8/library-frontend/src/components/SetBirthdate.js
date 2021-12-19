import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import useField from '../hooks'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import Select from 'react-select'

const SetBirthdate = ({ authors, displayNotification }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const dob = useField('number', 'born')

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const submit = async (event) => {
    event.preventDefault()
    if (selectedOption === null) {
      displayNotification('Please select author first')
      return
    }

    editAuthor({
      variables: { name: selectedOption.value, born: Number(dob.value) },
    }).catch((err) => console.log(err))

    dob.reset()
  }

  const inputAttributes = (object) => ({
    type: object.type,
    name: object.name,
    value: object.value,
    onChange: object.onChange,
  })

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>

        <div>
          Born
          <input {...inputAttributes(dob)} />
        </div>

        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default SetBirthdate
