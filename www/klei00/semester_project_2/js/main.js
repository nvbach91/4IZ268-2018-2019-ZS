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
            addToLibrary(item, author, imageUrl);
            addButton.addClass('add-existing');
        }
    });
    resultRow.append(image).append(result).append(addButton).append($('<hr>'));
    resultsField.append(resultRow);
}
/*--------------------- add a book to my library -----------------------------------------*/
var addToLibrary = function (book, author, url) {
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
    var deleteCell = $('<div>').addClass('table-cell').addClass('delete').text('Odebrat');
    var idCell = $('<div>').addClass('table-cell').addClass('id').text(book.id);
    var newRow = $('<div>').addClass('table-row').append(imageCell).append(nameCell).append(authorCell).append(categoryCell).append(yearCell).append(deleteCell).append(idCell);
    var tableHead = $('#table-head');
    if (tableHead.hasClass('closed')) {
        tableHead.removeClass('closed');
    }
    $('#my-library').append(newRow);

    deleteCell.click(function () {
        newRow.remove();
        if ($('.id').length === 1) {
            tableHead.addClass('closed');
        }
        form.submit();
    });
}
/* -------------- create loader --------------------------*/
var createLoader = function () {
    var loader = $('<div>').addClass('loader').append($('<figure>').addClass('page'));
    $(document.body).append($('<div>').addClass('whole-page').append(loader));
}
