<template>
  <div class="tree-group">
    <div
      v-for="item in list"
      :key="item.id"
      class="tree"
    >
      <div
        class="tree__item"
        :class="{ 'bg-f2': currentComponent.id === item.id }"
        @click="setCurr(item)"
      >
        <i class="el-icon-caret-bottom" />
        <span>{{ item.root ? '根结点' : `子节点${item.className.substr(-4)}` }}</span>
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
      <tree
        :list="item.children"
        :parent="item"
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

  props: {
    list: {
      type: Array,
      required: true
    },
    parent: {
      type: Object
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

    setCurr (item) {
      // const root = queen.getEl(this.components[0]).shadowRoot
      const active = query('active', this.root.shadowRoot, 'div', true)
      active && active.classList.remove('active')

      const div = query(item.className, this.root.shadowRoot, 'div')
      div && div.classList.add('active')
      this.setCurrent(item)
    }
  }
}
</script>

<style lang="stylus">
.tree-group
  .tree-group
    margin-left 10px
</style>
