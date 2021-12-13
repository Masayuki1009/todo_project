const TOKEN = 'token';

const get = () => {
  return localStorage.getItem(TOKEN);
};

const set = (token) => {
  localStorage.setItem(TOKEN, token);
};

const remove = () => {
  localStorage.removeItem(TOKEN);
};

export const tokenManager = Object.freeze({ get, set, remove });
