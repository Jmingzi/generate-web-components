import { toCamel, toLowerLine } from './util'
import { ComponentStyle } from '../item'

// substr start for service
function isNumber (num: string) {
  return num && /^[-\d]*[\d]$/.test(num)
}

function addUnit (val: any, unit?: 'px' | 'vw') {
  if (typeof val === 'string') {
    val = val.trim()
  }
  const isVw = unit === 'vw'
  return unit && isNumber(val) && +val !== 0
    ? `${isVw ? `${(val / 3.75).toFixed(2)}vw` : `${val}${unit}`}`
    : val
}

function objAddUnit (obj: any, unit?: 'px' | 'vw') {
  let newOj: any = {}
  Object.keys(obj).forEach(key => {
    newOj[key] = addUnit(obj[key], unit)
  })
  return newOj
}

function isDef (val: any) {
  return val !== undefined && val !== null && val !== ''
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
    if (isDef(one[1].trim())) {
      result[toCamel(one[0].trim())] = addUnit(one[1], unit)
    }
  })
  return result
}

export const transferToStyleString = (
  obj: { [key: string]: string },
  unit?: 'px' | 'vw'
): string => {
  return Object.keys(obj).reduce((result, key) => {
    return isDef(obj[key]) ? (result + `${toLowerLine(key)}:${addUnit(obj[key], unit)};`) : result
  }, '')
}

export const getStyleBase = (style: any, returnObj?: boolean): any => {
  const {
    width,
    isAutoWidth,
    height,
    isAutoHeight,
    textAlign,
    customStyle,
    marginAuto,
    ellipse,
    overflow,
    layout
  } = style
  const base = {
    textAlign: textAlign
  }
  if (!isAutoWidth) {
    // @ts-ignore
    base.width = addUnit(width, 'px')
  }
  if (!isAutoHeight) {
    // @ts-ignore
    base.height = addUnit(height, 'px')
  }
  if (marginAuto) {
    // @ts-ignore
    base.margin = '0 auto'
  }
  if (ellipse) {
    Object.assign(base, {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    })
  } else if (overflow) {
    // @ts-ignore
    base.overflow = overflow
  }
  if (layout) {
    Object.assign(base, transferToStyleObject(layout))
  }
  if (returnObj) {
    return Object.assign(base, transferToStyleObject(customStyle))
  }
  return transferToStyleString(base) + customStyle
}

function dirToString (dir: any) {
  return Object.keys(dir).map(x => dir[x]).join(' ')
}

function getStyleBorder (style: any) {
  const border = objAddUnit(style.borderWidth, 'px')
  const result = objAddUnit(style, 'px')
  result.borderWidth = isDef(dirToString(border).trim()) ? dirToString(border) : 0
  return transferToStyleString(result)
}

function getStyleShadow (style: any) {
  const obj = objAddUnit(style, 'px')
  const res = {
    boxShadow: `${obj.hShadow} ${obj.vShadow} ${obj.blur} ${obj.spread} ${obj.color}`,
    '-ms-box-shadow': `${obj.hShadow} ${obj.vShadow} ${obj.blur} ${obj.spread} ${obj.color}`,
    '-moz-box-shadow': `${obj.hShadow} ${obj.vShadow} ${obj.blur} ${obj.spread} ${obj.color}`,
    '-webkit-box-shadow': `${obj.hShadow} ${obj.vShadow} ${obj.blur} ${obj.spread} ${obj.color}`,
    '-o-box-shadow': `${obj.hShadow} ${obj.vShadow} ${obj.blur} ${obj.spread} ${obj.color}`
  }
  return obj.blur ? transferToStyleString(res) : ''
}

function getStyleBackground (style: any) {
  let background = `${style.backgroundColor}`
  if (style.backgroundImage) {
    background += ` url(${style.backgroundImage}) ${style.backgroundPosition} / ${style.backgroundSize} ${style.backgroundRepeat}`
  }
  return background ? transferToStyleString({ background }) : ''
}

// function getStyleFont (style: any) {
//   const result = objAddUnit(style, 'px')
//   // result.fontSize = result.isInherit ? 'inherit' : result.fontSize
//   // delete result.isInherit
//   return transferToStyleString(result)
// }

function getStylePosition (style: any) {
  const result = objAddUnit(style, 'px')
  const isStatic = result.position === 'static'
  if (result.hCenter && result.vCenter) {
    result.left = '50%'
    result.top = '50%'
    result.bottom = ''
    result.right = ''
    result.transform = `translate(-50%, -50%)`
    result['-ms-transform'] = `translate(-50%, -50%)`
    result['-moz-transform'] = `translate(-50%, -50%)`
    result['-webkit-transform'] = `translate(-50%, -50%)`
    result['-o-transform'] = `translate(-50%, -50%)`
  } else if (result.hCenter) {
    result.left = '50%'
    result.right = ''
    result.transform = `translateX(-50%)`
    result['-ms-transform'] = `translateX(-50%)`
    result['-moz-transform'] = `translateX(-50%)`
    result['-webkit-transform'] = `translateX(-50%)`
    result['-o-transform'] = `translateX(-50%)`
  } else if (result.vCenter) {
    result.top = '50%'
    result.bottom = ''
    result.transform = `translateY(-50%)`
    result['-ms-transform'] = `translateY(-50%)`
    result['-moz-transform'] = `translateY(-50%)`
    result['-webkit-transform'] = `translateY(-50%)`
    result['-o-transform'] = `translateY(-50%)`
  }
  delete result.hCenter
  delete result.vCenter
  return isStatic ? '' : transferToStyleString(result)
}

export function getStyle (style: ComponentStyle, isString?: boolean, className?: string) {
  let result = isString ? `\ndiv${className ? `.${className}` : ''} {\n` : {}
  Object.keys(style).forEach(key => {
    switch (key) {
      case 'base':
        result += getStyleBase(style[key])
        break
      case 'margin':
      case 'padding':
      case 'font':
        result += transferToStyleString(style[key], 'px')
        break
      case 'border':
        result += getStyleBorder(style[key])
        break
      case 'boxShadow':
        result += getStyleShadow(style[key])
        break
      case 'background':
        result += getStyleBackground(style[key])
        break
      case 'position':
        result += getStylePosition(style[key])
        break
    }
  })
  return result + `\n}`
}
// substr end for service
