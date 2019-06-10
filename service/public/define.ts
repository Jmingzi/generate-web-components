
 interface Component {
  id: number
  name?: string
  root: boolean
  className: string
  tagName: 'div'
  type: NodeType // 1 div; 2 文本
  style: any
  activeStyle?: any
  event: any,
  eventCallbackHandler: (e: Event) => void,
  text: string
}
 type NodeType = 1 | 2
 type ComponentStyle = {
  base: any
  margin: any
  padding: any
  font: any
  background: any
  border: any
  boxShadow: any
}

function addUnit (val: any, unit?: 'px' | 'vw') {
  if (typeof val === 'string') {
    val = val.trim()
  }
  const isVw = unit === 'vw'
  return unit && /^\d+$/.test(val)
    ? `${isVw ? `${val / 3.75}vw` : `${val}${unit}`}`
    : val
}

function objAddUnit (obj: any, unit?: 'px' | 'vw') {
  let newOj: any = {}
  Object.keys(obj).forEach(key => {
    newOj[key] = addUnit(obj[key], unit)
  })
  return newOj
}

 const transferToStyleObject = (
  str: string,
  unit?: 'px' | 'vw'
): { [key: string]: string } => {
  if (!str) {
    return {}
  }
  const result: { [key: string]: string } = {}
  str.split(';').filter(Boolean).forEach(item => {
    const one = item.split(':')
    result[toCamel(one[0].trim())] = addUnit(one[1], unit)
  })
  return result
}

 const transferToStyleString = (
  obj: { [key: string]: string },
  unit?: 'px' | 'vw'
): string => {
  return Object.keys(obj).reduce((result, key) => result + `${toLowerLine(key)}:${addUnit(obj[key], unit)};`, '')
}

 const getStyleBase = (style: any, returnObj?: boolean): any => {
  const {
    width,
    isAutoWidth,
    height,
    isAutoHeight,
    textAlign,
    customStyle
  } = style
  const base = {
    width: isAutoWidth ? 'auto' : addUnit(width, "vw"),
    height: isAutoHeight ? 'auto' : addUnit(height, "vw"),
    textAlign: textAlign
  }
  if (returnObj) {
    return Object.assign(base, transferToStyleObject(customStyle))
  }
  return transferToStyleString(base) + customStyle
}

function dirToString (dir: any) {
  return Object.keys(dir).map(x => dir[x]).join(' ')
}

function getStyleBorder (style: any, isString?: boolean) {
  const border = objAddUnit(style.borderWidth, "vw")
  const result = objAddUnit(style, "vw")
  result.borderWidth = dirToString(border)
  return isString ? transferToStyleString(result) : result
}

function getStyleShadow (style: any, isString?: boolean) {
  const obj = objAddUnit(style, "vw")
  const res = {
    boxShadow: `${obj.hShadow} ${obj.vShadow} ${obj.blur} ${obj.spread} ${obj.color}`
  }
  return isString ? transferToStyleString(res) : res
}

function getStyleBackground (style: any) {
  let background = `${style.backgroundColor}`
  if (style.backgroundImage) {
    background += ` url(${style.backgroundImage}) ${style.backgroundPosition} / ${style.backgroundSize} ${style.backgroundRepeat}`
  }
  return background ? transferToStyleString({ background }) : ''
}

