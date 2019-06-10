// substr start for service
export interface Component {
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
export type NodeType = 1 | 2
export type ComponentStyle = {
  base: any
  margin: any
  padding: any
  font: any
  background: any
  border: any
  boxShadow: any
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
        name: '对齐方式',
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
      },
      isInherit: {
        name: '继承父级',
        type: 'checkbox'
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
    width: 0,
    isAutoWidth: true,
    height: 0,
    isAutoHeight: true,
    textAlign: 'left',
    customStyle: 'box-sizing:border-box;'
  },
  margin: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  },
  padding: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  font: {
    color: '#333333',
    fontSize: 14,
    isInherit: true
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
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0
    },
    borderColor: '#333333',
    borderStyle: 'solid',
    borderRadius: 0
  },
  boxShadow: {
    hShadow: 0,
    vShadow: 0,
    blur: 0,
    spread: 0,
    color: 'rgba(0, 0, 0, .2)'
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
  text: ''
}
