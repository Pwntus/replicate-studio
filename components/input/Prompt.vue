<template lang="pug">
section
  .text-subtitle-1 Prompt
  .text-subtitle-2 What do you want to see?
  v-textarea(
    v-model="proxy"
    placeholder="Prompt"
    variant="outlined"
    density="comfortable"
    rows="2"
    auto-grow hide-details
  )
</template>

<script>
export default {
  name: 'InputPrompt',
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
