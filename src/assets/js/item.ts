// substr start for service
// export type BindProps = {
//   bind: boolean
//   name: string
//   componentId: number
//   field: string
// }

export interface Component {
  id: number
  name?: string
  props: string,
  propsRelation?: string
  root: boolean
  className: string
  tagName: 'div'
  type: NodeType // 1 div; 2 文本
  style: any
  activeStyle?: any
  event: any
  eventCallbackHandler: (e: Event) => void
  text: string
  imgSrc: string,
  number: number
}
export type NodeType = 1 | 2 | 3
export type ComponentStyle = {
  base: any
  margin: any
  padding: any
  font: any
  background: any
  border: any
  boxShadow: any,
  position: any
}
// substr end for service

export const schema = {
  base: {
    name: '基础',
    type: 'group',
    children: {
      width: {
        name: '宽度',
        type: 'number',
        min: 0,
        max: 1000
      },
      isAutoWidth: {
        name: '宽度auto',
        type: 'checkbox'
      },
      height: {
        name: '高度',
        type: 'number',
        min: 0,
        max: 10000
      },
      isAutoHeight: {
        name: '高度auto',
        type: 'checkbox'
      },
      textAlign: {
        name: '文本对齐',
        type: 'select',
        options: [
          {
            label: '左',
            value: 'left'
          },
          {
            label: '中',
            value: 'center'
          },
          {
            label: '右',
            value: 'right'
          }
        ]
      },
      marginAuto: {
        name: 'margin居中',
        type: 'checkbox'
      },
      ellipse: {
        name: '文本溢出',
        type: 'checkbox'
      },
      overflow: {
        name: 'overflow',
        type: 'select',
        options: [
          { label: 'hidden', value: 'hidden' },
          { label: 'auto', value: 'auto' }
        ]
      },
      layout: {
        name: '常用布局',
        type: 'select',
        options: [
          { label: '无', value: '' },
          { label: 'flex-between', value: 'display:flex;justify-content:space-between;' },
          { label: 'flex-center', value: 'display:flex;justify-content:center;align-items:center;' },
          { label: 'flex-between-center', value: 'display:flex;justify-content:space-between;align-items:center;' },
        ]
      },
      customStyle: {
        name: '自定义样式',
        type: 'textarea'
      }
    }
  },
  margin: {
    name: '外边距',
    type: 'group',
    children: {
      marginTop: {
        name: '上',
        type: 'number',
        min: -1000,
        max: 1000
      },
      marginRight: {
        name: '右',
        type: 'number',
        min: -1000,
        max: 1000
      },
      marginBottom: {
        name: '下',
        type: 'number',
        min: -1000,
        max: 1000
      },
      marginLeft: {
        name: '左',
        type: 'number',
        min: -1000,
        max: 1000
      }
    }
  },
  padding: {
    name: '内边距',
    type: 'group',
    children: {
      paddingTop: {
        name: '上',
        type: 'number',
        min: -1000,
        max: 1000
      },
      paddingRight: {
        name: '右',
        type: 'number',
        min: -1000,
        max: 1000
      },
      paddingBottom: {
        name: '下',
        type: 'number',
        min: -1000,
        max: 1000
      },
      paddingLeft: {
        name: '左',
        type: 'number',
        min: -1000,
        max: 1000
      }
    }
  },
  font: {
    name: '字体',
    type: 'group',
    children: {
      color: {
        name: '颜色',
        type: 'color'
      },
      fontSize: {
        name: '大小',
        type: 'number',
        min: 0,
        max: 1000
      }
    }
  },
  position: {
    name: '定位位置',
    type: 'group',
    children: {
      position: {
        name: '方式',
        type: 'select',
        options: [
          { label: '静态', value: 'static' },
          { label: '相对', value: 'relative' },
          { label: '绝对', value: 'absolute' },
          { label: '固定', value: 'fixed' }
        ]
      },
      hCenter: {
        name: '水平居中',
        type: 'checkbox'
      },
      vCenter: {
        name: '垂直居中',
        type: 'checkbox'
      },
      top: {
        name: '上距离',
        type: 'number'
      },
      right: {
        name: '右距离',
        type: 'number'
      },
      bottom: {
        name: '下距离',
        type: 'number'
      },
      left: {
        name: '左距离',
        type: 'number'
      }
    }
  },
  background: {
    name: '背景',
    type: 'group',
    children: {
      backgroundColor: {
        name: '颜色',
        type: 'color'
      },
      backgroundImage: {
        name: '图片',
        type: 'upload'
      },
      backgroundPosition: {
        name: '位置',
        type: 'select',
        options: [
          { label: '左中', value: 'left center' },
          { label: '居中', value: 'center' },
          { label: '右中', value: 'right center' },
          { label: '左上', value: 'left top' },
          { label: '左下', value: 'left bottom' },
          { label: '右上', value: 'right top' },
          { label: '右下', value: 'right bottom' }
        ]
      },
      backgroundSize: {
        name: '尺寸',
        type: 'select',
        options: [
          { label: 'cover', value: 'cover' },
          { label: 'contain', value: 'contain' },
          { label: '100%', value: '100% 100%' }
        ]
      },
      backgroundRepeat: {
        name: '重复',
        type: 'select',
        options: [
          { label: '不重复', value: 'no-repeat' },
          { label: 'x重复', value: 'repeat-x' },
          { label: 'y重复', value: 'repeat-y' }
        ]
      }
    }
  },
  border: {
    name: '边框',
    type: 'group',
    children: {
      borderWidth: {
        name: '宽度',
        type: 'group',
        children: {
          borderTopWidth: {
            name: '上',
            type: 'number',
            min: 0,
            max: 100
          },
          borderRightWidth: {
            name: '右',
            type: 'number',
            min: 0,
            max: 100
          },
          borderBottomWidth: {
            name: '下',
            type: 'number',
            min: 0,
            max: 100
          },
          borderLeftWidth: {
            name: '左',
            type: 'number',
            min: 0,
            max: 100
          }
        }
      },
      borderColor: {
        name: '颜色',
        type: 'color'
      },
      borderStyle: {
        name: '样式',
        type: 'select',
        options: [
          { label: '实线', value: 'solid' },
          { label: '虚线', value: 'dashed' },
          { label: '点', value: 'dotted' }
        ]
      },
      borderRadius: {
        name: '圆角',
        type: 'number',
        min: 0,
        max: 1000
      }
    }
  },
  boxShadow: {
    name: '阴影',
    type: 'group',
    children: {
      hShadow: {
        name: '水平',
        type: 'number',
        min: 0,
        max: 100
      },
      vShadow: {
        name: '垂直',
        type: 'number',
        min: 0,
        max: 100
      },
      blur: {
        name: '模糊',
        type: 'number',
        min: 0,
        max: 100
      },
      spread: {
        name: '扩散',
        type: 'number',
        min: 0,
        max: 100
      },
      color: {
        name: '颜色',
        type: 'color'
      }
    }
  },
  event: {
    type: 'group',
    name: '事件',
    children: {
      onClick: {
        name: '点击事件的函数体',
        type: 'script'
      }
    }
  }
}

