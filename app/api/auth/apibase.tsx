import axios, { AxiosResponse } from "axios";
import Router from "next/router";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify"; // Import toast

/**
 * ApiBase is a class that provides methods for making HTTP requests
 * to the API, including handling authentication and token management.
 */
class ApiBase {
  private apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private tokenKey = "access_token";
  private refreshTokenKey = "refresh_token"; // Key for storing refresh token

  /**
   * Constructor for the ApiBase class.
   * Sets up an interceptor for handling unauthorized responses.
   */
  constructor() {
    this.apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          Router.push("/login"); // Redirect to login page on unauthorized access
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Adds the Authorization header to the axios instance
   * if a valid token is present in local storage.
   */
  private async addAuthorizationHeader(): Promise<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    
    if (!token) {
      console.warn("No access token available.");
      const newToken = await this.refresh_token_backend_call();
      if (!newToken) {
        return false; // Token refresh failed
      }
      localStorage.setItem(this.tokenKey, newToken);
    } else if (this.isTokenExpired()) {
      console.warn("Access token expired. Attempting to refresh.");
      const newToken = await this.refresh_token_backend_call();
      if (!newToken) {
        return false; // Token refresh failed
      }
      localStorage.setItem(this.tokenKey, newToken);
    }
  
    this.apiInstance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(this.tokenKey)}`;
    return true; // Token is valid and returned
  }
  

  /**
   * Checks if the access token is expired.
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  private isTokenExpired(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const decoded: { exp: number } = jwtDecode(token);
        const now = Date.now() / 1000;
        return decoded.exp < now;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return true; //  
      }
    }
    return true; // Returning true here because there is no token so we consider token is expired
  }
  

  /**
   * Refreshes the access token by making an API call to the backend.
   * @returns {Promise<string | null>} The new access token or null if failed.
   */
  private async refresh_token_backend_call(): Promise<string | null> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      console.warn("No refresh token available.");
      return null; // No refresh token available
    }
  
    try {
      const response = await this.apiInstance.post(`/refreshToken`, {
        refresh_token: refreshToken,
      });
      const newToken = response.data.access_token;
      localStorage.setItem(this.tokenKey, newToken); // Store new access token
      return newToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      toast.error("Failed to refresh token. Please log in again.");
      Router.push("/login"); // Redirect to login on failure
      return null;
    }
  }
  

  /**
   * Makes a POST request to the specified query with given parameters.
   * @param {string} query - The endpoint to make the request to.
   * @param {any} params - The parameters to send with the request.
   * @returns {Promise<any>} The response data from the request.
   */
  async post(query: string, params: any): Promise<any> {
    const isAuthorized = await this.addAuthorizationHeader();
    if (!isAuthorized) return; // If token is invalid or can't be refreshed, return
  
    try {
      const response: AxiosResponse<any> = await this.apiInstance.post(
        `/${query}`,
        params
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  

  /**
   * Makes a GET request to the specified query.
   * @param {string} query - The endpoint to make the request to.
   * @returns {Promise<any>} The response data from the request.
   */
  async get(query: string): Promise<any> {
    const isAuthorized = await this.addAuthorizationHeader();
    if (!isAuthorized) return; // If token is invalid or can't be refreshed, return
  
    try {
      const response: AxiosResponse<any> = await this.apiInstance.get(`/${query}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  

  /**
   * Makes a DELETE request to the specified query with given IDs.
   * @param {string} query - The endpoint to make the request to.
   * @param {any[]} ids - The IDs of the items to delete.
   * @returns {Promise<any>} The response data from the request.
   */
  async delete(query: string, ids: any[]): Promise<any> {
    const isAuthorized = await this.addAuthorizationHeader();
    if (!isAuthorized) return; // If token is invalid or can't be refreshed, return
  
    try {
      const response: AxiosResponse<any> = await this.apiInstance.delete(`/${query}`, {
        data: { ids },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  

  /**
   * Makes a POST request to the login endpoint with provided email and password.
   * On successful login, stores the access and refresh tokens in local storage.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<any>} The response data from the login request.
   */
  async loginPost(email: string, password: string): Promise<any> {
    try {
      const response = await this.apiInstance.post(
        `/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      localStorage.setItem(this.tokenKey, response.data.access_token);
      localStorage.setItem(this.refreshTokenKey, response.data.refresh_token); 
      toast.success("Successfully signed in!");

      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  /**
   * Handles errors that occur during API requests.
   * Logs the error to the console for debugging.
   * @param {unknown} error - The error object returned from the API request.
   */
  private handleError(error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Request failed:", error.response.data);
    } else {
      console.error("Request failed:", error);
    }
    throw error;
  }
}

export default new ApiBase();
