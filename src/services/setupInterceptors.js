import axiosInstance from "./api";
import TokenService from "./token.service";
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
            const rs = await axiosInstance.post("refresh", {
              refresh_token: TokenService.getLocalRefreshToken(),
            });
            const userObject = rs.data;
            store.dispatch('auth/refreshToken', userObject);
            TokenService.updateLocalAccessToken(userObject.access_token);
            TokenService.updateLocalRefreshToken(userObject.refresh_token);
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