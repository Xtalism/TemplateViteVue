import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.name}`)

  // TODO: Check user authorization
  const isAuthenticated = true
  if (to.name === 'Login' && isAuthenticated) {
    console.log(`User is authenticated, redirecting to Home page.`)

    return next({ name: 'Home' })
  }

  const requiresAuthentication =
    to.meta.requiresAuthentication !== undefined
      ? to.meta.requiresAuthentication
      : true

  if (!requiresAuthentication) {
    console.log(
      `Page does not require authentication, allowing access to ${to.name}`
    )

    return next()
  }

  if (!isAuthenticated && to.name !== 'Login') {
    console.log('User not authenticated, sending to Login page')

    return next({ name: 'Login' })
  }

  // TODO: Check user authorization
  // const isAuthorized = false

  // if (!isAuthorized) {
  //   console.log('User does not have authorization to access this page.')

  //   return next({ name: 'Home' })
  // }

  console.log(`User is authenticated, allowing access to ${to.name}`)
  next()
})

export default router
