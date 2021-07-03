import Layout from '@/layout';
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export default [
  {
    path: '/admin-page',
    component: Layout,
    meta: {
      roles: ['admin'],
    },
    children: [
      {
        path: 'index',
        name: 'AdminPage',
        component: () => import('@/views/AdminPage'),
        meta: {
          title: 'AdminPage',
          icon: 'nested',
        },
      },
    ],
  },
  {
    path: '/editor-page',
    component: Layout,
    meta: {
      roles: ['editor'],
    },
    children: [
      {
        path: 'index',
        name: 'Editorpage',
        component: () => import('@/views/EditorPage'),
        meta: {
          title: 'EditorPage',
          icon: 'nested',
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];
