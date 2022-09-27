import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';

import RecipesAppContext from '../context/RecipesAppContext';

import Card from './Card';

const cardsLimitPerPage = 12;

export default function List({ title }) {
  const [recipes, setRecipes] = useState([]);

  const { searchAnswer } = useContext(RecipesAppContext);

  useEffect(() => {
    setRecipes(searchAnswer[title.toLowerCase()]);
  }, [searchAnswer]);

  const newID = `id${title.replace('s', '')}`;

  return (
    <div>
      {
        recipes.map((recipe, index) => {
          if (index >= cardsLimitPerPage) return null;

          return (
            <Card
              key={ recipe[newID] }
              recipe={ recipe }
              index={ index }
              title={ title }
            />
          );
        })
      }
    </div>
  );
}

List.propTypes = {
  title: propTypes.string.isRequired,
};
