"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[734],{5334:function(e,i,t){t.d(i,{A:function(){return O}});var n=t(6768),o=t(5130),l=t(4232);const s={class:"modal-content"},r={key:0},a={key:1},c={class:"form-group"},p={key:0},u={class:"form-group"},d={key:0,class:"image-preview"},h=["src"],m={key:1},g={class:"form-group"},k={key:0},y={class:"form-group"},f={key:0},v={class:"form-group"},L={key:0},b={class:"form-group"},_={key:0},C={class:"form-group"},w={key:0},R={class:"form-group"},E=["onUpdate:modelValue"],D=["onUpdate:modelValue"],I=["onClick"],A={key:0},S={class:"form-group"},X=["onUpdate:modelValue"],Q=["onClick"],V={key:0},T={class:"form-group"},x={class:"checkbox-group"},M={class:"form-group"},U={type:"submit",class:"button"};function F(e,i,t,F,P,j){return t.isVisible?((0,n.uX)(),(0,n.CE)("div",{key:0,class:"modal-overlay",onClick:i[16]||(i[16]=(0,o.D$)(((...e)=>j.closeModal&&j.closeModal(...e)),["self"]))},[(0,n.Lk)("div",s,["create"===t.mode?((0,n.uX)(),(0,n.CE)("h3",r,"Créer une recette")):((0,n.uX)(),(0,n.CE)("h3",a,"Modifier la recette")),(0,n.Lk)("form",{onSubmit:i[15]||(i[15]=(0,o.D$)(((...e)=>j.validateForm&&j.validateForm(...e)),["prevent"]))},[(0,n.Lk)("div",c,[i[17]||(i[17]=(0,n.Lk)("label",{for:"recipe-title"},"Titre de la recette",-1)),(0,n.bo)((0,n.Lk)("input",{type:"text",id:"recipe-title","onUpdate:modelValue":i[0]||(i[0]=e=>P.localRecipe.recipe_name=e)},null,512),[[o.Jo,P.localRecipe.recipe_name]]),P.errors.recipe_name?((0,n.uX)(),(0,n.CE)("span",p,(0,l.v_)(P.errors.recipe_name),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",u,[i[18]||(i[18]=(0,n.Lk)("label",{for:"recipe-photo"},"Photo de la recette",-1)),(0,n.Lk)("input",{type:"file",id:"recipe-photo",onChange:i[1]||(i[1]=(...e)=>j.handleFileUpload&&j.handleFileUpload(...e)),name:"image",accept:".png, .jpg, .jpeg"},null,32),P.localRecipe.image_url||P.previewImage?((0,n.uX)(),(0,n.CE)("div",d,[(0,n.Lk)("img",{src:P.previewImage||P.localRecipe.image_url,alt:"Aperçu de l'image"},null,8,h)])):(0,n.Q3)("",!0),P.errors.image?((0,n.uX)(),(0,n.CE)("span",m,(0,l.v_)(P.errors.image),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",g,[i[20]||(i[20]=(0,n.Lk)("label",{for:"recipe-preparation-time"},"Temps de préparation",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-preparation-time","onUpdate:modelValue":i[2]||(i[2]=e=>P.localRecipe.preparation_time=e)},i[19]||(i[19]=[(0,n.Lk)("option",{value:""},"Choisissez une option",-1),(0,n.Lk)("option",{value:"Rapide"},"Rapide",-1),(0,n.Lk)("option",{value:"Moyen"},"Moyen",-1),(0,n.Lk)("option",{value:"Long"},"Long",-1)]),512),[[o.u1,P.localRecipe.preparation_time]]),P.errors.preparation_time?((0,n.uX)(),(0,n.CE)("span",k,(0,l.v_)(P.errors.preparation_time),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",y,[i[22]||(i[22]=(0,n.Lk)("label",{for:"recipe-difficulty"},"Difficulté",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-difficulty","onUpdate:modelValue":i[3]||(i[3]=e=>P.localRecipe.difficulty=e)},i[21]||(i[21]=[(0,n.Lk)("option",{value:""},"Choisissez une option",-1),(0,n.Lk)("option",{value:"Facile"},"Facile",-1),(0,n.Lk)("option",{value:"Intermédiaire"},"Intermédiaire",-1),(0,n.Lk)("option",{value:"Complexe"},"Complexe",-1)]),512),[[o.u1,P.localRecipe.difficulty]]),P.errors.difficulty?((0,n.uX)(),(0,n.CE)("span",f,(0,l.v_)(P.errors.difficulty),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",v,[i[23]||(i[23]=(0,n.Lk)("label",{for:"recipe-people"},"Nombre de personnes",-1)),(0,n.bo)((0,n.Lk)("input",{type:"number",id:"recipe-people","onUpdate:modelValue":i[4]||(i[4]=e=>P.localRecipe.number_of_person=e),min:"1"},null,512),[[o.Jo,P.localRecipe.number_of_person]]),P.errors.number_of_person?((0,n.uX)(),(0,n.CE)("span",L,(0,l.v_)(P.errors.number_of_person),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",b,[i[25]||(i[25]=(0,n.Lk)("label",{for:"recipe-cuisine"},"Cuisine",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-cuisine","onUpdate:modelValue":i[5]||(i[5]=e=>P.localRecipe.cuisine_type=e)},i[24]||(i[24]=[(0,n.Fv)('<option value="" data-v-f9a469c0>Choisissez une option</option><option value="Africaine" data-v-f9a469c0>Africaine</option><option value="Asiatique" data-v-f9a469c0>Asiatique</option><option value="Européenne" data-v-f9a469c0>Européenne</option><option value="Américaine" data-v-f9a469c0>Américaine</option>',5)]),512),[[o.u1,P.localRecipe.cuisine_type]]),P.errors.cuisine_type?((0,n.uX)(),(0,n.CE)("span",_,(0,l.v_)(P.errors.cuisine_type),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",C,[i[27]||(i[27]=(0,n.Lk)("label",{for:"recipe-type"},"Type",-1)),(0,n.bo)((0,n.Lk)("select",{id:"recipe-type","onUpdate:modelValue":i[6]||(i[6]=e=>P.localRecipe.category_type=e)},i[26]||(i[26]=[(0,n.Fv)('<option value="" data-v-f9a469c0>Choisissez une option</option><option value="Petit-déjeuner" data-v-f9a469c0>Petit-déjeuner</option><option value="Lunch" data-v-f9a469c0>Lunch</option><option value="Dîner" data-v-f9a469c0>Dîner</option><option value="Dessert" data-v-f9a469c0>Dessert</option>',5)]),512),[[o.u1,P.localRecipe.category_type]]),P.errors.category_type?((0,n.uX)(),(0,n.CE)("span",w,(0,l.v_)(P.errors.category_type),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",R,[i[28]||(i[28]=(0,n.Lk)("label",null,"Ingrédients",-1)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(P.localRecipe.ingredients,((e,i)=>((0,n.uX)(),(0,n.CE)("div",{key:i,class:"ingredient-group"},[(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":i=>e.food_name=i,placeholder:"Nom de l'ingrédient"},null,8,E),[[o.Jo,e.food_name]]),(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":i=>e.quantity=i,placeholder:"Quantité"},null,8,D),[[o.Jo,e.quantity]]),(0,n.Lk)("button",{type:"button",onClick:e=>j.removeIngredient(i),class:"button"},"Supprimer",8,I)])))),128)),(0,n.Lk)("button",{type:"button",onClick:i[7]||(i[7]=(...e)=>j.addIngredient&&j.addIngredient(...e)),class:"button"},"Ajouter un ingrédient"),P.errors.ingredients?((0,n.uX)(),(0,n.CE)("span",A,(0,l.v_)(P.errors.ingredients),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",S,[i[29]||(i[29]=(0,n.Lk)("label",null,"Instructions",-1)),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(P.localRecipe.instructions,((e,i)=>((0,n.uX)(),(0,n.CE)("div",{key:i,class:"instruction-group"},[(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":i=>e.step=i,placeholder:"Étape d'instruction"},null,8,X),[[o.Jo,e.step]]),(0,n.Lk)("button",{type:"button",onClick:e=>j.removeInstruction(i),class:"button"},"Supprimer",8,Q)])))),128)),(0,n.Lk)("button",{type:"button",onClick:i[8]||(i[8]=(...e)=>j.addInstruction&&j.addInstruction(...e)),class:"button"},"Ajouter une étape"),P.errors.instructions?((0,n.uX)(),(0,n.CE)("span",V,(0,l.v_)(P.errors.instructions),1)):(0,n.Q3)("",!0)]),(0,n.Lk)("div",T,[i[34]||(i[34]=(0,n.Lk)("label",null,"Sans allergène",-1)),(0,n.Lk)("div",x,[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Lactose","onUpdate:modelValue":i[9]||(i[9]=e=>P.localRecipe.allergens_list=e)},null,512),[[o.lH,P.localRecipe.allergens_list]]),i[30]||(i[30]=(0,n.eW)(" Lactose"))]),(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Gluten","onUpdate:modelValue":i[10]||(i[10]=e=>P.localRecipe.allergens_list=e)},null,512),[[o.lH,P.localRecipe.allergens_list]]),i[31]||(i[31]=(0,n.eW)(" Gluten"))]),(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Arachide","onUpdate:modelValue":i[11]||(i[11]=e=>P.localRecipe.allergens_list=e)},null,512),[[o.lH,P.localRecipe.allergens_list]]),i[32]||(i[32]=(0,n.eW)(" Arachide"))]),(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:"Œuf","onUpdate:modelValue":i[12]||(i[12]=e=>P.localRecipe.allergens_list=e)},null,512),[[o.lH,P.localRecipe.allergens_list]]),i[33]||(i[33]=(0,n.eW)(" Œuf"))])])]),(0,n.Lk)("div",M,[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox","onUpdate:modelValue":i[13]||(i[13]=e=>P.localRecipe.public=e)},null,512),[[o.lH,P.localRecipe.public]]),i[35]||(i[35]=(0,n.eW)("Rendre cette recette publique "))])]),(0,n.Lk)("button",U,(0,l.v_)("create"===t.mode?"Créer la recette":"Modifier la recette"),1),(0,n.Lk)("button",{type:"button",onClick:i[14]||(i[14]=(...e)=>j.closeModal&&j.closeModal(...e)),class:"button"},"Annuler")],32)])])):(0,n.Q3)("",!0)}t(4114),t(4603),t(7566),t(8721);var P={name:"EditRecipe",props:{isVisible:{type:Boolean,default:!1},mode:{type:String,required:!0},recipe:{type:Object,default:()=>({})}},data(){return{localRecipe:{recipe_name:"",preparation_time:"",difficulty:"",number_of_person:1,cuisine_type:"",category_type:"",ingredients:[],instructions:[{step:""}],allergens_list:[],image:null,public:!1},previewImage:null,errors:{}}},watch:{recipe:{immediate:!0,handler(e){e&&Object.keys(e).length>0?(this.localRecipe={...e},this.previewImage=null,"string"===typeof e.instructions&&(this.localRecipe.instructions=e.instructions.split("\n").map((e=>({step:e.trim()}))))):this.localRecipe={recipe_name:"",preparation_time:"",difficulty:"",number_of_person:1,cuisine_type:"",category_type:"",ingredients:[],instructions:[{step:""}],allergens_list:[],image:null,public:!1}}}},methods:{validateForm(){this.errors={},this.localRecipe.recipe_name||(this.errors.recipe_name="Le titre est obligatoire."),this.localRecipe.preparation_time||(this.errors.preparation_time="Veuillez choisir un temps de préparation."),this.localRecipe.difficulty||(this.errors.difficulty="Veuillez choisir une difficulté."),(!this.localRecipe.number_of_person||this.localRecipe.number_of_person<1)&&(this.errors.number_of_person="Veuillez indiquer un nombre de personnes valide."),this.localRecipe.cuisine_type||(this.errors.cuisine_type="Veuillez choisir un type de cuisine."),this.localRecipe.category_type||(this.errors.category_type="Veuillez choisir une catégorie de recette."),this.localRecipe.ingredients.some((e=>e.food_name&&e.quantity))||(this.errors.ingredients="Veuillez ajouter au moins un ingrédient avec sa quantité."),this.localRecipe.instructions.some((e=>e.step))||(this.errors.instructions="Veuillez ajouter au moins une étape d'instruction."),0===Object.keys(this.errors).length&&this.handleSubmit()},handleSubmit(){"create"===this.mode?this.$emit("create-recipe",{...this.localRecipe}):"edit"===this.mode&&this.$emit("update-recipe",{...this.localRecipe,image:this.localRecipe.image}),this.closeModal()},closeModal(){this.$emit("close")},handleFileUpload(e){const i=e.target.files[0];if(i){const e=i.type;"image/png"===e||"image/jpeg"===e?(this.localRecipe.image=i,this.previewImage=URL.createObjectURL(i)):this.errors.image="Seuls les fichiers PNG et JPG sont acceptés."}},addIngredient(){Array.isArray(this.localRecipe.ingredients)||(this.localRecipe.ingredients=[]),this.localRecipe.ingredients.push({food_name:"",quantity:""})},removeIngredient(e){this.localRecipe.ingredients.splice(e,1)},addInstruction(){Array.isArray(this.localRecipe.instructions)||(this.localRecipe.instructions=[]),this.localRecipe.instructions.push({step:""})},removeInstruction(e){this.localRecipe.instructions.splice(e,1)}}},j=t(1241);const W=(0,j.A)(P,[["render",F],["__scopeId","data-v-f9a469c0"]]);var O=W},8734:function(e,i,t){t.r(i),t.d(i,{default:function(){return H}});var n=t(6768),o=t(4232),l=t(5130);const s={class:"recipe-page"},r={class:"filter-buttons"},a={key:0,class:"dropdown"},c=["onClick"],p={key:0,class:"dropdown"},u=["onClick"],d={key:0,class:"dropdown"},h=["onClick"],m={key:0,class:"dropdown"},g=["onClick"],k={key:0,class:"dropdown"},y=["onClick"],f={key:0,class:"loading-spinner"},v={key:1,class:"recipe-container"},L={class:"recipe-card",style:{width:"80vw","max-width":"70%"}},b={class:"recipe-info"},_=["src"],C={class:"modal-content"},w={style:{"text-align":"center"}},R=["src"],E={class:"recipe-info-container"},D={class:"recipe-info-line"},I={class:"info-item"},A={class:"info-item"},S={class:"info-item"},X={class:"info-item"},Q={class:"recipe-info-line"},V={class:"info-item"},T={class:"info-item"},x={key:0,class:"info-item"},M={style:{"margin-top":"15px","text-align":"center"}},U=["disabled"],F={class:"modal-content"},P={style:{display:"flex","justify-content":"space-around","margin-top":"20px"}},j={class:"modal-content"},W=["value"],O=["onUpdate:modelValue","placeholder","max","disabled","onInput"];function q(e,i,t,q,z,K){const J=(0,n.g2)("EditRecipe"),N=(0,n.g2)("modal");return(0,n.uX)(),(0,n.CE)("div",s,[(0,n.Lk)("button",{onClick:i[0]||(i[0]=(...e)=>K.fetchRecipe&&K.fetchRecipe(...e)),class:"button"}," Rechercher des recettes avec l'IA "),(0,n.Lk)("button",{onClick:i[1]||(i[1]=(...e)=>K.openEditRecipe&&K.openEditRecipe(...e)),class:"button"}," Créer une recette manuellement "),(0,n.bF)(J,{isVisible:z.showEditRecipe,mode:"create",onClose:K.closeEditRecipe,onCreateRecipe:K.handleEditRecipe},null,8,["isVisible","onClose","onCreateRecipe"]),(0,n.Lk)("div",r,[(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[2]||(i[2]=(...e)=>K.toggleTimeDropdown&&K.toggleTimeDropdown(...e)),class:"dropdown-btn"}," Temps de préparation : "+(0,o.v_)(z.selectedTime||"Rapide"),1),z.showTimeDropdown?((0,n.uX)(),(0,n.CE)("div",a,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.timeOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectTime(e)},(0,o.v_)(e),9,c)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[3]||(i[3]=(...e)=>K.toggleDifficultyDropdown&&K.toggleDifficultyDropdown(...e)),class:"dropdown-btn"}," Difficulté : "+(0,o.v_)(z.selectedDifficulty||"Facile"),1),z.showDifficultyDropdown?((0,n.uX)(),(0,n.CE)("div",p,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.difficultyOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectDifficulty(e)},(0,o.v_)(e),9,u)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[4]||(i[4]=(...e)=>K.toggleCuisineDropdown&&K.toggleCuisineDropdown(...e)),class:"dropdown-btn"}," Cuisine : "+(0,o.v_)(z.selectedCuisine||"Européenne"),1),z.showCuisineDropdown?((0,n.uX)(),(0,n.CE)("div",d,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.cuisineOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectCuisine(e)},(0,o.v_)(e),9,h)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[5]||(i[5]=(...e)=>K.togglePeopleDropdown&&K.togglePeopleDropdown(...e)),class:"dropdown-btn"}," Nombre de personnes : "+(0,o.v_)(z.selectedPeople||"1"),1),z.showPeopleDropdown?((0,n.uX)(),(0,n.CE)("div",m,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.peopleOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectPeople(e)},(0,o.v_)(e),9,g)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[6]||(i[6]=(...e)=>K.toggleTypeDropdown&&K.toggleTypeDropdown(...e)),class:"dropdown-btn"}," Type : "+(0,o.v_)(z.selectedType||"Petit-déjeuner"),1),z.showTypeDropdown?((0,n.uX)(),(0,n.CE)("div",k,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.typeOptions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e,onClick:i=>K.selectType(e)},(0,o.v_)(e),9,y)))),128))])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:i[7]||(i[7]=(...e)=>K.toggleStockOption&&K.toggleStockOption(...e)),class:"dropdown-btn"}," Inclure les ingrédients en stock : "+(0,o.v_)(z.includeStock?"Oui":"Non"),1)])]),z.isLoading?((0,n.uX)(),(0,n.CE)("div",f," Recherche en cours ... ")):(0,n.Q3)("",!0),z.recipe&&!z.isLoading?((0,n.uX)(),(0,n.CE)("div",v,[(0,n.Lk)("div",L,[(0,n.Lk)("div",b,[(0,n.Lk)("h3",null,(0,o.v_)(z.recipe.title),1),z.recipe.image?((0,n.uX)(),(0,n.CE)("img",{key:0,src:z.recipe.image,alt:"Image de la recette",class:"recipe-image"},null,8,_)):(0,n.Q3)("",!0),i[19]||(i[19]=(0,n.Lk)("img",null,null,-1)),(0,n.Lk)("button",{onClick:i[8]||(i[8]=(...e)=>K.openModal&&K.openModal(...e))},"Voir les détails")])])])):(0,n.Q3)("",!0),z.showModal?((0,n.uX)(),(0,n.Wv)(N,{key:2,onClose:K.closeModal,class:"modal-overlay"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",C,[(0,n.Lk)("h3",w,(0,o.v_)(z.recipe.title),1),z.recipe.image?((0,n.uX)(),(0,n.CE)("img",{key:0,src:z.recipe.image,alt:"Image de la recette",class:"modal-recipe-image"},null,8,R)):(0,n.Q3)("",!0),(0,n.Lk)("div",E,[(0,n.Lk)("div",D,[(0,n.Lk)("div",I,[i[20]||(i[20]=(0,n.Lk)("strong",null,"Généré par l'IA :",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.created_by_ai?"Oui":"Non"),1)]),(0,n.Lk)("div",A,[i[21]||(i[21]=(0,n.Lk)("strong",null,"Temps de préparation:",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.time),1)]),(0,n.Lk)("div",S,[i[22]||(i[22]=(0,n.Lk)("strong",null,"Difficulté:",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.difficulty),1)]),(0,n.Lk)("div",X,[i[23]||(i[23]=(0,n.Lk)("strong",null,"Nombre de personnes:",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.people),1)])]),(0,n.Lk)("div",Q,[(0,n.Lk)("div",V,[i[24]||(i[24]=(0,n.Lk)("strong",null,"Cuisine:",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.cuisine),1)]),(0,n.Lk)("div",T,[i[25]||(i[25]=(0,n.Lk)("strong",null,"Type:",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.type),1)]),z.recipe.restrictionsList&&z.recipe.restrictionsList.length?((0,n.uX)(),(0,n.CE)("div",x,[i[26]||(i[26]=(0,n.Lk)("strong",null,"Sans allergène:",-1)),(0,n.eW)(" "+(0,o.v_)(z.recipe.restrictionsList.join(", ")),1)])):(0,n.Q3)("",!0)])]),i[28]||(i[28]=(0,n.Lk)("h4",null,"Ingrédients",-1)),(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.recipe.ingredients,((e,i)=>((0,n.uX)(),(0,n.CE)("li",{key:i},(0,o.v_)(z.recipe.quantity[i])+" "+(0,o.v_)(e),1)))),128))]),i[29]||(i[29]=(0,n.Lk)("h4",null,"Instructions",-1)),(0,n.Lk)("ol",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.recipe.instructions,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e},(0,o.v_)(e),1)))),128))]),(0,n.Lk)("div",M,[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox","onUpdate:modelValue":i[9]||(i[9]=e=>z.recipe.public=e)},null,512),[[l.lH,z.recipe.public]]),i[27]||(i[27]=(0,n.eW)("Rendre cette recette publique"))])]),z.recipe?((0,n.uX)(),(0,n.CE)("button",{key:1,onClick:i[10]||(i[10]=(...e)=>K.saveRecipe&&K.saveRecipe(...e)),disabled:z.isSaving||z.isSaved},(0,o.v_)(z.isSaved?"Déjà enregistré":z.isSaving?"Enregistrement...":"Valider la recette"),9,U)):(0,n.Q3)("",!0),i[30]||(i[30]=(0,n.Lk)("br",null,null,-1)),(0,n.Lk)("button",{onClick:i[11]||(i[11]=(...e)=>K.closeModal&&K.closeModal(...e))},"Fermer")])])),_:1},8,["onClose"])):(0,n.Q3)("",!0),z.showAllergenAlert?((0,n.uX)(),(0,n.Wv)(N,{key:3,onClose:i[14]||(i[14]=e=>z.showAllergenAlert=!1),class:"modal-overlay"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",F,[i[31]||(i[31]=(0,n.Lk)("h3",{style:{"text-align":"center"}},"Aucun allergène enregistré dans votre profil",-1)),i[32]||(i[32]=(0,n.Lk)("p",{style:{"text-align":"center"}},"Souhaitez-vous continuer ou modifier votre profil ?",-1)),i[33]||(i[33]=(0,n.Lk)("p",{style:{"text-align":"center"}},"Si vous continuez la recette générée par l'IA ne prendra pas en compte vos allergènes",-1)),(0,n.Lk)("div",P,[(0,n.Lk)("button",{onClick:i[12]||(i[12]=(...e)=>K.proceedWithoutAllergens&&K.proceedWithoutAllergens(...e)),class:"button"},"Continuer"),(0,n.Lk)("button",{onClick:i[13]||(i[13]=(...e)=>K.redirectToProfile&&K.redirectToProfile(...e)),class:"button"},"Modifier le profil")])])])),_:1})):(0,n.Q3)("",!0),z.showStockModal?((0,n.uX)(),(0,n.Wv)(N,{key:4,onClose:K.closeStockSelectionModal},{default:(0,n.k6)((()=>[(0,n.Lk)("div",j,[z.availableIngredients.length>0?((0,n.uX)(),(0,n.CE)(n.FK,{key:0},[i[34]||(i[34]=(0,n.Lk)("h3",null,"Sélectionnez les ingrédients à inclure",-1)),(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(z.availableIngredients,((e,t)=>((0,n.uX)(),(0,n.CE)("li",{key:t},[(0,n.Lk)("label",null,[(0,n.bo)((0,n.Lk)("input",{type:"checkbox",value:e.food_name,"onUpdate:modelValue":i[15]||(i[15]=e=>z.selectedIngredients=e)},null,8,W),[[l.lH,z.selectedIngredients]]),(0,n.eW)(" "+(0,o.v_)(e.food_name)+" (Max: "+(0,o.v_)(e.maxQuantity)+" "+(0,o.v_)(e.unit)+") ",1)]),(0,n.bo)((0,n.Lk)("input",{type:"number","onUpdate:modelValue":i=>e.selectedQuantity=i,placeholder:"Quantité en "+e.unit,max:e.maxQuantity,min:1,disabled:!z.selectedIngredients.includes(e.food_name),onInput:i=>K.validateQuantity(e),style:{"margin-left":"10px",width:"100px"}},null,40,O),[[l.Jo,e.selectedQuantity,void 0,{number:!0}]])])))),128))]),(0,n.Lk)("button",{onClick:i[16]||(i[16]=(...e)=>K.confirmSelection&&K.confirmSelection(...e)),class:"button"},"Confirmer")],64)):((0,n.uX)(),(0,n.CE)(n.FK,{key:1},[i[35]||(i[35]=(0,n.Lk)("h3",null,"Votre liste d’ingrédients en stock est vide",-1)),i[36]||(i[36]=(0,n.Lk)("p",null,"Voulez-vous ajouter des ingrédients en stock ? Vous serez redirigé vers la page des ingrédients.",-1)),(0,n.Lk)("button",{onClick:i[17]||(i[17]=e=>K.handleStockModalResponse("add")),class:"button"},"Ajouter des ingrédients"),i[37]||(i[37]=(0,n.Lk)("br",null,null,-1)),(0,n.Lk)("button",{onClick:i[18]||(i[18]=e=>K.handleStockModalResponse("cancel")),class:"button"},"Annuler")],64))])])),_:1},8,["onClose"])):(0,n.Q3)("",!0)])}t(4114),t(7642),t(8004),t(3853),t(5876),t(2475),t(5024),t(1698);var z=t(5334),K=t(4373),J={name:"RecipePage",components:{EditRecipe:z.A},data(){return{recipe:null,isLoading:!1,showModal:!1,showAllergenAlert:!1,showTimeDropdown:!1,showDifficultyDropdown:!1,showCuisineDropdown:!1,showPeopleDropdown:!1,showTypeDropdown:!1,includeStock:!1,showStockModal:!1,showEditRecipe:!1,isSaving:!1,isSaved:!1,selectedTime:"Rapide",selectedDifficulty:"Facile",selectedCuisine:"Européenne",selectedPeople:"1",selectedType:"Petit-déjeuner",timeOptions:["Rapide","Moyen","Long"],difficultyOptions:["Facile","Intermédiaire","Complexe"],cuisineOptions:["Européenne","Asiatique","Américaine","Africaine"],peopleOptions:["1","2","3","4"],typeOptions:["Petit-déjeuner","Lunch","Dîner","Dessert"],time:"",difficulty:"",cuisine:"",people:"",type:"",public:!0,availableIngredients:[],selectedIngredients:[]}},mounted(){this.fetchAvailableIngredients()},methods:{openEditRecipe(){this.showEditRecipe=!0},closeEditRecipe(){this.showEditRecipe=!1},validateQuantity(e){e.selectedQuantity>e.maxQuantity?e.selectedQuantity=e.maxQuantity:e.selectedQuantity<1&&(e.selectedQuantity=1)},confirmSelection(){this.selectedIngredientsWithQuantities=this.availableIngredients.filter((e=>this.selectedIngredients.includes(e.food_name))).map((e=>({food_name:e.food_name,selectedQuantity:e.selectedQuantity,unit:e.unit||"unité"}))),this.selectedIngredientsWithQuantities.some((e=>e.selectedQuantity<=0))?alert("Veuillez spécifier une quantité valide pour chaque ingrédient sélectionné."):(this.includeStock=!0,this.showStockModal=!1)},async handleEditRecipe(e){try{const i=new FormData;i.append("title",e.recipe_name),i.append("time",e.preparation_time),i.append("difficulty",e.difficulty),i.append("people",e.number_of_person),i.append("cuisine",e.cuisine_type),i.append("type",e.category_type),i.append("public",e.public),i.append("ingredients",JSON.stringify(e.ingredients)),i.append("instructions",JSON.stringify(e.instructions)),i.append("restrictionsList",JSON.stringify(e.allergens_list)),i.append("created_by_ai",!1),e.image&&i.append("image",e.image);const t=await K.A.post("https://tfe-3483aa964321.herokuapp.com/recipes/save",i,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});201===t.status&&alert("Recette enregistrée avec succès !")}catch(i){console.error("Erreur lors de l'enregistrement de la recette :",i),alert("Une erreur est survenue lors de l'enregistrement de la recette.")}},async getUserRestrictions(){try{const e=await K.A.get("https://tfe-3483aa964321.herokuapp.com/users/restrictions",{withCredentials:!0});return e.data.restrictions||[]}catch(e){return console.error("Erreur lors de la récupération des restrictions alimentaires :",e),alert("Impossible de récupérer les restrictions alimentaires. Veuillez réessayer."),[]}},async fetchAvailableIngredients(){try{const e=await K.A.get("https://tfe-3483aa964321.herokuapp.com/users/fridge",{withCredentials:!0});Array.isArray(e.data)?this.availableIngredients=e.data.map((e=>{const i=e.quantity.match(/^(\d+\.?\d*)\s*(.*)?$/);return{...e,maxQuantity:i?parseFloat(i[1]):0,unit:i&&i[2]?i[2].trim():"",selectedQuantity:1}})):console.error("Les données reçues ne sont pas valides :",e.data)}catch(e){console.error("Erreur lors de la récupération des ingrédients en stock :",e),alert("Impossible de récupérer les ingrédients en stock. Veuillez réessayer.")}},toggleStockOption(){this.availableIngredients.length,this.showStockModal=!0},closeStockSelectionModal(){this.showStockModal=!1},handleStockModalResponse(e){"add"===e?this.$router.push("/ingredients"):"cancel"===e&&(this.includeStock=!1),this.showStockModal=!1},async fetchRecipe(){try{const e=await this.getUserRestrictions();e&&0!==e.length?this.executeRecipeLogic():this.showAllergenAlert=!0}catch(e){console.error("Erreur lors de la vérification des restrictions alimentaires :",e),alert("Une erreur est survenue. Veuillez réessayer.")}},async executeRecipeLogic(){this.isLoading=!0;try{const e={time:this.selectedTime,difficulty:this.selectedDifficulty,cuisine:this.selectedCuisine,people:this.selectedPeople,type:this.selectedType,availableIngredients:this.includeStock?this.selectedIngredientsWithQuantities:[]},i=await K.A.post("https://tfe-3483aa964321.herokuapp.com/openai/recipe",e,{headers:{"Content-Type":"application/json"},withCredentials:!0});if(!(i.data&&i.data.title&&i.data.ingredients&&i.data.instructions))throw new Error("Les données de la recette sont manquantes ou mal formatées.");{const e=[...new Set(i.data.restrictionsList)];this.recipe={title:i.data.title,ingredients:i.data.ingredients,instructions:i.data.instructions,quantity:i.data.quantity,time:i.data.time,difficulty:i.data.difficulty,cuisine:i.data.cuisine,people:i.data.people,type:i.data.type,image:i.data.image,restrictionsList:e,created_by_ai:i.data.created_by_ai,public:!0}}}catch(e){console.error("Erreur lors de la recherche de la recette :",e),alert("Une erreur est survenue lors de la recherche de la recette. Veuillez réessayer plus tard.")}finally{this.isLoading=!1}},async saveRecipe(){if(!this.isSaving&&!this.isSaved){this.isSaving=!0;try{const e={recipe:{...this.recipe,restrictionsList:this.recipe.restrictionsList||[],public:this.recipe.public},ingredients:this.recipe.ingredients.map((e=>({food_id:e.food_id,quantity:e.quantity})))};await K.A.post("https://tfe-3483aa964321.herokuapp.com/recipes/save",e,{headers:{"Content-Type":"application/json"}}),alert("Recette enregistrée avec succès !"),this.isSaved=!0}catch(e){console.error("Erreur lors de l'enregistrement de la recette :",e),alert("Une erreur est survenue lors de l'enregistrement de la recette.")}finally{this.isSaving=!1}}},updateIngredientsList(e){this.availableIngredients=e},openModal(){this.showModal=!0},closeModal(){this.showModal=!1},toggleTimeDropdown(){this.showTimeDropdown=!this.showTimeDropdown},selectTime(e){this.selectedTime=e,this.showTimeDropdown=!1},toggleDifficultyDropdown(){this.showDifficultyDropdown=!this.showDifficultyDropdown},selectDifficulty(e){this.selectedDifficulty=e,this.showDifficultyDropdown=!1},toggleCuisineDropdown(){this.showCuisineDropdown=!this.showCuisineDropdown},selectCuisine(e){this.selectedCuisine=e,this.showCuisineDropdown=!1},togglePeopleDropdown(){this.showPeopleDropdown=!this.showPeopleDropdown},selectPeople(e){this.selectedPeople=e,this.showPeopleDropdown=!1},toggleTypeDropdown(){this.showTypeDropdown=!this.showTypeDropdown},selectType(e){this.selectedType=e,this.showTypeDropdown=!1},proceedWithoutAllergens(){this.showAllergenAlert=!1,this.executeRecipeLogic()},redirectToProfile(){this.showAllergenAlert=!1,this.$router.push("/profile")}}},N=t(1241);const $=(0,N.A)(J,[["render",q],["__scopeId","data-v-7a095c94"]]);var H=$}}]);
//# sourceMappingURL=734.85b76dbc.js.map