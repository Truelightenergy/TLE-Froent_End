import ApiBase from './apibase';

/**
 * ApiLogin class to handle user login requests.
 * This class is responsible for sending login credentials and handling the response.
 */
class ApiLogin {

  /**
   * Sends a login request with the provided email and password as query parameters.
   * Calls the ApiBase's loginPost method.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} - The response data, typically containing the access token.
   */
  async login(email: string, password: string): Promise<any> {
    return ApiBase.loginPost(email, password); 
  }
}

export default new ApiLogin();
