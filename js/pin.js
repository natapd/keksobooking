(function(){
var templatePin=document.querySelector('#pin').content.querySelector('.map__pin');
var renderAnnounce = function (announ){
  var element=templatePin.cloneNode(true);
    element.style.left=(announ.location.x-window.data.pinWidth/2)+'px';
    element.style.top=announ.location.y-window.data.pinHeight+'px';
    element.querySelector('img').src=announ.author.avatar;
    element.querySelector('img').alt=announ.offer.title;
    element.addEventListener('click', function () {
      window.map.onPopupClose();
      window.map.OpenCard(announ);
      element.classList.add('map__pin--active');
    });

  return element;
};

window.pin={
renderAnnounce:renderAnnounce,

};



})();
