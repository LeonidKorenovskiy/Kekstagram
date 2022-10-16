
const urlHTMLAcademy = 'https://22.javascript.pages.academy/kekstagram';

const urlGetData = 'https://22.javascript.pages.academy/kekstagram/data';





const sendRequest = (url, form) => {
  const headers= {
  'Content-Type': 'form/multipart'
  };
return fetch(url, {
  method: 'POST',
  body: new FormData(form),
}).then(response => {
  if (response.ok){
    console.log('Форма ушла');
    return response.json();
  }
  else{
    return Promise.reject();
  }
})


}



const getDataServer = (url) =>{
return fetch(url).then(response =>{
  if(response.ok){
    return response.json();

  }
  else{
    return Promise.reject();
  }
})


}






export {sendRequest, getDataServer, urlGetData, urlHTMLAcademy};
