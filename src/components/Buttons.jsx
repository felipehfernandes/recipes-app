import React from 'react';
import propTypes from 'prop-types';

export default function Buttons({ handleClick }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
        value="All"
        className="btn-filter"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
        value="meal"
        className="btn-filter"
      >
        Meal
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
        value="drink"
        className="btn-filter"
      >
        Drinks
      </button>
    </div>
  );
}

Buttons.propTypes = {
  handleClick: propTypes.func.isRequired,
};
