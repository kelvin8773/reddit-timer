import React from 'react';
import { render, screen, act, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';

import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';

import Search from './search';
import searchJson from '../helper/search.json';
// import mockPosts from '../helper/__mocks__/mockPosts_javascript.json';

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
  test('Search Form is loaded & input field show default value', async () => {
    setup(<Search />, 'search', defaultSubreddit)

    expect(screen.getByTestId('searchForm')).toBeInTheDocument();
    const input = screen.getByTestId('searchInput');
    expect(input.value).toEqual(defaultSubreddit);

    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();
    await act(() => Promise.resolve());
  });

  test('change subreddit being search', async () => {
    const NEW_SUBREDDIT = 'news';
    setup(<Search />, 'search', defaultSubreddit);
    const button = screen.getByRole('button');
    const input = screen.getByTestId('searchInput');
    expect(input.value).toEqual(defaultSubreddit);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    fireEvent.change(input, { target: { value: NEW_SUBREDDIT } });
    expect(input.value).toEqual(NEW_SUBREDDIT);
    fireEvent.click(button);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();
    await act(() => Promise.resolve());
  });

})
