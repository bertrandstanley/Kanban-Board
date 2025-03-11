// Importing necessary types and functions for JWT decoding
import { type JwtPayload, jwtDecode } from 'jwt-decode';

// AuthService class to handle authentication logic
class AuthService {
  
  // Method to handle login and store token and user ID in localStorage
  login(idToken: string) {
    // Parse the provided idToken into a JavaScript object
    const payload = JSON.parse(idToken);

    // Store the token and user ID in localStorage for session persistence
    localStorage.setItem('id_token', payload.token);
    localStorage.setItem('user_id', payload.userID);

    // Redirect user to the homepage or any other page after login
    window.location.assign('/');
  }

  // Method to get the user ID from localStorage
  getUserID(): string {
    // Retrieve the user ID from localStorage, default to an empty string if not found
    const userID = localStorage.getItem('user_id') || '';
    return userID;
  }

  // Method to get the stored authentication token from localStorage
  getToken(): string {
    // Retrieve the token from localStorage, default to an empty string if not found
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // Method to check if the user is logged in
  loggedIn() {
    // Get the token stored in localStorage
    const token = this.getToken();
    console.log("Token from localStorage:", token); // Debug log to show the token

    // If the token exists and is not expired, return true indicating the user is logged in
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if the provided token has expired
  isTokenExpired(token: string) {
    try {
      // Decode the token to get its payload, expecting the JwtPayload type
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token contains an expiration ('exp') property
      // and compare if the expiration time is in the past
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true
        return true;
      }
    } catch (err) {
      // If an error occurs (e.g., invalid token), catch it and return false indicating it's not expired
      return false;
    }
  }

  // Method to handle user logout and clear stored data
  logout() {
    // Remove the authentication token and user ID from localStorage
    localStorage.removeItem('id_token');
    // Redirect user to the homepage or login page after logout
    window.location.assign('/');
  }
}

// Export an instance of AuthService for use in other parts of the app
export default new AuthService();
