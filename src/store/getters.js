export default {
  // app
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  // user
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  // router
  permission_routes: (state) => state.permission.routes,
  // tag-views
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
};
