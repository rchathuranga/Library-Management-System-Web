$(window).on('load', function () {

    setTimeout(function () {

        loadAllBooks();
        loadAllMembers();
        // loadAllAuthors();
        // loadAllPublisher();

        var date = new Date();
        $('#txtReturnDate').val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

        setTimeout(function () {
            $('#book-card>div').css('padding-left', '0px');
        }, 600);

        setTimeout(function () {
            $('#memberList>div').css('padding-left', '0px');
        }, 1000);

        // setTimeout(function () {
        //     $('#author-card>div').css('padding-left', '0px');
        //     // $('#author-card>div>div').css('margin-left', '0px');
        // }, 1000);
        // setTimeout(function () {
        //     $('.pub-card').css('padding-left', '0px');
        //     // $('.pub-card>div>div').css('margin-left', '0px');
        // }, 1400);

    }, 300);


});

function loadAllBooks() {
    $.ajax({
        url: "php/PhpBook.php",
        method: "GET",
        dataType: "json"
    }).done(function (res) {
        $('#book-card>div').children().remove();
        for (let i = 0; i < res.length; i++) {
            newBookToList(res[i]);
        }
        bookClickEvent();
    });
}

function newBookToList(res) {
    $('#book-card>div').append("<div>\n" +
        "                                <div>BK0" + res[0] + "</div>\n" +
        "                                <h2>" + res[1] + "</h2>\n" +
        "                                <h4>10 available out of 15</h4>\n" +
        "                            </div>");
}

function loadAllMembers() {
    $.ajax({
        url: "php/PhpMember.php",
        method: "GET",
        dataType: "json"
    }).done(function (response) {
        $('#listMem').children().remove();
        for (let i = 0; i < response.length; i++) {
            newMemberList(response[i]);
        }
        memberClickEvent();
    });
}

function newMemberList(mem) {
    $('#memberList>div').append("<div>\n" +
        "                                <div>M00" + mem[0] + "</div>\n" +
        "                                <h3>" + mem[1] + "</h3>\n" +
        "                                <h5>" + mem[6] + "</h5>\n" +
        "                                <h5>" + mem[2] + "</h5>\n" +
        "                            </div>");
}

function loadAllAuthors() {
    $.ajax({
        url: "php/PhpSetting.php",
        method: "GET",
        dataType: "json",
        data: "btnAuthor=yes",
    }).done(function (res) {
        $('#author-card>div').children().remove();
        for (let i = 0; i < res.length; i++) {
            newAuthorList(res[i]);
        }
        authorClickEvent();
    });
}

function newAuthorList(res) {
    $('#author-card>div').append("<div>\n" +
        "<div>A0" + res[0] + "</div>\n" +
        "<h2>" + res[1] + "</h2>\n" +
        "<h4>" + res[2] + "</h4>\n" +
        "</div>");
}

