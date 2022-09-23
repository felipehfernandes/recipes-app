import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  saveEmail,
  saveMealsToken,
  saveDrinksToken,
} from '../services/localStorage';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email };

    saveEmail(user);
    saveMealsToken('1');
    saveDrinksToken('1');

    history.push('/meals');
  };

  useEffect(() => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validEmail = regex.test(email);
    const minPasswordLength = 6;
    const validPassword = password.length > minPasswordLength;

    if (validEmail && validPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email-input">
        E-mail
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
