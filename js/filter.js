(function(){
var filter=document.querySelector('map__filters-container');
var mapFilters = document.querySelector('.map__filters');
var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeaturesAll = document.querySelectorAll('.map__checkbox');
var DEFAULT_VALUE='any';

var onChangeFilter=window.debounce(function () {
 // console.log('Апдейт');

    window.updatePins();
  });

  for (var i = 0; i < housingFeaturesAll.length; i++) {
      housingFeaturesAll[i].addEventListener('change', onChangeFilter);
    }

    housingType.addEventListener('change', onChangeFilter);

    housingPrice.addEventListener('change', onChangeFilter);
    housingRooms.addEventListener('change', onChangeFilter);
    housingGuests.addEventListener('change', onChangeFilter);

window.resetFilter = function () {
    for (var i = 0; i < housingFeaturesAll.length; i++) {
      housingFeaturesAll[i].checked = false;
    }

    housingType.value = DEFAULT_VALUE;
    housingPrice.value = DEFAULT_VALUE;
    housingRooms.value = DEFAULT_VALUE;
    housingGuests.value = DEFAULT_VALUE;
  };
window.filtredAnnoun=function(arr){
  //console.log(CompareFeatures());

var arr2=arr.filter(function (card) {
      return CompareType(card)&&CompareRooms(card)&&ComparePrice(card)&&CompareGuests(card)&&CompareFeatures(card);
    });

console.log(arr2);

return arr2;
};

var CompareType=function(arr){
  return arr.offer.type===housingType.value|| housingType.value ===  DEFAULT_VALUE;
};
var CompareRooms=function(arr){

  return (arr.offer.rooms.toString()===housingRooms.value)|| housingRooms.value ===  DEFAULT_VALUE;
};
var ComparePrice =function(arr){

   if(housingPrice.value==='middle'){return arr.offer.price>=10000 && arr.offer.price<50000;}
   if(housingPrice.value==='low'){return arr.offer.price<10000;}
   if(housingPrice.value==='high'){return arr.offer.price>=50000;}
  if(housingPrice.value===DEFAULT_VALUE){return arr.offer.price;}
};
var CompareGuests=function(arr){
  /*<option value="any" selected>Любое число гостей</option>
            <option value="2">Два гостя</option>
            <option value="1">Один гость</option>
            <option value="0">Не для гостей</option>*/
    if(housingGuests.value==='2'){return arr.offer.guests==2 ;}
    if(housingGuests.value==='1'){return arr.offer.guests==1 ;}
    if(housingGuests.value==='0'){return arr.offer.guests==0 ;}
    if(housingGuests.value===DEFAULT_VALUE){return arr.offer.guests ;}
};
var CompareFeatures=function(arr){
var checkedFeat=document.querySelectorAll('.map__checkbox:checked');
//console.log(arr.offer.features[0]);
var count=0;
if (count===checkedFeat.length){
      return arr.offer.features;}
  for (var i=0; i<checkedFeat.length;i++){
    for (var j=0;j<arr.offer.features.length;j++){
    if (checkedFeat[i].value===arr.offer.features[j]){
      count++;
      if (count===checkedFeat.length){
      return arr.offer.features[j];}
  }}}


};
})();