export const ItemStyle = {
  base: {
    width: undefined,
    height: undefined,
    isAutoWidth: true,
    isAutoHeight: true,
    marginAuto: false,
    textAlign: undefined,
    ellipse: false,
    overflow: undefined,
    layout: undefined,
    customStyle: 'box-sizing:border-box;'
  },
  margin: {
    marginTop: undefined,
    marginRight: undefined,
    marginBottom: undefined,
    marginLeft: undefined
  },
  padding: {
    paddingTop: undefined,
    paddingRight: undefined,
    paddingBottom: undefined,
    paddingLeft: undefined
  },
  font: {
    color: undefined,
    fontSize: undefined
  },
  position: {
    position: 'static',
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
    hCenter: false,
    vCenter: false
  },
  background: {
    backgroundColor: '',
    backgroundImage: '',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  border: {
    // border: 'none',
    borderWidth: {
      borderTopWidth: undefined,
      borderRightWidth: undefined,
      borderBottomWidth: undefined,
      borderLeftWidth: undefined
    },
    borderColor: undefined,
    borderStyle: undefined,
    borderRadius: undefined
  },
  boxShadow: {
    hShadow: undefined,
    vShadow: undefined,
    blur: undefined,
    spread: undefined,
    color: undefined
  }
}

export const item: Component = {
  id: 0,
  name: 'demo-tag',
  root: true,
  type: 1,
  className: '',
  tagName: 'div',
  style: {
    ...ItemStyle
  },
  // button 才有？
  activeStyle: null,
  event: {
    onClick: ''
  },
  eventCallbackHandler () {},
  number: 0,
  text: '',
  imgSrc: '',
  props: '',  // 'props-relation,你自己的定义的名称'
  propsRelation: undefined  // 'id-你自己的定义的名称'，组件与属性的关系映射
}
