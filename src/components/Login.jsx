import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const minPasswordLength = 6;
const URL = 'https://img.freepik.com/fotos-gratis/massa-de-tagliatelle-cru-perto-e-ingredientes-e-molho-de-tomate-sobre-o-plano-de-fundo-texturizado-de-madeira_23-2148195011.jpg?w=2000';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleChange = (value, func) => func(value);

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
    <main className="main-login">
      <form onSubmit={ handleSubmit } className="form-login">
        <h1 className="title-login">Recipes App</h1>

        <label htmlFor="email-input" className="label-email">
          E-mail
          <input
            className="input-email"
            id="email-input"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target: { value } }) => (handleChange(value, setEmail)) }
          />
        </label>

        <label htmlFor="password-input" className="label-senha">
          Senha
          <input
            className="input-email"
            id="password-input"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target: { value } }) => (handleChange(value, setPassword)) }
          />
        </label>

        <button
          className="btn-submit-login"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validateLogin() }
        >
          Enter
        </button>

        <img
          src={ URL }
          alt="background"
          className="background-image"
        />
      </form>
    </main>
  );
}

export default Login;
