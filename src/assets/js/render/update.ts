import { getStyle } from './style'
import { Component } from '../item'
import { query } from './dom'

// substr start for service
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

export const queen: UpdateQueen = {
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
// substr end for service
