<template>
  <div class="flex flex-col gap-1">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="modelValue"
      @input="validateInput"
    />
    <div v-if="error" class="text-xs text-red-600">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type PropType, defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<'text' | 'number' | 'symbols'>,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  validate: {
    type: Boolean,
    required: false,
    default: true
  }
})

const emit = defineEmits(['error']);
const error = ref<string>('')
const modelValue = defineModel<string>('modelValue', { required: true })

const validateInput = () => {
  if (!props.validate) return

  let regex: RegExp

  if (props.type === 'text') {
    regex = /^[a-zA-Z]+$/
    error.value = regex.test(modelValue.value) ? '' : 'Only letters are allowed'
  } else if (props.type === 'number') {
    regex = /^[0-9]+$/
    error.value = regex.test(modelValue.value) ? '' : 'Only numbers are allowed'
  } else if (props.type === 'symbols') {
    regex = /^[0-9+()\-\s]*$/
    error.value = regex.test(modelValue.value) ? '' : 'Only numbers and symbols are allowed'
  }

  emit('error', !!error.value)
}
</script>
