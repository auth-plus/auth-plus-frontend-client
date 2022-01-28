import React from 'react'
import { render, screen } from '@testing-library/react'
import UserPage from './User'

test('renders learn react link', () => {
  render(<UserPage />)
  const linkElement = screen.getByText(/USER/i)
  expect(linkElement).toBeInTheDocument()
})
