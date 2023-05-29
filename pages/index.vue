<template lang="pug">
#index
  ui-drawer
    input-prompt(v-model="prompt")
    input-negative-prompt(v-model="negative_prompt")
    input-dimensions(
      v-model:width="width"
      v-model:height="height"
    )
    input-num-outputs(v-model="num_outputs")
    section
      v-btn(
        @click="doSubmit"
        color="primary"
        variant="flat"
        size="x-large"
        block
      ) Generate
  ui-process
</template>

<script>
import { useStorage } from '@vueuse/core'

import { EventBus } from '@/services'

export default {
  name: 'Index',
  setup: () => {
    return {
      prompt: useStorage(
        'input-prompt',
        'picture of an astronaut riding a horse on mars, film, studio lighting, detailed skin, ultra realistic, sharp features'
      ),
      negative_prompt: useStorage(
        'input-negative_prompt',
        'cartoon, 3d, disfigured, bad art, deformed, poorly drawn, extra limbs, close up, b&w, blurry, watermark'
      ),
      width: useStorage('input-width', 512),
      height: useStorage('input-height', 768),
      num_outputs: useStorage('input-num_outputs', 2)
    }
  },
  computed: {
    input() {
      const input = {
        prompt: this.prompt,
        negative_prompt: this.negative_prompt,
        width: this.width,
        height: this.height,
        num_outputs: this.num_outputs
      }
      return input
    },
    payload() {
      return {
        input: this.input
      }
    }
  },
  methods: {
    doSubmit() {
      EventBus.$emit('process:submit', this.payload)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
