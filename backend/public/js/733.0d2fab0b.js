"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[733],{8733:function(e,s,a){a.r(s),a.d(s,{default:function(){return b}});var r=a(6768),t=a(4232);const o={class:"container mt-5 text-center"},l={class:"card p-4 bg-dark text-white"},i={class:"mb-3"},n={class:"mb-3"},d={key:0,class:"alert alert-danger mt-3"};function c(e,s,a,c,m,u){const p=(0,r.g2)("Field"),g=(0,r.g2)("ErrorMessage"),b=(0,r.g2)("Form"),h=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",o,[(0,r.Lk)("div",l,[s[7]||(s[7]=(0,r.Lk)("h2",{class:"mb-4"},"Connexion",-1)),(0,r.bF)(b,{onSubmit:u.login},{default:(0,r.k6)((()=>[(0,r.Lk)("div",i,[s[2]||(s[2]=(0,r.Lk)("label",{for:"email",class:"form-label"},"Adresse mail",-1)),(0,r.bF)(p,{id:"email",name:"email",type:"email",class:"form-control",modelValue:m.email,"onUpdate:modelValue":s[0]||(s[0]=e=>m.email=e),rules:"required|email"},null,8,["modelValue"]),(0,r.bF)(g,{name:"email",class:"text-danger"})]),(0,r.Lk)("div",n,[s[3]||(s[3]=(0,r.Lk)("label",{for:"password",class:"form-label"},"Mot de passe",-1)),(0,r.bF)(p,{id:"password",name:"password",type:"password",class:"form-control",modelValue:m.password,"onUpdate:modelValue":s[1]||(s[1]=e=>m.password=e),rules:"required"},null,8,["modelValue"]),(0,r.bF)(g,{name:"password",class:"text-danger"})]),s[4]||(s[4]=(0,r.Lk)("button",{type:"submit",class:"btn btn-light btn-block mb-3"},"Se connecter",-1)),m.errorMessage?((0,r.uX)(),(0,r.CE)("div",d,(0,t.v_)(m.errorMessage),1)):(0,r.Q3)("",!0)])),_:1},8,["onSubmit"]),(0,r.bF)(h,{to:"/password",class:"text-light"},{default:(0,r.k6)((()=>s[5]||(s[5]=[(0,r.eW)("Mot de passe oublié ?")]))),_:1}),(0,r.bF)(h,{to:"/signup",class:"text-light"},{default:(0,r.k6)((()=>s[6]||(s[6]=[(0,r.eW)("Pas de compte ?")]))),_:1})])])}a(4114);var m=a(6343);(0,m.Km)("required",(e=>!!e||"Veuillez remplir ce champ correctement.")),(0,m.Km)("email",(e=>{const s=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;return!!s.test(e)||"Le format de l'adresse mail est invalide."}));var u={name:"LoginPage",components:{Form:m.lV,Field:m.D0,ErrorMessage:m.Kw},data(){return{email:"",password:"",errorMessage:""}},methods:{async login(){try{const e=await fetch("https://tfe-3483aa964321.herokuapp.com/users/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:this.email,password:this.password})}),s=await e.json();e.ok?(this.$store.dispatch("login"),this.$router.push("/profile")):401===e.status?this.errorMessage="Mot de passe incorrect.":404===e.status?this.errorMessage="Compte non trouvé.":this.errorMessage=s.message||"Échec de la connexion. Veuillez vérifier votre email et votre mot de passe."}catch(e){this.errorMessage="Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard."}}}},p=a(1241);const g=(0,p.A)(u,[["render",c],["__scopeId","data-v-65ecdd12"]]);var b=g}}]);
//# sourceMappingURL=733.0d2fab0b.js.map