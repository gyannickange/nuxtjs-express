<template>
  <div></div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      messages: {
        'notfound': 'Can not found an article',
        'deleteerror': 'An error occurred while deleting article'
      }
    }
  },
  head() {
    return {
      title: 'Articles',
      meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'You can find all infos in this page'
      }
    ],
    }
  }
}
</script>