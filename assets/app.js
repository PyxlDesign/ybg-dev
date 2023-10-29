$(document).foundation();


// Sticky Header
window.floatingHeaderLock = false;
$(window).on(
    'scroll',
    function () {
        if ($(window).scrollTop() > 0) {
            $('body').addClass('is-scrolling');
            $('.site-header').addClass('site-header--sticked-top');
        } else {
            $('body').removeClass('is-scrolling');
            $('.site-header').removeClass('site-header--sticked-top');
        }
    }
).on(
    'load',
    function () {
        var $window = $(window);
        $window.on('scroll', function () {
            handleStickyHeader();
        });
        handleStickyHeader();
    }
);
handleStickyHeader();
var headerHeight = $('.site-header').height() + 20;
var lastScrollTop = 0;

function handleStickyHeader() {
    if (window.floatingHeaderLock) {
        return;
    }

    var currentScrollTop = $(window).scrollTop();

    if (currentScrollTop - headerHeight <= 0) {
        $('body').removeClass('is-scrolling-down is-scrolling-up');
    } else if (currentScrollTop > lastScrollTop) {
        $('body').removeClass('is-scrolling-up');
        $('body').addClass('is-scrolling-down');
    } else {
        $('body').removeClass('is-scrolling-down');
        $('body').addClass('is-scrolling-up');
    }

    lastScrollTop = currentScrollTop;
}

function lockFloatingHeader() {
    window.floatingHeaderLock = true;

    setTimeout(function () {
        window.floatingHeaderLock = false;
    }, 3000);
}
// --------------------------------------------------------------------

$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: true
});


$(document).on("click", '.btn-hamburger', function (e) {
    e.preventDefault();
    $('body').addClass('overlay-opened');
});

$(document).on("click", '.navbar-toggler', function (e) {
    e.preventDefault();
    $('body').toggleClass('overflow-stopped');
    $('#site-navigation').toggleClass('show');
    $(this).toggleClass('menu-shown');
});

$(document).on("click", '.close-button', function (e) {
    e.preventDefault();
    $('body').removeClass('overlay-opened');
});

$(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
        $(".site-header").addClass("stuck-top");
        $("body").addClass("fixed-menu");
    } else {
        $(".site-header").removeClass("stuck-top");
        $("body").removeClass("fixed-menu");

    }
});

$('.select-wrapper').each(function () {
    var dropdownParent = $(this);
    $(this).find('.select-picker').select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: dropdownParent,
        width: '100%'
    });
});


$(document).on("click", '.filters-toolbar__toggler', function (e) {
    e.preventDefault();
    $('.filters-toolbar').slideUp();
});

$(window).on(
    'load',
    function () {
        $('.flickity-enabled').flickity('resize');
    }
);
// --------------------------------------------------------------


// Product Quantity
$('.btn-number').click(function (e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});

$('.input-number').focusin(function () {
    $(this).data('oldValue', $(this).val());
});

$('.input-number').change(function () {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr(
            'disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});

$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode >
            105)) {
        e.preventDefault();
    }
});

var $productCarousel = $('.product__cushion-carousel');
$productCarousel.flickity({
    cellAlign: 'left',
    wrapAround: true,
    imagesLoaded: true,
    autoPlay: false,
    pageDots: false,
    prevNextButtons: true,
    adaptiveHeight: true,
});

// $productCarousel.on('settle.flickity', function (event, index) {
//     $productCarousel.flickity('playPlayer');
// });

var $productCarousel_2 = $('.product__placement-carousel');
$productCarousel_2.flickity({
    cellAlign: 'left',
    wrapAround: true,
    imagesLoaded: true,
    autoPlay: false,
    pageDots: false,
    prevNextButtons: true,
    adaptiveHeight: true,
});

// $productCarousel_2.on('settle.flickity', function (event, index) {
//     $productCarousel_2.flickity('playPlayer');
// });

var $productCarousel_3 = $('.product__leg-wraps-carousel');
$productCarousel_3.flickity({
    cellAlign: 'left',
    wrapAround: true,
    imagesLoaded: true,
    autoPlay: false,
    pageDots: false,
    prevNextButtons: true,
    adaptiveHeight: true,
});

// $productCarousel_3.on('settle.flickity', function (event, index) {
//     $productCarousel_3.flickity('playPlayer');
// });

var $productCarousel_4 = $('.product__footrest-carousel');
$productCarousel_4.flickity({
    cellAlign: 'left',
    wrapAround: true,
    autoPlay: false,
    imagesLoaded: true,
    pageDots: false,
    prevNextButtons: true,
    adaptiveHeight: true,
});

// $productCarousel_4.on('settle.flickity', function (event, index) {
//     $productCarousel_4.flickity('playPlayer');
// });

// --------------------------------------------------------------------
__typerAnim = $(".typer-anim");
$.each(__typerAnim, function (indexInArray, valueOfElement) {
    var words = $(this).data('rotate');
    $(this).typer({
        strings: words,
        typeSpeed: 60,
        backspaceSpeed: 80,
        backspaceDelay: 800,
        repeatDelay: 1000,
        repeat: true,
        autoStart: true,
    });
});


var $productShowcaseCarouselNav = $('.product-showcase__carousel__nav .carousel-init');
$productShowcaseCarouselNav.flickity({
    cellAlign: 'center',
    wrapAround: true,
    imagesLoaded: true,
    pageDots: false,
    prevNextButtons: false,
    asNavFor: '.product-showcase__carousel__main .carousel-init',
    draggable: false,
});


var $productShowcaseCarouselMain = $('.product-showcase__carousel__main .carousel-init');
$productShowcaseCarouselMain.flickity({
    cellAlign: 'left',
    wrapAround: true,
    imagesLoaded: true,
    pageDots: false,
    prevNextButtons: false,
    adaptiveHeight: false,
    fade: true,
    selectedAttraction: 0.003,
    friction: 0.15,
    draggable: false,
});

$('a[smooth-scroll]').on('click', function (event) {
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 50
    }, 500);
    event.preventDefault();
});


$('.sidebar-label').on('click', function (e) {
    e.preventDefault();
    $('.sidebar-filter').slideToggle();
    $('.wrapper-overlay').fadeToggle();
});

$('button.close-filter, .btn-apply, .wrapper-overlay').on('click', function (e) {
    e.preventDefault();
    $('.sidebar-filter').slideToggle();
    $('.wrapper-overlay').fadeToggle();
    $('html').removeClass('sidebar-open')
});
