(function(){
var TypeHousing;
var templateCard=document.querySelector('#card').content.querySelector('.map__card');


//функция копирует шаблон модального окна с информацией по объявлению
var renderCard=function(announ){

  var element=templateCard.cloneNode(true);
  element.querySelector('.popup__title').textContent=announ.offer.title;
  element.querySelector('.popup__text--address').textContent=announ.offer.address;
  element.querySelector('.popup__text--price').textContent=announ.offer.price+'р/ночь.';
    if (announ.offer.type==='flat'){ TypeHousing='Квартира'};
    if (announ.offer.type==='bungalo'){ TypeHousing='Бунгало'};
    if (announ.offer.type==='house'){ TypeHousing='Дом'};
    if (announ.offer.type==='palace'){ TypeHousing='Дворец'};
  element.querySelector('.popup__type').textContent=TypeHousing;
  element.querySelector('.popup__text--capacity').textContent=announ.offer.rooms+' комнаты для '+
    announ.offer.guests+' гостей.';
  element.querySelector('.popup__text--time').textContent='Заевзд после '+announ.offer.checkin+
    ', выезд до '+announ.offer.checkout;
  var strin=announ.offer.features;
  for (var i=0; i<window.featuresAr.length; i++){
       if (strin.indexOf(window.featuresAr[i])===-1){
        element.querySelector('.popup__features').removeChild(element.querySelector('.popup__feature--'+window.featuresAr[i]));
        };
   };
  element.querySelector('.popup__description').textContent=announ.offer.description;
  if (announ.offer.photos.length===0){element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));}
  else{
  element.querySelector('.popup__photos').querySelector('.popup__photo').src=announ.offer.photos[0];
  for (var i=1; i<announ.offer.photos.length;i++){
    var clone=element.querySelector('.popup__photos').appendChild(element.querySelector('.popup__photo').cloneNode());
    clone.src=announ.offer.photos[i];
  }}
  element.querySelector('.popup__avatar').src=announ.author.avatar;
  element.querySelector('.popup__close');
return element;
};
window.card={
  renderCard:renderCard,
};
})();
