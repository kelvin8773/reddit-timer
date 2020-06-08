import React from 'react';
import { render, screen, waitForElementToBeRemoved, fireEvent, within } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';

// import helper
import getPosts from '../helper/redditAPI';
import {
  HEATMAP_COLORS,
} from '../helper/constants';

// component to test
import Search, { convertToHeatMapData } from './search';

// import mock data
import searchJson from '../helper/search.json';
import mockPosts_learnjavascript from '../helper/__mocks__/mockPosts_learnjavascript.json';
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

    const NEW_SUBREDDIT = 'learnjavascript';
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
    mockGetPosts('pass', mockPosts_learnjavascript);
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

  test('heatmap value match mock post data & use correct color', async () => {
    setup('pass', mockPosts_javascript);
    const heatMapData = convertToHeatMapData(mockPosts_javascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();
    const rows = screen.getAllByRole('row');

    rows.map((row, weekday) => {
      const cells = within(row).getAllByRole('cell');
      cells.map((cell, hour) => {
        if (hour !== 0) {
          const showNumber = parseInt(cell.textContent, 10);
          const expectColor = HEATMAP_COLORS[showNumber] || HEATMAP_COLORS[10];
          expect(showNumber).toEqual(heatMapData[weekday][hour - 1].length);
          expect(cell).toHaveStyle('background:', expectColor);
        }
      })
    });
    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test('heatmap display the correct timezone', async () => {
    setup('pass', mockPosts_javascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    const timezoneMsg = screen.getByTestId('timezoneMsg');
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    expect(timezoneMsg.textContent).toBe(`All times are shown in your timezone: ${localTimezone}`);
    expect(getPosts).toHaveBeenCalledTimes(1);
  });




})
