import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { ReactComponent as Logo } from './logo.svg';
import SearchJson from '../../helper/search.json';

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

const LinkItem = Styled(NavLink)`
    color: ${({ theme }) => theme.colors.brownishGrey};
    margin-left: 26px;
    font-size: 16px;
`;

const Navbar = () => {
  const subReddit = SearchJson.defaultSubreddit;

  return (
    <StyledNavbar role="navigation" aria-label="header links">
      <Link to="/">
        <StyledLogo />
      </Link>

      <LinkItems>
        <LinkItem
          to={`/search/${subReddit}`}
        >
          Search
        </LinkItem>

        <LinkItem smooth to="/#howItWorks">
          How it works
        </LinkItem>

        <LinkItem smooth to="/#about">
          About
        </LinkItem>

      </LinkItems>
    </StyledNavbar>

  );
};


export default Navbar;
