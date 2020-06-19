import React from 'react';

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

expect.extend(toHaveNoViolations);

jest.mock('./helper/redditAPI');

describe('App', () => {
  test('header section should load', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('main section should load', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });


  test('footer section should load', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('should have no accessibility violations.', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
