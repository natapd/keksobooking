(function(){
// Доверяй, но проверяй
var YourForm=document.querySelector('.notice');
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
})();
