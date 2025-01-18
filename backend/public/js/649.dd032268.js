"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[649],{3649:function(e,s,a){a.r(s),a.d(s,{default:function(){return g}});var r=a(6768),t=a(4232);const o={class:"container mt-5"},n={class:"row justify-content-center"},i={class:"col-md-6"},c={class:"card p-4 text-white"},d={class:"mb-3"},l={class:"mb-3"},u={key:1,class:"alert alert-danger mt-3"},m={key:2,class:"alert alert-success mt-3"},p={key:3,class:"alert alert-danger mt-3"};function w(e,s,a,w,f,h){const k=(0,r.g2)("Field"),v=(0,r.g2)("ErrorMessage"),g=(0,r.g2)("Form");return(0,r.uX)(),(0,r.CE)("div",o,[(0,r.Lk)("div",n,[(0,r.Lk)("div",i,[(0,r.Lk)("div",c,[s[5]||(s[5]=(0,r.Lk)("h2",{class:"mb-4 text-center"},"Réinitialiser le mot de passe",-1)),f.tokenValid?((0,r.uX)(),(0,r.Wv)(g,{key:0,onSubmit:h.resetPassword,class:"resetPassword-form"},{default:(0,r.k6)((()=>[(0,r.Lk)("div",d,[s[2]||(s[2]=(0,r.Lk)("label",{for:"password",class:"form-label"},"Mot de passe",-1)),(0,r.bF)(k,{id:"password",name:"password",type:"password",class:"form-control",modelValue:f.password,"onUpdate:modelValue":s[0]||(s[0]=e=>f.password=e),rules:"required|min:8|passwordUppercase|passwordLowercase|passwordNumber|passwordSpecial|noSpaces"},null,8,["modelValue"]),(0,r.bF)(v,{name:"password",class:"text-danger"})]),(0,r.Lk)("div",l,[s[3]||(s[3]=(0,r.Lk)("label",{for:"confirmPassword",class:"form-label"},"Répéter le mot de passe",-1)),(0,r.bF)(k,{id:"confirmPassword",name:"confirmPassword",type:"password",class:"form-control",modelValue:f.confirmPassword,"onUpdate:modelValue":s[1]||(s[1]=e=>f.confirmPassword=e),rules:"required|matches:password"},null,8,["modelValue"]),(0,r.bF)(v,{name:"confirmPassword",class:"text-danger"})]),s[4]||(s[4]=(0,r.Lk)("button",{type:"submit",class:"btn btn-primary w-100"},"Réinitialiser le mot de passe",-1))])),_:1},8,["onSubmit"])):(0,r.Q3)("",!0),f.errorMessage?((0,r.uX)(),(0,r.CE)("div",u,(0,t.v_)(f.errorMessage),1)):(0,r.Q3)("",!0),f.successMessage?((0,r.uX)(),(0,r.CE)("div",m,(0,t.v_)(f.successMessage),1)):(0,r.Q3)("",!0),f.tokenValid||f.successMessage?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",p," Le lien de réinitialisation est invalide ou a expiré. "))])])])])}a(4114);var f=a(6343);(0,f.Km)("required",(e=>!!e||"Veuillez remplir ce champ correctement.")),(0,f.Km)("min",((e,[s])=>!(e&&e.length<s)||`Veuillez remplir ce champ avec au moins ${s} caractères.`)),(0,f.Km)("matches",((e,[s],a)=>e===a.form[s]||"Les mots de passe ne correspondent pas.")),(0,f.Km)("passwordUppercase",(e=>/[A-Z]/.test(e)||"Le mot de passe doit contenir au moins une lettre majuscule.")),(0,f.Km)("passwordLowercase",(e=>/[a-z]/.test(e)||"Le mot de passe doit contenir au moins une lettre minuscule.")),(0,f.Km)("passwordNumber",(e=>/[0-9]/.test(e)||"Le mot de passe doit contenir au moins un chiffre.")),(0,f.Km)("passwordSpecial",(e=>/[!@#$%^&*(),.?":{}|<>]/.test(e)||"Le mot de passe doit contenir au moins un caractère spécial.")),(0,f.Km)("noSpaces",(e=>!/\s/.test(e)||"Le mot de passe ne doit pas contenir d'espaces."));var h={name:"ResetPassword",components:{Form:f.lV,Field:f.D0,ErrorMessage:f.Kw},data(){return{password:"",confirmPassword:"",errorMessage:"",successMessage:"",token:this.$route.query.token,tokenValid:!1}},async created(){try{const e=await fetch(`https://tfe-3483aa964321.herokuapp.com/users/verify-reset-token?token=${this.token}`),s=await e.json();s.success?this.tokenValid=!0:this.errorMessage=s.message||"Le lien de réinitialisation est invalide ou a expiré."}catch(e){this.errorMessage="Erreur lors de la vérification du token. Veuillez réessayer plus tard."}},methods:{async resetPassword(){try{const e=await fetch("https://tfe-3483aa964321.herokuapp.com/users/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:this.token,newPassword:this.password}),credentials:"include"}),s=await e.json();s.success?(this.successMessage="Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.",setTimeout((()=>{this.$router.push("/login")}),1500)):this.errorMessage=s.message||"Erreur lors de la réinitialisation du mot de passe."}catch(e){this.errorMessage="Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard."}}}},k=a(1241);const v=(0,k.A)(h,[["render",w],["__scopeId","data-v-4931e520"]]);var g=v}}]);
//# sourceMappingURL=649.dd032268.js.map