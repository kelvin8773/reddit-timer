import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Theme from '../../stylesheets/theme/theme';
import Navbar from './index';

const Navlinks = [
  { text: 'text-to-not-found', location: '/' },
  { text: 'Search', location: '/search/javascript' },
  { text: 'How it works', location: '/#howItWorks' },
  { text: 'About', location: '/#about' },
];

describe('NavBar links', () => {
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
      const linkDom = screen.queryByText(link.text) || screen.getByTestId('navLogo');

      expect(linkDom).toHaveAttribute('href', link.location);
    },
  );
});
