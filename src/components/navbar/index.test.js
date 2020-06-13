import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Theme from '../../stylesheets/theme/theme';
import Navbar from './index';

const Navlinks = [
  { text: 'Search', location: '/search/javascript' },
  { text: 'How it works', location: '/#howItWorks' },
  { text: 'About', location: '/#about' },
];

describe('NavBar', () => {
  test('check if logo load correctly!', () => {
    render(
      <Theme>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Theme>,
    );
    const logo = screen.getByTestId('navLogo');
    expect(logo).toHaveAttribute('href', '/');
  });

  test.each(Navlinks)(
    'Check if have %s link.',
    (link) => {
      render(
        <Theme>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </Theme>,
      );
      const linkDom = screen.queryByText(link.text);

      expect(linkDom).toHaveAttribute('href', link.location);
    },
  );
});
