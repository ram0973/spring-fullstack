import{g as Z,i as F,j,k as U,t as v}from"./index-CNFBoiGc.js";/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var S,V;function ee(){return V||(V=1,S=function(t){return t!=null&&t.constructor!=null&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}),S}var te=ee();const M=Z(te);function ne(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?B(e.position):"start"in e||"end"in e?B(e):"line"in e||"column"in e?z(e):""}function z(e){return D(e&&e.line)+":"+D(e&&e.column)}function B(e){return z(e&&e.start)+"-"+z(e&&e.end)}function D(e){return e&&typeof e=="number"?e:1}class m extends Error{constructor(t,n,s){const r=[null,null];let i={start:{line:null,column:null},end:{line:null,column:null}};if(super(),typeof n=="string"&&(s=n,n=void 0),typeof s=="string"){const c=s.indexOf(":");c===-1?r[1]=s:(r[0]=s.slice(0,c),r[1]=s.slice(c+1))}n&&("type"in n||"position"in n?n.position&&(i=n.position):"start"in n||"end"in n?i=n:("line"in n||"column"in n)&&(i.start=n)),this.name=ne(n)||"1:1",this.message=typeof t=="object"?t.message:t,this.stack="",typeof t=="object"&&t.stack&&(this.stack=t.stack),this.reason=this.message,this.fatal,this.line=i.start.line,this.column=i.start.column,this.position=i,this.source=r[0],this.ruleId=r[1],this.file,this.actual,this.expected,this.url,this.note}}m.prototype.file="";m.prototype.name="";m.prototype.reason="";m.prototype.message="";m.prototype.stack="";m.prototype.fatal=null;m.prototype.column=null;m.prototype.line=null;m.prototype.source=null;m.prototype.ruleId=null;m.prototype.position=null;const E={basename:ie,dirname:re,extname:se,join:oe,sep:"/"};function ie(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');C(e);let n=0,s=-1,r=e.length,i;if(t===void 0||t.length===0||t.length>e.length){for(;r--;)if(e.charCodeAt(r)===47){if(i){n=r+1;break}}else s<0&&(i=!0,s=r+1);return s<0?"":e.slice(n,s)}if(t===e)return"";let c=-1,d=t.length-1;for(;r--;)if(e.charCodeAt(r)===47){if(i){n=r+1;break}}else c<0&&(i=!0,c=r+1),d>-1&&(e.charCodeAt(r)===t.charCodeAt(d--)?d<0&&(s=r):(d=-1,s=c));return n===s?s=c:s<0&&(s=e.length),e.slice(n,s)}function re(e){if(C(e),e.length===0)return".";let t=-1,n=e.length,s;for(;--n;)if(e.charCodeAt(n)===47){if(s){t=n;break}}else s||(s=!0);return t<0?e.charCodeAt(0)===47?"/":".":t===1&&e.charCodeAt(0)===47?"//":e.slice(0,t)}function se(e){C(e);let t=e.length,n=-1,s=0,r=-1,i=0,c;for(;t--;){const d=e.charCodeAt(t);if(d===47){if(c){s=t+1;break}continue}n<0&&(c=!0,n=t+1),d===46?r<0?r=t:i!==1&&(i=1):r>-1&&(i=-1)}return r<0||n<0||i===0||i===1&&r===n-1&&r===s+1?"":e.slice(r,n)}function oe(...e){let t=-1,n;for(;++t<e.length;)C(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":fe(n)}function fe(e){C(e);const t=e.charCodeAt(0)===47;let n=ue(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.charCodeAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function ue(e,t){let n="",s=0,r=-1,i=0,c=-1,d,b;for(;++c<=e.length;){if(c<e.length)d=e.charCodeAt(c);else{if(d===47)break;d=47}if(d===47){if(!(r===c-1||i===1))if(r!==c-1&&i===2){if(n.length<2||s!==2||n.charCodeAt(n.length-1)!==46||n.charCodeAt(n.length-2)!==46){if(n.length>2){if(b=n.lastIndexOf("/"),b!==n.length-1){b<0?(n="",s=0):(n=n.slice(0,b),s=n.length-1-n.lastIndexOf("/")),r=c,i=0;continue}}else if(n.length>0){n="",s=0,r=c,i=0;continue}}t&&(n=n.length>0?n+"/..":"..",s=2)}else n.length>0?n+="/"+e.slice(r+1,c):n=e.slice(r+1,c),s=c-r-1;r=c,i=0}else d===46&&i>-1?i++:i=-1}return n}function C(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const le={cwd:ce};function ce(){return"/"}function N(e){return e!==null&&typeof e=="object"&&e.href&&e.origin}function he(e){if(typeof e=="string")e=new URL(e);else if(!N(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return ae(e)}function ae(e){if(e.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.charCodeAt(n)===37&&t.charCodeAt(n+1)===50){const s=t.charCodeAt(n+2);if(s===70||s===102){const r=new TypeError("File URL path must not include encoded / characters");throw r.code="ERR_INVALID_FILE_URL_PATH",r}}return decodeURIComponent(t)}const I=["history","path","basename","stem","extname","dirname"];class de{constructor(t){let n;t?typeof t=="string"||pe(t)?n={value:t}:N(t)?n={path:t}:n=t:n={},this.data={},this.messages=[],this.history=[],this.cwd=le.cwd(),this.value,this.stored,this.result,this.map;let s=-1;for(;++s<I.length;){const i=I[s];i in n&&n[i]!==void 0&&n[i]!==null&&(this[i]=i==="history"?[...n[i]]:n[i])}let r;for(r in n)I.includes(r)||(this[r]=n[r])}get path(){return this.history[this.history.length-1]}set path(t){N(t)&&(t=he(t)),R(t,"path"),this.path!==t&&this.history.push(t)}get dirname(){return typeof this.path=="string"?E.dirname(this.path):void 0}set dirname(t){k(this.basename,"dirname"),this.path=E.join(t||"",this.basename)}get basename(){return typeof this.path=="string"?E.basename(this.path):void 0}set basename(t){R(t,"basename"),P(t,"basename"),this.path=E.join(this.dirname||"",t)}get extname(){return typeof this.path=="string"?E.extname(this.path):void 0}set extname(t){if(P(t,"extname"),k(this.dirname,"extname"),t){if(t.charCodeAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=E.join(this.dirname,this.stem+(t||""))}get stem(){return typeof this.path=="string"?E.basename(this.path,this.extname):void 0}set stem(t){R(t,"stem"),P(t,"stem"),this.path=E.join(this.dirname||"",t+(this.extname||""))}toString(t){return(this.value||"").toString(t||void 0)}message(t,n,s){const r=new m(t,n,s);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}info(t,n,s){const r=this.message(t,n,s);return r.fatal=null,r}fail(t,n,s){const r=this.message(t,n,s);throw r.fatal=!0,r}}function P(e,t){if(e&&e.includes(E.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+E.sep+"`")}function R(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function k(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function pe(e){return M(e)}const Ee=$().freeze(),Y={}.hasOwnProperty;function $(){const e=v(),t=[];let n={},s,r=-1;return i.data=c,i.Parser=void 0,i.Compiler=void 0,i.freeze=d,i.attachers=t,i.use=b,i.parse=G,i.stringify=J,i.run=K,i.runSync=Q,i.process=W,i.processSync=X,i;function i(){const o=$();let f=-1;for(;++f<t.length;)o.use(...t[f]);return o.data(F(!0,{},n)),o}function c(o,f){return typeof o=="string"?arguments.length===2?(_("data",s),n[o]=f,i):Y.call(n,o)&&n[o]||null:o?(_("data",s),n=o,i):n}function d(){if(s)return i;for(;++r<t.length;){const[o,...f]=t[r];if(f[0]===!1)continue;f[0]===!0&&(f[0]=void 0);const u=o.call(i,...f);typeof u=="function"&&e.use(u)}return s=!0,r=Number.POSITIVE_INFINITY,i}function b(o,...f){let u;if(_("use",s),o!=null)if(typeof o=="function")w(o,...f);else if(typeof o=="object")Array.isArray(o)?x(o):g(o);else throw new TypeError("Expected usable value, not `"+o+"`");return u&&(n.settings=Object.assign(n.settings||{},u)),i;function a(l){if(typeof l=="function")w(l);else if(typeof l=="object")if(Array.isArray(l)){const[h,...p]=l;w(h,...p)}else g(l);else throw new TypeError("Expected usable value, not `"+l+"`")}function g(l){x(l.plugins),l.settings&&(u=Object.assign(u||{},l.settings))}function x(l){let h=-1;if(l!=null)if(Array.isArray(l))for(;++h<l.length;){const p=l[h];a(p)}else throw new TypeError("Expected a list of plugins, not `"+l+"`")}function w(l,h){let p=-1,y;for(;++p<t.length;)if(t[p][0]===l){y=t[p];break}y?(j(y[1])&&j(h)&&(h=F(!0,y[1],h)),y[1]=h):t.push([...arguments])}}function G(o){i.freeze();const f=A(o),u=i.Parser;return T("parse",u),O(u,"parse")?new u(String(f),f).parse():u(String(f),f)}function J(o,f){i.freeze();const u=A(f),a=i.Compiler;return L("stringify",a),q(o),O(a,"compile")?new a(o,u).compile():a(o,u)}function K(o,f,u){if(q(o),i.freeze(),!u&&typeof f=="function"&&(u=f,f=void 0),!u)return new Promise(a);a(null,u);function a(g,x){e.run(o,A(f),w);function w(l,h,p){h=h||o,l?x(l):g?g(h):u(null,h,p)}}}function Q(o,f){let u,a;return i.run(o,f,g),H("runSync","run",a),u;function g(x,w){U(x),u=w,a=!0}}function W(o,f){if(i.freeze(),T("process",i.Parser),L("process",i.Compiler),!f)return new Promise(u);u(null,f);function u(a,g){const x=A(o);i.run(i.parse(x),x,(l,h,p)=>{if(l||!h||!p)w(l);else{const y=i.stringify(h,p);y==null||(ye(y)?p.value=y:p.result=y),w(l,p)}});function w(l,h){l||!h?g(l):a?a(h):f(null,h)}}}function X(o){let f;i.freeze(),T("processSync",i.Parser),L("processSync",i.Compiler);const u=A(o);return i.process(u,a),H("processSync","process",f),u;function a(g){f=!0,U(g)}}}function O(e,t){return typeof e=="function"&&e.prototype&&(me(e.prototype)||t in e.prototype)}function me(e){let t;for(t in e)if(Y.call(e,t))return!0;return!1}function T(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Parser`")}function L(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Compiler`")}function _(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function q(e){if(!j(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function H(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function A(e){return ge(e)?e:new de(e)}function ge(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function ye(e){return typeof e=="string"||M(e)}export{Ee as unified};
