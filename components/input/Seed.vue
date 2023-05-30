<template lang="pug">
section
  .text-subtitle-1 Seed
  .text-subtitle-2 Select a prediction seed for reproducibility.
  v-text-field(
    v-model="proxy"
    variant="outlined"
    density="compact"
    hide-details single-line
  )
</template>

<script>
export default {
  name: 'InputSeed',
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
