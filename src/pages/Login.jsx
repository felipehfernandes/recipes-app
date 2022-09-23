import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email-input">
        E-mail
        <input id="email-input" type="text" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        Senha
        <input id="password-input" type="password" data-testid="password-input" />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
