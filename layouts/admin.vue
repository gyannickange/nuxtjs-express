<template>
  <div id="app" class="admin-dashboard" ref="adminDashboard">
    <NavBar />
    <AsideMenu :menu="menu" />
    <div class="content-wrapper">
      <Nuxt />
    </div>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from '@/components/Admin/NavBar'
import AsideMenu from '@/components/Admin/AsideMenu'
import FooterBar from '@/components/Admin/FooterBar'
import { menu } from '~/resources'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    FooterBar,
    NavBar,
  },
  data() {
    return {
      menu: menu
    }
  },
  created() {
    this.$store.commit('user', {
      name: `${this.$auth.user.username}`,
      email: '',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    })
  },
  mounted() {
    let parent = this.$refs.adminDashboard;
    parent.classList.add('has-aside-left');
    parent.classList.add('has-aside-mobile-transition');
    parent.classList.add('has-navbar-fixed-top');
    parent.classList.add('has-aside-expanded');
  },
}
</script>