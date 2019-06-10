<template>
  <el-container>
    <el-header class="bg-blue c-f flex-center-align">
      <h1>web component 组件生成器</h1>
    </el-header>
    <el-main class="main">
      <el-row class="height-100">
        <el-col :span="8" class="p10">
          <list />
        </el-col>
        <el-col :span="8" class="height-100">
          <mobile
            :component-data="currentComponent"
            class="bg-f2 height-100"
          />
        </el-col>
        <el-col :span="8" class="height-100">
          <config
            v-if="currentComponent"
            :component-data="currentComponent"
            @change="updateComponent"
            @updateNodeText="updateNodeText"
            @updateNodeEvent="updateNodeEvent"
            class="height-100"
          />
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div class="tc c-999">@jmingzi</div>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Mobile from '../components/Mobile.vue'
import Config from '../components/Config.vue'
import List from '../components/List.vue'

export default Vue.extend({
  name: 'home',

  data () {
    return {
    }
  },

  components: {
    Mobile,
    Config,
    List
  },

  computed: {
    ...mapState(['currentComponent'])
  },

  methods: {
    ...mapMutations(['updateComponent', 'updateNodeText', 'updateNodeEvent'])
  }
})
</script>

<style lang="stylus">
.main
  height calc(100vh - 120px)
  padding 0!important
</style>
