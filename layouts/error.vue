<template>
  <div class="section hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="has-text-centered">
          <h1 class="title is-1">{{error.statusCode}}</h1>
          <p class="title is-5">{{error.message}}</p>
          <NuxtLink to="/">Home page</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blanc'
  }
</script>