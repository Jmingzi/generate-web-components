<script lang="tsx">
import Vue from 'vue'
import { schema } from '../assets/js/item'
import { deepCopy } from '../assets/js/util'

type Init = {
  collapse: {
    [key: string]: any
  }
}

export default Vue.extend<Init>({
  name: 'Config',

  data () {
    return {
      collapse: {},
      details: null
    }
  },

  model: {
    prop: 'componentData',
    event: 'change'
  },

  props: {
    componentData: {
      type: Object,
      required: true
    }
  },

  watch: {
    componentData: {
      deep: true,
      handler (nVal, oVal) {
        if (!oVal || oVal.id !== nVal.id) {
          this.details = deepCopy(nVal)
          // console.log('componentData ----', nVal.id)
        }
      },
      immediate: true
    },
    details: {
      deep: true,
      handler (nVal, oVal) {
        if (oVal !== null) {
          this.$emit('change', nVal)
        }
      }
    }
  },

  created () {
    // this.details = deepCopy(this.componentData)
  },

  methods: {
    renderConfig (schema: any, path = '') {
      const dataObj = this.getData(path)
      return Object.keys(dataObj).map(key => {
        const schemaItem = schema[key]
        switch (schema[key].type) {
          case 'group':
            return this.renderGroup(schemaItem, key, path)
          case 'number':
            return this.renderNumber(schemaItem, key, path)
          case 'color':
            return this.renderColor(schemaItem, key, path)
          case 'select':
            return this.renderSelect(schemaItem, key, path)
          case 'checkbox':
            return this.renderCheckbox(schemaItem, key, path)
          case 'textarea':
            return this.renderInput(schemaItem, key, path, 'textarea')
          case 'upload':
            return this.renderUpload(schemaItem, key, path)
          case 'script':
            return this.renderEventScript(schemaItem, key, path)
          default:
            return this.renderUnknow(schemaItem, key, path)
        }
      })
    },

    renderGroup (schema: any, field: string, path: string) {
      return (
        <div class="config__group">
          <p
            class="config__group--title"
            onClick={() => { this.$set(this.collapse, field, !this.collapse[field]) }}
          >
            <span>{schema.name}</span>
            <i class={this.collapse[field] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'} />
          </p>
          <el-collapse-transition>
            <div
              vShow={this.collapse[field]}
              class="config__group--item"
            >
              {this.renderConfig(schema.children, `${path}.${field}`)}
            </div>
          </el-collapse-transition>
        </div>
      )
    },

    renderNumber (schema: any, field: string, path: string) {
      const data = this.getData(path)
      return (
        <div class="config__item">
          <p>{schema.name}</p>
          <el-input-number
            vModel={data[field]}
            min={schema.min}
            max={schema.max}
          />
        </div>
      )
    },

    renderColor (schema: any, field: string, path: string) {
      const data = this.getData(path)
      return (
        <div class="config__item">
          <p>{schema.name}</p>
          <el-color-picker vModel={data[field]} show-alpha />
        </div>
      )
    },

    renderSelect (schema: any, field: string, path: string) {
      const data = this.getData(path)
      return (
        <div class={`config__item ${field}`}>
          <p>{schema.name}</p>
          <el-select vModel={data[field]}>
            {
              schema.options.map((x: { label: string, value: string }) => (
                <el-option
                  label={x.label}
                  value={x.value}
                />
              ))
            }
          </el-select>
        </div>
      )
    },

    renderCheckbox (schema: any, field: string, path: string) {
      const data = this.getData(path)
      return (
        <div class="config__item">
          <p>{schema.name}</p>
          <el-checkbox vModel={data[field]} />
        </div>
      )
    },

    renderInput (schema: any, field: string, path: string, type = 'input', cb?: (val: string) => void) {
      const obj = this.getData(path)
      return (
        <div class={'config__item ' + (type === 'textarea' ? 'config__item--textarea' : '')}>
          <p>{schema.name}</p>
          <el-input
            autosize={{ minRows: 2, maxRows: 10 }}
            type={type}
            value={obj[field]}
            onInput={val => { obj[field] = val; cb && cb(val) }}
          />
        </div>
      )
    },

    renderUpload (schema: any, field: string, path: string, cb: any) {
      const obj = this.getData(path)
      return (
        <div class={`config__item ${field}`}>
          <p>{schema.name}</p>
          <el-input
            type='text'
            value={obj[field]}
            onInput={val => { obj[field] = val; cb(val) }}
            placeholder="链接地址"
          />
        </div>
      )
    },

    renderUnknow (schema: any, field: string, path: string) {
    },

    renderEventScript (schema: any, field: string, path: string) {
      const obj = this.getData(path)
      return (
        <div class="config__item script">
          <p>{schema.name}</p>
          <el-input
            type='textarea'
            autosize={{ minRows: 4, maxRows: 10 }}
            value={obj[field]}
            onInput={val => { obj[field] = val; this.$emit('updateNodeEvent', val) }}
            placeholder="params e: Event;\nexpression 1; \nexpression 2;"
          />
        </div>
      )
    },

    renderImgSrc () {
      return this.renderGroupContainer('图片项', 'imgSrc', () =>
        this.renderUpload({ name: '图片链接' }, 'imgSrc', 'details', (val: string) => {
          this.$emit('updateNodeImgSrc', val)
        })
      )
    },

    renderInnerText () {
      return this.renderGroupContainer('文本项', 'text', () =>
        this.renderInput(
          { name: '文本内容' },
          'text',
          'details',
          'textarea',
          val => { this.$emit('updateNodeText', val) }
        )
      )
    },

    renderGroupContainer (name, field, cb) {
      return (
        <div class="config__group">
          <p
            class="config__group--title flex-center-between"
            onClick={() => { this.$set(this.collapse, field, !this.collapse[field]) }}
          >
            <span>{name} <i class={this.collapse[field] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'}/></span>
            <el-button type="text" onClick={(e) => { e.stopPropagation(); this.$emit('setProps', field) }}>设置组件props</el-button>
          </p>
          <el-collapse-transition>
            <div
              vShow={this.collapse[field]}
              class={`config__group--item`}
            >
              {cb()}
            </div>
          </el-collapse-transition>
        </div>
      )
    },

    getData (path: string, isParent = false): any {
      const pathArr = path.split('.')
      isParent && pathArr.pop()
      return pathArr.reduce((obj: any, item: string) => obj[item], this)
    }
  },

  render () {
    const { type } = this.details
    return (
      <div class="config">
        <p>组件配置</p>
        {this.renderConfig(schema, 'details.style')}
        {type === 2 && this.renderInnerText()}
        {type === 3 && this.renderImgSrc()}
        {this.renderGroup(schema.event, 'event', 'details')}
      </div>
    )
  }
})
</script>

<style lang="stylus">
.config
  padding 10px
  overflow auto
  &__item
    width 130px
    margin-left 10px
    margin-bottom 10px
    & > p
      color #999
    &--textarea
    &.script
    &.imgSrc
    &.position
      width 100%
  &__group
    width 100%
    & &
      margin-left 10px
    &--title
      padding 5px
      margin 5px 0
      background-color #f2f2f2
    &--item
      display flex
      flex-wrap wrap
    // & ^[1]
      // margin-left 10px
  .el-select
    width 130px
</style>
