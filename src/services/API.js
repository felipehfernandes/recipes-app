export const fetchByIngredients = async (title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';

  const endpoint = `https://www.the${search}db.com/api/json/v1/1/search.php?s=`;
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

export const fetchByCategory = async (title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';

  const endpoint = `https://www.the${search}db.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchForEachCategory = async (category, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';

  const endpoint = `https://www.the${search}db.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
