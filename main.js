(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{aboutSelector:()=>v,addCardBtn:()=>T,addCardPopupSelector:()=>o,avatarSelector:()=>y,baseUri:()=>B,cardItemsSelector:()=>d,cardPreviewCaptionSelector:()=>p,cardPreviewImageSelector:()=>f,cardPreviewPopupSelector:()=>a,cardTemplate:()=>I,cardTemplateSelector:()=>b,cardsContainer:()=>q,editAvatarBtn:()=>P,editAvatarPopupSelector:()=>n,editProfileBtn:()=>j,editProfilePopupSelector:()=>r,errorClass:()=>S,formSelector:()=>c,headers:()=>U,inactiveSubmitClass:()=>E,inputErrorClass:()=>w,inputSelector:()=>s,likeItemsSelector:()=>_,likePopupSelector:()=>u,likeTemplateSelector:()=>g,likesTemplateSelector:()=>k,popupActiveClass:()=>L,popupCloseBtnSelector:()=>h,removeCardPopupSelector:()=>i,spinnerClass:()=>O,spinnerVisibleClass:()=>C,submitProcessDefaultText:()=>D,submitProcessRemoveText:()=>x,submitSelector:()=>l,userNameSelector:()=>m,validationConfig:()=>R});var n=".popup#edit-avatar",r=".popup#edit-profile",o=".popup#add-card",i=".popup#remove-card",a=".popup#card-preview",u=".likes-view",c=".form-view__form",s=".form-view__input",l=".form-view__submit",f=".picture-view__image",p=".picture-view__caption",h=".popup__close-button",d=".cards-grid__items",_=".likes-view__items",m=".profile__title",v=".profile__subtitle",y=".profile__image",b="#card-template",k="#likes",g="#like",E="form-view__submit_disabled",w="form-view__input_type_error",S="error_visible",L="popup_active",O="spinner",C="spinner_visible",P=document.querySelector(".profile__button.profile__button_type_edit-image"),j=document.querySelector(".profile__button.profile__button_type_edit"),T=document.querySelector(".profile__button.profile__button_type_add"),R={formSelector:c,inputSelector:s,submitSelector:l,inactiveSubmitClass:E,inputErrorClass:w,errorClass:S},I=document.querySelector(b),q=document.querySelector(d),D="Сохранение...",x="Удаление...",B="https://mesto.nomoreparties.co/v1/cohort-18",U={authorization:"e1917e0b-6d7d-4255-81d0-fb0ca13ea044"};function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(Object(n),!0).forEach((function(t){F(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function J(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var N="/cards/",M="/users/me/",H="/cards/likes/",K=new(function(){function e(t){var n=t.baseUri,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUri=n,this._headers=r}var t,n;return t=e,(n=[{key:"addCard",value:function(e){var t=A(A({},this._headers),{},{"Content-Type":"application/json"});return this._sendJson(N,"POST",t,JSON.stringify(e))}},{key:"deleteCard",value:function(e){return this._sendJson(N+e,"DELETE",this._headers)}},{key:"getCards",value:function(){return this._sendJson(N,"GET",this._headers)}},{key:"getUserInfo",value:function(){return this._sendJson(M,"GET",this._headers)}},{key:"setAvatar",value:function(e){var t=A(A({},this._headers),{},{"Content-Type":"application/json"});return this._sendJson("/users/me/avatar/","PATCH",t,JSON.stringify(e))}},{key:"setUserInfo",value:function(e){var t=A(A({},this._headers),{},{"Content-Type":"application/json"});return this._sendJson(M,"PATCH",t,JSON.stringify(e))}},{key:"like",value:function(e){return this._sendJson(H+e,"PUT",this._headers)}},{key:"unlike",value:function(e){return this._sendJson(H+e,"DELETE",this._headers)}},{key:"_sendJson",value:function(e,t,n,r){var o=this._baseUri+e;return fetch(o,{method:t,headers:n,body:r}).then((function(e){return console.debug("".concat(t," ").concat(o," status: ").concat(e.status)),e.ok?e.json():Promise.reject()}))}}])&&J(t.prototype,n),e}())({baseUri:B,headers:U});function G(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var z=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._createElement(t)}var t,n;return t=e,(n=[{key:"render",value:function(e){this.spinnerElement&&(e?this.spinnerElement.classList.add(C):this.spinnerElement.classList.remove(C))}},{key:"remove",value:function(){this.spinnerElement.remove(),this.spinnerElement=null}},{key:"_createElement",value:function(e){this.spinnerElement=document.createElement("div"),this.spinnerElement.classList.add(O,C),e.appendChild(this.spinnerElement)}}])&&G(t.prototype,n),e}();function W(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var Q=function(){function e(t){var n=t.image,r=t.autoReload;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._image=n,this._autoReload=r,this._spinner=new z(n.parentElement),this._getMutationObserver().observe(n,{attributes:!0})}var t,n;return t=e,(n=[{key:"render",value:function(e){this._image.src=e}},{key:"_getMutationObserver",value:function(){var e=this;return new MutationObserver((function(t){t.filter((function(e){return e.attributeName.includes("src")})).forEach((function(){e._waitImgLoading().then((function(){console.debug("loaded image url ".concat(e._image.src)),e._spinner.remove()})).catch((function(){console.debug("failed to load image url ".concat(e._image.src)),e._spinner.render(!1),e._autoReload&&setTimeout((function(){return e.render(e._image.src)}),1e4)}))}))}))}},{key:"_waitImgLoading",value:function(){var e=this;return this._spinner.render(!0),new Promise((function(t,n){e._image.onload=t,e._image.onerror=n}))}}])&&W(t.prototype,n),e}();function X(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var Y=function(){function e(t){var n=t.userNameSelector,r=t.aboutSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameElement=document.querySelector(n),this._aboutElement=document.querySelector(r),this._avatarElement=document.querySelector(o),this._avatarRenderer=new Q({image:this._avatarElement,autoReload:!0})}var t,n;return t=e,(n=[{key:"info",get:function(){return{_id:this._id,name:this._userNameElement.textContent,about:this._aboutElement.textContent,avatar:this._avatarElement.src}},set:function(e){var t=e._id,n=e.name,r=e.about,o=e.avatar;this._id=t,this._userNameElement.textContent=n,this._aboutElement.textContent=r,this._avatarRenderer.render(o)}}])&&X(t.prototype,n),e}();function Z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var $=function(){function e(t,n,r,o,i,a,u,c,s){var l=t._id,f=t.name,p=t.link,h=t.likes,d=t.owner,_=t.createdAt;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._id=l,this._name=f,this._imageUrl=p,this._likes=null!=h?h:[],this._owner=d,this._createdAt=_,this._cardTemplate=document.querySelector(n),this._currentUser=r,this._onCardClick=o,this._onCardRemoveButtonClick=i,this._onShowLikes=a,this._onHideLikes=u,this._onLike=c,this._onUnlike=s}var t,n;return t=e,(n=[{key:"createElement",value:function(){return this._cardElement=this._createFromTemplate(),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardCaption=this._cardElement.querySelector(".card__caption"),this._cardRemoveBtn=this._cardElement.querySelector(".card__remove-button"),this._cardLike=this._cardElement.querySelector(".card__like"),this._cardLikeBtn=this._cardElement.querySelector(".card__like-button"),this._cardLikeCount=this._cardElement.querySelector(".card__like-count"),this._cardImageRenderer=new Q({image:this._cardImage,autoReload:!0}),this._userLiked=this._checkLike(),this._renderLikeElement(),this._setEventListeners(),this._cardCaption.textContent=this._name,this._cardImageRenderer.render(this._imageUrl),this._cardElement}},{key:"_createFromTemplate",value:function(){return this._cardTemplate.content.cloneNode(!0)}},{key:"_checkCardOwner",value:function(){return this._owner._id===this._currentUser.info._id}},{key:"_checkLike",value:function(){var e=this;return this._likes.some((function(t){return t._id===e._currentUser.info._id}))}},{key:"_renderLikeElement",value:function(){this._cardLikeBtn.onanimationend=function(e){return e.target.classList.remove("scaling")},this._cardLikeBtn.classList.add("scaling"),this._userLiked?this._cardLikeBtn.classList.add("card__like-button_checked"):this._cardLikeBtn.classList.remove("card__like-button_checked"),this._cardLikeCount.textContent=this._likes.length}},{key:"_setLikes",value:function(e){this._likes=e,this._userLiked=!this._userLiked,this._renderLikeElement(),this._renderLikes(this._cardLike,this._likes)}},{key:"_setEventListeners",value:function(){var e=this;this._cardImage.addEventListener("click",this._onCardClick),this._cardLikeBtn.addEventListener("click",this._onCardLikeButtonClick.bind(this)),this._cardLike.addEventListener("mouseenter",(function(){return e._onShowLikes(e._cardLike,e._likes)})),this._cardLike.addEventListener("mouseleave",(function(){return e._onHideLikes()})),this._checkCardOwner()?this._cardRemoveBtn.addEventListener("click",(function(){return e._onCardRemoveButtonClick({id:e._id,element:e._cardRemoveBtn.closest("li")})})):this._cardRemoveBtn.remove()}},{key:"_renderLikes",value:function(e,t){e&&this._onHideLikes(),this._onShowLikes(e,t)}},{key:"_onCardLikeButtonClick",value:function(){var e=this;this._userLiked?this._onUnlike(this._id).then((function(t){var n=t.likes;return e._setLikes(n)})):this._onLike(this._id).then((function(t){var n=t.likes;return e._setLikes(n)}))}}])&&Z(t.prototype,n),e}();function ee(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var te=function(){function e(t,n){var r=t.items,o=t.renderCallback;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderCallback=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"clear",value:function(){this._container.innerHTML=""}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(){var e=this;this.clear(),this._items.forEach((function(t){e._renderCallback(t)}))}}])&&ee(t.prototype,n),e}();function ne(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var re=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._onDocumentKeyUp=function(e){e.preventDefault(),n&&"Escape"===e.key&&n.close()},this._onPopupOverlayMouseDown=function(e){n&&e.target===e.currentTarget&&n.close()}}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add(L),this._popupElement.addEventListener("mousedown",this._onPopupOverlayMouseDown),document.addEventListener("keyup",this._onDocumentKeyUp)}},{key:"close",value:function(){this._popupElement.classList.remove(L),this._popupElement.removeEventListener("mousedown",this._onPopupOverlayMouseDown),document.removeEventListener("keyup",this._onDocumentKeyUp)}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.querySelector(h).addEventListener("click",(function(){return e.close()}))}}])&&ne(t.prototype,n),e}();function oe(e){return(oe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ie(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ae(e,t,n){return(ae="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=se(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function ue(e,t){return(ue=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ce(e,t){return!t||"object"!==oe(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function se(e){return(se=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var le=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ue(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=se(r);if(o){var n=se(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return ce(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popupElement.querySelector(c),n._submitElement=n._form.querySelector(l),n._eventListeners=t,n._submitDefaultText=n._submitElement.textContent,n._submitProcessDefaultText=D,n}return t=a,(n=[{key:"close",value:function(){this._form.reset(),ae(se(a.prototype),"close",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;Object.keys(this._eventListeners).forEach((function(t){var n=e._eventListeners[t].bind(e._form);e._form.addEventListener(t,(function(t){return e._processEventListener(t,n,(function(){return e._submitElement.textContent=e._submitProcessDefaultText}),(function(){return e._submitElement.textContent=e._submitDefaultText}))}))})),ae(se(a.prototype),"setEventListeners",this).call(this)}},{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._form.querySelectorAll(".form-view__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"_processEventListener",value:function(e,t,n,r){var o=this;e.preventDefault();var i=t(this._getInputValues());"submit"===e.type&&i instanceof Promise&&(n(),i.then((function(){return r()})).then((function(){return o.close()})).then((function(){return o._form.reset()})))}},{key:"form",get:function(){return this._form}}])&&ie(t.prototype,n),a}(re);function fe(e){return(fe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function pe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function he(e,t,n){return(he="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=me(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function de(e,t){return(de=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _e(e,t){return!t||"object"!==fe(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function me(e){return(me=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var ve=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&de(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=me(r);if(o){var n=me(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _e(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e,t))._submitProcessDefaultText=x,n}return t=a,(n=[{key:"open",value:function(e){this._element=e,he(me(a.prototype),"open",this).call(this)}},{key:"_getInputValues",value:function(){return this._element}}])&&pe(t.prototype,n),a}(le);function ye(e){return(ye="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function be(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ke(e,t,n){return(ke="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=we(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function ge(e,t){return(ge=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ee(e,t){return!t||"object"!==ye(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function we(e){return(we=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Se=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ge(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=we(r);if(o){var n=we(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Ee(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._caption=t._popupElement.querySelector(p),t._image=t._popupElement.querySelector(f),t}return t=a,(n=[{key:"open",value:function(e){var t=this,n=e.link,r=e.name;this._setImageAndCaption(n,r).then((function(){console.debug("loaded image url ".concat(n)),ke(we(a.prototype),"open",t).call(t)})).catch((function(){console.debug("failed to load image url ".concat(n))}))}},{key:"setEventListeners",value:function(){var e=this;this._image.addEventListener("load",(function(){return ke(we(a.prototype),"open",e).call(e)})),ke(we(a.prototype),"setEventListeners",this).call(this)}},{key:"_setImageAndCaption",value:function(e,t){var n=this;return new Promise((function(r,o){n._caption.textContent=t,n._image.src=e,n._image.onload=r,n._image.onerror=o}))}},{key:"image",get:function(){return this._image}},{key:"caption",get:function(){return this._caption}}])&&be(t.prototype,n),a}(re);function Le(e){return(Le="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Oe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Ce(e,t){return(Ce=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Pe(e,t){return!t||"object"!==Le(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function je(e){return(je=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Te=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Ce(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=je(r);if(o){var n=je(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Pe(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,u))._likeElement=e,t._popupTemplate=document.querySelector(k),t._likeTemplate=document.querySelector(g),t}return t=a,(n=[{key:"open",value:function(e){var t=this,n=this._createPopupFromTemplate();this._likeElement.appendChild(n),this._items=new te({items:e,renderCallback:function(e){return t._addLikeItem(t._createLike(e))}},_),this._popupElement=document.querySelector(u),this._items.renderItems(),this._checkCoordinates()}},{key:"close",value:function(){this._popupElement.remove()}},{key:"_addLikeItem",value:function(e){this._items.appendItem(e)}},{key:"_createLike",value:function(e){var t=this._createLikeFromTemplate();return t.querySelector(".like__photo").src=e.avatar,t.querySelector(".like__name-tooltip").textContent=e.name,t}},{key:"_createLikeFromTemplate",value:function(){return this._likeTemplate.content.cloneNode(!0)}},{key:"_createPopupFromTemplate",value:function(){return this._popupTemplate.content.cloneNode(!0)}},{key:"_checkCoordinates",value:function(){var e=this._popupElement.getBoundingClientRect(),t=this._likeElement.querySelectorAll(".like__name-tooltip");e.bottom>window.innerHeight?this._popupElement.classList.add("likes-view_pos_top"):this._popupElement.classList.remove("likes-view_pos_top"),t.forEach((function(e){e.getBoundingClientRect().right>window.outerWidth&&(e.style.left=0,e.style.right="-100%")}))}}])&&Oe(t.prototype,n),a}(re);function Re(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var Ie=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._form=n,this._inputList=Array.from(n.querySelectorAll(t.inputSelector)),this._submitElement=n.querySelector(t.submitSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){var e=this;this._form.addEventListener("submit",(function(e){return e.preventDefault()})),this._form.addEventListener("reset",(function(){return e._resetValidation()})),this._setEventListeners()}},{key:"_resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleSubmitState()}},{key:"_showInputError",value:function(e,t){var n=this._form.querySelector("#".concat(e.id,"-error"));e.classList.add(this._config.inputErrorClass),n.textContent=t,n.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleSubmitState",value:function(){this._hasInvalidInput(this._inputList)?(this._submitElement.classList.add(this._config.inactiveSubmitClass),this._submitElement.disabled=!0):(this._submitElement.classList.remove(this._config.inactiveSubmitClass),this._submitElement.disabled=!1)}},{key:"_setEventListeners",value:function(){var e=this;this._toggleSubmitState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(t){e._applyValidation(t.target)}))}))}},{key:"_applyValidation",value:function(e){this._checkInputValidity(e),this._toggleSubmitState()}}])&&Re(t.prototype,n),e}();function qe(e){var t=e._id,n=e.name,r=e.about,o=e.avatar;Me.info={_id:t,name:n,about:r,avatar:o},Ve.form.reset()}function De(e,t){t(function(e){return new $(e,b,Me,(function(){return Ne.open(e)}),(function(e){return Je.open(e)}),xe,Be,K.like.bind(K),K.unlike.bind(K))}(e).createElement())}function xe(e,t){We&&Be(),t.length>0&&(We=new Te(e)).open(t)}function Be(){We&&(We.close(),We=null)}var Ue,Ve=new le(r,{submit:function(e){var t=e.name,n=e.about;return K.setUserInfo({name:t,about:n}).then((function(e){return qe(e)})).catch((function(){return console.error("Failed to edit user info.")}))},reset:function(){var e=Me.info,t=e.name,n=e.about;this.elements.name.value=t,this.elements.about.value=n}}),Ae=new le(n,{submit:function(e){var t=e.avatar;return K.setAvatar({avatar:t}).then((function(e){return qe(e)})).catch((function(){return console.error("Failed to edit avatar.")}))}}),Fe=new le(o,{submit:function(e){var t=e.name,n=e.link;return K.addCard({name:t,link:n}).then((function(e){return De(e,(function(e){return ze.prependItem(e)}))})).catch((function(){return console.error("Failed to add card.")}))}}),Je=new ve(i,{submit:function(e){var t=e.id,n=e.element;return K.deleteCard(t).then((function(){return n.remove()})).catch((function(){return console.error("Failed to remove card.")}))}}),Ne=new Se(a),Me=new Y(t),He=new Ie(R,Ae.form),Ke=new Ie(R,Ve.form),Ge=new Ie(R,Fe.form),ze=[],We=null;Promise.all([K.getUserInfo().then((function(e){return qe(e)})).catch((function(){return console.error("Failed to set user info.")})),(Ue=new z(q),Ue.render(!0),K.getCards().then((function(e){ze=new te({items:e,renderCallback:function(e){return De(e,(function(e){return ze.appendItem(e)}))}},d),console.debug(e)})).catch((function(){return console.error("Failed to fetch cards.")})).finally((function(){return Ue.remove()})))]).then((function(){return ze.renderItems()})).catch((function(){return console.error("Failed to render cards.")})),P.addEventListener("click",(function(){return Ae.open()})),j.addEventListener("click",(function(){return Ve.open()})),T.addEventListener("click",(function(){return Fe.open()})),Ae.setEventListeners(),Ve.setEventListeners(),Fe.setEventListeners(),Je.setEventListeners(),Ne.setEventListeners(),He.enableValidation(),Ke.enableValidation(),Ge.enableValidation()})();