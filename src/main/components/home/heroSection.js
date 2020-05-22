import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Styled from 'styled-components';
import Button from '../button';
import heatMap from './table.png';
import searchJson from '../../../config/search.json';

const Hero = Styled.div`
  margin: 0 auto 130px;
  width: 1114px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroTitle = Styled.h1`
  margin: 27px auto 20px;
`;

const HeroSubTitle = Styled.h4`
  margin: 0 auto 46px;
  color: ${({ theme }) => theme.colors.grayBase};
`;

const HeroButton = Styled(Link)`
   margin: 0 auto 46px;
`;

const HeroSearchValue = Styled.div`
  margin: 0 auto 37px;
  font-weight: 500;
`;

const HeroSection = () => (
  <Hero id="hero-section">
    <HeroTitle>
      No reactions to your reddit posts?
    </HeroTitle>

    <HeroSubTitle>
      Great timing, great results! Find the best time to post on your subreddit.
    </HeroSubTitle>

    <HeroButton to={`/search/${searchJson.defaultSubreddit}`}>
      <Button>
        Show me the best time
      </Button>
    </HeroButton>

    <HeroSearchValue>
      r/
      {searchJson.defaultSubreddit}
    </HeroSearchValue>

    <Link to={`/search/${searchJson.defaultSubreddit}`}>
      <img
        src={heatMap}
        alt="heat map"
      />
    </Link>

  </Hero>
);

export default HeroSection;
