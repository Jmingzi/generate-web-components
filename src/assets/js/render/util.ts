// import { deepCopy } from '../util'

// substr start for service
export const toCamel = (str: string) => str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => $1 + $2.toUpperCase())

export const upCamel = (str: string) => {
  const camel = toCamel(str)
  return `${camel[0].toUpperCase()}${camel.substring(1)}`
}

export function toLowerLine (str: string) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '_') {
    // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}
// substr end for service

export function recursionRelation (relation: any = [], components: any = []) {
  return relation.map((x: any) => {
    const component = components.find((item: any) => Number(item.id) === Number(x.id))
    return Object.assign({}, component, {
      children: x.children.length ? recursionRelation(x.children, components) : []
    })
  })
}

export function recursionFind (relation: any, pid: number) {
  let result = null
  const _find = (x: any) => {
    for (let i = 0; i < x.length; i++) {
      if (x[i].id === pid) {
        result = x[i]
        break
      } else {
        _find(x[i].children)
      }
    }
  }
  _find(relation)
  return result
}

export function recursionFindPath (relation: any, id: number) {
  const path: Array<number> = []
  let flag = false
  const _find = (x: any) => {
    for (let i = 0; i < x.length; i++) {
      if (x[i].id === id) {
        flag = true
        path.push(i)
        break
      } else {
        path.push(i)
        _find(x[i].children)
        if (!flag) {
          path.pop()
        }
      }
    }
  }
  _find(relation)
  return path
}

export function appendRelationChild (relationShip: any, pid: number, item: any) {
  const parentItem: any = recursionFind(relationShip, pid)
  parentItem.children.push(item)
}

export function removeRelation (relationShip: any, id: number, pid: number) {
  const parentItem: any = recursionFind(relationShip, pid)
  const i = parentItem.children.findIndex((x: any) => x.id === id)
  const item = parentItem.children[i]
  parentItem.children.splice(i, 1)

  // 平铺 id
  const ids: any = [item.id]
  const _get = (arr: any) => {
    arr.forEach((x: any) => {
      ids.push(x.id)
      if (x.children) {
        _get(x.children)
      }
    })
  }
  _get(item.children)
  return ids
}
