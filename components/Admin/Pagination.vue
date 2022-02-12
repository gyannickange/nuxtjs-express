<template>
  <section>
    <b-pagination :total="totalDocs" v-model="current" :per-page="2">

      <template #default="props">
        <b-pagination-button :page="props.page" :id="`page${props.page.number}`" tag="nuxt-link"
          :to="`/admin/${resourceName}?page=${props.page.number}`">
          {{ props.page.number }}
        </b-pagination-button>
      </template>

      <template #previous="props">
        <b-pagination-button :page="props.page" tag="nuxt-link"
          :to="`/admin/${resourceName}?page=${props.page.number}`">
          Présédent
        </b-pagination-button>
      </template>

      <template #next="props">
        <b-pagination-button :page="props.page" tag="nuxt-link"
          :to="`/admin/${resourceName}?page=${props.page.number}`">
          Suivant
        </b-pagination-button>
      </template>

    </b-pagination>
  </section>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      resourceName: {
        type: String,
        default: null
      },
      currentPage: {
        type: Number,
        default: 1
      },
      totalDocs: {
        type: Number,
      }
    },
    computed: {
      current() {
        return this.currentPage;
      }
    },
    watch: {
      '$route.query'() {
        this.$nuxt.refresh();
      }
    }
  }
</script>
