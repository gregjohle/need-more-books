// API endpoint and key for NY Times Best Seller API
const bsSearchURL = 'https://api.nytimes.com/svc/books/v3/lists/current/';
const bsApiKey = 'S59ytkfj516WUG8NHeBvcBmRvCDSPKS8';

// Moves list fetch results into a list
function displayBSResults(responseJson) {
    $('.js-bs-list').empty();
    $('.js-bs-list').removeClass('hidden');
    console.log(responseJson);
    for (let i = 0; i < responseJson.results.books.length; i++) {
        $('.js-bs-list').append(`<li class="${i}">
        <h2 class="title">${responseJson.results.books[i].title}</h2>
        <p>By:</p>
        <h3 class="author">${responseJson.results.books[i].author}</h3>
        <h3 class="isbn hidden">${responseJson.results.books[i].isbns[0].isbn10}</h3>
        <img src="${responseJson.results.books[i].book_image}" alt="cover for ${responseJson.results.books[i].title}">
        <p>${responseJson.results.books[i].description}</p>
        <p>Would you like to see more books?</p>
        <div class="js-td-buttons">
        <button type="button" class="titleBtn">View</button>
        </div>
    </li>`);
    };
};

// Fetch the specified list from the API
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

// Variable used to specify which book to view
bookIsbn = 'ISBN:0738531367'

// Alerts if book not found by specific ISBN
function alertNotFound() {
    alert("could not embed the book!");
};

// Initializes viewer with ISBN
function initialize(bookIsbn) {
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(bookIsbn, alertNotFound);
    //viewer.resize();
};

// Initializes viewer for selected book
function handleViewSubmit() {
    $('.js-bs-list').on('click', '.titleBtn', function(event) {
        $('.js-book-view').removeClass('hidden');
        let isbnText = $(this).parent().siblings('h3.isbn').text();
        bookIsbn = "ISBN:" + isbnText;
        console.log(bookIsbn);
        initialize(bookIsbn);
    });
};

// loads google books viewer api library
google.books.load();

// handles list submittal
function handleListSubmit() {
    $('.nytControls').submit('.listSubmit', function(event) {
        event.preventDefault();
        $('.js-bs-list').removeClass('hidden');
        var listSel = $('#listSelect').val();
        getBS($('#listsSelect').val());
    })
};

$(function() {
    handleListSubmit();
    handleViewSubmit();
});