import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('loads and renders', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent('Event Auditor');
});
