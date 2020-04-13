import React from 'react';
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
  width: 370px;
  height: 34px;
  padding: auto 16px;
  border-radius: 2px;
  border: solid 1px${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

const SearchForm = () => (
  <Container>
    <FormTitle>
      Find the best time for a subreddit
    </FormTitle>
    <FormWrapper>
      <InputPrefix>r /</InputPrefix>
      <SearchInput type="text" id="search-input" defaultValue="javascript" />
      <Button>Search</Button>
    </FormWrapper>
  </Container>
);

export default SearchForm;