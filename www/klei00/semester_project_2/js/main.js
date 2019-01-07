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
}
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
}
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
}
/*--------------------- add found books to result list -------------------------*/
var addToResults = function (item) {
    var author = '';
    if (item.volumeInfo.authors === undefined) {
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
    if (item.volumeInfo.imageLinks === undefined) {
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
}
/*--------------------- add a book to my library -----------------------------------------*/
var addToLibrary = function (book, author, url, rating) {
    localStorage.setItem(book.id, JSON.stringify([JSON.stringify(book), 0]));

    var imageCell = $('<div>').addClass('table-cell').append($('<img>').addClass('image').attr('src', url));
    var nameCell = $('<div>').addClass('table-cell').text(book.volumeInfo.title);
    var authorCell = $('<div>').addClass('table-cell').text(author);

    var year;
    if (book.volumeInfo.publishedDate === undefined) {
        year = 'Neznámý';
    } else {
        year = book.volumeInfo.publishedDate;
    }
    var yearCell = $('<div>').addClass('table-cell').text(year);

    var category;
    var categories = book.volumeInfo.categories;
    if (categories === undefined) {
        category = 'Neurčeno';
    } else {
        category = categories[0];
        for (var i = 1; i < categories.length; i++) {
            category += ', ' + categories[i];
        }
    }
    var categoryCell = $('<div>').addClass('table-cell').text(category);

    var star1 = $('<span>').addClass('star').text('*');
    var star2 = $('<span>').addClass('star').text('*');
    var star3 = $('<span>').addClass('star').text('*');
    var star4 = $('<span>').addClass('star').text('*');
    var star5 = $('<span>').addClass('star').text('*');

    var ratingCell = $('<div>').addClass('table-cell').addClass('rating').append(star1).append(star2).append(star3).append(star4).append(star5);
    var deleteCell = $('<div>').addClass('table-cell').addClass('delete').text('Odebrat');
    var idCell = $('<div>').addClass('table-cell').addClass('id').text(book.id);
    var newRow = $('<div>').addClass('table-row').append(imageCell).append(nameCell).append(authorCell).append(categoryCell).append(yearCell).append(ratingCell).append(deleteCell).append(idCell);
    var tableHead = $('#table-head');
    if (tableHead.hasClass('closed')) {
        tableHead.removeClass('closed');
    }
    $('#my-library').append(newRow);

    deleteCell.click(function () {
        localStorage.removeItem(book.id);
        newRow.remove();
        if ($('.id').length === 1) {
            tableHead.addClass('closed');
        }
        form.submit();
    });

    star1.click(function () {
        if (!star1.hasClass('checked')) {
            star1.addClass('checked');
        } else {
            if (star2.hasClass('checked')) {
                star2.removeClass('checked');
            }
            if (star3.hasClass('checked')) {
                star3.removeClass('checked');
            }
            if (star4.hasClass('checked')) {
                star4.removeClass('checked');
            }
            if (star5.hasClass('checked')) {
                star5.removeClass('checked');
            }
        }
        var changedRating = JSON.parse(localStorage.getItem(book.id));
        changedRating[1] = 1;
        localStorage.removeItem(book.id);
        localStorage.setItem(book.id, JSON.stringify(changedRating));
        form.submit();
    });
    star2.click(function () {
        if (!star1.hasClass('checked')) {
            star1.addClass('checked');
        }
        if (!star2.hasClass('checked')) {
            star2.addClass('checked');
        } else {
            if (star3.hasClass('checked')) {
                star3.removeClass('checked');
            }
            if (star4.hasClass('checked')) {
                star4.removeClass('checked');
            }
            if (star5.hasClass('checked')) {
                star5.removeClass('checked');
            }
        }
        var changedRating = JSON.parse(localStorage.getItem(book.id));
        changedRating[1] = 2;
        localStorage.removeItem(book.id);
        localStorage.setItem(book.id, JSON.stringify(changedRating));
        form.submit();
    });
    star3.click(function () {
        if (!star1.hasClass('checked')) {
            star1.addClass('checked');
        }
        if (!star2.hasClass('checked')) {
            star2.addClass('checked');
        }
        if (!star3.hasClass('checked')) {
            star3.addClass('checked');
        } else {
            if (star4.hasClass('checked')) {
                star4.removeClass('checked');
            }
            if (star5.hasClass('checked')) {
                star5.removeClass('checked');
            }
        }
        var changedRating = JSON.parse(localStorage.getItem(book.id));
        changedRating[1] = 3;
        localStorage.removeItem(book.id);
        localStorage.setItem(book.id, JSON.stringify(changedRating));
        form.submit();
    });
    star4.click(function () {
        if (!star1.hasClass('checked')) {
            star1.addClass('checked');
        }
        if (!star2.hasClass('checked')) {
            star2.addClass('checked');
        }
        if (!star3.hasClass('checked')) {
            star3.addClass('checked');
        }
        if (!star4.hasClass('checked')) {
            star4.addClass('checked');
        } else {
            if (star5.hasClass('checked')) {
                star5.removeClass('checked');
            }
        }
        var changedRating = JSON.parse(localStorage.getItem(book.id));
        changedRating[1] = 4;
        localStorage.removeItem(book.id);
        localStorage.setItem(book.id, JSON.stringify(changedRating));
        form.submit();
    });
    star5.click(function () {
        if (!star1.hasClass('checked')) {
            star1.addClass('checked');
        }
        if (!star2.hasClass('checked')) {
            star2.addClass('checked');
        }
        if (!star3.hasClass('checked')) {
            star3.addClass('checked');
        }
        if (!star4.hasClass('checked')) {
            star4.addClass('checked');
        }
        if (!star5.hasClass('checked')) {
            star5.addClass('checked');
        }
        var changedRating = JSON.parse(localStorage.getItem(book.id));
        changedRating[1] = 5;
        localStorage.removeItem(book.id);
        localStorage.setItem(book.id, JSON.stringify(changedRating));
        form.submit();
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
}
/* -------------- create loader --------------------------*/
var createLoader = function () {
    var loader = $('<div>').addClass('loader').append($('<figure>').addClass('page'));
    $(document.body).append($('<div>').addClass('whole-page').append(loader));
}

/* ----------------- init page ----------------------- */
if (localStorage.length !== 0) {
    for (var i = 0; i < localStorage.length; i++) {
        var content = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var book = JSON.parse(content[0]);
        var rating = content[1];

        var author = '';
        if (book.volumeInfo.authors === undefined) {
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
        if (book.volumeInfo.imageLinks === undefined) {
            imageUrl = 'https://books.google.cz/googlebooks/images/no_cover_thumb.gif';
        } else {
            imageUrl = book.volumeInfo.imageLinks.smallThumbnail;
        }
        addToLibrary(book, author, imageUrl, rating);
    }
}
