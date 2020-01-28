$(window).on('load', function () {
    loadAllAuthors();
    loadAllPublishers();
    loadAllBooks();

    setTimeout(function () {
        $('#listMem').css('padding-top', '10px');
        $('.author-card').css('padding-left', '0px');
    }, 600);
    setTimeout(function () {
        $('.pub-card').css('padding-left', '0px');
    }, 1000);
});


function newAuthorList(ar) {
    $('.author-card>div').append("<div>\n" +
        "<div>A00" + ar[0] + "</div>\n" +
        "<h2>" + ar[1] + "</h2>\n" +
        "<h4>" + ar[2] + "</h4>\n" +
        "</div>");
}

function loadAllAuthors() {
    $.ajax({
        url: "php/PhpSetting.php",
        method: "GET",
        dataType: "json",
        data: "btnAuthor=yes",
    }).done(function (res) {
        $('.author-card>div').children().remove();
        for (let i = 0; i < res.length; i++) {
            newAuthorList(res[i]);
        }
        authorClickEvent();
    });
}

function newPublisherList(ar) {
    $('.pub-card>div').append("<div>\n" +
        "<div>P00" + ar[0] + "</div>\n" +
        "<h2>" + ar[1] + "</h2>\n" +
        "<h4>" + ar[2] + "</h4>\n" +
        "</div>");
}

function loadAllPublishers() {
    $.ajax({
        url: "php/PhpSetting.php",
        method: "GET",
        dataType: "json",
        data: "btnPublisher=yes",
    }).done(function (res) {
        $('.pub-card>div').children().remove();
        for (let i = 0; i < res.length; i++) {
            newPublisherList(res[i]);
        }
        publisherClickEvent();
    });
}

function newBookList(res) {
    $('#listMem').append("<div class=\"selectedBook\">\n" +
        "                    <div>\n" +
        "                        <div>BK00" + res[0] + "</div>\n" +
        "                        <h2>" + res[1] + "</h2>\n" +
        "                        <div class=\"inner-cards\">\n" +
        "                            <div>\n" +
        "                                <div><h4>Author</h4><h5>A00" + res[4] + "</h5></div>\n" +
        "                                <h3>" + res[5] + "</h3>\n" +
        "                            </div>\n" +
        "                            <div>\n" +
        "                                <div><h4>Publisher</h4><h5>P00" + res[6] + "</h5></div>\n" +
        "                                <h3>" + res[7] + "</h3>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>");
}

function loadAllBooks() {
    $.ajax({
        url: "php/PhpBook.php",
        method: "GET",
        dataType: "json",
    }).done(function (res) {
        $('#listMem').children().remove();
        for (let i = 0; i < res.length; i++) {
            newBookList(res[i]);
        }
        bookClickEvent();
    });
}

let selectedAuthor;

function authorClickEvent() {
    $('.author-card>div').children().click(function () {
        $('.author-card>div').children().css({'border': ''});
        $(this).css({'border': '2px solid #6c63ff'});
        var a = $($(this).children().get(0)).text();
        selectedAuthor = parseInt(a.split('A')[1]);
    });
}

let selectedPublisher;

function publisherClickEvent() {
    $('.pub-card>div').children().click(function () {
        $('.pub-card>div').children().css({'border': ''});
        $(this).css({'border': '2px solid #6c63ff'});
        var a = $($(this).children().get(0)).text();
        selectedPublisher = parseInt(a.split('P')[1]);
    });
}

function searchAuthor(id) {
    $.ajax({
        url: "php/PhpSetting.php",
        method: "POST",
        data: "btnAuthor=Search&authorId=" + id,
        dataType: "json"
    }).done(function (res) {
        console.log(res);
    });
}

function searchBook(id) {
    $.ajax({
        url: "php/PhpBook.php",
        method: "POST",
        data: "btnBook=Search&bookId=" + id,
        dataType: "json"
    }).done(function (res) {
        $('#txtBookTitle').val(res['title']);
        $('#txtCopies').val(res['no_of_copies']);
    });
}


$('#btnREG').click(function () {

    let formData = $('#bookForm').serialize();

    if ($('#btnREG').text() == "Register") {
        if (selectedAuthor !== undefined && selectedPublisher !== undefined) {
            $.ajax({
                url: "php/PhpBook.php",
                method: "POST",
                data: formData + "&author=" + selectedAuthor + "&publisher=" + selectedPublisher + "&btnBook=Register",
            }).done(function (res) {
                if (res == 1) {
                    clearAll();
                    loadAllBooks();
                    alert('done');
                } else {
                    alert('fail');
                }
            });
        } else {
            alert("select");
        }
    } else {
        if (selectedAuthor !== undefined && selectedPublisher !== undefined) {
            $.ajax({
                url: "php/PhpBook.php",
                method: "POST",
                data: formData + "&author=" + selectedAuthor + "&publisher=" + selectedPublisher + "&btnBook=Modify&bookId=" + selectedBook,
            }).done(function (res) {
                if (res == 1) {
                    clearAll();
                    loadAllBooks();
                    alert('done');
                } else {
                    alert('fail');
                }
            });
        } else {
            alert("select");
        }
    }
});

