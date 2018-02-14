const form2 = document.getElementById('fetch-search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

// aplicando ajax con fetch
form2.addEventListener('submit', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchField.value;

  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=dcfdda7272024e589cf84641aa85c739`;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let output = '';
      for (i = 0; i < data.response.docs.length; i++) {
        console.log(data.response.docs[i]);
        const title = data.response.docs[i].headline.main;
        console.log(title);
        const link = data.response.docs[i].web_url;
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
    })
    .catch(function(error) {
      console.log('se ha presentado un error');
      let paragraph = document.createElement('p');
      paragraph.innerText = 'Lo sentimos, ha ocurrido un error';
      responseContainer.appendChild(paragraph);
    });
});
