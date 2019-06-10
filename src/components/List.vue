<template>
  <div class="list">
    <template v-if="components.length === 0">
      <el-button
        type="primary"
        @click="create"
      >
        新建空白组件
      </el-button>
      <el-button
        type="danger"
        @click="replaceState()"
      >
        从本地导入state
      </el-button>
    </template>
    <template v-else>
      <el-button
        type="primary"
        @click="saveLocal()"
      >
        保存到本地
      </el-button>
      <el-button
        type="danger"
        @click="save()"
      >
        生成js文件
      </el-button>
    </template>
    <p class="mtb10 bg-f2 p10 f14">节点树</p>
    <tree
      ref="tree"
      :list="nodeTree"
      @append="appendNode"
      @remove="removeNode"
      @copy="copy"
    />
  </div>
</template>

<script lang="tsx">
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import Tree from '../components/Tree'
import { recursionRelation } from '../assets/js/render/util'
import { create } from '../assets/js/render'

export default {
  name: 'List',

  components: {
    Tree
  },

  data () {
    return {
      nodeTree: [],
      defaultProps: {
        label: 'className',
        children: 'children'
      }
    }
  },

  computed: {
    ...mapState(['relationShip', 'components'])
  },

  watch: {
    relationShip: {
      deep: true,
      handler (val) {
        this.nodeTree = recursionRelation(val, this.components)
      },
      immediate: true
    }
  },

  created () {
  },

  methods: {
    ...mapMutations(['createEmpty', 'createCopy', 'deleteComponent']),

    create () {
      this.$prompt('组件名称为小写短杆连接，例如 a-b', '新建组件').then((val: any) => {
        if (/^[a-z]+(-[a-z])+$/.test(val.value)) {
          this.createEmpty({ type: 1, name: val.value })
        } else {
          this.$message.error('名称不对呢')
        }
      })
    },

    appendNode (data, type) {
      this.createEmpty({ type, parentId: data.id })
    },

    removeNode (component, parent) {
      this.deleteComponent({ component, parent })
    },

    copy (item, parent) {
      // 重新获取新的值
      const component = this.components.find(x => x.id === item.id)
      this.createCopy({ component, parent })
    },

    saveLocal () {
      localStorage.local = JSON.stringify(this.$store.state)
    },

    save () {
      // axios.post('/generate', {
      //   state: JSON.stringify(this.$store.state)
      // }, {
      //   baseURL: 'http://localhost:3000'
      // })
      const loading = this.$loading()
      const form = document.createElement('form')
      form.action = /localhost/.test(location.host) ? 'http://localhost:3003/generate' : 'http://iming.work:3003/generate'
      form.method = 'POST'
      const input = document.createElement('input')
      input.name = 'state'
      input.value = JSON.stringify({
        relationShip: this.relationShip,
        components: this.components
      })
      form.appendChild(input)
      document.body.appendChild(form)
      form.submit()
      setTimeout(() => {
        loading.close()
      }, 2000)
    },

    replaceState () {
      const local = JSON.parse(localStorage.local)
      if (local) {
        create(null, local.components, local.relationShip, 2)
        this.$store.replaceState(local)
        this.$nextTick(() => {
          this.$refs.tree.setCurr(local.components[0])
        })
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
