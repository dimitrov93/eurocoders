import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const getUserById = async (id) => {
  const user = await axios.get(`${BASE_URL}/api/users/${id}`);
  return user;
}

export const getLastFiveUsers = async () => {
    const users = await axios.get(`${BASE_URL}/api/users`);
    return users;
}

export const updateUser = async (id, data) => {
  const updatedUser = await axios.put(`${BASE_URL}/api/users/${id}`, data);
  console.log('updated user: ' + updatedUser);
  return updatedUser
}