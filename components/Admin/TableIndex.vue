<template>
  <div>
    <div v-if="resources.totalDocs > 0 && !isLoading" class="has-pagination">
      <div class="table-wrapper has-mobile-cards">
        <Table
          :resourceName="resourceName"
          :resources="resources.docs"
          :tableColumn="tableColumn"
          :actions="actions"
        />
      </div>

      <div v-if="hasPagination" class="notification">
        <Pagination
          :resourceName="resourceName"
          :totalDocs="resources.totalDocs"
          :currentPage="resources.page"
        />
      </div>
    </div>

    <div v-if="isLoading" class="py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Chargement...</span>
      </div>
    </div>

    <div v-if="resources.totalDocs === 0 && !isLoading" class="card has-table">
      <div class="card-content">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <span class="icon is-large"><i class="mdi mdi-emoticon-sad mdi-48px"></i></span>
            </p>
            <p>Pas de donnée</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Admin/Pagination'
import Table from '@/components/Admin/Table'

export default {
  name: 'AdminTableIndex',
  props: {
    resourceName: {
      type: String,
      default: null
    },
    resources: {
      type: Object,
      default: () => {}
    },
    tableColumn: {
      type: Object,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
  },
  components: {
    Pagination,
    Table,
  }
}
</script>
