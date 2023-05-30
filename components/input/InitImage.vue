<template lang="pug">
section
  .text-subtitle-1 Initial image
  .text-subtitle-2 You can also control the opacity.
  canvas(
    v-if="upload_data_url"
    :style="style"
    ref="canvas"
  )
  v-slider.pb-3(
    v-if="upload_data_url"
    v-model="proxy_promptStrength"
    :min="0"
    :max="1"
    :step="0.01"
    color="primary"
    hide-details
  )
  .wrapper-buttons
    FileUpload(
      @uploader="uploader"
      mode="basic"
      accept="image/*"
      custom-upload auto
    )
    v-btn.ml-3(
      v-if="upload_data_url"
      @click="doReset"
      icon="mdi-delete"
      variant="text"
    )
</template>

<script>
import { useStorage } from '@vueuse/core'
import FileUpload from 'primevue/fileupload'
import smartcrop from 'smartcrop'

export default {
  name: 'InputInitImage',
  props: ['initImage', 'promptStrength', 'width', 'height'],
  components: {
    FileUpload
  },
  setup: () => ({
    upload_data_url: useStorage('upload-data_url', null)
  }),
  data: () => ({
    loading: false,
    data_url: null
  }),
  computed: {
    proxy_initImage: {
      get() {
        return this.image
      },
      set(value) {
        this.$emit('update:initImage', value)
      }
    },
    proxy_promptStrength: {
      get() {
        return parseFloat((1 - this.promptStrength).toFixed(2))
      },
      set(value) {
        this.$emit('update:promptStrength', parseFloat((1 - value).toFixed(2)))
      }
    },
    style() {
      return {
        opacity: parseFloat((1 - this.promptStrength).toFixed(2))
      }
    }
  },
  watch: {
    async width() {
      await this.doCrop()
      this.doEmit()
    },
    async height() {
      await this.doCrop()
      this.doEmit()
    }
  },
  methods: {
    async uploader(event) {
      try {
        const { files } = event
        if (!files || !files.length) return

        this.upload_data_url = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result))
          reader.readAsDataURL(files[0])
        })

        await this.doCrop()
        this.doEmit()
      } catch (e) {
        console.log(e)
      }
    },
    async doCrop() {
      if (!this.upload_data_url) return

      // Data URL to Image
      const image = await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = this.upload_data_url
      })

      // Smartcrop
      const crop = await smartcrop.crop(image, {
        width: this.width,
        height: this.height,
        ruleOfThirds: true
      })

      // Actually crop by create image bitmap
      const bmp = await createImageBitmap(
        image,
        crop.topCrop.x,
        crop.topCrop.y,
        crop.topCrop.width,
        crop.topCrop.height,
        { resizeWidth: this.width, resizeHeight: this.height }
      )

      // Paint preview
      this.$refs.canvas.width = bmp.width
      this.$refs.canvas.height = bmp.height
      const ctx = this.$refs.canvas.getContext('bitmaprenderer')
      ctx.transferFromImageBitmap(bmp)

      // Save data URL
      this.data_url = this.$refs.canvas.toDataURL()
    },
    doEmit() {
      this.proxy_initImage = this.data_url
    },
    doReset() {
      this.upload_data_url = null
      this.proxy_initImage = null
    }
  },
  async mounted() {
    try {
      await this.doCrop()
      this.doEmit()
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  canvas
    width 100%

  .wrapper-buttons
    display flex
    justify-content center
    align-items center

    :deep(.p-button)
      padding 8px 16px
      border-color #000
      background #000
      box-shadow none
      border-radius 4px

      .p-button-label
        font-weight 500
        font-size 13px
        text-transform uppercase
        font-family Roboto, sans-serif
</style>
