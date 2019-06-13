<template>
  <div class="tree-group">
    <div
      v-for="item in list"
      :key="item.id"
      class="tree"
    >
      <div
        class="tree__item flex-between"
        :class="{ 'bg-f2': isCurr(item) }"
        @click="setCurr(item)"
      >
        <div @click="$set(collapse, item.id, !collapse[item.id])">
          <i
            class="c-999 mr5"
            :class="{
              'c-fff': item.type !== 1,
              'el-icon-caret-right': collapse[item.id],
              'el-icon-caret-bottom': !collapse[item.id]
            }"
          />
          <span>{{ getName(item) }}</span>
        </div>
        <div class="pr10" v-if="isCurr(item)">
          <template v-if="item.type === 1">
            <el-button type="text" @click.stop="$emit('append', item, 1)">添加块</el-button>
            <el-button type="text" @click.stop="$emit('append', item, 2)">添加文本</el-button>
            <el-button type="text" @click.stop="$emit('append', item, 3)">添加图片</el-button>
          </template>
          <template
            v-if="!item.root"
          >
            <el-button
              type="text"
              @click.stop="$emit('copy', item, parent)"
            >
              复制粘贴
            </el-button>
            <el-button
              type="text"
              @click.stop="$emit('remove', item, parent)"
            >
              删除
            </el-button>
          </template>
        </div>
      </div>
      <tree
        v-show="collapse[item.id] !== true"
        :list="item.children"
        :parent="item"
        :level="level + 1"
        @append="(val, type) => $emit('append', val, type)"
        @remove="(val, p) => $emit('remove', val, p)"
        @copy="(val, p) => $emit('copy', val, p)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { query } from '../assets/js/render/dom'
import { queen } from '../assets/js/render/update'

export default {
  name: 'Tree',

  data () {
    return {
      collapse: {}
    }
  },

  props: {
    list: {
      type: Array,
      required: true
    },
    parent: {
      type: Object
    },
    level: {
      type: Number,
      default: 1
    }
  },

  computed: {
    ...mapState(['currentComponent', 'components']),
    ...mapGetters(['root'])
  },

  created () {
  },

  methods: {
    ...mapMutations(['setCurrent']),

    isCurr (item) {
      return this.currentComponent && this.currentComponent.id === item.id
    },

    getName (item) {
      // item.root ? '根结点' : `子节点${item.className.substr(-4)}`
      // if (item.root) {
      //   return `${this.level} - 块`
      // }
      return `${this.level} - ${['块', '文本', '图片'][item.type - 1]} `
    },

    setCurr (item) {
      const root = queen.getEl(this.root).shadowRoot
      const active = query('active', root, 'div', true)
      active && active.classList.remove('active')

      const div = query(item.className, root, 'div')
      div && div.classList.add('active')
      this.setCurrent(item)
    }
  }
}
</script>

<style lang="stylus">
.tree-group
  & &
    padding-left 15px
  .tree__item
    line-height 30px
    white-space nowrap
    ^[0] &
      // padding-left 20px
</style>
