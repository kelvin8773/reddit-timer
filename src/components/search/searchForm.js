import React, { useState } from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Button from '../button';

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

const SearchForm = ({ loading }) => {
  const { redditName } = useParams();
  const history = useHistory();
  const [subreddit, setSubreddit] = useState(redditName);
  const [isValidSearch, setIsValidSearch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidSearch && !loading) {
      history.push(`/search/${subreddit}`);
    }
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    const validInputRegex = /^\w*$/;
    const isValidInput = validInputRegex.test(value);
    if (isValidInput) {
      setSubreddit(value);
      const validSearchRegex = /^[a-z]{1}[\w]{2,20}$/gim;
      setIsValidSearch(validSearchRegex.test(value));
    }
  }

  return (
    <Container data-testid="searchForm">
      <FormTitle>
        Find the best time for a subreddit
      </FormTitle>
      <FormWrapper onSubmit={handleSubmit}>
        <InputPrefix>r /</InputPrefix>
        <SearchInput
          type="text"
          data-testid="searchInput"
          value={subreddit}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={!isValidSearch || loading}
        >
          Search
        </Button>
      </FormWrapper>
    </Container>
  );
};

SearchForm.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default SearchForm;
