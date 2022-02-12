<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <NavBarMenu class="has-divider has-user-avatar">
          <UserAvatar />
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <NuxtLink
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>My Profile</span>
            </NuxtLink>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="email" custom-size="default"></b-icon>
              <span>Messages</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Log Out</span>
            </a>
          </div>
        </NavBarMenu>
        <a
          class="navbar-item is-desktop-icon-only"
          title="Log out"
          @click="logout"
        >
          <b-icon icon="logout" custom-size="default" />
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import NavBarMenu from '@/components/Admin/NavBarMenu'
import UserAvatar from '@/components/Admin/UserAvatar'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
  },
  data() {
    return {
      isMenuNavBarActive: false,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState(['isNavBarVisible', 'isAsideMobileExpanded', 'userName']),
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout() {
      this.$auth.logout();
      this.$buefy.snackbar.open({
        message: 'Log out clicked',
        queue: false,
      });
      this.$router.push('/login');
    },
  },
}
</script>