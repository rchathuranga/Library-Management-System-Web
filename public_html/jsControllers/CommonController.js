let login = "index.html";

$(function () {
    $('main').css('top', '0px');
});

$.ajax({
    url: "php/PhpSession.php",
    method: 'GET',
}).done(function (res) {
    if (res == login) {
        window.location.href = "/LMS/public_html/";
    }
});



// $('#Menu-DB').click(function () {});
$('#Menu-BK').click(function () {
    removeUI('book.html');
});
$('#Menu-BW').click(function () {
    removeUI('borrow.html');
});
$('#Menu-MB').click(function () {
    removeUI('member.html');

});
$('#Menu-ST').click(function () {
    removeUI('setting.html');
});

function removeUI(nextWindow) {
    $('main').css('top', '-750px');
    setTimeout(function () {
        window.location.href = nextWindow;
    }, 650);
}