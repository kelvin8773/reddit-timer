import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  useDispatch,
} from 'react-redux';
import dayjs from 'dayjs';
import { updatePosts } from '../redux/postsSlice';
import getPosts from '../helper/redditAPI';
import Spinner from '../components/search/spinner';
import HeatMap from '../components/search/heatMap';
import SearchForm from '../components/search/searchForm';

const ResultWrapper = Styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const MessageWrapper = Styled.div`
  margin-top: 56px;
  text-align: center;
`;

export const convertToHeatMapData = (data) => {
  const result = new Array(7).fill().map(() => new Array(24).fill().map(() => []));
  for (let i = 0; i < data.length; i += 1) {
    const time = dayjs.unix(data[i].created_utc);
    const dayOfWeek = time.day();
    const timeSlot = time.hour();
    result[dayOfWeek][timeSlot].push(data[i]);
  }
  return result;
};

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const { redditName } = useParams();

  useEffect(() => {
    setLoading(true);
    setErrorMsg('');

    getPosts(redditName)
      .then((res) => {
        const posts = convertToHeatMapData(res);
        dispatch(updatePosts(posts));
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        dispatch(updatePosts([]));
        setLoading(false);
      });
  }, [redditName, dispatch]);

  return (
    <>
      <SearchForm loading={loading} />
      <ResultWrapper data-testid="searchResult" >
        {loading && <Spinner />}
        {errorMsg && <MessageWrapper>{errorMsg}</MessageWrapper>}
        {!errorMsg && !loading && <HeatMap />}
      </ResultWrapper>
    </>
  );

}
export default Search;
