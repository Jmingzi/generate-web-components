import { toCamel, toLowerLine } from './util'
import { ComponentStyle } from '../item'

// substr start for service
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

export const transferToStyleObject = (
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

export const transferToStyleString = (
  obj: { [key: string]: string },
  unit?: 'px' | 'vw'
): string => {
  return Object.keys(obj).reduce((result, key) => result + `${toLowerLine(key)}:${addUnit(obj[key], unit)};`, '')
}

export const getStyleBase = (style: any, returnObj?: boolean): any => {
  const {
    width,
    isAutoWidth,
    height,
    isAutoHeight,
    textAlign,
    customStyle
  } = style
  const base = {
    width: isAutoWidth ? 'auto' : addUnit(width, 'px'),
    height: isAutoHeight ? 'auto' : addUnit(height, 'px'),
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
  const border = objAddUnit(style.borderWidth, 'px')
  const result = objAddUnit(style, 'px')
  result.borderWidth = dirToString(border)
  return isString ? transferToStyleString(result) : result
}

function getStyleShadow (style: any, isString?: boolean) {
  const obj = objAddUnit(style, 'px')
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
  const result = objAddUnit(style, 'px')
  result.fontSize = result.isInherit ? 'inherit' : result.fontSize
  delete result.isInherit
  return transferToStyleString(result)
}

export function getStyle (style: ComponentStyle, isString?: boolean, className?: string) {
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
          ? result += transferToStyleString(style[key], 'px')
          : Object.assign(result, objAddUnit(style[key], 'px'))
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
// substr end for service
