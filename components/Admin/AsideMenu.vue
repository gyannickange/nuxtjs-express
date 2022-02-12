<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <AsideTools :is-main-menu="true">
      <span slot="label"> API Builder </span>
    </AsideTools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
          {{ menuGroup }}
        </p>
        <AsideMenuList
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideTools from '@/components/Admin/AsideTools'
import AsideMenuList from '@/components/Admin/AsideMenuList'
export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['isAsideVisible']),
  },
  methods: {
    menuClick(item) {
      //
    },
  },
}
</script>
