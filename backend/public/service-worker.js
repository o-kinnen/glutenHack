if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const c=s=>l(s,r),o={module:{uri:r},exports:u,require:c};e[r]=Promise.all(n.map((s=>o[s]||c(s)))).then((s=>(i(...s),u)))}}define(["./workbox-c5b35979"],(function(s){"use strict";s.setCacheNameDetails({prefix:"frontend"}),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/css/120.e3dd8d18.css",revision:null},{url:"/css/228.fa689d14.css",revision:null},{url:"/css/442.4b74b359.css",revision:null},{url:"/css/485.71d07192.css",revision:null},{url:"/css/596.4f0a188e.css",revision:null},{url:"/css/639.6a33cac8.css",revision:null},{url:"/css/733.b8721c7c.css",revision:null},{url:"/css/747.f458577d.css",revision:null},{url:"/css/994.691b14a4.css",revision:null},{url:"/css/app.682b2f1f.css",revision:null},{url:"/css/chunk-vendors.8a42e1de.css",revision:null},{url:"/index.html",revision:"43c47ea84f31ad9947c3b044b4945dc7"},{url:"/js/120.c27d5886.js",revision:null},{url:"/js/209.8299eb65.js",revision:null},{url:"/js/228.089d544e.js",revision:null},{url:"/js/343.6d1751a5.js",revision:null},{url:"/js/363.a5d93334.js",revision:null},{url:"/js/442.9e41959d.js",revision:null},{url:"/js/485.ced4e059.js",revision:null},{url:"/js/494.852cdb12.js",revision:null},{url:"/js/596.b44065b2.js",revision:null},{url:"/js/639.42168f74.js",revision:null},{url:"/js/704.95445ca8.js",revision:null},{url:"/js/733.0d2fab0b.js",revision:null},{url:"/js/747.68c3b8de.js",revision:null},{url:"/js/994.2c1b72e1.js",revision:null},{url:"/js/app.5257a1c5.js",revision:null},{url:"/js/chunk-vendors.7d1c64c2.js",revision:null},{url:"/manifest.json",revision:"3b96e1ab86e8d3cf686f6e25c15ba9e3"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{}),s.registerRoute(/^https:\/\/my-api\/.*/,new s.NetworkFirst({cacheName:"api-cache",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/,new s.CacheFirst({cacheName:"image-cache",plugins:[new s.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map