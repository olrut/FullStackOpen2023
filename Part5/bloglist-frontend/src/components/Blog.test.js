import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog.jsx'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
  }
  const setBlogs = jest.fn()
  const setError = jest.fn()

  render(<Blog
    blog={blog}
    blogs={null}
    setBlogs={setBlogs}
    setError={setError}
    loggedUser={null}/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  screen.debug(element)
  expect(element).toBeDefined()
  expect(element).toHaveTextContent('Component testing is done with react-testing-library')
})


test('clicking the button shows details of a blog', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    // author: 'Test Author',
    url: 'http://www.testurl.com',
    likes: 5,
    user: {
      name: 'Test User'
    }
  }

  const setBlogs = jest.fn()
  const setError = jest.fn()

  render(<Blog
    blog={blog}
    blogs={null}
    setBlogs={setBlogs}
    setError={setError}
    loggedUser={null}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('Component testing is done with react-testing-library')
  screen.debug(element)
  expect(element).toBeDefined()
  expect(element).toHaveTextContent('Component testing is done with react-testing-library')
  expect(element).toHaveTextContent('Test User')
  expect(element).toHaveTextContent('5')
  expect(element).toHaveTextContent('http://www.testurl.com')
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 5,
    user: {
      name: 'Test User'
    }
  }

  const setBlogs = jest.fn()
  const setError = jest.fn()
  const mockHandler = jest.fn()

  render(<Blog
    blog={blog}
    blogs={null}
    setBlogs={setBlogs}
    setError={setError}
    loggedUser={null}
    handleLike={mockHandler}
  />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})