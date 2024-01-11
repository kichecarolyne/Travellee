class AuthService {
  static isAuthenticated = false;

  static login() {
    this.isAuthenticated = true;
  }

  static logout() {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
  }

  static isLoggedIn() {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
  }
}

export default AuthService;
