import{o as Z,m as W,z as K}from"./index-DOonL-o5.js";function w(r,n){let e=-1,t;if(n.extensions)for(;++e<n.extensions.length;)w(r,n.extensions[e]);for(t in n)t==="extensions"||(t==="unsafe"||t==="join"?r[t]=[...r[t]||[],...n[t]||[]]:t==="handlers"?r[t]=Object.assign(r[t],n[t]||{}):r.options[t]=n[t]);return r}function V(r,n,e,t){const i=e.enter("blockquote"),a=e.createTracker(t);a.move("> "),a.shift(2);const c=e.indentLines(e.containerFlow(r,a.current()),J);return i(),c}function J(r,n,e){return">"+(e?"":" ")+r}function I(r,n){return B(r,n.inConstruct,!0)&&!B(r,n.notInConstruct,!1)}function B(r,n,e){if(typeof n=="string"&&(n=[n]),!n||n.length===0)return e;let t=-1;for(;++t<n.length;)if(r.includes(n[t]))return!0;return!1}function A(r,n,e,t){let i=-1;for(;++i<e.unsafe.length;)if(e.unsafe[i].character===`
`&&I(e.stack,e.unsafe[i]))return/[ \t]/.test(t.before)?"":" ";return`\\
`}function y(r,n){return!!(!n.options.fences&&r.value&&!r.lang&&/[^ \r\n]/.test(r.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(r.value))}function Y(r){const n=r.options.fence||"`";if(n!=="`"&&n!=="~")throw new Error("Cannot serialize code with `"+n+"` for `options.fence`, expected `` ` `` or `~`");return n}function ee(r,n,e,t){const i=Y(e),a=r.value||"",c=i==="`"?"GraveAccent":"Tilde";if(y(r,e)){const f=e.enter("codeIndented"),h=e.indentLines(a,re);return f(),h}const o=e.createTracker(t),l=i.repeat(Math.max(Z(a,i)+1,3)),u=e.enter("codeFenced");let s=o.move(l);if(r.lang){const f=e.enter(`codeFencedLang${c}`);s+=o.move(e.safe(r.lang,{before:s,after:" ",encode:["`"],...o.current()})),f()}if(r.lang&&r.meta){const f=e.enter(`codeFencedMeta${c}`);s+=o.move(" "),s+=o.move(e.safe(r.meta,{before:s,after:`
`,encode:["`"],...o.current()})),f()}return s+=o.move(`
`),a&&(s+=o.move(a+`
`)),s+=o.move(l),u(),s}function re(r,n,e){return(e?"":"    ")+r}function C(r){const n=r.options.quote||'"';if(n!=='"'&&n!=="'")throw new Error("Cannot serialize title with `"+n+"` for `options.quote`, expected `\"`, or `'`");return n}function ne(r,n,e,t){const i=C(e),a=i==='"'?"Quote":"Apostrophe",c=e.enter("definition");let o=e.enter("label");const l=e.createTracker(t);let u=l.move("[");return u+=l.move(e.safe(e.associationId(r),{before:u,after:"]",...l.current()})),u+=l.move("]: "),o(),!r.url||/[\0- \u007F]/.test(r.url)?(o=e.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(e.safe(r.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(o=e.enter("destinationRaw"),u+=l.move(e.safe(r.url,{before:u,after:r.title?" ":`
`,...l.current()}))),o(),r.title&&(o=e.enter(`title${a}`),u+=l.move(" "+i),u+=l.move(e.safe(r.title,{before:u,after:i,...l.current()})),u+=l.move(i),o()),c(),u}function te(r){const n=r.options.emphasis||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize emphasis with `"+n+"` for `options.emphasis`, expected `*`, or `_`");return n}M.peek=ce;function M(r,n,e,t){const i=te(e),a=e.enter("emphasis"),c=e.createTracker(t);let o=c.move(i);return o+=c.move(e.containerPhrasing(r,{before:o,after:i,...c.current()})),o+=c.move(i),a(),o}function ce(r,n,e){return e.options.emphasis||"*"}const R=function(r){if(r==null)return le;if(typeof r=="string")return ae(r);if(typeof r=="object")return Array.isArray(r)?ie(r):oe(r);if(typeof r=="function")return b(r);throw new Error("Expected function, string, or object as test")};function ie(r){const n=[];let e=-1;for(;++e<r.length;)n[e]=R(r[e]);return b(t);function t(...i){let a=-1;for(;++a<n.length;)if(n[a].call(this,...i))return!0;return!1}}function oe(r){return b(n);function n(e){let t;for(t in r)if(e[t]!==r[t])return!1;return!0}}function ae(r){return b(n);function n(e){return e&&e.type===r}}function b(r){return n;function n(e,...t){return!!(e&&typeof e=="object"&&"type"in e&&r.call(this,e,...t))}}function le(){return!0}const ue=!0,v=!1,se="skip",fe=function(r,n,e,t){typeof n=="function"&&typeof e!="function"&&(t=e,e=n,n=null);const i=R(n),a=t?-1:1;c(r,void 0,[])();function c(o,l,u){const s=o&&typeof o=="object"?o:{};if(typeof s.type=="string"){const h=typeof s.tagName=="string"?s.tagName:typeof s.name=="string"?s.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(o.type+(h?"<"+h+">":""))+")"})}return f;function f(){let h=[],p,d,m;if((!n||i(o,l,u[u.length-1]||null))&&(h=he(e(o,u)),h[0]===v))return h;if(o.children&&h[0]!==se)for(d=(t?o.children.length:-1)+a,m=u.concat(o);d>-1&&d<o.children.length;){if(p=c(o.children[d],d,m)(),p[0]===v)return p;d=typeof p[1]=="number"?p[1]:d+a}return h}}};function he(r){return Array.isArray(r)?r:typeof r=="number"?[ue,r]:[r]}const pe=function(r,n,e,t){typeof n=="function"&&typeof e!="function"&&(t=e,e=n,n=null),fe(r,n,i,t);function i(a,c){const o=c[c.length-1];return e(a,o?o.children.indexOf(a):null,o)}},de={};function L(r,n){const e=de,t=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,i=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return P(r,t,i)}function P(r,n,e){if(me(r)){if("value"in r)return r.type==="html"&&!e?"":r.value;if(n&&"alt"in r&&r.alt)return r.alt;if("children"in r)return F(r.children,n,e)}return Array.isArray(r)?F(r,n,e):""}function F(r,n,e){const t=[];let i=-1;for(;++i<r.length;)t[i]=P(r[i],n,e);return t.join("")}function me(r){return!!(r&&typeof r=="object")}function _(r,n){let e=!1;return pe(r,t=>{if("value"in t&&/\r?\n|\r/.test(t.value)||t.type==="break")return e=!0,v}),!!((!r.depth||r.depth<3)&&L(r)&&(n.options.setext||e))}function ge(r,n,e,t){const i=Math.max(Math.min(6,r.depth||1),1),a=e.createTracker(t);if(_(r,e)){const s=e.enter("headingSetext"),f=e.enter("phrasing"),h=e.containerPhrasing(r,{...a.current(),before:`
`,after:`
`});return f(),s(),h+`
`+(i===1?"=":"-").repeat(h.length-(Math.max(h.lastIndexOf("\r"),h.lastIndexOf(`
`))+1))}const c="#".repeat(i),o=e.enter("headingAtx"),l=e.enter("phrasing");a.move(c+" ");let u=e.containerPhrasing(r,{before:"# ",after:`
`,...a.current()});return/^[\t ]/.test(u)&&(u="&#x"+u.charCodeAt(0).toString(16).toUpperCase()+";"+u.slice(1)),u=u?c+" "+u:c,e.options.closeAtx&&(u+=" "+c),l(),o(),u}z.peek=ke;function z(r){return r.value||""}function ke(){return"<"}E.peek=we;function E(r,n,e,t){const i=C(e),a=i==='"'?"Quote":"Apostrophe",c=e.enter("image");let o=e.enter("label");const l=e.createTracker(t);let u=l.move("![");return u+=l.move(e.safe(r.alt,{before:u,after:"]",...l.current()})),u+=l.move("]("),o(),!r.url&&r.title||/[\0- \u007F]/.test(r.url)?(o=e.enter("destinationLiteral"),u+=l.move("<"),u+=l.move(e.safe(r.url,{before:u,after:">",...l.current()})),u+=l.move(">")):(o=e.enter("destinationRaw"),u+=l.move(e.safe(r.url,{before:u,after:r.title?" ":")",...l.current()}))),o(),r.title&&(o=e.enter(`title${a}`),u+=l.move(" "+i),u+=l.move(e.safe(r.title,{before:u,after:i,...l.current()})),u+=l.move(i),o()),u+=l.move(")"),c(),u}function we(){return"!"}j.peek=be;function j(r,n,e,t){const i=r.referenceType,a=e.enter("imageReference");let c=e.enter("label");const o=e.createTracker(t);let l=o.move("![");const u=e.safe(r.alt,{before:l,after:"]",...o.current()});l+=o.move(u+"]["),c();const s=e.stack;e.stack=[],c=e.enter("reference");const f=e.safe(e.associationId(r),{before:l,after:"]",...o.current()});return c(),e.stack=s,a(),i==="full"||!u||u!==f?l+=o.move(f+"]"):i==="shortcut"?l=l.slice(0,-1):l+=o.move("]"),l}function be(){return"!"}function q(r){if(!r._compiled){const n=(r.atBreak?"[\\r\\n][\\t ]*":"")+(r.before?"(?:"+r.before+")":"");r._compiled=new RegExp((n?"("+n+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(r.character)?"\\":"")+r.character+(r.after?"(?:"+r.after+")":""),"g")}return r._compiled}$.peek=xe;function $(r,n,e){let t=r.value||"",i="`",a=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(t);)i+="`";for(/[^ \r\n]/.test(t)&&(/^[ \r\n]/.test(t)&&/[ \r\n]$/.test(t)||/^`|`$/.test(t))&&(t=" "+t+" ");++a<e.unsafe.length;){const c=e.unsafe[a],o=q(c);let l;if(c.atBreak)for(;l=o.exec(t);){let u=l.index;t.charCodeAt(u)===10&&t.charCodeAt(u-1)===13&&u--,t=t.slice(0,u)+" "+t.slice(l.index+1)}}return i+t+i}function xe(){return"`"}function D(r,n){const e=L(r);return!!(!n.options.resourceLink&&r.url&&!r.title&&r.children&&r.children.length===1&&r.children[0].type==="text"&&(e===r.url||"mailto:"+e===r.url)&&/^[a-z][a-z+.-]+:/i.test(r.url)&&!/[\0- <>\u007F]/.test(r.url))}G.peek=ye;function G(r,n,e,t){const i=C(e),a=i==='"'?"Quote":"Apostrophe",c=e.createTracker(t);let o,l;if(D(r,e)){const s=e.stack;e.stack=[],o=e.enter("autolink");let f=c.move("<");return f+=c.move(e.containerPhrasing(r,{before:f,after:">",...c.current()})),f+=c.move(">"),o(),e.stack=s,f}o=e.enter("link"),l=e.enter("label");let u=c.move("[");return u+=c.move(e.containerPhrasing(r,{before:u,after:"](",...c.current()})),u+=c.move("]("),l(),!r.url&&r.title||/[\0- \u007F]/.test(r.url)?(l=e.enter("destinationLiteral"),u+=c.move("<"),u+=c.move(e.safe(r.url,{before:u,after:">",...c.current()})),u+=c.move(">")):(l=e.enter("destinationRaw"),u+=c.move(e.safe(r.url,{before:u,after:r.title?" ":")",...c.current()}))),l(),r.title&&(l=e.enter(`title${a}`),u+=c.move(" "+i),u+=c.move(e.safe(r.title,{before:u,after:i,...c.current()})),u+=c.move(i),l()),u+=c.move(")"),o(),u}function ye(r,n,e){return D(r,e)?"<":"["}N.peek=ve;function N(r,n,e,t){const i=r.referenceType,a=e.enter("linkReference");let c=e.enter("label");const o=e.createTracker(t);let l=o.move("[");const u=e.containerPhrasing(r,{before:l,after:"]",...o.current()});l+=o.move(u+"]["),c();const s=e.stack;e.stack=[],c=e.enter("reference");const f=e.safe(e.associationId(r),{before:l,after:"]",...o.current()});return c(),e.stack=s,a(),i==="full"||!u||u!==f?l+=o.move(f+"]"):i==="shortcut"?l=l.slice(0,-1):l+=o.move("]"),l}function ve(){return"["}function S(r){const n=r.options.bullet||"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bullet`, expected `*`, `+`, or `-`");return n}function Ce(r){const n=S(r),e=r.options.bulletOther;if(!e)return n==="*"?"-":"*";if(e!=="*"&&e!=="+"&&e!=="-")throw new Error("Cannot serialize items with `"+e+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(e===n)throw new Error("Expected `bullet` (`"+n+"`) and `bulletOther` (`"+e+"`) to be different");return e}function U(r){const n=r.options.bulletOrdered||".";if(n!=="."&&n!==")")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOrdered`, expected `.` or `)`");return n}function Se(r){const n=U(r),e=r.options.bulletOrderedOther;if(!e)return n==="."?")":".";if(e!=="."&&e!==")")throw new Error("Cannot serialize items with `"+e+"` for `options.bulletOrderedOther`, expected `*`, `+`, or `-`");if(e===n)throw new Error("Expected `bulletOrdered` (`"+n+"`) and `bulletOrderedOther` (`"+e+"`) to be different");return e}function H(r){const n=r.options.rule||"*";if(n!=="*"&&n!=="-"&&n!=="_")throw new Error("Cannot serialize rules with `"+n+"` for `options.rule`, expected `*`, `-`, or `_`");return n}function Be(r,n,e,t){const i=e.enter("list"),a=e.bulletCurrent;let c=r.ordered?U(e):S(e);const o=r.ordered?Se(e):Ce(e),l=e.bulletLastUsed;let u=!1;if(n&&(r.ordered?e.options.bulletOrderedOther:e.options.bulletOther)&&l&&c===l&&(u=!0),!r.ordered){const f=r.children?r.children[0]:void 0;if((c==="*"||c==="-")&&f&&(!f.children||!f.children[0])&&e.stack[e.stack.length-1]==="list"&&e.stack[e.stack.length-2]==="listItem"&&e.stack[e.stack.length-3]==="list"&&e.stack[e.stack.length-4]==="listItem"&&e.indexStack[e.indexStack.length-1]===0&&e.indexStack[e.indexStack.length-2]===0&&e.indexStack[e.indexStack.length-3]===0&&(u=!0),H(e)===c&&f){let h=-1;for(;++h<r.children.length;){const p=r.children[h];if(p&&p.type==="listItem"&&p.children&&p.children[0]&&p.children[0].type==="thematicBreak"){u=!0;break}}}}u&&(c=o),e.bulletCurrent=c;const s=e.containerFlow(r,t);return e.bulletLastUsed=c,e.bulletCurrent=a,i(),s}function Ae(r){const n=r.options.listItemIndent||"tab";if(n===1||n==="1")return"one";if(n!=="tab"&&n!=="one"&&n!=="mixed")throw new Error("Cannot serialize items with `"+n+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return n}function Fe(r,n,e,t){const i=Ae(e);let a=e.bulletCurrent||S(e);n&&n.type==="list"&&n.ordered&&(a=(typeof n.start=="number"&&n.start>-1?n.start:1)+(e.options.incrementListMarker===!1?0:n.children.indexOf(r))+a);let c=a.length+1;(i==="tab"||i==="mixed"&&(n&&n.type==="list"&&n.spread||r.spread))&&(c=Math.ceil(c/4)*4);const o=e.createTracker(t);o.move(a+" ".repeat(c-a.length)),o.shift(c);const l=e.enter("listItem"),u=e.indentLines(e.containerFlow(r,o.current()),s);return l(),u;function s(f,h,p){return h?(p?"":" ".repeat(c))+f:(p?a:a+" ".repeat(c-a.length))+f}}function Oe(r,n,e,t){const i=e.enter("paragraph"),a=e.enter("phrasing"),c=e.containerPhrasing(r,t);return a(),i(),c}const Q=function(r){if(r==null)return Re;if(typeof r=="string")return Me(r);if(typeof r=="object")return Array.isArray(r)?Te(r):Ie(r);if(typeof r=="function")return x(r);throw new Error("Expected function, string, or object as test")};function Te(r){const n=[];let e=-1;for(;++e<r.length;)n[e]=Q(r[e]);return x(t);function t(...i){let a=-1;for(;++a<n.length;)if(n[a].call(this,...i))return!0;return!1}}function Ie(r){return x(n);function n(e){let t;for(t in r)if(e[t]!==r[t])return!1;return!0}}function Me(r){return x(n);function n(e){return e&&e.type===r}}function x(r){return n;function n(e,...t){return!!(e&&typeof e=="object"&&"type"in e&&r.call(this,e,...t))}}function Re(){return!0}const Le=Q(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","link","linkReference","strong","text"]);function Pe(r,n,e,t){return(r.children.some(c=>Le(c))?e.containerPhrasing:e.containerFlow).call(e,r,t)}function _e(r){const n=r.options.strong||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize strong with `"+n+"` for `options.strong`, expected `*`, or `_`");return n}X.peek=ze;function X(r,n,e,t){const i=_e(e),a=e.enter("strong"),c=e.createTracker(t);let o=c.move(i+i);return o+=c.move(e.containerPhrasing(r,{before:o,after:i,...c.current()})),o+=c.move(i+i),a(),o}function ze(r,n,e){return e.options.strong||"*"}function Ee(r,n,e,t){return e.safe(r.value,t)}function je(r){const n=r.options.ruleRepetition||3;if(n<3)throw new Error("Cannot serialize rules with repetition `"+n+"` for `options.ruleRepetition`, expected `3` or more");return n}function qe(r,n,e){const t=(H(e)+(e.options.ruleSpaces?" ":"")).repeat(je(e));return e.options.ruleSpaces?t.slice(0,-1):t}const $e={blockquote:V,break:A,code:ee,definition:ne,emphasis:M,hardBreak:A,heading:ge,html:z,image:E,imageReference:j,inlineCode:$,link:G,linkReference:N,list:Be,listItem:Fe,paragraph:Oe,root:Pe,strong:X,text:Ee,thematicBreak:qe},De=[Ge];function Ge(r,n,e,t){if(n.type==="code"&&y(n,t)&&(r.type==="list"||r.type===n.type&&y(r,t))||r.type==="list"&&r.type===n.type&&!!r.ordered==!!n.ordered&&!(r.ordered?t.options.bulletOrderedOther:t.options.bulletOther))return!1;if("spread"in e&&typeof e.spread=="boolean")return r.type==="paragraph"&&(r.type===n.type||n.type==="definition"||n.type==="heading"&&_(n,t))?void 0:e.spread?1:0}const k=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"],Ne=[{character:"	",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",before:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"\r",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:`
`,inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:" ",after:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",before:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"!",after:"\\[",inConstruct:"phrasing",notInConstruct:k},{character:'"',inConstruct:"titleQuote"},{atBreak:!0,character:"#"},{character:"#",inConstruct:"headingAtx",after:`(?:[\r
]|$)`},{character:"&",after:"[#A-Za-z]",inConstruct:"phrasing"},{character:"'",inConstruct:"titleApostrophe"},{character:"(",inConstruct:"destinationRaw"},{before:"\\]",character:"(",inConstruct:"phrasing",notInConstruct:k},{atBreak:!0,before:"\\d+",character:")"},{character:")",inConstruct:"destinationRaw"},{atBreak:!0,character:"*",after:`(?:[ 	\r
*])`},{character:"*",inConstruct:"phrasing",notInConstruct:k},{atBreak:!0,character:"+",after:`(?:[ 	\r
])`},{atBreak:!0,character:"-",after:`(?:[ 	\r
-])`},{atBreak:!0,before:"\\d+",character:".",after:`(?:[ 	\r
]|$)`},{atBreak:!0,character:"<",after:"[!/?A-Za-z]"},{character:"<",after:"[!/?A-Za-z]",inConstruct:"phrasing",notInConstruct:k},{character:"<",inConstruct:"destinationLiteral"},{atBreak:!0,character:"="},{atBreak:!0,character:">"},{character:">",inConstruct:"destinationLiteral"},{atBreak:!0,character:"["},{character:"[",inConstruct:"phrasing",notInConstruct:k},{character:"[",inConstruct:["label","reference"]},{character:"\\",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"]",inConstruct:["label","reference"]},{atBreak:!0,character:"_"},{character:"_",inConstruct:"phrasing",notInConstruct:k},{atBreak:!0,character:"`"},{character:"`",inConstruct:["codeFencedLangGraveAccent","codeFencedMetaGraveAccent"]},{character:"`",inConstruct:"phrasing",notInConstruct:k},{atBreak:!0,character:"~"}],g={carriageReturn:-5,lineFeed:-4,carriageReturnLineFeed:-3,horizontalTab:-2,virtualSpace:-1,eof:null,nul:0,soh:1,stx:2,etx:3,eot:4,enq:5,ack:6,bel:7,bs:8,ht:9,lf:10,vt:11,ff:12,cr:13,so:14,si:15,dle:16,dc1:17,dc2:18,dc3:19,dc4:20,nak:21,syn:22,etb:23,can:24,em:25,sub:26,esc:27,fs:28,gs:29,rs:30,us:31,space:32,exclamationMark:33,quotationMark:34,numberSign:35,dollarSign:36,percentSign:37,ampersand:38,apostrophe:39,leftParenthesis:40,rightParenthesis:41,asterisk:42,plusSign:43,comma:44,dash:45,dot:46,slash:47,digit0:48,digit1:49,digit2:50,digit3:51,digit4:52,digit5:53,digit6:54,digit7:55,digit8:56,digit9:57,colon:58,semicolon:59,lessThan:60,equalsTo:61,greaterThan:62,questionMark:63,atSign:64,uppercaseA:65,uppercaseB:66,uppercaseC:67,uppercaseD:68,uppercaseE:69,uppercaseF:70,uppercaseG:71,uppercaseH:72,uppercaseI:73,uppercaseJ:74,uppercaseK:75,uppercaseL:76,uppercaseM:77,uppercaseN:78,uppercaseO:79,uppercaseP:80,uppercaseQ:81,uppercaseR:82,uppercaseS:83,uppercaseT:84,uppercaseU:85,uppercaseV:86,uppercaseW:87,uppercaseX:88,uppercaseY:89,uppercaseZ:90,leftSquareBracket:91,backslash:92,rightSquareBracket:93,caret:94,underscore:95,graveAccent:96,lowercaseA:97,lowercaseB:98,lowercaseC:99,lowercaseD:100,lowercaseE:101,lowercaseF:102,lowercaseG:103,lowercaseH:104,lowercaseI:105,lowercaseJ:106,lowercaseK:107,lowercaseL:108,lowercaseM:109,lowercaseN:110,lowercaseO:111,lowercaseP:112,lowercaseQ:113,lowercaseR:114,lowercaseS:115,lowercaseT:116,lowercaseU:117,lowercaseV:118,lowercaseW:119,lowercaseX:120,lowercaseY:121,lowercaseZ:122,leftCurlyBrace:123,verticalBar:124,rightCurlyBrace:125,tilde:126,del:127,byteOrderMarker:65279,replacementCharacter:65533},Ue={ht:"	",lf:`
`,cr:"\r",space:" ",exclamationMark:"!",quotationMark:'"',numberSign:"#",dollarSign:"$",percentSign:"%",ampersand:"&",apostrophe:"'",leftParenthesis:"(",rightParenthesis:")",asterisk:"*",plusSign:"+",comma:",",dash:"-",dot:".",slash:"/",digit0:"0",digit1:"1",digit2:"2",digit3:"3",digit4:"4",digit5:"5",digit6:"6",digit7:"7",digit8:"8",digit9:"9",colon:":",semicolon:";",lessThan:"<",equalsTo:"=",greaterThan:">",questionMark:"?",atSign:"@",uppercaseA:"A",uppercaseB:"B",uppercaseC:"C",uppercaseD:"D",uppercaseE:"E",uppercaseF:"F",uppercaseG:"G",uppercaseH:"H",uppercaseI:"I",uppercaseJ:"J",uppercaseK:"K",uppercaseL:"L",uppercaseM:"M",uppercaseN:"N",uppercaseO:"O",uppercaseP:"P",uppercaseQ:"Q",uppercaseR:"R",uppercaseS:"S",uppercaseT:"T",uppercaseU:"U",uppercaseV:"V",uppercaseW:"W",uppercaseX:"X",uppercaseY:"Y",uppercaseZ:"Z",leftSquareBracket:"[",backslash:"\\",rightSquareBracket:"]",caret:"^",underscore:"_",graveAccent:"`",lowercaseA:"a",lowercaseB:"b",lowercaseC:"c",lowercaseD:"d",lowercaseE:"e",lowercaseF:"f",lowercaseG:"g",lowercaseH:"h",lowercaseI:"i",lowercaseJ:"j",lowercaseK:"k",lowercaseL:"l",lowercaseM:"m",lowercaseN:"n",lowercaseO:"o",lowercaseP:"p",lowercaseQ:"q",lowercaseR:"r",lowercaseS:"s",lowercaseT:"t",lowercaseU:"u",lowercaseV:"v",lowercaseW:"w",lowercaseX:"x",lowercaseY:"y",lowercaseZ:"z",leftCurlyBrace:"{",verticalBar:"|",rightCurlyBrace:"}",tilde:"~",replacementCharacter:"�"};function He(r,n){const e=Number.parseInt(r,n);return e<g.ht||e===g.vt||e>g.cr&&e<g.space||e>g.tilde&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?Ue.replacementCharacter:String.fromCharCode(e)}const O={attentionSideBefore:1,attentionSideAfter:2,atxHeadingOpeningFenceSizeMax:6,autolinkDomainSizeMax:63,autolinkSchemeSizeMax:32,cdataOpeningString:"CDATA[",characterGroupWhitespace:1,characterGroupPunctuation:2,characterReferenceDecimalSizeMax:7,characterReferenceHexadecimalSizeMax:6,characterReferenceNamedSizeMax:31,codeFencedSequenceSizeMin:3,contentTypeDocument:"document",contentTypeFlow:"flow",contentTypeContent:"content",contentTypeString:"string",contentTypeText:"text",hardBreakPrefixSizeMin:2,htmlRaw:1,htmlComment:2,htmlInstruction:3,htmlDeclaration:4,htmlCdata:5,htmlBasic:6,htmlComplete:7,htmlRawSizeMax:8,linkResourceDestinationBalanceMax:32,linkReferenceSizeMax:999,listItemValueSizeMax:10,numericBaseDecimal:10,numericBaseHexadecimal:16,tabSize:4,thematicBreakMarkerCountMin:3,v8MaxSafeChunkSize:1e4},Qe=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Xe(r){return r.replace(Qe,Ze)}function Ze(r,n,e){if(n)return n;if(e.charCodeAt(0)===g.numberSign){const i=e.charCodeAt(1),a=i===g.lowercaseX||i===g.uppercaseX;return He(e.slice(a?2:1),a?O.numericBaseHexadecimal:O.numericBaseDecimal)}return W(e)||r}function We(r){return r.label||!r.identifier?r.label||"":Xe(r.identifier)}function Ke(r,n,e){const t=n.indexStack,i=r.children||[],a=[];let c=-1,o=e.before;t.push(-1);let l=n.createTracker(e);for(;++c<i.length;){const u=i[c];let s;if(t[t.length-1]=c,c+1<i.length){let f=n.handle.handlers[i[c+1].type];f&&f.peek&&(f=f.peek),s=f?f(i[c+1],r,n,{before:"",after:"",...l.current()}).charAt(0):""}else s=e.after;a.length>0&&(o==="\r"||o===`
`)&&u.type==="html"&&(a[a.length-1]=a[a.length-1].replace(/(\r?\n|\r)$/," "),o=" ",l=n.createTracker(e),l.move(a.join(""))),a.push(l.move(n.handle(u,r,n,{...l.current(),before:o,after:s}))),o=a[a.length-1].slice(-1)}return t.pop(),a.join("")}function Ve(r,n,e){const t=n.indexStack,i=r.children||[],a=n.createTracker(e),c=[];let o=-1;for(t.push(-1);++o<i.length;){const l=i[o];t[t.length-1]=o,c.push(a.move(n.handle(l,r,n,{before:`
`,after:`
`,...a.current()}))),l.type!=="list"&&(n.bulletLastUsed=void 0),o<i.length-1&&c.push(a.move(Je(l,i[o+1],r,n)))}return t.pop(),c.join("")}function Je(r,n,e,t){let i=t.join.length;for(;i--;){const a=t.join[i](r,n,e,t);if(a===!0||a===1)break;if(typeof a=="number")return`
`.repeat(1+a);if(a===!1)return`

<!---->

`}return`

`}const Ye=/\r?\n|\r/g;function er(r,n){const e=[];let t=0,i=0,a;for(;a=Ye.exec(r);)c(r.slice(t,a.index)),e.push(a[0]),t=a.index+a[0].length,i++;return c(r.slice(t)),e.join("");function c(o){e.push(n(o,i,!o))}}function rr(r,n,e){const t=(e.before||"")+(n||"")+(e.after||""),i=[],a=[],c={};let o=-1;for(;++o<r.unsafe.length;){const s=r.unsafe[o];if(!I(r.stack,s))continue;const f=q(s);let h;for(;h=f.exec(t);){const p="before"in s||!!s.atBreak,d="after"in s,m=h.index+(p?h[1].length:0);i.includes(m)?(c[m].before&&!p&&(c[m].before=!1),c[m].after&&!d&&(c[m].after=!1)):(i.push(m),c[m]={before:p,after:d})}}i.sort(nr);let l=e.before?e.before.length:0;const u=t.length-(e.after?e.after.length:0);for(o=-1;++o<i.length;){const s=i[o];s<l||s>=u||s+1<u&&i[o+1]===s+1&&c[s].after&&!c[s+1].before&&!c[s+1].after||i[o-1]===s-1&&c[s].before&&!c[s-1].before&&!c[s-1].after||(l!==s&&a.push(T(t.slice(l,s),"\\")),l=s,/[!-/:-@[-`{-~]/.test(t.charAt(s))&&(!e.encode||!e.encode.includes(t.charAt(s)))?a.push("\\"):(a.push("&#x"+t.charCodeAt(s).toString(16).toUpperCase()+";"),l++))}return a.push(T(t.slice(l,u),e.after)),a.join("")}function nr(r,n){return r-n}function T(r,n){const e=/\\(?=[!-/:-@[-`{-~])/g,t=[],i=[],a=r+n;let c=-1,o=0,l;for(;l=e.exec(a);)t.push(l.index);for(;++c<t.length;)o!==t[c]&&i.push(r.slice(o,t[c])),i.push("\\"),o=t[c];return i.push(r.slice(o)),i.join("")}function tr(r){const n=r||{},e=n.now||{};let t=n.lineShift||0,i=e.line||1,a=e.column||1;return{move:l,current:c,shift:o};function c(){return{now:{line:i,column:a},lineShift:t}}function o(u){t+=u}function l(u){const s=u||"",f=s.split(/\r?\n|\r/g),h=f[f.length-1];return i+=f.length-1,a=f.length===1?a+h.length:1+h.length+t,s}}function cr(r,n={}){const e={enter:i,indentLines:er,associationId:We,containerPhrasing:lr,containerFlow:ur,createTracker:tr,safe:sr,stack:[],unsafe:[],join:[],handlers:{},options:{},indexStack:[],handle:void 0};w(e,{unsafe:Ne,join:De,handlers:$e}),w(e,n),e.options.tightDefinitions&&w(e,{join:[ar]}),e.handle=K("type",{invalid:ir,unknown:or,handlers:e.handlers});let t=e.handle(r,void 0,e,{before:`
`,after:`
`,now:{line:1,column:1},lineShift:0});return t&&t.charCodeAt(t.length-1)!==10&&t.charCodeAt(t.length-1)!==13&&(t+=`
`),t;function i(a){return e.stack.push(a),c;function c(){e.stack.pop()}}}function ir(r){throw new Error("Cannot handle value `"+r+"`, expected node")}function or(r){throw new Error("Cannot handle unknown node `"+r.type+"`")}function ar(r,n){if(r.type==="definition"&&r.type===n.type)return 0}function lr(r,n){return Ke(r,this,n)}function ur(r,n){return Ve(r,this,n)}function sr(r,n){return rr(this,r,n)}function hr(r){Object.assign(this,{Compiler:e=>{const t=this.data("settings");return cr(e,Object.assign({},t,r,{extensions:this.data("toMarkdownExtensions")||[]}))}})}export{hr as default};
