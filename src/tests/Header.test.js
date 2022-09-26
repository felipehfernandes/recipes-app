import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const searchBtn = 'search-top-btn';

describe('Teste do componente Header', () => {
  test('Se na rota raiz "/" não possui o componente Header', () => {
    renderWithRouter(<App />);

    const headerProfile = screen.queryByTestId('profile-top-btn');
    const headerTitle = screen.queryByTestId('page-title');
    const headerBtn = screen.queryByTestId(searchBtn);

    expect(headerProfile).not.toBeInTheDocument();
    expect(headerTitle).not.toBeInTheDocument();
    expect(headerBtn).not.toBeInTheDocument();
  });
  test('Se na rota "/meals" possui o Header com os atributos corretos', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'felipe@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const headerProfile = screen.getByTestId('profile-top-btn');
    const headerTitle = screen.getByTestId('page-title');
    const headerBtn = screen.getByTestId(searchBtn);

    expect(headerProfile).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(headerBtn).toBeInTheDocument();
  });
  test('Se ao clicar no botão de pesquisa a barra é acionada e vice-versa', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'felipe@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const headerBtn = screen.getByTestId(searchBtn);

    userEvent.click(headerBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(headerBtn);

    expect(searchInput).not.toBeInTheDocument();
  });
});