function loadAllPublisher() {
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

function newPublisherList(res) {
    $('.pub-card>div').append("<div>\n" +
        "<div>P0" + res[0] + "</div>\n" +
        "<h2>" + res[1] + "</h2>\n" +
        "<h4>" + res[2] + "</h4>\n" +
        "</div>");
}


let selectedMember;

function memberClickEvent() {
    $('#memberList>div').children().click(function () {
        $('#memberList>div').children().css('border', '');
        $(this).css('border', '2px solid #6c63ff');
        let memId = $($(this).children()[0]).text();
        selectedMember = (parseInt(memId.split("M")[1]));
    });
}




let selectedBook;

function bookClickEvent() {
    $('#book-card>div').children().click(function () {
        $('#book-card>div').children().css('border', '');
        $(this).css('border', '2px solid #6c63ff');

        var bookId=$($(this).children()[0]).text();
        selectedBook = parseInt(bookId.split("BK")[1]);

        searchBookId(selectedBook);
    });
}

function setSelectedBookUI(res) {
    console.log("======================= "+res );
    $('.selectedBook').append("<div>\n" +
        "                            <div>BK0"+ res['book_id'] +"</div>\n" +
        "                            <h2>"+ res['title'] +"</h2>\n" +
        "                            <div id=\"inner-cards\">\n" +
        "                                <div>\n" +
        "                                    <div><h4>Author</h4><h5>A0"+ res['author'] +"</h5></div>\n" +
        "                                    <h3>"+ res['name'] +"</h3>\n" +
        "                                </div>\n" +
        "                                <div>\n" +
        "                                    <div><h4>Publisher</h4><h5>P0"+ res['pub_id'] +"</h5></div>\n" +
        "                                    <h3>"+ res['publisher'] +"</h3>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>");
}

function searchBookId(id) {
    $('.selectedBook').children().remove();
    $.ajax({
        url:"php/PhpBook.php",
        method: "POST",
        dataType: "json",
        data: "btnBook=Search&bookId=" + id,
    }).done(function (res) {
        console.log(res);
        setSelectedBookUI(res);
    });
}


$('#btnSearch').click(function () {
    $('#btnSearch').css('display', 'none');
    $('#searchOption').css('padding-top', '0px');

    loadAllAuthors();
    loadAllPublisher();

    setTimeout(function () {
        $('#author-card>div').css('padding-left', '0px');
        // $('#author-card>div>div').css('margin-left', '0px');
    }, 1000);
    setTimeout(function () {
        $('.pub-card').css('padding-left', '0px');
        // $('.pub-card>div>div').css('margin-left', '0px');
    }, 1400);
});


$('#btnBorrow').click(function () {

    var formData = $('#borrow-form').serialize();

    if (selectedMember != null) {
        if (selectedBook != null) {
            $.ajax({
                url: "php/PhpBorrow.php",
                method: "POST",
                data: formData + '&btnBorrow=Register&memId=' + selectedMember + '&bookId=' + selectedBook,
            }).done(function (res) {
                if (res == 1) {
                    clearAll();
                    alert("Done");
                } else {
                    alert("Fail");
                }

            });
        }else {
            $('.selectedBook>div').css('border','2px solid #FF206E');
            setTimeout(function () {
                $('.selectedBook>div').css('border','');
            },3000);
        }
    }else {
        $('#txtMemId').css('border','2px solid #FF206E');
        setTimeout(function () {
            $('#txtMemId').css('border','');
        },3000);
    }
});


function authorClickEvent() {
    $('#author-card>div').children().click(function () {
        $('#author-card>div').children().css('border', '');
        $(this).css('border', '2px solid #6c63ff');

        let authorId=$($(this).children()[0]).text();
        console.log(authorId.split('A')[1]);

        /////////////////////////
        //////////////////////
        ///////////////////
        //              ||              search book by Author
        //\\\\\\\\\\\\\\\\\
        //\\\\\\\\\\\\\\\\\\\\
        //\\\\\\\\\\\\\\\\\\\\\\\

    });

}

function publisherClickEvent() {
    $('.pub-card>div').children().click(function () {
        $('.pub-card>div').children().css('border', '');
        $(this).css('border', '2px solid #6c63ff');

        let pubId=$($(this).children()[0]).text();
        console.log(pubId.split('A')[1]);

        /////////////////////////
        //////////////////////
        ///////////////////
        //              ||              search book by publisher
        //\\\\\\\\\\\\\\\\\
        //\\\\\\\\\\\\\\\\\\\\
        //\\\\\\\\\\\\\\\\\\\\\\\
    });

}


$('input').on('keypress',function (e) {
    if(e.keyCode==13){
        if($('input').val()==""){
            clearAll();
        }
    }
});

function clearAll(){
    var date=new Date();
    $('#txtReturnDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());

    $('.pub-card>div').children().css('border', '');
    $('#author-card>div').children().css('border', '');
    $('#book-card>div').children().css('border', '');
    $('#memberList>div').children().css('border', '');

    selectedBook=undefined;
    selectedMember=undefined;
    selectedPublisher=undefined;
    selectedAuthor=undefined;


    $('.selectedBook').children().remove();
    $('.selectedBook').append("<div></div>");
}