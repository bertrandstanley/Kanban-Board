import { UserLogin } from "../interfaces/UserLogin";  // Import UserLogin interface
import axios from 'axios';

// Login function using axios to communicate with the backend API
export const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the backend API with the login credentials
    const response = await axios.post('http://localhost:3000/auth/login', userInfo);

    // Check if the response contains data (e.g., JWT token or user data)
    return response.data;  // Return the login data (e.g., token or user info)
  } catch (error) {
    // Handle error in case the login fails
    if (axios.isAxiosError(error) && error.response) {
      // If the server responded with an error, throw the message from the server
      throw new Error(error.response.data.message || 'Invalid username or password');
    } else {
      // If there is no response (e.g., network error), throw a generic error
      throw new Error('Could not connect to the server. Please try again later.');
    }
  }
};
