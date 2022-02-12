<template>
  <b-field
      class="has-check"
      :label="field.title || ''"
      :horizontal="isHorizontal"
    >
    <b-switch v-model="fieldsValues[field.name]">
      Default
    </b-switch>
  </b-field>
</template>

<script>
export default {
  name: 'AppSwitch',
  props: {
    field: {
      type: Object,
      default: () => {}
    },
    fieldsValues: {
      type: Object,
      default: () => {}
    },
    isHorizontal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: { name: 'Explorer', desc: 'Discovering new species!' },
      options: [
        { name: 'Space Pirate', desc: 'More space battles!' },
        { name: 'Merchant', desc: 'PROFIT!' },
        { name: 'Explorer', desc: 'Discovering new species!' },
        { name: 'Miner', desc: 'We need to go deeper!' }
      ]
    }
  },
}
</script>