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
