<template lang="pug">
.image-view(@click="doOpen")
  v-img(
    :src="output"
    :style="style"
  )
  .image-view-overlay
    .image-view-overlay-top
    .image-view-overlay-description
      .flex-grow-1.overflow-hidden
        .font-weight-bold {{ caption }}
        .line-clamp-2 {{ data.prediction.input.prompt }}
</template>

<script>
import { get } from 'lodash'

import { EventBus } from '@/services'

export default {
  name: 'ImageView',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    output() {
      const num_ouput = get(this.data, 'num_output', null)
      return get(this.data, `prediction.output[${num_ouput}]`, null)
    },
    caption() {
      return get(this.data, 'prediction.input.prompt', '').split(',').shift()
    },
    style() {
      return {
        aspectRatio:
          parseInt(get(this.data, 'prediction.input.width', 1)) /
          parseInt(get(this.data, 'prediction.input.height', 1))
      }
    }
  },
  methods: {
    doOpen() {
      // Include 'return_to' in data so that it is set in localStorage
      const data = { ...this.data, return_to: this.$route.fullPath }
      EventBus.$emit('image:dialog', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.image-view
  cursor pointer
  background-color rgba(255, 255, 255, 0.06)
  position relative

  &:hover
    .image-view-overlay
      visibility visible
      opacity 1

  .image-view-overlay
    padding 16px
    background rgba(0, 0, 0, .6)
    line-height 1.5
    display flex
    flex-direction column
    justify-content space-between
    overflow hidden
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    transition 75ms ease-in-out
    visibility hidden
    opacity 0

    .image-view-overlay-top
      display flex
      justify-content space-between
      align-items center

    .image-view-overlay-description
      display flex
      color #fff

      .line-clamp-2
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
</style>
