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

const saveInProgressRecipes = (recipes) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
  const inProgressRecipes = readSpecificKey('inProgressRecipes');
  return inProgressRecipes;
};

const getInProgressRecipes = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
  }
  return readSpecificKey('inProgressRecipes');
};

const saveFavoriteRecipes = (favorite) => {
  if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    const savedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...savedFavoriteRecipes, favorite],
    ));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
  }
};

const getFavoriteRecipes = () => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return favoriteList;
};

const delFavoriteRecipes = (id) => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteList = favoriteList.filter((e) => e.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
};

const deleteFavoriteRecipes = (key, id) => {
  const getByKey = readSpecificKey(key);
  const newByKey = getByKey.filter((e) => e.id !== id);
  localStorage.setItem(key, JSON.stringify(newByKey));
};

const saveOnIt = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {
  saveEmail,
  saveMealsToken,
  saveDrinksToken,
  saveDoneRecipes,
  saveInProgressRecipes,
  saveFavoriteRecipes,
  getFavoriteRecipes,
  delFavoriteRecipes,
  getInProgressRecipes,
  deleteFavoriteRecipes,
  saveOnIt,
};
