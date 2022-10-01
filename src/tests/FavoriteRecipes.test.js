import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';

import favoriteMock from './helpers/mockForFavoriteRecipes';

const localStorage = require('../services/localStorage');

const path = '/favorite-recipes';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa a página de Receitas Favoritas', () => {
  test('Se a página possui 3 botões para os filtros', () => {
    renderWithRouter(path);

    const allButton = screen.getByRole('button', { name: 'All' });
    const mealButton = screen.getByRole('button', { name: 'Meal' });
    const drinkButton = screen.getByRole('button', { name: 'Drinks' });

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
  test('Se é salvo no localStorage e mostra os cartões clicando no coração', () => {
    const mockFavorites = [
      {
        id: '52791',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];

    localStorage.saveDoneRecipes = jest.fn()
      .mockReturnValue(mockFavorites).mockReturnValueOnce(favoriteMock);

    renderWithRouter(path);

    const imgOne = screen.getByTestId('1-horizontal-image');
    const imgZero = screen.getByTestId('0-horizontal-image');
    const textOne = screen.getByText('Aquamarine');
    const textZero = screen.getByText('Spicy Arrabiata Penne');

    expect(imgZero).toBeInTheDocument();
    expect(imgOne).toBeInTheDocument();
    expect(textZero).toBeInTheDocument();
    expect(textOne).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('1-horizontal-favorite-btn');

    userEvent.click(favoriteButton);

    expect(imgOne).not.toBeInTheDocument();
    expect(textOne).not.toBeInTheDocument();
  });
});

describe('Testa o filtro de receitas favoritas', () => {
  test('Se os botões de filtro funcionam', () => {
    localStorage.saveDoneRecipes = jest.fn().mockReturnValue(favoriteMock);

    renderWithRouter(path);

    const textOne = screen.getByTestId('1-horizontal-top-text');
    expect(textOne).toBeInTheDocument();

    const mealButton = screen.getByRole('button', { name: 'Meal' });
    userEvent.click(mealButton);

    expect(textOne).not.toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    const zeroImg = screen.getByTestId('0-horizontal-image');

    expect(zeroImg).toBeInTheDocument();
    expect(textOne).not.toBeInTheDocument();

    const drinkButton = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(drinkButton);

    expect(zeroImg).not.toBeInTheDocument();
  });
});
