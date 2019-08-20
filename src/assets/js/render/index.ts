import { queen } from './update'
import { Component, NodeType } from '../item'
import { recursionFindPath } from './util'
import { query } from './dom'
import { getStyle } from './style'

export const getId = (id: number, name: string, isRoot?: boolean) => `${name}${isRoot ? '' : '-child'}-${id}`

export const initComponent = (
  componentData: Component,
  root: boolean = true,
  nodeType: NodeType = 1
) => {
  componentData.id = Date.now()
  componentData.root = root
  componentData.className = getId(componentData.id, <string>componentData.name, componentData.root)
  componentData.type = nodeType
}

export const updateStyle = (rootData: Component, updateData: Component) => {
  queen.update({
    ...updateData,
    id: rootData.id,
    number: rootData.number
  })
}

// substr start for service
function addSpecial (
  component: any,
  div: any,
  noEvent?: boolean,
  root?: any
) {
  // 文本
  if (component.type === 2) {
    div.innerHTML = component.text
  } else if (component.type === 3 && component.imgSrc) {
    const img = document.createElement('img')
    img.setAttribute('width', '100%')
    img.setAttribute('height', '100%')
    img.style.borderRadius = component.style.border.borderRadius + 'px'
    img.src = component.imgSrc
    div.style.fontSize = 0
    div.appendChild(img)
  }
  if (!noEvent) {
    // 事件句柄，便于 remove
    component.eventCallbackHandler = (e: Event) => {
      // e.stopPropagation()
      const click = root && root.getAttribute('onclick')
      if (click) {
        new Function('e', click)(e)
      } else {
        new Function('e', component.event.onClick)(e)
      }
    }
    div.addEventListener('click', component.eventCallbackHandler)
  }
}

export type ComponentRelationShipItem = {
  id: number,
  children?: ComponentRelationShip
}
export type ComponentRelationShip = Array<ComponentRelationShipItem>

const BuiltInHTMLElement = HTMLElement
// @ts-ignore
window.HTMLElement = function HTMLElement() {
  return Reflect.construct(BuiltInHTMLElement, [], this.constructor)
}
HTMLElement.prototype = BuiltInHTMLElement.prototype
HTMLElement.prototype.constructor = HTMLElement
Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement)
const PROPS_RELATION = 'props-relation'
let customElemNumber = 0

function defineElem (
  components: Array<Component>,
  relationShip?: ComponentRelationShip,
  // 在实际使用时才传的参数
  // 目的是不需要用户手动传
  propsRelation?: any
) {
  const root: Component = components.find(x => x.root) || components[0]

  customElements.define(root.name as string, class Custom extends HTMLElement {
    static get observedAttributes() {
      return root.props ? root.props.split(',') :  []
    }

    propsRelation:any = []
    number = undefined

    constructor () {
      super()

      const shadow = this.attachShadow({ mode: 'open' })
      const rootDiv = document.createElement('div')

      if (relationShip) {
        let parent =[rootDiv]
        // let oldParent
        const _createChild = (relation?: ComponentRelationShip) => {
          (relation || []).forEach((item: ComponentRelationShipItem) => {
            const component = components.find((x: Component) => x.id === item.id) || components[0]
            const div = document.createElement('div')
            const style = document.createElement('style')
            div.className = component.className
            // if (component.type === 2) {
            //   div.innerText = component.text
            // }
            addSpecial(component, div, false, this)
            style.className = component.className
            style.textContent = <string>getStyle(component.style, true, component.className)
            parent[parent.length - 1].appendChild(div)
            // console.log(parent.className)
            shadow.appendChild(style)
            // oldParent = parent
            // parent = div
            parent.push(div)
            _createChild(item.children)
            // 回退
            // parent = oldParent
            parent.pop()
          })
        }
        _createChild(relationShip)
        shadow.appendChild(rootDiv.childNodes[0])
      } else {
        rootDiv.className = root.className
        // if (root.type === 2) {
        //   rootDiv.innerText = root.text
        // }
        addSpecial(root, rootDiv, false, this)

        const style = document.createElement('style')
        style.className = root.className
        // updateStyle(this, root.style, root.className)
        style.textContent = <string>getStyle(root.style, true, root.className)
        shadow.appendChild(style)
        shadow.appendChild(rootDiv)
      }

      // 初始化唯一标识
      this.initNumber()

      // @ts-ignore
      queen.add(this.number, {
        id: root.id,
        className: root.className,
        elem: this
      })

      // 初始化 propsRelation
      if (propsRelation) {
        this.setPropsRelation(propsRelation)
      }
    }

    initNumber () {
      if (this.number === undefined) {
        // @ts-ignore
        this.number = customElemNumber += 1
        // @ts-ignore
        root.number = this.number
      }
    }

    connectedCallback () {
      // add active style
      const style = document.createElement('style')
      style.className = 'active'
      style.textContent = `.active {\n border: 1px blue dashed !important;overflow:hidden; \n}`
      this.shadowRoot && this.shadowRoot.appendChild(style)
    }

    adoptedCallback () {
      console.log('adoptedCallback')
    }

    disconnectedCallback () {
      console.log('disconnectedCallback')
    }

    attributeChangedCallback (name: string, oldValue: string, newValue: string) {
      this.initNumber()
      // console.log(name, newValue, oldValue)
      // 获取props映射关系
      if (name === PROPS_RELATION) {
        // id-props,id-props 例如：
        // <demo-tag props-relation="1-imgSrc,2-text" imgSrc="" text="" />
        this.setPropsRelation(newValue)
      } else if (this.propsRelation.length) {
        const item = this.propsRelation.find((x: any) => x.name === name)
        if (item) {
          const component = components.find((x: any) => Number(x.id) === Number(item.id))
          if (component) {
            const handle = component.type === 2 ? updateNodeText : component.type === 3 ? updateNodeImgSrc : undefined
            handle && handle(this.number, component, newValue)
          }
        }
      }
    }

    setPropsRelation (value: string) {
      const propsItem = value.split(',')
      this.propsRelation = propsItem.map((x: string) => {
        const item = x.split('-')
        return {
          id: item[0],
          name: item.slice(1).join('-')
        }
      })
    }
  })
}

