import{p as R}from"./index-B3G2Um8U.js";const w=T(/[\dA-Za-z]/);function T(e){return t;function t(n){return n!==null&&e.test(String.fromCharCode(n))}}function m(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const o=e.charCodeAt(n);let l="";if(o===37&&w(e.charCodeAt(n+1))&&w(e.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(l=String.fromCharCode(o));else if(o>55295&&o<57344){const a=e.charCodeAt(n+1);o<56320&&a>56319&&a<57344?(l=String.fromCharCode(o,a),i=1):l="�"}else l=String.fromCharCode(o);l&&(t.push(e.slice(r,n),encodeURIComponent(l)),r=n+i+1,l=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function $(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function F(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function U(e,t){const n=t.value?t.value+`
`:"",r=t.lang?t.lang.match(/^[^ \t]+(?=[ \t]|$)/):null,i={};r&&(i.className=["language-"+r]);let o={type:"element",tagName:"code",properties:i,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function j(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function E(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function A(e,t){const n=String(t.identifier).toUpperCase(),r=m(n.toLowerCase()),i=e.footnoteOrder.indexOf(n);let o;i===-1?(e.footnoteOrder.push(n),e.footnoteCounts[n]=1,o=e.footnoteOrder.length):(e.footnoteCounts[n]++,o=i+1);const l=e.footnoteCounts[n],a={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fn-"+r,id:e.clobberPrefix+"fnref-"+r+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(o)}]};e.patch(t,a);const s={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,s),e.applyData(t,s)}function H(e,t){const n=e.footnoteById;let r=1;for(;r in n;)r++;const i=String(r);return n[i]={type:"footnoteDefinition",identifier:i,children:[{type:"paragraph",children:t.children}],position:t.position},A(e,{type:"footnoteReference",identifier:i,position:t.position})}function z(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function q(e,t){if(e.dangerous){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}return null}function I(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return{type:"text",value:"!["+t.alt+r};const i=e.all(t),o=i[0];o&&o.type==="text"?o.value="["+o.value:i.unshift({type:"text",value:"["});const l=i[i.length-1];return l&&l.type==="text"?l.value+=r:i.push({type:"text",value:r}),i}function J(e,t){const n=e.definition(t.identifier);if(!n)return I(e,t);const r={src:m(n.url||""),alt:t.alt};n.title!==null&&n.title!==void 0&&(r.title=n.title);const i={type:"element",tagName:"img",properties:r,children:[]};return e.patch(t,i),e.applyData(t,i)}function K(e,t){const n={src:m(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function X(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Z(e,t){const n=e.definition(t.identifier);if(!n)return I(e,t);const r={href:m(n.url||"")};n.title!==null&&n.title!==void 0&&(r.title=n.title);const i={type:"element",tagName:"a",properties:r,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function V(e,t){const n={href:m(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function _(e,t,n){const r=e.all(t),i=n?G(n):B(t),o={},l=[];if(typeof t.checked=="boolean"){const c=r[0];let u;c&&c.type==="element"&&c.tagName==="p"?u=c:(u={type:"element",tagName:"p",properties:{},children:[]},r.unshift(u)),u.children.length>0&&u.children.unshift({type:"text",value:" "}),u.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let a=-1;for(;++a<r.length;){const c=r[a];(i||a!==0||c.type!=="element"||c.tagName!=="p")&&l.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!i?l.push(...c.children):l.push(c)}const s=r[r.length-1];s&&(i||s.type!=="element"||s.tagName!=="p")&&l.push({type:"text",value:`
`});const p={type:"element",tagName:"li",properties:o,children:l};return e.patch(t,p),e.applyData(t,p)}function G(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=B(n[r])}return t}function B(e){const t=e.spread;return t??e.children.length>1}function M(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const l=r[i];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)}function Q(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function W(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function Y(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const N=O("start"),x=O("end");function ee(e){return{start:N(e),end:x(e)}}function O(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};return{line:r.line||null,column:r.column||null,offset:r.offset>-1?r.offset:null}}}function te(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const l={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],l),i.push(l)}if(n.length>0){const l={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=N(t.children[1]),s=x(t.children[t.children.length-1]);a.line&&s.line&&(l.position={start:a,end:s}),i.push(l)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)}function ne(e,t,n){const r=n?n.children:void 0,o=(r?r.indexOf(t):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,a=l?l.length:t.children.length;let s=-1;const p=[];for(;++s<a;){const u=t.children[s],f={},y=l?l[s]:void 0;y&&(f.align=y);let h={type:"element",tagName:o,properties:f,children:[]};u&&(h.children=e.all(u),e.patch(u,h),h=e.applyData(t,h)),p.push(h)}const c={type:"element",tagName:"tr",properties:{},children:e.wrap(p,!0)};return e.patch(t,c),e.applyData(t,c)}function re(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function ie(e,t){const n={type:"text",value:R(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function le(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const oe={blockquote:$,break:F,code:U,delete:j,emphasis:E,footnoteReference:A,footnote:H,heading:z,html:q,imageReference:J,image:K,inlineCode:X,linkReference:Z,link:V,listItem:_,list:M,paragraph:Q,root:W,strong:Y,table:te,tableCell:re,tableRow:ne,text:ie,thematicBreak:le,toml:d,yaml:d,definition:d,footnoteDefinition:d};function d(){return null}const ae=function(e){return ce(e)};function ce(e){return pe(t);function t(n){return n&&n.type===e}}function pe(e){return t;function t(n,...r){return!!(n&&typeof n=="object"&&"type"in n&&e.call(this,n,...r))}}const ue=!0,C=!1,se="skip",fe=function(e,t,n,r){const i=ae(t),o=1;l(e,void 0,[])();function l(a,s,p){const c=a&&typeof a=="object"?a:{};if(typeof c.type=="string"){const f=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(u,"name",{value:"node ("+(a.type+(f?"<"+f+">":""))+")"})}return u;function u(){let f=[],y,h,g;if(i(a,s,p[p.length-1]||null)&&(f=he(n(a,p)),f[0]===C))return f;if(a.children&&f[0]!==se)for(h=-1+o,g=p.concat(a);h>-1&&h<a.children.length;){if(y=l(a.children[h],h,g)(),y[0]===C)return y;h=typeof y[1]=="number"?y[1]:h+o}return f}}};function he(e){return Array.isArray(e)?e:typeof e=="number"?[ue,e]:[e]}const ye=function(e,t,n,r){fe(e,t,i);function i(o,l){const a=l[l.length-1];return n(o,a?a.children.indexOf(o):null,a)}};function me(e){return!e||!e.position||!e.position.start||!e.position.start.line||!e.position.start.column||!e.position.end||!e.position.end.line||!e.position.end.column}const ge=function(e){return de(e)};function de(e){return be(t);function t(n){return n&&n.type===e}}function be(e){return t;function t(n,...r){return!!(n&&typeof n=="object"&&"type"in n&&e.call(this,n,...r))}}const Ne=!0,k=!1,xe="skip",ve=function(e,t,n,r){const i=ge(t),o=1;l(e,void 0,[])();function l(a,s,p){const c=a&&typeof a=="object"?a:{};if(typeof c.type=="string"){const f=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(u,"name",{value:"node ("+(a.type+(f?"<"+f+">":""))+")"})}return u;function u(){let f=[],y,h,g;if(i(a,s,p[p.length-1]||null)&&(f=we(n(a,p)),f[0]===k))return f;if(a.children&&f[0]!==xe)for(h=-1+o,g=p.concat(a);h>-1&&h<a.children.length;){if(y=l(a.children[h],h,g)(),y[0]===k)return y;h=typeof y[1]=="number"?y[1]:h+o}return f}}};function we(e){return Array.isArray(e)?e:typeof e=="number"?[Ne,e]:[e]}const Ce=function(e,t,n,r){ve(e,t,i);function i(o,l){const a=l[l.length-1];return n(o,a?a.children.indexOf(o):null,a)}},D={}.hasOwnProperty;function ke(e){const t=Object.create(null);if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return Ce(e,"definition",r=>{const i=P(r.identifier);i&&!D.call(t,i)&&(t[i]=r)}),n;function n(r){const i=P(r);return i&&D.call(t,i)?t[i]:null}}function P(e){return String(e||"").toUpperCase()}const b={}.hasOwnProperty;function De(e,t){const n=t||{},r=n.allowDangerousHtml||!1,i={};return l.dangerous=r,l.clobberPrefix=n.clobberPrefix===void 0||n.clobberPrefix===null?"user-content-":n.clobberPrefix,l.footnoteLabel=n.footnoteLabel||"Footnotes",l.footnoteLabelTagName=n.footnoteLabelTagName||"h2",l.footnoteLabelProperties=n.footnoteLabelProperties||{className:["sr-only"]},l.footnoteBackLabel=n.footnoteBackLabel||"Back to content",l.unknownHandler=n.unknownHandler,l.passThrough=n.passThrough,l.handlers={...oe,...n.handlers},l.definition=ke(e),l.footnoteById=i,l.footnoteOrder=[],l.footnoteCounts={},l.patch=Pe,l.applyData=Ae,l.one=a,l.all=s,l.wrap=Be,l.augment=o,ye(e,"footnoteDefinition",p=>{const c=String(p.identifier).toUpperCase();b.call(i,c)||(i[c]=p)}),l;function o(p,c){if(p&&"data"in p&&p.data){const u=p.data;u.hName&&(c.type!=="element"&&(c={type:"element",tagName:"",properties:{},children:[]}),c.tagName=u.hName),c.type==="element"&&u.hProperties&&(c.properties={...c.properties,...u.hProperties}),"children"in c&&c.children&&u.hChildren&&(c.children=u.hChildren)}if(p){const u="type"in p?p:{position:p};me(u)||(c.position={start:N(u),end:x(u)})}return c}function l(p,c,u,f){return Array.isArray(u)&&(f=u,u={}),o(p,{type:"element",tagName:c,properties:u||{},children:f||[]})}function a(p,c){return S(l,p,c)}function s(p){return v(l,p)}}function Pe(e,t){e.position&&(t.position=ee(e))}function Ae(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,o=e.data.hProperties;typeof r=="string"&&(n.type==="element"?n.tagName=r:n={type:"element",tagName:r,properties:{},children:[]}),n.type==="element"&&o&&(n.properties={...n.properties,...o}),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function S(e,t,n){const r=t&&t.type;if(!r)throw new Error("Expected node, got `"+t+"`");return b.call(e.handlers,r)?e.handlers[r](e,t,n):e.passThrough&&e.passThrough.includes(r)?"children"in t?{...t,children:v(e,t)}:t:e.unknownHandler?e.unknownHandler(e,t,n):Ie(e,t)}function v(e,t){const n=[];if("children"in t){const r=t.children;let i=-1;for(;++i<r.length;){const o=S(e,r[i],t);if(o){if(i&&r[i-1].type==="break"&&(!Array.isArray(o)&&o.type==="text"&&(o.value=o.value.replace(/^\s+/,"")),!Array.isArray(o)&&o.type==="element")){const l=o.children[0];l&&l.type==="text"&&(l.value=l.value.replace(/^\s+/,""))}Array.isArray(o)?n.push(...o):n.push(o)}}}return n}function Ie(e,t){const n=t.data||{},r="value"in t&&!(b.call(n,"hProperties")||b.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:v(e,t)};return e.patch(t,r),e.applyData(t,r)}function Be(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function Oe(e){const t=[];let n=-1;for(;++n<e.footnoteOrder.length;){const r=e.footnoteById[e.footnoteOrder[n]];if(!r)continue;const i=e.all(r),o=String(r.identifier).toUpperCase(),l=m(o.toLowerCase());let a=0;const s=[];for(;++a<=e.footnoteCounts[o];){const u={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fnref-"+l+(a>1?"-"+a:""),dataFootnoteBackref:!0,className:["data-footnote-backref"],ariaLabel:e.footnoteBackLabel},children:[{type:"text",value:"↩"}]};a>1&&u.children.push({type:"element",tagName:"sup",children:[{type:"text",value:String(a)}]}),s.length>0&&s.push({type:"text",value:" "}),s.push(u)}const p=i[i.length-1];if(p&&p.type==="element"&&p.tagName==="p"){const u=p.children[p.children.length-1];u&&u.type==="text"?u.value+=" ":p.children.push({type:"text",value:" "}),p.children.push(...s)}else i.push(...s);const c={type:"element",tagName:"li",properties:{id:e.clobberPrefix+"fn-"+l},children:e.wrap(i,!0)};e.patch(r,c),t.push(c)}if(t.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:e.footnoteLabelTagName,properties:{...JSON.parse(JSON.stringify(e.footnoteLabelProperties)),id:"footnote-label"},children:[{type:"text",value:e.footnoteLabel}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(t,!0)},{type:"text",value:`
`}]}}function L(e,t){const n=De(e,t),r=n.one(e,null),i=Oe(n);return i&&r.children.push({type:"text",value:`
`},i),Array.isArray(r)?{type:"root",children:r}:r}const Te=function(e,t){return e&&"run"in e?Se(e,t):Le(e||t)};function Se(e,t){return(n,r,i)=>{e.run(L(n,t),r,o=>{i(o)})}}function Le(e){return t=>L(t,e)}export{v as all,Te as default,oe as defaultHandlers,S as one};
