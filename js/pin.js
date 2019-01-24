(function(){
var templatePin=document.querySelector('#pin').content.querySelector('.map__pin');

// Функция копирует шаблон меток объявлений и заполняет его данными
var renderAnnounce = function (announ,index){
  var element=templatePin.cloneNode(true);
    element.style.left=(announ.location.x-window.data.pinWidth/2)+'px';
    element.style.top=announ.location.y-window.data.pinHeight+'px';
    element.querySelector('img').src=announ.autor.avatar;
    element.querySelector('img').alt=announ.offer.title1;
    element.setAttribute('data-index', index);
  return element;
};
window.pin={
renderAnnounce:renderAnnounce,
};



})();
