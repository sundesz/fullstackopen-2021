import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import useField from '../hooks'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

  const birthDateSubmitHandler = async (event) => {
    event.preventDefault()
    if (selectedOption === null) {
      displayNotification('Please select author first', 'danger')
      return
    }

    try {
      await editAuthor({
        variables: { name: selectedOption.value, born: Number(dob.value) },
      })
      displayNotification('Author updated successfully')
      dob.reset()
    } catch (err) {
      displayNotification(err.message, 'danger')
    }
  }

  const inputAttributes = (object) => ({
    type: object.type,
    name: object.name,
    value: object.value,
    onChange: object.onChange,
  })

  return (
    <div>
      <h3>Set birth year</h3>

      <Form onSubmit={birthDateSubmitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Select Author</Form.Label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='born'>
          <Form.Label>Birth year</Form.Label>
          <Form.Control {...inputAttributes(dob)} />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Update author
        </Button>
      </Form>
    </div>
  )
}

export default SetBirthdate
