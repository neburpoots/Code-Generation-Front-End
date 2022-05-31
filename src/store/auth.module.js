import AuthService from '../services/auth.service';
const userObject = JSON.parse(localStorage.getItem('userObject'));
const initialState = userObject
  ? { status: { loggedIn: true }, userObject }
  : { status: { loggedIn: false }, userObject: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {

    login({commit}, user) {

      return AuthService.login(user).then(
        userObject => {
          commit('loginSuccess', userObject);
          return Promise.resolve(userObject);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },

    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },

    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },

    refreshToken({ commit }, userObject) {
      commit('refreshToken', userObject);
    }

  },
  mutations: {

    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.userObject = user;
    },

    loginFailure(state) {
      state.status.loggedIn = false;
      state.userObject = null;
    },

    logout(state) {
      state.status.loggedIn = false;
      state.userObject = null;
    },

    registerSuccess(state) {
      state.status.loggedIn = false;
    },

    registerFailure(state) {
      state.status.loggedIn = false;
    },

    refreshToken(state, user) {
      state.status.loggedIn = true;
      state.userObject.access_token = user.access_token;
      state.userObject.refresh_token = user.refresh_token;
    }
  }
};