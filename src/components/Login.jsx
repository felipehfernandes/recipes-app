import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const minPasswordLength = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleChange = (value, func) => func(value);

  // Validando email e senha com o botão
  const validateEmail = (emailInput) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(emailInput);
  };

  const validatePassword = (passwordInput) => passwordInput.length > minPasswordLength;

  const validateLogin = () => validateEmail(email) && validatePassword(password);

  const handleSubmit = () => {
    const obj = { email };

    localStorage.setItem('user', JSON.stringify(obj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);

    history.push('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email-input">
        E-mail
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => (handleChange(value, setEmail)) }
        />
      </label>

      <label htmlFor="password-input">
        Senha
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => (handleChange(value, setPassword)) }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !validateLogin() }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
