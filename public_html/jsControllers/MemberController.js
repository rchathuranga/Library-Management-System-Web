$(window).on('load', function () {
    var month=new Date().getMonth()+1;
    var date=new Date().getDate();
    var year=new Date().getFullYear();
    $('#div-card>div>:nth-child(2)').text(date+"-0"+month);

    loadAllMembers();

    setTimeout(function () {
        $('#listMem').css('padding-top','10px');
    },600)
});


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
        setCardClickEvent();
    });
}

function newMemberList(mem) {
    $('#listMem').append("<div tabindex=\"0\">\n" +
        "<div> M00" + mem[0] + "</div>\n" +
        "<h2>" + mem[1] + "</h2>\n" +
        "<h4>" + mem[6] + "</h4>\n" +
        "<h3>" + mem[7] + "</h3>\n" +
        "<h5>days</h5>\n" +
        "<div>\n" +
        "<h3>" + mem[2] + "</h3>\n" +
        "<h4>" + mem[3] + "</h4>\n" +
        "</div>\n" +
        "</div>");
}

$("#btnRegister").click(function () {
    let formdata = $('#formMem').serialize();

    if($('#btnRegister').text()=="Register") {
        $.ajax({
            url: "php/PhpMember.php",
            method: "POST",
            data: formdata + "&btnMem=Register"
        }).done(function (res) {
            if (res == 1) {
                loadAllMembers();
                alert("Done");
            } else {
                alert("Fail");
            }
        });
    }else if($('#btnRegister').text()=="Modify") {
        $.ajax({
            url: "php/PhpMember.php",
            method: "POST",
            data: formdata + "&memId=" + selectedMemberArray[0] + "&btnMem=Modify"
        }).done(function (res) {
            if (res == 1) {
                loadAllMembers();
                alert("Done");
            } else {
                alert("Fail");
            }
        });
    }

});


let selectedMemberArray;

function btnOperation() {
    $("#btnRegister").text('Modify');
    $('#btnDelete').css('display','inline');
}

function setCardClickEvent() {
    $('#listMem').children().click(function () {
        $('#listMem').children().css({
            'border-color': 'white'
        });

        var id=$($(this).children()[0]).text();
        $(this).css({
            'border': '2px solid #6c63ff'
        });
        searchMem(id);
        btnOperation();
    });
}


function searchMem(id) {
    var realId=id.split("M")[1];
    $.ajax({
        url: "php/PhpMember.php",
        method: "POST",
        data:"memId="+realId+"&btnMem=Search",
        dataType: "json"
    }).done(function (response) {
        selectedMemberArray=response[0];
        setMemToText();
    });
}

function setMemToText() {
    $('#txtMemName').val(selectedMemberArray[1]);
    $('#txtMemName').focus();
    $('#txtMemAddress').val(selectedMemberArray[3]);
    $('#txtMemContact').val(selectedMemberArray[2]);
    $('#txtMemNIC').val(selectedMemberArray[6]);

    var reg_date=new Date(selectedMemberArray[4]).getDate();
    var reg_month=new Date(selectedMemberArray[4]).getMonth()+1;

    var exp_date=new Date(selectedMemberArray[5]).getDate();
    var exp_month=new Date(selectedMemberArray[5]).getMonth()+1;

    $('#div-card>:nth-child(1)>:nth-child(2)').text(reg_date+"-0"+reg_month);
    $('#div-card>:nth-child(2)>:nth-child(2)').text(exp_date+"-0"+exp_month);
}

$('#txtMemName').on('keypress',function (e) {
    console.log(e.keyCode);
    if(e.keyCode===13){
        if($('#txtMemName').val()===""){
            clearAll();
        }
    }
});

function clearAll() {
    $('#txtMemName').val("");
    $('#txtMemAddress').val("");
    $('#txtMemContact').val("");
    $('#txtMemNIC').val("");

    $("#btnRegister").text('Register');
    $('#btnDelete').css('display','none');
    selectedMemberArray=undefined;
    $('#listMem').children().css({
        'border-color': 'white'
    });

    var month=new Date().getMonth()+1;
    var date=new Date().getDate();
    var year=new Date().getFullYear();
    $('#div-card>div>:nth-child(2)').text(date+"-0"+month);
}

$('#btnDelete').click(function () {
    $.ajax({
        url:"php/PhpMember.php",
        method:"POST",
        data:"memId="+selectedMemberArray[0]+"&btnMem=Delete"
    }).done(function (res) {
        if (res == 1) {
            loadAllMembers();
            clearAll();
            alert("Done");
        } else {
            alert("Fail");
        }
    })

});