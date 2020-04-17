import React from 'react';
import Styled from 'styled-components';
import SearchForm from '../components/searchForm';
import Spinner from '../components/spinner';

const PageContainer = Styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;


const Search = () => (
  <PageContainer>
    <SearchForm />
    <Spinner />
  </PageContainer>
);

export default Search;
