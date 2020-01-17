$(window).on('load', function () {
    loadAllAuthors();
    loadAllPublisher();

    setTimeout(function () {
        $('#author-card>div').css('padding-left', '0px');
        // $('#author-card>div>div').css('margin-left', '0px');
    }, 1000);
    setTimeout(function () {
        $('.pub-card').css('padding-left', '0px');
        // $('.pub-card>div>div').css('margin-left', '0px');
    }, 1200);
});


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

$('#btnRegAuthor').click(function () {
    let formData = $('#formAuthor').serialize();
    $.ajax({
        url: "php/PhpSetting.php",
        method: "POST",
        data: formData + "&btnAuthor=Register"
    }).done(function (res) {
        if (res == 1) {
            alert("Done");
        } else {
            alert("Fail")
        }
    });
});

$('#btnRegPub').click(function () {
    let formData=$('#formPublisher').serialize();
    $.ajax({
        url:"php/PhpSetting.php",
        method:"POST",
        data:formData+"&btnPublisher=Register"
    }).done(function (res) {
        if (res == 1) {
            alert("Done");
        } else {
            alert("Fail")
        }
    });
});