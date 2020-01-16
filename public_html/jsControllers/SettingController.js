

$('#btnRegAuthor').click(function () {
    let formData=$('#formAuthor').serialize();
    $.ajax({
        url:"php/PhpSetting.php",
        method:"POST",
        data:formData+"&btnAuthor=Register"
    }).done(function (res) {
        console.log(res+" ========= "+res===1);
    });
});

$('#btnRegPub').click(function () {
    let formData=$('#formPublisher').serialize();
    $.ajax({
        url:"php/PhpSetting.php",
        method:"POST",
        data:formData+"&btnPublisher=Register"
    }).done(function (res) {
        console.log(res+" ========= "+res===1);
    });
});