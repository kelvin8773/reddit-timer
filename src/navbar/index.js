import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Styled from 'styled-components';
import { ReactComponent as Logo } from './logo.svg';
import SearchJson from '../config/search.json';

const StyledNavbar = Styled.div`
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
`;

const StyledLogo = Styled(Logo)`
    margin-top: 2px;
`;

const LinkItems = Styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkItem = Styled(Link)`
    color: inherit;
    margin-left: 26px;
`;


const Navbar = () => (
  <StyledNavbar>
    <Link to="/">
      <StyledLogo />
    </Link>

    <LinkItems>
      <LinkItem to={`/search?${SearchJson.defaultSubreddit}`}>
        Search
      </LinkItem>

      <LinkItem to="/#how-it-work">
        How it works
      </LinkItem>

      <LinkItem to="/#about">
        About
      </LinkItem>

    </LinkItems>

  </StyledNavbar>


);

export default Navbar;
