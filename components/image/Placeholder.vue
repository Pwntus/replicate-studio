<template lang="pug">
.image-placeholder(:style="style")
  Skeleton
</template>

<script>
import { get } from 'lodash'
import Skeleton from 'primevue/skeleton'

export default {
  name: 'ImagePlaceholder',
  components: {
    Skeleton
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    style() {
      return {
        aspectRatio:
          parseInt(get(this.data, 'prediction.input.width', 1)) /
          parseInt(get(this.data, 'prediction.input.height', 1))
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.image-placeholder
  .p-skeleton
    width 100%
    height 100% !important
</style>
