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
      const response = await fetchByIngredients('Drinks');
      setSearchAnswer(response);
    };
    fetchAnswer();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const { drinks } = await fetchByCategory('Drinks');
      setCategories(drinks);
    };
    fetchCategory();
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      <CategoriesList title="Drinks" />
      <Recipes title="Drinks" />
      <Footer title="Drinks" />
    </div>
  );
}
