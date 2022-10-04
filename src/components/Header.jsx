import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import SearchBar from './SearchBar';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [search, setSearch] = useState(false);

  const isShowingSearchBar = title === 'Meals' || title === 'Drinks';

  const handleSearch = () => setSearch((prev) => !prev);

  return (
    <div className="header">
      <header>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="profile"
            className="btn-profile"
          />
        </Link>
        {isShowingSearchBar && (
          <button type="button" onClick={ handleSearch } className="search-button">
            <img
              data-testid="search-top-btn"
              src={ SearchIcon }
              alt="search"
            />
          </button>
        )}
        <h1 data-testid="page-title" className="title-header">{ title }</h1>
      </header>
      {search && <SearchBar title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
