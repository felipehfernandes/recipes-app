import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default function Card({ recipe, index, title }) {
  const thumbnail = `str${title.replace('s', '')}Thumb`;
  const str = `str${title.replace('s', '')}`;
  const id = recipe[`id${title.replace('s', '')}`];

  return (
    <div>
      <Link to={ `/${title.toLowerCase()}/${id}` }>
        <li data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe[thumbnail] }
            alt={ recipe[str] }
          />
          <h3 data-testid={ `${index}-card-name` }>{recipe[str]}</h3>
        </li>
      </Link>
    </div>
  );
}

Card.propTypes = {
  recipe: propTypes.shape().isRequired,
  index: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
};
