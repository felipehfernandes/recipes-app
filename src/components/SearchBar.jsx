import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import RecipesAppContext from '../context/RecipesAppContext';

import { fetchSearch } from '../services/API';

export default function SearchBar({ title }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('i');

  const history = useHistory();

  const { setSearchAnswer } = useContext(RecipesAppContext);

  const handleChange = (value, func) => func(value);

  const fetchFilter = async () => {
    const response = await fetchSearch(search, filter, title);

    if (response[title.toLowerCase()] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
    if (response[title.toLowerCase()].length === 1) {
      const id = response[title.toLowerCase()][0][`id${title.replace('s', '')}`];
      history.push(`/${title.toLowerCase()}/${id}`);
    }
    setSearchAnswer(response);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length > 1 && filter === 'f') {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }

    fetchFilter();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className="search">
        <input
          data-testid="search-input"
          type="text"
          placeholder={ `Search ${title}` }
          value={ search }
          onChange={ ({ target: { value } }) => (handleChange(value, setSearch)) }
          className="search-bar"
        />

        <button
          data-testid="exec-search-btn"
          type="submit"
          className="search-btn"
        >
          Search
        </button>
      </div>

      <div>
        <label htmlFor="ingredient" className="search-select">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="radios"
            value="i"
            onChange={ ({ target: { value } }) => (handleChange(value, setFilter)) }
            checked={ filter === 'i' }
          />
          Ingredient
        </label>

        <label htmlFor="name" className="search-select">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="radios"
            value="s"
            onChange={ ({ target: { value } }) => (handleChange(value, setFilter)) }
            checked={ filter === 's' }
          />
          Name
        </label>

        <label htmlFor="first letter" className="search-select">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first letter"
            name="radios"
            value="f"
            onChange={ ({ target: { value } }) => (handleChange(value, setFilter)) }
            checked={ filter === 'f' }
          />
          First Letter
        </label>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  title: propTypes.string.isRequired,
};
