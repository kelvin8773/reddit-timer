import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './index';

const Links = [
  { text: 'ooloo.io', location: "https://ooloo.io" },
  { text: 'link for home', location: "/" },
  { text: 'Terms & Privacy', location: "/terms" },
];

describe('Footer Links', () => {
  test.each(Links)(
    "Check if have %s link.",
    (link) => {
      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      );
      const linkDom = screen.queryByText(link.text) || screen.getByTestId('footLogo');

      expect(linkDom).toHaveAttribute("href", link.location);
    }
  );
})