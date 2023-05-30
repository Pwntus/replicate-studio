<template lang="pug">
section
  .text-subtitle-1 Scheduler
  v-select(
    v-model="proxy"
    :items="items"
    item-title="title"
    item-value="id"
    variant="outlined"
    density="compact"
    hide-details
  )
</template>

<script>
import { schedulers } from '@/lib/static'

export default {
  name: 'InputScheduler',
  props: ['modelValue'],
  data: () => ({
    items: schedulers
  }),
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
