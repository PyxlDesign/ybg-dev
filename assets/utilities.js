function ajax_boughtTogether(array) {
    var quantity = parseInt($("#cart-number").text());
    Shopify.queue = [];
    if (array.length > 1) {
        var newArray = array.split(',');
    } else {
        var newArray = array;
    }

    for (var i = 0; i < newArray.length; i++) {
        product = newArray[i].trim();
        Shopify.queue.push({
            variantId: product,
        });
    }
    Shopify.moveAlong = function () {
        // If we still have requests in the queue, let's process the next one.
        if (Shopify.queue.length) {
            var request = Shopify.queue.shift();
            var data = 'id=' + request.variantId + '&quantity=1'
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                dataType: 'json',
                data: data,
                success: function () {
                    Shopify.moveAlong();
                    quantity += 1;
                },
                error: function (err) {
                    console.log(err.responseText);
                    // if it's not last one Move Along else update the cart number with the current quantity
                    if (Shopify.queue.length) {
                        Shopify.moveAlong()
                    } else {
                        // console.log("replace");
                        addToCartOk(quantity);
                        // $('#cart-number').replaceWith("<a href="/cart" id="cart-number">View cart (" + quantity + ")</a>")
                    }
                }
            });
        }
        // If the queue is empty, we add 1 to cart
        else {
            addToCartOk(quantity);
            // document.querySelector('.btn-bundle__products').disabled = true;
        }
    };
    Shopify.moveAlong();
}


$('.expiring-soon input').on('change', function () {
    let _value = $(this).val();
    location.replace(_value);
});

//Mega menu
$(function () {
    var mega_menus = $("ul[class*='mega-menu']");
    var menu_head = $("ul.dropdown.menu>li");
    mega_menus.each(function (index) {
        var mega_menu = $(this);
        var handle = mega_menu.data('rel');
        for (var i = 0; i < menu_head.length; i++) {
            var rel_handle = menu_head.eq(i).data('dropdown-rel');
            if (handle == rel_handle) {
                menu_head.children('ul').eq(i).children().remove();
                menu_head.children('ul').eq(i).append(mega_menu.children('div.mega-menu-content'));
            }
        }
    })
});

$('body').on('change', '#mat-colorPicker', function () {
    $('.svg-fillColor').css('color', 'rgba(' + this.value + ')');
    $('.shadow-image').removeClass('d-none');
    console.log('color', this.value);
    let color_name = $(this).children("option:selected").text();
    console.log(color_name);

    if (color_name == "Confetti On Sand") {
        $('.Confetti-Layer').removeClass('d-none');
    }
    else {
        $('.Confetti-Layer').addClass('d-none');
    }
    if (color_name == "Beach Glass Terrazzo") {
        $('.Terrazzo_BeachGlass_Layer').removeClass('d-none');
    }
    else {
        $('.Terrazzo_BeachGlass_Layer').addClass('d-none');
    }
    if (color_name == "Rainbow Sprinkles") {
        $('.Sprinkle-layer').removeClass('d-none');
    }
    else {
        $('.Sprinkle-layer').addClass('d-none');
    }
    if (color_name == "Terrazzo on Jade") {
        $('.Terrazzo_Jade_Layer').removeClass('d-none');
    }
    else {
        $('.Terrazzo_Jade_Layer').addClass('d-none');
    }
    if (color_name == "Terrazzo on Milk") {
        $('.Terrazzo_milk_Layer ').removeClass('d-none');
    }
    else {
        $('.Terrazzo_milk_Layer ').addClass('d-none');
    }
    if (color_name == "Terrazzo on Seafoam") {
        $('.Terrazzo_seafoam_Layer ').removeClass('d-none');
    }
    else {
        $('.Terrazzo_seafoam_Layer ').addClass('d-none');
    }
    if (color_name == "Terrazzo on Midnight") {
        $('.Terrazzo_Midnight_Layer ').removeClass('d-none');
    }
    else {
        $('.Terrazzo_Midnight_Layer ').addClass('d-none');
    }
    if (color_name == "Terrazzo on Stone") {
        $('.Terrazzo_Stone_Layer').removeClass('d-none');
    }
    else {
        $('.Terrazzo_Stone_Layer').addClass('d-none');
    }
    if (color_name == "Brown Speckle") {
        $('.Speckle_Brown').removeClass('d-none');
    }
    else {
        $('.Speckle_Brown').addClass('d-none');
    }

    if (!triggeredMatChange) {
        let checked_colors = $('[data-type=Color]:checked');
        console.log('colors', checked_colors);
        checked_colors.prop('checked', false);

        let themes = $('[data-type=Themes]:checked');
        console.log('themes', themes);
        themes.prop('checked', false);

        let additional = $('[data-type="Additional Filter Options"]:checked');
        console.log('additional', additional);
        additional.prop('checked', false);

        console.log('changed', $('.sidebar-filter .filterInput').first());
        $('.sidebar-filter .filterInput').first().trigger('change');
    }
    triggeredMatChange = false;
});
// $(".color-filter .filterInput").on("change", function() {
//     let _val = $(this).val();
//     // $('#mat-colorPicker').val(_val).trigger('change');
// });
// $("#add-selected-mat").on("click", function () {
//     let _value = $("#prview_color").text();
//     let _product = parseInt($(this).data('product'));
//     if (_value.length) {
//         console.log(_product);
//         if ($(this).prop('checked') == false) {
//             console.log("I am false checked");
//             //I am checked
//             // console.log($("#prview_color").text());
//             $(this).val("None");
//             if ($(this).data('product') > 0) {

