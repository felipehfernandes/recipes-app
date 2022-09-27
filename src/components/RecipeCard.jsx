import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default function Card({ recipe, index, title, type }) {
  const thumbnail = `str${title.replace('s', '')}Thumb`;
  const str = `str${title.replace('s', '')}`;
  const id = recipe[`id${title.replace('s', '')}`];

  const titleForEachID = type === 'recipes'
    ? `${index}-recipe-card` : `${index}-recommendation-card`;

  const nameForEachID = type === 'recipes'
    ? `${index}-card-name` : `${index}-recommendation-title`;

  return (
    <div>
      <Link to={ `/${title.toLowerCase()}/${id}` }>
        <li data-testid={ titleForEachID }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe[thumbnail] }
            alt={ recipe[str] }
          />
          <h3 data-testid={ nameForEachID }>{recipe[str]}</h3>
        </li>
      </Link>
    </div>
  );
}

Card.propTypes = {
  recipe: propTypes.shape().isRequired,
  index: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
};