let selectedBook;

function bookClickEvent() {
    $('#listMem>div>div').click(function () {
        $('#listMem>div>div').css({'border': ''});
        $(this).css({'border': '2px solid #6c63ff'});
        var a = $($(this).children().get(0)).text();
        selectedBook = parseInt(a.split('BK')[1]);
        searchBook(selectedBook);

        var aid = $($($($($(this).children().get(2)).children().get(0)).children().get(0)).children().get(1)).text();

        var authorId = parseInt(aid.split('A')[1]);
        findAuthorInList(authorId);
        selectedAuthor = authorId;

        var pid = $($($($($(this).children().get(2)).children().get(1)).children().get(0)).children().get(1)).text();
        var pubId = (parseInt(pid.split('P')[1]));
        selectedPublisher = pubId;
        findPublisherInList(pubId);

        // searchAuthor(parseInt(a.split('BK')[1]));

        $('#btnDelete').css('display', 'inline');
        $('#btnREG').text('Modify');
        // $('#txtBookTitle').focus();

    });
}


function clearAll() {
    $('#btnDelete').css('display', '');
    $('#listMem>div>div').css({'border': ''});
    selectedBook = undefined;
    selectedPublisher = undefined;
    selectedAuthor = undefined;
    $('.author-card>div').children().css({'border': ''});
    $('.pub-card>div').children().css({'border': ''});
    $('#txtCopies').val('');
    $('#txtBookTitle').val('');

    $('#txtPublisher').val('');
    $('#txtAuthor').val('');

    $('#btnREG').text('Register');

    $('.author-card').animate({
        scrollLeft: 0
    }, 800, function () {
    });
    $('.pub-card').animate({
        scrollLeft: 0
    }, 800, function () {
    });
}


function findAuthorInList(checkId) {
    $('.author-card>div').children().css({
        'border': '',
    });
    var length = $('.author-card>div').children().length;

    for (let i = 0; i < length; i++) {
        var id = $($($('.author-card>div').children().get()[i]).children().get()[0]).text();
        var rid = (id.split('A')[1]);
        if (rid == checkId) {
            $($('.author-card>div').children().get()[i]).css({
                'border': '2px solid #6c63ff',
            });
            $('.author-card').animate({
                scrollLeft: ($($('.author-card').children().children().get()[i]).offset().left) - 30
            }, 800, function () {
            });
        }
    }
}

function findPublisherInList(checkId) {
    $('.pub-card>div').children().css({
        'border': '',
    });
    var length = $('.pub-card>div').children().length;

    for (let i = 0; i < length; i++) {
        var id = $($($('.pub-card>div').children().get()[i]).children().get()[0]).text();
        var rid = (id.split('P')[1]);
        if (rid == checkId) {
            $($('.pub-card>div').children().get()[i]).css({
                'border': '2px solid #6c63ff',
            });
            $('.pub-card').animate({
                scrollLeft: ($($('.pub-card').children().children().get()[i]).offset().left) - 30
            }, 800, function () {
            });
        }
    }
}


$('#txtBookTitle').on('keypress', function (e) {
    if (e.keyCode === 13) {
        if ($('#txtBookTitle').val() === '') {
            clearAll();
        }
    }
});

$('#btnDelete').click(function () {
    if (selectedBook !== undefined) {
        $.ajax({
            url: 'php/PhpBook.php',
            method: "POST",
            data: "btnBook=Delete&bookId=" + selectedBook,
        }).done(function (res) {
            if (res == 1) {
                loadAllBooks();
                clearAll();
                alert('DONE');
            } else {
                alert('Fail');
            }
        });
    }
});

$('#txtAuthor').on('keydown', function (e) {
    var text = $('#txtAuthor').val();
    if (text.length === 4) {
        var id = parseInt(text.split('A')[1]);
        selectedAuthor = id;
        findAuthorInList(id);
    } else {
        $('#txtAuthor').css("border", "2px solid rgb(255, 0, 110)");
        setTimeout(function () {
            $('#txtAuthor').css("border", "");
        }, 1800);
    }
});

$('#txtPublisher').on('keydown', function (e) {
    var text = $('#txtPublisher').val();
    if (text.length === 4) {
        var id = parseInt(text.split('P')[1]);
        selectedPublisher = id;
        findPublisherInList(id);
    } else {
        $('#txtPublisher').css("border", "2px solid rgb(255, 0, 110)");
        setTimeout(function () {
            $('#txtPublisher').css("border", "");
        }, 1800);
    }
});