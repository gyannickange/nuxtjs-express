<template>
  <div class="section hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="card has-card-header-background">
              <header class="card-header">
                <p class="card-header-title">
                  <span class="icon"><i class="mdi mdi-lock default"></i></span>
                  <span>{{ title }}</span>
                </p>
              </header>
              <div class="card-content">
                <Nuxt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="hero-foot has-text-centered">
      <div class="logo">
        <p>
          Lauréat - Powered by 
        </p>
        <button class="button is-text" @click="shell.openExternal('http://i-futur.com/')" target="_blank">i-Futur</button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'AuthTemplate',
  props: {
    title: {
      type: String,
      default: 'Se connecter'
    },
  },
  data() {
    return {}
  }
}
</script>
