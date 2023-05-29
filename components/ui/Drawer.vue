<template lang="pug">
v-navigation-drawer(
  width="350"
  elevation="0"
  permanent
  border
)
  slot
</template>

<style lang="stylus">
.v-navigation-drawer
  border 0
  border-right 1px solid rgba(0, 0, 0, 0.1)

  section
    padding 16px
    border-bottom 1px solid rgba(0, 0, 0, 0.1)

    &:not(:first-child)
      padding-top 16px

    .text-subtitle-1
      padding-bottom 8px
      line-height 1.25rem
      color #000

    .text-subtitle-2
      padding-bottom 12px
      line-height 1.25rem
      color rgba(0, 0, 0, .6)

    .v-item-group
      justify-content space-between
      display flex
      flex-wrap wrap
</style>
