import React from 'react';
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';

import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';

import Search from './search';
import searchJson from '../helper/search.json';
import mockPosts from '../helper/__mocks__/mockPosts_javascript.json';

afterEach(() => jest.clearAllMocks());

jest.mock('../helper/redditAPI');

const { defaultSubreddit } = searchJson;

const setup = (component, path, page) => {
  const url = `/${path}/${page}`;

  return (
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
          <Theme>
            <Route path={`/${path}/:subreddit`}>
              {component}
            </Route>
          </Theme>
        </MemoryRouter>
      </Provider>
    )
  )
}

describe('Search Page', () => {
  test('Search Form is loaded & heatmap will load after spinner', async () => {
    const promise = Promise.resolve();
    setup(<Search />, 'search', defaultSubreddit)
    expect(screen.getByTestId('searchForm')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.queryByDisplayValue(defaultSubreddit)).toBeInTheDocument();
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    await act(() => promise);
  })






})
