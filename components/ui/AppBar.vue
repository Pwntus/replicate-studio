<template lang="pug">
v-app-bar(
  color="transparent"
  flat
)
  v-app-bar-nav-icon
  v-toolbar-title Replicate Studio
</template>

<style lang="stylus" scoped>
.v-app-bar
  border-bottom 1px solid rgba(0, 0, 0, 0.1)
  backdrop-filter saturate(180%) blur(20px)
  -webkit-backdrop-filter saturate(180%) blur(20px)
</style>
