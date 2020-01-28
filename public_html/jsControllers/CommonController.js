let login = "index.html";

$(function () {
    if ($(window).width() <= 1000) {
        $('main').css('top', '25px');
    } else {
        $('main').css('top', '0px');
    }
});

$.ajax({
    url: "php/PhpSession.php",
    method: 'GET',
}).done(function (res) {
    if (res == login) {
        window.location.href = "/LMS/public_html/";
    }
});


$('#Menu-DB').click(function () {
    removeUI('dashboard.html');
});

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
    if ($(window).width() <= 1000) {
        footerUpOrDown(true);
        setTimeout(function () {
            $('main').css('top', '-2000px');
            setTimeout(function () {
                window.location.href = nextWindow;
            }, 650);
        }, 700);
    } else {
        $('main').css('top', '-2000px');
        setTimeout(function () {
            window.location.href = nextWindow;
        }, 650);
    }
}

$('#btnUser').click(function () {

    $('#logoutAnimation').css({
        // 'left':'unset',
        // 'right':'0px',
        'width': '100vw',
    });

    setTimeout(function () {
        $.ajax({
            url: 'php/PhpSession.php',
            data: 'session=logout',
        }).done(function (res) {
            if (res == 'index.html') {
                window.location.href = res;
            }
        });
    }, 1000);
});

//================================================


$(window).resize(function () {
    if ($(window).width() <= 1000) {
        // is mobile device
        $('main').css('top', '25px');
    } else {
        $('main').css('top', '0px');
    }

});

let isDown = false;

$('.upDown>i').click(function () {
    if ($(window).width() <= 1000) {
        if (isDown) {
            footerUpOrDown(isDown);
            isDown = false;
        } else {
            footerUpOrDown(isDown);
            isDown = true;
        }
    }
});


function footerUpOrDown(up) {
    if (up) {
        $('footer').css({
            'top': '-420px',
            'border-bottom-left-radius': '0px',
            'border-bottom-right-radius': '0px',
        });

        $('main').css('top', '25px');
        $('.upDown>i').css({
            'transform': 'rotate(180deg)',
            'top': '-20px',
            'text-shadow': '-2px -3px 6px rgba(0, 0, 0, 0.3)',
        });

        var btn = 5;
        let interval = setInterval(function () {
            if (btn > 0) {
                $('footer>div>form>button:nth-child(' + btn + ')').css({
                    'left': '-760px',
                });
                btn--;
            } else {
                btn = 5;
                clearInterval(interval);
            }
        }, 20);
    } else {
        $('footer').css({
            'top': '0px',
            'border-bottom-left-radius': '35px',
            'border-bottom-right-radius': '35px',
        });
        $('.upDown>i').css({
            'transform': 'rotate(0deg)',
            'top': '0px',
            'text-shadow': '2px 3px 6px rgba(0, 0, 0, 0.3)',
        });
        $('main').css('top', '460px');

        var btn = 1;
        let interval = setInterval(function () {
            if (btn < 6) {
                $('footer>div>form>button:nth-child(' + btn + ')').css({
                    'left': '0',
                });
                btn++;
            } else {
                btn = 1;
                clearInterval(interval);
            }
        }, 100);
    }
}