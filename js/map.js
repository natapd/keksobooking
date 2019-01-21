var titleAr=[
'Большая уютная квартира',
'Маленькая неуютная квартира',
'Огромный прекрасный дворец',
'Маленький ужасный дворец',
'Красивый гостевой домик',
'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'
];
var typeAr=[
'palace',
'flat',
'house',
'bungalo'
];
var checkinAr=[
'12:00','13:00','14:00'
];
var checkoutAr=[
'12:00','13:00','14:00'
];
var featuresAr=[
'wifi','dishwasher','parking','washer','elevator','conditioner'
];
var photosAr=[
'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var similarListElement=document.querySelector('.map__pins');

var parentElementCard=document.querySelector('.map');
var ElementBefore=document.querySelector('.map__filters-container');
var MapPinMail=document.querySelector('.map__pin--main');
var YourForm=document.querySelector('.notice');
var FieldsetElem=YourForm.querySelectorAll('fieldset');
var templatePin=document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard=document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');

var pinWidth = 50;
var pinHeight = 70;
var TypeHousing;
var minLocationX = 300;
var maxLocationX = 900;
var minLocationY = 130;
var maxLocationY = 630;

// Функция радомное число от до
  var randomMaxMin=function(min,max){

    return Math.round(Math.random() * (max - min) + min);
  };

// Функция рандомное число элементов массива, не более длины массива
  var randomf=function(LengthArray){

    var RandomI=Math.round(Math.random()*(LengthArray-1));
    return RandomI;

  };

// Рандомная сортировка массива
  var RandomSortArray=function(arr){
      for (var j=arr.length-1; j>0 ; j--){
        var i= Math.floor(Math.random()*(j+1));
        var temp= arr[j];
        arr[j]=arr[i];
        arr[i]=temp;
      }
      return arr;
  };

// Случайный набор удобств
 var featureF=function(){
  var n=randomMaxMin(1,featuresAr.length);

  var RandomAr=RandomSortArray(featuresAr);
    var stringFeatures='';
      for(var j=0; j<n;j++){
    stringFeatures=RandomAr[j]+' '+stringFeatures;
        }
    return stringFeatures;
 };

//Рандомные координаты
var RandomLocation=function(){
  var x=randomMaxMin(minLocationX,maxLocationX);
  var y=randomMaxMin(minLocationY,maxLocationY);
 return {x,y};
};
var coords=RandomLocation();


 //Массив карточек
var announcement =[];
for (j=0; j<8; j++){

  announcement[j]={
    autor:{
      avatar:'img/avatars/user0'+(j+1)+'.png'
    },
    offer:{
      title1:titleAr[j],
      adress:coords.x+' , '+coords.y ,
      price:randomMaxMin(1000,1000000),
      type1:typeAr[randomf(typeAr.length)],
      rooms:randomMaxMin(1,5),
      guests:randomMaxMin(1,10),
      checkin:checkinAr[randomf(checkinAr.length)],
      checkout:checkoutAr[randomf(checkoutAr.length)],
      features:featureF(),
      discription:'',
      photos:RandomSortArray(photosAr)
    },
    location:{
      x:coords.x,
      y:coords.y
    }
  };
  var coords=RandomLocation();

}



// Функция копирует шаблон меток объявлений и заполняет его данными
var renderAnnounce = function (announ,index){
  var element=templatePin.cloneNode(true);
    element.style.left=(announ.location.x-pinWidth/2)+'px';
    element.style.top=announ.location.y-pinHeight+'px';
    element.querySelector('img').src=announ.autor.avatar;
    element.querySelector('img').alt=announ.offer.title1;
    element.setAttribute('data-index', index);
  return element;
};


//функция копирует шаблон модального окна с информацией по объявлению
var renderCard=function(announ){

  var element=templateCard.cloneNode(true);
  element.querySelector('.popup__title').textContent=announ.offer.title1;
  element.querySelector('.popup__text--address').textContent=announ.offer.adress;
  element.querySelector('.popup__text--price').textContent=announ.offer.price+'р/ночь.';
    if (announ.offer.title1==='flat'){ TypeHousing='Квартира'};
    if (announ.offer.title1==='bungalo'){ TypeHousing='Бунгало'};
    if (announ.offer.title1==='house'){ TypeHousing='Дом'};
    if (announ.offer.title1==='palace'){ TypeHousing='Дворец'};
  element.querySelector('.popup__type').textContent=TypeHousing;
  element.querySelector('.popup__text--capacity').textContent=announ.offer.rooms+' комнаты для'+
    announ.offer.quests+' гостей.';
  element.querySelector('.popup__text--time').textContent='Заевзд после '+announ.offer.checkin+
    ', выезд до '+announ.offer.checkout;
  var strin=announ.offer.features;
  for (var i=0; i<featuresAr.length; i++){
       if (strin.indexOf(featuresAr[i])===-1){
        element.querySelector('.popup__features').removeChild(element.querySelector('.popup__feature--'+featuresAr[i]));
        };
   };
  element.querySelector('.popup__description').textContent=announ.offer.description;
  element.querySelector('.popup__photos').querySelector('.popup__photo').src=announ.offer.photos[0];
  for (var i=1; i<photosAr.length;i++){
    var clone=element.querySelector('.popup__photos').appendChild(element.querySelector('.popup__photo').cloneNode());
    clone.src=announ.offer.photos[i];
  }
  element.querySelector('.popup__avatar').src=announ.autor.avatar;
return element;
};


var InsertPins=function(){
  // Пины на карте
   var fragment=document.createDocumentFragment();
  for( var i=0; i<announcement.length;i++){
    fragment.appendChild(renderAnnounce(announcement[i],i));

    }
  //Вставка фрагмента с метками в .map__pins
    similarListElement.appendChild(fragment);
};

//Функция удаления обработчика
var removeHendel=function(){
  MapPinMail.removeEventListener('mouseup',onActivePage);
  MapPinMail.removeEventListener('keydown',onActivePage);
};



var onPinclick=function(){
//Проверка нахождения пина
    var otherPins=map.querySelectorAll('.map__pin:not(.map__pin--main)');

for(var i=0; i<otherPins.length;i++ ){
 otherPins[i].addEventListener('click',OpenCard);

}
};

var OpenCard=function(evt){//Открыта карточка объявления
 var dataIndex=evt.currentTarget.getAttribute('data-index');
 console.log(dataIndex);
  var fragment2=document.createDocumentFragment();
  //for( var i=0; i<announcement.length;i++){
   fragment2.appendChild(renderCard(announcement[dataIndex]));
  //};

  //Вставка фрагмента в блок .map перед блоком .map__filter-container
  parentElementCard.insertBefore(fragment2,ElementBefore);};

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
  var AddressInput=YourForm.querySelector('#address');
  AddressInput.value=(parseInt(MapPinMail.style.left,10)+pinWidth/2)+' , '+(parseInt(MapPinMail.style.top,10)+pinHeight);

  //Вызов функции вставки пинов
  InsertPins();
  // Удаление обработчика нажатия на главный пин
  removeHendel();
  // Вызов функции нажатия на пин
  onPinclick();
};


