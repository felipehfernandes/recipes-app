import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { fetchByID, fetchByIngredients } from '../services/API';

import Recommendations from './Recommendations';

export default function DrinkDetail({ id }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { meals } = await fetchByID(id, 'Meals');
      setRecipe(meals[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { drinks } = await fetchByIngredients('Drinks');
      setRecommendations(drinks);
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
        src={ recipe?.strMealThumb }
        alt={ recipe?.strMeal }
      />
      <h1 data-testid="recipe-title">{ recipe?.strMeal }</h1>
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
      <iframe
        data-testid="video"
        src={ recipe?.strYoutube?.replace('watch?v=', 'embed/') }
        title="video"
        width="420"
        height="315"
      >
        Youtube Video
      </iframe>
      {
        recommendations.length > 0 && (
          <Recommendations
            recommendations={ recommendations }
            title="Drinks"
          />
        )
      }
    </div>
  );
}

DrinkDetail.propTypes = {
  id: propTypes.string.isRequired,
};
