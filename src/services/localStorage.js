const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify(email));
};

const saveMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

const saveDrinksToken = (token) => {
  localStorage.setItem('drinksToken', token);
};

const readSpecificKey = (key) => JSON.parse(localStorage.getItem(key));

const saveDoneRecipes = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  const doneRecipes = readSpecificKey(key);
  return doneRecipes;
};

const saveInProgressRecipes = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
  }

  const inProgressRecipes = readSpecificKey('inProgressRecipes');
  return inProgressRecipes;
};

const saveFavoriteRecipes = (favorite) => {
  if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    const savedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(savedFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...savedFavoriteRecipes, favorite],
    ));
  } else {
    console.log(favorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
  }
};

export {
  saveEmail,
  saveMealsToken,
  saveDrinksToken,
  saveDoneRecipes,
  saveInProgressRecipes,
  saveFavoriteRecipes,
};
