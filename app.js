const bsSearchURL = 'https://api.nytimes.com/svc/books/v3/lists/current/';
const bsApiKey = 'S59ytkfj516WUG8NHeBvcBmRvCDSPKS8';
const tdSearchURL = 'https://tastedive.com/api/similar?type=books&q=';
const tdApiKey = '397089-NeedMore-BSEJSNYL'

const numResults = 0

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};

function displayBSResults(responseJson) {
    $('.js-bs-list').empty();
    $('.js-bs-list').removeClass('hidden');
    console.log(responseJson);
    for (let i = 0; i < responseJson.results.books.length; i++) {
        $('.js-bs-list').append(`<li class="${i}">
        <h2 class="title">${responseJson.results.books[i].title}</h2>
        <p>By:</p>
        <h3 class="author">${responseJson.results.books[i].author}</h3>
        <img src="${responseJson.results.books[i].book_image}" alt="cover for ${responseJson.results.books[i].title}">
        <p>${responseJson.results.books[i].description}</p>
        <p>Would you like to see more books?</p>
        <div class="js-td-buttons">
        <button type="button" class="titleBtn">Title</button>
        <button type="button" class="authorBtn">Author</button>
        </div>
    </li>`);
    };
};

function getBS(list) {
    const listName = list + '.json' + '?api-key=' + bsApiKey;
    const url = bsSearchURL

    fetch(url + listName)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayBSResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
};



function getTDByTitle(title) {

    const url = tdSearchURL + title;

    var formatURL = document.write(url.replace(/ /g, '%20'));

    console.log(formatURL);
    fetch(formatURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
};

function handleTDTitleSubmit() {
    $('.js-bs-list').on('click', '.titleBtn', function(event) {
        let titleText = $('h2.title').closest().text();
        console.log(titleText);
    });
};

function getTDByAuthor(author) {

    const url = tdSearchURL + formatQueryParams(author);
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
};

function handleListSubmit() {
    $('.nytControls').submit('.listSubmit', function(event) {
        event.preventDefault();
        var listSel = $('#listSelect').val();
        getBS($('#listsSelect').val());
    })
};

$(function() {
    handleListSubmit();
    handleTDTitleSubmit();
});