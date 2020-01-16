
let login="index.html";

$.ajax({
    url:"php/PhpSession.php",
    method:'GET',
}).done(function (res) {
    if(res==login){
        window.location.href = login;
    }
});



// $('#Menu-DB').click(function () {});
$('#Menu-BK').click(function () {
    window.location.href = "book.html";
});
$('#Menu-BW').click(function () {
    window.location.href = "borrow.html";
});
$('#Menu-MB').click(function () {
    window.location.href = "member.html";
});
$('#Menu-ST').click(function () {
    window.location.href = "setting.html";
});