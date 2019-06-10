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
  deleteNodes
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
    createEmpty (state, payload: { parentId?: number, type: NodeType }) {
      const newData = deepCopy(item)
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
    },
    setCurrent (state, payload) {
      state.currentComponent = state.components.find(x => x.id === payload.id)
    },
    updateNodeText (state, val) {
      const root = state.components.find(x => x.root)
      updateNodeText(root as Component, state.currentComponent as Component, val)
    },
    updateNodeEvent (state, val) {
      const root = state.components.find(x => x.root)
      updateNodeEvent(root as Component, state.currentComponent as Component, val)
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
    }
  },
  actions: {

  }
})
