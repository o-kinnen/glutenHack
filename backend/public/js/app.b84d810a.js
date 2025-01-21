(function(){"use strict";var e={3881:function(e,t,n){var r=n(5130),o=n(6768);const a={id:"app"},i={class:"main-content"};function c(e,t,n,r,c,u){const s=(0,o.g2)("HeaderPage"),l=(0,o.g2)("router-view"),d=(0,o.g2)("FooterPage");return(0,o.uX)(),(0,o.CE)("div",a,[(0,o.bF)(s),(0,o.Lk)("div",i,[(0,o.bF)(l)]),(0,o.bF)(d)])}var u=n.p+"img/logo.1b0cc06b.png";const s={key:0,class:"sidebar"},l={key:1,class:"navbar navbar-expand-lg navbar-light background-nav"},d={class:"container-fluid"},f={class:"collapse navbar-collapse",id:"navbarNav"},p={class:"navbar-nav ms-auto mb-2 mb-lg-0"},h={class:"nav-item"},m={class:"nav-item"};function b(e,t,n,r,a,i){const c=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("header",null,[e.isAuthenticated?((0,o.uX)(),(0,o.CE)("nav",s,[t[7]||(t[7]=(0,o.Lk)("img",{src:u,style:{width:"30px",display:"block",margin:"0 auto"},alt:"Logo du site",class:"logo"},null,-1)),t[8]||(t[8]=(0,o.Lk)("h5",{class:"site-name text-center"},"CookAller",-1)),(0,o.Lk)("ul",null,[(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/recipe"},{default:(0,o.k6)((()=>t[0]||(t[0]=[(0,o.eW)("Générer une recette")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/my-recipes"},{default:(0,o.k6)((()=>t[1]||(t[1]=[(0,o.eW)("Mes recettes")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/recipes"},{default:(0,o.k6)((()=>t[2]||(t[2]=[(0,o.eW)("Toutes les recettes")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/grocery"},{default:(0,o.k6)((()=>t[3]||(t[3]=[(0,o.eW)("Liste des courses")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/ingredients"},{default:(0,o.k6)((()=>t[4]||(t[4]=[(0,o.eW)("Mes ingrédients")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/analyse"},{default:(0,o.k6)((()=>t[5]||(t[5]=[(0,o.eW)("Analyse des aliments")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(c,{to:"/profile"},{default:(0,o.k6)((()=>t[6]||(t[6]=[(0,o.eW)("Profil")]))),_:1})])])])):((0,o.uX)(),(0,o.CE)("nav",l,[(0,o.Lk)("div",d,[t[12]||(t[12]=(0,o.Lk)("img",{src:u,style:{width:"30px",display:"block",margin:"0 auto"},alt:"Logo du site",class:"logo"},null,-1)),(0,o.bF)(c,{class:"navbar-brand",to:"/"},{default:(0,o.k6)((()=>t[9]||(t[9]=[(0,o.Lk)("h5",{class:"site-name text-center"},"CookAller",-1)]))),_:1}),(0,o.Lk)("div",f,[(0,o.Lk)("ul",p,[(0,o.Lk)("li",h,[(0,o.bF)(c,{to:"/signup",class:"nav-link"},{default:(0,o.k6)((()=>t[10]||(t[10]=[(0,o.eW)("Créer un compte")]))),_:1})]),(0,o.Lk)("li",m,[(0,o.bF)(c,{to:"/login",class:"nav-link"},{default:(0,o.k6)((()=>t[11]||(t[11]=[(0,o.eW)("Se connecter")]))),_:1})])])])])]))])}var g=n(782),v={name:"HeaderPage",computed:{...(0,g.aH)(["isAuthenticated"])}},k=n(1241);const y=(0,k.A)(v,[["render",b]]);var A=y;const P={class:"text-center"};function w(e,t,n,r,a,i){const c=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("footer",null,[(0,o.Lk)("div",P,[(0,o.bF)(c,{class:"footer",to:"/terms"},{default:(0,o.k6)((()=>t[0]||(t[0]=[(0,o.eW)("Conditions d'utilisation")]))),_:1}),t[1]||(t[1]=(0,o.Lk)("p",null,"© 2024 CookAller",-1))])])}var L={name:"FooterPage"};const C=(0,k.A)(L,[["render",w]]);var F=C,O={name:"App",components:{HeaderPage:A,FooterPage:F}};const _=(0,k.A)(O,[["render",c]]);var E=_,j=n(1387);const N=(0,g.y$)({state:{isAuthenticated:!1},mutations:{setAuthenticated(e,t){e.isAuthenticated=t}},actions:{login({commit:e}){e("setAuthenticated",!0)},logout({commit:e}){e("setAuthenticated",!1)},async checkAuthentication({commit:e}){try{const t=await fetch("https://tfe-3483aa964321.herokuapp.com/users/check-auth",{method:"GET",credentials:"include"});t.ok?e("setAuthenticated",!0):e("setAuthenticated",!1)}catch(t){e("setAuthenticated",!1),console.error("Failed to check authentication:",t)}}},getters:{isAuthenticated:e=>e.isAuthenticated}});var x=N;const S=[{path:"/",name:"HomePage",component:()=>n.e(209).then(n.bind(n,9209))},{path:"/signup",name:"SignupPage",component:()=>Promise.all([n.e(343),n.e(967)]).then(n.bind(n,967))},{path:"/terms",name:"TermsOfService",component:()=>n.e(494).then(n.bind(n,2494))},{path:"/profile",name:"ProfilePage",component:()=>n.e(548).then(n.bind(n,9167)),meta:{requiresAuth:!0}},{path:"/login",name:"LoginPage",component:()=>Promise.all([n.e(343),n.e(329)]).then(n.bind(n,8329))},{path:"/password",name:"PasswordPage",component:()=>Promise.all([n.e(343),n.e(589)]).then(n.bind(n,5589))},{path:"/reset-password",name:"ResetPassword",component:()=>Promise.all([n.e(343),n.e(649)]).then(n.bind(n,3649))},{path:"/recipe",name:"RecipePage",component:()=>n.e(734).then(n.bind(n,8734)),meta:{requiresAuth:!0}},{path:"/recipes",name:"AllRecipesPage",component:()=>Promise.all([n.e(749),n.e(496)]).then(n.bind(n,3496)),meta:{requiresAuth:!0}},{path:"/analyse",name:"AnalysePage",component:()=>n.e(642).then(n.bind(n,4642)),meta:{requiresAuth:!0}},{path:"/grocery",name:"GroceryList",component:()=>n.e(540).then(n.bind(n,2540)),meta:{requiresAuth:!0}},{path:"/my-recipes",name:"MyRecipesPage",component:()=>Promise.all([n.e(749),n.e(312)]).then(n.bind(n,8312)),meta:{requiresAuth:!0}},{path:"/ingredients",name:"IngredientsPage",component:()=>n.e(588).then(n.bind(n,4588)),meta:{requiresAuth:!0}}],T=(0,j.aE)({history:(0,j.LA)("/"),routes:S});T.beforeEach((async(e,t,n)=>{if(e.matched.some((e=>e.meta.requiresAuth))){await x.dispatch("checkAuthentication");const e=x.getters.isAuthenticated;e?n():n("/login")}else n()}));var q=T,W=n(4373),M=n(4458);(0,M.k)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),confirm("Nouvelle version disponible. Voulez-vous rafraîchir pour mettre à jour ?")&&window.location.reload()},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});n(8077);W.A.defaults.withCredentials=!0,(0,r.Ef)(E).use(q).use(x).mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var c=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(c=!1,a<i&&(i=a));if(c){e.splice(l--,1);var s=o();void 0!==s&&(t=s)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var a=Object.create(null);n.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var c=2&o&&r;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((function(e){i[e]=function(){return r[e]}}));return i["default"]=function(){return r},n.d(a,i),a}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{125:"27f3abfe",179:"5b34e27a",209:"8299eb65",312:"9d6595f4",329:"9cc98bc0",343:"49bfab74",427:"ad338751",494:"852cdb12",496:"9b2a0a52",540:"05cd62a3",548:"582afbe8",588:"d2561686",589:"01ec32b2",642:"3b01ceb5",649:"dd032268",734:"85b76dbc",749:"f21fca91",967:"cdac38a0"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{312:"4b2b3b89",329:"21be943a",496:"43de8940",540:"37de5df2",548:"a7d401b4",588:"195cd558",589:"c85f7ffb",642:"f582ff1c",649:"c2a9c73b",734:"c80c764a",967:"2497ea52"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="frontend:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var c,u;if(void 0!==a)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var d=s[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){c=d;break}}c||(u=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+a),c.src=r),e[r]=[o];var f=function(t,n){c.onerror=c.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),u&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,a){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",n.nc&&(i.nonce=n.nc);var c=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var r=n&&n.type,c=n&&n.target&&n.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+c+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=r,u.request=c,i.parentNode&&i.parentNode.removeChild(i),a(u)}};return i.onerror=i.onload=c,i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),c=n.p+i;if(t(i,c))return o();e(r,c,null,o,a)}))},o={524:0};n.f.miniCss=function(e,t){var n={312:1,329:1,496:1,540:1,548:1,588:1,589:1,642:1,649:1,734:1,967:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),c=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,o[1](c)}};n.l(i,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],c=r[1],u=r[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(u)var l=u(n)}for(t&&t(r);s<i.length;s++)a=i[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(3881)}));r=n.O(r)})();
//# sourceMappingURL=app.b84d810a.js.map