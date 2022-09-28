import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import { saveDoneRecipes, saveInProgressRecipes } from '../services/localStorage';

import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';

import '../styles/recipeDetails.css';

export default function RecipeDetails({ match }) {
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);

  const { params: { id }, url } = match;
  const history = useHistory();

  useEffect(() => {
    const getDoneRecipes = saveDoneRecipes('doneRecipes');
    setDoneRecipe(getDoneRecipes.some((recipe) => recipe.id === id));

    const recipeInProgress = saveInProgressRecipes();

    if (recipeInProgress.drinks && Object.keys(recipeInProgress.drinks).includes(id)) {
      setInProgressRecipe(true);
    }
    if (recipeInProgress.meals && Object.keys(recipeInProgress.meals).includes(id)) {
      setInProgressRecipe(true);
    }
  }, []);

  const handleClick = () => {
    if (url.includes('meals')) {
      history.push(`/meals/${id}/in-progress`);
      console.log('entou no if');
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div>
      {
        (url.includes('meals')) ? <MealDetail id={ id } /> : <DrinkDetail id={ id } />
      }
      {
        !doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ handleClick }
          >
            {
              (inProgressRecipe) ? 'Continue Recipe' : 'Start Recipe'
            }
          </button>
        )
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: propTypes.shape().isRequired,
};
