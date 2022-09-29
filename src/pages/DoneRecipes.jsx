import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { saveDoneRecipes } from '../services/localStorage';

import Header from '../components/Header';

import shareIcon from '../images/shareIcon.svg';

export default function Complete() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);
  const [isShowing, setIsShowing] = useState([]);

  useEffect(() => {
    const allDoneRecipes = saveDoneRecipes('doneRecipes');

    setDoneRecipes(allDoneRecipes);
    setIsShowing(allDoneRecipes);

    const doneMealsRecipes = allDoneRecipes.filter(
      (recipe) => recipe.type === 'meal',
    );
    setDoneMeals(doneMealsRecipes);

    const doneMDrinksRecipes = allDoneRecipes.filter(
      (recipe) => recipe.type === 'drinks',
    );
    setDoneDrinks(doneMDrinksRecipes);
  }, []);

  const handleClick = (type) => setIsShowing(type);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value={ doneRecipes }
          onClick={ ({ target: { value } }) => handleClick(value) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value={ doneMeals }
          onClick={ ({ target: { value } }) => handleClick(value) }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value={ doneDrinks }
          onClick={ ({ target: { value } }) => handleClick(value) }
        >
          Drinks
        </button>
        <ul>
          {
            isShowing.map((recipeItem, index) => (
              <li key={ recipeItem.id }>
                <Link to={ `/${recipeItem.type}s/${recipeItem.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipeItem.image }
                    alt={ recipeItem.name }
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    { recipeItem.name }
                  </h3>
                  <h4 data-testid={ `${index}-horizontal-top-text` }>
                    { recipeItem.category }
                  </h4>
                  <h5 data-testid={ `${index}-horizontal-done-date` }>
                    { recipeItem.doneDate }
                  </h5>
                </Link>
                <input
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                />
                {
                  recipeItem.tags.length > 0 && (
                    <ul>
                      {
                        recipeItem.tags.map((tag, indexTag) => (
                          <li
                            key={ indexTag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            { tag }
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
