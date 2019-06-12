import Vue from 'vue'
import Vuex from 'vuex'
import {item, Component, NodeType} from './assets/js/item'
import { deepCopy } from './assets/js/util'
import {
  create,
  ComponentRelationShip,
  updateStyle,
  initComponent,
  updateNodeText,
  updateNodeEvent,
  deleteNodes,
  updateNodeImgSrc,
  updateRootPropsRelation
} from './assets/js/render/index'
import { appendRelationChild, removeRelation } from './assets/js/render/util'

Vue.use(Vuex)

type RootState = {
  currentComponent?: Component,
  relationShip: ComponentRelationShip,
  components: Array<Component>
}

export default new Vuex.Store<RootState>({
  state: {
    currentComponent: undefined,
    relationShip: [],
    components: []
  },
  getters: {
    root (state) {
      return state.components.find(x => x.root)
    }
  },
  mutations: {
    createEmpty (state, payload: {
      parentId?: number, type: NodeType, name: string, tagName: any, props: string
    }) {
      const newData = deepCopy({
        ...item,
        name: payload.name || item.name,
        tagName: payload.tagName || item.tagName,
        props: payload.props || item.props
      })
      initComponent(newData, !payload.parentId, payload.type)
      state.components.push(newData)

      if (!state.currentComponent) {
        state.currentComponent = newData
      }

      if (payload.parentId) {
        // initComponent(newData, false, payload.type)
        appendRelationChild(state.relationShip, payload.parentId, { id: newData.id, children: [] })
        create(newData, state.components, state.relationShip, 3)
      } else {
        state.relationShip.push({
          id: newData.id,
          children: []
        })
        create(newData, state.components, state.relationShip, 1)
      }
    },
    createCopy (state, payload) {
      const newData = deepCopy(payload.component)
      initComponent(newData, false, payload.component.type)
      state.components.push(newData)
      appendRelationChild(state.relationShip, payload.parent.id, { id: newData.id, children: [] })
      create(newData, state.components, state.relationShip, 3)
    },
    updateComponent (state, payload) {
      state.components.splice(state.components.findIndex(x => x.id === payload.id), 1, payload)
      const root = state.components.find(x => x.root)
      if (root) {
        updateStyle(root, payload)
      }
      state.currentComponent = payload
    },
    setCurrent (state, payload) {
      state.currentComponent = state.components.find(x => Number(x.id) === Number(payload.id))
    },
    addRootAttr (state, prop) {
      const root = state.components.find(x => x.root)
      if (root) {
        const arr = root.props.split(',')
        const newArr = prop.split(',')
        root.props = [...new Set(arr.concat(newArr))].join(',')
        if (state.currentComponent && state.currentComponent.id === root.id) {
          state.currentComponent = root
        }
      }
    },
    updateNodeText (state, val) {
      const root = state.components.find(x => x.root)
      updateNodeText(root as Component, state.currentComponent as Component, val)
    },
    updateNodeEvent (state, val) {
      const root = state.components.find(x => x.root)
      updateNodeEvent(root as Component, state.currentComponent as Component, val)
    },
    updateNodeImgSrc (state, val) {
      const root = state.components.find(x => x.root)
      updateNodeImgSrc(root as Component, state.currentComponent as Component, val)
    },
    deleteComponent (state, payload) {
      const { component, parent } = payload
      if (state.currentComponent && state.currentComponent.id === component.id) {
        state.currentComponent = state.components[0]
      }
      if (parent) {
        const ids = removeRelation(state.relationShip, component.id, parent.id)
        const delComponents = state.components.filter(x => ids.some((y: any) => x.id === y))
        state.components = state.components.filter(x => ids.every((y: any) => x.id !== y))
        // delete div and style
        const root = state.components.find(x => x.root)
        deleteNodes(root as Component, delComponents)
      } else {
        state.components = []
        state.relationShip = []
      }
    },
    setProps (state, { id, name }) {
      const root: any = state.components.find(x => x.root)
      const relation = root && root.propsRelation
      const item = `${id}-${name}`
      if (relation) {
        const relas = relation.split(',').map((x: any) => x.split('-'))
        const exist = relas.some((x: any) => x[1] === name)
        if (!exist) {
          // 监测 id 是否存在
          const i = relas.findIndex((x: any) => Number(x[0]) === id)
          i > -1 ? relas.splice(i, 1, [id, name]) : relas.push([id, name])
          root.propsRelation = relas.map((x: any) => x.join('-')).join(',')
        } else {
          Vue.prototype.$message.error('该属性已被绑定，此设置无效')
        }
      } else {
        root.propsRelation =item
      }
      // 更新 root 的 props-relation
      updateRootPropsRelation(root)
    }
  },
  actions: {

  }
})
