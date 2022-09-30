import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';

const localStorage = require('../services/localStorage');

const path = '/profile';
const emailTest = 'test@gmail.com';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa a página de Perfil', () => {
  test('Se o e-mail é salvo no localStorage quando clica no botão de perfil', () => {
    jest.spyOn(localStorage, 'saveOnIt');
    localStorage.saveOnIt('user', { email: emailTest });

    const { history } = renderWithRouter(path);

    const email = screen.getByText(emailTest);
    const profileButton = screen.getByTestId('profile-done-btn');

    expect(email).toBeInTheDocument();

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Se redireciona para Receitas Favoritas', () => {
    jest.spyOn(localStorage, 'saveOnIt');
    localStorage.saveOnIt('user', { email: emailTest });

    const { history } = renderWithRouter(path);

    const email = screen.getByText(emailTest);
    const profileFavButton = screen.getByTestId('profile-favorite-btn');

    expect(email).toBeInTheDocument();

    userEvent.click(profileFavButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Se redireciona para Home', () => {
    jest.spyOn(localStorage, 'saveOnIt');
    localStorage.saveOnIt('user', { email: emailTest });

    const { history } = renderWithRouter(path);

    const email = screen.getByText(emailTest);
    const profileLogoutButton = screen.getByTestId('profile-logout-btn');

    expect(email).toBeInTheDocument();

    userEvent.click(profileLogoutButton);

    expect(history.location.pathname).toBe('/');
  });
});
