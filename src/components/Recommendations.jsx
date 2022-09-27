import React from 'react';
import propTypes from 'prop-types';

import RecipeCard from './RecipeCard';

export default function Recommendations({ recommendations, title }) {
  return (
    <div>
      <RecipeCard
        title={ title }
        recipe={ recommendations[0] }
        index={ 0 }
      />
      <RecipeCard
        title={ title }
        recipe={ recommendations[1] }
        index={ 1 }
      />
      <RecipeCard
        title={ title }
        recipe={ recommendations[2] }
        index={ 2 }
      />
      <RecipeCard
        title={ title }
        recipe={ recommendations[3] }
        index={ 3 }
      />
      <RecipeCard
        title={ title }
        recipe={ recommendations[4] }
        index={ 4 }
      />
      <RecipeCard
        title={ title }
        recipe={ recommendations[5] }
        index={ 5 }
      />
    </div>
  );
}

Recommendations.propTypes = {
  recommendations: propTypes.arrayOf().isRequired,
  title: propTypes.string.isRequired,
};
