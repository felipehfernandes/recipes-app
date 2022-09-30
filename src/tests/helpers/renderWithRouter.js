import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import App from '../../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  history.push(component);

  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return {
    ...resources,
    history,
  };
};

export default renderWithRouter;
