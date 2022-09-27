export const fetchByIngredients = async (value, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';

  const endpoint = `https://www.the${search}db.com/api/json/v1/1/search.php?i=${value}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchByName = async (value, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';

  const endpoint = `https://www.the${search}db.com/api/json/v1/1/search.php?s=${value}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchSearch = async (value, filter, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';
  const radio = filter === 'i' ? 'filter' : 'search';

  const valueFix = value.replaceAll(' ', '+');

  const endpoint = `https://www.the${search}db.com/api/json/v1/1/${radio}.php?${filter}=${valueFix}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
