import { createRouter, createWebHistory } from 'vue-router'
import routes from '@router/routes.js'
import { isAuthenticated } from '@services/authService.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// TODO: Check user authorization
router.beforeEach((to, from) => {
  const { requiresAuthentication = true, restrictIfAuthenticated = false } =
    to.meta

  if (!requiresAuthentication && !restrictIfAuthenticated) return true

  const authenticated = isAuthenticated()

  if (restrictIfAuthenticated && authenticated) {
    return !from.name ? { name: 'Home' } : false
  }

  if (!authenticated && requiresAuthentication) return { name: 'Login' }
})

export default router
