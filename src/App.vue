<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="stylus">
@import '~tcon/dist/tcon.css'

//html, body, div
//  box-sizing: border-box
//body, p
//  margin 0
//  padding 0
blue = #409EFF
.bg-blue
  background-color blue
//.bg-f2
//  background-color #f2f2f2
.c-f
  color #fff
//.height-100
//  height 100%
//.p10
//  padding 10px
</style>
