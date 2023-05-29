<template lang="pug">
.image-failed(:style="style")
  b NSFW
</template>

<script>
import { get } from 'lodash'

export default {
  name: 'ImageFailed',
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
.image-failed
  padding 16px
  background-color rgba(255, 255, 255, 0.06)
  display flex
  flex-direction column
  justify-content center
</style>
