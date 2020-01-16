
const nextPage="borrow.html";
$('#btnLogin').click(function () {
    login();
});

$('#txtUsername').on('keypress',function (e) {
    if (e.keyCode == 13) {
        $('#txtPassword').focus();
    }
});

$('#txtPassword').on('keypress',function (e) {
    if(e.keyCode==13){
        login();
    }
});

function login() {
    $('#txtPassword').css({
        "border":"",
        "box-shadow":"",
    });
    $('#txtUsername').css({
        "border":"",
        "box-shadow":"",
    });
    let formData=$('#LoginForm').serialize();
    $.ajax({
        method:"POST",
        url:"php/PhpLogin.php",
        data:formData,
    }).done(function (response) {
        if(response===nextPage){
            window.location=nextPage;
        }else if(response==="password error"){
            $('#txtPassword').css({
                "border":"2px solid #FF006E",
                "box-shadow":"0px 0px 6px rgba(255, 0, 110, 0.47)",
            });
            setTimeout(function () {
                $('#txtPassword').css({
                    "border":"",
                    "box-shadow":"",
                });
            },3000);
            $('#txtPassword').focus();
        }else {
            $('#txtUsername').css({
                "border":"2px solid #FF006E",
                "box-shadow":"0px 0px 6px rgba(255, 0, 110, 0.47)",
            });
            setTimeout(function () {
                $('#txtUsername').css({
                    "border":"",
                    "box-shadow":"",
                });
            },3000);
            $('#txtUsername').focus();
        }
    });
}