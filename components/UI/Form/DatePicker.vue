<template>
  <b-field 
      v-if="field.type == 'date'"
      :label="field.title || ''"
      :horizontal="isHorizontal"
    >
    <b-datepicker
      v-model="fieldsValues[field.name]"
      :placeholder="field.placeholder || ''"
      :locale="locale"
      :required="field.required"
      :disabled="field.disabled"
      :show-week-number="showWeekNumber"
      :selectedDate="selectedDate"
      editable>
    </b-datepicker>
  </b-field>
</template>

<script>
export default {
  name: 'AppDatePicker',
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
    const today = new Date();
    return {
      locale: undefined,
      showWeekNumber: false,
      selectedDate: new Date(),
      minDate: new Date(today.getFullYear() - 80, today.getMonth(), today.getDate()),
      maxDate: new Date(today.getFullYear() + 18, today.getMonth(), today.getDate())
    }
  },
}
</script>