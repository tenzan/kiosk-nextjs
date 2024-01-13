// utils/auth.js
import Cookies from 'js-cookie';

export const isAuthenticated = () => {
    const token = Cookies.get('jwt');
    return !!token; // returns true if token exists, false otherwise
};

// Logout function to clear the JWT token
export const logout = () => {
    Cookies.remove('jwt'); // Remove the JWT token
    // Optionally, add logic to redirect the user or trigger a state change
};