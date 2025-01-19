"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[58],{2817:function(e,t,i){i.r(t),i.d(t,{default:function(){return ce}});var s=i(6768),r=i(4232),l=i(5130);const n={class:"container"},c={class:"card p-4 text-white"},a={key:0,class:"no-recipes"},o={key:1,class:"buttons-container"},u={key:2,class:"modal-overlay"},p={class:"modal-content"},d={class:"modal-filters"},g={class:"filter-item"},h={class:"filter-item"},m={class:"filter-item"},k={class:"filter-item"},v={class:"filter-item"},f={class:"filter-item"},L={class:"filter-item"},R={class:"filter-item"},w={class:"filter-item"},y={class:"filter-item"},_={class:"modal-actions"},A={key:3,class:"no-recipes"},b={key:4,class:"no-recipes"},C={key:5,class:"recipes-list"},F={key:0,class:"favorite-icon"},E=["src"],x=["onClick"],I={key:2,class:"attention-warning"},M={key:6,class:"modal-overlay"},U={class:"modal-content-recipe"},P={style:{"text-align":"center"}},X=["src"],j={class:"recipe-info-container"},S={class:"recipe-info-line"},W={class:"info-item"},V={class:"info-item"},$={class:"info-item"},T={class:"recipe-info-line"},D={class:"info-item"},z={class:"info-item"},H={class:"info-item"},N={key:0},Q=["src","alt","title"],O={key:1},K={key:1,style:{"text-align":"center"}},G={key:2,style:{"text-align":"center"}},q={class:"average-rating"},J={class:"rating-container"},B={class:"stars"},Y=["onClick"],Z={class:"modal-actions-icons"};function ee(e,t,i,ee,te,ie){const se=(0,s.g2)("EditRecipe");return(0,s.uX)(),(0,s.CE)("div",n,[(0,s.Lk)("div",c,[t[52]||(t[52]=(0,s.Lk)("h2",null,"Mes recettes",-1)),0===te.recipes.length?((0,s.uX)(),(0,s.CE)("div",a,t[20]||(t[20]=[(0,s.Lk)("p",null,"Aucune recette n'a été enregistrée pour le moment...",-1)]))):((0,s.uX)(),(0,s.CE)("div",o,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=e=>te.showFilterModal=!0),class:"filter-button"}," Allergènes "),(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>ie.toggleFavorites&&ie.toggleFavorites(...e))},(0,r.v_)(te.showFavorites?"Toutes les recettes":"Favoris"),1),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>ie.toggleProfileFilter&&ie.toggleProfileFilter(...e)),class:(0,r.C4)(["profile-button",{active:te.showProfileFilter}])},(0,r.v_)(te.showProfileFilter?"Toutes les recettes":"Mon profil"),3)])),te.showFilterModal?((0,s.uX)(),(0,s.CE)("div",u,[(0,s.Lk)("div",p,[(0,s.Lk)("div",d,[(0,s.Lk)("div",g,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Gluten","onUpdate:modelValue":t[3]||(t[3]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[21]||(t[21]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/gluten.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Gluten ")],-1))])]),(0,s.Lk)("div",h,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Lait","onUpdate:modelValue":t[4]||(t[4]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[22]||(t[22]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/lait.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Lait ")],-1))])]),(0,s.Lk)("div",m,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Oeufs","onUpdate:modelValue":t[5]||(t[5]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[23]||(t[23]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/oeufs.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Oeufs ")],-1))])]),(0,s.Lk)("div",k,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Arachide","onUpdate:modelValue":t[6]||(t[6]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[24]||(t[24]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/arachide.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Arachide ")],-1))])]),(0,s.Lk)("div",v,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Fruits à coque","onUpdate:modelValue":t[7]||(t[7]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[25]||(t[25]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/noix.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Noix ")],-1))])]),(0,s.Lk)("div",f,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Poissons","onUpdate:modelValue":t[8]||(t[8]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[26]||(t[26]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/poissons.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Poissons ")],-1))])]),(0,s.Lk)("div",L,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Soja","onUpdate:modelValue":t[9]||(t[9]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[27]||(t[27]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/soja.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Soja ")],-1))])]),(0,s.Lk)("div",R,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Crustacés","onUpdate:modelValue":t[10]||(t[10]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[28]||(t[28]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/crustacés.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Crustacés ")],-1))])]),(0,s.Lk)("div",w,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Moutarde","onUpdate:modelValue":t[11]||(t[11]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[29]||(t[29]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/moutarde.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Moutarde ")],-1))])]),(0,s.Lk)("div",y,[(0,s.Lk)("label",null,[(0,s.bo)((0,s.Lk)("input",{type:"checkbox",value:"Céleri","onUpdate:modelValue":t[12]||(t[12]=e=>te.selectedAllergens=e)},null,512),[[l.lH,te.selectedAllergens]]),t[30]||(t[30]=(0,s.Lk)("span",{class:"text-and-icon"},[(0,s.Lk)("img",{src:"/img/céleri.png",alt:"Icone",class:"restriction-icon"}),(0,s.eW)(" Céleri ")],-1))])])]),(0,s.Lk)("div",_,[(0,s.Lk)("button",{onClick:t[13]||(t[13]=e=>te.showFilterModal=!1),class:"close-button"},"Fermer")])])])):(0,s.Q3)("",!0),te.showProfileFilter&&0===te.userAllergens.length?((0,s.uX)(),(0,s.CE)("div",A,t[31]||(t[31]=[(0,s.Lk)("p",null,"Seules les recettes sans mention d'allergènes sont affichées car vous n'avez spécifié aucun allergène dans votre profil.",-1)]))):(0,s.Q3)("",!0),te.showFavorites&&0===te.filteredRecipes.length||0===te.filteredRecipes.length&&0!==te.recipes.length?((0,s.uX)(),(0,s.CE)("div",b,t[32]||(t[32]=[(0,s.Lk)("p",null,"Aucune recette trouvée.",-1)]))):((0,s.uX)(),(0,s.CE)("div",C,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(te.filteredRecipes,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.recipe_id,class:"recipe-card"},[(0,s.Lk)("h3",null,(0,r.v_)(e.recipe_name),1),e.isFavorite?((0,s.uX)(),(0,s.CE)("div",F,t[33]||(t[33]=[(0,s.Lk)("i",{class:"bi bi-heart-fill",style:{color:"red"}},null,-1)]))):(0,s.Q3)("",!0),e.image_url?((0,s.uX)(),(0,s.CE)("img",{key:1,src:e.image_url,alt:"Image de la recette",class:"modal-recipe-image"},null,8,E)):(0,s.Q3)("",!0),(0,s.Lk)("button",{onClick:t=>ie.openModal(e)},"Voir les détails",8,x),ie.getMissingAllergens(e).length>0?((0,s.uX)(),(0,s.CE)("div",I,[t[36]||(t[36]=(0,s.Lk)("i",{class:"bi bi-exclamation-triangle-fill"},null,-1)),(0,s.Lk)("p",null,[t[34]||(t[34]=(0,s.eW)(" Ces allergènes ne sont pas pris en compte dans cette recette : ")),(0,s.Lk)("strong",null,(0,r.v_)(ie.getMissingAllergens(e).join(", ")),1),t[35]||(t[35]=(0,s.eW)(". "))])])):(0,s.Q3)("",!0)])))),128))])),te.showModal?((0,s.uX)(),(0,s.CE)("div",M,[(0,s.Lk)("div",U,[(0,s.Lk)("h3",P,(0,r.v_)(te.currentRecipe.recipe_name),1),te.currentRecipe.image_url?((0,s.uX)(),(0,s.CE)("img",{key:0,src:te.currentRecipe.image_url,alt:"Image de la recette",class:"recipe-image"},null,8,X)):(0,s.Q3)("",!0),(0,s.Lk)("div",j,[(0,s.Lk)("div",S,[(0,s.Lk)("div",W,[t[37]||(t[37]=(0,s.Lk)("strong",null,"Préparation:",-1)),t[38]||(t[38]=(0,s.Lk)("br",null,null,-1)),(0,s.eW)(" "+(0,r.v_)(te.currentRecipe.preparation_time),1)]),(0,s.Lk)("div",V,[t[39]||(t[39]=(0,s.Lk)("strong",null,"Difficulté:",-1)),t[40]||(t[40]=(0,s.Lk)("br",null,null,-1)),(0,s.eW)(" "+(0,r.v_)(te.currentRecipe.difficulty),1)]),(0,s.Lk)("div",$,[t[41]||(t[41]=(0,s.Lk)("strong",null,"Part(s):",-1)),t[42]||(t[42]=(0,s.Lk)("br",null,null,-1)),(0,s.eW)(" "+(0,r.v_)(te.currentRecipe.number_of_person),1)])]),(0,s.Lk)("div",T,[(0,s.Lk)("div",D,[t[43]||(t[43]=(0,s.Lk)("strong",null,"Cuisine:",-1)),t[44]||(t[44]=(0,s.Lk)("br",null,null,-1)),(0,s.eW)(" "+(0,r.v_)(te.currentRecipe.cuisine_type),1)]),(0,s.Lk)("div",z,[t[45]||(t[45]=(0,s.Lk)("strong",null,"Type:",-1)),t[46]||(t[46]=(0,s.Lk)("br",null,null,-1)),(0,s.eW)(" "+(0,r.v_)(te.currentRecipe.category_type),1)]),(0,s.Lk)("div",H,[t[47]||(t[47]=(0,s.Lk)("strong",null,"Sans allergène :",-1)),t[48]||(t[48]=(0,s.Lk)("br",null,null,-1)),te.currentRecipe.allergens_list?.length?((0,s.uX)(),(0,s.CE)("span",N,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(te.currentRecipe.allergens_list,((e,t)=>((0,s.uX)(),(0,s.CE)("img",{key:t,src:ie.getAllergenIcon(e),alt:e,title:e,class:"allergen-icon"},null,8,Q)))),128))])):((0,s.uX)(),(0,s.CE)("span",O,"Pas de mention"))])])]),t[50]||(t[50]=(0,s.Lk)("h4",null,"Ingrédients",-1)),(0,s.Lk)("ul",null,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(te.currentRecipe.ingredients,((e,t)=>((0,s.uX)(),(0,s.CE)("li",{key:t},(0,r.v_)(e.quantity)+" "+(0,r.v_)(e.food_name),1)))),128))]),t[51]||(t[51]=(0,s.Lk)("h4",null,"Instructions",-1)),(0,s.Lk)("ol",null,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(ie.formattedInstructionsArray,((e,t)=>((0,s.uX)(),(0,s.CE)("li",{key:t},(0,r.v_)(e),1)))),128))]),0===te.currentRecipe.averageRating?((0,s.uX)(),(0,s.CE)("p",K,"Cette recette n'a pas encore été notée.")):((0,s.uX)(),(0,s.CE)("p",G,"Voici la note reçue de la recette.")),(0,s.Lk)("div",q,[((0,s.uX)(),(0,s.CE)(s.FK,null,(0,s.pI)(5,(e=>(0,s.Lk)("span",{key:e,class:(0,r.C4)(["star",{filled:e<=te.currentRecipe.averageRating}])}," ★ ",2))),64))]),(0,s.Lk)("div",J,[t[49]||(t[49]=(0,s.Lk)("p",{style:{"text-align":"center"}},"Noter la recette ?",-1)),(0,s.Lk)("div",B,[((0,s.uX)(),(0,s.CE)(s.FK,null,(0,s.pI)(5,(e=>(0,s.Lk)("span",{key:e,class:(0,r.C4)(["star",{filled:e<=te.currentRecipe.rating}]),onClick:t=>ie.rateRecipe(e)}," ★ ",10,Y))),64))])]),(0,s.Lk)("div",Z,[(0,s.Lk)("i",{class:(0,r.C4)(["bi bi-heart-fill icon-action",{active:te.isFavorite}]),onClick:t[14]||(t[14]=e=>te.isFavorite?ie.removeFromFavorites():ie.addToFavorites()),title:"Ajouter/Retirer des favoris"},null,2),(0,s.Lk)("i",{class:"bi bi-cart-fill icon-action",onClick:t[15]||(t[15]=(...e)=>ie.addToShoppingList&&ie.addToShoppingList(...e)),title:"Ajouter à la liste des courses"}),(0,s.Lk)("i",{class:"bi bi-file-earmark-pdf-fill icon-action",onClick:t[16]||(t[16]=(...e)=>ie.generatePDF&&ie.generatePDF(...e)),title:"Exporter en PDF"}),(0,s.Lk)("i",{class:"bi bi-pencil icon-action",onClick:t[17]||(t[17]=(...e)=>ie.openEditModal&&ie.openEditModal(...e)),title:"Modifier"}),(0,s.Lk)("i",{class:"bi bi-trash icon-action",onClick:t[18]||(t[18]=(...e)=>ie.confirmDeleteRecipe&&ie.confirmDeleteRecipe(...e)),title:"Suppimer"}),(0,s.Lk)("i",{class:"bi bi-x-lg icon-action",onClick:t[19]||(t[19]=(...e)=>ie.closeModal&&ie.closeModal(...e)),title:"Fermer"})])])])):(0,s.Q3)("",!0),te.showEditModal?((0,s.uX)(),(0,s.Wv)(se,{key:7,mode:"edit",isVisible:te.showEditModal,onClose:ie.closeEditModal,onUpdateRecipe:ie.handleUpdateRecipe,recipe:te.currentRecipe},null,8,["isVisible","onClose","onUpdateRecipe","recipe"])):(0,s.Q3)("",!0)])])}var te=i(4373),ie=i(4062),se=i(1749),re={name:"MyRecipesPage",components:{EditRecipe:ie.A},data(){return{recipes:[],userAllergens:[],filteredRecipes:[],selectedAllergens:[],showModal:!1,showEditModal:!1,showProfileFilter:!1,currentRecipe:null,errorMessage:"",isFavorite:!1,showFavorites:!1,showFilterModal:!1}},computed:{formattedInstructionsArray(){return this.currentRecipe?.instructions?"string"===typeof this.currentRecipe.instructions?this.currentRecipe.instructions.split("\n").filter((e=>""!==e.trim())):Array.isArray(this.currentRecipe.instructions)?this.currentRecipe.instructions.map((e=>"object"===typeof e?e.step:e)):[]:[]}},methods:{toggleFavorites(){this.showFavorites=!this.showFavorites,this.filterRecipes()},toggleProfileFilter(){this.showProfileFilter=!this.showProfileFilter,this.filterRecipes()},getAllergenIcon(e){const t={Gluten:"/img/gluten.png",Lait:"/img/lait.png",Oeufs:"/img/oeufs.png",Arachide:"/img/arachide.png",Noix:"/img/noix.png",Poissons:"/img/poissons.png",Soja:"/img/soja.png","Crustacés":"/img/crustacés.png",Moutarde:"/img/moutarde.png","Céleri":"/img/céleri.png"};return t[e]||"/img/plat.png"},filterRecipes(){this.filteredRecipes=this.recipes.filter((e=>{const t=!this.showFavorites||e.isFavorite,i=this.selectedAllergens.every((t=>e.allergens_list?.includes(t))),s=!this.showProfileFilter||(0===this.userAllergens.length?!e.allergens_list||0===e.allergens_list.length||e.allergens_list.includes("Pas de mention"):this.userAllergens.every((t=>e.allergens_list?.includes(t))));return t&&i&&s}))},async convertImageToBase64(e){return new Promise(((t,i)=>{const s=new Image;s.crossOrigin="Anonymous",s.onload=()=>{const e=document.createElement("canvas");e.width=s.width,e.height=s.height;const i=e.getContext("2d");i.drawImage(s,0,0),t(e.toDataURL("image/png"))},s.onerror=e=>i(e),s.src=e}))},async generatePDF(){if(!this.currentRecipe)return void alert("Aucune recette sélectionnée pour générer le PDF.");const e=new se.uE;let t=10;e.setFontSize(20),e.text(this.currentRecipe.recipe_name,10,t),t+=10,e.setFontSize(12),e.text(`Préparation: ${this.currentRecipe.preparation_time}`,10,t),t+=10,e.text(`Difficulté: ${this.currentRecipe.difficulty}`,10,t),t+=10,e.text(`Part(s): ${this.currentRecipe.number_of_person}`,10,t),t+=10,e.text(`Cuisine: ${this.currentRecipe.cuisine_type}`,10,t),t+=10,e.text(`Type: ${this.currentRecipe.category_type}`,10,t),t+=10;const i=this.currentRecipe.allergens_list?.length?this.currentRecipe.allergens_list.join(", "):"Aucun allergène spécifié.";if(e.text(`Sans allergène: ${i}`,10,t),t+=10,this.currentRecipe.image_url)try{const i=await this.convertImageToBase64(this.currentRecipe.image_url);e.addImage(i,"PNG",10,t,80,80),t+=90}catch(r){console.error("Erreur lors du chargement de l'image :",r)}e.setFontSize(14),e.text("Ingrédients:",10,t),t+=10,e.setFontSize(12),this.currentRecipe.ingredients.forEach((i=>{e.text(`${i.quantity} ${i.food_name}`,10,t),t+=10})),e.setFontSize(14),e.text("Instructions:",10,t),t+=10,e.setFontSize(12);const s=10;this.formattedInstructionsArray.forEach(((i,r)=>{const l=e.splitTextToSize(`${r+1}. ${i}`,190);e.text(l,10,t),t+=l.length*s})),e.save(`${this.currentRecipe.recipe_name}.pdf`)},async rateRecipe(e){try{if(!this.currentRecipe?.recipe_id)throw new Error("Aucune recette sélectionnée.");const t=await te.A.post("https://www.cookaller.com/recipes/rate",{recipeId:this.currentRecipe.recipe_id,rating:e},{withCredentials:!0});alert(t.data.message||"Note enregistrée avec succès."),this.currentRecipe.rating=e,await this.fetchAverageRating(this.currentRecipe.recipe_id)}catch(t){console.error("Erreur lors de l'envoi de la note :",t),alert("Une erreur est survenue lors de l'enregistrement de la note.")}},async fetchAverageRating(e){try{const t=await te.A.get(`https://www.cookaller.com/recipes/rate/average/${e}`,{withCredentials:!0});this.currentRecipe.averageRating=parseFloat(t.data.averageRating)||0}catch(t){console.error("Erreur lors de la récupération de la moyenne des notes :",t),this.currentRecipe.averageRating=0,alert("Impossible de récupérer la moyenne des notes.")}},async fetchUserRecipes(){try{const e=await te.A.get("https://www.cookaller.com/recipes/user",{withCredentials:!0}),t=await te.A.get("https://www.cookaller.com/recipes/favorites",{withCredentials:!0}),i=t.data.map((e=>e.recipe_id));this.recipes=e.data.map((e=>({...e,isFavorite:i.includes(e.recipe_id)}))),this.filterRecipes()}catch(e){console.error("Erreur lors de la récupération des recettes utilisateur :",e),this.errorMessage="Une erreur est survenue lors de la récupération de vos recettes. Veuillez réessayer plus tard."}},async loadUserAllergens(){this.userAllergens=await this.fetchUserAllergens()},async fetchUserAllergens(){try{const e=await te.A.get("https://www.cookaller.com/users/restrictions",{withCredentials:!0});return e.data.restrictions||[]}catch(e){return console.error("Erreur lors de la récupération des restrictions alimentaires :",e),alert("Impossible de récupérer les restrictions alimentaires. Veuillez réessayer."),[]}},getMissingAllergens(e){return this.userAllergens.length?e.allergens_list?this.userAllergens.filter((t=>!e.allergens_list.includes(t))):[...this.userAllergens]:[]},async addToShoppingList(){try{const e=await te.A.post("https://www.cookaller.com/shopping-list/add",{recipeId:this.currentRecipe.recipe_id},{withCredentials:!0});alert(e.data.message)}catch(e){console.error("Erreur lors de l'ajout à la liste des courses:",e),alert("Une erreur est survenue.")}},async deleteRecipe(){try{await te.A.delete(`https://www.cookaller.com/recipes/${this.currentRecipe.recipe_id}`,{withCredentials:!0}),alert("Recette supprimée avec succès."),this.recipes=this.recipes.filter((e=>e.recipe_id!==this.currentRecipe.recipe_id)),this.filterRecipes(),this.closeModal()}catch(e){console.error("Erreur lors de la suppression de la recette :",e),alert("Une erreur est survenue lors de la suppression.")}},async handleUpdateRecipe(e){try{const t=new FormData;t.append("title",e.recipe_name),t.append("time",e.preparation_time),t.append("difficulty",e.difficulty),t.append("people",e.number_of_person),t.append("cuisine",e.cuisine_type),t.append("type",e.category_type),t.append("public",e.public),t.append("ingredients",JSON.stringify(e.ingredients)),t.append("instructions",JSON.stringify(e.instructions)),t.append("restrictionsList",JSON.stringify(e.allergens_list)),e.image&&t.append("image",e.image);const i=await te.A.put(`https://www.cookaller.com/recipes/update/${e.recipe_id}`,t,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});if(200===i.status){alert("Recette mise à jour avec succès"),e.image_url=i.data.updatedRecipe.image_url;const t=this.recipes.findIndex((t=>t.recipe_id===e.recipe_id));-1!==t&&(this.recipes[t]={...this.recipes[t],...e}),this.filterRecipes(),this.updateRecipe(e),this.currentRecipe={...this.currentRecipe,...e},this.updateRecipe(e),this.currentRecipe={...e,instructions:Array.isArray(e.instructions)?e.instructions.map((e=>"object"===typeof e?e.step:e)).join("\n"):e.instructions}}this.closeEditModal()}catch(t){console.error("Erreur lors de la mise à jour de la recette :",t),alert("Une erreur est survenue lors de la mise à jour de la recette.")}},async addToFavorites(){try{if(!this.currentRecipe?.recipe_id)throw new Error("Aucune recette sélectionnée pour ajouter aux favoris.");const e=await te.A.post("https://www.cookaller.com/recipes/favorites/add",{recipeId:this.currentRecipe.recipe_id},{withCredentials:!0});alert(e.data.message||"Recette ajoutée aux favoris avec succès."),this.isFavorite=!0,this.currentRecipe.isFavorite=!0;const t=this.recipes.findIndex((e=>e.recipe_id===this.currentRecipe.recipe_id));-1!==t&&(this.recipes[t].isFavorite=!0),this.filterRecipes()}catch(e){e.response&&409===e.response.status?alert("Cette recette est déjà dans vos favoris."):(console.error("Erreur lors de l'ajout aux favoris :",e),alert("Une erreur est survenue lors de l'ajout aux favoris."))}},async checkIfFavorite(e){try{const t=await te.A.get(`https://www.cookaller.com/recipes/favorites/check/${e}`,{withCredentials:!0});this.isFavorite=t.data.isFavorite}catch(t){console.error("Erreur lors de la vérification du statut des favoris :",t),this.isFavorite=!1}},async removeFromFavorites(){try{if(!this.currentRecipe?.recipe_id)throw new Error("Aucune recette sélectionnée pour retirer des favoris.");const e=await te.A.delete(`https://www.cookaller.com/recipes/favorites/remove/${this.currentRecipe.recipe_id}`,{withCredentials:!0});alert(e.data.message||"Recette retirée des favoris avec succès."),this.isFavorite=!1,this.currentRecipe.isFavorite=!1;const t=this.recipes.findIndex((e=>e.recipe_id===this.currentRecipe.recipe_id));-1!==t&&(this.recipes[t].isFavorite=!1),this.filterRecipes()}catch(e){console.error("Erreur lors du retrait des favoris :",e),alert("Une erreur est survenue lors du retrait des favoris.")}},confirmDeleteRecipe(){confirm("Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.")&&this.deleteRecipe()},async openModal(e){this.currentRecipe={...e,rating:e.rating||0},this.showModal=!0,this.currentRecipe?.recipe_id&&(await this.fetchAverageRating(this.currentRecipe.recipe_id),await this.checkIfFavorite(this.currentRecipe.recipe_id))},closeModal(){this.showModal=!1,this.currentRecipe=null},openEditModal(){this.showEditModal=!0},closeEditModal(){this.showEditModal=!1},updateRecipe(e){const t=this.recipes.findIndex((t=>t.recipe_id===e.recipe_id));if(-1!==t){const i=this.recipes[t];e.image_url=e.image_url||i.image_url,this.recipes[t]={...i,...e}}this.closeEditModal()}},mounted(){this.fetchUserRecipes(),this.loadUserAllergens()},watch:{selectedAllergens:{handler(){this.filterRecipes()},deep:!0},showFavorites:"filterRecipes"}},le=i(1241);const ne=(0,le.A)(re,[["render",ee],["__scopeId","data-v-fc8cd3a8"]]);var ce=ne}}]);
//# sourceMappingURL=58.08bd661a.js.map