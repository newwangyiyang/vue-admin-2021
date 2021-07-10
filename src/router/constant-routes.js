import Layout from '@/layout';

export default [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index'),
      },
    ],
  },
  {
    path: '/500',
    component: Layout,
    redirect: '/500/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/500'),
        name: '500',
        meta: { title: 500 },
      },
    ],
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/Table'),
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/Tree'),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/Form'),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },
  {
    path: '/amimate',
    component: Layout,
    redirect: '/animate/index',
    children: [
      {
        path: 'index',
        name: 'Animation',
        component: () => import('@/views/Animate'),
        meta: { title: 'Animation', icon: 'form' },
      },
    ],
  },
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import('@/views/Guide'),
        meta: { title: 'Guide', icon: 'form' },
      },
    ],
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/Nested/Menu1'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/Nested/Menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/Nested/Menu1/Menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/Nested/Menu1/Menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/Nested/Menu1/Menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/Nested/Menu2'),
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/newwangyiyang',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },
];
