<template lang="pug">
section
  .text-subtitle-1 Number of images
  .text-subtitle-2 Number of images to output each time.
  v-item-group(
    v-model="proxy"
    mandatory
  )
    v-item(
      v-slot="{ isSelected, selectedClass, toggle }"
      :value="1"
    )
      v-btn(
        @click="toggle"
        :color="isSelected ? 'primary' : ''"
        flat
      ) 1
    v-item(
      v-slot="{ isSelected, selectedClass, toggle }"
      :value="2"
    )
      v-btn(
        @click="toggle"
        :color="isSelected ? 'primary' : ''"
        flat
      ) 2
    v-item(
      v-slot="{ isSelected, selectedClass, toggle }"
      :value="3"
    )
      v-btn(
        @click="toggle"
        :color="isSelected ? 'primary' : ''"
        flat
      ) 3
    v-item(
      v-slot="{ isSelected, selectedClass, toggle }"
      :value="4"
    )
      v-btn(
        @click="toggle"
        :color="isSelected ? 'primary' : ''"
        flat
      ) 4
</template>

<script>
export default {
  name: 'InputNumOutputs',
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
