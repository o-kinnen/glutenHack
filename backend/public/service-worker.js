if(!self.define){let s,i={};const e=(e,n)=>(e=new URL(e+".js",n).href,i[e]||new Promise((i=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=i,document.head.appendChild(s)}else s=e,importScripts(e),i()})).then((()=>{let s=i[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const u=s=>e(s,r),o={module:{uri:r},exports:c,require:u};i[r]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(l(...s),c)))}}define(["./workbox-c5b35979"],(function(s){"use strict";s.setCacheNameDetails({prefix:"frontend"}),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/css/10.10372f15.css",revision:null},{url:"/css/100.9baba7eb.css",revision:null},{url:"/css/166.9f346ab6.css",revision:null},{url:"/css/225.a38efbfe.css",revision:null},{url:"/css/291.a7ce13b1.css",revision:null},{url:"/css/375.b8c09dc2.css",revision:null},{url:"/css/407.e91697bf.css",revision:null},{url:"/css/414.5c6cb732.css",revision:null},{url:"/css/478.62223de2.css",revision:null},{url:"/css/501.eb969450.css",revision:null},{url:"/css/619.179c8295.css",revision:null},{url:"/css/807.868a3cbc.css",revision:null},{url:"/css/910.1c51512b.css",revision:null},{url:"/css/946.b5ec4dad.css",revision:null},{url:"/css/947.d7a6f719.css",revision:null},{url:"/css/app.95f67fe5.css",revision:null},{url:"/css/chunk-vendors.8a42e1de.css",revision:null},{url:"/img/arachide.png",revision:"a2fbdf5d9e5ac5d58ce0d9a945a8c0f0"},{url:"/img/crustacés.png",revision:"81d5fda69ce73c82917353139e966f37"},{url:"/img/céleri.png",revision:"f88d2d050c4e1e8320791406c88cef80"},{url:"/img/food.png",revision:"7ae9b7934b4febb40a8c2c33e2f4c2ad"},{url:"/img/fruits.png",revision:"0e4c685428b3950a91d166d656779c72"},{url:"/img/gluten.png",revision:"450d00d0fec07137fb559408571b71b6"},{url:"/img/lait.png",revision:"63bccffc3104324b1509496cc3c3e44a"},{url:"/img/logo.1b0cc06b.png",revision:null},{url:"/img/logo.png",revision:"a0382c4c340040dc7109c01bcd8529bd"},{url:"/img/moutarde.png",revision:"1e7f064ed4692d512790c172626d0b37"},{url:"/img/noix.png",revision:"1490c6d4adfa91a53f77a387aa38460f"},{url:"/img/oeufs.png",revision:"876e4802c3b8833db5bcc7f640973348"},{url:"/img/plat.png",revision:"1c74fe6ffefc51a6e26058ff38040abe"},{url:"/img/poissons.png",revision:"2d9058e500de6d3626c7fa92e4a94652"},{url:"/img/shopping.png",revision:"226fcaeff65782974714c226a17ae53e"},{url:"/img/soja.png",revision:"c931d5a8f5a424ce96666e9126145ad2"},{url:"/img/viande.png",revision:"8568f6b907765abd12341a79248aedd9"},{url:"/img/épices.png",revision:"31fe367dd035fc3a7bb0eb60308121dc"},{url:"/index.html",revision:"b12c4ebe4ac361960e67af3492565cd3"},{url:"/js/10.6b7bcd56.js",revision:null},{url:"/js/100.27ff3df3.js",revision:null},{url:"/js/125.27f3abfe.js",revision:null},{url:"/js/166.98c998c2.js",revision:null},{url:"/js/179.5b34e27a.js",revision:null},{url:"/js/225.d74cfb8c.js",revision:null},{url:"/js/291.30129672.js",revision:null},{url:"/js/343.32cba0ba.js",revision:null},{url:"/js/375.cbf594c6.js",revision:null},{url:"/js/407.970952f5.js",revision:null},{url:"/js/414.64176ebb.js",revision:null},{url:"/js/427.ad338751.js",revision:null},{url:"/js/437.6b719341.js",revision:null},{url:"/js/478.4839511b.js",revision:null},{url:"/js/501.f2b9df20.js",revision:null},{url:"/js/619.98189253.js",revision:null},{url:"/js/749.f21fca91.js",revision:null},{url:"/js/807.16a60700.js",revision:null},{url:"/js/910.8ab9c0a5.js",revision:null},{url:"/js/946.14710cb0.js",revision:null},{url:"/js/947.31c81967.js",revision:null},{url:"/js/app.5aa061d9.js",revision:null},{url:"/js/chunk-vendors.9eeefe56.js",revision:null},{url:"/logo.png",revision:"a0382c4c340040dc7109c01bcd8529bd"},{url:"/manifest.json",revision:"dd1a3041496719648ba4e0e76f1025c4"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{}),s.registerRoute(/^https:\/\/my-api\/.*/,new s.NetworkFirst({cacheName:"api-cache",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/,new s.CacheFirst({cacheName:"image-cache",plugins:[new s.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
