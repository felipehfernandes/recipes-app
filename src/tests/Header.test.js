import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const searchBtn = 'search-top-btn';
const profileBtn = 'profile-top-btn';

describe('Teste da página inicial do App', () => {
  test('Se na rota raiz "/" não existe o componente Header', () => {
    renderWithRouter(<App />);

    const headerProfile = screen.queryByTestId(profileBtn);
    const headerTitle = screen.queryByTestId('page-title');
    const headerBtn = screen.queryByTestId(searchBtn);

    expect(headerProfile).not.toBeInTheDocument();
    expect(headerTitle).not.toBeInTheDocument();
    expect(headerBtn).not.toBeInTheDocument();
  });
});

describe('Teste do componente Header', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'felipe@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');
  });

  test('Se na rota "/meals" existe o componente Header com os atributos corretos', () => {
    const headerProfile = screen.queryByTestId(profileBtn);
    const headerTitle = screen.queryByTestId('page-title');
    const headerBtn = screen.queryByTestId(searchBtn);

    expect(headerProfile).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(headerBtn).toBeInTheDocument();
  });

  test('Se ao clicar no botão de pesquisa a barra é acionada e vice-versa', () => {
    const headerBtn = screen.getByTestId(searchBtn);

    userEvent.click(headerBtn);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    userEvent.click(headerBtn);

    expect(searchInput).not.toBeInTheDocument();
  });
});

describe('Teste do componente Header para o componente Profile', () => {
  test('Se ao clicar no botão de perfil é redirecionado para a página de perfil', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'felipe@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const profileButton = screen.getByTestId(profileBtn);

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
});
