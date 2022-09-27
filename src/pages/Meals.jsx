import React, { useContext, useEffect } from 'react';

import RecipesAppContext from '../context/RecipesAppContext';

import { fetchByIngredients, fetchByCategory } from '../services/API';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesList from '../components/CategoriesList';
import Recipes from '../components/Recipes';

export default function Drinks() {
  const { setSearchAnswer, setCategories } = useContext(RecipesAppContext);

  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await fetchByIngredients('Meals');
      setSearchAnswer(response);
    };
    fetchAnswer();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const { meals } = await fetchByCategory('Meals');
      setCategories(meals);
    };
    fetchCategory();
  }, []);

  return (
    <div>
      <Header title="Meals" />
      <CategoriesList title="Meals" />
      <Recipes title="Meals" />
      <Footer title="Meals" />
    </div>
  );
}
