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
    input-guidance-scale(v-model="guidance_scale")
    input-num-inference-steps(v-model="num_inference_steps")
    input-scheduler(v-model="scheduler")
    input-seed(v-model="seed")
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
      num_outputs: useStorage('input-num_outputs', 1),
      guidance_scale: useStorage('input-guidance_scale', 7),
      num_inference_steps: useStorage('input-num_inference_steps', 20),
      scheduler: useStorage('input-scheduler', 'K_EULER_ANCESTRAL'),
      seed: useStorage('input-seed', null)
    }
  },
  computed: {
    input() {
      const input = {
        prompt: this.prompt,
        negative_prompt: this.negative_prompt,
        width: this.width,
        height: this.height,
        num_outputs: this.num_outputs,
        guidance_scale: this.guidance_scale,
        num_inference_steps: this.num_inference_steps,
        scheduler: this.scheduler
      }
      try {
        input.seed = parseInt(this.seed)
        if (!input.seed) delete input.seed
      } catch (e) {
        delete input.seed
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
