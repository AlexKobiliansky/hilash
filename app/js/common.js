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
            $('.adv-item-desc').matchHeight({byRow: true,});
            $('.adv-item-title').matchHeight({byRow: true,});
            $('.step-item').matchHeight({byRow: true,});
            $('.team-item-name').matchHeight({byRow: true,});
            $('.team-item-post').matchHeight({byRow: true,});

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

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

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


    var $pakSelect = $('#calc-paket');
    var $perSelect = $('#calc-period');


        $pakSelect.on('change' , function(e){
            e.stopImmediatePropagation();

            var $val = $(this).val();


            $perSelect.find('option').each(function() {
                var $dataval = $(this).data($val);
                var $databills = $(this).data('bill-' + $val);
                $(this).attr('data-bills', $databills);
                $(this).val($dataval).trigger('refresh');
            });
            var $result = $('#calc-period option:selected').val();
            $('#income-value span').html($result);

            var $bills = $('#calc-period option:selected').attr('data-bills');
            $('#bills-value span').html($bills);
        });

        $perSelect.on('change', function(e){
           e.stopImmediatePropagation();

            var $result = $(this).val();
            $('#income-value span').html($result);

            var $bills = $('#calc-period option:selected').attr('data-bills');
            console.log($bills);
            $('#bills-value span').html($bills);
        });

    /**
     * end CALCULATOR
     */


    $('.gen-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items:1,
        dots: true,
        autoplay: true,
        autoplayTimeout: 8000
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        var t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Заявка отправлена!");

        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });



    $(window).scroll(function() {
        if($(this).scrollTop() > 30) {
            $('.main-head').addClass('sticky')
        } else {
            $('.main-head').removeClass('sticky')
        }
    });

    $(".main-mnu a").mPageScroll2id({
        offset: 20
    });

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    $('.preloader').fadeOut();
});
