<template>
  <b-field
      :label="field.title || ''"
      :horizontal="isHorizontal"
    >
    <b-select
      v-model="fieldsValues[field.name]"
      :placeholder="field.placeholder || ''"
      :required="field.required"
      :disabled="field.disabled"
    >
      <option
        v-for="(option, index) in field.options"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: 'AppSelect',
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