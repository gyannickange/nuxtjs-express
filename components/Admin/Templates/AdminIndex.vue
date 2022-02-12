<template>
  <div>
    <HeroBar>
      {{ displayName }}
      <template v-if="actions.includes('create')">
        <NuxtLink slot="right" :to="`${resourceName}/new`" class="button">
          Nouveau
        </NuxtLink>
      </template>
    </HeroBar>

    <section class="pt-5">
      <div class="card">
        <div class="card-content">
          <template v-if="actions.includes('filters')">
            <SearchForm
              :filters="filters"
              :search="search"
              @on-search="onSearch"
            />
          </template>
          <TableIndex
            :resources="resources"
            :resourceName="resourceName"
            :tableColumn="tableColumn"
            :actions="actions"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/Admin/HeroBar'
import TableIndex from '@/components/Admin/TableIndex'
import SearchForm from '@/components/Admin/SearchForm'

export default {
  name: 'AdminIndex',
  props: {
    resourceName: {
      type: String,
      default: null
    },
    resources: {
      type: Object,
      default: null
    },
    displayName: {
      type: String,
      default: null
    },
    search: {
      type: Object,
      default: null
    },
    sortBy: {
      type: Object,
      default: null
    },
    tableColumn: {
      type: Object,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  components: {
    HeroBar,
    TableIndex,
    SearchForm,
  },
  methods: {
    onSearch(data) {
      console.log(data, 'onSearch');
      // data
      // Le store
    }
  }
}
</script>
