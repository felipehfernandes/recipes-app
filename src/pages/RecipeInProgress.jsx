import React from 'react';
import propTypes from 'prop-types';

import MealInProgress from '../components/MealInProgress';
import DrinksInProgress from '../components/DrinksInProgress';

export default function RecipeInProgress({ match }) {
  const { params: { id }, url } = match;

  return (
    (url.includes('meals'))
      ? <MealInProgress id={ id } match={ match } />
      : <DrinksInProgress id={ id } match={ match } />
  );
}

RecipeInProgress.propTypes = {
  match: propTypes.shape().isRequired,
};
