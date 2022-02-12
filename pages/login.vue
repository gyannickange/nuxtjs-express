<template>
  <div class="container">
    <form method="post" @submit.prevent="userLogin">
      <Input :field="fields[0]" :fieldsValues="login" :isHorizontal="false" class="mb-2" />
      <Input :field="fields[1]" :fieldsValues="login" :isHorizontal="false" class="mb-4" />
      <div class="control">
        <button type="submit" class="button is-primary is-fullwidth">Login</button>
      </div>
    </form>

    <!-- <div class="has-text-centered" style="margin-top: 20px">
      Haven't got an account? <nuxt-link to="/">Go back</nuxt-link>
    </div> -->
  </div>
</template>
<script>
import Input from '@/components/UI/Form/Input'

export default {
  layout: 'auth',
  components: {
    Input
  },
  data() {
    return {
      login: {},
      fields: [
        {
          name: 'username',
          type: 'text',
          title: 'Nom et Prénom',
          required: true
        },
        {
          name: 'password',
          type: 'password',
          title: 'Mot de passe',
          required: true
        }
      ]
    }
  },

  created () {
    if (this.$auth.$state.loggedIn) {
      this.$router.push('/admin/dashboard')
    }
  },

  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        this.$router.push('/admin/dashboard');
      } catch (err) {
        this.$buefy.snackbar.open({
          message: err.response.data,
          queue: false,
          position: 'is-top-right',
        })
      }
    }
  }
}
</script>
