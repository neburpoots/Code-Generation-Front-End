import axiosInstance from "./api";
import TokenService from "./token.service";
import axios from 'axios';
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "login" && err.response) {
        // Access Token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            
            const rs = await axios.post("https://swaggerbankinholland.herokuapp.com/api/users/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            console.log(rs.data)
            const tokens = rs.data;
            store.dispatch('auth/refreshToken', tokens);
            TokenService.updateLocalAccessToken(tokens.accessToken);
            TokenService.updateLocalRefreshToken(tokens.refreshToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;