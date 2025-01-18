"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[589],{5589:function(e,s,a){a.r(s),a.d(s,{default:function(){return p}});var r=a(6768),t=a(4232);const l={class:"container mt-5 text-center"},i={class:"card p-4 text-white"},n={class:"mb-3"},o={key:0,class:"alert alert-danger mt-3"},c={key:1,class:"alert alert-success mt-3"};function m(e,s,a,m,d,u){const b=(0,r.g2)("Field"),g=(0,r.g2)("ErrorMessage"),p=(0,r.g2)("Form");return(0,r.uX)(),(0,r.CE)("div",l,[(0,r.Lk)("div",i,[s[3]||(s[3]=(0,r.Lk)("h2",{class:"mb-4"},"Mot de passe oublié ?",-1)),(0,r.bF)(p,{onSubmit:u.sendResetLink,class:"resetLink-form"},{default:(0,r.k6)((()=>[(0,r.Lk)("div",n,[s[1]||(s[1]=(0,r.Lk)("label",{for:"email",class:"form-label"},"Adresse mail",-1)),(0,r.bF)(b,{id:"email",name:"email",type:"email",class:"form-control",modelValue:d.email,"onUpdate:modelValue":s[0]||(s[0]=e=>d.email=e),rules:"required|email"},null,8,["modelValue"]),(0,r.bF)(g,{name:"email",class:"text-danger"})]),s[2]||(s[2]=(0,r.Lk)("button",{type:"submit",class:"btn btn-light btn-block mb-3"},"Envoyer un email",-1)),d.errorMessage?((0,r.uX)(),(0,r.CE)("div",o,(0,t.v_)(d.errorMessage),1)):(0,r.Q3)("",!0),d.successMessage?((0,r.uX)(),(0,r.CE)("div",c,(0,t.v_)(d.successMessage),1)):(0,r.Q3)("",!0)])),_:1},8,["onSubmit"])])])}var d=a(6343);(0,d.Km)("required",(e=>!!e||"Veuillez remplir ce champ correctement.")),(0,d.Km)("email",(e=>{const s=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;return!!s.test(e)||"Le format de l'adresse mail est invalide."}));var u={name:"PasswordPage",components:{Form:d.lV,Field:d.D0,ErrorMessage:d.Kw},data(){return{email:"",errorMessage:"",successMessage:""}},methods:{async sendResetLink(){try{const e=await fetch("https://tfe-3483aa964321.herokuapp.com/users/send-reset-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email}),credentials:"include"}),s=await e.json();s.success?this.successMessage="Un email de réinitialisation de mot de passe a été envoyé.":this.errorMessage=s.message||"Erreur lors de l'envoi de l'email de réinitialisation."}catch(e){this.errorMessage="Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard."}}}},b=a(1241);const g=(0,b.A)(u,[["render",m],["__scopeId","data-v-7aa3fbe6"]]);var p=g}}]);
//# sourceMappingURL=589.01ec32b2.js.map