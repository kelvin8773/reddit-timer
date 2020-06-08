import React from 'react';
import {
  render, screen, waitForElementToBeRemoved, fireEvent, within,
} from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';

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
import mockPostsLearnjavascript from '../helper/__mocks__/mockPosts_learnjavascript.json';
import mockPostsJavascript from '../helper/__mocks__/mockPosts_javascript.json';

const { defaultSubreddit } = searchJson;
jest.mock('../helper/redditAPI');

const mockGetPosts = (state, data) => {
  if (state === 'pass') {
    getPosts.mockResolvedValueOnce(data);
  } else if (state === 'fail') {
    getPosts.mockRejectedValue(new Error(data[0]));
  }
};

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const getRandomCellIds = (numberOfCells) => {
  const randomCellIds = [];
  for (let i = 0; i < numberOfCells; i += 1) {
    const randomWeekday = getRandomInt(7);
    const randomHour = getRandomInt(24);
    const randomCellTestId = `cell-${(randomWeekday * 100 + randomHour).toString()}`;

    randomCellIds.push({
      id: randomCellTestId,
      day: randomWeekday,
      hour: randomHour,
    });
  }
  return randomCellIds;
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
      </Provider>,
    )
  );
};

afterEach(() => jest.clearAllMocks());

describe('Search page', () => {
  test('loading default subreddit and search new subreddit success flow', async () => {
    setup('pass', mockPostsJavascript);

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
    mockGetPosts('pass', mockPostsLearnjavascript);
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

  xtest('heatmap value match all mock posts data & use correct color', async () => {
    setup('pass', mockPostsJavascript);
    const heatMapData = convertToHeatMapData(mockPostsJavascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    const heatMap = screen.getByTestId('heatMap');
    const rows = within(heatMap).getAllByRole('row');

    rows.forEach((row, weekday) => {
      const cells = within(row).getAllByRole('cell');
      cells.forEach((cell, hour) => {
        if (hour !== 0) {
          const showNumber = parseInt(cell.textContent, 10);
          const expectColor = HEATMAP_COLORS[showNumber] || HEATMAP_COLORS[10];
          expect(showNumber).toEqual(heatMapData[weekday][hour - 1].length);
          expect(cell).toHaveStyle('background:', expectColor);
        }
      });
    });
    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test('heatmap value match random mock posts & use correct color', async () => {
    setup('pass', mockPostsLearnjavascript);
    const heatMapData = convertToHeatMapData(mockPostsLearnjavascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();
    const randomCellIds = getRandomCellIds(20);

    randomCellIds.forEach((cell) => {
      const randomCell = screen.getByTestId(cell.id);
      const showNumber = parseInt(randomCell.textContent, 10);
      const expectColor = HEATMAP_COLORS[showNumber] || HEATMAP_COLORS[10];
      expect(showNumber).toEqual(heatMapData[cell.day][cell.hour].length);
      expect(randomCell).toHaveStyle('background:', expectColor);
    });
  });

  test('heatmap display the correct timezone', async () => {
    setup('pass', mockPostsJavascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();

    const timezoneMsg = screen.getByTestId('timezoneMsg');
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    expect(timezoneMsg.textContent).toBe(`All times are shown in your timezone: ${localTimezone}`);
    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test('post Table show up when random click on heatmap with right posts', async () => {
    setup('pass', mockPostsJavascript);
    const heatMapData = convertToHeatMapData(mockPostsJavascript);
    await waitForElementToBeRemoved(screen.getByTestId('loadSpinner'));
    expect(screen.getByTestId('heatMap')).toBeInTheDocument();
    const randomCellIds = getRandomCellIds(10);

    randomCellIds.forEach((cell) => {
      const randomCell = screen.getByTestId(cell.id);
      const getMin = (utc) => dayjs.unix(utc).minute();
      const posts = heatMapData[cell.day][cell.hour];
      posts.sort((a, b) => getMin(a.created_utc) - getMin(b.created_utc));

      if (parseInt(randomCell.textContent, 10) !== 0) {
        fireEvent.click(randomCell);
        const postTable = screen.getByTestId('postTable');
        const postTableRows = within(postTable).getAllByRole('row');

        postTableRows.forEach((row, idx) => {
          if (idx !== 0) {
            within(row).getByText(posts[idx - 1].title);
            within(row).getByText(dayjs.unix(posts[idx - 1].created_utc).format('h:mma'));
            within(row).getByText((posts[idx - 1].score).toString());
            // within(row).getByText((posts[idx - 1].num_comments).toString());
            within(row).getByText(posts[idx - 1].author);
          }
        });
      }
    });
  });
});
