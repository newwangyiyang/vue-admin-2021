import defaultSettings from '@/settings';

const { showSettings, fixedHeader, sidebarLogo, needTagsView } = defaultSettings;

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  needTagsView: needTagsView,
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  CHANGE_FIXED_HEADER(state, value) {
    state.fixedHeader = value;
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
  changeFixedHeader({ commit }, value) {
    commit('CHANGE_FIXED_HEADER', value);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
