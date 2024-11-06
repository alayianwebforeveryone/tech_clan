


// ===================================================================
// Modern JS for Sublime
// -------------------------------------------------------------------

(function () {
    "use strict";

    const cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    };

    const doc = document.documentElement;
    const WIN = window;

    // Add the User Agent to the <html>
    doc.setAttribute('data-useragent', navigator.userAgent);

    // SVG fallback
    if (!Modernizr.svg) {
        document.querySelector(".header-logo img").setAttribute("src", "images/logo.png");
    }

    /* Preloader */
    const ssPreloader = () => {
        document.documentElement.classList.add('ss-preload');

        window.addEventListener('load', () => {
            // force page scroll position to top at page refresh
            window.scrollTo(0, 0);

            // Fade out the loading animation
            const loader = document.getElementById("loader");
            const preloader = document.getElementById("preloader");

            loader.style.transition = "opacity 0.5s";
            loader.style.opacity = 0;

            setTimeout(() => {
                preloader.style.transition = "opacity 0.5s";
                preloader.style.opacity = 0;
            }, 300);

            // for hero content animations
            document.documentElement.classList.remove('ss-preload');
            document.documentElement.classList.add('ss-loaded');
        });
    };

    /* Menu on Scrolldown */
    const ssMenuOnScrolldown = () => {
        const menuTrigger = document.querySelector('.header-menu-toggle');

        WIN.addEventListener('scroll', () => {
            if (WIN.scrollY > 150) {
                menuTrigger.classList.add('opaque');
            } else {
                menuTrigger.classList.remove('opaque');
            }
        });
    };

    /* OffCanvas Menu */
    const ssOffCanvas = () => {
        const menuTrigger = document.querySelector('.header-menu-toggle');
        const nav = document.querySelector('.header-nav');
        const closeButton = nav.querySelector('.header-nav__close');
        const siteBody = document.body;
        const mainContents = document.querySelectorAll('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            siteBody.classList.toggle('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            menuTrigger.click();
        });

        // close menu by clicking outside the menu
        siteBody.addEventListener('click', (e) => {
            if (!e.target.closest('.header-nav, .header-nav__content, .header-menu-toggle')) {
                siteBody.classList.remove('menu-is-open');
            }
        });
    };

    /* Masonry */
    const ssMasonryFolio = () => {
        const containerBricks = document.querySelector('.masonry');

        if (containerBricks) {
            const imagesLoaded = () => {
                const masonry = new Masonry(containerBricks, {
                    itemSelector: '.masonry__brick',
                    resize: true
                });
            };

            const imgLoader = containerBricks.querySelectorAll('img');
            let loadedCount = 0;
            imgLoader.forEach(img => {
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === imgLoader.length) {
                        imagesLoaded();
                    }
                };
            });
        }
    };

    /* PhotoSwipe */
    const ssPhotoswipe = () => {
        const items = [];
        const pswp = document.querySelector('.pswp');
        const folioItems = document.querySelectorAll('.item-folio');

        folioItems.forEach((folio, i) => {
            const thumbLink = folio.querySelector('.thumb-link');
            const title = folio.querySelector('.item-folio__title');
            const caption = folio.querySelector('.item-folio__caption');
            const href = thumbLink.getAttribute('href');
            const [width, height] = thumbLink.dataset.size.split('x');

            const item = {
                src: href,
                w: parseInt(width),
                h: parseInt(height)
            };

            if (caption) {
                item.title = `<h4>${title.innerHTML}</h4>${caption.innerHTML}`;
            }

            items.push(item);
        });

        folioItems.forEach((folio, i) => {
            folio.addEventListener('click', (e) => {
                e.preventDefault();
                const options = {
                    index: i,
                    showHideOpacity: true
                };
                const lightBox = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });
        });
    };

    /* Slick Slider */
    const ssSlickSlider = () => {
        const testimonialsSlider = document.querySelector('.testimonials__slider');
        if (testimonialsSlider) {
            $(testimonialsSlider).slick({
                arrows: false,
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                pauseOnFocus: false,
                autoplaySpeed: 1500
            });
        }
    };

    /* Smooth Scrolling */
    const ssSmoothScroll = () => {
        const smoothscrollLinks = document.querySelectorAll('.smoothscroll');
        smoothscrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.hash);

                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });

                if (document.body.classList.contains('menu-is-open')) {
                    document.querySelector('.header-menu-toggle').click();
                }

                window.location.hash = link.hash;
            });
        });
    };

    /* Alert Boxes */
    const ssAlertBoxes = () => {
        const alertBoxes = document.querySelectorAll('.alert-box');
        alertBoxes.forEach(alert => {
            const closeBtn = alert.querySelector('.alert-box__close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    alert.style.transition = "opacity 0.5s";
                    alert.style.opacity = 0;
                    setTimeout(() => alert.style.display = 'none', 500);
                });
            }
        });
    };

    /* Animate On Scroll */
    const ssAOS = () => {
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
    const init = () => {
        ssPreloader();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();
    };

    // Initialize all functions
    init();

})();






