import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import Styled from 'styled-components';
import Button from './button';

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = Styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormTitle = Styled.h1`
  margin: 25px 0 30px;
`;

const InputPrefix = Styled.label`
  color: #9e9e9e;
  font-size: 18px;
  margin-right: 9px;
`;

const SearchInput = Styled.input`
  width: 336px;
  height: 34px;
  padding: 0 17px;
  font-size: 14px;
  border-radius: 2px;
  border: solid 1px${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

const SearchForm = () => {
  const { redditName } = useParams();
  const [subreddit, setSubreddit] = useState(redditName);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubreddit(e.target.value);
  };

  useEffect(() => {
    setSubreddit(redditName);
  }, [redditName]);

  return (
    <Container>
      <FormTitle>
        Find the best time for a subreddit
      </FormTitle>
      <FormWrapper onSubmit={handleSubmit}>
        <InputPrefix>r /</InputPrefix>
        <SearchInput
          id="search-input"
          type="text"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
        />
        <Link to={`/search/${subreddit}`}>
          <Button type="submit">Search</Button>
        </Link>
      </FormWrapper>
    </Container>
  );
};

export default SearchForm;
