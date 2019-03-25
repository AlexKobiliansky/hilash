$(function() {

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            // "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('.parallax-window').parallax({
        bleed: '50'
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    function heightses() {
        if ($(window).width()>480) {
            $('.num-item-val').height('auto').equalHeights();
            $('.who-item-desc').height('auto').equalHeights();
            $('.who-item-title').height('auto').equalHeights();
            $('.why-item').height('auto').equalHeights();
        }

        if ($(window).width()>991) {
            $('.var-item-title').height('auto').equalHeights();
            $('.var-item-desc').height('auto').equalHeights();
            $('.var-item').height('auto').equalHeights();
        }

    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    /**
     * ANIMATE-NUMBER functionality
     */
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
    $('.num-item-val span').each(function(){
        var th = $(this);
        var number = th.data('num');
        th.waypoint(function(){
                th.animateNumber({ number: number, numberStep: comma_separator_number_step }, 2000);
                this.destroy();
            }
            , {
                offset: "80%"
            }
        );
    });
    /**
     * end ANIMATE-NUMBER functionality
     */

    $('.calc-select').styler({
        selectPlaceholder: "",
    });


    /**
     * CALCULATOR
     */
        $('.calc-select').on('change' , function(e){
            e.stopImmediatePropagation();

            var result = $('#calc-paket').val()*$('#calc-population').val()*$('#calc-period').val();

            $('.income-value span').html(result);

        });


    /**
     * end CALCULATOR
     */

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
