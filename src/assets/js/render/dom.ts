// substr start for service
const cacheElem: { [id: string]: any } = {}

export function query (className: string, parent: any, tag: string, force?: boolean) {
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
// substr end for service

