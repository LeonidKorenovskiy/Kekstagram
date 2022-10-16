import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {scaleValue} from './upload-file.js';
import {textDescription} from './formValidation.js';
import {hashtags} from './formValidation.js';

const original = document.querySelector('#effect-none');
const chrome = document.querySelector('#effect-chrome');
const sepia = document.querySelector('#effect-sepia');
const marvin = document.querySelector('#effect-marvin');
const phobos = document.querySelector('#effect-phobos');
const heat = document.querySelector('#effect-heat');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevel = document.querySelector('.effect-level__slider');
let level = document.querySelector('.effect-level__value');



noUiSlider.create(effectLevel, {
  range:{
    min:0,
    max:100,

  },
  start:100,
  step: 1,
  connect: 'lower',

});



const restart = () =>{
  previewPhoto.className = '';
  previewPhoto.style.filter = '';
effectLevel.classList.add('hidden');
scaleValue.value = 100;
document.querySelector('.img-upload__preview').style.transform='scale(1)';
original.checked = true;
textDescription.value = "";
hashtags.value = "";


}


effectLevel.classList.add('hidden');


original.addEventListener('click', () =>{
  previewPhoto.className = '';
  previewPhoto.style.filter = '';
effectLevel.classList.add('hidden');



})

chrome.addEventListener('click', () =>{
  previewPhoto.className = ''
  previewPhoto.classList.add('effects__preview--chrome');

  update(0,1,0.1,'grayscale')

})

sepia.addEventListener('click', () =>{
  previewPhoto.className = ''
  previewPhoto.classList.add('effects__preview--sepia');

  update(0,1,0.1,'sepia')
})

marvin.addEventListener('click', () =>{
  previewPhoto.className = ''
  previewPhoto.classList.add('effects__preview--marvin');

  update(1,100,1,'invert', '%')
})

phobos.addEventListener('click', () =>{
  previewPhoto.className = ''
  previewPhoto.classList.add('effects__preview--phobos');

  update(1,3,0.1,'blur', 'px')
})

heat.addEventListener('click', () =>{
  previewPhoto.className = ''
  previewPhoto.classList.add('effects__preview--heat');

  update(1,3,0.1,'brightness')
})


const update = (min,max,step,color,unit = '') =>{

  effectLevel.classList.remove('hidden');
  effectLevel.noUiSlider.updateOptions({
    range:{
      min: min,
      max: max,

    },
    start:max,
    step: step,
    connect: 'lower',
  })

  effectLevel.noUiSlider.on('update', (_, handle, unencoded) =>{
    const el = unencoded[handle];
    level.value = el;
    previewPhoto.style.filter = color + '(' + el + unit +  ')';
    console.log(el)

  })

}

export {restart};