export function updateNodeText (root: any, component: Component, text: string) {
  addSpecial(
    { ...component, text },
    query(component.className, queen.getEl(root).shadowRoot, 'div', true),
    true
  )
}

export function updateNodeEvent (root: any, component: Component, script: string) {
  const div = query(component.className, queen.getEl(root).shadowRoot, 'div', true)
  component.eventCallbackHandler && div.removeEventListener('click', component.eventCallbackHandler)
  component.eventCallbackHandler = (e: Event) => {
    e.stopPropagation()
    new Function('e', script)(e)
  }
  div.addEventListener('click', component.eventCallbackHandler)
}

export function updateNodeImgSrc (root: any, component: Component, src: string) {
  const div = query(component.className, queen.getEl(root).shadowRoot, 'div', true)
  if (!div.childNodes.length) {
    addSpecial({ ...component, imgSrc: src }, div, true)
  } else {
    const img = div.childNodes[0]
    img.src = src
  }
}

export function updateRootPropsRelation (root: any) {
  const el = queen.getEl(root.number)
  el && el.setAttribute(PROPS_RELATION, root.propsRelation)
}

function loadComponents (nameArr: any, path: any) {
  const _load = (name: string) => new Promise((resolve, reject) => {
    if (document.getElementById(name)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    const version = location.search.match(/v=(\d+)/)
    script.id = name
    script.src =  `${path + name}.js?v=${version && version.index && version.index > -1 ? version[1] : Date.now()}`
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject()
    }
    document.head.appendChild(script)
  })
  return Promise.all((nameArr || []).map(_load))
}
// substr end for service

function createRoot (newData: Component, components: Array<Component>) {
  defineElem(components)
}

function createRootMulti (components: Array<Component>, relationShip: ComponentRelationShip) {
  defineElem(components, relationShip)
}

function createRootChild (
  rootData: Component,
  updateData: Component,
  relation: ComponentRelationShip
) {
  const shadow = queen.getEl(rootData.number).shadowRoot
  // root
  const rootElem = query(rootData.className, shadow, 'div')
  const path = recursionFindPath(relation, updateData.id)
  // 去除 root 的索引
  path.shift()
  let currentElem = rootElem
  // let currentParentElem
  // 根据path获取当前节点
  for (let i = 0; i < path.length; i ++) {
    if (i === path.length - 1) {
      // 最后一层节点
      const div = document.createElement('div')
      // 创建多节点
      div.className = updateData.className
      // if (updateData.type === 2) {
      //   div.innerText = updateData.text
      // }
      addSpecial(updateData, div, false, queen.getEl(rootData.number))

      currentElem.appendChild(div)
      // 创建style
      const style = document.createElement('style')
      style.className = updateData.className
      style.textContent = <string>getStyle(updateData.style, true, updateData.className)
      // @ts-ignore
      shadow.appendChild(style)
    } else {
      // @ts-ignore
      currentElem = currentElem.childNodes[path[i]]
    }
  }
}

export const create = (
  newData: Component,
  components: Array<Component>,
  relationShip: ComponentRelationShip,
  type: number = 1
): void => {
  switch (type) {
    case 1:
      createRoot(newData, components)
      break
    case 2:
      createRootMulti(components, relationShip)
      break
    case 3:
      createRootChild(components[0], newData, relationShip)
      break
    default:
      console.log('no create way')
  }
}

export function deleteNodes (root: Component, spreadChildren: Array<Component>) {
  const el = queen.getEl(root.number).shadowRoot
  spreadChildren.reverse().forEach(item => {
    query(item.className, el, 'style').remove()
    query(item.className, el, 'div').remove()
  })
}
