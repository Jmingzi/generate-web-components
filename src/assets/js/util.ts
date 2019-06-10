import copy from 'deep-copy'

export const deepCopy = <T>(data: T): T => copy(data)

export const completeField = (component: any, item: any) => {
  Object.keys(item).forEach(field => {
    if (item[field] && typeof item[field] === 'object') {
      completeField(component[field], item[field])
    } else if (!component.hasOwnProperty(field)) {
      component[field] = undefined
    }
  })
}
