<template>
  <div>
    <AdminForm
      :fields="resources.admin_fields"
      :fieldsValues="resources.admin_fields_values"
      :resourceName="resources.name"
      :displayName="resources.display_name"
    />
  </div>
</template>

<script>
import AdminForm from '@/components/Admin/Templates/AdminForm';
import { tables } from '~/resources'

export default {
  layout: 'admin',
  components: {
    AdminForm
  },
  asyncData({}) {
    return { resources: tables.find(table => table.name == 'infos') }
  }
}
</script>
