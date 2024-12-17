"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[485],{4485:function(t,e,s){s.r(e),s.d(e,{default:function(){return _}});var a=s(6768),i=s(4232),n=s(5130);const o={class:"grocery-container"},u={class:"grocery-list"},r={class:"grocery-details"},d={class:"food-name"},l={key:0,class:"food-quantity"},c={key:1,class:"food-quantity"},p={class:"grocery-actions"},h={key:0,class:"update-section"},y=["onUpdate:modelValue"],f=["onClick"],m=["onClick"],k={key:1,class:"non-modifiable"},q=["onClick"];function g(t,e,s,g,C,I){return(0,a.uX)(),(0,a.CE)("div",o,[e[0]||(e[0]=(0,a.Lk)("h1",null,"Ma liste des courses",-1)),(0,a.Lk)("ul",u,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(C.shoppingItems,((t,e)=>((0,a.uX)(),(0,a.CE)("li",{key:e,class:"grocery-item"},[(0,a.Lk)("div",r,[(0,a.Lk)("span",d,(0,i.v_)(t.food_name),1),t.quantity?((0,a.uX)(),(0,a.CE)("span",l,(0,i.v_)(t.quantity),1)):((0,a.uX)(),(0,a.CE)("span",c,"(pas de quantité définie)"))]),(0,a.Lk)("div",p,[t.quantity&&I.isQuantityNumeric(t.quantity)?((0,a.uX)(),(0,a.CE)("div",h,[(0,a.bo)((0,a.Lk)("input",{type:"number","onUpdate:modelValue":e=>C.quantities[t.food_id]=e,placeholder:"Nouvelle quantité",class:"quantity-input"},null,8,y),[[n.Jo,C.quantities[t.food_id],void 0,{number:!0}]]),(0,a.Lk)("button",{onClick:e=>I.updateQuantity(t.food_id,"add"),class:"update-btn"},"Ajouter",8,f),(0,a.Lk)("button",{onClick:e=>I.updateQuantity(t.food_id,"subtract"),class:"subtract-btn"},"Soustraire",8,m)])):t.quantity?((0,a.uX)(),(0,a.CE)("span",k)):(0,a.Q3)("",!0),(0,a.Lk)("button",{onClick:e=>I.deleteItem(t.food_name),class:"delete-btn"},"Supprimer",8,q)])])))),128))])])}var C=s(4373),I={name:"GroceryPage",data(){return{shoppingItems:[],quantities:{}}},methods:{async fetchShoppingList(){try{const t=await C.A.get("https://tfe-3483aa964321.herokuapp.com/shopping-list/",{withCredentials:!0});this.listId=t.data.listId,this.shoppingItems=t.data.items,this.shoppingItems.forEach((t=>{if(this.isQuantityNumeric(t.quantity)){const e=t.quantity.match(/^(\d+)/);this.quantities[t.food_id]=e?parseInt(e[1],10):0}}))}catch(t){t.response&&404===t.response.status?alert("Aucune liste des courses trouvée."):console.error("Erreur lors de la récupération de la liste des courses :",t)}},async deleteItem(t){try{await C.A.delete("https://tfe-3483aa964321.herokuapp.com/shopping-list/delete",{params:{food_name:t},withCredentials:!0}),this.shoppingItems=this.shoppingItems.filter((e=>e.food_name!==t))}catch(e){console.error("Erreur lors de la suppression de l'aliment :",e)}},async updateQuantity(t,e="add"){const s=this.quantities[t];if(void 0===s||s<=0)return void alert("Veuillez entrer une quantité valide.");const a="add"===e?s:-s;try{const s=this.shoppingItems.find((e=>e.food_id===t));if(s){const t=parseInt(s.quantity.match(/^(\d+)/)[1],10);if("subtract"===e&&t+a<=0)return void alert("La quantité ne peut pas être égale à 0.")}const i=await C.A.post("https://tfe-3483aa964321.herokuapp.com/shopping-list/update-quantity",{listId:this.listId,foodId:t,incrementValue:a},{withCredentials:!0});s&&(s.quantity=i.data.newQuantity)}catch(i){console.error("Erreur lors de la mise à jour de la quantité :",i)}},isQuantityNumeric(t){return/^\d+/.test(t)}},mounted(){this.fetchShoppingList()}},v=s(1241);const b=(0,v.A)(I,[["render",g],["__scopeId","data-v-03a158f3"]]);var _=b}}]);
//# sourceMappingURL=485.ced4e059.js.map