import axios from 'axios';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, user: IUser) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const createUser = async (user: IUser) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const getUserLogin = async (login: ILogin) => {
  const response = await api.post('/login', login);
  return response.data;
};
