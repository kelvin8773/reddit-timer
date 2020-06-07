import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

jest.mock('./helper/redditAPI');

expect.extend(toHaveNoViolations);

describe('App', () => {
  test('header should load', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  })

  test('main should load', () => {
    render(<App />);
    expect(screen.getByTestId('main')).toBeInTheDocument();
  })


  test('footer should load', () => {
    render(<App />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  })

  test('should have no accessibility violations.', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  })

})

