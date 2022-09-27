import React from 'react';
import propTypes from 'prop-types';

import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';

export default function RecipeDetails({ match }) {
  const getPage = () => {
    const { params: { id } } = match;
    if (match.url.includes('meals')) {
      return <MealDetail id={ id } />;
    }
    return <DrinkDetail id={ id } />;
  };

  return (
    <div>
      {getPage()}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: propTypes.shape().isRequired,
};
