import { getStyle } from './style'
import { Component } from '../item'
import { query } from './dom'

// substr start for service
type StackItem = {
  id: number
  className: string
  elem: Element
  // data: Component
  // number: number,
}
type UpdateQueen = {
  stack: {
    [id: number]: StackItem
  }
  add (id: number, obj: StackItem): void
  update (obj: Component): void
  getEl (obj: any): Element
}

export const queen: UpdateQueen = {
  stack: {},

  add (id, obj) {
    this.stack[id] = obj
  },

  update (obj) {
    if (this.stack[obj.number]) {
      query(
        obj.className,
        this.getEl(obj.number).shadowRoot,
        'style'
      ).textContent = <string>getStyle(obj.style, true, obj.className)
    }
  },

  getEl (obj) {
    const number = typeof obj === 'object' ? obj.number : obj
    return this.stack[number].elem
  }
}
// substr end for service
