const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

// aplicando ajax con xhr
form.addEventListener('submit', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=dcfdda7272024e589cf84641aa85c739`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
};

function handleError() {
  console.log('se ha presentado un error');
}

function addNews() {
  let data = JSON.parse(this.responseText);
  console.log(data);
  console.log('algo');
  let output = '';
  for (i = 0; i < data.response.docs.length; i++) {
    console.log(data.response.docs[i]);
    const title = data.response.docs[i].headline.main;
    console.log(title);
    const link = data.response.docs[i].uri;
    const snippet = data.response.docs[i].snippet;

    output += `
    <div class="card my-3">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${snippet}</p>
      <a href="#" class="card-link">${link}</a>
    </div>
  </div>
    `;
    responseContainer.innerHTML = output;
  };
};