function getStyleFont (style: any) {
  const result = objAddUnit(style, "vw")
  result.fontSize = result.isInherit ? 'inherit' : result.fontSize
  delete result.isInherit
  return transferToStyleString(result)
}

 function getStyle (style: ComponentStyle, isString?: boolean, className?: string) {
  let result = isString ? `\ndiv${className ? `.${className}` : ''} {\n` : {}
  Object.keys(style).forEach(key => {
    switch (key) {
      case 'base':
        isString
          ? result += getStyleBase(style[key])
          : Object.assign(result, getStyleBase(style[key], true))
        break
      case 'margin':
      case 'padding':
        isString
          ? result += transferToStyleString(style[key], "vw")
          : Object.assign(result, objAddUnit(style[key], "vw"))
        break
      case 'font':
        result += getStyleFont(style[key])
        break
      case 'border':
        isString
          ? result += getStyleBorder(style[key], isString)
          : Object.assign(result, getStyleBorder(style[key], isString))
        break
      case 'boxShadow':
        isString
          ? result += <string>getStyleShadow(style[key], true)
          : Object.assign(result, getStyleShadow(style[key], ))
        break
      case 'background':
        result += getStyleBackground(style[key])
        break
    }
  })
  return isString ? result + `\n}` : result
}

 const toCamel = (str: string) => str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => $1 + $2.toUpperCase())

 const upCamel = (str: string) => {
  const camel = toCamel(str)
  return `${camel[0].toUpperCase()}${camel.substring(1)}`
}

 function toLowerLine (str: string) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '_') {
    // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

const cacheElem: { [id: string]: any } = {}

 function query (className: string, parent: any, tag: string, force?: boolean) {
  const selector = `${tag || ''}.${className}`
  if (!cacheElem[selector] || force) {
    const el = (parent || document.body).querySelector(selector)
    if (el) {
      cacheElem[selector] = el
    } else {
      // throw `${selector} 未找到.`
      return null
    }
  }
  return cacheElem[selector]
}

type StackItem = {
  id: number
  className: string
  elem: Element
  // data: Component
}
type UpdateQueen = {
  stack: {
    [id: number]: StackItem
  }
  add (id: number, obj: StackItem): void
  update (obj: Component): void
  getEl (obj: Component): Element
}

 const queen: UpdateQueen = {
  stack: {},

  add (id, obj) {
    this.stack[id] = obj
  },

  update (obj) {
    if (this.stack[obj.id]) {
      // const item = this.stack[obj.id]
      // updateStyle(item.elem, obj.style, obj.className)
      query(
        obj.className,
        this.getEl(obj).shadowRoot,
        'style'
      ).textContent = <string>getStyle(obj.style, true, obj.className)
      // const style = shadow && shadow.querySelector('style')
      // style && (style.textContent = getStyleStr(obj.style))
    }
  },

  getEl (obj) {
    return this.stack[obj.id].elem
  }
}

function addSpecial (component: any, div: any) {
  // 文本
  if (component.type === 2) {
    div.innerText = component.text
  }
  // 事件句柄，便于 remove
  component.eventCallbackHandler = (e: Event) => {
    e.stopPropagation()
    new Function('e', component.event.onClick)(e)
  }
  div.addEventListener('click', component.eventCallbackHandler)
}

 type ComponentRelationShipItem = {
  id: number,
  children?: ComponentRelationShip
}
 type ComponentRelationShip = Array<ComponentRelationShipItem>

const BuiltInHTMLElement = HTMLElement
// @ts-ignore
window.HTMLElement = function HTMLElement() {
  return Reflect.construct(BuiltInHTMLElement, [], this.constructor)
}
HTMLElement.prototype = BuiltInHTMLElement.prototype
HTMLElement.prototype.constructor = HTMLElement
Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement)
function defineElem (components: Array<Component>, relationShip?: ComponentRelationShip) {
  const root: Component = components.find(x => x.root) || components[0]
  customElements.define(root.name as string, class Custom extends HTMLElement {
    constructor () {
      super()
      const shadow = this.attachShadow({ mode: 'open' })
      const rootDiv = document.createElement('div')
      if (relationShip) {
        let parent = rootDiv
        let oldParent
        const _createChild = (relation?: ComponentRelationShip) => {
          (relation || []).forEach((item: ComponentRelationShipItem) => {
            const component = components.find((x: Component) => x.id === item.id) || components[0]
            const div = document.createElement('div')
            const style = document.createElement('style')
            div.className = component.className
            // if (component.type === 2) {
            //   div.innerText = component.text
            // }
            addSpecial(component, div)
            style.className = component.className
            style.textContent = <string>getStyle(component.style, true, component.className)
            parent.appendChild(div)
            shadow.appendChild(style)
            oldParent = parent
            parent = div
            _createChild(item.children)
            // 回退
            parent = oldParent
          })
        }
        _createChild(relationShip)
        shadow.appendChild(rootDiv.childNodes[0])
      } else {
        rootDiv.className = root.className
        // if (root.type === 2) {
        //   rootDiv.innerText = root.text
        // }
        addSpecial(root, rootDiv)

        const style = document.createElement('style')
        style.className = root.className
        // updateStyle(this, root.style, root.className)
        style.textContent = <string>getStyle(root.style, true, root.className)
        shadow.appendChild(style)
        shadow.appendChild(rootDiv)
      }
    }
    connectedCallback () {
      // add active style
      const style = document.createElement('style')
      style.className = 'active'
      style.textContent = `.active {\n border: 1px blue dashed;overflow:hidden; \n}`
      this.shadowRoot && this.shadowRoot.appendChild(style)

      queen.add(root.id, {
        id: root.id,
        className: root.className,
        elem: this
        // data: root
      })
    }
    adoptedCallback () {
      console.log('adoptedCallback')
    }
    disconnectedCallback () {
      console.log('disconnectedCallback')
    }
    attributeChangedCallback (name: string, oldValue: string, newValue: string) {
      console.log(name, oldValue, newValue)
    }
  })
}
