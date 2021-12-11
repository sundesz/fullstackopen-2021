import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
// import { prettyDOM } from '@testing-library/dom'

const setUp = () => {
  const blog = {
    title: 'My first blog',
    author: 'Sandesh Hyoju',
    url: 'http://sandesh.com/my-first-blog',
    likes: 10,
    user: {
      username: 'sandesh',
    },
  }
  const user = { username: 'san' }
  const deleteHandler = jest.fn()

  const likeHandler = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      user={user}
      likeHandler={likeHandler}
      deleteHandler={deleteHandler}
    />
  )

  return {
    blog,
    user,
    deleteHandler,
    likeHandler,
    component,
  }
}

test('renders only title and author', () => {
  const { component } = setUp()
  expect(component.container).toHaveTextContent('My first blog')
  expect(component.container).toHaveTextContent('Sandesh Hyoju')

  expect(
    component.container.querySelector('.short-description')
  ).not.toHaveStyle('display: none')
  expect(component.container.querySelector('.long-description')).toHaveStyle(
    'display: none'
  )
})

test('display blog url and likes when button is clicked', () => {
  const { component } = setUp()
  const viewButton = component.getByText('View')

  fireEvent.click(viewButton)

  expect(component.container.querySelector('.short-description')).toHaveStyle(
    'display: none'
  )
  expect(
    component.container.querySelector('.long-description')
  ).not.toHaveStyle('display: none')
})

test('like button is clicked twice', () => {
  const { component, likeHandler } = setUp()

  fireEvent.click(component.getByText('View'))

  fireEvent.click(component.container.querySelector('#likes'))
  fireEvent.click(component.container.querySelector('#likes'))

  expect(likeHandler.mock.calls.length).toBe(2)
})

test('blog form received the props details exactly as new blog object when creating new blog', () => {
  const createHandler = jest.fn()
  const blogFormHTML = render(<BlogForm createHandler={createHandler} />)

  const title = blogFormHTML.container.querySelector('#title')
  const author = blogFormHTML.container.querySelector('#author')
  const url = blogFormHTML.container.querySelector('#url')
  const blogForm = blogFormHTML.container.querySelector('#blogForm')

  fireEvent.change(title, { target: { value: 'Testing React' } })
  // don't know why I have to fireEvent twice to see the changes
  fireEvent.change(author, { target: { value: 'Sandesh Hyoju' } })
  fireEvent.change(author, { target: { value: 'Sandesh Hyoju' } })
  fireEvent.change(url, {
    target: { value: 'http://sandesh.com/testing-react' },
  })
  fireEvent.change(url, {
    target: { value: 'http://sandesh.com/testing-react' },
  })

  fireEvent.submit(blogForm)

  expect(createHandler.mock.calls[0][0].url).toBe(
    'http://sandesh.com/testing-react'
  )

  expect(createHandler.mock.calls[0][0].title).toBe('Testing React')

  expect(createHandler.mock.calls[0][0].author).toBe('Sandesh Hyoju')
})
