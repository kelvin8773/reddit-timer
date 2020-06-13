import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Styled from 'styled-components';
import { ReactComponent as Logo } from './sign.svg';

const StyledFooter = Styled.footer`
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 0 auto;
    width: 940px;
    max-width: 100%;
`;

const LinkItem = Styled(Link)`
  flex: 1;
  color: inherit;

  &:last-child {
    text-align: right;
  }
`;

const Footer = () => (
  <StyledFooter role="contentinfo" aria-label="footer links">
    <LinkItem
      as="a"
      href="https://ooloo.io"
      target="_blank"
      rel="noopener noreferrer"
    >
      ooloo.io
    </LinkItem>

    <Link to="/" data-testid="footLogo">
      <Logo />
    </Link>

    <LinkItem to="/terms">
      Terms & Privacy
    </LinkItem>
  </StyledFooter>

);

export default Footer;
