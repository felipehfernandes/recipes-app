import React from 'react';
import propTypes from 'prop-types';

import Carousel from 'react-bootstrap/Carousel';

import RecipeCard from './RecipeCard';

export default function Recommendations({ recommendations, title }) {
  return (
    <Carousel>
      <Carousel.Item>
        <RecipeCard
          title={ title }
          recipe={ recommendations[0] }
          index={ 0 }
          type="recommendation"
        />
        <RecipeCard
          title={ title }
          recipe={ recommendations[1] }
          index={ 1 }
          type="recommendation"
        />
      </Carousel.Item>
      <Carousel.Item>
        <RecipeCard
          title={ title }
          recipe={ recommendations[2] }
          index={ 2 }
          type="recommendation"
        />
        <RecipeCard
          title={ title }
          recipe={ recommendations[3] }
          index={ 3 }
          type="recommendation"
        />
      </Carousel.Item>
      <Carousel.Item>
        <RecipeCard
          title={ title }
          recipe={ recommendations[4] }
          index={ 4 }
          type="recommendation"
        />
        <RecipeCard
          title={ title }
          recipe={ recommendations[5] }
          index={ 5 }
          type="recommendation"
        />
      </Carousel.Item>
    </Carousel>
  );
}

Recommendations.propTypes = {
  recommendations: propTypes.arrayOf().isRequired,
  title: propTypes.string.isRequired,
};
