(function(e){function t(t){for(var o,i,c=t[0],s=t[1],l=t[2],p=0,d=[];p<c.length;p++)i=c[p],r[i]&&d.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"50df":function(e,t,n){},"531e":function(e,t,n){"use strict";var o=n("5a33"),r=n.n(o);r.a},"5a33":function(e,t,n){},"75a4":function(e,t,n){},"7faf":function(e,t,n){"use strict";var o=n("8fba"),r=n.n(o);r.a},"8d07":function(e,t,n){},"8fba":function(e,t,n){},c219:function(e,t,n){"use strict";var o=n("e9bb"),r=n.n(o);r.a},cd49:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o,r,a,i,c=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},l=[],u={name:"app",components:{}},p=u,d=(n("7faf"),n("2877")),m=Object(d["a"])(p,s,l,!1,null,null,null),f=m.exports,h=n("8c4f"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",{staticClass:"bg-blue c-f flex-center-align"},[n("h1",[e._v("Web Component 组件生成器")])]),n("el-main",{staticClass:"main"},[n("el-row",{staticClass:"height-100"},[n("el-col",{staticClass:"p10 height-100",attrs:{span:8}},[n("list",{staticClass:"height-100"})],1),n("el-col",{staticClass:"height-100",attrs:{span:8}},[n("mobile",{staticClass:"bg-f2 height-100"})],1),n("el-col",{staticClass:"height-100",attrs:{span:8}},[e.currentComponent?n("config",{staticClass:"height-100",attrs:{"component-data":e.currentComponent},on:{change:e.updateComponent,updateNodeText:e.updateNodeText,updateNodeEvent:e.updateNodeEvent,updateNodeImgSrc:e.updateNodeImgSrc,setProps:e.setRootProps}}):e._e()],1)],1)],1),n("el-footer",[n("div",{staticClass:"tc c-999 pt10"},[e._v("\n      @jmingzi\n      "),n("p",[e._v("全局文件："),n("a",{attrs:{href:"https://iming.work/demo/generate-web-components/service/public/define.js",target:"_blank"}},[e._v("https://iming.work/demo/generate-web-components/service/public/define.js")])])])])],1)},b=[],g=(n("c5f6"),n("20d6"),n("28a5"),n("cebc")),y=n("2f62"),C=(n("7f7f"),c["default"].extend({name:"Mobile",props:{},computed:Object(g["a"])({},Object(y["b"])(["root"])),created:function(){},methods:{renderComponent:function(e){return this.$createElement(e.name)}},render:function(){var e=arguments[0];return e("div",{class:"preview"},[e("div",{class:"preview__mobile"},[this.root&&this.renderComponent(this.root)])])}})),x=C,k=(n("cea4"),Object(d["a"])(x,o,r,!1,null,null,null)),w=k.exports,_=(n("ac6a"),n("456d"),{base:{name:"基础",type:"group",children:{width:{name:"宽度",type:"number",min:0,max:1e3},isAutoWidth:{name:"宽度auto",type:"checkbox"},height:{name:"高度",type:"number",min:0,max:1e4},isAutoHeight:{name:"高度auto",type:"checkbox"},textAlign:{name:"文本对齐",type:"select",options:[{label:"左",value:"left"},{label:"中",value:"center"},{label:"右",value:"right"}]},marginAuto:{name:"margin居中",type:"checkbox"},ellipse:{name:"文本溢出",type:"checkbox"},overflow:{name:"overflow",type:"select",options:[{label:"hidden",value:"hidden"},{label:"auto",value:"auto"}]},layout:{name:"常用布局",type:"select",options:[{label:"无",value:""},{label:"flex-between",value:"display:flex;justify-content:space-between;"},{label:"flex-center",value:"display:flex;justify-content:center;align-items:center;"},{label:"flex-between-center",value:"display:flex;justify-content:space-between;align-items:center;"}]},customStyle:{name:"自定义样式",type:"textarea"}}},margin:{name:"外边距",type:"group",children:{marginTop:{name:"上",type:"number",min:-1e3,max:1e3},marginRight:{name:"右",type:"number",min:-1e3,max:1e3},marginBottom:{name:"下",type:"number",min:-1e3,max:1e3},marginLeft:{name:"左",type:"number",min:-1e3,max:1e3}}},padding:{name:"内边距",type:"group",children:{paddingTop:{name:"上",type:"number",min:-1e3,max:1e3},paddingRight:{name:"右",type:"number",min:-1e3,max:1e3},paddingBottom:{name:"下",type:"number",min:-1e3,max:1e3},paddingLeft:{name:"左",type:"number",min:-1e3,max:1e3}}},font:{name:"字体",type:"group",children:{color:{name:"颜色",type:"color"},fontSize:{name:"大小",type:"number",min:0,max:1e3}}},position:{name:"定位位置",type:"group",children:{position:{name:"方式",type:"select",options:[{label:"静态",value:"static"},{label:"相对",value:"relative"},{label:"绝对",value:"absolute"},{label:"固定",value:"fixed"}]},hCenter:{name:"水平居中",type:"checkbox"},vCenter:{name:"垂直居中",type:"checkbox"},top:{name:"上距离",type:"number"},right:{name:"右距离",type:"number"},bottom:{name:"下距离",type:"number"},left:{name:"左距离",type:"number"}}},background:{name:"背景",type:"group",children:{backgroundColor:{name:"颜色",type:"color"},backgroundImage:{name:"图片",type:"upload"},backgroundPosition:{name:"位置",type:"select",options:[{label:"左中",value:"left center"},{label:"居中",value:"center"},{label:"右中",value:"right center"},{label:"左上",value:"left top"},{label:"左下",value:"left bottom"},{label:"右上",value:"right top"},{label:"右下",value:"right bottom"}]},backgroundSize:{name:"尺寸",type:"select",options:[{label:"cover",value:"cover"},{label:"contain",value:"contain"},{label:"100%",value:"100% 100%"}]},backgroundRepeat:{name:"重复",type:"select",options:[{label:"不重复",value:"no-repeat"},{label:"x重复",value:"repeat-x"},{label:"y重复",value:"repeat-y"}]}}},border:{name:"边框",type:"group",children:{borderWidth:{name:"宽度",type:"group",children:{borderTopWidth:{name:"上",type:"number",min:0,max:100},borderRightWidth:{name:"右",type:"number",min:0,max:100},borderBottomWidth:{name:"下",type:"number",min:0,max:100},borderLeftWidth:{name:"左",type:"number",min:0,max:100}}},borderColor:{name:"颜色",type:"color"},borderStyle:{name:"样式",type:"select",options:[{label:"实线",value:"solid"},{label:"虚线",value:"dashed"},{label:"点",value:"dotted"}]},borderRadius:{name:"圆角",type:"number",min:0,max:1e3}}},boxShadow:{name:"阴影",type:"group",children:{hShadow:{name:"水平",type:"number",min:0,max:100},vShadow:{name:"垂直",type:"number",min:0,max:100},blur:{name:"模糊",type:"number",min:0,max:100},spread:{name:"扩散",type:"number",min:0,max:100},color:{name:"颜色",type:"color"}}},event:{type:"group",name:"事件",children:{onClick:{name:"点击事件的函数体",type:"script"}}}}),j={base:{width:void 0,height:void 0,isAutoWidth:!0,isAutoHeight:!0,marginAuto:!1,textAlign:void 0,ellipse:!1,overflow:void 0,layout:void 0,customStyle:"box-sizing:border-box;"},margin:{marginTop:void 0,marginRight:void 0,marginBottom:void 0,marginLeft:void 0},padding:{paddingTop:void 0,paddingRight:void 0,paddingBottom:void 0,paddingLeft:void 0},font:{color:void 0,fontSize:void 0},position:{position:"static",top:void 0,right:void 0,bottom:void 0,left:void 0,hCenter:!1,vCenter:!1},background:{backgroundColor:"",backgroundImage:"",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"},border:{borderWidth:{borderTopWidth:void 0,borderRightWidth:void 0,borderBottomWidth:void 0,borderLeftWidth:void 0},borderColor:void 0,borderStyle:void 0,borderRadius:void 0},boxShadow:{hShadow:void 0,vShadow:void 0,blur:void 0,spread:void 0,color:void 0}},N={id:0,name:"demo-tag",root:!0,type:1,className:"",tagName:"div",style:Object(g["a"])({},j),activeStyle:null,event:{onClick:""},eventCallbackHandler:function(){},number:0,text:"",imgSrc:"",props:"",propsRelation:void 0},S=n("7618"),O=n("a304"),$=n.n(O),E=function(e){return $()(e)},R=function e(t,n){Object.keys(n).forEach(function(o){n[o]&&"object"===Object(S["a"])(n[o])?e(t[o],n[o]):t.hasOwnProperty(o)||(t[o]=void 0)})},P=c["default"].extend({name:"Config",data:function(){return{collapse:{},details:null}},model:{prop:"componentData",event:"change"},props:{componentData:{type:Object,required:!0}},watch:{componentData:{deep:!0,handler:function(e,t){t&&t.id===e.id||(this.details=E(e))},immediate:!0},details:{deep:!0,handler:function(e,t){null!==t&&this.$emit("change",e)}}},created:function(){},methods:{renderConfig:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=this.getData(n);return Object.keys(o).map(function(o){var r=e[o];switch(e[o].type){case"group":return t.renderGroup(r,o,n);case"number":return t.renderNumber(r,o,n);case"color":return t.renderColor(r,o,n);case"select":return t.renderSelect(r,o,n);case"checkbox":return t.renderCheckbox(r,o,n);case"textarea":return t.renderInput(r,o,n,"textarea");case"upload":return t.renderUpload(r,o,n);case"script":return t.renderEventScript(r,o,n);default:return t.renderUnknow(r,o,n)}})},renderGroup:function(e,t,n){var o=this,r=this.$createElement;return r("div",{class:"config__group"},[r("p",{class:"config__group--title",on:{click:function(){o.$set(o.collapse,t,!o.collapse[t])}}},[r("span",[e.name]),r("i",{class:this.collapse[t]?"el-icon-caret-bottom":"el-icon-caret-right"})]),r("el-collapse-transition",[r("div",{directives:[{name:"show",value:this.collapse[t]}],class:"config__group--item"},[this.renderConfig(e.children,"".concat(n,".").concat(t))])])])},renderNumber:function(e,t,n){var o=this,r=this.$createElement,a=this.getData(n);return r("div",{class:"config__item"},[r("p",[e.name]),r("el-input-number",{attrs:{min:e.min,max:e.max},model:{value:a[t],callback:function(e){o.$set(a,t,e)}}})])},renderColor:function(e,t,n){var o=this,r=this.$createElement,a=this.getData(n);return r("div",{class:"config__item"},[r("p",[e.name]),r("el-color-picker",{attrs:{"show-alpha":!0},model:{value:a[t],callback:function(e){o.$set(a,t,e)}}})])},renderSelect:function(e,t,n){var o=this,r=this.$createElement,a=this.getData(n);return r("div",{class:"config__item ".concat(t)},[r("p",[e.name]),r("el-select",{model:{value:a[t],callback:function(e){o.$set(a,t,e)}}},[e.options.map(function(e){return r("el-option",{attrs:{label:e.label,value:e.value}})})])])},renderCheckbox:function(e,t,n){var o=this,r=this.$createElement,a=this.getData(n);return r("div",{class:"config__item"},[r("p",[e.name]),r("el-checkbox",{model:{value:a[t],callback:function(e){o.$set(a,t,e)}}})])},renderInput:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"input",r=arguments.length>4?arguments[4]:void 0,a=this.$createElement,i=this.getData(n);return a("div",{class:"config__item "+("textarea"===o?"config__item--textarea":"")},[a("p",[e.name]),a("el-input",{attrs:{autosize:{minRows:2,maxRows:10},type:o,value:i[t]},on:{input:function(e){i[t]=e,r&&r(e)}}})])},renderUpload:function(e,t,n,o){var r=this.$createElement,a=this.getData(n);return r("div",{class:"config__item ".concat(t)},[r("p",[e.name]),r("el-input",{attrs:{type:"text",value:a[t],placeholder:"链接地址"},on:{input:function(e){a[t]=e,o(e)}}})])},renderUnknow:function(e,t,n){},renderEventScript:function(e,t,n){var o=this,r=this.$createElement,a=this.getData(n);return r("div",{class:"config__item script"},[r("p",[e.name]),r("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:10},value:a[t],placeholder:"params e: Event;\nexpression 1; \nexpression 2;"},on:{input:function(e){a[t]=e,o.$emit("updateNodeEvent",e)}}})])},renderImgSrc:function(){var e=this;return this.renderGroupContainer("图片项","imgSrc",function(){return e.renderUpload({name:"图片链接"},"imgSrc","details",function(t){e.$emit("updateNodeImgSrc",t)})})},renderInnerText:function(){var e=this;return this.renderGroupContainer("文本项","text",function(){return e.renderInput({name:"文本内容"},"text","details","textarea",function(t){e.$emit("updateNodeText",t)})})},renderGroupContainer:function(e,t,n){var o=this,r=this.$createElement;return r("div",{class:"config__group"},[r("p",{class:"config__group--title flex-center-between",on:{click:function(){o.$set(o.collapse,t,!o.collapse[t])}}},[r("span",[e," ",r("i",{class:this.collapse[t]?"el-icon-caret-bottom":"el-icon-caret-right"})]),r("el-button",{attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),o.$emit("setProps",t)}}},["设置组件props"])]),r("el-collapse-transition",[r("div",{directives:[{name:"show",value:this.collapse[t]}],class:"config__group--item"},[n()])])])},getData:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.split(".");return t&&n.pop(),n.reduce(function(e,t){return e[t]},this)}},render:function(){var e=arguments[0],t=this.details.type;return e("div",{class:"config"},[e("p",["组件配置"]),this.renderConfig(_,"details.style"),2===t&&this.renderInnerText(),3===t&&this.renderImgSrc(),this.renderGroup(_.event,"event","details")])}}),T=P,A=(n("f034"),Object(d["a"])(T,a,i,!1,null,null,null)),I=A.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list"},[0===e.components.length?[n("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.replaceState()}}},[e._v("\n      从本地导入\n    ")]),e._e(),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.replaceFile()}}},[e._v("\n      从文件导入\n    ")]),n("div",{staticClass:"mt10"},[n("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.download()}}},[e._v("\n        下载js文件\n      ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showCdnModal=!0}}},[e._v("\n        同步文件到cdn\n      ")]),n("el-button",{attrs:{type:"primary"},on:{click:e.create}},[e._v("\n        新建组件\n      ")])],1)]:[n("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.addAttr()}}},[e._v("\n      添加自定义属性\n    ")]),n("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.delAttr()}}},[e._v("\n      删除属性\n    ")]),n("div",{staticClass:"mt10"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showCdnModal=!0}}},[e._v("\n        同步文件到cdn\n      ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveLocal()}}},[e._v("\n        保存到本地\n      ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onlySave()}}},[e._v("\n        保存到远端\n      ")])],1)],n("p",{staticClass:"mt10 list__title"},[e._v("组件节点树 "+e._s(e.root?"<"+e.root.name+" />":""))]),n("div",{staticClass:"tree__wrap"},[n("tree",{ref:"tree",staticClass:"mt10",attrs:{list:e.nodeTree},on:{append:e.appendNode,remove:e.removeNode,copy:e.copy}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.demoCode,expression:"demoCode"}],staticClass:"code"},[n("p",{staticClass:"mb10 list__title"},[e._v("代码演示")]),n("el-alert",{attrs:{title:"使用组件时，不要忘了拷贝 props-relation 属性",type:"warning"}}),n("pre",{domProps:{textContent:e._s(e.demoCode)}})],1),n("cdn-modal",{attrs:{show:e.showCdnModal},on:{"update:show":function(t){e.showCdnModal=t},confirm:e.cdn}})],2)},M=[],H=(n("96cf"),n("3b8d")),z=(n("7514"),n("2427")),W=n.n(z),D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tree-group"},e._l(e.list,function(t){return n("div",{key:t.id,staticClass:"tree"},[n("div",{staticClass:"tree__item flex-between",class:{"bg-f2":e.isCurr(t)},on:{click:function(n){return e.setCurr(t)}}},[n("div",{on:{click:function(n){return e.$set(e.collapse,t.id,!e.collapse[t.id])}}},[n("i",{staticClass:"c-999 mr5",class:{"c-fff":1!==t.type,"el-icon-caret-right":e.collapse[t.id],"el-icon-caret-bottom":!e.collapse[t.id]}}),n("span",[e._v(e._s(e.getName(t)))])]),e.isCurr(t)?n("div",{staticClass:"pr10"},[1===t.type?[n("el-button",{attrs:{type:"text"},on:{click:function(n){return n.stopPropagation(),e.$emit("append",t,1)}}},[e._v("添加块")]),n("el-button",{attrs:{type:"text"},on:{click:function(n){return n.stopPropagation(),e.$emit("append",t,2)}}},[e._v("添加文本")]),n("el-button",{attrs:{type:"text"},on:{click:function(n){return n.stopPropagation(),e.$emit("append",t,3)}}},[e._v("添加图片")])]:e._e(),t.root?e._e():[n("el-button",{attrs:{type:"text"},on:{click:function(n){return n.stopPropagation(),e.$emit("copy",t,e.parent)}}},[e._v("\n            复制粘贴\n          ")]),n("el-button",{attrs:{type:"text"},on:{click:function(n){return n.stopPropagation(),e.$emit("remove",t,e.parent)}}},[e._v("\n            删除\n          ")])]],2):e._e()]),n("tree",{directives:[{name:"show",rawName:"v-show",value:!0!==e.collapse[t.id],expression:"collapse[item.id] !== true"}],attrs:{list:t.children,parent:t,level:e.level+1},on:{append:function(t,n){return e.$emit("append",t,n)},remove:function(t,n){return e.$emit("remove",t,n)},copy:function(t,n){return e.$emit("copy",t,n)}}})],1)}),0)},B=[],G={};function U(e,t,n,o){var r="".concat(n||"",".").concat(e);if(!G[r]||o){var a=(t||document.body).querySelector(r);if(!a)return null;G[r]=a}return G[r]}n("a481");var V=function(e){return e.replace(/([^-])(?:-+([^-]))/g,function(e,t,n){return t+n.toUpperCase()})};function F(e){var t=e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()});return"_"===t.slice(0,1)&&(t=t.slice(1)),t}function J(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.map(function(e){var n=t.find(function(t){return Number(t.id)===Number(e.id)});return Object.assign({},n,{children:e.children.length?J(e.children,t):[]})})}function q(e,t){var n=null,o=function e(o){for(var r=0;r<o.length;r++){if(o[r].id===t){n=o[r];break}e(o[r].children)}};return o(e),n}function Z(e,t){var n=[],o=function e(o){for(var r=0;r<o.length;r++){if(o[r].id===t)return n.push(r),!0;if(n.push(r),e(o[r].children))return!0;n.pop()}};return o(e),n}function X(e,t,n){var o=q(e,t);o.children.push(n)}function Y(e,t,n){var o=q(e,n),r=o.children.findIndex(function(e){return e.id===t}),a=o.children[r];o.children.splice(r,1);var i=[a.id],c=function e(t){t.forEach(function(t){i.push(t.id),t.children&&e(t.children)})};return c(a.children),i}function K(e){return e&&/^[-\d]*[\d]$/.test(e)}function Q(e,t){"string"===typeof e&&(e=e.trim());var n="vw"===t;return t&&K(e)&&0!==+e?"".concat(n?"".concat((e/3.75).toFixed(2),"vw"):"".concat(e).concat(t)):e}function ee(e,t){var n={};return Object.keys(e).forEach(function(o){n[o]=Q(e[o],t)}),n}function te(e){return void 0!==e&&null!==e&&""!==e}var ne=function(e,t){if(!e)return{};var n={};return e.split(";").filter(Boolean).forEach(function(e){var o=e.split(":");te(o[1].trim())&&(n[V(o[0].trim())]=Q(o[1],t))}),n},oe=function(e,t){return Object.keys(e).reduce(function(n,o){return te(e[o])?n+"".concat(F(o),":").concat(Q(e[o],t),";"):n},"")},re=function(e,t){var n=e.width,o=e.isAutoWidth,r=e.height,a=e.isAutoHeight,i=e.textAlign,c=e.customStyle,s=e.marginAuto,l=e.ellipse,u=e.overflow,p=e.layout,d={width:o?"auto":Q(n,"px"),height:a?"auto":Q(r,"px"),textAlign:i};return s&&(d.margin="0 auto"),l?Object.assign(d,{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}):u&&(d.overflow=u),p&&Object.assign(d,ne(p)),t?Object.assign(d,ne(c)):oe(d)+c};function ae(e){return Object.keys(e).map(function(t){return e[t]}).join(" ")}function ie(e){var t=ee(e.borderWidth,"px"),n=ee(e,"px");return n.borderWidth=te(ae(t).trim())?ae(t):0,oe(n)}function ce(e){var t=ee(e,"px"),n={boxShadow:"".concat(t.hShadow," ").concat(t.vShadow," ").concat(t.blur," ").concat(t.spread," ").concat(t.color)};return t.blur?oe(n):""}function se(e){var t="".concat(e.backgroundColor);return e.backgroundImage&&(t+=" url(".concat(e.backgroundImage,") ").concat(e.backgroundPosition," / ").concat(e.backgroundSize," ").concat(e.backgroundRepeat)),t?oe({background:t}):""}function le(e){var t=ee(e,"px"),n="static"===t.position;return t.hCenter&&t.vCenter?(t.left="50%",t.top="50%",t.bottom="",t.right="",t.transform="translate(-50%, -50%)"):t.hCenter?(t.left="50%",t.right="",t.transform="translateX(-50%)"):t.vCenter&&(t.top="50%",t.bottom="",t.transform="translateY(-50%)"),delete t.hCenter,delete t.vCenter,n?"":oe(t)}function ue(e,t,n){var o=t?"\ndiv".concat(n?".".concat(n):""," {\n"):{};return Object.keys(e).forEach(function(t){switch(t){case"base":o+=re(e[t]);break;case"margin":case"padding":case"font":o+=oe(e[t],"px");break;case"border":o+=ie(e[t]);break;case"boxShadow":o+=ce(e[t]);break;case"background":o+=se(e[t]);break;case"position":o+=le(e[t]);break}}),o+"\n}"}var pe={stack:{},add:function(e,t){this.stack[e]=t},update:function(e){this.stack[e.number]&&(U(e.className,this.getEl(e.number).shadowRoot,"style").textContent=ue(e.style,!0,e.className))},getEl:function(e){var t="object"===Object(S["a"])(e)?e.number:e;return this.stack[t].elem}},de={name:"Tree",data:function(){return{collapse:{}}},props:{list:{type:Array,required:!0},parent:{type:Object},level:{type:Number,default:1}},computed:Object(g["a"])({},Object(y["d"])(["currentComponent","components"]),Object(y["b"])(["root"])),created:function(){},methods:Object(g["a"])({},Object(y["c"])(["setCurrent"]),{isCurr:function(e){return this.currentComponent&&this.currentComponent.id===e.id},getName:function(e){return"".concat(this.level," - ").concat(["块","文本","图片"][e.type-1]," ")},setCurr:function(e){var t=pe.getEl(this.root).shadowRoot,n=U("active",t,"div",!0);n&&n.classList.remove("active");var o=U(e.className,t,"div");o&&o.classList.add("active"),this.setCurrent(e)}})},me=de,fe=(n("f528"),Object(d["a"])(me,D,B,!1,null,null,null)),he=fe.exports,ve=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{title:"同步文件",visible:e.dialogVisible,width:"300px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[e.root?n("el-checkbox",{model:{value:e.form.sync,callback:function(t){e.$set(e.form,"sync",t)},expression:"form.sync"}},[e._v("是否需要同步本地文件到远端")]):e._e(),n("el-input",{staticClass:"mt10",attrs:{placeholder:"输入文件名称，逗号分隔"},model:{value:e.form.filename,callback:function(t){e.$set(e.form,"filename","string"===typeof t?t.trim():t)},expression:"form.filename"}}),n("el-input",{staticClass:"mt10",attrs:{placeholder:"cdn 服务器地址"},model:{value:e.form.origin,callback:function(t){e.$set(e.form,"origin","string"===typeof t?t.trim():t)},expression:"form.origin"}}),n("el-input",{staticClass:"mt10",attrs:{placeholder:"文件分类"},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category","string"===typeof t?t.trim():t)},expression:"form.category"}}),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确 定")])],1)],1)},be=[],ge={name:"Cdn.vue",data:function(){return{dialogVisible:this.show,form:{sync:!1,filename:"",origin:"http://aikanvod.miguvideo.net",category:"migu"}}},props:{show:Boolean},computed:Object(g["a"])({},Object(y["b"])(["root"])),watch:{show:function(e){this.dialogVisible=e},dialogVisible:function(e){!1===e&&this.$emit("update:show",!1)}},methods:{confirm:function(){this.form.filename?(this.$emit("confirm",this.form),this.dialogVisible=!1):this.$message.error("请输入文件名")}}},ye=ge,Ce=Object(d["a"])(ye,ve,be,!1,null,null,null),xe=Ce.exports,ke=(n("5df3"),n("386d"),n("4917"),n("d225")),we=n("b0b4"),_e=n("308d"),je=n("6bb5"),Ne=n("013f"),Se=n("4e2b"),Oe=n("f28b"),$e=(n("fd24"),n("2397"),function(e,t,n){return"".concat(t).concat(n?"":"-child","-").concat(e)}),Ee=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;e.id=Date.now(),e.root=t,e.className=$e(e.id,e.name,e.root),e.type=n},Re=function(e,t){pe.update(Object(g["a"])({},t,{id:e.id,number:e.number}))};function Pe(e,t,n,o){if(2===e.type)t.innerHTML=e.text;else if(3===e.type&&e.imgSrc){var r=document.createElement("img");r.setAttribute("width","100%"),r.setAttribute("height","100%"),r.src=e.imgSrc,t.style.fontSize=0,t.appendChild(r)}n||(e.eventCallbackHandler=function(t){t.stopPropagation();var n=o&&o.getAttribute("onclick");n?new Function("e",n)(t):new Function("e",e.event.onClick)(t)},t.addEventListener("click",e.eventCallbackHandler))}var Te=HTMLElement;window.HTMLElement=function(){return Reflect.construct(Te,[],this.constructor)},HTMLElement.prototype=Te.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,Te);var Ae="props-relation",Ie=0;function Le(e,t){var n=e.find(function(e){return e.root})||e[0];customElements.define(n.name,function(o){function r(){var o;Object(ke["a"])(this,r),o=Object(_e["a"])(this,Object(je["a"])(r).call(this)),o.propsRelation=[],o.number=void 0;var a=o.attachShadow({mode:"open"}),i=document.createElement("div");if(t){var c=[i],s=function t(n){(n||[]).forEach(function(n){var r=e.find(function(e){return e.id===n.id})||e[0],i=document.createElement("div"),s=document.createElement("style");i.className=r.className,Pe(r,i,!1,Object(Ne["a"])(o)),s.className=r.className,s.textContent=ue(r.style,!0,r.className),c[c.length-1].appendChild(i),a.appendChild(s),c.push(i),t(n.children),c.pop()})};s(t),a.appendChild(i.childNodes[0])}else{i.className=n.className,Pe(n,i,!1,Object(Ne["a"])(o));var l=document.createElement("style");l.className=n.className,l.textContent=ue(n.style,!0,n.className),a.appendChild(l),a.appendChild(i)}return o.initNumber(),pe.add(o.number,{id:n.id,className:n.className,elem:Object(Ne["a"])(o)}),o}return Object(Se["a"])(r,o),Object(we["a"])(r,[{key:"initNumber",value:function(){void 0===this.number&&(this.number=Ie+=1,n.number=this.number)}},{key:"connectedCallback",value:function(){var e=document.createElement("style");e.className="active",e.textContent=".active {\n border: 1px blue dashed !important;overflow:hidden; \n}",this.shadowRoot&&this.shadowRoot.appendChild(e)}},{key:"adoptedCallback",value:function(){console.log("adoptedCallback")}},{key:"disconnectedCallback",value:function(){console.log("disconnectedCallback")}},{key:"attributeChangedCallback",value:function(t,n,o){if(this.initNumber(),t===Ae)this.setPropsRelation(o);else if(this.propsRelation.length){var r=this.propsRelation.find(function(e){return e.name===t});if(r){var a=e.find(function(e){return Number(e.id)===Number(r.id)});if(a){var i=2===a.type?Me:3===a.type?ze:void 0;i&&i(this.number,a,o)}}}}},{key:"setPropsRelation",value:function(e){var t=e.split(",");this.propsRelation=t.map(function(e){var t=e.split("-");return{id:t[0],name:t.slice(1).join("-")}})}}],[{key:"observedAttributes",get:function(){return n.props?n.props.split(","):[]}}]),r}(Object(Oe["a"])(HTMLElement)))}function Me(e,t,n){Pe(Object(g["a"])({},t,{text:n}),U(t.className,pe.getEl(e).shadowRoot,"div",!0),!0)}function He(e,t,n){var o=U(t.className,pe.getEl(e).shadowRoot,"div",!0);t.eventCallbackHandler&&o.removeEventListener("click",t.eventCallbackHandler),t.eventCallbackHandler=function(e){e.stopPropagation(),new Function("e",n)(e)},o.addEventListener("click",t.eventCallbackHandler)}function ze(e,t,n){var o=U(t.className,pe.getEl(e).shadowRoot,"div",!0);if(o.childNodes.length){var r=o.childNodes[0];r.src=n}else Pe(Object(g["a"])({},t,{imgSrc:n}),o,!0)}function We(e){var t=pe.getEl(e.number);t&&t.setAttribute(Ae,e.propsRelation)}function De(e,t){Le(t)}function Be(e,t){Le(e,t)}function Ge(e,t,n){var o=pe.getEl(e.number).shadowRoot,r=U(e.className,o,"div"),a=Z(n,t.id);a.shift();for(var i=r,c=0;c<a.length;c++)if(c===a.length-1){var s=document.createElement("div");s.className=t.className,Pe(t,s,!1,pe.getEl(e.number)),i.appendChild(s);var l=document.createElement("style");l.className=t.className,l.textContent=ue(t.style,!0,t.className),o.appendChild(l)}else i=i.childNodes[a[c]]}var Ue=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;switch(o){case 1:De(e,t);break;case 2:Be(t,n);break;case 3:Ge(t[0],e,n);break;default:console.log("no create way")}};function Ve(e,t){var n=pe.getEl(e.number).shadowRoot;t.reverse().forEach(function(e){U(e.className,n,"style").remove(),U(e.className,n,"div").remove()})}var Fe={name:"List",components:{Tree:he,CdnModal:xe},data:function(){return{nodeTree:[],defaultProps:{label:"className",children:"children"},demoCode:"",showCdnModal:!1}},computed:Object(g["a"])({},Object(y["d"])(["relationShip","components"]),Object(y["b"])(["root"])),watch:{relationShip:{deep:!0,handler:function(e){this.nodeTree=J(e,this.components)},immediate:!0},root:{deep:!0,handler:function(e){if(e){if(this.demoCode="<".concat(e.name," "),e.props){var t=e.props.split(",");this.demoCode+=t.length?t.slice(1).reduce(function(e,t){return e+"\n  ".concat(t,'=""')},""):"",this.demoCode+=t.length>1?'\n  props-relation="'.concat(e.propsRelation||"",'"\n'):""}this.demoCode+="/>"}},immediate:!0}},created:function(){},methods:Object(g["a"])({},Object(y["c"])(["createEmpty","createCopy","deleteComponent","addRootAttr","delRootProp"]),{create:function(){var e=this;this.$prompt("组件名称为小写短杆连接，例如 a-b","新建组件").then(function(t){/^[a-z]+(-[a-z]+)+$/.test(t.value)?e.addAttr(t.value):e.$message.error("名称不对呢")})},doCreate:function(e,t){e?this.createEmpty({type:1,name:e,props:"props-relation,onclick".concat(t?",".concat(t):"")}):t&&this.addRootAttr(t)},appendNode:function(e,t){this.createEmpty({type:t,parentId:e.id,name:e.name,tagName:3===t?"img":e.tagName})},removeNode:function(e,t){var n=this;this.$confirm("确定要删除吗").then(function(){n.deleteComponent({component:e,parent:t})})},copy:function(e,t){var n=this.components.find(function(t){return t.id===e.id});this.createCopy({component:n,parent:t})},saveLocal:function(){localStorage.local=JSON.stringify(this.$store.state),this.$message.success("保存本地成功")},download:function(){this.$prompt("请输入文件名，例如 sign-modal","下载js").then(function(e){var t=e.value,n=document.createElement("form");n.action="/generate/generate/".concat(t),n.method="GET",n.style.display="none",document.body.appendChild(n),n.submit(),n.remove()})},onlySave:function(){var e=this,t=this.$loading();W.a.post("/generate/savefile",null,{data:{state:{relationShip:this.relationShip,components:this.components}}}).then(function(n){t.close(),e.$message.success(n.data)})},replaceState:function(e){var t=this,n=e||JSON.parse(localStorage.local);n&&(n.components=n.components.map(function(e){return R(e,N),e}),Ue(null,n.components,n.relationShip,2),this.$store.replaceState(n),this.$nextTick(function(){t.$refs.tree.setCurr(n.components[0])}))},replaceFile:function(){var e=this;this.$prompt("输入你之前定义上传过的组件名称","输入组件名称").then(function(t){W.a.get("/generate/file?filename=".concat(t.value),{}).then(function(t){e.replaceState(Object(g["a"])({},t.data,{currentComponent:""}))}).catch(function(t){e.$message.error(t.response?t.response.data:t.message)})})},addAttr:function(e){var t=this,n=this.root&&this.root.props.split(",").slice(1).join(","),o=e||!n?"添加自定义属性列表，多个英文逗号分隔(可以后续添加)":"已存在属性: ".concat(n,"，会去重");this.$prompt(o,"添加属性").then(function(n){!n.value||/^[a-z][a-zA-Z,-]*[a-zA-Z]$/.test(n.value)?t.doCreate(e,n.value):t.$message.error("属性不对呢")})},sync:function(){var e=Object(H["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$loading(),e.next=3,W.a.get("/generate/sync",{timeout:12e4});case 3:t.close(),this.$message.success("同步到 /data/webapps/miguvideo.net/aikanvod.miguvideo.net/h5-generate/lib-auto-sync 成功");case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),cdn:function(){var e=Object(H["a"])(regeneratorRuntime.mark(function e(t){var n,o,r,a,i,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.filename,o=t.sync,r=t.origin,a=t.category,!o){e.next=4;break}return e.next=4,this.onlySave();case 4:return e.next=6,W.a.get("/generate/cdn?filename=".concat(n,"&category=").concat(a,"&origin=").concat(r));case 6:i=e.sent,c=i.data,this.$alert("<pre>".concat(c,"</pre>"),"文件映射关系",{dangerouslyUseHTMLString:!0});case 9:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),delAttr:function(){var e=this,t=this.$createElement,n=this.root&&this.root.props.split(",").slice(2);this.$msgbox({title:"属性列表",message:t("div",null,n.map(function(n){return t("el-tag",{class:"mr10",props:{closable:!0},on:{close:function(){e.delRootProp(n),e.$msgbox.close(),e.$message.success("删除成功")}}},n)}))})}})},Je=Fe,qe=(n("531e"),Object(d["a"])(Je,L,M,!1,null,null,null)),Ze=qe.exports,Xe=c["default"].extend({name:"home",data:function(){return{}},components:{Mobile:w,Config:I,List:Ze},computed:Object(g["a"])({},Object(y["d"])(["currentComponent"]),Object(y["b"])(["root"])),methods:Object(g["a"])({},Object(y["c"])(["updateComponent","updateNodeText","updateNodeEvent","updateNodeImgSrc","setProps"]),{setRootProps:function(){var e=this,t=this.$createElement,n=this.root.props.split(","),o=this.root.propsRelation?this.root.propsRelation.split(",").map(function(e){return e.split("-")}):[],r=o.findIndex(function(t){return Number(t[0])===e.currentComponent.id}),a=r>-1?o[r].slice(1).join("-"):"";this.$msgbox({title:"选择props",message:t("el-select",{props:{value:a},on:{change:function(t){e.setProps({name:t,id:e.currentComponent.id}),e.$msgbox.close()}}},n.slice(2).map(function(e){return t("el-option",{props:{label:e,value:e}})}))})}})}),Ye=Xe,Ke=(n("c219"),Object(d["a"])(Ye,v,b,!1,null,null,null)),Qe=Ke.exports;c["default"].use(h["a"]);var et=new h["a"]({routes:[{path:"/",name:"home",component:Qe}]}),tt=(n("4f7f"),n("75fc"));c["default"].use(y["a"]);var nt=new y["a"].Store({state:{currentComponent:void 0,relationShip:[],components:[]},getters:{root:function(e){return e.components.find(function(e){return e.root})}},mutations:{createEmpty:function(e,t){var n=E(Object(g["a"])({},N,{name:t.name||N.name,tagName:t.tagName||N.tagName,props:t.props||N.props}));Ee(n,!t.parentId,t.type),e.components.push(n),e.currentComponent||(e.currentComponent=n),t.parentId?(X(e.relationShip,t.parentId,{id:n.id,children:[]}),Ue(n,e.components,e.relationShip,3)):(e.relationShip.push({id:n.id,children:[]}),Ue(n,e.components,e.relationShip,1))},createCopy:function(e,t){var n=E(t.component);Ee(n,!1,t.component.type),e.components.push(n),X(e.relationShip,t.parent.id,{id:n.id,children:[]}),Ue(n,e.components,e.relationShip,3)},updateComponent:function(e,t){e.components.splice(e.components.findIndex(function(e){return e.id===t.id}),1,t);var n=e.components.find(function(e){return e.root});n&&Re(n,t),e.currentComponent=t},setCurrent:function(e,t){e.currentComponent=e.components.find(function(e){return Number(e.id)===Number(t.id)})},addRootAttr:function(e,t){var n=e.components.find(function(e){return e.root});if(n){var o=n.props.split(","),r=t.split(",");n.props=Object(tt["a"])(new Set(o.concat(r))).join(","),e.currentComponent&&e.currentComponent.id===n.id&&(e.currentComponent=n)}},delRootProp:function(e,t){var n=e.components.find(function(e){return e.root});if(n){var o=n.props.split(","),r=o.findIndex(function(e){return e===t});r>-1&&(o.splice(r,1),n.props=o.join(",")),e.currentComponent&&e.currentComponent.id===n.id&&(e.currentComponent=n)}},updateNodeText:function(e,t){var n=e.components.find(function(e){return e.root});Me(n,e.currentComponent,t)},updateNodeEvent:function(e,t){var n=e.components.find(function(e){return e.root});He(n,e.currentComponent,t)},updateNodeImgSrc:function(e,t){var n=e.components.find(function(e){return e.root});ze(n,e.currentComponent,t)},deleteComponent:function(e,t){var n=t.component,o=t.parent;if(e.currentComponent&&e.currentComponent.id===n.id&&(e.currentComponent=e.components[0]),o){var r=Y(e.relationShip,n.id,o.id),a=e.components.filter(function(e){return r.some(function(t){return e.id===t})});e.components=e.components.filter(function(e){return r.every(function(t){return e.id!==t})});var i=e.components.find(function(e){return e.root});Ve(i,a)}else e.components=[],e.relationShip=[]},setProps:function(e,t){var n=t.id,o=t.name,r=e.components.find(function(e){return e.root}),a=r&&r.propsRelation,i="".concat(n,"-").concat(o);if(a){var s=a.split(",").map(function(e){return e.split("-")}),l=s.some(function(e){return e[1]===o});if(l)c["default"].prototype.$message.error("该属性已被绑定，此设置无效");else{var u=s.findIndex(function(e){return Number(e[0])===n});u>-1?s.splice(u,1,[n,o]):s.push([n,o]),r.propsRelation=s.map(function(e){return e.join("-")}).join(",")}}else r.propsRelation=i;We(r)}},actions:{}}),ot=n("5c96"),rt=n.n(ot);n("0fae");c["default"].use(rt.a,{size:"mini",zIndex:3e3}),c["default"].config.productionTip=!1,new c["default"]({router:et,store:nt,render:function(e){return e(f)}}).$mount("#app")},cea4:function(e,t,n){"use strict";var o=n("8d07"),r=n.n(o);r.a},e9bb:function(e,t,n){},f034:function(e,t,n){"use strict";var o=n("75a4"),r=n.n(o);r.a},f528:function(e,t,n){"use strict";var o=n("50df"),r=n.n(o);r.a}});
//# sourceMappingURL=app.aa2d9e1c.js.map