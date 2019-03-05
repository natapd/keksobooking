(function(){
var MapPinMail=document.querySelector('.map__pin--main');
var YourForm=document.querySelector('.notice');
var FieldsetElem=YourForm.querySelectorAll('fieldset');
var map = document.querySelector('.map');
var similarListElement=document.querySelector('.map__pins');
var parentElementCard=document.querySelector('.map');
var ElementBefore=document.querySelector('.map__filters-container');
var AddressInput=YourForm.querySelector('#address');

//Функция удаления обработчика
var removeHendel=function(){
  MapPinMail.removeEventListener('mouseup',onActivePage);
  MapPinMail.removeEventListener('keydown',onActivePage);
};
var onSuccess=function(announ){
  window.announcement=announ;
  //console.log(window.announcement);

  InsertPins(announ);
};
var InsertPins=function(announ){
  // Пины на карте

   var fragment=document.createDocumentFragment();
  for( var i=0; i<announ.length;i++){
    fragment.appendChild(window.pin.renderAnnounce(announ[i]));

    }
  //Вставка фрагмента с метками в .map__pins
    similarListElement.appendChild(fragment);

};
window.updatePins=function(){
  //console.log(  window.announcement);

  var filter=window.filtredAnnoun(window.announcement);
  console.log(filter);
  onPopupClose();
  ResetPins();
  InsertPins(filter);

};


var onPopupClose=function(){
  var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      document.removeEventListener('keydown', PressECSonPopup);
      document.querySelector('.popup__close').removeEventListener('click', onPopupClose);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      map.removeChild(oldCard);
    }

};
var PressECSonPopup=function(evt)
{if (evt.keyCode===27)
  {onPopupClose();}
 };



var OpenCard=function(pins){


  var fragment2=document.createDocumentFragment();

  fragment2.appendChild(window.card.renderCard(pins));

  //Вставка фрагмента в блок .map перед блоком .map__filter-container
  parentElementCard.insertBefore(fragment2,ElementBefore);
  var PopupButton=document.querySelector('.popup__close');



PopupButton.addEventListener('click',onPopupClose);
  document.addEventListener('keydown',PressECSonPopup);
};



//Функция обработчика перевода страницы в активное состояние
var onActivePage=function(evt){

  //Убираем класс .map--faded у блока .map
  document.querySelector('.map').classList.remove('map--faded');
  YourForm.querySelector('.ad-form').classList.remove('ad-form--disabled');

  //Удаляем атрибут формы
    for (var i=0; i<FieldsetElem.length;i++){
    FieldsetElem[i].removeAttribute("disabled");
    }

  //Вставляем координаты главного пина в инпут адреса
 setActiveAddressInput();

window.backend.load(onSuccess,window.messages.onError);

//console.log('массив '+window.announcement);

};
var ResetPins=function(){
  var Pins=map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var j=0; j<Pins.length;j++){
Pins[j].remove();
  }
};
var ResetPage=function(){
 document.querySelector('.map').classList.add('map--faded');
  YourForm.querySelector('.ad-form').classList.add('ad-form--disabled');
  ResetPins();
  resetPinMain();
  window.form.resetForm();
  window.resetFilter();
};

OnMouseDown=function(evt){
  evt.preventDefault();
  onActivePage();
  var startCoord={
      x:evt.clientX,
     y:evt.clientY
  };
  var dragged=false;
  //console.log(startCoord);

      var OnMouseMove=function(moveEvt){
         moveEvt.preventDefault();
         setActiveAddressInput();
        dragged=true;
        var shift= {
          x:startCoord.x-moveEvt.clientX,
          y:startCoord.y-moveEvt.clientY
        };
        startCoord={
          x:moveEvt.clientX,
          y:moveEvt.clientY
        };
        if ((MapPinMail.offsetTop-shift.y)<window.data.PinMinY){MapPinMail.style.top=window.data.PinMinY+'px';}
            else if ((MapPinMail.offsetTop-shift.y)>window.data.PinMaxY){MapPinMail.style.top=window.data.PinMaxY+'px';}
                else {
                    MapPinMail.style.top=(MapPinMail.offsetTop-shift.y)+'px';}
        if ((MapPinMail.offsetLeft-shift.x)<window.data.PinMinX){MapPinMail.style.left=window.data.PinMinX+'px';}
            else if ((MapPinMail.offsetLeft-shift.x)>window.data.PinMaxX){MapPinMail.style.left=window.data.PinMaxX+'px';}
                  else {

        MapPinMail.style.left=(MapPinMail.offsetLeft-shift.x)+'px';}
        //console.log(startCoord);
      };

      var OnMouseUp=function(upEvt){
        MapPinMail.addEventListener('click', setActiveAddressInput);
        // Удаление обработчика нажатия на главный пин
         // removeHendel();

        upEvt.preventDefault();

        document.removeEventListener('mousemove', OnMouseMove);
        document.removeEventListener('mouseup',OnMouseUp);

      };
  document.addEventListener('mousemove',OnMouseMove);
  document.addEventListener('mouseup',OnMouseUp);
};

//Делаем форму неактивной
for (var i=0; i<FieldsetElem.length;i++){
FieldsetElem[i].setAttribute("disabled", "disabled");
}

// Обработчик события на опускание мыши главного пина
MapPinMail.addEventListener('mousedown',OnMouseDown);


MapPinMail.addEventListener('keydown',function(evt){
if (evt.keyCode===13){
  onActivePage();
}
});
var resetPinMain = function () {
    MapPinMail.style.left = '570px';
    MapPinMail.style.top = '375px';
   AddressInput.value = calculateInactiveMainPinCoordinats();
  };
// Функция для расчета координат адреса в активном состоянии страницы
  var calculateActiveMainPinCoordinats = function () {
    //console.log(MapPinMail.offsetLeft+'1 '+MapPinMail.offsetTop);
    return (MapPinMail.offsetLeft + (window.data.pinWidth / 2)) + ', ' + (MapPinMail.offsetTop + window.data.pinHeight);

  };

  // Функция для расчета координат адреса в неактивном состоянии страницы
  var calculateInactiveMainPinCoordinats = function () {
    return (MapPinMail.offsetLeft + (window.data.pinWidth / 2)) + ', ' + (MapPinMail.offsetLeft + (window.data.pinHeight / 2));
  };

  // Функция для заполнения поля адреса в активном состоянии страницы
  var setActiveAddressInput = function () {
    AddressInput.value = calculateActiveMainPinCoordinats();
    AddressInput.readOnly = true;
  };

AddressInput.value = calculateInactiveMainPinCoordinats();
window.map = {
    ResetPage:ResetPage,
    onPopupClose: onPopupClose,
    OpenCard:OpenCard,
  };

})();
