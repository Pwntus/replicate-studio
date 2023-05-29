<template lang="pug">
.image-processing(:style="style")
  v-img(
    v-if="output"
    :src="output"
    :style="style"
  )
  .progress
    Skeleton(v-if="progress <= 0")
    v-progress-circular(
      v-else
      :model-value="progress"
      :color="progress >= 100 ? '#555' : '#000'"
      :indeterminate="progress >= 100"
      :size="96"
      :width="6"
    )
      template(v-if="progress > 0 && progress < 100") {{ progress }}%
</template>

<script>
import { get } from 'lodash'
import Skeleton from 'primevue/skeleton'

export default {
  name: 'ImageProcessing',
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
    output() {
      const num_ouput = get(this.data, 'num_output', null)
      return get(this.data, `prediction.output[${num_ouput}]`, null)
    },
    style() {
      return {
        aspectRatio:
          parseInt(get(this.data, 'prediction.input.width', 1)) /
          parseInt(get(this.data, 'prediction.input.height', 1))
      }
    },
    progress() {
      const matches = get(this.data, 'prediction.logs', '').match(/\d+(?=%)/g)
      return parseInt(matches && matches.length > 0 ? matches.pop() : 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.image-processing
  position relative

  .p-skeleton
    width 100%
    height 100% !important

  .v-img::before
    content ''
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    backdrop-filter blur(20px)
    -webkit-backdrop-filter blur(20px)

  .progress
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(255, 255, 255, 0.06)
    display flex
    flex-direction column
    justify-content center
    align-items center
</style>
