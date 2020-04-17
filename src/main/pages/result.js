import React from 'react';
import Styled from 'styled-components';
import Spinner from '../components/spinner';
import { useSelector } from 'react-redux';


const ResultWrapper = Styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const Message = Styled.div`
  margin-top: 56px;
  text-align: center;
`;

const Result = () => {
  const { posts } = useSelector(state => state);

  return (
    <ResultWrapper>
      {posts.length === 0 ?
        <Spinner /> : (
          <Message>
            <h2>
              Total {posts.length} Posts fetched!
            </h2>
            <p>
              First Post's title is " {posts[0].title} ".
            </p>
          </Message>
        )
      }
    </ResultWrapper>
  )
};

export default Result;
