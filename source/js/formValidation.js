

const textDescription = document.querySelector('.text__description');
const hashtags = document.querySelector('.text__hashtags');


textDescription.addEventListener('input', () => {
  if (textDescription.value.length > 140 ){

   textDescription.setCustomValidity('Вы превысили максимальное количество симовлов. Максимум 140')}
else {
  textDescription.setCustomValidity('');
}
textDescription.reportValidity();
})

const regexp = /^#/;
const regexpQuanity = /^#[a-zа-я0-9]{1,19}(\s)?((#[a-zа-я0-9]{1,19})?(\s)?){0,4}$/iu;





hashtags.addEventListener('input', () =>{
  const hashtagsLength = hashtags.value.length;

  if (hashtags.value == ""){
    hashtags.setCustomValidity('');
    hashtags.style.border = '2px solid black';
  }

  else if(!regexp.test(hashtags.value)){
    hashtags.setCustomValidity('Ошибка, необходимо добавить #');
    hashtags.style.border = '2px solid red';
  }

  else if(!/[a-z0-9а-я#\s]/iu.test(hashtags.value[hashtagsLength-1])){

    hashtags.setCustomValidity('ХэшТег не можетт содержать данный символ');
    hashtags.style.border = '2px solid red';
  }

  else if(!regexpQuanity.test(hashtags.value)){
    hashtags.setCustomValidity('ХэшТег должнет быть не меньше 1 и не больше 20-ти смволов');
    console.log('больше 20')
    hashtags.style.border = '2px solid red';
  }





  else{
    hashtags.setCustomValidity('');
    hashtags.style.border = '2px solid black';

  }

hashtags.reportValidity();
})


export {textDescription};
export {hashtags};
