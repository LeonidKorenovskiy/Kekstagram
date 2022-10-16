import _ from 'lodash';
import { getDataServer, urlGetData } from './server.js';
import { getRandomIntInclusive } from './utill.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');
const copBox = document.createDocumentFragment();
const serverProblems = document.querySelector('#server-problems').content.querySelector('.server-problems');
const serverProblemsButton = serverProblems.querySelector('.server-problems__button');
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

const dataUsersPhotos = [];

//Удаление ссылок с фотографиями
const deleteChild = () => {
  const count = document.querySelectorAll('.picture').length;
  for (let i = 0; i < count; i++) {
    const picture = document.querySelector('.picture');
    containerPictures.removeChild(picture)
  }
}

//Добваление ссылок с фотографиями
const showPhotos = (array) => {
  array.forEach((element) => {
    const photos = templatePicture.cloneNode(true);
    photos.querySelector('.picture__img').src = element.url;
    photos.querySelector('.picture__likes').textContent = element.likes;
    photos.querySelector('.picture__comments').textContent = element.comments.length;
    copBox.appendChild(photos);
  })
  containerPictures.appendChild(copBox)

}

//Отрисовка комментариев к фотографии в окне Big Picture
const printComments = (flag, index, array) => {
  const countOfComments = array[index].comments.length;
  for (let i = flag; i < countOfComments; i++) {
    if (i >= 5) {
      break;
    }
    else if (bigPicture.querySelectorAll('.social__comment').length === array[index].comments.length) {
      break;
    }
    const socialCommentClone = socialComments.querySelector('.social__comment').cloneNode(true);
    socialCommentClone.classList.add('social__comment--clone')
    socialComments.appendChild(socialCommentClone);
    const numberOfComment = socialComments.querySelectorAll('.social__comment--clone').length;
    socialCommentClone.querySelector('img').src = array[index].comments[numberOfComment].avatar;
    socialCommentClone.querySelector('.social__text').textContent = array[index].comments[numberOfComment].message;
  }
  const numberOfComment = socialComments.querySelectorAll('.social__comment--clone').length;
  bigPicture.querySelector('.social__comment-count').querySelector('.visible-comments').textContent = numberOfComment + 1 + ' ';
  if (bigPicture.querySelectorAll('.social__comment').length === array[index].comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
}


//Открытие фотографии в окне (big picture)
const showBigPicture = (array) => {
  const pictureImg = document.querySelectorAll('.picture');
  const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  pictureImg.forEach((element, index) => {
    element.addEventListener('click', () => {
      bigPicture.classList.remove('hidden')
      document.body.classList.add('modal-open');
      printComments(1, index, array);
      document.querySelector('.big-picture__img').querySelector('img').src = array[index].url;
      const socialHeader = bigPicture.querySelector('.social__header');
      socialHeader.querySelector('.social__caption').textContent = array[index].description;
      socialHeader.querySelector('.likes-count').textContent = array[index].likes;
      bigPicture.querySelector('.social__comment-count').querySelector('.comments-count').textContent = array[index].comments.length;
      socialComments.querySelector('.social__text').textContent = array[index].comments[0].message;
      socialComments.querySelector('.social__picture').src = array[index].comments[0].avatar;
      const printCommentsWithUploader = () => {
        if (document.querySelectorAll('.social__comment').length === array[index].comments.length) {
          return;
        }
        printComments(0, index, array);

      }
      const closePopupBigPicture = () => {
        socialCommentsLoader.removeEventListener('click', printCommentsWithUploader)
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
        socialCommentsLoader.classList.remove('hidden')
        deleteComments();
      }



      //Добавление комментарием по клику на кнопку "Загрузить еще"
      socialCommentsLoader.addEventListener('click', printCommentsWithUploader)
      const deleteComments = () => {
        const cloneCommentsList = socialComments.querySelectorAll('.social__comment--clone')
        for (let i = 0; i < cloneCommentsList.length; i++) {
          const cloneComment = socialComments.querySelector('.social__comment--clone')
          socialComments.removeChild(cloneComment)
        }
      }

      //Закрытие окна Big Picture
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === "ESC") {
          closePopupBigPicture();
        }
      });
      bigPictureCancel.addEventListener('click', () => {
        closePopupBigPicture();
      })
    })
  })
}

//Обновление фотографий при смене фильтра: удаление фотографий, показ фотографий в соответствии с фильтрами, показ окна Big Picture, при клике на миниатюру
const updatePhotos = (array) => {
  deleteChild();
  showPhotos(array);
  showBigPicture(array)
}

//Получение данных от сервера
getDataServer(urlGetData).then(result => {
  result.forEach((element, index) => {
    dataUsersPhotos[index] = element;
  })
}).catch(() => {
  document.querySelector('main').appendChild(serverProblems);
  serverProblemsButton.addEventListener('click', () => {
    document.querySelector('main').removeChild(serverProblems);
  })
})
  //После получения ответа от сервера
  .finally(() => {

    //отрисовка миниатюр по умолчанию (25)
    showPhotos(dataUsersPhotos)
    showBigPicture(dataUsersPhotos);
    //Когда миниатюры отрисованы, появляются фильтры сверху: по умолчанию, случайные, обсуждаемые
    const imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    const filterDefault = imgFilters.querySelector('#filter-default'); //По умолчанию
    const filterRandom = imgFilters.querySelector('#filter-random');//Случайные
    const filterDiscussed = imgFilters.querySelector('#filter-discussed');//Обсуждаемые

    //клик на кнопку "По умолчанию"
    filterDefault.addEventListener('click', () => {
      filterDefault.classList.add('img-filters__button--active');
      filterRandom.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');

      const debouncePrint = _.debounce(() => updatePhotos(dataUsersPhotos), 500);
      debouncePrint()
    })

    //клик на кнопку "Обсуждаемые"
    filterDiscussed.addEventListener('click', () => {
      const discussedPhotos = dataUsersPhotos.concat();
      discussedPhotos.sort((user1, user2) => user1['likes'] > user2['likes'] ? -1 : 1);
      filterDefault.classList.remove('img-filters__button--active');
      filterRandom.classList.remove('img-filters__button--active');
      filterDiscussed.classList.add('img-filters__button--active');
      const debouncePrint = _.debounce(() => updatePhotos(discussedPhotos), 500);
      debouncePrint()
    })

    //клик на кнопку "Случайные"
    filterRandom.addEventListener('click', () => {
      const randomPhotos = [];
      const numbers = [];
      while (numbers.length < 10) {
        let number = getRandomIntInclusive(0, 24);
        if (!numbers.includes(number)) {
          numbers.push(number);
        }
      }
      numbers.forEach((el, ind) => {
        randomPhotos[ind] = dataUsersPhotos[el]
      })
      filterDefault.classList.remove('img-filters__button--active');
      filterRandom.classList.add('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');

      const debouncePrint = _.debounce(() => updatePhotos(randomPhotos), 500);
      debouncePrint()
    })
  })




