<template lang="pug">
section
  .text-subtitle-1 Inference steps
  .text-subtitle-2 Higher value will give better quality.
  v-slider(
    v-model="proxy"
    :min="1"
    :max="100"
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
  name: 'InputNumInferenceSteps',
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
