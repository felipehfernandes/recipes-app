import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import doneMock from './helpers/mockForDoneRecipes';

const localStorage = require('../services/localStorage');

const path = '/done-recipes';

describe('Testa a página de Receitas Feitas', () => {
  test('Se a página possui 3 botões para os filtros', () => {
    renderWithRouter(path);

    const allButton = screen.getByRole('button', { name: 'All' });
    const mealButton = screen.getByRole('button', { name: 'Meal' });
    const drinkButton = screen.getByRole('button', { name: 'Drinks' });

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
  test('Se é salvo no localStorage o tipo de receita feita', () => {
    localStorage.saveDoneRecipes = jest.fn().mockReturnValue(doneMock);

    renderWithRouter(path);

    const imgZero = screen.getByTestId('0-horizontal-image');
    const imgOne = screen.getByTestId('1-horizontal-image');

    const textZero = screen.getByText('Spicy Arrabiata Penne');
    const textOne = screen.getByText('Aquamarine');

    expect(imgZero).toBeInTheDocument();
    expect(imgOne).toBeInTheDocument();
    expect(textZero).toBeInTheDocument();
    expect(textOne).toBeInTheDocument();
  });
});
describe('Testa os botões de filtros estão funcionando corretamente', () => {
  test('Botão de filtro Meals', () => {
    localStorage.saveDoneRecipes = jest.fn().mockReturnValue(doneMock);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderWithRouter(path);

    const imageOne = screen.getByTestId('1-horizontal-image');

    expect(imageOne).toBeInTheDocument();

    const mealButton = screen.getByRole('button', { name: 'Meal' });
    userEvent.click(mealButton);

    expect(imageOne).not.toBeInTheDocument();

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  test('Botão de filtro Drinks depois o botão All', () => {
    localStorage.saveDoneRecipes = jest.fn().mockReturnValue(doneMock);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderWithRouter(path);

    const textOne = screen.getByTestId('0-horizontal-name');

    expect(textOne).toBeInTheDocument();

    const drinksButton = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(drinksButton);

    expect(textOne).not.toBeInTheDocument();

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    expect(textOne).not.toBeInTheDocument();
  });
});
