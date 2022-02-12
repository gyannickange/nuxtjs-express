<template>
  <div>
    <b-field
      v-if="field.type == 'phone'"
      :label="field.title || ''"
      :horizontal="isHorizontal"
    >
      <b-field>
        <p class="control">
          <a class="button is-static">
            + {{field.prefix}}
          </a>
        </p>
        <b-input
          v-model="fieldsValues[field.name]"
          :name="field.title"
          :type="field.type"
          :placeholder="field.placeholder || ''"
          :required="field.required"
          :disabled="field.disabled" expanded
        />
      </b-field>
    </b-field>

    <b-field
      v-else-if="field.type == 'testarea' || field.considtion" 
      :label="field.title || ''"
      :message="field.message || ''"
      :horizontal="isHorizontal"
    >
      <b-input
        v-model="fieldsValues[field.name]"
        type="textarea"
        :placeholder="field.placeholder || ''"
        maxlength="255"
        :required="field.required"
        :disabled="field.disabled"
      />
    </b-field>

    <b-field
      v-else
      :label="field.title || ''"
      :horizontal="isHorizontal"
    >
      <b-input
        v-model="fieldsValues[field.name]"
        :name="field.name"
        :placeholder="field.placeholder || ''"
        :type="field.type"
        :required="field.required"
        :disabled="field.disabled"
      />
    </b-field>
  </div>
</template>

<script>
  export default {
    name: 'AppInput',
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
      },
    },
  }
</script>
