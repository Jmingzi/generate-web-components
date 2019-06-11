<script lang="tsx">
import Vue from 'vue'
import { mapGetters } from 'vuex'
// import { getId } from '../assets/js/render/index'

import { Component } from '../assets/js/item'

export default Vue.extend({
  name: 'Mobile',

  props: {
  },

  computed: {
    // ...mapState(['currentComponent'])
    ...mapGetters(['root'])
  },

  created () {
  },

  methods: {
    renderComponent (componentData: Component) {
      return this.$createElement(componentData.name)
    }
  },

  render () {
    return (
      <div class="preview">
        <div class="preview__mobile">
          { this.root && this.renderComponent(this.root) }
        </div>
      </div>
    )
  }
})
</script>

<style lang="stylus">
.preview
  display flex
  justify-content center
  align-items center
  &__mobile
    width 375px
    height calc(100vh - 200px)
    border 1px #ccc solid
    background-color #fff
    overflow: hidden
    transform translate(0)
</style>
