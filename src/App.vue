<script setup>
  import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <h1>Current page path: {{ $route.fullPath }}</h1>
  <nav>
    <RouterLink to="/helloworld">
      HelloWorld
    </RouterLink>
    <RouterLink to="/login">
      Login
    </RouterLink>
    <RouterLink to="/home">
      Home
    </RouterLink>
    <RouterLink to="/about">
      About
    </RouterLink>
  </nav>
  <RouterView />
</template>
