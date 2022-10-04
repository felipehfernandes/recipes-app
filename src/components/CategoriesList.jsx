import React, { useContext } from 'react';
import propTypes from 'prop-types';

import RecipesAppContext from '../context/RecipesAppContext';

import { fetchByIngredients } from '../services/API';

import CategoryCard from './CategoryCard';

const categoriesLimitPerPage = 5;

export default function CategoriesList({ title }) {
  const { categories, setSearchAnswer } = useContext(RecipesAppContext);

  const handleClick = async () => {
    const response = await fetchByIngredients(title);
    setSearchAnswer(response);
  };

  const showByPageLimit = categories.slice(0, categoriesLimitPerPage);

  return (
    <div className="category-filter">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClick }
        className="btn-filter"
      >
        All
      </button>
      {
        showByPageLimit.map((category, index) => (
          <CategoryCard
            key={ index }
            category={ category }
            title={ title }
          />
        ))
      }
    </div>
  );
}

CategoriesList.propTypes = {
  title: propTypes.string.isRequired,
};
