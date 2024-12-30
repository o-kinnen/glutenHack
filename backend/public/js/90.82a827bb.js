"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[90],{4433:function(e,t,i){i.d(t,{A:function(){return Q}});var r=i(6768),s=i(5130),n=i(4232);const l={class:"modal-content"},o={key:0},a={key:1},c={class:"form-group"},p={key:0},u={class:"form-group"},d={key:0,class:"image-preview"},h=["src"],g={key:1},m={class:"form-group"},v={key:0},f={class:"form-group"},k={key:0},y={class:"form-group"},_={key:0},R={class:"form-group"},L={key:0},b={class:"form-group"},C={key:0},A={class:"form-group"},E=["onUpdate:modelValue"],w=["onUpdate:modelValue"],F=["onClick"],I={key:0},U={class:"form-group"},x=["onUpdate:modelValue"],M=["onClick"],X={key:0},V={class:"form-group"},j={class:"checkbox-group"},S={class:"form-group"},z={type:"submit",class:"confirm-btn"};function $(e,t,i,$,W,D){return i.isVisible?((0,r.uX)(),(0,r.CE)("div",{key:0,class:"modal-overlay",onClick:t[16]||(t[16]=(0,s.D$)(((...e)=>D.closeModal&&D.closeModal(...e)),["self"]))},[(0,r.Lk)("div",l,["create"===i.mode?((0,r.uX)(),(0,r.CE)("h3",o,"Créer une recette")):((0,r.uX)(),(0,r.CE)("h3",a,"Modifier la recette")),(0,r.Lk)("form",{onSubmit:t[15]||(t[15]=(0,s.D$)(((...e)=>D.validateForm&&D.validateForm(...e)),["prevent"]))},[(0,r.Lk)("div",c,[t[17]||(t[17]=(0,r.Lk)("label",{for:"recipe-title"},"Titre de la recette",-1)),(0,r.bo)((0,r.Lk)("input",{type:"text",id:"recipe-title","onUpdate:modelValue":t[0]||(t[0]=e=>W.localRecipe.recipe_name=e)},null,512),[[s.Jo,W.localRecipe.recipe_name]]),W.errors.recipe_name?((0,r.uX)(),(0,r.CE)("span",p,(0,n.v_)(W.errors.recipe_name),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",u,[t[18]||(t[18]=(0,r.Lk)("label",{for:"recipe-photo"},"Photo de la recette",-1)),(0,r.Lk)("input",{type:"file",id:"recipe-photo",onChange:t[1]||(t[1]=(...e)=>D.handleFileUpload&&D.handleFileUpload(...e)),name:"image",accept:".png, .jpg, .jpeg"},null,32),W.localRecipe.image_url||W.previewImage?((0,r.uX)(),(0,r.CE)("div",d,[(0,r.Lk)("img",{src:W.previewImage||W.localRecipe.image_url,alt:"Aperçu de l'image"},null,8,h)])):(0,r.Q3)("",!0),W.errors.image?((0,r.uX)(),(0,r.CE)("span",g,(0,n.v_)(W.errors.image),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",m,[t[20]||(t[20]=(0,r.Lk)("label",{for:"recipe-preparation-time"},"Temps de préparation",-1)),(0,r.bo)((0,r.Lk)("select",{id:"recipe-preparation-time","onUpdate:modelValue":t[2]||(t[2]=e=>W.localRecipe.preparation_time=e)},t[19]||(t[19]=[(0,r.Lk)("option",{value:""},"Choisissez une option",-1),(0,r.Lk)("option",{value:"Rapide"},"Rapide",-1),(0,r.Lk)("option",{value:"Moyen"},"Moyen",-1),(0,r.Lk)("option",{value:"Long"},"Long",-1)]),512),[[s.u1,W.localRecipe.preparation_time]]),W.errors.preparation_time?((0,r.uX)(),(0,r.CE)("span",v,(0,n.v_)(W.errors.preparation_time),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",f,[t[22]||(t[22]=(0,r.Lk)("label",{for:"recipe-difficulty"},"Difficulté",-1)),(0,r.bo)((0,r.Lk)("select",{id:"recipe-difficulty","onUpdate:modelValue":t[3]||(t[3]=e=>W.localRecipe.difficulty=e)},t[21]||(t[21]=[(0,r.Lk)("option",{value:""},"Choisissez une option",-1),(0,r.Lk)("option",{value:"Facile"},"Facile",-1),(0,r.Lk)("option",{value:"Intermédiaire"},"Intermédiaire",-1),(0,r.Lk)("option",{value:"Complexe"},"Complexe",-1)]),512),[[s.u1,W.localRecipe.difficulty]]),W.errors.difficulty?((0,r.uX)(),(0,r.CE)("span",k,(0,n.v_)(W.errors.difficulty),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",y,[t[23]||(t[23]=(0,r.Lk)("label",{for:"recipe-people"},"Nombre de personnes",-1)),(0,r.bo)((0,r.Lk)("input",{type:"number",id:"recipe-people","onUpdate:modelValue":t[4]||(t[4]=e=>W.localRecipe.number_of_person=e),min:"1"},null,512),[[s.Jo,W.localRecipe.number_of_person]]),W.errors.number_of_person?((0,r.uX)(),(0,r.CE)("span",_,(0,n.v_)(W.errors.number_of_person),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",R,[t[25]||(t[25]=(0,r.Lk)("label",{for:"recipe-cuisine"},"Cuisine",-1)),(0,r.bo)((0,r.Lk)("select",{id:"recipe-cuisine","onUpdate:modelValue":t[5]||(t[5]=e=>W.localRecipe.cuisine_type=e)},t[24]||(t[24]=[(0,r.Fv)('<option value="" data-v-c16c118c>Choisissez une option</option><option value="Africaine" data-v-c16c118c>Africaine</option><option value="Asiatique" data-v-c16c118c>Asiatique</option><option value="Européenne" data-v-c16c118c>Européenne</option><option value="Américaine" data-v-c16c118c>Américaine</option>',5)]),512),[[s.u1,W.localRecipe.cuisine_type]]),W.errors.cuisine_type?((0,r.uX)(),(0,r.CE)("span",L,(0,n.v_)(W.errors.cuisine_type),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",b,[t[27]||(t[27]=(0,r.Lk)("label",{for:"recipe-type"},"Type",-1)),(0,r.bo)((0,r.Lk)("select",{id:"recipe-type","onUpdate:modelValue":t[6]||(t[6]=e=>W.localRecipe.category_type=e)},t[26]||(t[26]=[(0,r.Fv)('<option value="" data-v-c16c118c>Choisissez une option</option><option value="Petit-déjeuner" data-v-c16c118c>Petit-déjeuner</option><option value="Lunch" data-v-c16c118c>Lunch</option><option value="Dîner" data-v-c16c118c>Dîner</option><option value="Dessert" data-v-c16c118c>Dessert</option>',5)]),512),[[s.u1,W.localRecipe.category_type]]),W.errors.category_type?((0,r.uX)(),(0,r.CE)("span",C,(0,n.v_)(W.errors.category_type),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",A,[t[28]||(t[28]=(0,r.Lk)("label",null,"Ingrédients",-1)),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(W.localRecipe.ingredients,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:t,class:"ingredient-group"},[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t=>e.food_name=t,placeholder:"Nom de l'ingrédient"},null,8,E),[[s.Jo,e.food_name]]),(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t=>e.quantity=t,placeholder:"Quantité"},null,8,w),[[s.Jo,e.quantity]]),(0,r.Lk)("button",{type:"button",onClick:e=>D.removeIngredient(t),class:"remove-btn"},"Supprimer",8,F)])))),128)),(0,r.Lk)("button",{type:"button",onClick:t[7]||(t[7]=(...e)=>D.addIngredient&&D.addIngredient(...e)),class:"add-btn"},"Ajouter un ingrédient"),W.errors.ingredients?((0,r.uX)(),(0,r.CE)("span",I,(0,n.v_)(W.errors.ingredients),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",U,[t[29]||(t[29]=(0,r.Lk)("label",null,"Instructions",-1)),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(W.localRecipe.instructions,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:t,class:"instruction-group"},[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t=>e.step=t,placeholder:"Étape d'instruction"},null,8,x),[[s.Jo,e.step]]),(0,r.Lk)("button",{type:"button",onClick:e=>D.removeInstruction(t),class:"remove-btn"},"Supprimer",8,M)])))),128)),(0,r.Lk)("button",{type:"button",onClick:t[8]||(t[8]=(...e)=>D.addInstruction&&D.addInstruction(...e)),class:"add-btn"},"Ajouter une étape"),W.errors.instructions?((0,r.uX)(),(0,r.CE)("span",X,(0,n.v_)(W.errors.instructions),1)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",V,[t[34]||(t[34]=(0,r.Lk)("label",null,"Sans allergène",-1)),(0,r.Lk)("div",j,[(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Lactose","onUpdate:modelValue":t[9]||(t[9]=e=>W.localRecipe.allergens_list=e)},null,512),[[s.lH,W.localRecipe.allergens_list]]),t[30]||(t[30]=(0,r.eW)(" Lactose"))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Gluten","onUpdate:modelValue":t[10]||(t[10]=e=>W.localRecipe.allergens_list=e)},null,512),[[s.lH,W.localRecipe.allergens_list]]),t[31]||(t[31]=(0,r.eW)(" Gluten"))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Arachide","onUpdate:modelValue":t[11]||(t[11]=e=>W.localRecipe.allergens_list=e)},null,512),[[s.lH,W.localRecipe.allergens_list]]),t[32]||(t[32]=(0,r.eW)(" Arachide"))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Œuf","onUpdate:modelValue":t[12]||(t[12]=e=>W.localRecipe.allergens_list=e)},null,512),[[s.lH,W.localRecipe.allergens_list]]),t[33]||(t[33]=(0,r.eW)(" Œuf"))])])]),(0,r.Lk)("div",S,[(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox","onUpdate:modelValue":t[13]||(t[13]=e=>W.localRecipe.public=e)},null,512),[[s.lH,W.localRecipe.public]]),t[35]||(t[35]=(0,r.eW)("Rendre cette recette publique "))])]),(0,r.Lk)("button",z,(0,n.v_)("create"===i.mode?"Créer la recette":"Modifier la recette"),1),(0,r.Lk)("button",{type:"button",onClick:t[14]||(t[14]=(...e)=>D.closeModal&&D.closeModal(...e)),class:"cancel-btn"},"Annuler")],32)])])):(0,r.Q3)("",!0)}i(4114),i(4603),i(7566),i(8721);var W={name:"EditRecipe",props:{isVisible:{type:Boolean,default:!1},mode:{type:String,required:!0},recipe:{type:Object,default:()=>({})}},data(){return{localRecipe:{recipe_name:"",preparation_time:"",difficulty:"",number_of_person:1,cuisine_type:"",category_type:"",ingredients:[],instructions:[{step:""}],allergens_list:[],image:null,public:!1},previewImage:null,errors:{}}},watch:{recipe:{immediate:!0,handler(e){e&&Object.keys(e).length>0?(this.localRecipe={...e},this.previewImage=null,"string"===typeof e.instructions&&(this.localRecipe.instructions=e.instructions.split("\n").map((e=>({step:e.trim()}))))):this.localRecipe={recipe_name:"",preparation_time:"",difficulty:"",number_of_person:1,cuisine_type:"",category_type:"",ingredients:[],instructions:[{step:""}],allergens_list:[],image:null,public:!1}}}},methods:{validateForm(){this.errors={},this.localRecipe.recipe_name||(this.errors.recipe_name="Le titre est obligatoire."),this.localRecipe.preparation_time||(this.errors.preparation_time="Veuillez choisir un temps de préparation."),this.localRecipe.difficulty||(this.errors.difficulty="Veuillez choisir une difficulté."),(!this.localRecipe.number_of_person||this.localRecipe.number_of_person<1)&&(this.errors.number_of_person="Veuillez indiquer un nombre de personnes valide."),this.localRecipe.cuisine_type||(this.errors.cuisine_type="Veuillez choisir un type de cuisine."),this.localRecipe.category_type||(this.errors.category_type="Veuillez choisir une catégorie de recette."),this.localRecipe.ingredients.some((e=>e.food_name&&e.quantity))||(this.errors.ingredients="Veuillez ajouter au moins un ingrédient avec sa quantité."),this.localRecipe.instructions.some((e=>e.step))||(this.errors.instructions="Veuillez ajouter au moins une étape d'instruction."),0===Object.keys(this.errors).length&&this.handleSubmit()},handleSubmit(){"create"===this.mode?this.$emit("create-recipe",{...this.localRecipe}):"edit"===this.mode&&this.$emit("update-recipe",{...this.localRecipe,image:this.localRecipe.image}),this.closeModal()},closeModal(){this.$emit("close")},handleFileUpload(e){const t=e.target.files[0];if(t){const e=t.type;"image/png"===e||"image/jpeg"===e?(this.localRecipe.image=t,this.previewImage=URL.createObjectURL(t)):this.errors.image="Seuls les fichiers PNG et JPG sont acceptés."}},addIngredient(){Array.isArray(this.localRecipe.ingredients)||(this.localRecipe.ingredients=[]),this.localRecipe.ingredients.push({food_name:"",quantity:""})},removeIngredient(e){this.localRecipe.ingredients.splice(e,1)},addInstruction(){Array.isArray(this.localRecipe.instructions)||(this.localRecipe.instructions=[]),this.localRecipe.instructions.push({step:""})},removeInstruction(e){this.localRecipe.instructions.splice(e,1)}}},D=i(1241);const P=(0,D.A)(W,[["render",$],["__scopeId","data-v-c16c118c"]]);var Q=P},5090:function(e,t,i){i.r(t),i.d(t,{default:function(){return P}});var r=i(6768),s=i(5130),n=i(4232);const l={class:"my-recipes-page"},o={class:"allergen-filters"},a={key:0,style:{"text-align":"center"}},c={key:1,class:"no-recipes"},p={key:2,class:"recipes-list"},u={key:0,class:"favorite-icon"},d=["src"],h=["onClick"],g={key:2,class:"attention-warning"},m={key:3,class:"modal-overlay"},v={class:"modal-content"},f=["src"],k={class:"recipe-info-container"},y={class:"recipe-info-line"},_={class:"info-item"},R={class:"info-item"},L={class:"info-item"},b={class:"info-item"},C={class:"recipe-info-line"},A={class:"info-item"},E={class:"info-item"},w={class:"info-item"},F={key:1,style:{"text-align":"center"}},I={key:2,style:{"text-align":"center"}},U={class:"average-rating"},x={class:"rating-container"},M={class:"stars"},X=["onClick"];function V(e,t,i,V,j,S){const z=(0,r.g2)("EditRecipe");return(0,r.uX)(),(0,r.CE)("div",l,[t[35]||(t[35]=(0,r.Lk)("h2",null,"Mes recettes",-1)),(0,r.Lk)("div",o,[(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Gluten","onUpdate:modelValue":t[0]||(t[0]=e=>j.selectedAllergens=e)},null,512),[[s.lH,j.selectedAllergens]]),t[15]||(t[15]=(0,r.eW)(" Sans Gluten "))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Lactose","onUpdate:modelValue":t[1]||(t[1]=e=>j.selectedAllergens=e)},null,512),[[s.lH,j.selectedAllergens]]),t[16]||(t[16]=(0,r.eW)(" Sans Lactose "))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Oeuf","onUpdate:modelValue":t[2]||(t[2]=e=>j.selectedAllergens=e)},null,512),[[s.lH,j.selectedAllergens]]),t[17]||(t[17]=(0,r.eW)(" Sans Oeuf "))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox",value:"Arachide","onUpdate:modelValue":t[3]||(t[3]=e=>j.selectedAllergens=e)},null,512),[[s.lH,j.selectedAllergens]]),t[18]||(t[18]=(0,r.eW)(" Sans Arachide "))]),(0,r.Lk)("label",null,[(0,r.bo)((0,r.Lk)("input",{type:"checkbox","onUpdate:modelValue":t[4]||(t[4]=e=>j.showProfileFilter=e),onChange:t[5]||(t[5]=(...e)=>S.filterRecipes&&S.filterRecipes(...e))},null,544),[[s.lH,j.showProfileFilter]]),t[19]||(t[19]=(0,r.eW)(" Mon profil "))])]),j.showProfileFilter&&0===j.userAllergens.length?((0,r.uX)(),(0,r.CE)("p",a," Seules les recettes sans mention d'allergènes sont affichées car vous n'avez spécifié aucun allergène dans votre profil. ")):(0,r.Q3)("",!0),(0,r.Lk)("div",null,[(0,r.Lk)("button",{onClick:t[6]||(t[6]=(...e)=>S.toggleFavorites&&S.toggleFavorites(...e))},(0,n.v_)(j.showFavorites?"Afficher toutes les recettes":"Afficher mes favoris"),1)]),0===j.recipes.length?((0,r.uX)(),(0,r.CE)("div",c,t[20]||(t[20]=[(0,r.Lk)("p",null,"Aucune recette n'a été enregistrée pour le moment.",-1)]))):((0,r.uX)(),(0,r.CE)("div",p,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(j.filteredRecipes,(e=>((0,r.uX)(),(0,r.CE)("div",{key:e.recipe_id,class:"recipe-card"},[(0,r.Lk)("h3",null,(0,n.v_)(e.recipe_name),1),e.isFavorite?((0,r.uX)(),(0,r.CE)("div",u,t[21]||(t[21]=[(0,r.Lk)("i",{class:"bi bi-heart-fill",style:{color:"red"}},null,-1)]))):(0,r.Q3)("",!0),e.image_url?((0,r.uX)(),(0,r.CE)("img",{key:1,src:e.image_url,alt:"Image de la recette",class:"modal-recipe-image"},null,8,d)):(0,r.Q3)("",!0),(0,r.Lk)("button",{onClick:t=>S.openModal(e)},"Voir les détails",8,h),S.getMissingAllergens(e).length>0?((0,r.uX)(),(0,r.CE)("div",g,[t[24]||(t[24]=(0,r.Lk)("i",{class:"bi bi-exclamation-triangle-fill"},null,-1)),(0,r.Lk)("p",null,[t[22]||(t[22]=(0,r.eW)(" Ces allergènes ne sont pas pris en compte dans cette recette : ")),(0,r.Lk)("strong",null,(0,n.v_)(S.getMissingAllergens(e).join(", ")),1),t[23]||(t[23]=(0,r.eW)(". "))])])):(0,r.Q3)("",!0)])))),128))])),j.showModal?((0,r.uX)(),(0,r.CE)("div",m,[(0,r.Lk)("div",v,[(0,r.Lk)("button",{class:"close-btn",onClick:t[7]||(t[7]=(...e)=>S.closeModal&&S.closeModal(...e))},"X"),(0,r.Lk)("h3",null,(0,n.v_)(j.currentRecipe.recipe_name),1),j.currentRecipe.image_url?((0,r.uX)(),(0,r.CE)("img",{key:0,src:j.currentRecipe.image_url,alt:"Image de la recette",class:"recipe-image"},null,8,f)):(0,r.Q3)("",!0),(0,r.Lk)("div",k,[(0,r.Lk)("div",y,[(0,r.Lk)("div",_,[t[25]||(t[25]=(0,r.Lk)("strong",null,"Généré par l'IA :",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.created_by_ai?"Oui":"Non"),1)]),(0,r.Lk)("div",R,[t[26]||(t[26]=(0,r.Lk)("strong",null,"Temps de préparation:",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.preparation_time),1)]),(0,r.Lk)("div",L,[t[27]||(t[27]=(0,r.Lk)("strong",null,"Difficulté:",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.difficulty),1)]),(0,r.Lk)("div",b,[t[28]||(t[28]=(0,r.Lk)("strong",null,"Nombre de personnes:",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.number_of_person),1)])]),(0,r.Lk)("div",C,[(0,r.Lk)("div",A,[t[29]||(t[29]=(0,r.Lk)("strong",null,"Cuisine:",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.cuisine_type),1)]),(0,r.Lk)("div",E,[t[30]||(t[30]=(0,r.Lk)("strong",null,"Type:",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.category_type),1)]),(0,r.Lk)("div",w,[t[31]||(t[31]=(0,r.Lk)("strong",null,"Sans allergène :",-1)),(0,r.eW)(" "+(0,n.v_)(j.currentRecipe.allergens_list?.join(", ")||"Pas de mention"),1)])])]),t[33]||(t[33]=(0,r.Lk)("h4",null,"Ingrédients",-1)),(0,r.Lk)("ul",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(j.currentRecipe.ingredients,((e,t)=>((0,r.uX)(),(0,r.CE)("li",{key:t},(0,n.v_)(e.quantity)+" "+(0,n.v_)(e.food_name),1)))),128))]),t[34]||(t[34]=(0,r.Lk)("h4",null,"Instructions",-1)),(0,r.Lk)("ol",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(S.formattedInstructionsArray,((e,t)=>((0,r.uX)(),(0,r.CE)("li",{key:t},(0,n.v_)(e),1)))),128))]),0===j.currentRecipe.averageRating?((0,r.uX)(),(0,r.CE)("p",F,"Cette recette n'a pas encore été notée.")):((0,r.uX)(),(0,r.CE)("p",I,"Voici la note reçue de la recette.")),(0,r.Lk)("div",U,[((0,r.uX)(),(0,r.CE)(r.FK,null,(0,r.pI)(5,(e=>(0,r.Lk)("span",{key:e,class:(0,n.C4)(["star",{filled:e<=j.currentRecipe.averageRating}])}," ★ ",2))),64))]),(0,r.Lk)("div",x,[t[32]||(t[32]=(0,r.Lk)("p",{style:{"text-align":"center"}},"Noter la recette ?",-1)),(0,r.Lk)("div",M,[((0,r.uX)(),(0,r.CE)(r.FK,null,(0,r.pI)(5,(e=>(0,r.Lk)("span",{key:e,class:(0,n.C4)(["star",{filled:e<=j.currentRecipe.rating}]),onClick:t=>S.rateRecipe(e)}," ★ ",10,X))),64))])]),(0,r.Lk)("div",null,[j.isFavorite?((0,r.uX)(),(0,r.CE)("button",{key:1,onClick:t[9]||(t[9]=(...e)=>S.removeFromFavorites&&S.removeFromFavorites(...e))},"Retirer des favoris")):((0,r.uX)(),(0,r.CE)("button",{key:0,onClick:t[8]||(t[8]=(...e)=>S.addToFavorites&&S.addToFavorites(...e))},"Ajouter aux favoris"))]),(0,r.Lk)("button",{onClick:t[10]||(t[10]=(...e)=>S.addToShoppingList&&S.addToShoppingList(...e))},"Ajouter à la liste des courses"),(0,r.Lk)("button",{onClick:t[11]||(t[11]=(...e)=>S.openEditModal&&S.openEditModal(...e))},"Modifier"),(0,r.Lk)("button",{onClick:t[12]||(t[12]=(...e)=>S.generatePDF&&S.generatePDF(...e))},"Exporter en PDF"),(0,r.Lk)("button",{onClick:t[13]||(t[13]=(...e)=>S.confirmDeleteRecipe&&S.confirmDeleteRecipe(...e))},"Supprimer"),(0,r.Lk)("button",{onClick:t[14]||(t[14]=(...e)=>S.closeModal&&S.closeModal(...e))},"Fermer")])])):(0,r.Q3)("",!0),j.showEditModal?((0,r.uX)(),(0,r.Wv)(z,{key:4,mode:"edit",isVisible:j.showEditModal,onClose:S.closeEditModal,onUpdateRecipe:S.handleUpdateRecipe,recipe:j.currentRecipe},null,8,["isVisible","onClose","onUpdateRecipe","recipe"])):(0,r.Q3)("",!0)])}var j=i(4373),S=i(4433),z=i(1749),$={name:"MyRecipesPage",components:{EditRecipe:S.A},data(){return{recipes:[],userAllergens:[],filteredRecipes:[],selectedAllergens:[],showModal:!1,showEditModal:!1,showProfileFilter:!1,currentRecipe:null,errorMessage:"",isFavorite:!1,showFavorites:!1}},computed:{formattedInstructionsArray(){return this.currentRecipe?.instructions?"string"===typeof this.currentRecipe.instructions?this.currentRecipe.instructions.split("\n").filter((e=>""!==e.trim())):Array.isArray(this.currentRecipe.instructions)?this.currentRecipe.instructions.map((e=>"object"===typeof e?e.step:e)):[]:[]}},methods:{toggleFavorites(){this.showFavorites=!this.showFavorites,this.filterRecipes()},filterRecipes(){this.filteredRecipes=this.recipes.filter((e=>{const t=!this.showFavorites||e.isFavorite,i=this.selectedAllergens.every((t=>e.allergens_list?.includes(t))),r=!this.showProfileFilter||(0===this.userAllergens.length?!e.allergens_list||0===e.allergens_list.length:this.userAllergens.every((t=>e.allergens_list?.includes(t))));return t&&i&&r}))},async convertImageToBase64(e){return new Promise(((t,i)=>{const r=new Image;r.crossOrigin="Anonymous",r.onload=()=>{const e=document.createElement("canvas");e.width=r.width,e.height=r.height;const i=e.getContext("2d");i.drawImage(r,0,0),t(e.toDataURL("image/png"))},r.onerror=e=>i(e),r.src=e}))},async generatePDF(){if(!this.currentRecipe)return void alert("Aucune recette sélectionnée pour générer le PDF.");const e=new z.uE;let t=10;e.setFontSize(20),e.text(this.currentRecipe.recipe_name,10,t),t+=10,e.setFontSize(12),e.text(`Temps de préparation: ${this.currentRecipe.preparation_time}`,10,t),t+=10,e.text(`Difficulté: ${this.currentRecipe.difficulty}`,10,t),t+=10,e.text(`Nombre de personnes: ${this.currentRecipe.number_of_person}`,10,t),t+=10,e.text(`Cuisine: ${this.currentRecipe.cuisine_type}`,10,t),t+=10,e.text(`Type: ${this.currentRecipe.category_type}`,10,t),t+=10;const i=this.currentRecipe.allergens_list?.length?this.currentRecipe.allergens_list.join(", "):"Aucun allergène spécifié.";if(e.text(`Sans allergène: ${i}`,10,t),t+=10,this.currentRecipe.image_url)try{const i=await this.convertImageToBase64(this.currentRecipe.image_url);e.addImage(i,"PNG",10,t,80,80),t+=90}catch(s){console.error("Erreur lors du chargement de l'image :",s)}e.setFontSize(14),e.text("Ingrédients:",10,t),t+=10,e.setFontSize(12),this.currentRecipe.ingredients.forEach((i=>{e.text(`${i.quantity} ${i.food_name}`,10,t),t+=10})),e.setFontSize(14),e.text("Instructions:",10,t),t+=10,e.setFontSize(12);const r=10;this.formattedInstructionsArray.forEach(((i,s)=>{const n=e.splitTextToSize(`${s+1}. ${i}`,190);e.text(n,10,t),t+=n.length*r})),e.save(`${this.currentRecipe.recipe_name}.pdf`)},async rateRecipe(e){try{if(!this.currentRecipe?.recipe_id)throw new Error("Aucune recette sélectionnée.");const t=await j.A.post("https://tfe-3483aa964321.herokuapp.com/recipes/rate",{recipeId:this.currentRecipe.recipe_id,rating:e},{withCredentials:!0});alert(t.data.message||"Note enregistrée avec succès."),this.currentRecipe.rating=e,await this.fetchAverageRating(this.currentRecipe.recipe_id)}catch(t){console.error("Erreur lors de l'envoi de la note :",t),alert("Une erreur est survenue lors de l'enregistrement de la note.")}},async fetchAverageRating(e){try{const t=await j.A.get(`https://tfe-3483aa964321.herokuapp.com/recipes/rate/average/${e}`,{withCredentials:!0});this.currentRecipe.averageRating=parseFloat(t.data.averageRating)||0}catch(t){console.error("Erreur lors de la récupération de la moyenne des notes :",t),this.currentRecipe.averageRating=0,alert("Impossible de récupérer la moyenne des notes.")}},async fetchUserRecipes(){try{const e=await j.A.get("https://tfe-3483aa964321.herokuapp.com/recipes/user",{withCredentials:!0}),t=await j.A.get("https://tfe-3483aa964321.herokuapp.com/recipes/favorites",{withCredentials:!0}),i=t.data.map((e=>e.recipe_id));this.recipes=e.data.map((e=>({...e,isFavorite:i.includes(e.recipe_id)}))),this.filterRecipes()}catch(e){console.error("Erreur lors de la récupération des recettes utilisateur :",e),this.errorMessage="Une erreur est survenue lors de la récupération de vos recettes. Veuillez réessayer plus tard."}},async loadUserAllergens(){this.userAllergens=await this.fetchUserAllergens()},async fetchUserAllergens(){try{const e=await j.A.get("https://tfe-3483aa964321.herokuapp.com/users/restrictions",{withCredentials:!0});return e.data.restrictions||[]}catch(e){return console.error("Erreur lors de la récupération des restrictions alimentaires :",e),alert("Impossible de récupérer les restrictions alimentaires. Veuillez réessayer."),[]}},getMissingAllergens(e){return this.userAllergens.length?e.allergens_list?this.userAllergens.filter((t=>!e.allergens_list.includes(t))):[...this.userAllergens]:[]},async addToShoppingList(){try{const e=await j.A.post("https://tfe-3483aa964321.herokuapp.com/shopping-list/add",{recipeId:this.currentRecipe.recipe_id},{withCredentials:!0});alert(e.data.message)}catch(e){console.error("Erreur lors de l'ajout à la liste des courses:",e),alert("Une erreur est survenue.")}},async deleteRecipe(){try{await j.A.delete(`https://tfe-3483aa964321.herokuapp.com/recipes/${this.currentRecipe.recipe_id}`,{withCredentials:!0}),this.recipes=this.recipes.filter((e=>e.recipe_id!==this.currentRecipe.recipe_id)),alert("Recette supprimée avec succès."),this.closeModal()}catch(e){console.error("Erreur lors de la suppression de la recette :",e),alert("Une erreur est survenue lors de la suppression.")}},async handleUpdateRecipe(e){try{const t=new FormData;t.append("title",e.recipe_name),t.append("time",e.preparation_time),t.append("difficulty",e.difficulty),t.append("people",e.number_of_person),t.append("cuisine",e.cuisine_type),t.append("type",e.category_type),t.append("public",e.public),t.append("ingredients",JSON.stringify(e.ingredients)),t.append("instructions",JSON.stringify(e.instructions)),t.append("restrictionsList",JSON.stringify(e.allergens_list)),e.image&&t.append("image",e.image);const i=await j.A.put(`https://tfe-3483aa964321.herokuapp.com/recipes/update/${e.recipe_id}`,t,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});200===i.status&&(alert("Recette mise à jour avec succès"),e.image_url=i.data.updatedRecipe.image_url,this.updateRecipe(e),this.currentRecipe={...this.currentRecipe,...e},this.updateRecipe(e),this.currentRecipe={...e,instructions:Array.isArray(e.instructions)?e.instructions.map((e=>"object"===typeof e?e.step:e)).join("\n"):e.instructions}),this.closeEditModal()}catch(t){console.error("Erreur lors de la mise à jour de la recette :",t),alert("Une erreur est survenue lors de la mise à jour de la recette.")}},async addToFavorites(){try{if(!this.currentRecipe?.recipe_id)throw new Error("Aucune recette sélectionnée pour ajouter aux favoris.");const e=await j.A.post("https://tfe-3483aa964321.herokuapp.com/recipes/favorites/add",{recipeId:this.currentRecipe.recipe_id},{withCredentials:!0});alert(e.data.message||"Recette ajoutée aux favoris avec succès."),this.isFavorite=!0,this.currentRecipe.isFavorite=!0;const t=this.recipes.findIndex((e=>e.recipe_id===this.currentRecipe.recipe_id));-1!==t&&(this.recipes[t].isFavorite=!0),this.filterRecipes()}catch(e){e.response&&409===e.response.status?alert("Cette recette est déjà dans vos favoris."):(console.error("Erreur lors de l'ajout aux favoris :",e),alert("Une erreur est survenue lors de l'ajout aux favoris."))}},async checkIfFavorite(e){try{const t=await j.A.get(`https://tfe-3483aa964321.herokuapp.com/recipes/favorites/check/${e}`,{withCredentials:!0});this.isFavorite=t.data.isFavorite}catch(t){console.error("Erreur lors de la vérification du statut des favoris :",t),this.isFavorite=!1}},async removeFromFavorites(){try{if(!this.currentRecipe?.recipe_id)throw new Error("Aucune recette sélectionnée pour retirer des favoris.");const e=await j.A.delete(`https://tfe-3483aa964321.herokuapp.com/recipes/favorites/remove/${this.currentRecipe.recipe_id}`,{withCredentials:!0});alert(e.data.message||"Recette retirée des favoris avec succès."),this.isFavorite=!1,this.currentRecipe.isFavorite=!1;const t=this.recipes.findIndex((e=>e.recipe_id===this.currentRecipe.recipe_id));-1!==t&&(this.recipes[t].isFavorite=!1),this.filterRecipes()}catch(e){console.error("Erreur lors du retrait des favoris :",e),alert("Une erreur est survenue lors du retrait des favoris.")}},confirmDeleteRecipe(){confirm("Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.")&&this.deleteRecipe()},async openModal(e){this.currentRecipe={...e,rating:e.rating||0},this.showModal=!0,this.currentRecipe?.recipe_id&&(await this.fetchAverageRating(this.currentRecipe.recipe_id),await this.checkIfFavorite(this.currentRecipe.recipe_id))},closeModal(){this.showModal=!1,this.currentRecipe=null},openEditModal(){this.showEditModal=!0},closeEditModal(){this.showEditModal=!1},updateRecipe(e){const t=this.recipes.findIndex((t=>t.recipe_id===e.recipe_id));if(-1!==t){const i=this.recipes[t];e.image_url=e.image_url||i.image_url,this.recipes[t]={...i,...e}}this.closeEditModal()}},mounted(){this.fetchUserRecipes(),this.loadUserAllergens()},watch:{selectedAllergens:{handler(){this.filterRecipes()},deep:!0},showFavorites:"filterRecipes"}},W=i(1241);const D=(0,W.A)($,[["render",V],["__scopeId","data-v-5a4ff776"]]);var P=D}}]);
//# sourceMappingURL=90.82a827bb.js.map