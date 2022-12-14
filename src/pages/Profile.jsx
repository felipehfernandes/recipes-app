import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { saveDoneRecipes } from '../services/localStorage';

function Profile() {
  const [emailProfile, setEmailProfile] = useState('');

  useEffect(() => {
    const { email } = saveDoneRecipes('user');
    setEmailProfile(email);
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">
        {
          emailProfile
        }
      </h3>
      <div className="category-filter">
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="btn-filter"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="btn-filter"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
            className="btn-filter"
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer title="Profile" />
    </div>
  );
}

export default Profile;
