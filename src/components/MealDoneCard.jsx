import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import '../styles/doneCard.css';

import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function MealDoneCard({ item, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const { id, image, name, category, doneDate, tags, nationality } = item;

  const handleCopy = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setIsCopied(true);
  };

  return (
    <div>
      <Link to={ `/meals/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          className="recipe-image"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h3>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${nationality} - ${category}` }
        </h4>
        <h5 data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </h5>
        <ul>
          {console.log(tags)}
          {
            tags.slice(0, 2).map((tag, indexTag) => (
              <li
                key={ indexTag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </li>
            ))
          }
        </ul>
      </Link>
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share"
        onClick={ handleCopy }
      />
      {
        isCopied && <p>Link copied!</p>
      }
    </div>
  );
}

MealDoneCard.propTypes = {
  item: propTypes.shape().isRequired,
  index: propTypes.number.isRequired,
};
