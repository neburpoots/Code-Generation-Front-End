class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem("userObject"));
      return user?.refresh_token;
    }
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("userObject"));
      return user?.access_token;
    }
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem("userObject"));
      user.access_token = token;
      localStorage.setItem("userObject", JSON.stringify(user));
    }
    updateLocalRefreshToken(token) {
      let user = JSON.parse(localStorage.getItem("userObject"));
      user.refresh_token = token;
      localStorage.setItem("userObject", JSON.stringify(user));
    }
    getUser() {
      return JSON.parse(localStorage.getItem("userObject"));
    }
    setUser(user) {
      localStorage.setItem("userObject", JSON.stringify(user));
    }
    removeUser() {
      localStorage.removeItem("userObject");
    }
  }
  export default new TokenService();