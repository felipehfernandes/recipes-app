import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';

import { fetchForEachCategory, fetchByIngredients } from '../services/API';

import RecipesAppContext from '../context/RecipesAppContext';

export default function CategoryCard({ category, title }) {
  const { setSearchAnswer } = useContext(RecipesAppContext);

  const [isInitial, setInitial] = useState(true);

  const handleFetch = async () => {
    const response = await fetchForEachCategory(category.strCategory, title);
    setSearchAnswer(response);
    setInitial(false);
  };

  const handleClick = async () => {
    const response = await fetchByIngredients(title);
    setSearchAnswer(response);
    setInitial(true);
  };

  const categoryFix = category.strCategory.replace('/', ' ');

  return (
    <button
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ isInitial ? handleFetch : handleClick }
    >
      { categoryFix }
    </button>
  );
}

CategoryCard.propTypes = {
  category: propTypes.shape().isRequired,
  title: propTypes.string.isRequired,
};
