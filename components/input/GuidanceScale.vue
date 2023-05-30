<template lang="pug">
section
  .text-subtitle-1 Guidance scale
  .text-subtitle-2 How much of the prompt do you want to see?
  v-slider(
    v-model="proxy"
    :min="1"
    :max="20"
    :step="1"
    hide-details
  )
    template(#append)
      v-text-field(
        v-model.number="proxy"
        type="number"
        variant="outlined"
        density="compact"
        style="width: 70px"
        hide-details single-line
      )
</template>

<script>
export default {
  name: 'InputGuidanceScale',
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

<style lang="stylus" scoped>
section
  input
    width 70px
</style>
