(function(){
// Доверяй, но проверяй
var map = document.querySelector('.map');
var YourForm=document.querySelector('.notice');
var typeField =YourForm.querySelector('#type');
var costField =YourForm.querySelector('#price');
var timeinField=YourForm.querySelector('#timein');
var timeoutField=YourForm.querySelector('#timeout');
var roomNumberField=YourForm.querySelector('#room_number');
var capacityField=YourForm.querySelector('#capacity');
var adForm = document.querySelector('.ad-form');
var templateSuccess=document.querySelector('#success').content.querySelector('.success');
 var selects = document.querySelectorAll('select');
  var inputs = document.querySelectorAll('input');
  var textarea = document.querySelectorAll('textarea');
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
closePopup=function(){

};
var onLoad=function(){
  console.log('Отправилась');
};

var ButtonSubmit=YourForm.querySelector('.ad-form__submit');

ButtonSubmit.addEventListener('click',function(evt){
  evt.preventDefault();
  window.backend.save(new FormData(YourForm), window.messages.onSuccess,window.messages.onError );
 /* isInvalid(YourForm.querySelector('#title'));
  isInvalid(YourForm.querySelector('#price'));
  isValid(YourForm.querySelector('#title'));
  isValid(YourForm.querySelector('#price')); */
});
var ButtonReset=YourForm.querySelector('.ad-form__reset');
ButtonReset.addEventListener('click',function(evt){
evt.preventDefault();
window.map.ResetPage();
});

var resetForm = function () {
    adForm.querySelector('#title').value = '';
    adForm.querySelector('#type').value = 'flat';
    adForm.querySelector('#price').value = '';
    adForm.querySelector('#room_number').value = '1';
    adForm.querySelector('#capacity').value = '3';
    adForm.querySelector('#timein').value = '12:00';
    adForm.querySelector('#timeout').value = '12:00';
    adForm.querySelector('#description').textContent = '';

    var features = document.querySelectorAll('.feature__checkbox');
    for (var i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
    window.disableFieldsCheck(true);
  };
  var disableFields = function (isdisabled, fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = isdisabled;
    }
  };

  // проверяем состояние полей
  window.disableFieldsCheck = function (isfielddisabled) {
    disableFields(isfielddisabled, inputs);
    disableFields(isfielddisabled, selects);
    disableFields(isfielddisabled, textarea);
  };
  window.form={
resetForm:resetForm
  };
})();
