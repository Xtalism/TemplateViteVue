export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@pages/LoginPage.vue'),
    meta: { requiresAuthentication: false }
  },
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: () => import('@components/HelloWorld.vue'),
    meta: { requiresAuthentication: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@pages/HomePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@pages/AboutPage.vue'),
    meta: { requiresAuthentication: false }
  }
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'NotFound',
  //   component: () => import('@pages/NotFoundPage.vue')
  // }
]
