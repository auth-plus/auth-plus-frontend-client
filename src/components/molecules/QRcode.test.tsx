import React from 'react';
import { render, screen } from '@testing-library/react';
import QRcode from './QRcode';

test('renders learn react link', () => {
  render(<QRcode />);
  const linkElement = screen.getByAltText(/qrcode/i);
  expect(linkElement).toBeInTheDocument();
});
