<template>
  <div class="table-container">
    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <template v-for="(column, index) in tableColumn">
            <th :key="index">{{column}}</th>
          </template>
          <th v-if="!actions.includes('noAction')">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="resource in resources" :key="resource._id">
          <template v-for="(value, name, index) in tableColumn">
            <td :key="index">{{name | getTableValue(resource, value)}}</td>
          </template>
          <td v-if="!actions.includes('noAction')" style="width: 50px;">
            <b-button type="is-primary"
              v-if="actions.includes('update')"
              @click="onEdit(resource)"
            >
              Editer
            </b-button>
            <b-button @click="onShow(resource)"
              v-if="actions.includes('show')"
            >
              Voir
            </b-button>
            <b-button @click="onDelete(resource)"
              v-if="actions.includes('delete')"
            >
              Supprimer
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'AdminTable',
    props: {
      resourceName: {
        type: String,
        default: null
      },
      resources: {
        type: Array,
        default: () => []
      },
      tableColumn: {
        type: Object,
        default: () => []
      },
      actions: {
        type: Array,
        default: () => []
      }
    },
    filters: {
      getTableValue(column, resource, name) {
        if (resource.hasOwnProperty(column)) {
          // if (column == 'date') return moment(resource[column]).format('DD/MM/YYYY');
          if (column == 'fieldId' || column ==  'field_id') return resource[column].name
          if (column == 'candidateId' || column == 'candidate_id') return resource[column].table_number
          if (column == 'examinatorId' || column == 'examinator_id') return resource[column].name
          if (column == 'correctorId' || column == 'corrector_id') return resource[column].name
          if (column == 'fieldSubjectId' && resourceName == 'notes' || column == 'fieldSubject_id' && resourceName == 'notes') return this.$route.query.resource.subject_name
          return resource[column]
        }
      }
    },
    methods: {
      onShow(resource) {
        this.$router.push({path: `admin/${this.resourceName}/${resource._id}/show`, query: {resource: resource}})
      },
      onEdit(resource) {
        this.$router.push(`/admin/${this.resourceName}/${resource._id}`);
      },
      onDelete (resource) {
        this.$buefy.dialog.confirm({
          title: 'Alert',
          message: 'Êtes-vous sûr de vouloir faire cette opération?',
          confirmText: 'Oui',
          cancelText: 'non',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.$store.dispatch(`removeData`, resource)
          }
        })
      }
    }
  }
</script>