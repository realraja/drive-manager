import { jwtDecode, InvalidTokenError } from 'jwt-decode';

export const getDecodedToken = (token:any) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    // if (error instanceof InvalidTokenError) {
    //   console.error("Invalid token:", error.message);
    //   // Handle cleanup if necessary, e.g., clear local storage
    //   // localStorage.removeItem('your-jwt-token-key');
    // } else {
    //   console.error("Failed to decode token:", error);
    // }
    return null;
  }
};