//                 // removeProduct(_product);
//                 addProduct(_product);
//             }
//         } else {
//             //I'm not checked
//             this.value = _value;
//             // console.log(this.value);
//             if ($(this).data('product') > 0) {
//                 console.log("this is selected product" + " +++++++++" + _product);
//                 addProduct(_product);
//             }
//         }
//     }
// });

let selectedMat = document.getElementById("add-selected-mat");
if (selectedMat) {
    selectedMat.addEventListener('click', function (event) {
        let _product = event.target.getAttribute('data-product');
        addProduct(_product);
        selectedMatColor();
    })
}


function removeProduct(_product) {
    console.log(_product);
    $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: {
            quantity: 0,
            id: _product
        },
        dataType: 'json',
        success: function (data) {
            //   $('#CartCount span:first').text(data.quantity);
            console.log(data.quantity);

        }
    });
}

function addProduct(_product) {
    console.log(_product);
    console.log("clciked");

    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: {
            quantity: 1,
            id: _product
        },
        dataType: 'json',
        success: function (data) {
            //   $('#CartCount span:first').text(data.quantity);
            let form_id = data.id;
            console.log(data.quantity + "------------------");
            addItemToCart(form_id, 0)

        }
    });
}
$('.product-colors__choice__control input[name="productColorChoice"]').on('change', function () {
    // console.log($(this).val());
    $('.shadow-image').removeClass('d-none');
    let color_name = $(this).data('name'),
        product;
    console.log(color_name);
    if (color_name == "Confetti On Sand") {
        $('.Confetti-Layer').removeClass('d-none');
    }
    else {
        $('.Confetti-Layer').addClass('d-none');
    }
    if (color_name == "Beach Glass Terrazzo") {
        $('.Terrazzo_BeachGlass_Layer').removeClass('d-none');
    }
    else {
        $('.Terrazzo_BeachGlass_Layer').addClass('d-none');
    }
    if (color_name == "Rainbow Sprinkles") {
        $('.Sprinkle-layer').removeClass('d-none');
    }
    else {
        $('.Sprinkle-layer').addClass('d-none');
    }
    if (color_name == "Terrazzo on Jade") {
        $('.Terrazzo_Jade_Layer').removeClass('d-none');
    }
    else {
        $('.Terrazzo_Jade_Layer').addClass('d-none');
    }
    if (color_name == "Terrazzo on Milk") {
        $('.Terrazzo_milk_Layer ').removeClass('d-none');
    }
    else {
        $('.Terrazzo_milk_Layer ').addClass('d-none');
    }
    if (color_name == "Terrazzo on Seafoam") {
        $('.Terrazzo_seafoam_Layer ').removeClass('d-none');
    }
    else {
        $('.Terrazzo_seafoam_Layer ').addClass('d-none');
    }
    if (color_name == "Terrazzo on Midnight") {
        $('.Terrazzo_Midnight_Layer ').removeClass('d-none');
    }
    else {
        $('.Terrazzo_Midnight_Layer ').addClass('d-none');
    }
    if (color_name == "Terrazzo on Stone") {
        $('.Terrazzo_Stone_Layer').removeClass('d-none');
    }
    else {
        $('.Terrazzo_Stone_Layer').addClass('d-none');
    }
    if (color_name == "Brown Speckle") {
        $('.Speckle_Brown').removeClass('d-none');
    }
    else {
        $('.Speckle_Brown').addClass('d-none');
    }
    let color_handle = $(this).data('color-handle');
    $('.svg-fillColor').css('color', 'rgba(' + $(this).val() + ')');
    $("#prview_color").text(color_name);
    $(document).find('.line-item-property__field').removeClass('d-none');
    let products = placemats.products.split(',');
    console.log(products);
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        // console.log(element)
        if (element.indexOf(color_handle) > -1) {
            product = element;
        }
    }
    if (product.length > 0) {
        if ($("#add-selected-mat").prop("checked") == true) {
            $("#add-selected-mat").prop('checked', false).attr('checked', false).trigger('change');
        }
        jQuery.getJSON('/products/' + product + '.js', function (product) {
            let selected_variant = product.variants[0];
            let img_url = product.images[0];
            let _pId = product.variants[0].id;
            let _price = Shopify.formatMoney(product.price);
            let img_el = $(document).find('.placemat_img img');
            let placemat_price = $(document).find('#placemat_price');
            $("#add-selected-mat").attr('data-product', _pId);
            if (selected_variant.available == false) {
                $("#add-selected-mat").prop("disabled", true);
                $("label[for='add-selected-mat']").text('Sold out')
                    .addClass('disabled');
            } else {
                $("#add-selected-mat").prop("disabled", false);
                $("label[for='add-selected-mat']").text('Add This')
                    .removeClass('disabled');
                $("label[for='add-selected-mat']").css("background-color", "#315d7c");
            }
            placemat_price.text("( " + _price + " )");
            img_el.attr('src', img_url);
        });
    }
});

var triggeredMatChange = false;
$('.color-filter .filterInput').on('change', function () {
    let _value = $(this).data('rgb');
    let colorSelector = $(document).find('#mat-colorPicker');
    let colorSelector_options = colorSelector.find('option');
    $.each(colorSelector_options, function () {
        let _option = $(this);
        if (_option.val() == _value) {
            _option.prop('selected', true);
            triggeredMatChange = true;
            colorSelector.trigger('change');
        }
    })
})