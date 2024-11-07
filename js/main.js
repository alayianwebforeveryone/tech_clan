


// ===================================================================
// Modern JS for Sublime
// -------------------------------------------------------------------

(function ($) {
    "use strict";

    const cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc' // mailchimp url
    };

    const $WIN = $(window);

    // Add the User Agent to the <html> for IE10 detection
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (typeof Modernizr !== 'undefined' && !Modernizr.svg) {
        $(".header-logo img").attr("src", "images/logo.png");
    }

    /* Preloader */
    const ssPreloader = function () {
        $("html").addClass('ss-preload');

        $WIN.on('load', function () {
            // Force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // Fade out loading animation, then preloader
            $("#loader").fadeOut("slow", function () {
                $("#preloader").delay(300).fadeOut("slow");
            });

            // For hero content animations
            $("html").removeClass('ss-preload').addClass('ss-loaded');
        });
    };

    /* Menu on Scrolldown */
    const ssMenuOnScrolldown = function () {
        const menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function () {
            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            } else {
                menuTrigger.removeClass('opaque');
            }
        });
    };

    /* OffCanvas Menu */
    const ssOffCanvas = function () {
        const menuTrigger = $('.header-menu-toggle');
        const nav = $('.header-nav');
        const closeButton = nav.find('.header-nav__close');
        const siteBody = $('body');
        const mainContents = $('section, footer');

        menuTrigger.on('click', function (e) {
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        siteBody.on('click', function (e) {
            if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
                siteBody.removeClass('menu-is-open');
            }
        });
    };

    /* Masonry */
    const ssMasonryFolio = function () {
        const containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };

    /* photoswipe */
    const ssPhotoswipe = function () {
        const items = [];
        const $pswp = $('.pswp')[0];
        const $folioItems = $('.item-folio');

        // Get items
        $folioItems.each(function (i) {
            const $folio = $(this);
            const $thumbLink = $folio.find('.thumb-link');
            const $title = $folio.find('.item-folio__title');
            const $caption = $folio.find('.item-folio__caption');
            const $titleText = '<h4>' + $.trim($title.html()) + '</h4>';
            const $captionText = $.trim($caption.html());
            const $href = $thumbLink.attr('href');
            const $size = $thumbLink.data('size').split('x');
            const item = {
                src: $href,
                w: $size[0],
                h: $size[1],
                title: $.trim($titleText + $captionText) || ''
            };

            items.push(item);
        });

        // Bind click event
        $folioItems.each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                const options = {
                    index: i,
                    showHideOpacity: true
                };

                const lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });
        });
    };

    /* slick slider */
    const ssSlickSlider = function () {
        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500
        });
    };

    /* Smooth Scrolling */
    const ssSmoothScroll = function () {
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                scrollTop: $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });
    };

    /* Alert Boxes */
    const ssAlertBoxes = function () {
        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });
    };

    /* Animate On Scroll */
    const ssAOS = function () {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };

    /* Initialize */
    (function clInit() {
        ssPreloader();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();
    })();

})(jQuery);






