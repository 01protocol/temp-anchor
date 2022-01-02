import t from"bn.js";export{default as BN}from"bn.js";import{sendAndConfirmRawTransaction as e,PublicKey as n,Transaction as r,TransactionInstruction as o,SystemProgram as i}from"@solana/web3.js";import*as s from"@solana/web3.js";export{s as web3};import{Buffer as a}from"buffer";import c from"camelcase";import*as u from"@project-serum/borsh";import l from"bs58";import{sha256 as d}from"js-sha256";import*as h from"base64-js";import*as p from"assert";import f from"assert";import{inflate as m}from"pako";import g from"eventemitter3";class v{constructor(t,e,n){this.connection=t,this.wallet=e,this.opts=n}static defaultOptions(){return{preflightCommitment:"processed",commitment:"processed"}}static local(t,e){throw new Error("Provider local is not available on browser.")}static env(){throw new Error("Provider env is not available on browser.")}async send(t,n,r){void 0===n&&(n=[]),void 0===r&&(r=this.opts),t.feePayer=this.wallet.publicKey,t.recentBlockhash=(await this.connection.getRecentBlockhash(r.preflightCommitment)).blockhash,await this.wallet.signTransaction(t),n.filter((t=>void 0!==t)).forEach((e=>{t.partialSign(e)}));const o=t.serialize();return await e(this.connection,o,r)}async sendAll(t,n){void 0===n&&(n=this.opts);const r=await this.connection.getRecentBlockhash(n.preflightCommitment);let o=t.map((t=>{let e=t.tx,n=t.signers;return void 0===n&&(n=[]),e.feePayer=this.wallet.publicKey,e.recentBlockhash=r.blockhash,n.filter((t=>void 0!==t)).forEach((t=>{e.partialSign(t)})),e}));const i=await this.wallet.signAllTransactions(o),s=[];for(let t=0;t<o.length;t+=1){const r=i[t].serialize();s.push(await e(this.connection,r,n))}return s}async simulate(t,e,n=this.opts){var r,o,i;return void 0===e&&(e=[]),t.feePayer=this.wallet.publicKey,t.recentBlockhash=(await this.connection.getRecentBlockhash(null!==(r=n.preflightCommitment)&&void 0!==r?r:this.opts.preflightCommitment)).blockhash,await this.wallet.signTransaction(t),e.filter((t=>void 0!==t)).forEach((e=>{t.partialSign(e)})),await async function(t,e,n){e.recentBlockhash=await t._recentBlockhash(t._disableBlockhashCaching);const r=e.serializeMessage(),o=e._serialize(r).toString("base64"),i=[o,{encoding:"base64",commitment:n}],s=await t._rpcRequest("simulateTransaction",i);if(s.error)throw new Error("failed to simulate transaction: "+s.error.message);return s.result}(this.connection,t,null!==(i=null!==(o=n.commitment)&&void 0!==o?o:this.opts.commitment)&&void 0!==i?i:"processed")}}function y(t){b=t}function w(){return null===b?v.local():b}let b=null;class _ extends Error{constructor(t){super(t),this.name="IdlError"}}class A extends Error{constructor(t,e,...n){super(...n),this.code=t,this.msg=e}static parse(t,e){let n,r=t.toString().split("custom program error: ");if(2!==r.length)return null;try{n=parseInt(r[1])}catch(t){return null}let o=e.get(n);return void 0!==o?new A(n,o,n+": "+o):(o=I.get(n),void 0!==o?new A(n,o,n+": "+o):null)}toString(){return this.msg}}const I=new Map([[100,"8 byte instruction identifier not provided"],[101,"Fallback functions are not supported"],[102,"The program could not deserialize the given instruction"],[103,"The program could not serialize the given instruction"],[1e3,"The program was compiled without idl instructions"],[1001,"The transaction was given an invalid program for the IDL instruction"],[2e3,"A mut constraint was violated"],[2001,"A has_one constraint was violated"],[2002,"A signer constraint was violated"],[2003,"A raw constraint was violated"],[2004,"An owner constraint was violated"],[2005,"A rent exempt constraint was violated"],[2006,"A seeds constraint was violated"],[2007,"An executable constraint was violated"],[2008,"A state constraint was violated"],[2009,"An associated constraint was violated"],[2010,"An associated init constraint was violated"],[2011,"A close constraint was violated"],[2012,"An address constraint was violated"],[2013,"Expected zero account discriminant"],[2014,"A token mint constraint was violated"],[2015,"A token owner constraint was violated"],[2016,"A mint mint authority constraint was violated"],[2017,"A mint freeze authority constraint was violated"],[2018,"A mint decimals constraint was violated"],[2019,"A space constraint was violated"],[3e3,"The account discriminator was already set on this account"],[3001,"No 8 byte discriminator was found on the account"],[3002,"8 byte discriminator did not match what was expected"],[3003,"Failed to deserialize the account"],[3004,"Failed to serialize the account"],[3005,"Not enough account keys given to the instruction"],[3006,"The given account is not mutable"],[3007,"The given account is owned by a different program than expected"],[3008,"Program ID was not as expected"],[3009,"Program account is not executable"],[3010,"The given account did not sign"],[3011,"The given account is not owned by the system program"],[3012,"The program expected this account to be already initialized"],[3013,"The given account is not a program data account"],[3014,"The given account is not the associated token account"],[4e3,"The given state account does not have the correct address"],[5e3,"The API being used is deprecated and should no longer be used"]]);class E{static fieldLayout(t,e){const n=void 0!==t.name?c(t.name):void 0;switch(t.type){case"bool":return u.bool(n);case"u8":return u.u8(n);case"i8":return u.i8(n);case"u16":return u.u16(n);case"i16":return u.i16(n);case"u32":return u.u32(n);case"i32":return u.i32(n);case"u64":return u.u64(n);case"i64":return u.i64(n);case"u128":return u.u128(n);case"i128":return u.i128(n);case"bytes":return u.vecU8(n);case"string":return u.str(n);case"publicKey":return u.publicKey(n);default:if("vec"in t.type)return u.vec(E.fieldLayout({name:void 0,type:t.type.vec},e),n);if("option"in t.type)return u.option(E.fieldLayout({name:void 0,type:t.type.option},e),n);if("defined"in t.type){const r=t.type.defined;if(void 0===e)throw new _("User defined types not provided");const o=e.filter((t=>t.name===r));if(1!==o.length)throw new _(`Type not found: ${JSON.stringify(t)}`);return E.typeDefLayout(o[0],e,n)}if("array"in t.type){let r=t.type.array[0],o=t.type.array[1],i=E.fieldLayout({name:void 0,type:r},e);return u.array(i,o,n)}throw new Error(`Not yet implemented: ${t}`)}}static typeDefLayout(t,e=[],n){if("struct"===t.type.kind){const r=t.type.fields.map((t=>E.fieldLayout(t,e)));return u.struct(r,n)}if("enum"===t.type.kind){let r=t.type.variants.map((t=>{const n=c(t.name);if(void 0===t.fields)return u.struct([],n);const r=t.fields.map((t=>{if(!t.hasOwnProperty("name"))throw new Error("Tuple enum variants not yet implemented.");return E.fieldLayout(t,e)}));return u.struct(r,n)}));return void 0!==n?u.rustEnum(r).replicate(n):u.rustEnum(r,n)}throw new Error(`Unknown type kint: ${t}`)}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var k=function(){return k=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},k.apply(this,arguments)},L=function(){return L=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},L.apply(this,arguments)};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function S(t){return t.toLowerCase()}var x=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],$=/[^A-Z0-9]+/gi;function P(t,e,n){return e instanceof RegExp?t.replace(e,n):e.reduce((function(t,e){return t.replace(e,n)}),t)}function T(t,e){return void 0===e&&(e={}),function(t,e){void 0===e&&(e={});for(var n=e.splitRegexp,r=void 0===n?x:n,o=e.stripRegexp,i=void 0===o?$:o,s=e.transform,a=void 0===s?S:s,c=e.delimiter,u=void 0===c?" ":c,l=P(P(t,r,"$1\0$2"),i,"\0"),d=0,h=l.length;"\0"===l.charAt(d);)d++;for(;"\0"===l.charAt(h-1);)h--;return l.slice(d,h).split("\0").map(a).join(u)}(t,L({delimiter:"."},e))}function O(t,e){if("enum"===e.type.kind){let n=e.type.variants.map((e=>void 0===e.fields?0:e.fields.map((e=>{if("object"!=typeof e||!("name"in e))throw new Error("Tuple enum variants not yet implemented.");return j(t,e.type)})).reduce(((t,e)=>t+e))));return Math.max(...n)+1}return void 0===e.type.fields?0:e.type.fields.map((e=>j(t,e.type))).reduce(((t,e)=>t+e),0)}function j(t,e){var n,r;switch(e){case"bool":case"u8":case"i8":case"bytes":case"string":return 1;case"i16":case"u16":return 2;case"u32":case"i32":return 4;case"u64":case"i64":return 8;case"u128":case"i128":return 16;case"publicKey":return 32;default:if("vec"in e)return 1;if("option"in e)return 1+j(t,e.option);if("defined"in e){const o=null!==(r=null===(n=t.types)||void 0===n?void 0:n.filter((t=>t.name===e.defined)))&&void 0!==r?r:[];if(1!==o.length)throw new _(`Type not found: ${JSON.stringify(e)}`);return O(t,o[0])}if("array"in e){let n=e.array[0],r=e.array[1];return j(t,n)*r}throw new Error(`Invalid type ${JSON.stringify(e)}`)}}function z(t,e){var n;let r=`${t}:${void 0===n&&(n={}),T(e,k({delimiter:"_"},n))}`;return a.from(d.digest(r)).slice(0,8)}class D{constructor(t){this.idl=t,this.ixLayout=D.parseIxLayout(t);const e=new Map;t.instructions.forEach((t=>{const n=z("global",t.name);e.set(l.encode(n),{layout:this.ixLayout.get(t.name),name:t.name})})),t.state&&t.state.methods.map((t=>{const n=z("state",t.name);e.set(l.encode(n),{layout:this.ixLayout.get(t.name),name:t.name})})),this.sighashLayouts=e}encode(t,e){return this._encode("global",t,e)}encodeState(t,e){return this._encode("state",t,e)}_encode(t,e,n){const r=a.alloc(1e3),o=c(e),i=this.ixLayout.get(o);if(!i)throw new Error(`Unknown method: ${o}`);const s=i.encode(n,r),u=r.slice(0,s);return a.concat([z(t,e),u])}static parseIxLayout(t){const e=(t.state?t.state.methods:[]).map((e=>{let n=e.args.map((e=>{var n,r;return E.fieldLayout(e,Array.from([...null!==(n=t.accounts)&&void 0!==n?n:[],...null!==(r=t.types)&&void 0!==r?r:[]]))}));const r=c(e.name);return[r,u.struct(n,r)]})).concat(t.instructions.map((e=>{let n=e.args.map((e=>{var n,r;return E.fieldLayout(e,Array.from([...null!==(n=t.accounts)&&void 0!==n?n:[],...null!==(r=t.types)&&void 0!==r?r:[]]))}));const r=c(e.name);return[r,u.struct(n,r)]})));return new Map(e)}decode(t,e="hex"){"string"==typeof t&&(t="hex"===e?a.from(t,"hex"):l.decode(t));let n=l.encode(t.slice(0,8)),r=t.slice(8);const o=this.sighashLayouts.get(n);return o?{data:o.layout.decode(r),name:o.name}:null}format(t,e){return C.format(t,e,this.idl)}}class C{static format(t,e,n){const r=n.instructions.filter((e=>t.name===e.name))[0];if(void 0===r)return console.error("Invalid instruction given"),null;const o=r.args.map((e=>({name:e.name,type:C.formatIdlType(e.type),data:C.formatIdlData(e,t.data[e.name],n.types)}))),i=C.flattenIdlAccounts(r.accounts);return{args:o,accounts:e.map(((t,e)=>e<i.length?{name:i[e].name,...t}:{name:void 0,...t}))}}static formatIdlType(t){if("string"==typeof t)return t;if("vec"in t)return`Vec<${this.formatIdlType(t.vec)}>`;if("option"in t)return`Option<${this.formatIdlType(t.option)}>`;if("defined"in t)return t.defined;if("array"in t)return`Array<${t.array[0]}; ${t.array[1]}>`;throw new Error(`Unknown IDL type: ${t}`)}static formatIdlData(t,e,n){if("string"==typeof t.type)return e.toString();if(t.type.hasOwnProperty("vec"))return"["+e.map((e=>this.formatIdlData({name:"",type:t.type.vec},e))).join(", ")+"]";if(t.type.hasOwnProperty("option"))return null===e?"null":this.formatIdlData({name:"",type:t.type.option},e);if(t.type.hasOwnProperty("defined")){if(void 0===n)throw new Error("User defined types not provided");const r=n.filter((e=>e.name===t.type.defined));if(1!==r.length)throw new Error(`Type not found: ${t.type.defined}`);return C.formatIdlDataDefined(r[0],e,n)}return"unknown"}static formatIdlDataDefined(t,e,n){if("struct"===t.type.kind){const r=t.type;return"{ "+Object.keys(e).map((t=>{const o=r.fields.filter((e=>e.name===t))[0];if(void 0===o)throw new Error("Unable to find type");return t+": "+C.formatIdlData(o,e[t],n)})).join(", ")+" }"}if(0===t.type.variants.length)return"{}";if(t.type.variants[0].name){const r=t.type.variants,o=Object.keys(e)[0],i=e[o],s=Object.keys(i).map((t=>{var e;const s=i[t],a=null===(e=r[o])||void 0===e?void 0:e.filter((e=>e.name===t))[0];if(void 0===a)throw new Error("Unable to find variant");return t+": "+C.formatIdlData(a,s,n)})).join(", "),a=c(o,{pascalCase:!0});return 0===s.length?a:`${a} { ${s} }`}return"Tuple formatting not yet implemented"}static flattenIdlAccounts(t,e){return t.map((t=>{const n=function(t){const e=t.replace(/([A-Z])/g," $1");return e.charAt(0).toUpperCase()+e.slice(1)}(t.name);if(t.hasOwnProperty("accounts")){const r=e?`${e} > ${n}`:n;return C.flattenIdlAccounts(t.accounts,r)}return{...t,name:e?`${e} > ${n}`:n}})).flat()}}class B{constructor(t){if(void 0===t.accounts)return void(this.accountLayouts=new Map);const e=t.accounts.map((e=>[e.name,E.typeDefLayout(e,t.types)]));this.accountLayouts=new Map(e)}async encode(t,e){const n=a.alloc(1e3),r=this.accountLayouts.get(t);if(!r)throw new Error(`Unknown account: ${t}`);const o=r.encode(e,n);let i=n.slice(0,o),s=B.accountDiscriminator(t);return a.concat([s,i])}decode(t,e){const n=e.slice(8),r=this.accountLayouts.get(t);if(!r)throw new Error(`Unknown account: ${t}`);return r.decode(n)}static accountDiscriminator(t){return a.from(d.digest(`account:${c(t,{pascalCase:!0})}`)).slice(0,8)}}class M{constructor(t){if(void 0===t.events)return void(this.layouts=new Map);const e=t.events.map((e=>{let n={name:e.name,type:{kind:"struct",fields:e.fields.map((t=>({name:t.name,type:t.type})))}};return[e.name,E.typeDefLayout(n,t.types)]}));this.layouts=new Map(e),this.discriminators=new Map(void 0===t.events?[]:t.events.map((t=>{return[h.fromByteArray((e=t.name,a.from(d.digest(`event:${e}`)).slice(0,8))),t.name];var e})))}decode(t){let e;try{e=a.from(h.toByteArray(t))}catch(t){return null}const n=h.fromByteArray(e.slice(0,8)),r=this.discriminators.get(n);if(void 0===r)return null;const o=this.layouts.get(r);if(!o)throw new Error(`Unknown event: ${r}`);return{data:o.decode(e.slice(8)),name:r}}}const U=new Set(["anchor-deprecated-state"]),K=new Map;function W(t){return void 0!==K.get(t)}var N=Object.freeze({__proto__:null,set:function(t){if(!U.has(t))throw new Error("Invalid feature");K.set(t,!0)},isSet:W});class R{constructor(t){if(void 0===t.state)throw new Error("Idl state not defined.");this.layout=E.typeDefLayout(t.state.struct,t.types)}async encode(t,e){const n=a.alloc(1e3),r=this.layout.encode(e,n),o=await Z(t),i=n.slice(0,r);return a.concat([o,i])}decode(t){const e=t.slice(8);return this.layout.decode(e)}}async function Z(t){let e=W("anchor-deprecated-state")?"account":"state";return a.from(d.digest(`${e}:${t}`)).slice(0,8)}class J{constructor(t){this.instruction=new D(t),this.accounts=new B(t),this.events=new M(t),t.state&&(this.state=new R(t))}sighash(t,e){return z(t,e)}}var F=Object.freeze({__proto__:null,hash:function(t){return d(t)}});function q(t){const e=new Map;return t.errors&&t.errors.forEach((t=>{var n;let r=null!==(n=t.msg)&&void 0!==n?n:t.name;e.set(t.code,r)})),e}function G(t,...e){if(t.args.length!=e.length)throw new Error("Invalid argument length");const n={};let r=0;return t.args.forEach((t=>{n[t.name]=e[r],r+=1})),n}function V(t,e={}){t.forEach((t=>{if("accounts"in t)V(t.accounts,e[t.name]);else if(void 0===e[t.name])throw new Error(`Invalid arguments: ${t.name} not provided.`)}))}function Q(t){return t instanceof n?t:new n(t)}async function H(t,e,n){if(e.length<=99)return await X(t,e,n);{const i=(r=e,o=99,Array.apply(0,new Array(Math.ceil(r.length/o))).map(((t,e)=>r.slice(e*o,(e+1)*o))));return(await Promise.all(i.map((e=>X(t,e,n))))).flat()}var r,o}async function X(t,e,r){const o=null!=r?r:t.commitment,i=[e.map((t=>t.toBase58()))];o&&i.push({commitment:o});const s=await t._rpcRequest("getMultipleAccounts",i);if(s.error)throw new Error("failed to get info about accounts "+e.map((t=>t.toBase58())).join(", ")+": "+s.error.message);f(void 0!==s.result);const c=[];for(const t of s.result.value){let e=null;if(null!==t){if(s.result.value){const{executable:r,owner:o,lamports:i,data:s}=t;f("base64"===s[1]),e={executable:r,owner:new n(o),lamports:i,data:a.from(s[0],"base64")}}if(null===e)throw new Error("Invalid response");c.push(e)}else c.push(null)}return c.map(((t,n)=>null===t?null:{publicKey:e[n],account:t}))}var Y=Object.freeze({__proto__:null,invoke:async function(t,e,n,i){t=Q(t),i||(i=w());const s=new r;return s.add(new o({programId:t,keys:null!=e?e:[],data:n})),await i.send(s)},getMultipleAccounts:H});function tt(t,e,r){const o=a.concat([t.toBuffer(),a.from(e),r.toBuffer()]),i=d.digest(o);return new n(a.from(i))}function et(e,r){let o=a.alloc(0);e.forEach((function(t){if(t.length>32)throw new TypeError("Max seed length exceeded");o=a.concat([o,rt(t)])})),o=a.concat([o,r.toBuffer(),a.from("ProgramDerivedAddress")]);let i=d(new Uint8Array(o)),s=new t(i,16).toArray(void 0,32);if(n.isOnCurve(new Uint8Array(s)))throw new Error("Invalid seeds, address must fall off the curve");return new n(s)}function nt(t,e){let n,r=255;for(;0!=r;){try{n=et(t.concat(a.from([r])),e)}catch(t){if(t instanceof TypeError)throw t;r--;continue}return[n,r]}throw new Error("Unable to find a viable program address nonce")}const rt=t=>t instanceof a?t:t instanceof Uint8Array?a.from(t.buffer,t.byteOffset,t.byteLength):a.from(t);async function ot(t,...e){let r=[a.from([97,110,99,104,111,114])];e.forEach((t=>{r.push(t instanceof a?t:Q(t).toBuffer())}));const[o]=await n.findProgramAddress(r,Q(t));return o}var it=Object.freeze({__proto__:null,createWithSeedSync:tt,createProgramAddressSync:et,findProgramAddressSync:nt,associated:ot});var st=Object.freeze({__proto__:null,encode:function(t){return t.reduce(((t,e)=>t+e.toString(16).padStart(2,"0")),"0x")},decode:function(t){0===t.indexOf("0x")&&(t=t.substr(2)),t.length%2==1&&(t="0"+t);let e=t.match(/.{2}/g);return null===e?a.from([]):a.from(e.map((t=>parseInt(t,16))))}});function at(t){return new TextDecoder("utf-8").decode(t)}var ct=Object.freeze({__proto__:null,decode:at,encode:function(t){return(new TextEncoder).encode(t)}});var ut=Object.freeze({__proto__:null,encode:function(t){return l.encode(t)},decode:function(t){return l.decode(t)}});var lt=Object.freeze({__proto__:null,encode:function(t){return h.fromByteArray(t)},decode:function(t){return a.from(h.toByteArray(t))}}),dt=Object.freeze({__proto__:null,hex:st,utf8:ct,bs58:ut,base64:lt});const ht=new n("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),pt=new n("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");var ft=Object.freeze({__proto__:null,associatedAddress:async function({mint:t,owner:e}){return(await n.findProgramAddress([e.toBuffer(),ht.toBuffer(),t.toBuffer()],pt))[0]}}),mt=Object.freeze({__proto__:null,sha256:F,rpc:Y,publicKey:it,bytes:dt,token:ft,features:N});const gt=u.struct([u.publicKey("authority"),u.vecU8("data")]);function vt(t,e){var n,r;let o={};const i=t.args?t.args.length:0;if(e.length>i){if(e.length!==i+1)throw new Error(`provided too many arguments ${e} to instruction ${null==t?void 0:t.name} expecting: ${null!==(r=null===(n=t.args)||void 0===n?void 0:n.map((t=>t.name)))&&void 0!==r?r:[]}`);o=e.pop()}return[e,o]}class yt{static build(t,e,n){if("_inner"===t.name)throw new _("the _inner name is reserved");const r=(...i)=>{const[s,a]=vt(t,[...i]);V(t.accounts,a.accounts);const c=r.accounts(a.accounts);return void 0!==a.remainingAccounts&&c.push(...a.remainingAccounts),W("debug-logs")&&console.log("Outgoing account metas:",c),new o({keys:c,programId:n,data:e(t.name,G(t,...s))})};return r.accounts=e=>yt.accountsArray(e,t.accounts,t.name),r}static accountsArray(t,e,n){return t?e.map((e=>{if(void 0!==("accounts"in e?e.accounts:void 0)){const r=t[e.name];return yt.accountsArray(r,e.accounts,n).flat()}{const r=e;let o;try{o=Q(t[e.name])}catch(t){throw new Error(`Wrong input type for account "${e.name}" in the instruction accounts object${void 0!==n?' for instruction "'+n+'"':""}. Expected PublicKey or string.`)}return{pubkey:o,isWritable:r.isMut,isSigner:r.isSigner}}})).flat():[]}}class wt{static build(t,e,n,r){return async(...o)=>{const i=e(...o),[,s]=vt(t,[...o]);try{return await r.send(i,s.signers,s.options)}catch(t){W("debug-logs")&&console.log("Translating error:",t);let e=A.parse(t,n);if(null===e)throw t;throw e}}}}class bt{static build(t,e){return(...n)=>{var o,i,s;const[,a]=vt(t,[...n]),c=new r;if(a.preInstructions&&a.instructions)throw new Error("instructions is deprecated, use preInstructions");return null===(o=a.preInstructions)||void 0===o||o.forEach((t=>c.add(t))),null===(i=a.instructions)||void 0===i||i.forEach((t=>c.add(t))),c.add(e(...n)),null===(s=a.postInstructions)||void 0===s||s.forEach((t=>c.add(t))),c}}}class _t{constructor(t,e,n=w(),r=new J(t)){this.provider=n,this.coder=r,this._idl=t,this._programId=e,this._address=At(e),this._sub=null;const[o,s,a]=(()=>{var o;let s={},a={},u={};return null===(o=t.state)||void 0===o||o.methods.forEach((o=>{const l=yt.build(o,((t,e)=>r.instruction.encodeState(t,e)),e);l.accounts=t=>{const r=function(t,e,n,r){if("new"===n.name){const[n]=nt([],t);return[{pubkey:e.wallet.publicKey,isWritable:!1,isSigner:!0},{pubkey:At(t),isWritable:!0,isSigner:!1},{pubkey:n,isWritable:!1,isSigner:!1},{pubkey:i.programId,isWritable:!1,isSigner:!1},{pubkey:t,isWritable:!1,isSigner:!1}]}return V(n.accounts,r),[{pubkey:At(t),isWritable:!0,isSigner:!1}]}(e,n,o,t);return r.concat(yt.accountsArray(t,o.accounts,o.name))};const d=bt.build(o,l),h=wt.build(o,d,q(t),n),p=c(o.name);s[p]=l,a[p]=d,u[p]=h})),[s,a,u]})();this.instruction=o,this.transaction=s,this.rpc=a}get programId(){return this._programId}async fetch(){const t=this.address(),e=await this.provider.connection.getAccountInfo(t);if(null===e)throw new Error(`Account does not exist ${t.toString()}`);const n=this._idl.state;if(!n)throw new Error("State is not specified in IDL.");if((await Z(n.struct.name)).compare(e.data.slice(0,8)))throw new Error("Invalid account discriminator");return this.coder.state.decode(e.data)}address(){return this._address}subscribe(t){if(null!==this._sub)return this._sub.ee;const e=new g,n=this.provider.connection.onAccountChange(this.address(),(t=>{const n=this.coder.state.decode(t.data);e.emit("change",n)}),t);return this._sub={ee:e,listener:n},e}unsubscribe(){null!==this._sub&&this.provider.connection.removeAccountChangeListener(this._sub.listener).then((async()=>{this._sub=null})).catch(console.error)}}function At(t){let[e]=nt([],t);return tt(e,"unversioned",t)}class It{constructor(t,e,n,r,o){var i;this._idlAccount=e,this._programId=n,this._provider=null!=r?r:w(),this._coder=null!=o?o:new J(t),this._size=8+(null!==(i=O(t,e))&&void 0!==i?i:0)}get size(){return this._size}get programId(){return this._programId}get provider(){return this._provider}get coder(){return this._coder}async fetchNullable(t,e){const n=await this.getAccountInfo(t,e);if(null===n)return null;if(B.accountDiscriminator(this._idlAccount.name).compare(n.data.slice(0,8)))throw new Error("Invalid account discriminator");return this._coder.accounts.decode(this._idlAccount.name,n.data)}async fetch(t,e){const n=await this.fetchNullable(t,e);if(null===n)throw new Error(`Account does not exist ${t.toString()}`);return n}async fetchMultiple(t,e){const n=await H(this._provider.connection,t.map((t=>Q(t))),e),r=B.accountDiscriminator(this._idlAccount.name);return n.map((t=>null==t||r.compare(null==t?void 0:t.account.data.slice(0,8))?null:this._coder.accounts.decode(this._idlAccount.name,null==t?void 0:t.account.data)))}async all(t){const e=B.accountDiscriminator(this._idlAccount.name);return(await this._provider.connection.getProgramAccounts(this._programId,{commitment:this._provider.connection.commitment,filters:[{memcmp:{offset:0,bytes:l.encode(t instanceof a?a.concat([e,t]):e)}},...Array.isArray(t)?t:[]]})).map((({pubkey:t,account:e})=>({publicKey:t,account:this._coder.accounts.decode(this._idlAccount.name,e.data)})))}subscribe(t,e){const n=Et.get(t.toString());if(n)return n.ee;const r=new g;t=Q(t);const o=this._provider.connection.onAccountChange(t,(t=>{const e=this._coder.accounts.decode(this._idlAccount.name,t.data);r.emit("change",e)}),e);return Et.set(t.toString(),{ee:r,listener:o}),r}async unsubscribe(t){let e=Et.get(t.toString());e?Et&&await this._provider.connection.removeAccountChangeListener(e.listener).then((()=>{Et.delete(t.toString())})).catch(console.error):console.warn("Address is not subscribed")}async createInstruction(t,e){const n=this.size;return i.createAccount({fromPubkey:this._provider.wallet.publicKey,newAccountPubkey:t.publicKey,space:null!=e?e:n,lamports:await this._provider.connection.getMinimumBalanceForRentExemption(null!=e?e:n),programId:this._programId})}async associated(...t){const e=await this.associatedAddress(...t);return await this.fetch(e)}async associatedAddress(...t){return await ot(this._programId,...t)}async getAccountInfo(t,e){return await this._provider.connection.getAccountInfo(Q(t),e)}}const Et=new Map,kt="Program log: ".length;class Lt{constructor(t,e,n){this._programId=t,this._provider=e,this._eventParser=new St(t,n),this._eventCallbacks=new Map,this._eventListeners=new Map,this._listenerIdCount=0}addEventListener(t,e){var n;let r=this._listenerIdCount;return this._listenerIdCount+=1,t in this._eventCallbacks||this._eventListeners.set(t,[]),this._eventListeners.set(t,(null!==(n=this._eventListeners.get(t))&&void 0!==n?n:[]).concat(r)),this._eventCallbacks.set(r,[t,e]),void 0!==this._onLogsSubscriptionId||(this._onLogsSubscriptionId=this._provider.connection.onLogs(this._programId,((t,e)=>{t.err?console.error(t):this._eventParser.parseLogs(t.logs,(t=>{const n=this._eventListeners.get(t.name);n&&n.forEach((n=>{const r=this._eventCallbacks.get(n);if(r){const[,n]=r;n(t.data,e.slot)}}))}))}))),r}async removeEventListener(t){const e=this._eventCallbacks.get(t);if(!e)throw new Error(`Event listener ${t} doesn't exist!`);const[n]=e;let r=this._eventListeners.get(n);if(!r)throw new Error(`Event listeners don't exist for ${n}!`);this._eventCallbacks.delete(t),r=r.filter((e=>e!==t)),0===r.length&&this._eventListeners.delete(n),0==this._eventCallbacks.size&&(p.ok(0===this._eventListeners.size),void 0!==this._onLogsSubscriptionId&&(await this._provider.connection.removeOnLogsListener(this._onLogsSubscriptionId),this._onLogsSubscriptionId=void 0))}}class St{constructor(t,e){this.coder=e,this.programId=t}parseLogs(t,e){const n=new $t(t),r=new xt(n.next());let o=n.next();for(;null!==o;){let[t,i,s]=this.handleLog(r,o);t&&e(t),i&&r.push(i),s&&r.pop(),o=n.next()}}handleLog(t,e){return t.stack.length>0&&t.program()===this.programId.toString()?this.handleProgramLog(e):[null,...this.handleSystemLog(e)]}handleProgramLog(t){if(t.startsWith("Program log:")){const e=t.slice(kt);return[this.coder.events.decode(e),null,!1]}return[null,...this.handleSystemLog(t)]}handleSystemLog(t){const e=t.split(":")[0];return null!==e.match(/^Program (.*) success/g)?[null,!0]:e.startsWith(`Program ${this.programId.toString()} invoke`)?[this.programId.toString(),!1]:e.includes("invoke")?["cpi",!1]:[null,!1]}}class xt{constructor(t){var e;const n=null===(e=/^Program (.*) invoke.*$/g.exec(t))||void 0===e?void 0:e[1];if(!n)throw new Error("Could not find program invocation log line");this.stack=[n]}program(){return p.ok(this.stack.length>0),this.stack[this.stack.length-1]}push(t){this.stack.push(t)}pop(){p.ok(this.stack.length>0),this.stack.pop()}}class $t{constructor(t){this.logs=t}next(){if(0===this.logs.length)return null;let t=this.logs[0];return this.logs=this.logs.slice(1),t}}class Pt{constructor(t,e,n){e=Q(e),n||(n=w()),this._idl=t,this._provider=n,this._programId=e,this._coder=new J(t),this._events=new Lt(this._programId,n,this._coder);const[r,o,i,s,a,u]=class{static build(t,e,n,r){const o={},i={},s={},a={},u=q(t),l=class{static build(t,e,n,r){if(void 0!==t.state)return new _t(t,n,r,e)}}.build(t,e,n,r);t.instructions.forEach((l=>{const d=yt.build(l,((t,n)=>e.instruction.encode(t,n)),n),h=bt.build(l,d),p=wt.build(l,h,u,r),f=class{static build(t,e,n,r,o,i,s){return async(...a)=>{const c=e(...a),[,u]=vt(t,[...a]);let l;try{l=await r.simulate(c,u.signers,u.options)}catch(t){W("debug-logs")&&console.log("Translating error:",t);let e=A.parse(t,n);if(null===e)throw t;throw e}if(void 0===l)throw new Error("Unable to simulate transaction");if(l.value.err)throw new Error(`Simulate error: ${l.value.err.toString()}`);const d=l.value.logs;if(!d)throw new Error("Simulated logs not found");const h=[];return s.events&&new St(i,o).parseLogs(d,(t=>{h.push(t)})),{events:h,raw:d}}}}.build(l,h,u,r,e,n,t),m=c(l.name);i[m]=d,s[m]=h,o[m]=p,a[m]=f}));const d=t.accounts?class{static build(t,e,n,r){var o;const i={};return null===(o=t.accounts)||void 0===o||o.forEach((o=>{const s=c(o.name);i[s]=new It(t,o,n,r,e)})),i}}.build(t,e,n,r):{};return[o,i,s,d,a,l]}}.build(t,this._coder,e,n);this.rpc=r,this.instruction=o,this.transaction=i,this.account=s,this.simulate=a,this.state=u}get programId(){return this._programId}get idl(){return this._idl}get coder(){return this._coder}get provider(){return this._provider}static async at(t,e){const n=Q(t),r=await Pt.fetchIdl(n,e);if(!r)throw new Error(`IDL not found for program: ${t.toString()}`);return new Pt(r,n,e)}static async fetchIdl(t,e){e=null!=e?e:w();const r=Q(t),o=await async function(t){const e=(await n.findProgramAddress([],t))[0];return await n.createWithSeed(e,"anchor:idl",t)}(r),i=await e.connection.getAccountInfo(o);if(!i)return null;let s=(a=i.data.slice(8),gt.decode(a));var a;const c=m(s.data);return JSON.parse(at(c))}addEventListener(t,e){return this._events.addEventListener(t,e)}async removeEventListener(t){return await this._events.removeEventListener(t)}}export{It as AccountClient,B as AccountsCoder,J as Coder,M as EventCoder,Lt as EventManager,St as EventParser,_ as IdlError,D as InstructionCoder,Pt as Program,A as ProgramError,v as Provider,_t as StateClient,R as StateCoder,w as getProvider,q as parseIdlErrors,y as setProvider,vt as splitArgsAndCtx,G as toInstruction,Q as translateAddress,mt as utils,V as validateAccounts};
//# sourceMappingURL=index.js.map
