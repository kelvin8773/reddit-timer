import React from 'react';
import { render, screen } from '@testing-library/react';

import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';

import Search from './search';

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
  );
}

describe('Search Page', () => {
  test('Search Form is loaded', () => {
    setup(<Search />, 'search', 'javascript');
    expect(screen.getByTestId('searchForm')).toBeInTheDocument();
  })

})
