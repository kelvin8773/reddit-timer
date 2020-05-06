import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { updatePosts } from '../../slices/postsSlice';
import getPosts from '../../helper/redditAPI';

import Spinner from './spinner';
import HeatMap from './heatMap';

const ResultWrapper = Styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const MessageWrapper = Styled.div`
  margin-top: 56px;
  text-align: center;
`;

const Result = () => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const { redditName } = useParams();

  useEffect(() => {
    setLoading(true);
    setErrorMsg('');

    getPosts(redditName)
      .then((res) => {
        dispatch(updatePosts(res));
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        dispatch(updatePosts([]));
        setLoading(false);
      });
  }, [redditName, dispatch]);


  return (
    <ResultWrapper>
      {loading && <Spinner />}
      {errorMsg && <MessageWrapper>{errorMsg}</MessageWrapper>}
      {(posts.length > 0 && !loading)
        && (
          <MessageWrapper>
            {' '}
            {posts.length}
            {' '}
            Posts fetched!
          </MessageWrapper>
        )}
      <HeatMap />
    </ResultWrapper>
  );
};

export default Result;
