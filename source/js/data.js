
import {getRandomIntInclusive, getStringLength} from './utill.js';
const allIdComments = [];

function getRandomId (){
  let randomId = getRandomIntInclusive(1,348);
  while (true){
    randomId = getRandomIntInclusive(1,348);
    if (!allIdComments.includes(randomId)){
  break;
    }
  }
  allIdComments.push(randomId)
  return randomId;
  }



  function getRandomComments (arr){
    let comments = [];
    let num = getRandomIntInclusive(1, 2);
  for (let i = 0; i < num; i++)
   comments[i] = arr[getRandomIntInclusive(0,arr.length-1)];
   return comments;
  }





  let counter = 1;
  let descriptions = ['Мое лучшее фото!', 'Ну как вам фоточка?', 'Мое первое фото :) шучууу', 'красиво то как....', 'а какие цвета))', 'кул стори', 'а что, так можно было', 'хорошего дня!', 'та за шо'];
  const messageOfComment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const namesOfUser = ['Артем', 'Анна', 'София', 'Мария', 'Виктория', 'Дарья', 'Вероника', 'Полина', 'Александр', 'Максим', 'Назар', 'Богдан', 'Дмитрий'];


  const generationComents = () =>{
    let arr = [];

    for (let i = 0; i <= getRandomIntInclusive(0,10); i++){

       arr[i] = {
        id: getRandomId(),
        avatar: `img/avatar ${getRandomIntInclusive(1,6)}`,
        message: getRandomComments(messageOfComment),
        name: namesOfUser[getRandomIntInclusive(0,namesOfUser.length-1)],
       };
    }
  return arr;

  }


  const generationUserPhoto = () =>{
    const obj = {
      id: ++counter,
      url: `photos/${counter-1}.jpg`,
      description: descriptions[getRandomIntInclusive(0,descriptions.length-1)],
      likes: getRandomIntInclusive(15,200),
      comments: generationComents(),

    }
    return obj;
  }

//Создает массив с обьектами//
  function generationUserPhotos (){
    let mass = []
    for (let q = 0; q < 25; q++){
    mass[q] = generationUserPhoto();
    }
    return mass;
  }




  export {generationUserPhotos};
