<template>
  <el-container>
    <el-header class="bg-blue c-f flex-center-align">
      <h1>Web Component 组件生成器</h1>
    </el-header>
    <el-main class="main">
      <el-row class="height-100">
        <el-col :span="8" class="p10 height-100">
          <list class="height-100" />
        </el-col>
        <el-col :span="8" class="height-100">
          <mobile
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
            @updateNodeImgSrc="updateNodeImgSrc"
            @setProps="setRootProps"
            class="height-100"
          />
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div class="tc c-999 pt10">
        @jmingzi
        <p>全局文件：<a href="https://iming.work/demo/generate-web-components/service/public/define.js" target="_blank">https://iming.work/demo/generate-web-components/service/public/define.js</a></p>
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
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
    ...mapState(['currentComponent']),
    ...mapGetters(['root'])
  },

  methods: {
    ...mapMutations(['updateComponent', 'updateNodeText', 'updateNodeEvent', 'updateNodeImgSrc', 'setProps']),

    setRootProps () {
      const h = this.$createElement
      const props = this.root.props.split(',')
      const relas = this.root.propsRelation
        ? this.root.propsRelation.split(',').map((x: any) => x.split('-'))
        : []
      const i = relas.findIndex((x: any) => Number(x[0]) === this.currentComponent.id)
      const value = i > -1 ? relas[i].slice(1).join('-') : ''

      this.$msgbox({
        title: '选择props',
        message: h('el-select', {
          props: {
            value
          },
          on: {
            change: (val: any) => {
              this.setProps({
                name: val,
                id: this.currentComponent.id
              })
              this.$msgbox.close()
            }
          }
        }, props.slice(1).map((name: string) => {
          return h('el-option', {
            props: {
              label: name,
              value: name
            }
          })
        }))
      })
    }
  }
})
</script>

<style lang="stylus">
.main
  height calc(100vh - 120px)
  padding 0!important
</style>
