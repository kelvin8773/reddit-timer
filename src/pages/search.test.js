import React from 'react';
import { render, screen, act, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';

import getPosts from '../helper/redditAPI';
import Search, { convertToHeatMapData } from './search';
import searchJson from '../helper/search.json';
import mockPosts_reactjslearn from '../helper/__mocks__/mockPosts_reactjslearn.json';
import mockPosts_javascript from '../helper/__mocks__/mockPosts_javascript.json';

jest.mock('../helper/redditAPI');
afterEach(() => jest.clearAllMocks());

const { defaultSubreddit } = searchJson;

const mockGetPosts = (state, data) => {
  if (state === 'pass') {
    getPosts.mockResolvedValueOnce(data);
  } else if (state === 'fail') {
    getPosts.mockRejectedValue(data);
  }
}

const setup = (state, data) => {
  const component = <Search />;
  const path = 'search';
  const url = `/${path}/${defaultSubreddit}`;
  mockGetPosts(state, data);

  return (
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
          <Theme>
            <Route path={`/${path}/:redditName`}>
              {component}
            </Route>
          </Theme>
        </MemoryRouter>
      </Provider>
    )
  )
}

describe('Search Page', () => {
  test('loading default subreddit with success', async () => {
    setup('pass', mockPosts_javascript);
    expect(screen.getByTestId('searchForm')).toBeInTheDocument();
    const input = screen.getByTestId('searchInput');
    expect(input.value).toEqual(defaultSubreddit);

    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(getPosts).toBeCalledWith(expect.stringContaining(defaultSubreddit));
    await act(() => Promise.resolve());
  });

  test('change subreddit being search', async () => {
    const NEW_SUBREDDIT = 'reactjslearn';
    setup('pass', []);
    const button = screen.getByRole('button');
    const input = screen.getByTestId('searchInput');
    expect(input.value).toEqual(defaultSubreddit);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));

    fireEvent.change(input, { target: { value: NEW_SUBREDDIT } });
    expect(input.value).toEqual(NEW_SUBREDDIT);
    mockGetPosts('pass', mockPosts_reactjslearn);
    fireEvent.click(button);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    expect(getPosts).toHaveBeenCalledTimes(2);
    expect(getPosts).toBeCalledWith(expect.stringContaining(defaultSubreddit));
    expect(getPosts).toBeCalledWith(expect.stringContaining(NEW_SUBREDDIT));
    await act(() => Promise.resolve());
  });

})
