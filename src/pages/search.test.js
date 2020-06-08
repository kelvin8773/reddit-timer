import React from 'react';
import { render, screen, act, waitForElementToBeRemoved, fireEvent, findByText } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';

import getPosts from '../helper/redditAPI';
import Search, { convertToHeatMapData } from './search';
import searchJson from '../helper/search.json';
import mockPosts_reactjslearn from '../helper/__mocks__/mockPosts_reactjslearn.json';
import mockPosts_javascript from '../helper/__mocks__/mockPosts_javascript.json';

const { defaultSubreddit } = searchJson;
jest.mock('../helper/redditAPI');

const mockGetPosts = (state, data) => {
  if (state === 'pass') {
    getPosts.mockResolvedValueOnce(data);
  } else if (state === 'fail') {
    getPosts.mockRejectedValue(new Error(data[0]));
  }
};

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
};

afterEach(() => jest.clearAllMocks());

describe('Search page', () => {
  test('loading default subreddit and search new subreddit success flow', async () => {
    setup('pass', mockPosts_javascript);

    const NEW_SUBREDDIT = 'reactjslearn';
    const button = screen.getByRole('button');
    const input = screen.getByTestId('searchInput');

    // First round load default value
    expect(input.value).toEqual(defaultSubreddit);
    expect(button).toBeDisabled();
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(button).toBeEnabled();
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    // Second round load user input valid value
    fireEvent.change(input, { target: { value: NEW_SUBREDDIT } });
    expect(input.value).toEqual(NEW_SUBREDDIT);
    mockGetPosts('pass', mockPosts_reactjslearn);
    fireEvent.click(button);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    // Check mock api calls
    expect(getPosts).toHaveBeenCalledTimes(2);
    expect(getPosts).toBeCalledWith(expect.stringContaining(defaultSubreddit));
    expect(getPosts).toBeCalledWith(expect.stringContaining(NEW_SUBREDDIT));
  });

  test('show subreddit not found msg when result zero length result', async () => {
    setup('pass', []);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    await screen.findByText('No such subreddit!');
    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test('show network error msg when api call fail', async () => {
    setup('fail', ['Network Error, Check Again!']);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    await screen.findByText('Network Error, Check Again!');
    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test('heatmap value match mock post data', async () => {
    setup('pass', mockPosts_javascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();



  });


})
