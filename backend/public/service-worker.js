if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const c=s=>l(s,r),o={module:{uri:r},exports:u,require:c};e[r]=Promise.all(n.map((s=>o[s]||c(s)))).then((s=>(i(...s),u)))}}define(["./workbox-c5b35979"],(function(s){"use strict";s.setCacheNameDetails({prefix:"frontend"}),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/css/148.8e008e44.css",revision:null},{url:"/css/248.1cab4868.css",revision:null},{url:"/css/442.4b74b359.css",revision:null},{url:"/css/733.b8721c7c.css",revision:null},{url:"/css/795.d486cd7a.css",revision:null},{url:"/css/878.e5e06f0d.css",revision:null},{url:"/css/888.6024f8da.css",revision:null},{url:"/css/90.a4ccfe0d.css",revision:null},{url:"/css/994.691b14a4.css",revision:null},{url:"/css/app.682b2f1f.css",revision:null},{url:"/css/chunk-vendors.8a42e1de.css",revision:null},{url:"/index.html",revision:"ee558864744cc5ba7be975c1ee8229fa"},{url:"/js/125.27f3abfe.js",revision:null},{url:"/js/148.e8e34fde.js",revision:null},{url:"/js/179.5b34e27a.js",revision:null},{url:"/js/209.8299eb65.js",revision:null},{url:"/js/248.cfea5b2f.js",revision:null},{url:"/js/343.49bfab74.js",revision:null},{url:"/js/363.18e7fb94.js",revision:null},{url:"/js/427.ad338751.js",revision:null},{url:"/js/442.9e41959d.js",revision:null},{url:"/js/494.852cdb12.js",revision:null},{url:"/js/704.4f6096d5.js",revision:null},{url:"/js/733.19b7accc.js",revision:null},{url:"/js/749.f21fca91.js",revision:null},{url:"/js/795.c7043a64.js",revision:null},{url:"/js/878.0eeb96ab.js",revision:null},{url:"/js/888.cd8080c3.js",revision:null},{url:"/js/90.82a827bb.js",revision:null},{url:"/js/994.b56023b8.js",revision:null},{url:"/js/app.0e1dcd9f.js",revision:null},{url:"/js/chunk-vendors.615d2665.js",revision:null},{url:"/manifest.json",revision:"3b96e1ab86e8d3cf686f6e25c15ba9e3"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{}),s.registerRoute(/^https:\/\/my-api\/.*/,new s.NetworkFirst({cacheName:"api-cache",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/,new s.CacheFirst({cacheName:"image-cache",plugins:[new s.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
