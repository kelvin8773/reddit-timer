import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { REDDIT_USER_BASE_URL } from '../../helper/constants';

const TableWrapper = Styled.table`
  box-sizing: border-box;
  width: 786px;
  margin: 12px auto 0;
  border: solid 1px #dddddd;
  font-size: ${({ theme }) => theme.fonts.small};
  color: ${({ theme }) => theme.colors.black};
`;

const TableHeader = Styled.th`
  box-sizing: border-box;
  height: 35px;
  font-weight: 600;
  border: solid 1px #dddddd;
  text-align: start;
  padding-left: 12px;
  padding-right: 10px;
  vertical-align: middle;
`;

const TableData = Styled.td`
  box-sizing: border-box;
  height: 34px;
  font-weight: 400;
  border: solid 1px #dddddd;
  padding-left: 12px;
  vertical-align: middle;
  
  :first-child {
    max-width: 373px;
    width: 373px;
    padding-right: 17px;
  };

  :last-child {
    max-width: 129px;
    width: 129px;
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
    <div data-testid="postTable">
      <h3>Posts</h3>
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
                <TableData data-testid="postScore">{post.score}</TableData>
                <TableData data-testid="postCommentNum">{post.num_comments}</TableData>
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
