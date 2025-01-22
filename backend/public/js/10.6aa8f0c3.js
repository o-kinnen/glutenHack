"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[10],{9010:function(e,t,i){i.r(t),i.d(t,{default:function(){return D}});var a=i(6768),n=i(5130),s=i(4232);const l={class:"container"},r={class:"card p-4 text-white"},o={class:"input-text"},d=["disabled"],u={class:"input-container"},c=["disabled"],p=["disabled"],h={class:"modal-actions-icons"},g={class:"upload-container"},m={key:0,class:"image-preview"},y=["src"],k=["disabled"],v={class:"search-container"},w={key:0,class:"empty-message"},L={key:1,class:"overlay"},f={key:2,class:"modal-overlay"},b={class:"modal-content"},C={key:0,class:"analysis-results"},q={class:"analysis-grid"},I=["onUpdate:modelValue"],E=["onUpdate:modelValue"],U={key:0,class:"error-message"},F=["onUpdate:modelValue"],Q={class:"ingredient-list"},$={class:"ingredient-info"},A={class:"ingredient-quantity"},V={class:"ingredient-actions"},j=["onUpdate:modelValue"],M={class:"modal-actions-icons"},X=["onClick"],R=["onClick"],x=["onClick"];function z(e,t,i,z,_,N){return(0,a.uX)(),(0,a.CE)("div",l,[(0,a.Lk)("div",r,[t[18]||(t[18]=(0,a.Lk)("h1",null,"Ingrédients en stock ",-1)),t[19]||(t[19]=(0,a.Lk)("p",null,"Entrez un ingrédient pour l'ajouter à votre stock.",-1)),(0,a.Lk)("div",o,[(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>_.newIngredient=e),placeholder:"Ingrédient",disabled:_.isLoading},null,8,d),[[n.Jo,_.newIngredient]])]),(0,a.Lk)("div",u,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>_.newQuantity=e),type:"number",min:"1",placeholder:"Quantité",disabled:_.isLoading,class:"quantity-input"},null,8,c),[[n.Jo,_.newQuantity]]),(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":t[2]||(t[2]=e=>_.newUnit=e),disabled:_.isLoading},t[9]||(t[9]=[(0,a.Fv)('<option value="" data-v-b68a12c0>Unités</option><option value="g" data-v-b68a12c0>g</option><option value="kg" data-v-b68a12c0>kg</option><option value="ml" data-v-b68a12c0>ml</option><option value="l" data-v-b68a12c0>l</option>',5)]),8,p),[[n.u1,_.newUnit]]),(0,a.Lk)("div",h,[(0,a.Lk)("i",{class:"bi bi-plus-circle-fill icon-action",onClick:t[3]||(t[3]=(...e)=>N.addIngredient&&N.addIngredient(...e)),title:"Ajouter"})])]),(0,a.Lk)("div",g,[t[10]||(t[10]=(0,a.Lk)("h5",null,"Uploader une photo :",-1)),(0,a.Lk)("input",{type:"file",onChange:t[4]||(t[4]=(...e)=>N.onFileChange&&N.onFileChange(...e)),accept:"image/*"},null,32),_.imageUrl?((0,a.uX)(),(0,a.CE)("div",m,[(0,a.Lk)("img",{src:_.imageUrl,alt:"Aperçu de l'image"},null,8,y)])):(0,a.Q3)("",!0)]),(0,a.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>N.analyzeImage&&N.analyzeImage(...e)),disabled:!_.imageFile||_.isLoading,class:"analyze-button"},"Analyser",8,k),(0,a.Lk)("div",v,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t[6]||(t[6]=e=>_.searchIngredient=e),placeholder:"Rechercher"},null,512),[[n.Jo,_.searchIngredient]])]),t[20]||(t[20]=(0,a.Lk)("br",null,null,-1)),0===_.ingredients.length?((0,a.uX)(),(0,a.CE)("div",w," La liste des ingrédients est vide... ")):(0,a.Q3)("",!0),_.isLoading?((0,a.uX)(),(0,a.CE)("div",L,t[11]||(t[11]=[(0,a.Lk)("div",{class:"spinner-container"},[(0,a.Lk)("div",{class:"spinner"})],-1)]))):(0,a.Q3)("",!0),_.showModal?((0,a.uX)(),(0,a.CE)("div",f,[(0,a.Lk)("div",b,[(0,a.Lk)("button",{class:"close-btn",onClick:t[7]||(t[7]=(...e)=>N.closeModal&&N.closeModal(...e))},"X"),_.analysisResult.length>0?((0,a.uX)(),(0,a.CE)("div",C,[t[14]||(t[14]=(0,a.Lk)("h5",null,"Résultats de l'analyse :",-1)),(0,a.Lk)("div",q,[t[13]||(t[13]=(0,a.Lk)("div",{class:"grid-header"},[(0,a.Lk)("span",null,"Sélection"),(0,a.Lk)("span",null,"Aliment"),(0,a.Lk)("span",null,"Probabilité"),(0,a.Lk)("span",null,"Quantité"),(0,a.Lk)("span",null,"Unités")],-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(_.analysisResult,((e,i)=>((0,a.uX)(),(0,a.CE)("div",{key:i,class:"grid-row"},[(0,a.bo)((0,a.Lk)("input",{type:"checkbox","onUpdate:modelValue":t=>e.selected=t},null,8,I),[[n.lH,e.selected]]),(0,a.Lk)("span",null,(0,s.v_)(e.name),1),(0,a.Lk)("span",null,(0,s.v_)((100*e.probability).toFixed(2))+"%",1),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t=>e.quantity=t,type:"number",min:"1",placeholder:"Quantité",class:(0,s.C4)(["quantity-input",{error:e.selected&&(!e.quantity||parseFloat(e.quantity)<=0)}])},null,10,E),[[n.Jo,e.quantity]]),_.errorMessage?((0,a.uX)(),(0,a.CE)("div",U,(0,s.v_)(_.errorMessage),1)):(0,a.Q3)("",!0),(0,a.bo)((0,a.Lk)("select",{"onUpdate:modelValue":t=>e.unit=t,class:"unit-select"},t[12]||(t[12]=[(0,a.Fv)('<option value="" data-v-b68a12c0>Unités</option><option value="g" data-v-b68a12c0>g</option><option value="ml" data-v-b68a12c0>ml</option><option value="kg" data-v-b68a12c0>kg</option><option value="l" data-v-b68a12c0>l</option>',5)]),8,F),[[n.u1,e.unit]])])))),128))]),(0,a.Lk)("button",{onClick:t[8]||(t[8]=(...e)=>N.validateSelection&&N.validateSelection(...e)),class:"button align-center"},"Ajouter")])):(0,a.Q3)("",!0)])])):(0,a.Q3)("",!0),(0,a.Lk)("div",Q,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(N.filteredIngredients,((e,i)=>((0,a.uX)(),(0,a.CE)("div",{key:i,class:"ingredient-item"},[(0,a.Lk)("div",$,[(0,a.Lk)("strong",null,(0,s.v_)(e.name),1),(0,a.Lk)("div",A,[(0,a.Lk)("strong",null,"("+(0,s.v_)(e.quantity)+")",1)])]),(0,a.Lk)("div",V,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t=>e.updateQuantity=t,type:"number",min:"1",placeholder:"Quantité",class:"quantity-input"},null,8,j),[[n.Jo,e.updateQuantity,void 0,{number:!0}]]),(0,a.Lk)("div",M,[(0,a.Lk)("i",{class:"bi bi-plus-circle-fill icon-action",onClick:t=>N.updateIngredientQuantity(i,e.name,e.updateQuantity,"add"),title:"Ajouter"},null,8,X),t[15]||(t[15]=(0,a.Lk)("span",{class:"tooltip-text"},"Ajouter",-1)),(0,a.Lk)("i",{class:"bi bi-dash-circle-fill icon-action",onClick:t=>N.updateIngredientQuantity(i,e.name,e.updateQuantity,"subtract"),title:"Diminuer"},null,8,R),t[16]||(t[16]=(0,a.Lk)("span",{class:"tooltip-text"},"Diminuer",-1)),(0,a.Lk)("i",{class:"bi bi-trash-fill icon-action",onClick:t=>N.removeIngredient(i,e.name),title:"Supprimer"},null,8,x),t[17]||(t[17]=(0,a.Lk)("span",{class:"tooltip-text"},"Supprimer",-1))])])])))),128))])])])}i(4114),i(4603),i(7566),i(8721);var _=i(4373),N={name:"IngredientsPage.vue",data(){return{newIngredient:"",newQuantity:"",newUnit:"",searchIngredient:"",ingredients:[],imageFile:null,imageUrl:"",analysisResult:[],isLoading:!1,errorMessage:"",showModal:!1}},computed:{filteredIngredients(){let e=this.ingredients;return""!==this.searchIngredient.trim()&&(e=e.filter((e=>e.name.toLowerCase().includes(this.searchIngredient.trim().toLowerCase())))),e}},created(){this.fetchIngredientsFromFridge()},methods:{handleError(e,t){this.errorMessage=t},onFileChange(e){const t=e.target.files[0];t&&(this.imageFile=t,this.imageUrl=URL.createObjectURL(t))},async analyzeImage(){if(!this.imageFile)return;const e=new FormData;e.append("image",this.imageFile);try{this.isLoading=!0;const t=await _.A.post("https://www.cookaller.com/users/analyzeImage",e,{headers:{"Content-Type":"multipart/form-data"}});t.data&&t.data.data?this.analysisResult=t.data.data.map((e=>({...e,selected:!1,quantity:"",unit:""}))):(this.analysisResult=[],alert("Aucun ingrédient trouvé dans l'image.")),this.showModal=!0}catch(t){this.handleError(t,"Erreur lors de l'analyse de l'image"),alert("Une erreur est survenue lors de l'analyse de l'image.")}finally{this.isLoading=!1}},async validateSelection(){this.showModal=!1;const e=this.analysisResult.filter((e=>e.selected&&e.quantity)),t=e.filter((e=>!e.quantity||parseFloat(e.quantity)<=0));if(t.length>0)this.errorMessage="Veuillez indiquer une quantité valide pour tous les ingrédients sélectionnés.";else{this.errorMessage="";for(const t of e){const e=this.ingredients.findIndex((e=>e.name.toLowerCase()===t.name.toLowerCase()&&e.quantity.includes(t.unit)));if(-1!==e){const a=this.ingredients[e],n=a.quantity,s=n.match(/^([\d.]+)\s*(.*)$/);if(s){const a=parseFloat(s[1]),n=s[2],l=a+parseFloat(t.quantity);this.ingredients[e].quantity=`${l} ${n}`.trim();try{await _.A.put("https://www.cookaller.com/users/fridge/update",{foodName:t.name,quantity:l,unit:n},{withCredentials:!0})}catch(i){this.handleError(i,`Erreur lors de la mise à jour de ${t.name} dans la base de données`)}}}else{this.ingredients.push({name:t.name,quantity:`${t.quantity} ${t.unit}`.trim(),category:"ajoutés",updateQuantity:0});try{await _.A.post("https://www.cookaller.com/users/fridge/add",{foodName:t.name,quantity:`${t.quantity} ${t.unit}`.trim()},{withCredentials:!0})}catch(i){this.handleError(i,`Erreur lors de l'ajout de ${t.name} dans la base de données`)}}}this.analysisResult=[],this.$emit("ingredients-updated",this.ingredients)}},async fetchIngredientsFromFridge(){try{this.isLoading=!0;const e=await _.A.get("https://www.cookaller.com/users/fridge",{withCredentials:!0});this.ingredients=e.data.map((e=>({name:e.food_name,quantity:e.quantity,category:e.category||"autres",updateQuantity:0})))}catch(e){this.handleError(e,"Erreur lors de la récupération des ingrédients")}finally{this.isLoading=!1}},async addIngredient(){const e=this.newIngredient.trim();let t=e;if(/\d/.test(t))alert("Le nom de l'ingrédient ne peut pas contenir de chiffres. Veuillez entrer un aliment valide.");else{if(t){const e=this.ingredients.findIndex((e=>e.name===t&&e.quantity.includes(this.newUnit)));if(-1!==e){const a=this.ingredients[e],n=a.quantity,s=n.match(/^([\d.]+)\s*(.*)$/);if(!s)return void alert("Impossible de traiter la quantité actuelle.");const l=parseFloat(s[1]),r=s[2],o=parseFloat(this.newQuantity)||1,d=l+o;try{const i=await _.A.put("https://www.cookaller.com/users/fridge/update",{foodName:t,quantity:d,unit:r},{withCredentials:!0});if(200!==i.status)throw new Error("Erreur lors de la mise à jour de l'aliment dans le réfrigérateur de l'utilisateur.");this.ingredients[e].quantity=`${d} ${r}`.trim()}catch(i){return void this.handleError(i,"Erreur lors de la mise à jour de l'aliment")}}else try{const e=await _.A.post("https://www.cookaller.com/users/fridge/add",{foodName:t,quantity:`${this.newQuantity||1} ${this.newUnit}`.trim()},{withCredentials:!0});if(200!==e.status)throw new Error("Erreur lors de l'ajout de l'aliment dans le réfrigérateur de l'utilisateur.");await this.fetchIngredientsFromFridge()}catch(i){i.response&&404===i.response.status?alert("L'aliment n'est pas encore dans la base de données."):this.handleError(i,"Erreur lors de l'ajout de l'aliment")}}this.newIngredient="",this.newQuantity="",this.newUnit="",this.$emit("ingredients-updated",this.ingredients)}},async updateIngredientQuantity(e,t,i,a){if(!i||i<=0)return void alert("Veuillez entrer une quantité valide.");const n=this.ingredients[e].quantity,s=n.match(/^([\d.]+)\s*(.*)$/);if(!s)return void alert("Impossible de traiter la quantité actuelle.");const l=parseFloat(s[1]),r=s[2];let o;if("add"===a)o=l+i;else if("subtract"===a&&(o=l-i,o<=0))return void alert("La quantité ne peut pas être inférieure ou égale à zéro.");try{await _.A.put("https://www.cookaller.com/users/fridge/update",{foodName:t,quantity:o,unit:r},{withCredentials:!0}),this.ingredients[e].quantity=`${o} ${r}`.trim()}catch(d){this.handleError(d,"Erreur lors de la mise à jour de l'aliment")}},async removeIngredient(e,t){try{const i=await _.A.delete("https://www.cookaller.com/users/fridge/delete",{params:{foodName:t},withCredentials:!0});if(200!==i.status)throw new Error("Erreur lors de la suppression de l'aliment du réfrigérateur de l'utilisateur.");this.ingredients.splice(e,1),this.$emit("ingredients-updated",this.ingredients)}catch(i){this.handleError(i,"Erreur lors de la suppression de l'aliment")}},closeModal(){this.showModal=!1}}},S=i(1241);const J=(0,S.A)(N,[["render",z],["__scopeId","data-v-b68a12c0"]]);var D=J}}]);
//# sourceMappingURL=10.6aa8f0c3.js.map