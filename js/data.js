(function(){
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
window.featuresAr=[
'wifi','dishwasher','parking','washer','elevator','conditioner'
];
var photosAr=[
'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var minLocationX = 200;
var maxLocationX = 900;
var minLocationY = 130;
var maxLocationY = 630;
var pinWidth=50;
var pinHeight=70;
var PinMinX=minLocationX;
var PinMaxX=maxLocationX-pinWidth/2;
var PinMinY=minLocationY;
var PinMaxY=maxLocationY-pinHeight;
window.data={
pinWidth: pinWidth,
pinHeight: pinHeight,
photosArlength:photosAr.length,
PinMinX:PinMinX,
PinMaxX:PinMaxX,
PinMinY:PinMinY,
PinMaxY:PinMaxY
};

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
window.announcement =[];
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
})();
