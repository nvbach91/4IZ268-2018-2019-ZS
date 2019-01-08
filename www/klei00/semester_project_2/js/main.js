var openForm = $('#open-form');
var formHeader = $('#form-header');
var formBody = $('#form-body');
var form = $('#form');
var reset = $('#reset');
var resultsField;

var openedForm = false;

/*--------------------- open form function ------------------*/
var createForm = function () {
    openForm.text('Skrýt formulář');
    formHeader.removeClass('closed');
    form.removeClass('closed');
    openedForm = true;
};
/*--------------------- close form function ----------------------*/
var hideForm = function () {
    if (resultsField !== undefined) {
        resultsField.remove();
        resultsField = undefined;
    }
    openForm.text('Zobrazit formulář');
    formHeader.addClass('closed');
    form.addClass('closed');
    reset.trigger('click');
    openedForm = false;
};
/*--------------------- open/close form ---------------------------*/
openForm.click(function (e) {
    e.preventDefault();
    if (openedForm) {
        hideForm();
    } else {
        createForm();
    }
});
/*--------------------- submitting form ----------------------------*/
form.submit(function (e) {
    e.preventDefault();
    createLoader();

    var query = $('#searched-text').val().trim().replace(/ /g, '+');
    var mode = $('input:checked', '#form').val();
    var maxBooks = $('#number-input').val();
    var dataUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + mode + ':"' + query + '"&langRestrict=cs&printType=books&maxResults=' + maxBooks;

    $.getJSON(dataUrl).done(function (response) {
        if (openedForm === true) {
            if (resultsField !== undefined) {
                resultsField.empty();
            } else {
                resultsField = $('<div>').attr('id', 'results-field');
                formBody.append(resultsField);
            }
            if (response.totalItems === 0) {
                var result = $('<div>').addClass('result-row').text('Nebyla nalezena žádná kniha.');
                resultsField.append(result);
            } else {
                for (var i = 0; i < response.items.length; i++) {
                    addToResults(response.items[i]);
                }
            }
        }
        $('.whole-page').remove();
    });
});
/*--------------------- check existing books ----------------------------*/
var bookExists = function (id) {
    var existingBooks = $('.id');
    for (var k = 0; k < existingBooks.length; k++) {
        var book = existingBooks.get(k);
        if (id === book.innerHTML) {
            return true;
        }
    }
    return false;
};
/*--------------------- add found books to result list -------------------------*/
var addToResults = function (item) {
    var author = '';
    if (!item.volumeInfo.authors) {
        author = 'Neznámý autor';
    } else {
        var authors = item.volumeInfo.authors;
        if (authors.length === 1) {
            author = authors[0];
        } else {
            author = authors[0];
            for (var j = 0; j < authors.length; j++) {
                author += ', ' + authors[j];
            }
        }
    }
    var resultRow = $('<div>').addClass('result-row');
    var imageUrl;
    if (!item.volumeInfo.imageLinks) {
        imageUrl = 'https://books.google.cz/googlebooks/images/no_cover_thumb.gif';
    } else {
        imageUrl = item.volumeInfo.imageLinks.smallThumbnail;
    }
    var image = $('<img>').addClass('image').attr('src', imageUrl);
    var result = $('<div>').addClass('result').html(author.toUpperCase() + ':<br>' + item.volumeInfo.title);

    var addButton = $('<div>').addClass('add-button').text('Přidat');
    if (bookExists(item.id)) {
        addButton.addClass('add-existing');
    }
    addButton.click(function () {
        if (bookExists(item.id)) {
            alert('Tuto knihu již máš ve své knihovně uloženou.');
        } else {
            addToLibrary(item, author, imageUrl, 0);
            addButton.addClass('add-existing');
        }
    });
    resultRow.append(image).append(result).append(addButton).append($('<hr>'));
    resultsField.append(resultRow);
};
/*--------------------- add a book to my library -----------------------------------------*/
var addToLibrary = function (book, author, url, rating) {
    var books = JSON.parse(localStorage.getItem('books'));
    if (books[book.id] === undefined) {
        books[book.id] = JSON.stringify([JSON.stringify(book), 0]);
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(books));
    }

    var imageCell = $('<div>').addClass('table-cell').append($('<img>').addClass('image').attr('src', url));
    var nameCell = $('<div>').addClass('table-cell').text(book.volumeInfo.title);
    var authorCell = $('<div>').addClass('table-cell').text(author);

    var year;
    if (!book.volumeInfo.publishedDate) {
        year = 'Neznámý';
    } else {
        year = book.volumeInfo.publishedDate;
    }
    var yearCell = $('<div>').addClass('table-cell').text(year);

    var category;
    var categories = book.volumeInfo.categories;
    if (!categories) {
        category = 'Neurčeno';
    } else {
        category = categories[0];
        for (var i = 1; i < categories.length; i++) {
            category += ', ' + categories[i];
        }
    }
    var categoryCell = $('<div>').addClass('table-cell').text(category);

    var star1 = $('<span>').addClass('star').text('*').attr('title', 'star-1');
    var star2 = $('<span>').addClass('star').text('*').attr('title', 'star-2');
    var star3 = $('<span>').addClass('star').text('*').attr('title', 'star-3');
    var star4 = $('<span>').addClass('star').text('*').attr('title', 'star-4');
    var star5 = $('<span>').addClass('star').text('*').attr('title', 'star-5');

    var ratingCell = $('<div>').addClass('table-cell').addClass('rating').append(star1, star2, star3, star4, star5);
    var deleteCell = $('<div>').addClass('table-cell').addClass('delete').text('Odebrat');
    var idCell = $('<div>').addClass('table-cell').addClass('id').text(book.id);
    var newRow = $('<div>').addClass('table-row').append(imageCell).append(nameCell).append(authorCell).append(categoryCell).append(yearCell).append(ratingCell).append(deleteCell).append(idCell);
    var tableHead = $('#table-head');
    if (tableHead.hasClass('closed')) {
        tableHead.removeClass('closed');
    }
    $('#my-library').append(newRow);

    deleteCell.click(function () {
        var booksAfterDelete = JSON.parse(localStorage.getItem('books'));
        delete booksAfterDelete[book.id];
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(booksAfterDelete));

        newRow.remove();
        if ($('.id').length === 1) {
            tableHead.addClass('closed');
        }
        form.submit();
    });

    newRow.find('.star').click(function () {
        var star = $(this);
        star.nextAll().removeClass('checked');
        star.prevAll().addClass('checked');
        star.addClass('checked');

        var changedRatingBooks = JSON.parse(localStorage.getItem('books'));
        var changedRating = JSON.parse(changedRatingBooks[book.id]);
        changedRating[1] = parseInt(this.title.substr(5));
        changedRatingBooks[book.id] = JSON.stringify(changedRating);
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(changedRatingBooks));
    });

    switch (rating) {
        case 1: star1.trigger('click');
            break;
        case 2: star2.trigger('click');
            break;
        case 3: star3.trigger('click');
            break;
        case 4: star4.trigger('click');
            break;
        case 5: star5.trigger('click');
    }
};
/* -------------- create loader --------------------------*/
var createLoader = function () {
    var loader = $('<div>').addClass('loader').append($('<figure>').addClass('page'));
    $(document.body).append($('<div>').addClass('whole-page').append(loader));
};

/* ----------------- init page ----------------------- */
if (localStorage.length !== 0) {
    var storedBooks = JSON.parse(localStorage.getItem('books'));
    var keys = Object.keys(storedBooks);
    for (var i = 0; i < keys.length; i++) {
        var content = JSON.parse(storedBooks[keys[i]]);
        var book = JSON.parse(content[0]);
        var rating = content[1];

        var author = '';
        if (!book.volumeInfo.authors) {
            author = 'Neznámý autor';
        } else {
            var authors = book.volumeInfo.authors;
            if (authors.length === 1) {
                author = authors[0];
            } else {
                author = authors[0];
                for (var j = 0; j < authors.length; j++) {
                    author += ', ' + authors[j];
                }
            }
        }
        var imageUrl;
        if (!book.volumeInfo.imageLinks) {
            imageUrl = 'https://books.google.cz/googlebooks/images/no_cover_thumb.gif';
        } else {
            imageUrl = book.volumeInfo.imageLinks.smallThumbnail;
        }
        addToLibrary(book, author, imageUrl, rating);
    }
} else {
    var books = new Object();
    localStorage.setItem('books', JSON.stringify(books));
}
