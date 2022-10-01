import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const mealsButton = screen.queryByTestId('meals-bottom-btn');
const drinksButton = screen.queryByTestId('drinks-bottom-btn');

describe('Testa quando o componente Footer é renderizado', () => {
  test('Se os botões do Footer redirecionam para a rota correta', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'user@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');

    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });

  test('Se na rota "/meals" é renderizado o Footer', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');

    expect(history.location.pathname).toBe('/meals');
    expect(mealsButton).toBeDefined();
    expect(drinksButton).toBeDefined();
  });

  test('Se na rota "/drinks" é renderizado o Footer', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    expect(history.location.pathname).toBe('/drinks');
    expect(mealsButton).toBeDefined();
    expect(drinksButton).toBeDefined();
  });

  test('Se na rota "/profile" é renderizado o Footer', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    expect(history.location.pathname).toBe('/profile');
    expect(mealsButton).toBeDefined();
    expect(drinksButton).toBeDefined();
  });
});

describe('Testa quando o componente Footer não é renderizado', () => {
  test('Se na rota "/" NÃO é renderizado o Footer', () => {
    renderWithRouter(<App />);

    expect(mealsButton).not.toBeInTheDocument();
    expect(drinksButton).not.toBeInTheDocument();
  });

  test('Se na rota "/done-recipes" NÃO é renderizado o Footer', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/done-recipes');

    expect(history.location.pathname).toBe('/done-recipes');
    expect(mealsButton).not.toBeInTheDocument();
    expect(drinksButton).not.toBeInTheDocument();
  });

  test('Se na rota "/favorite-recipes" NÃO é renderizado o Footer', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorite-recipes');

    expect(history.location.pathname).toBe('/favorite-recipes');
    expect(mealsButton).not.toBeInTheDocument();
    expect(drinksButton).not.toBeInTheDocument();
  });
});
