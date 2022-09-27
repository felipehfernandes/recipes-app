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

export {
  saveEmail,
  saveMealsToken,
  saveDrinksToken,
  saveDoneRecipes,
};
