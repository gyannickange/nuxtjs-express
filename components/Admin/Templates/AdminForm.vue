<template>
  <div>
    <PageTitle :title="isUpdate ? 'Mettre à jour' : 'Nouveau'" />
    <section class="card">
      <div class="card-content">
        <form @submit.prevent="onSubmit">
          <template v-for="(field, index) in fields">
            <FormFields :field="field" :fieldsValues="isUpdate ? currentValue : fieldsValues" :key="index" />
          </template>
          <hr />
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Valider</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PageTitle from '@/components/Admin/PageTitle'
import FormFields from '@/components/Admin/FormFields'

export default {
  name: 'AdminForm',
  components: {
    PageTitle,
    FormFields,
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    fieldsValues: {
      type: Object,
      default: () => {}
    },
    resourceName: {
      type: String,
      default: null
    },
    displayName: {
      type: String,
      default: null
    },
    isUpdate: {
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {
      currentValue: {}
    }
  },
  created() {
    if (this.isUpdate) {
      this.$axios.get(`/api/v1/${this.resourceName}/${this.$route.params.id}`)
      .then(res => {
        if (res.status == 201 || res.status == 200 || res.status == 304) {
          this.currentValue = res.data.resources
        } else {
          this.$nuxt.error({statusCode: 404, message: 'Oops, try again'})
        }
      }).catch((err) => {
        console.log(err)
        this.$nuxt.error({statusCode: 404, message: 'Oops, try again'})
      })
    }
  },
  methods: {
    async onSubmit() {
      let form;
      this.isUpdate ? form = this.currentValue : form = this.fieldsValues;
      let res = this.isUpdate ? await this.$axios.put(`/api/v1/${this.resourceName}/${this.$route.params.id}`, form) : await this.$axios.post(`/api/v1/${this.resourceName}`, form);
      if (res.status == 201 || res.status == 200) {
        this.$buefy.snackbar.open({
          message: "Opération effectuer",
          queue: false,
          position: 'is-top-right',
        })
        this.$router.push(`/admin/${this.resourceName}`)
      } else {
        this.$buefy.snackbar.open({
          message: `${res.data}`,
          queue: false,
        })
      }
    }
  }
}
</script>
