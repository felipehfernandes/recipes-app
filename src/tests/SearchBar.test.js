import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

const nullResult = { meals: null };
const eInput = 'email-input';
const pInput = 'password-input';
const lButton = 'login-submit-btn';
const hdnButton = 'search-top-btn';
const schInput = 'search-input';
const schButton = 'exec-search-btn';

describe('Teste do componente SearchBar', () => {
  test('Verifica o funcionamento da pesquisa pelo filtro "Ingredient"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals).mockResolvedValue(nullResult),
    });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(eInput);
    const passwordInput = screen.getByTestId(pInput);
    const loginButton = screen.getByTestId(lButton);

    userEvent.type(emailInput, 'user1@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const headerBtn = screen.getByTestId(hdnButton);

    userEvent.click(headerBtn);

    const searchInput = screen.getByTestId(schInput);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(schButton);

    userEvent.type(searchInput, 'onions');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  test('Verifica o funcionamento da pesquisa pelo filtro "Name"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals).mockResolvedValue(nullResult),
    });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(eInput);
    const passwordInput = screen.getByTestId(pInput);
    const loginButton = screen.getByTestId(lButton);

    userEvent.type(emailInput, 'user2@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const headerBtn = screen.getByTestId(hdnButton);

    userEvent.click(headerBtn);

    const searchInput = screen.getByTestId(schInput);
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(schButton);

    userEvent.type(searchInput, 'aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  test('Verifica o funcionamento da pesquisa pelo filtro "First Letter"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals).mockResolvedValue(nullResult),
    });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(eInput);
    const passwordInput = screen.getByTestId(pInput);
    const loginButton = screen.getByTestId(lButton);

    userEvent.type(emailInput, 'user3@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const headerBtn = screen.getByTestId(hdnButton);

    userEvent.click(headerBtn);

    const searchInput = screen.getByTestId(schInput);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(schButton);

    userEvent.type(searchInput, 'tr');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
