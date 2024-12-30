"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[596],{8596:function(e,i,t){t.r(i),t.d(i,{default:function(){return Le}});var n=t(6768),l=t(4232),o=t(5130);const s={class:"recipe-page"},r={class:"filter-buttons"},c={key:0,class:"dropdown"},a=["onClick"],p={key:0,class:"dropdown"},d=["onClick"],u={key:0,class:"dropdown"},k=["onClick"],h={key:0,class:"dropdown"},g=["onClick"],m={key:0,class:"dropdown"},L=["onClick"],y={key:0,class:"loading-spinner"},v={key:1,class:"recipe-container"},f={class:"recipe-card",style:{width:"80vw","max-width":"70%"}},b={class:"recipe-info"},w=["src"],C={class:"modal-content"},D={style:{"text-align":"center"}},E=["src"],I={class:"recipe-info-container"},S={class:"recipe-info-line"},A={class:"info-item"},_={class:"info-item"},R={class:"info-item"},T={class:"info-item"},X={class:"recipe-info-line"},M={class:"info-item"},V={class:"info-item"},U={key:0,class:"info-item"},x={style:{"margin-top":"15px","text-align":"center"}},q=["disabled"],P={class:"modal-content"},F={style:{display:"flex","justify-content":"space-around","margin-top":"20px"}},W={class:"modal-content"},O=["value"];function Q(e,i,t,Q,j,K){const z=(0,n.g2)("EditRecipe"),N=(0,n.g2)("modal");return(0,n.uX)(),(0,n.CE)("div",s,[(0,n.Lk)("button",{onClick:i[0]||(i[0]=(...e)=>K.fetchRecipe&&K.fetchRecipe(...e)),class:"search-recipes-btn"}," Rechercher des recettes avec l'IA "),(0,n.Lk)("button",{onClick:i[1]||(i[1]=(...e)=>K.openEditRecipe&&K.openEditRecipe(...e)),class:"create-recipe-btn"}," Créer une recette manuellement "),(0,n.bF)(z,{isVisible:j.showEditRecipe,onClose:K.closeEditRecipe,onCreateRecipe:K.handleEditRecipe},null,8,["isVisible","onClose","onCreateRecipe"]),(0,n.Lk)("div",r,[(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[2]||(i[2]=(...e)=>K.toggleTimeDropdown&&K.toggleTimeDropdown(...e)),class:"dropdown-btn"}," Temps de préparation : "+(0,l.v_)(j.selectedTime||"Rapide"),1),j.showTimeDropdown?((0,n.uX)(),(0,n.CE)("div",c,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.timeOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectTime(e)},(0,l.v_)(e),9,a)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[3]||(i[3]=(...e)=>K.toggleDifficultyDropdown&&K.toggleDifficultyDropdown(...e)),class:"dropdown-btn"}," Difficulté : "+(0,l.v_)(j.selectedDifficulty||"Facile"),1),j.showDifficultyDropdown?((0,n.uX)(),(0,n.CE)("div",p,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.difficultyOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectDifficulty(e)},(0,l.v_)(e),9,d)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[4]||(i[4]=(...e)=>K.toggleCuisineDropdown&&K.toggleCuisineDropdown(...e)),class:"dropdown-btn"}," Cuisine : "+(0,l.v_)(j.selectedCuisine||"Européenne"),1),j.showCuisineDropdown?((0,n.uX)(),(0,n.CE)("div",u,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.cuisineOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectCuisine(e)},(0,l.v_)(e),9,k)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[5]||(i[5]=(...e)=>K.togglePeopleDropdown&&K.togglePeopleDropdown(...e)),class:"dropdown-btn"}," Nombre de personnes : "+(0,l.v_)(j.selectedPeople||"1"),1),j.showPeopleDropdown?((0,n.uX)(),(0,n.CE)("div",h,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.peopleOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectPeople(e)},(0,l.v_)(e),9,g)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[6]||(i[6]=(...e)=>K.toggleTypeDropdown&&K.toggleTypeDropdown(...e)),class:"dropdown-btn"}," Type : "+(0,l.v_)(j.selectedType||"Petit-déjeuner"),1),j.showTypeDropdown?((0,n.uX)(),(0,n.CE)("div",m,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.typeOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectType(e)},(0,l.v_)(e),9,L)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[7]||(i[7]=(...e)=>K.toggleStockOption&&K.toggleStockOption(...e)),class:"dropdown-btn"}," Inclure les ingrédients en stock : "+(0,l.v_)(j.includeStock?"Oui":"Non"),1)])]),j.isLoading?((0,n.uX)(),(0,n.CE)("div",y," Recherche en cours ... ")):(0,n.Q3)("",!0),j.recipe&&!j.isLoading?((0,n.uX)(),(0,n.CE)("div",v,[(0,n.Lk)("div",f,[(0,n.Lk)("div",b,[(0,n.Lk)("h3",null,(0,l.v_)(j.recipe.title),1),j.recipe.image?((0,n.uX)(),(0,n.CE)("img",{key:0,src:j.recipe.image,alt:"Image de la recette",class:"recipe-image"},null,8,w)):(0,n.Q3)("",!0),i[19]||(i[19]=(0,n.Lk)("img",null,null,-1)),(0,n.Lk)("button",{onClick:i[8]||(i[8]=(...e)=>K.openModal&&K.openModal(...e))},"Voir les détails")])])])):(0,n.Q3)("",!0),j.showModal?((0,n.uX)(),(0,n.Wv)(N,{key:2,onClose:K.closeModal,class:"modal-overlay"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",C,[(0,n.Lk)("h3",D,(0,l.v_)(j.recipe.title),1),j.recipe.image?((0,n.uX)(),(0,n.CE)("img",{key:0,src:j.recipe.image,alt:"Image de la recette",class:"modal-recipe-image"},null,8,E)):(0,n.Q3)("",!0),(0,n.Lk)("div",I,[(0,n.Lk)("div",S,[(0,n.Lk)("div",A,[i[20]||(i[20]=(0,n.Lk)("strong",null,"Généré par l'IA :",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.created_by_ai?"Oui":"Non"),1)]),(0,n.Lk)("div",_,[i[21]||(i[21]=(0,n.Lk)("strong",null,"Temps de préparation:",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.time),1)]),(0,n.Lk)("div",R,[i[22]||(i[22]=(0,n.Lk)("strong",null,"Difficulté:",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.difficulty),1)]),(0,n.Lk)("div",T,[i[23]||(i[23]=(0,n.Lk)("strong",null,"Nombre de personnes:",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.people),1)])]),(0,n.Lk)("div",X,[(0,n.Lk)("div",M,[i[24]||(i[24]=(0,n.Lk)("strong",null,"Cuisine:",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.cuisine),1)]),(0,n.Lk)("div",V,[i[25]||(i[25]=(0,n.Lk)("strong",null,"Type:",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.type),1)]),j.recipe.restrictionsList&&j.recipe.restrictionsList.length?((0,n.uX)(),(0,n.CE)("div",U,[i[26]||(i[26]=(0,n.Lk)("strong",null,"Sans allergène:",-1)),(0,n.eW)(" "+(0,l.v_)(j.recipe.restrictionsList.join(", ")),1)])):(0,n.Q3)("",!0)])]),i[28]||(i[28]=(0,n.Lk)("h4",null,"Ingrédients",-1)),(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.recipe.ingredients,((e,i)=>((0,n.uX)(),(0,n.CE)("li",{key:i},(0,l.v_)(j.recipe.quantity[i])+" "+(0,l.v_)(e),1)))),128))]),i[29]||(i[29]=(0,n.Lk)("h4",null,"Instructions",-1)),(0,n.Lk)("ol",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.recipe.instructions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e},(0,l.v_)(e),1)))),128))]),(0,n.Lk)("div",x,[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox","onUpdate:modelValue":i[9]||(i[9]=e=>j.recipe.public=e)},null,512),[[o.lH,j.recipe.public]]),i[27]||(i[27]=(0,n.eW)("Rendre cette recette publique"))])]),j.recipe?((0,n.uX)(),(0,n.CE)("button",{key:1,onClick:i[10]||(i[10]=(...e)=>K.saveRecipe&&K.saveRecipe(...e)),disabled:j.isSaving||j.isSaved},(0,l.v_)(j.isSaved?"Déjà enregistré":j.isSaving?"Enregistrement...":"Valider la recette"),9,q)):(0,n.Q3)("",!0),(0,n.Lk)("button",{onClick:i[11]||(i[11]=(...e)=>K.closeModal&&K.closeModal(...e))},"Fermer")])])),_:1},8,["onClose"])):(0,n.Q3)("",!0),j.showAllergenAlert?((0,n.uX)(),(0,n.Wv)(N,{key:3,onClose:i[14]||(i[14]=e=>j.showAllergenAlert=!1),class:"modal-overlay"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",P,[i[30]||(i[30]=(0,n.Lk)("h3",{style:{"text-align":"center"}},"Aucun allergène enregistré dans votre profil",-1)),i[31]||(i[31]=(0,n.Lk)("p",{style:{"text-align":"center"}},"Souhaitez-vous continuer ou modifier votre profil ?",-1)),i[32]||(i[32]=(0,n.Lk)("p",{style:{"text-align":"center"}},"Si vous continuez la recette générée par l'IA ne prendra pas en compte vos allergènes",-1)),(0,n.Lk)("div",F,[(0,n.Lk)("button",{onClick:i[12]||(i[12]=(...e)=>K.proceedWithoutAllergens&&K.proceedWithoutAllergens(...e)),class:"confirm-btn"},"Continuer"),(0,n.Lk)("button",{onClick:i[13]||(i[13]=(...e)=>K.redirectToProfile&&K.redirectToProfile(...e)),class:"profile-btn"},"Modifier le profil")])])])),_:1})):(0,n.Q3)("",!0),j.showStockModal?((0,n.uX)(),(0,n.Wv)(N,{key:4,onClose:K.closeStockSelectionModal},{default:(0,n.k6)((()=>[(0,n.Lk)("div",W,[j.availableIngredients.length>0?((0,n.uX)(),(0,n.CE)(n.FK,{key:0},[i[33]||(i[33]=(0,n.Lk)("h3",null,"Sélectionnez les ingrédients à inclure",-1)),(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(j.availableIngredients,((e,t)=>((0,n.uX)(),(0,n.CE)("li",{key:t},[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:e,"onUpdate:modelValue":i[15]||(i[15]=e=>j.selectedIngredients=e)},null,8,O),[[o.lH,j.selectedIngredients]]),(0,n.eW)(" "+(0,l.v_)(e.food_name),1)])])))),128))]),(0,n.Lk)("button",{onClick:i[16]||(i[16]=(...e)=>K.confirmSelection&&K.confirmSelection(...e)),class:"confirm-btn"},"Confirmer")],64)):((0,n.uX)(),(0,n.CE)(n.FK,{key:1},[i[34]||(i[34]=(0,n.Lk)("h3",null,"Votre liste d’ingrédients en stock est vide",-1)),i[35]||(i[35]=(0,n.Lk)("p",null,"Voulez-vous ajouter des ingrédients en stock ? Vous serez redirigé vers la page des ingrédients.",-1)),(0,n.Lk)("button",{onClick:i[17]||(i[17]=e=>K.handleStockModalResponse("add")),class:"confirm-btn"},"Ajouter des ingrédients"),(0,n.Lk)("button",{onClick:i[18]||(i[18]=e=>K.handleStockModalResponse("cancel")),class:"cancel-btn"},"Annuler")],64))])])),_:1},8,["onClose"])):(0,n.Q3)("",!0)])}t(4114),t(7642),t(8004),t(3853),t(5876),t(2475),t(5024),t(1698);const j={class:"modal-content"},K={class:"form-group"},z={class:"form-group"},N={key:0,class:"image-preview"},J=["src"],H={class:"form-group"},$={class:"form-group"},G={class:"form-group"},B={class:"form-group"},Y={class:"form-group"},Z={class:"form-group"},ee=["onUpdate:modelValue"],ie=["onUpdate:modelValue"],te=["onClick"],ne={class:"form-group"},le=["onUpdate:modelValue"],oe=["onClick"],se={class:"form-group"},re={class:"checkbox-group"},ce={class:"form-group"};function ae(e,i,t,l,s,r){return t.isVisible?((0,n.uX)(),(0,n.CE)("div",{key:0,class:"modal-overlay",onClick:i[16]||(i[16]=(0,o.D$)(((...e)=>r.closeModal&&r.closeModal(...e)),["self"]))},[(0,n.Lk)("div",j,[i[37]||(i[37]=(0,n.Lk)("h3",null,"Créer une recette manuellement",-1)),(0,n.Lk)("form",{onSubmit:i[15]||(i[15]=(0,o.D$)(((...e)=>r.handleSubmit&&r.handleSubmit(...e)),["prevent"]))},[(0,n.Lk)("div",K,[i[17]||(i[17]=(0,n.Lk)("label",{for:"recipe-title"},"Titre de la recette",-1)),(0,n.bo)((0,n.Lk)("input",{type:"text",id:"recipe-title","onUpdate:modelValue":i[0]||(i[0]=e=>s.recipe.title=e),required:""},null,512),[[o.Jo,s.recipe.title]])]),(0,n.Lk)("div",z,[i[18]||(i[18]=(0,n.Lk)("label",{for:"recipe-photo"},"Photo de la recette",-1)),(0,n.Lk)("input",{type:"file",id:"recipe-photo",onChange:i[1]||(i[1]=(...e)=>r.handleFileUpload&&r.handleFileUpload(...e))},null,32),s.previewImage?((0,n.uX)(),(0,n.CE)("div",N,[(0,n.Lk)("img",{src:s.previewImage,alt:"Aperçu de l'image"},null,8,J)])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",H,[i[20]||(i[20]=(0,n.Lk)("label",{for:"recipe-preparation-time"},"Temps de préparation",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-preparation-time","onUpdate:modelValue":i[2]||(i[2]=e=>s.recipe.time=e),required:""},i[19]||(i[19]=[(0,n.Lk)("option",{value:"Rapide"},"Rapide",-1),(0,n.Lk)("option",{value:"Moyen"},"Moyen",-1),(0,n.Lk)("option",{value:"Long"},"Long",-1)]),512),[[o.u1,s.recipe.time]])]),(0,n.Lk)("div",$,[i[22]||(i[22]=(0,n.Lk)("label",{for:"recipe-difficulty"},"Difficulté",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-difficulty","onUpdate:modelValue":i[3]||(i[3]=e=>s.recipe.difficulty=e),required:""},i[21]||(i[21]=[(0,n.Lk)("option",{value:"Facile"},"Facile",-1),(0,n.Lk)("option",{value:"Intermédiaire"},"Intermédiaire",-1),(0,n.Lk)("option",{value:"Complexe"},"Complexe",-1)]),512),[[o.u1,s.recipe.difficulty]])]),(0,n.Lk)("div",G,[i[23]||(i[23]=(0,n.Lk)("label",{for:"recipe-people"},"Nombre de personnes",-1)),(0,n.bo)((0,n.Lk)("input",{type:"number",id:"recipe-people","onUpdate:modelValue":i[4]||(i[4]=e=>s.recipe.people=e),min:"1",required:""},null,512),[[o.Jo,s.recipe.people]])]),(0,n.Lk)("div",B,[i[25]||(i[25]=(0,n.Lk)("label",{for:"recipe-cuisine"},"Cuisine",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-cuisine","onUpdate:modelValue":i[5]||(i[5]=e=>s.recipe.cuisine=e),required:""},i[24]||(i[24]=[(0,n.Lk)("option",{value:"Africaine"},"Africaine",-1),(0,n.Lk)("option",{value:"Asiatique"},"Asiatique",-1),(0,n.Lk)("option",{value:"Européenne"},"Européenne",-1),(0,n.Lk)("option",{value:"Américaine"},"Américaine",-1)]),512),[[o.u1,s.recipe.cuisine]])]),(0,n.Lk)("div",Y,[i[27]||(i[27]=(0,n.Lk)("label",{for:"recipe-type"},"Type",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-type","onUpdate:modelValue":i[6]||(i[6]=e=>s.recipe.type=e),required:""},i[26]||(i[26]=[(0,n.Lk)("option",{value:"Petit-déjeuner"},"Petit-déjeuner",-1),(0,n.Lk)("option",{value:"Lunch"},"Lunch",-1),(0,n.Lk)("option",{value:"Dîner"},"Dîner",-1),(0,n.Lk)("option",{value:"Dessert"},"Dessert",-1)]),512),[[o.u1,s.recipe.type]])]),(0,n.Lk)("div",Z,[i[28]||(i[28]=(0,n.Lk)("label",null,"Ingrédients",-1)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(s.recipe.ingredients,((e,i)=>((0,n.uX)(),(0,n.CE)("div",{key:i,class:"ingredient-group"},[(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":i=>e.name=i,placeholder:"Nom de l'ingrédient",required:""},null,8,ee),[[o.Jo,e.name]]),(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":i=>e.quantity=i,placeholder:"Quantité",required:""},null,8,ie),[[o.Jo,e.quantity]]),(0,n.Lk)("button",{type:"button",onClick:e=>r.removeIngredient(i),class:"remove-btn"},"Supprimer",8,te)])))),128)),(0,n.Lk)("button",{type:"button",onClick:i[7]||(i[7]=(...e)=>r.addIngredient&&r.addIngredient(...e)),class:"add-btn"},"Ajouter un ingrédient")]),(0,n.Lk)("div",ne,[i[29]||(i[29]=(0,n.Lk)("label",null,"Instructions",-1)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(s.recipe.instructions,((e,i)=>((0,n.uX)(),(0,n.CE)("div",{key:i,class:"instruction-group"},[(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":i=>e.step=i,placeholder:"Étape d'instruction",required:""},null,8,le),[[o.Jo,e.step]]),(0,n.Lk)("button",{type:"button",onClick:e=>r.removeInstruction(i),class:"remove-btn"},"Supprimer",8,oe)])))),128)),(0,n.Lk)("button",{type:"button",onClick:i[8]||(i[8]=(...e)=>r.addInstruction&&r.addInstruction(...e)),class:"add-btn"},"Ajouter une étape")]),(0,n.Lk)("div",se,[i[34]||(i[34]=(0,n.Lk)("label",null,"Sans allergène",-1)),(0,n.Lk)("div",re,[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Lactose","onUpdate:modelValue":i[9]||(i[9]=e=>s.recipe.restrictionsList=e)},null,512),[[o.lH,s.recipe.restrictionsList]]),i[30]||(i[30]=(0,n.eW)(" Lactose"))]),(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Gluten","onUpdate:modelValue":i[10]||(i[10]=e=>s.recipe.restrictionsList=e)},null,512),[[o.lH,s.recipe.restrictionsList]]),i[31]||(i[31]=(0,n.eW)(" Gluten"))]),(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Arachide","onUpdate:modelValue":i[11]||(i[11]=e=>s.recipe.restrictionsList=e)},null,512),[[o.lH,s.recipe.restrictionsList]]),i[32]||(i[32]=(0,n.eW)(" Arachide"))]),(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Œuf","onUpdate:modelValue":i[12]||(i[12]=e=>s.recipe.restrictionsList=e)},null,512),[[o.lH,s.recipe.restrictionsList]]),i[33]||(i[33]=(0,n.eW)(" Œuf"))])])]),(0,n.Lk)("div",ce,[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox","onUpdate:modelValue":i[13]||(i[13]=e=>s.recipe.public=e)},null,512),[[o.lH,s.recipe.public]]),i[35]||(i[35]=(0,n.eW)(" Rendre cette recette publique "))])]),i[36]||(i[36]=(0,n.Lk)("button",{type:"submit",class:"confirm-btn"},"Créer la recette",-1)),(0,n.Lk)("button",{type:"button",onClick:i[14]||(i[14]=(...e)=>r.closeModal&&r.closeModal(...e)),class:"cancel-btn"},"Annuler")],32)])])):(0,n.Q3)("",!0)}t(4603),t(7566),t(8721);var pe={name:"EditRecipe",props:{isVisible:{type:Boolean,default:!1}},data(){return{recipe:{title:"",time:"",difficulty:"",people:1,cuisine:"",type:"",ingredients:[{name:"",quantity:""}],instructions:[{step:""}],restrictionsList:[],image:null,public:!1,created_by_ai:!1},previewImage:null}},methods:{closeModal(){this.$emit("close")},handleSubmit(){this.$emit("create-recipe",{...this.recipe}),this.closeModal()},handleFileUpload(e){const i=e.target.files[0];i&&(this.recipe.image=i,this.previewImage=URL.createObjectURL(i))},addIngredient(){this.recipe.ingredients.push({name:"",quantity:""})},removeIngredient(e){this.recipe.ingredients.splice(e,1)},addInstruction(){this.recipe.instructions.push({step:""})},removeInstruction(e){this.recipe.instructions.splice(e,1)}}},de=t(1241);const ue=(0,de.A)(pe,[["render",ae],["__scopeId","data-v-466d1e62"]]);var ke=ue,he=t(4373),ge={name:"RecipePage",components:{EditRecipe:ke},data(){return{recipe:null,isLoading:!1,showModal:!1,showAllergenAlert:!1,showTimeDropdown:!1,showDifficultyDropdown:!1,showCuisineDropdown:!1,showPeopleDropdown:!1,showTypeDropdown:!1,includeStock:!1,showStockModal:!1,showEditRecipe:!1,isSaving:!1,isSaved:!1,selectedTime:"Rapide",selectedDifficulty:"Facile",selectedCuisine:"Européenne",selectedPeople:"1",selectedType:"Petit-déjeuner",timeOptions:["Rapide","Moyen","Long"],difficultyOptions:["Facile","Intermédiaire","Complexe"],cuisineOptions:["Européenne","Asiatique","Américaine","Africaine"],peopleOptions:["1","2","3","4"],typeOptions:["Petit-déjeuner","Lunch","Dîner","Dessert"],time:"",difficulty:"",cuisine:"",people:"",type:"",public:!0,availableIngredients:[],selectedIngredients:[]}},mounted(){this.fetchAvailableIngredients()},methods:{openEditRecipe(){this.showEditRecipe=!0},closeEditRecipe(){this.showEditRecipe=!1},async handleEditRecipe(e){try{const i=new FormData;i.append("title",e.title),i.append("time",e.time),i.append("difficulty",e.difficulty),i.append("people",e.people),i.append("cuisine",e.cuisine),i.append("type",e.type),i.append("public",e.public),i.append("ingredients",JSON.stringify(e.ingredients)),i.append("instructions",JSON.stringify(e.instructions)),i.append("restrictionsList",JSON.stringify(e.restrictionsList)),i.append("created_by_ai",e.created_by_ai),e.image&&i.append("image",e.image);const t=await he.A.post("https://tfe-3483aa964321.herokuapp.com/recipes/save",i,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});201===t.status&&alert("Recette enregistrée avec succès !")}catch(i){console.error("Erreur lors de l'enregistrement de la recette :",i),alert("Une erreur est survenue lors de l'enregistrement de la recette.")}},async getUserRestrictions(){try{const e=await he.A.get("https://tfe-3483aa964321.herokuapp.com/users/restrictions",{withCredentials:!0});return e.data.restrictions||[]}catch(e){return console.error("Erreur lors de la récupération des restrictions alimentaires :",e),alert("Impossible de récupérer les restrictions alimentaires. Veuillez réessayer."),[]}},async fetchAvailableIngredients(){try{const e=await he.A.get("https://tfe-3483aa964321.herokuapp.com/users/fridge",{withCredentials:!0});Array.isArray(e.data)?this.availableIngredients=e.data:console.error("Les données reçues ne sont pas valides :",e.data)}catch(e){console.error("Erreur lors de la récupération des ingrédients en stock :",e),alert("Impossible de récupérer les ingrédients en stock. Veuillez réessayer.")}},toggleStockOption(){this.availableIngredients.length,this.showStockModal=!0},closeStockSelectionModal(){this.showStockModal=!1},confirmSelection(){this.includeStock=!0,this.showStockModal=!1},handleStockModalResponse(e){"add"===e?this.$router.push("/ingredients"):"cancel"===e&&(this.includeStock=!1),this.showStockModal=!1},async fetchRecipe(){try{const e=await this.getUserRestrictions();e&&0!==e.length?this.executeRecipeLogic():this.showAllergenAlert=!0}catch(e){console.error("Erreur lors de la vérification des restrictions alimentaires :",e),alert("Une erreur est survenue. Veuillez réessayer.")}},async executeRecipeLogic(){this.isLoading=!0;try{const e={time:this.selectedTime,difficulty:this.selectedDifficulty,cuisine:this.selectedCuisine,people:this.selectedPeople,type:this.selectedType,availableIngredients:this.includeStock?this.selectedIngredients:[]},i=await he.A.post("https://tfe-3483aa964321.herokuapp.com/openai/recipe",e,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(!(i.data&&i.data.title&&i.data.ingredients&&i.data.instructions))throw new Error("Les données de la recette sont manquantes ou mal formatées.");{const e=[...new Set(i.data.restrictionsList)];this.recipe={title:i.data.title,ingredients:i.data.ingredients,instructions:i.data.instructions,quantity:i.data.quantity,time:i.data.time,difficulty:i.data.difficulty,cuisine:i.data.cuisine,people:i.data.people,type:i.data.type,image:i.data.image,restrictionsList:e,created_by_ai:i.data.created_by_ai,public:!0}}}catch(e){console.error("Erreur lors de la recherche de la recette :",e),alert("Une erreur est survenue lors de la recherche de la recette. Veuillez réessayer plus tard.")}finally{this.isLoading=!1}},async saveRecipe(){if(!this.isSaving&&!this.isSaved){this.isSaving=!0;try{const e={recipe:{...this.recipe,restrictionsList:this.recipe.restrictionsList||[],public:this.recipe.public},ingredients:this.recipe.ingredients.map((e=>({food_id:e.food_id,quantity:e.quantity})))};await he.A.post("https://tfe-3483aa964321.herokuapp.com/recipes/save",e,{headers:{"Content-Type":"application/json"}}),alert("Recette enregistrée avec succès !"),this.isSaved=!0}catch(e){console.error("Erreur lors de l'enregistrement de la recette :",e),alert("Une erreur est survenue lors de l'enregistrement de la recette.")}finally{this.isSaving=!1}}},updateIngredientsList(e){this.availableIngredients=e},openModal(){this.showModal=!0},closeModal(){this.showModal=!1},toggleTimeDropdown(){this.showTimeDropdown=!this.showTimeDropdown},selectTime(e){this.selectedTime=e,this.showTimeDropdown=!1},toggleDifficultyDropdown(){this.showDifficultyDropdown=!this.showDifficultyDropdown},selectDifficulty(e){this.selectedDifficulty=e,this.showDifficultyDropdown=!1},toggleCuisineDropdown(){this.showCuisineDropdown=!this.showCuisineDropdown},selectCuisine(e){this.selectedCuisine=e,this.showCuisineDropdown=!1},togglePeopleDropdown(){this.showPeopleDropdown=!this.showPeopleDropdown},selectPeople(e){this.selectedPeople=e,this.showPeopleDropdown=!1},toggleTypeDropdown(){this.showTypeDropdown=!this.showTypeDropdown},selectType(e){this.selectedType=e,this.showTypeDropdown=!1},proceedWithoutAllergens(){this.showAllergenAlert=!1,this.executeRecipeLogic()},redirectToProfile(){this.showAllergenAlert=!1,this.$router.push("/profile")}}};const me=(0,de.A)(ge,[["render",Q],["__scopeId","data-v-2a7fb636"]]);var Le=me}}]);
//# sourceMappingURL=596.b44065b2.js.map