import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';

const api = axios.create({ baseURL: BASE_URL });

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = async (username, password) => {
  const { data } = await api.post('/auth/login', {
    username,
    password,
    expiresInMins: 60,
  });
  return data; // { accessToken, refreshToken, id, username, email, ... }
};

// Users
export const fetchUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

// Products
export const fetchProducts = async (limit = 12, skip = 0) => {
  const { data } = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return data; // { products, total, skip, limit }
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
