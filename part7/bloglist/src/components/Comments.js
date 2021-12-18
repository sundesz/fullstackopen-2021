import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../hooks'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const comment = useField('text', 'comment')
  const dispatch = useDispatch()

  const commentSubmitHandler = (e) => {
    e.preventDefault()

    dispatch(createComment(blog.id, { comment: comment.value }))

    comment.reset()
  }

  const attributesForInput = (input) => ({
    type: input.type,
    name: input.name,
    value: input.value,
    onChange: input.onChange,
  })

  return (
    <>
      <Form onSubmit={commentSubmitHandler}>
        <Form.Group as={Row} className='mb-3' controlId='comment'>
          <Col sm={10}>
            <Form.Control {...attributesForInput(comment)} />
          </Col>
          <Col sm={{ span: 2 }}>
            <Button type='submit'>Add comment</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

const Comments = ({ blog }) => {
  const user = useSelector((state) => state.user.user)

  return (
    <div>
      <br />
      <h4>Comments</h4>
      {user && <CommentForm blog={blog} />}
      <ListGroup>
        {blog.comments.length ? (
          blog.comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item key='1'>
            <b>No comment yet</b>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Comments
