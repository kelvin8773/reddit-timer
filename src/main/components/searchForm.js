import React, { useState, useEffect } from 'react';
import {
  useParams,
  useHistory,
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
`;

const FormTitle = Styled.h1`
  margin-top: 27px;
  margin-bottom: 29px;
`;

const InputPrefix = Styled.label`
  color: #9e9e9e;
  font-size: 18px;
  margin-right: 10px;
  line-height: 36px;
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
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${subreddit}`);
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
        <Button
          type="submit"
        >
          Search
        </Button>
      </FormWrapper>
    </Container>
  );
};

export default SearchForm;
