<template>
  <AdminIndex
    :resourceName="resourceName"
    :resources="resources"
    :displayName="displayName"
    :tableColumn="tableColumn"
    :actions="actions"
    :filters="filters"
    :search="search"
  />
</template>

<script>
import AdminIndex from '@/components/Admin/Templates/AdminIndex';

export default {
  layout: 'admin',
  components: {
    AdminIndex
  },
  asyncData({$axios, route, error}) {
    let baseUrl = '/api/v1/infos';
    if (route.query.page) baseUrl =`${baseUrl}?page=${route.query.page}`

    return $axios.get(baseUrl)
      .then(res => {
        return { 
          resources: res.data.resources,
          resourceName: res.data.resource_name,
          displayName: res.data.display_name,
          tableColumn: res.data.table_column,
          actions: res.data.actions,
          filters: res.data.filters,
          search: res.data.search
        }
      }).catch(err => {
        error({statusCode: 500, message: 'Oops, try again'})
      })
  },
}
</script>