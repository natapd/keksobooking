(function(){
  var templateError=document.querySelector('#error').content.querySelector('.error');
  var templateSuccess=document.querySelector('#success').content.querySelector('.success');
  var map = document.querySelector('.map');
var PressECSonPopup=function(evt){
  if (evt.keyCode===27)
  {onPopupClose();}
};
var onPopupClose=function(){
var ErrorMess=document.querySelector('.error');
var SuccessMes=document.querySelector('.success');
if(ErrorMess){
ErrorMess.remove();}
if(SuccessMes){SuccessMes.remove();}
document.removeEventListener('keydown',PressECSonPopup);
};
var onError=function(err){
  var error=templateError.cloneNode(true);
  error.querySelector('p').textContent=err;
 map.appendChild(error);
 error.querySelector('.error__button').addEventListener('click',function(){onPopupClose()});
 document.addEventListener('keydown',PressECSonPopup);
  //console.log('Ошибка');
};
var onSuccess=function(){
var success=templateSuccess.cloneNode(true);
map.appendChild(success);
document.addEventListener('keydown'.PressECSonPopup);
};
window.messages={
onError:onError,
onSuccess:onSuccess
};

  })();
