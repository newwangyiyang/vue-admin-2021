import router from '@/router';
import { setToken, removeToken } from '@/utils/auth';
import { forEach } from 'lodash-es';

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    roles: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    console.log(username, password);
    return new Promise((resolve, reject) => {
      // TODO: fetch API
      const { data } = { data: { token: '911' } };
      commit('SET_TOKEN', data.token);
      setToken(data.token);
      resolve();
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // TODO: Fetch API
      const data = {
        name: 'wyy',
        avatar: 'https://imgsrc.baidu.com/forum/pic/item/c995d143ad4bd113bbf599fd50afa40f4afb05c0.jpg',
        roles: ['admin'],
      };
      const { name, avatar, roles } = data;
      commit('SET_NAME', name);
      commit('SET_AVATAR', avatar);
      commit('SET_ROLES', roles);
      resolve(data);
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // TODO: Fetch API
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
      dispatch('tagsView/delAllViews', null, { root: true });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token';

    commit('SET_TOKEN', token);
    setToken(token);
    // TODO: Fetch API
    // const { roles } = await dispatch('getInfo');
    const roles = role;
    commit('SET_ROLES', roles);
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true });
    // dynamically add accessible routes
    forEach(accessRoutes, (route) => router.addRoute(route));

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true });
    router.replace({
      path: `/redirect/dashboard`,
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
