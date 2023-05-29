<template lang="pug">
v-app
  ui-app-bar
  nuxt-page
</template>

<script>
import { mapActions } from 'pinia'

import useAppStore from '@/stores/app'

export default {
  name: 'App',
  methods: mapActions(useAppStore, ['init']),
  mounted() {
    this.init()
  }
}
</script>
