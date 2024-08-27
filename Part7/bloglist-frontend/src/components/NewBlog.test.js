import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog.jsx'

test('tests that blogform submits correct details', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn((event) => {
    event.preventDefault()
  })

  render(<NewBlog createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'testauthor')
  await user.type(urlInput, 'test')

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  const mockCall = createBlog.mock.calls[0][0].target
  expect(mockCall.children[0].value).toBe('test title')
  expect(mockCall.children[1].value).toBe('testauthor')
  expect(mockCall.children[2].value).toBe('test')
})