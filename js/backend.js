(function(){
var load=function(onLoad,onError){
    var URL='https://js.dump.academy/keksobooking/data';
    var xhr= new XMLHttpRequest();
      xhr.responseType='json';
      xhr.addEventListener('load',function(){
        if (xhr.status===200){
            onLoad(xhr.response);}
        else {onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);}
        });
       xhr.addEventListener('error',function(){
          onError('Произошла ошибка соединения');
         });
       xhr.timeout=10000;
       xhr.addEventListener('timeout',function(){
         onError('Запрос не успел выполнится за '+xhr.timeout+' мс');
       });

    xhr.open('GET',URL);
    xhr.send();
  };
  var save=function(data,onLoad,onError){
    var URL='https://js.dump.academy/keksobooking';
    var xhr= new XMLHttpRequest();
      xhr.responseType='json';
         xhr.addEventListener('load',function(){
          if (xhr.status===200){
              onLoad(xhr.response);}
          else {onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);}
          });


    xhr.open('POST',URL);
    xhr.send(data);

  };
  window.backend={
  load:load,
  save:save
};

})();
