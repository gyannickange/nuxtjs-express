<template>
  <div class="notification is-card-toolbar">
    <button class="button is-active" @click="isActive = !isActive">Recherche</button>
    <transition name="fade">
      <form @submit.prevent="onSubmit">
        <div class="search-row mt-4" v-if="isActive">
          <div v-for="(field, index) in filters" class="search-column" :key="index">
            <FormFields :field="field" :fieldsValues="search" :isHorizontal="false" />
          </div>
          <div class="search-column">
            <b-button native-type="submit" type="is-primary">Lancer la recherche</b-button>
          </div>
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
  import FormFields from '@/components/Admin/FormFields'
  
  export default {
    name: 'TableSearch',
    components: {
      FormFields
    },
    props: {
      search: {
        type: Object,
        default: () => {}
      },
      filters: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        isActive: false
      }
    },
    methods: {
      onSubmit () {
        this.$emit('on-search', this.search);
      }
    }
  }
</script>