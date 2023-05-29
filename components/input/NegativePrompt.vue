<template lang="pug">
section
  .text-subtitle-1 Negative prompt
  .text-subtitle-2 What do you not want to see?
  v-textarea(
    v-model="proxy"
    placeholder="Negative prompt"
    variant="outlined"
    density="comfortable"
    rows="2"
    auto-grow hide-details
  )
</template>

<script>
export default {
  name: 'InputNegativePrompt',
  props: ['modelValue'],
  computed: {
    proxy: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
