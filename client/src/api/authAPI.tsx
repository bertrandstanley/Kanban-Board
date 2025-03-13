import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

export const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post('/auth/login', userInfo);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Invalid username or password');
    } else {
      throw new Error('Could not connect to the server. Please try again later.');
    }
  }
};