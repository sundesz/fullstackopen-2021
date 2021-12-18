import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import useField from '../hooks'
import { attributesForInput } from '../utils'

const BlogForm = ({ createHandler }) => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const submitHandler = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    createHandler(newBlog)
  }

  return (
    <div>
      <Card style={{ width: '35rem' }}>
        <Card.Body>
          <Card.Title>Create a new blog</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group as={Row} className='mb-3' controlId='title'>
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control {...attributesForInput(title)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' controlId='author'>
              <Form.Label column sm={2}>
                Author
              </Form.Label>
              <Col sm={10}>
                <Form.Control {...attributesForInput(author)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' controlId='url'>
              <Form.Label column sm={2}>
                Url
              </Form.Label>
              <Col sm={10}>
                <Form.Control {...attributesForInput(url)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type='submit'>Create</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

BlogForm.propTypes = {
  createHandler: PropTypes.func.isRequired,
}

export default BlogForm
