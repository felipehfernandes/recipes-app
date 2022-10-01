import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste da tela de login', () => {
  test('Se o botão é habilitado ao digitar email e senha corretamente', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'danilo@hotmail.com');
    userEvent.type(passwordInput, '1234567');

    expect(loginButton).toBeEnabled();
  });

  test('Se ao clicar no botão é redirecionado para a tela principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(history.location.pathname).toBe('/');

    userEvent.type(emailInput, 'danilo@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');
  });
});
