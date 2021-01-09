// API endpoint and key for NY Times Best Seller API
const bsSearchURL = 'https://api.nytimes.com/svc/books/v3/lists/current/';
const bsApiKey = 'S59ytkfj516WUG8NHeBvcBmRvCDSPKS8';

// Variable used to specify which book to view
const bookIsbn = 'ISBN:0738531367';

// Moves list fetch results into a list
function displayBSResults(responseJson) {
    $('.js-bs-list').empty();
    $('.js-bs-list').removeClass('hidden');
    $('.js-book-view').addClass('hidden');
    console.log(responseJson);
    for (let i = 0; i < responseJson.results.books.length; i++) {
        $('.js-bs-list').append(`<li class="${i}">
        <h2 class="title">${responseJson.results.books[i].title}</h2>
        <h3 class="author"> by ${responseJson.results.books[i].author}</h3>
        <h3 class="isbn hidden">${responseJson.results.books[i].isbns[0].isbn10}</h3>
        <img src="${responseJson.results.books[i].book_image}" alt="cover for ${responseJson.results.books[i].title}" class="largeImage">
        <p>${responseJson.results.books[i].description}</p>
        <div class="js-td-buttons">
        <button type="button" class="titleBtn">View</button>
        </div>
    </li>`);
    };
};

// Shrinks book list for viewing with book viewer
function hideBookInfo() {
    $('.js-bs-list').find('h2.title').addClass('hidden');
    $('.js-bs-list').find('h3.author').addClass('hidden');
    $('.js-bs-list').find('p').addClass('hidden');
    $('.js-bs-list').find('img').removeClass('largeImage').addClass('smallImage');
};

// restores book list to full height when viewer is closed.
function showBookInfo() {
    $('.js-bs-list').find('h2.title').removeClass('hidden');
    $('.js-bs-list').find('h3.author').removeClass('hidden');
    $('.js-bs-list').find('p').removeClass('hidden');
    $('.js-bs-list').find('img').removeClass('smallImage').addClass('largeImage');
};

// Fetch the specified list from the API
function getBS(list) {
    const listName = `${list}.json?api-key=${bsApiKey}`;
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

// Alerts if book not found by specific ISBN
function alertNotFound() {
    showBookInfo();
    $('.js-book-view').addClass('hidden');
    alert("Could not locate that book on Google Books. Please try another book.");
};

// Shows viewer after a book is selected
function bookFound() {
    hideBookInfo();
    $('.js-book-view').removeClass('hidden');
};

// Initializes viewer with ISBN
function initialize(bookIsbn) {
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(bookIsbn, alertNotFound);
};

// Initializes viewer for selected book
function handleViewSubmit() {
    $('.js-bs-list').on('click', '.titleBtn', function(event) {
        // assigns selected book ISBN to isbnText
        let isbnText = $(this).parent().siblings('h3.isbn').text();
        // Formats ISBN for viewer
        let bookIsbn = `ISBN:${isbnText}`
        console.log(bookIsbn);
        initialize(bookIsbn);
        bookFound();
    });
};

// loads google books viewer api library
google.books.load();

// handles list submittal
function handleListSubmit() {
    $('.nytControls').submit('.listSubmit', function(event) {
        event.preventDefault();
        hideIntro();
        $('.js-bs-list').removeClass('hidden');
        var listSel = $('#listSelect').val();
        getBS($('#listsSelect').val());
    })
};

// Allows the user to close the book viewer
function handleCloseViewer() {
    $('.js-hide-viewer').submit('.hide', function(event) {
        event.preventDefault();
        $('.js-book-view').addClass('hidden');
        showBookInfo();
    })
};

// This hides the intro Div
function hideIntro() {
    $('.introduction').addClass('hidden');
};

// This handles the "Let's Begin" button in the intro
function handleBegin() {
    $('.introduction').submit('.letsBegin', function(event) {
        event.preventDefault();
        hideIntro();
    })
};

$(function() {
    handleListSubmit();
    handleViewSubmit();
    handleCloseViewer();
    handleBegin();
});