import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Provider } from 'react-redux';
import store from '../redux/store';
import Theme from '../stylesheets/theme/theme';
import searchJson from '../helper/search.json';
import Main from './index';


const setup = (component, history) => (
  render(
    <Provider store={store}>
      <Theme>
        <Router history={history}>
          {component}
        </Router>
      </Theme>
    </Provider>
  )
);

describe('main content', () => {
  const sections = [
    { id: 'howItWorks', showTitle: 'How it works' },
    { id: 'about', showTitle: 'About' },
  ];

  test('Info sections are loaded on Home Page', () => {
    const history = createMemoryHistory();
    setup(<Main />, history);

    sections.forEach(section => {
      expect(screen.getByTestId(section.id)).toBeInTheDocument();
      expect(screen.getByText(section.showTitle)).toBeInTheDocument();
      console.log(section.showTitle + " is loaded.");
    });

  });

  test('click Home Button to enter search Page', () => {
    const history = createMemoryHistory();
    setup(<Main />, history);
    const homeButton = screen.getByText(/show me the best time/i)
    expect(homeButton).toBeInTheDocument();
    user.click(homeButton);

    expect(screen.queryByText(/search/i)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(searchJson.defaultSubreddit)).toBeInTheDocument();
  });

  test('click Hero Img to enter search Page', () => {
    const history = createMemoryHistory();
    setup(<Main />, history);
    const heroImg = screen.getByAltText(/heat map/i)
    expect(heroImg).toBeInTheDocument();
    user.click(heroImg);

    expect(screen.queryByText(/search/i)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(searchJson.defaultSubreddit)).toBeInTheDocument();

  });

  const routes = [
    { path: '/', showText: 'r/javascript' },
    { path: '/search/javascript', showText: 'javascript' },
    { path: '/search/reactjs', showText: 'reactjs' },
  ];

  test.each(routes)('render different %s route', (route) => {
    const history = createMemoryHistory();
    history.push(route.path);
    setup(<Main />, history);
    const pageContent = screen.queryByDisplayValue(route.showText)
      || screen.queryByText(route.showText)
    expect(pageContent).toBeInTheDocument();
  });

})