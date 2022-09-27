import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { saveDoneRecipes } from '../services/localStorage';

import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';

import '../styles/recipeDetails.css';

export default function RecipeDetails({ match }) {
  const [doneRecipe, setDoneRecipe] = useState(false);

  const { params: { id }, url } = match;
  const page = url.includes('meals');

  useEffect(() => {
    const getDoneRecipes = saveDoneRecipes('doneRecipes');
    setDoneRecipe(getDoneRecipes.some((recipe) => recipe.id === id));
  }, []);

  return (
    <div>
      {
        (page) ? <MealDetail id={ id } /> : <DrinkDetail id={ id } />
      }
      {
        !doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Start Recipe
          </button>
        )
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: propTypes.shape().isRequired,
};
