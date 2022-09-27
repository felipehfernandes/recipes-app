import React from 'react';
import propTypes from 'prop-types';

export default function Card({ recipe, index, title }) {
  const thumbnail = `str${title.replace('s', '')}Thumb`;
  const str = `str${title.replace('s', '')}`;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe[thumbnail] }
        alt={ recipe[str] }
        width="200px"
      />
      <h3 data-testid={ `${index}-card-name` }>{ recipe[str] }</h3>
    </div>
  );
}

Card.propTypes = {
  recipe: propTypes.shape().isRequired,
  index: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
};
