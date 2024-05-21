<script setup>
  import { RouterView, RouterLink } from 'vue-router'
  import routes from '@router/routes.js'

  const navRoutes = routes.filter((route) => route.meta?.hideInNav !== true)
</script>

<template>
  <h1>Current page path: {{ $route.fullPath }}</h1>
  <nav>
    <RouterLink
      v-for="route in navRoutes"
      :key="route.name"
      :to="route.path"
    >
      {{ route.name }}
    </RouterLink>
  </nav>
  <RouterView />
</template>
