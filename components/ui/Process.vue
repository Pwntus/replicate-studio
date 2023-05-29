<template lang="pug">
v-main
  .cold-boot-notice(v-if="processing_delay")
    | <b>It looks like a model is taking longer to finish.</b> This is called a "cold" model which means that it hasn't been used for a while and can take up to 3 minutes to "warm up".
  ui-grid(:list="list")
</template>

<script>
import { get } from 'lodash'
import { mapActions } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import useAppStore from '@/stores/app'
import { EventBus } from '@/services'

const COLD_BOOT_THRESHOLD = 10000 // ms

export default {
  name: 'UiProcess',
  data: () => ({
    processing_timeout: null,
    processing_map: {},
    processing_delay: false,

    list: [],
    payload: null
  }),
  watch: {
    processing_map: {
      deep: true,
      handler(value) {
        const keys = Object.entries(value)

        if (keys.length > 0 && !this.processing_timeout) {
          this.processing_timeout = setInterval(() => {
            const now = Date.now()
            const values = Object.values(this.processing_map)
            this.processing_delay =
              values.filter((item) => now - item >= COLD_BOOT_THRESHOLD).length > 0
          }, 1000)
        }

        if (keys.length <= 0 && this.processing_timeout) {
          clearInterval(this.processing_timeout)
          this.processing_timeout = null
          this.processing_delay = false
        }
      }
    }
  },
  methods: {
    ...mapActions(useAppStore, ['createImage']),
    imageProcessing(data) {
      const { num_output, prediction } = data

      // All at once
      if (num_output === null) {
        // Find all items (outputs) in same prediction
        const indices = this.list
          .map((item, i) => (get(item, 'data.prediction.id', null) === prediction.id ? i : -1))
          .filter((item) => item > -1)
        // Update with new prediction (logs, etc.)
        for (const index of indices) this.list[index].data.prediction = prediction

        // Specific num_ouput
      } else {
        // Edge case before webhook output event is fixed:
        // Logs will say 100% while a new output is added to
        // output-array, resulting in the next num_output
        // getting an initial 100% progress. Counter this with
        // checking the percentage for 100%, and subtract num_output - 1.
        const matches = get(prediction, 'logs', '').match(/\d+(?=%)/g)
        const progress = parseInt(matches && matches.length > 0 ? matches.pop() : 0)
        const num_output_tmp = progress >= 100 ? num_output - 1 : num_output

        // Find item (output) with same prediction ID and num_output
        const index = this.list.findIndex(
          (item) =>
            get(item, 'data.prediction.id', null) === prediction.id &&
            get(item, 'data.num_output', null) === num_output_tmp
        )
        // Update with new prediction (logs, etc.)
        if (index > -1) this.list[index].data.prediction = prediction
      }

      // For detecting cold boots
      delete this.processing_map[prediction.id]
    },
    imageSucceeded(data) {
      const { num_output, prediction } = data

      try {
        // Specific num_ouput
        // Find item (output) with same prediction ID and num_output
        const index = this.list.findIndex(
          (item) =>
            get(item, 'data.prediction.id', null) === prediction.id &&
            get(item, 'data.num_output', null) === num_output
        )
        if (index > -1) this.list[index] = { component: 'image-view', data }
      } catch (e) {
        console.log(e)
      }
    },
    imageFailed(data) {
      const { num_output, prediction } = data

      // All at once
      if (num_output === null) {
        // Find all items (outputs) in same prediction
        const indices = this.list
          .map((item, i) => (get(item, 'data.prediction.id', null) === prediction.id ? i : -1))
          .filter((item) => item > -1)
        for (const index of indices) this.list[index] = { component: 'image-failed', data }

        // Specific num_ouput
      } else {
        // Find item (output) with same prediction ID and num_output
        const index = this.list.findIndex(
          (item) =>
            get(item, 'data.prediction.id', null) === prediction.id &&
            get(item, 'data.num_output', null) === num_output
        )
        // Update with new prediction (logs, etc.)
        if (index > -1) this.list[index] = { component: 'image-failed', data }
      }
    },
    async processSubmit(payload) {
      try {
        const { input } = payload

        // Create placeholder for immediate effect
        const placeholders = []

        for (let num_output = 0; num_output < input.num_outputs; num_output++) {
          const placeholder = {
            component: 'image-placeholder',
            data: {
              num_output,
              prediction: {
                id: `${uuidv4()}-${Date.now()}`,
                input
              }
            }
          }
          this.list.unshift(placeholder)
          placeholders.push(placeholder)
        }

        const prediction = await this.createImage(payload)

        // Replace placeholders back
        for (let num_output = 0; num_output < placeholders.length; num_output++) {
          const index = this.list.findIndex(
            (item) => placeholders[num_output].data.prediction.id === item.data.prediction.id
          )
          if (index < 0) return

          this.list[index] = {
            component: 'image-processing',
            data: {
              num_output,
              prediction
            }
          }
        }

        // For detecting cold boots
        this.processing_map[prediction.id] = Date.now()
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    EventBus.$on('process:submit', this.processSubmit)

    EventBus.$on('image:processing', this.imageProcessing)
    EventBus.$on('image:failed', this.imageFailed)
    EventBus.$on('image:succeeded', this.imageSucceeded)
  },
  beforeUnmount() {
    EventBus.$off('process:submit', this.processSubmit)

    EventBus.$off('image:processing', this.imageProcessing)
    EventBus.$off('image:failed', this.imageFailed)
    EventBus.$off('image:succeeded', this.imageSucceeded)

    // Clear any active interval
    if (this.processing_timeout) {
      clearInterval(this.processing_timeout)
      this.processing_timeout = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-main
  .cold-boot-notice
    margin 16px 16px 0
    padding 16px
    background #000
    border-radius 4px
    font-size 0.875rem
    color: rgba(255, 255, 255, .8)

    b
      color #fff
</style>
