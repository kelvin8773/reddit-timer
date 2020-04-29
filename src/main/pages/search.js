import React from 'react';
import Styled from 'styled-components';
import SearchForm from '../components/searchForm';
import Result from '../components/searchResult';

const PageContainer = Styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const Search = () => (
  <PageContainer>
    <SearchForm />
    <Result />
  </PageContainer>
);

export default Search;
