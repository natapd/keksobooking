(function (){
  var FILE_TYPES=['gif','jpg','jpeg','png'];
var fileChooserAv=document.querySelector('.ad-form-header__input');
var previewAv=document.querySelector('.ad-form-header__preview img');
var fileChooserPic=document.querySelector('.ad-form__input');
var PicBlock=document.querySelector('.ad-form__photo-container');
var PicDiv=document.querySelector('.ad-form__photo');
fileChooserAv.addEventListener('change',function(){
    var file=fileChooserAv.files[0];
    var fileName=file.name.toLowerCase();
    var matches=FILE_TYPES.some(function(it){
      return fileName.endsWith(it);
    });
    if (matches){
      var reader= new FileReader();
      reader.addEventListener('load',function(){
        previewAv.src=reader.result;
      });
      reader.readAsDataURL(file);
    };
});

var onLoadPhoto=function(){
  var file=fileChooserPic.files[0];
  console.log(file);

    var fileName=file.name.toLowerCase();
    var matches=FILE_TYPES.some(function(it){
      return fileName.endsWith(it);
    });
    var PhotoDiv=document.createElement('div');
    var photo=document.createElement('img');
    if (matches){
      var reader= new FileReader();
      reader.addEventListener('load',function(){
        PicBlock.appendChild(PhotoDiv);

        PhotoDiv.classList.add('ad-form__photo');
        var ListDiv=document.querySelectorAll('.ad-form__photo');
        ListDiv[ListDiv.length-2].appendChild(photo);
        photo.src=reader.result;
        console.log(window.getComputedStyle(PhotoDiv).width,
        window.getComputedStyle(PhotoDiv).height);
        photo.width=70;
        photo.height=70;

      });
      reader.readAsDataURL(file);
    };

};
fileChooserPic.addEventListener('change',onLoadPhoto);

window.RemovePic=function(){
var ListDiv=document.querySelectorAll('.ad-form__photo');
for (var i=0;i<ListDiv.length-1;i++){
  ListDiv[i].remove();
}
};
  })();

