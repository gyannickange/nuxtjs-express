<template>
  <div class="mb-3">
    <AppInput
      v-if="field.type == 'phone'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal" 
    />
    <AppDatePicker
      v-else-if="field.type == 'date'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
    <AppSelect
      v-else-if="field.type == 'select'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
    <AppInput
      v-else-if="field.type == 'testarea'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
    <AppCheckbox
      v-else-if="field.type == 'checkbox'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
    <AppRadio
      v-else-if="field.type == 'radio'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
    <AppSwitch
      v-else-if="field.type == 'switch'"
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
    <AppInput
      v-else
      :field="field"
      :fieldsValues="fieldsValues"
      :isHorizontal="isHorizontal"
    />
  </div>
</template>

<script>
  import AppDatePicker from '@/components/UI/Form/DatePicker'
  import AppSelect from '@/components/UI/Form/Select'
  import AppRadio from '@/components/UI/Form/Radio'
  import AppCheckbox from '@/components/UI/Form/Checkbox'
  import AppSwitch from '@/components/UI/Form/Switch'
  import AppInput from '@/components/UI/Form/Input'
  
  export default {
    name: 'FormFields',
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
    components: {
      AppDatePicker,
      AppSelect,
      AppRadio,
      AppCheckbox,
      AppSwitch,
      AppInput
    }
  }
</script>
