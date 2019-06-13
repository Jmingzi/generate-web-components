<template>
  <div class="list">
    <template v-if="components.length === 0">
      <el-button
        type="danger"
        @click="replaceState()"
      >
        从本地导入
      </el-button>
      <el-button
        type="danger"
        @click="replaceFile()"
      >
        从文件导入
      </el-button>
      <el-button
        type="primary"
        @click="create"
      >
        新建组件
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
        @click="addAttr()"
      >
        添加自定义属性
      </el-button>
      <el-button
        type="danger"
        @click="delAttr()"
      >
        删除属性
      </el-button>
      <el-button
        type="danger"
        @click="save()"
      >
        下载js文件
      </el-button>
    </template>
    <p class="mt10 list__title">组件节点树 {{ root ? `<${root.name} />` : '' }}</p>

    <div class="tree__wrap">
      <tree
        class="mt10"
        ref="tree"
        :list="nodeTree"
        @append="appendNode"
        @remove="removeNode"
        @copy="copy"
      />
    </div>


    <div v-show="demoCode" class="code">
      <p class="mb10 list__title">代码演示</p>
      <el-alert
        title="使用组件时，不要忘了拷贝 props-relation 属性"
        type="warning">
      </el-alert>
      <pre v-text="demoCode" />
    </div>
  </div>
</template>

<script lang="tsx">
import { mapState, mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
import Tree from '../components/Tree'
import { recursionRelation } from '../assets/js/render/util'
import { create } from '../assets/js/render'
import { completeField } from '../assets/js/util'
import { item } from '../assets/js/item'

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
      },
      demoCode: ''
    }
  },

  computed: {
    ...mapState(['relationShip', 'components']),
    ...mapGetters(['root'])
  },

  watch: {
    relationShip: {
      deep: true,
      handler (val) {
        this.nodeTree = recursionRelation(val, this.components)
      },
      immediate: true
    },

    root: {
      deep: true,
      handler (val) {
        if (val) {
          this.demoCode = `<${val.name} `
          if (val.props) {
            const arr = val.props.split(',')
            this.demoCode += arr.length ? arr.slice(1).reduce((sum, item) => sum + `\n  ${item}=""`, '') : ''
            this.demoCode += arr.length > 1 ? `\n  props-relation="${val.propsRelation || ''}"\n` : ''
          }
          this.demoCode += `/>`
        }
      },
      immediate: true
    }
  },

  created () {
  },

  methods: {
    ...mapMutations(['createEmpty', 'createCopy', 'deleteComponent', 'addRootAttr', 'delRootProp']),

    create () {
      this.$prompt('组件名称为小写短杆连接，例如 a-b', '新建组件').then((val: any) => {
        if (/^[a-z]+(-[a-z]+)+$/.test(val.value)) {
          this.addAttr(val.value)
        } else {
          this.$message.error('名称不对呢')
        }
      })
    },

    doCreate (name, prop) {
      if (name) {
        // 初次创建
        this.createEmpty({
          type: 1,
          name,
          props: `props-relation${prop ? `,${prop}` : ''}`
        })
      } else if (prop) {
        // 后续新增属性
        this.addRootAttr(prop)
        // this.$nextTick(() => {
        //   this.$alert('添加属性后需要，刷新才能生效。刷新后请点击"从本地导入"').then(() => {
        //     this.saveLocal()
        //     location.reload()
        //   })
        // })
      }
    },

    // type 1 div; 2 文本; 3 img
    appendNode (data, type) {
      this.createEmpty({
        type,
        parentId: data.id,
        name: data.name,
        tagName: type === 3 ? 'img' : data.tagName
      })
    },

    removeNode (component, parent) {
      this.$confirm('确定要删除吗').then(() => {
        this.deleteComponent({ component, parent })
      })
    },

    copy (item, parent) {
      // 重新获取新的值
      const component = this.components.find(x => x.id === item.id)
      this.createCopy({ component, parent })
    },

    saveLocal () {
      localStorage.local = JSON.stringify(this.$store.state)
      this.$message.success('保存本地成功')
    },

    save () {
      const loading = this.$loading()
      const form = document.createElement('form')
      // form.action = 'http://localhost:3003/generate/generate'
      form.action = '/generate/generate'
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

    replaceState (data) {
      const local = data || JSON.parse(localStorage.local)
      if (local) {
        // 补全 undefined
        local.components = local.components.map(one => {
          completeField(one, item)
          return one
        })

        create(null, local.components, local.relationShip, 2)
        this.$store.replaceState(local)

        this.$nextTick(() => {
          this.$refs.tree.setCurr(local.components[0])
        })
      }
    },

    replaceFile () {
      this.$prompt('输入你之前定义上传过的组件名称', '输入组件名称').then(res => {
        axios.get(`/generate/file?filename=${res.value}`, {
          // baseURL: 'http://localhost:3003'
        }).then(res => {
          this.replaceState({ ...res.data, currentComponent: '' })
        }).catch(err => {
          this.$message.error(err.response ? err.response.data : err.message)
        })
      })
    },

    addAttr (name) {
      const prop = this.root && this.root.props.split(',').slice(1).join(',')
      const msg = name || !prop ? '添加自定义属性列表，多个英文逗号分隔(可以后续添加)' : `已存在属性: ${prop}，会去重`
      this.$prompt(msg, '添加属性').then((props: any) => {
        if (!props.value || /^[a-z][a-zA-Z,]*[a-zA-Z]*$/.test(props.value)) {
          this.doCreate(name, props.value)
        } else {
          this.$message.error('属性不对呢')
        }
      })
    },

    delAttr () {
      const h = this.$createElement
      const prop = this.root && this.root.props.split(',').slice(1)
      this.$msgbox({
        title: '属性列表',
        message: h('div', null, prop.map(name => h('el-tag', {
          class: 'mr10',
          props: {
            closable: true
          },
          on: {
            close: () => {
              this.delRootProp(name)
              this.$msgbox.close()
              this.$message.success('删除成功')
            }
          }
        }, name)))
      })
    }
  }
}
</script>

<style lang="stylus">
.list
  position relative
  &__title
    position relative
    border-top 1px #ddd solid
    padding-top 10px
    padding-left 10px
    font-size 16px
    color #666
    &:before
      content: ''
      position absolute
      left 0
      width 3px
      height 20px
      // top 2px
      background-color #409eff
.code
  position absolute
  width 100%
  bottom 0
  left 0
  height 200px
  // padding 0 10px
  pre
    width 100%
    padding 10px
    background-color #f2f2f2
    white-space pre-wrap
.tree__wrap
  height calc(100vh - 420px)
  overflow: auto
</style>
