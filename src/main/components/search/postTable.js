import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { REDDIT_USER_BASE_URL } from '../../../config/constants';

const TableTitle = Styled.h2`
  font-family: 'Bitter', serif;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
`;

const TableWrapper = Styled.table`
  box-sizing: border-box;
  width: 786px;
  margin-top: 12px;
  border: solid 1px #dddddd;
  font-size: 14px;
`;

const TableHeader = Styled.th`
  box-sizing: border-box;
  height: 35px;
  font-size: 14px;
  font-weight: 600;
  border: solid 1px #dddddd;
  color: ${({ theme }) => theme.colors.black};
  text-align: start;
  padding-left: 12px;
  padding-right: 10px;
  vertical-align: middle !important;
  
`;

const TableData = Styled.td`
  box-sizing: border-box;
  height: 34px;
  font-size: 14px;
  font-weight: 500;
  border: solid 1px #dddddd;
  padding-left: 12px;
  color: ${({ theme }) => theme.colors.black};
  vertical-align: middle !important;
  
  :first-child {
    max-width: 373px;
    padding-right: 17px;
  };

  :last-child {
    max-width: 129px;
    padding: 0 14px 0 11px;
  }

  :first-child, 
  :last-child
  {
    color: ${({ theme }) => theme.colors.linkColor};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

`;

const PostTable = ({ posts }) => {
  const getMin = (utc) => dayjs.unix(utc).minute();
  const sortedPosts = [...posts].sort((a, b) => getMin(a.created_utc) - getMin(b.created_utc));

  return (
    <div>
      <TableTitle>Posts</TableTitle>
      <TableWrapper>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Time Posted</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>Comments</TableHeader>
            <TableHeader>Author</TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            sortedPosts.map((post) => (
              <tr key={post.id}>
                <TableData>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={post.full_link}
                  >
                    {post.title}
                  </a>
                </TableData>
                <TableData>{dayjs.unix(post.created_utc).format('h:mma')}</TableData>
                <TableData>{post.score}</TableData>
                <TableData>{post.num_comments}</TableData>
                <TableData>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={REDDIT_USER_BASE_URL + post.author}
                  >
                    {post.author}
                  </a>
                </TableData>
              </tr>
            ))
          }
        </tbody>
      </TableWrapper>
    </div>
  );
};

PostTable.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostTable;
