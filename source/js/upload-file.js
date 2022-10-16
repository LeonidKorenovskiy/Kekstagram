import {restart} from './editor-photo.js';
import {sendRequest, urlHTMLAcademy} from './server.js';
import {textDescription, hashtags} from './formValidation.js';


const getImage = document.querySelector('.img-upload__overlay');
const photoUploadField = document.querySelector('.img-upload__input');
let scaleValue = document.querySelector('.scale__control--value');
const decrease = document.querySelector('.scale__control--smaller');
const magnification = document.querySelector('.scale__control--bigger');
const imgUploadForm = document.querySelector('.img-upload__form');
const success = document.querySelector('#success').content.querySelector('.success');
const successButton = success.querySelector('.success__button');
const imgUploadPreview = getImage.querySelector('.img-upload__preview').querySelector('img')
console.log(imgUploadPreview);

const errorModal = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorModal.querySelector('.error__button');



imgUploadForm.addEventListener('submit', (event) =>{
event.preventDefault();
  alert('Отправили')
  sendRequest(urlHTMLAcademy, imgUploadForm).then(response => {
    getImage.classList.add('hidden');
    success.classList.remove('hidden');
   document.querySelector('main').appendChild(success);
   successButton.addEventListener('click', () => {
    success.classList.add('hidden');
  })
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' || e.key === "ESC") {
        success.classList.add('hidden');

      }
      });

      document.addEventListener('mousedown', function(e){
        if(e.target.closest('.success__inner') === null){
          console.log('Клик не в попапе')
          success.classList.add('hidden');
        }
    });
    document.querySelector('.img-upload__input').value = "";
      restart();

  })
  .catch(error =>{
    getImage.classList.add('hidden');
    errorModal.classList.remove('hidden');

    document.querySelector('main').appendChild(errorModal);
    errorButton.addEventListener('click', () => {
      errorModal.classList.add('hidden');
   })
     document.addEventListener('keydown', function(e){
       if (e.key === 'Escape' || e.key === "ESC") {
        errorModal.classList.add('hidden');
       }
       });

       document.addEventListener('mousedown', function(e){
        if(e.target.closest('.error__inner') === null){
          errorModal.classList.add('hidden');
        }
    });
       document.querySelector('.img-upload__input').value = "";
       restart();
  })

})

const FILE_TYPES = ['jpeg', 'png', 'jpg']

photoUploadField.addEventListener('change', (event) =>{
  const file = event.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) =>{
    return fileName.endsWith(it);
  } )

if(matches){
  const reader = new FileReader();
  reader.addEventListener('load', () => {

    imgUploadPreview.src = reader.result;
  })

  reader.readAsDataURL(file);

}


  getImage.classList.remove('hidden');
 document.body.classList.add('modal-open');

})

const uploadCancel = document.querySelector('.img-upload__cancel');
uploadCancel.addEventListener ('click', () =>{
 getImage.classList.add('hidden');
 document.body.classList.remove('modal-open');
})

const closeModal = (e) =>{

  if(hashtags  == document.activeElement || textDescription == document.activeElement){
    getImage.classList.remove('hidden');

  }


   else if (e.key === 'Escape' || e.key === "ESC") {
    getImage.classList.add('hidden');
  document.querySelector('.img-upload__input').value = "";

  }

  };




document.addEventListener('keydown',closeModal)





decrease.addEventListener('click', () =>{

  if ( parseInt(scaleValue.value) <= 25){

  }
else {
  scaleValue.value = parseInt(scaleValue.value) - 25 +'%';
  document.querySelector('.img-upload__preview').style.transform=`scale(${parseInt(scaleValue.value)/100})`
}
})


magnification.addEventListener('click', () =>{

  if ( parseInt(scaleValue.value) >= 100){

  }
else {
  scaleValue.value = parseInt(scaleValue.value) + 25 +'%';
  document.querySelector('.img-upload__preview').style.transform=`scale(${parseInt(scaleValue.value)/100})`
}
})





export {scaleValue};
