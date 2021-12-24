import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import { CREATE_BOOK } from '../queries'
import { inputAttributes } from '../utils'

const NewBook = ({ displayNotification, updateCacheWith }) => {
  const history = useHistory()
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (err) => {
      displayNotification(err.graphQLErrors[0].message, 'danger')
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
    onCompleted: () => {
      history.push('/books')
    },
  })

  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const published = useField('number', 'published')
  const genre = useField('text', 'genre')

  const submitNewBookHandler = async (event) => {
    event.preventDefault()
    try {
      await createBook({
        variables: {
          title: title.value,
          author: author.value,
          published: Number(published.value),
          genres: genres,
        },
      })
    } catch (err) {
      displayNotification(err.message, 'danger')
    }
  }

  const addGenreHandler = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <div>
      <Form onSubmit={submitNewBookHandler}>
        <Form.Group as={Row} className='mb-3' controlId='title'>
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control {...inputAttributes(title)} placeholder='Title' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='author'>
          <Form.Label column sm={2}>
            Author
          </Form.Label>
          <Col sm={10}>
            <Form.Control {...inputAttributes(author)} placeholder='Author' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='published'>
          <Form.Label column sm={2}>
            Published
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...inputAttributes(published)}
              placeholder='Published'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='genre'>
          <Form.Label column sm={2}>
            Published
          </Form.Label>
          <Col sm={10}>
            <InputGroup className='mb-3'>
              <FormControl {...inputAttributes(genre)} placeholder='Genre' />
              <Button variant='outline-secondary' onClick={addGenreHandler}>
                Add genre
              </Button>
            </InputGroup>
            <Form.Text className='text-muted'>
              Genres: {genres.join(' ')}
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant='primary' type='submit'>
              Create book
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBook
