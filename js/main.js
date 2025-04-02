let mouseOverElement = document.querySelectorAll('.feature__card__web');
let line = document.getElementById("line");

mouseOverElement.forEach(item => {
    item.addEventListener('mouseover', function (event) {
        const mouseX = event.clientX;
        let width = window.innerWidth;
        line.style.width = width - mouseX + "px";
        // line.style.left = mouseX + "px";
    });
});

// ----------------------------------------------------------------
(function ($) {
    $.fn.rotator = function (options) {
        const settings = $.extend(
            {
                targetTag: "div",
                activeClass: "rotator__slide--active",
                userClassName: "",
                slideClass: "rotator__slide-",
                autoSwitch: true,
                autoSwitchSpeed: 5000,
                pauseOnHover: true,
                addProperty: function () { }
            },
            options
        );

        let _timer = null;

        const _rotator = this,
            slides = _rotator.find(`> ${settings.targetTag}`),
            _length = slides.length;

        const _methods = {
            addId: function ($target, $index) {
                $target
                    .data("id", $index)
                    .attr("class", settings.userClassName)
                    .addClass(`${settings.slideClass}${$index}`);

                $index === 0 && $target.addClass(settings.activeClass);
                settings.addProperty.call($target, _length);
            },
            onStart: function () {
                slides.each(function (i) {
                    const _this = $(this),
                        _index = _this.index();

                    _methods.addId(_this, _index);
                });
            },
            actionSwitch: function () {
                slides.on("click", function () {
                    const _this = $(this);

                    if (!_this.hasClass(settings.activeClass)) {
                        let start = 0;

                        _methods.addId(_this, start);

                        _methods.switchOnNext(_this, start);
                        _methods.switchOnPrev(_this, _length);
                    }
                });
            },
            switchOnNext: function ($target, $startVal) {
                $target.nextAll().each(function () {
                    const _this = $(this);
                    $startVal++;

                    _methods.addId(_this, $startVal);
                });
            },
            switchOnPrev: function ($target) {
                $target.prevAll().each(function (i) {
                    const _this = $(this);
                    let _num = Math.abs(i - _length + 1);

                    _methods.addId(_this, _num);
                });
            },
            autoSwitch: function () {
                slides.each(function () {
                    const _this = $(this);
                    let switchId = _this.data("id") - 1;
                    if (switchId < 0) {
                        switchId = Math.abs(_length + switchId);
                    }

                    _methods.addId(_this, switchId);
                });
            },
            autoSwitchInit: () => {
                _timer = setTimeout(function tick() {
                    _methods.autoSwitch();

                    _timer = setTimeout(tick, settings.autoSwitchSpeed);
                }, settings.autoSwitchSpeed);
            }
        };

        _methods.onStart();
        _methods.actionSwitch();

        if (settings.autoSwitch) {
            _methods.autoSwitchInit();
        }

        if (settings.pauseOnHover && settings.autoSwitch) {
            _rotator.on("mouseenter", function () {
                clearTimeout(_timer);
            });
            _rotator.on("mouseleave", function () {
                _methods.autoSwitchInit();
            });
        }
    }; //.fn end
})(jQuery);

$("[data-rotator]").rotator({
    // autoSwitch: false,
    addProperty: function (length) {
        const slide = this,
            id = slide.data("id"),
            zIndex = length - id;

        slide.css({ "z-index": zIndex });
        id >= 2 && slide.addClass("rotator__slide-common");
    }
});

// -------------------------------------------------------------------------
$(document).ready(function () {
    $('.popup__youtube').magnificPopup({
        type: 'iframe'
    });
});
// -----------------------------------------------------------------------

// IOS detection
function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform) ||
        (navigator.userAgent.includes("Mac OS"))
}


$(document).ready(function () {
    if (iOS()) {
        document.getElementById("hero_btn").href = "https://apps.apple.com/app/unibit11/id6504040040";
        document.getElementById("nav_btn").href = "https://apps.apple.com/app/unibit11/id6504040040";
        document.getElementById("nav_btn_footer").href = "https://apps.apple.com/app/unibit11/id6504040040";
        document.getElementById("nav-platform-logo").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-apple" viewBox="0 0 16 16"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" /><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" /></svg>';
        document.getElementById("nav-platform-logo_footer").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-apple" viewBox="0 0 16 16"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" /><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" /></svg>';
        document.getElementById("nav-platform-name").innerHTML = "IOS App";
        document.getElementById("nav-platform-name-footer").innerHTML = "IOS App";
    }
});

//   send app link
function sendAppLink() {
    var mobileNum = document.getElementById("mobile_num").value;
    if (mobileNum.length != 10) {
        alert("Please Enter Valid Mobile Number");
    } else {
        var params = {
            mobile: mobileNum
        }
        var postData = JSON.stringify(params);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                jsonData = JSON.parse(xhr.responseText);
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) { }
            }
        }
        xhr.open("POST", 'https://ludo-app.ludopro.co/url-send-fn', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById('success_msg').style.display = 'block';
                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }
        xhr.send(postData);
    }
}

var form = document.getElementById("myForm");

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);


// Footer CTA Section
footerDownload = document.getElementById("cta");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        footerDownload.style.bottom = 0;
    } else if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) {
        footerDownload.style.bottom = '-100%';
    } else {
        footerDownload.style.bottom = '-100%';
    }
}

function detectMobile() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

$(".install_video").on('click', function () {
    location.href = "https://unibit.live/download/index.php";
    if (detectMobile() && !iOS()) {
        $('#install-video-play-modal').modal('show');
        let video = document.getElementById("myVideo");
        video.play();
    }
});

$('.close-modal').click(function () {
    $('#install-video-play-modal').modal('hide');
    let video = document.getElementById("myVideo");
    video.pause();
    video.currentTime = 0;
});
