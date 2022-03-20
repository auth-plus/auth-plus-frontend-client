import { render, screen } from '@testing-library/react'
import React from 'react'

import { QRcode } from './QRcode'

test('renders learn react link', () => {
  render(<QRcode url="I'm a test" />)
  const linkElement = screen.getByAltText(/qrcode/i)
  expect(linkElement).toBeInTheDocument()
})