//Делаем форму неактивной
for (var i=0; i<FieldsetElem.length;i++){
FieldsetElem[i].setAttribute("disabled", "disabled");
}

// Обработчик события на опускание мыши главного пина
MapPinMail.addEventListener('mouseup',onActivePage);
MapPinMail.addEventListener('keydown',function(evt){
if (evt.keyCode===13){onActivePage();}
});


/* //Открыта карточка объявления
var fragment2=document.createDocumentFragment();
for( var i=0; i<announcement.length;i++){
 fragment2.appendChild(renderCard(announcement[0]));
};

//Вставка фрагмента в блок .map перед блоком .map__filter-container
parentElementCard.insertBefore(fragment2,ElementBefore); */

// Доверяй, но проверяй
var typeField =YourForm.querySelector('#type');
var costField =YourForm.querySelector('#price');
var timeinField=YourForm.querySelector('#timein');
var timeoutField=YourForm.querySelector('#timeout');
var roomNumberField=YourForm.querySelector('#room_number');
var capacityField=YourForm.querySelector('#capacity');

//функция изменения типа жилья и ограничение минимальной цены
var onChangeType =function(){
if (typeField.value==='bungalo'){
  costField.min='0';
  costField.placeholder='0';

}
if (typeField.value==='flat'){
  costField.min='1000';
  costField.placeholder='1000';

}
if (typeField.value==='house'){
  costField.min='5000';
  costField.placeholder='5000';

}
if (typeField.value==='palace'){
  costField.min='10000';
  costField.placeholder='10000';

}
};

//вызов обработчика при изменении типа жилья
typeField.addEventListener('change',onChangeType);

//Функция зависимости время выезда, от время заезда и наоборот

var onTimeOutToTimeIn =function(){
  timeoutField.value=timeinField.value;
  };
var onTimeInToTimeOut =function(){
  timeinField.value=timeoutField.value;
  };
timeinField.addEventListener('change',onTimeOutToTimeIn);
timeoutField.addEventListener('change',onTimeInToTimeOut);

 //Функция соответствия количества гостей количеству комнат
var onChangeRoomNumber=function(){
  capacityField.querySelector('option[value="1"]').disabled=false;
  capacityField.querySelector('option[value="3"]').disabled=false;
  capacityField.querySelector('option[value="2"]').disabled=false;
  capacityField.querySelector('option[value="0"]').disabled=false;

if (roomNumberField.value==='1'){
  capacityField.querySelector('option[value="1"]').selected=true;
  capacityField.querySelector('option[value="3"]').disabled=true;
  capacityField.querySelector('option[value="2"]').disabled=true;
  capacityField.querySelector('option[value="0"]').disabled=true;
}
if (roomNumberField.value==='2'){
  capacityField.querySelector('option[value="2"]').selected=true;
  capacityField.querySelector('option[value="3"]').disabled=true;
  capacityField.querySelector('option[value="0"]').disabled=true;
}
if (roomNumberField.value==='3'){
  capacityField.querySelector('option[value="3"]').selected=true;
  capacityField.querySelector('option[value="0"]').disabled=true;
}
if (roomNumberField.value==='100'){
  capacityField.querySelector('option[value="0"]').selected=true;
  capacityField.querySelector('option[value="3"]').disabled=true;
  capacityField.querySelector('option[value="2"]').disabled=true;
  capacityField.querySelector('option[value="1"]').disabled=true;
}
};
roomNumberField.addEventListener('change',onChangeRoomNumber);

var templateSuccess=document.querySelector('#success').content.querySelector('.success');

// Функции для подсвечиваня невалидвой формы
var isInvalid = function (input) {
  if (input.checkValidity() === false) {
    input.style.boxShadow = '0 0 2px 2px #ff6547';
  }
};
var isValid = function (input) {
  if (input.checkValidity() === true) {
    input.style.boxShadow = 'none';
  }
};


var ButtonSubmit=YourForm.querySelector('.ad-form__submit');

ButtonSubmit.addEventListener('click',function(){
 isInvalid(YourForm.querySelector('#title'));
  isInvalid(YourForm.querySelector('#price'));
  isValid(YourForm.querySelector('#title'));
  isValid(YourForm.querySelector('#price'));
});
