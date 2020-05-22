import React from 'react';
import Styled from 'styled-components';
import SearchForm from '../components/search/searchForm';
import Result from '../components/search/searchResult';

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
