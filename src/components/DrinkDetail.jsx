import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { fetchByID } from '../services/API';

export default function DrinkDetail({ id }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { drinks } = await fetchByID(id, 'Drinks');
      setRecipe(drinks[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const ingredientFirst = Object.keys(recipe).indexOf('strIngredient1');
    const ingredientLast = Object.keys(recipe).indexOf('strIngredient15');
    const measureFirst = Object.keys(recipe).indexOf('strMeasure1');
    const measureLast = Object.keys(recipe).indexOf('strMeasure15');

    const ingredientValues = Object.values(recipe).slice(ingredientFirst, ingredientLast);
    const measureValues = Object.values(recipe).slice(measureFirst, measureLast);

    setIngredients(ingredientValues.filter((ingredient) => ingredient !== null));
    setMeasures(measureValues.filter((measure) => measure !== null));
  }, [recipe]);

  const isAlcoholic = recipe?.strAlcoholic === 'Alcoholic' ? '- Alcoholic' : '';

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb }
        alt={ recipe?.strDrink }
      />
      <h1 data-testid="recipe-title">{ recipe?.strDrink }</h1>
      <h2 data-testid="recipe-category">
        {
          `${recipe?.strCategory} ${isAlcoholic}`
        }
      </h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ingredient} - ${measures[index]}`}
          </li>
        ))}
      </ul>
      <fieldset>
        <p data-testid="instructions">
          { recipe?.strInstructions }
        </p>
      </fieldset>
    </div>
  );
}

DrinkDetail.propTypes = {
  id: propTypes.string.isRequired,
};
