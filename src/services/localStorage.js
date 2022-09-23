const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify(email));
};

const saveMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

const saveDrinksToken = (token) => {
  localStorage.setItem('drinksToken', token);
};

export { saveEmail, saveMealsToken, saveDrinksToken };
