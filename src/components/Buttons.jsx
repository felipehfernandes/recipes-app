import React from 'react';
import propTypes from 'prop-types';

export default function Buttons({ handleClick }) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
        value="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
        value="meal"
      >
        Meal
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
        value="drink"
      >
        Drinks
      </button>
    </div>
  );
}

Buttons.propTypes = {
  handleClick: propTypes.func.isRequired,
};
