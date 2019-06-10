var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function addUnit(val, unit) {
    if (typeof val === 'string') {
        val = val.trim();
    }
    return unit && /^\d+$/.test(val) ? "" + val + unit : val;
}
function objAddUnit(obj, unit) {
    var newOj = {};
    Object.keys(obj).forEach(function (key) {
        newOj[key] = addUnit(obj[key], unit);
    });
    return newOj;
}
var transferToStyleObject = function (str, unit) {
    if (!str) {
        return {};
    }
    var result = {};
    str.split(';').filter(Boolean).forEach(function (item) {
        var one = item.split(':');
        result[toCamel(one[0].trim())] = addUnit(one[1], unit);
    });
    return result;
};
var transferToStyleString = function (obj, unit) {
    return Object.keys(obj).reduce(function (result, key) { return result + (toLowerLine(key) + ":" + addUnit(obj[key], unit) + ";"); }, '');
};
var getStyleBase = function (style, returnObj) {
    var width = style.width, isAutoWidth = style.isAutoWidth, height = style.height, isAutoHeight = style.isAutoHeight, textAlign = style.textAlign, customStyle = style.customStyle;
    var base = {
        width: isAutoWidth ? 'auto' : width + "px",
        height: isAutoHeight ? 'auto' : height + "px",
        textAlign: textAlign
    };
    if (returnObj) {
        return Object.assign(base, transferToStyleObject(customStyle));
    }
    return transferToStyleString(base) + customStyle;
};
function dirToString(dir) {
    return Object.keys(dir).map(function (x) { return dir[x]; }).join(' ');
}
function getStyleBorder(style, isString) {
    var border = objAddUnit(style.borderWidth, 'px');
    var result = objAddUnit(style, 'px');
    result.borderWidth = dirToString(border);
    return isString ? transferToStyleString(result) : result;
}
function getStyleShadow(style, isString) {
    var obj = objAddUnit(style, 'px');
    var res = {
        boxShadow: obj.hShadow + " " + obj.vShadow + " " + obj.blur + " " + obj.spread + " " + obj.color
    };
    return isString ? transferToStyleString(res) : res;
}
function getStyleBackground(style) {
    var background = "" + style.backgroundColor;
    if (style.backgroundImage) {
        background += " url(" + style.backgroundImage + ") " + style.backgroundPosition + " / " + style.backgroundSize + " " + style.backgroundRepeat;
    }
    return background ? transferToStyleString({ background: background }) : '';
}
function getStyleFont(style) {
    var result = objAddUnit(style, 'px');
    result.fontSize = result.isInherit ? 'inherit' : result.fontSize;
    delete result.isInherit;
    return transferToStyleString(result);
}
function getStyle(style, isString, className) {
    var result = isString ? "\ndiv" + (className ? "." + className : '') + " {\n" : {};
    Object.keys(style).forEach(function (key) {
        switch (key) {
            case 'base':
                isString
                    ? result += getStyleBase(style[key])
                    : Object.assign(result, getStyleBase(style[key], true));
                break;
            case 'margin':
            case 'padding':
                isString
                    ? result += transferToStyleString(style[key], 'px')
                    : Object.assign(result, objAddUnit(style[key], 'px'));
                break;
            case 'font':
                result += getStyleFont(style[key]);
                break;
            case 'border':
                isString
                    ? result += getStyleBorder(style[key], isString)
                    : Object.assign(result, getStyleBorder(style[key], isString));
                break;
            case 'boxShadow':
                isString
                    ? result += getStyleShadow(style[key], true)
                    : Object.assign(result, getStyleShadow(style[key]));
                break;
            case 'background':
                result += getStyleBackground(style[key]);
                break;
        }
    });
    return isString ? result + "\n}" : result;
}
var toCamel = function (str) { return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) { return $1 + $2.toUpperCase(); }); };
var upCamel = function (str) {
    var camel = toCamel(str);
    return "" + camel[0].toUpperCase() + camel.substring(1);
};
function toLowerLine(str) {
    var temp = str.replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
    });
    if (temp.slice(0, 1) === '_') {
        // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
        temp = temp.slice(1);
    }
    return temp;
}
var cacheElem = {};
function query(className, parent, tag, force) {
    var selector = (tag || '') + "." + className;
    if (!cacheElem[selector] || force) {
        var el = (parent || document.body).querySelector(selector);
        if (el) {
            cacheElem[selector] = el;
        }
        else {
            // throw `${selector} 未找到.`
            return null;
        }
    }
    return cacheElem[selector];
}
var queen = {
    stack: {},
    add: function (id, obj) {
        this.stack[id] = obj;
    },
    update: function (obj) {
        if (this.stack[obj.id]) {
            // const item = this.stack[obj.id]
            // updateStyle(item.elem, obj.style, obj.className)
            query(obj.className, this.getEl(obj).shadowRoot, 'style').textContent = getStyle(obj.style, true, obj.className);
            // const style = shadow && shadow.querySelector('style')
            // style && (style.textContent = getStyleStr(obj.style))
        }
    },
    getEl: function (obj) {
        return this.stack[obj.id].elem;
    }
};
function addSpecial(component, div) {
    // 文本
    if (component.type === 2) {
        div.innerText = component.text;
    }
    // 事件句柄，便于 remove
    component.eventCallbackHandler = function (e) {
        e.stopPropagation();
        new Function('e', component.event.onClick)(e);
    };
    div.addEventListener('click', component.eventCallbackHandler);
}
var BuiltInHTMLElement = HTMLElement;
// @ts-ignore
window.HTMLElement = function HTMLElement() {
    return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
};
HTMLElement.prototype = BuiltInHTMLElement.prototype;
HTMLElement.prototype.constructor = HTMLElement;
Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
function defineElem(components, relationShip) {
    var root = components.find(function (x) { return x.root; }) || components[0];
    customElements.define(root.name, /** @class */ (function (_super) {
        __extends(Custom, _super);
        function Custom() {
            var _this = _super.call(this) || this;
            var shadow = _this.attachShadow({ mode: 'open' });
            var rootDiv = document.createElement('div');
            if (relationShip) {
                var parent_1 = rootDiv;
                var oldParent_1;
                var _createChild_1 = function (relation) {
                    (relation || []).forEach(function (item) {
                        var component = components.find(function (x) { return x.id === item.id; }) || components[0];
                        var div = document.createElement('div');
                        var style = document.createElement('style');
                        div.className = component.className;
                        // if (component.type === 2) {
                        //   div.innerText = component.text
                        // }
                        addSpecial(component, div);
                        style.className = component.className;
                        style.textContent = getStyle(component.style, true, component.className);
                        parent_1.appendChild(div);
                        shadow.appendChild(style);
                        oldParent_1 = parent_1;
                        parent_1 = div;
                        _createChild_1(item.children);
                        // 回退
                        parent_1 = oldParent_1;
                    });
                };
                _createChild_1(relationShip);
                shadow.appendChild(rootDiv.childNodes[0]);
            }
            else {
                rootDiv.className = root.className;
                // if (root.type === 2) {
                //   rootDiv.innerText = root.text
                // }
                addSpecial(root, rootDiv);
                var style = document.createElement('style');
                style.className = root.className;
                // updateStyle(this, root.style, root.className)
                style.textContent = getStyle(root.style, true, root.className);
                shadow.appendChild(style);
                shadow.appendChild(rootDiv);
            }
            return _this;
        }
        Custom.prototype.connectedCallback = function () {
            // add active style
            var style = document.createElement('style');
            style.className = 'active';
            style.textContent = ".active {\n border: 1px blue dashed;overflow:hidden; \n}";
            this.shadowRoot && this.shadowRoot.appendChild(style);
            queen.add(root.id, {
                id: root.id,
                className: root.className,
                elem: this
                // data: root
            });
        };
        Custom.prototype.adoptedCallback = function () {
            console.log('adoptedCallback');
        };
        Custom.prototype.disconnectedCallback = function () {
            console.log('disconnectedCallback');
        };
        Custom.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
            console.log(name, oldValue, newValue);
        };
        return Custom;
    }(HTMLElement)));
}
