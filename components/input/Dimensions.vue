<template lang="pug">
section.pb-0
  .text-subtitle-1 Dimensions
  .text-subtitle-2 Image width and height.
  v-item-group(
    v-model="proxy"
    mandatory
  )
    v-item(
      v-slot="{ isSelected, selectedClass, toggle }"
      v-for="(item, index) in dimensions"
      :key="`dimensions-${index}`"
      :value="item.value"
    )
      v-btn.mb-4(
        @click="toggle"
        :color="selectedColor(item)"
        flat
      )
        svg.mr-2(
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        )
          rect(
            v-bind="rectByDimension(item)"
            rx="2"
            stroke="currentColor"
            stroke-width="1.5"
          )
        | {{ item.text }}
</template>

<script>
import { isEqual } from 'lodash'

export default {
  name: 'InputDimensions',
  props: ['width', 'height'],
  data: () => ({
    options: [128, 256, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024],
    dimensions: [
      { text: '1:1', value: { width: 512, height: 512 } },
      { text: '4:5', value: { width: 512, height: 640 } },
      { text: '2:3', value: { width: 512, height: 768 } },
      { text: '3:2', value: { width: 768, height: 512 } },
      { text: '9:16', value: { width: 512, height: 896 } },
      { text: '16:9', value: { width: 896, height: 512 } }
    ]
  }),
  computed: {
    proxy: {
      get() {
        return {
          width: this.width,
          height: this.height
        }
      },
      set({ width, height }) {
        this.$emit('update:width', width)
        this.$emit('update:height', height)
      }
    }
  },
  methods: {
    selectedColor(item) {
      return isEqual(item.value, this.proxy) ? 'primary' : ''
    },
    rectByDimension(item) {
      if (item.text === '4:5') return { x: 5.5, y: 4, width: 13, height: 16 }
      if (item.text === '2:3') return { x: 6, y: 3, width: 12, height: 18 }
      if (item.text === '3:2') return { x: 3, y: 6, width: 18, height: 12 }
      if (item.text === '9:16') return { x: 7, y: 3, width: 10, height: 18 }
      if (item.text === '16:9') return { x: 3, y: 7, width: 18, height: 10 }
      return { x: 4, y: 4, width: 16, height: 16 }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
