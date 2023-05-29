<template lang="pug">
.ui-grid(ref="grid")
  .ui-grid-col(
    v-for="(_, col) in Array.from(Array(resolved_cols))"
    :key="`col-${col}`"
  )
    .ui-grid-item(
      v-for="(item, row) in itemsByCol(col)"
      :key="`item-${col}-${row}-${item?.data?.image?.id || item?.data?.prediction?.id}`"
    )
      component(
        :is="getComponent(item.component)"
        :data="item.data"
      )
</template>

<script>
import { ref } from 'vue'
import { get } from 'lodash'
import { useElementSize } from '@vueuse/core'

import { EventBus } from '@/services'

const MAX_RESPONSIVE_WIDTH = 300

export default {
  name: 'UiGrid',
  props: {
    cols: {
      type: Number,
      default: null
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const grid = ref(null)
    const { width } = useElementSize(grid)
    const imagePlaceholder = resolveComponent('image-placeholder')
    const imageProcessing = resolveComponent('image-processing')
    const imageView = resolveComponent('image-view')
    const imageFailed = resolveComponent('image-failed')
    return {
      grid,
      width,
      imagePlaceholder,
      imageProcessing,
      imageView,
      imageFailed
    }
  },
  computed: {
    resolved_cols() {
      return this.cols ? this.cols : Math.floor(this.width / MAX_RESPONSIVE_WIDTH)
    }
  },
  methods: {
    itemsByCol(col) {
      return this.list.filter((v, i) => (i - col) % this.resolved_cols === 0)
    },
    getComponent(name) {
      const map = {
        'image-placeholder': this.imagePlaceholder,
        'image-processing': this.imageProcessing,
        'image-view': this.imageView,
        'image-failed': this.imageFailed
      }
      return map[name]
    },
    imagePrev(id) {
      // Find current image
      const index = this.list.findIndex((item) => get(item, 'data.image.id', null) === id)
      if (index < 0) return

      // Calculate previous index
      const new_index = index === 0 ? this.list.length - 1 : index - 1
      EventBus.$emit('image:dialog', this.list[new_index].data)
    },
    imageNext(id) {
      // Find current image
      const index = this.list.findIndex((item) => get(item, 'data.image.id', null) === id)
      if (index < 0) return

      // Calculate next index
      const new_index = index === this.list.length - 1 ? 0 : index + 1
      EventBus.$emit('image:dialog', this.list[new_index].data)
    }
  },
  mounted() {
    EventBus.$on('image:prev', this.imagePrev)
    EventBus.$on('image:next', this.imageNext)
  },
  beforeUnmount() {
    EventBus.$off('image:prev', this.imagePrev)
    EventBus.$off('image:next', this.imageNext)
  }
}
</script>

<style lang="stylus" scoped>
.ui-grid
  width 100%
  padding 16px
  display flex
  flex-direction row
  place-content stretch center
  box-sizing border-box
  gap 16px

  .ui-grid-col
    display flex
    flex-direction column
    place-content stretch flex-start
    flex 1 1 0%
    width 0px
    gap 16px

    .ui-grid-item
      border-radius 6px
      overflow hidden
      display grid
      grid-template-columns repeat(1, minmax(0px, 1fr))
      gap 0.25rem
</style>
