// Importing necessary types and functions for JWT decoding
import { type JwtPayload, jwtDecode } from 'jwt-decode';

// AuthService class to handle authentication logic
class AuthService {

  // Method to handle login and store token and user ID in localStorage
  login(idToken: string) {
    const payload = JSON.parse(idToken);
    localStorage.setItem('id_token', payload.token);
    localStorage.setItem('user_id', payload.userID);
    window.location.assign('/');
  }

  // Method to get the user ID from localStorage
  getUserID(): string {
    return localStorage.getItem('user_id') || '';
  }

  // Method to get the stored authentication token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Method to check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    console.log("Token from localStorage:", token);
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if the provided token has expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded?.exp && decoded?.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Method to handle user logout and clear stored data
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Export an instance of AuthService for use in other parts of the app
export default new AuthService();
