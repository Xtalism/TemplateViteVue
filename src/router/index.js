import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.name}`)

  const requiresAuthentication =
    to.meta.requiresAuthentication !== undefined
      ? to.meta.requiresAuthentication
      : true

  if (!requiresAuthentication) {
    return next()
  }

  const isAuthenticated = true // modify for the authentication process

  if (!isAuthenticated) {
    console.log('User not authenticated, sending to Login page')

    return next({ name: 'login' })
  }

  // TODO: Check user authorization

  console.log('User does not have authorization to access this page.')
})

export default router
