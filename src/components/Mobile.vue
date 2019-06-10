<script lang="tsx">
import Vue from 'vue'
// import { mapState } from 'vuex'
// import { getId } from '../assets/js/render/index'

import { Component } from '../assets/js/item'

export default Vue.extend({
  name: 'Mobile',

  props: {
    componentData: {
      type: Object
    }
  },

  computed: {
    // ...mapState(['currentComponent'])
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
          { this.componentData && this.renderComponent(this.componentData) }
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
    width 320px
    height 480px
    border 1px #ccc solid
    background-color #fff
</style>
