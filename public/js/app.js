const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

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
  const data = JSON.parse(this.responseText);
  console.log(data);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;
  
  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;
  
  responseContainer.appendChild(li);
}
