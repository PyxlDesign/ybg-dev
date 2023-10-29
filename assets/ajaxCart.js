console.log('loaded');
function addItem(form_id) {
    var quantity = parseInt($("span#cart-number").data('count'));
    var data = $('#' + form_id).serialize();
    console.log(quantity);
    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: data,
        success: function () {
            console.log("success");
            addToCartOk(quantity);
            // fetchCart()
        },
        error: function (res) {
            console.log(res);
            $("#cart-number").text(quantity);
        }
    });
}


////////////////////////////////
///cart Drawer implementation///
////////////////////////////////

const defaults = {
    cartDrawer: '#modalShoppingCart',
    cartDrawerContent: '.modal-content__inner',
    cartDrawerClose: '.js-ajax-cart-close',
    cartDrawerTrigger: '.js-ajax-cart-drawer-trigger',
    removeFromCart: '.js-ajax-remove-from-cart',
    cartWrapper: '.cart-wrapper',
    cartCounter: 'span[data-cart-count]',
    cartSubtotal: '.drawer-subtotal-price',
    cartQtyInput: '.cartdrawer_input_qty',
    min_btn: '.cartdrawer_min_btn',
    pls_btn: '.cartdrawer_pls_btn',
    cart_btn: '.btn_cart',
    body: 'body'
    // checkoutButton: '.js-ajax-checkout-button'
}
const cartDrawer = document.querySelector(defaults.cartDrawer);
const cartDrawerContent = document.querySelector(defaults.cartDrawerContent);
const cartDrawerClose = document.querySelector(defaults.cartDrawerClose);
const cartDrawerTrigger = document.querySelector(defaults.cartDrawerTrigger);
const cartWrapper = document.querySelector(defaults.cartWrapper);
let removeFromCart = document.querySelectorAll(defaults.removeFromCart);
let min_btn = document.querySelectorAll(defaults.min_btn);
let pls_btn = document.querySelectorAll(defaults.pls_btn);
// const checkoutButton = document.querySelector(defaults.checkoutButton);
const htmlSelector = document.documentElement;
const cartCounter = document.querySelector(defaults.cartCounter);
const cartSubtotal = document.querySelector(defaults.cartSubtotal);
let cartQtyInput = document.querySelectorAll(defaults.cartQtyInput);
const cart_btn = document.querySelector(defaults.cart_btn);
const body = document.querySelector(defaults.body);
function fetchCart() {
    $.ajax({
        type: 'GET',
        url: '/cart.js',
        dataType: 'json',
        success: function (cart) {
            // onCartUpdate(cart);
            console.log(cart);
            if (cart.item_count === 0) {
                cartWrapper.innerHTML = '<h3 class="py-5 text-center">Cart is empty</h3>';
                cartCounter.classList.add('d-none');
                cartSubtotal.innerHTML = Shopify.formatMoney(cart.original_total_price);
                cart_btn.classList.add('disabled');
                // checkoutButton.classList.add('is-hidden');
            } else {
                cartCounter.classList.remove('d-none');
                cart_btn.classList.remove('disabled');
                renderCart(cart);
                cartSubtotal.innerHTML = Shopify.formatMoney(cart.items_subtotal_price);
                // checkoutButton.classList.remove('is-hidden');
            }
            // cartCounter.innerHTML= cart.item_count;
            cartCounter.innerHTML = cart.item_count;
        },
    });
}

function changeItem(line, quantity, callback) {
    // const quantity = 0;
    $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: 'quantity=' + quantity + '&line=' + line,
        dataType: 'json',
        success: function (cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                onCartUpdate(cart);
                removeProductFromCart();
                fetchCart();
            }
        },
    });
}

function onCartUpdate(cart) {
    console.log('items in the cart?', cart.item_count);
}

function addToCartOk() {
    // cartModalContent.innerHTML = product.title + ' was added to the cart!';s
    cartCounter.innerHTML = Number(cartCounter.innerHTML) + 1;
    $(document).find('.cart-link span.badge').removeClass('d-none').show();
    fetchCart();
    openAddModal();
    // openCartOverlay();

}

function removeProductFromCart() {
    cartCounter.innerHTML = Number(cartCounter.innerHTML) - 1;
}

function addToCartFail() {
    cartModalContent.innerHTML = 'The product you are trying to add is out of stock.';
    openAddModal();
    // openCartOverlay();
}

function renderCart(cart) {

    console.log(cart);

    clearCartDrawer();

    cart.items.forEach(function (item, index) {
        console.log(item);
        let hidden = ""
        if (item.product_type == "Seminar") {
            hidden = "visually-hidden"
        }
        //console.log(item.title);
        //console.log(item.image);
        //console.log(item.line_price);
        //console.log(item.quantity);
        const productImage = '<div class="cart-product"><a class="d-block h-100" href="' + item.url + '"><img src="' + item.image + '" alt="" class="product-img image-fill"></a></div>';
        const productTitle = '<a href="' + item.url + '"><p class="copy-sm"><strong>' + item.title + '</strong></p></a>';
        const minus_btn = '<button type="button" class="cartdrawer_min_btn btn-number btn btn-outline-secondary" data-type="minus" data-field="updates[]"><span class="btn-action-minus"><svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.6H0V0H12V1.6Z" fill="currentColor"></path></svg></span></button>';
        const qty_input = '<input id="updates_large_' + item.key + '" class="cart__qty-input cartdrawer_input_qty input-number mx-1" type="number" name="updates[]" value="' + item.quantity + '" min="0" max="1000" pattern="[0-9]*" data-quantity-input data-quantity-item="' + index + '" data-quantity-input-desktop data-role="">';
        const plus_btn = '<button type="button" class="cartdrawer_pls_btn btn-number btn btn-outline-secondary" data-type="plus" data-field="updates[]"><span class="btn-action-plus"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714Z" fill="currentColor"></path></svg></span></button>';
        const productPrice = '<span class="font-bold price">' + Shopify.formatMoney(item.line_price) + '</span>';
        const qty_block = '<div class="product-quantity-block ' + hidden + '"><div class="input-group mb-0">' + minus_btn + qty_input + plus_btn + '</div>' + productPrice + '</div>';
        const product_meta = '<div class="product-meta">' + productTitle + qty_block + '</div>';
        const product_card = '<div class="product-item flex-center">' + productImage + product_meta + '</div>';
        // const productQuantity = '<div class="ajax-cart-item__quantity">' + item.quantity + '</div>';
        const remove_btn = '<a href="javascript:void(0)" class="btn-close js-ajax-remove-from-cart"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M8.83394 7.67678L14.6464 13.4893L13.4893 14.6464L7.67678 8.83394L7.5 8.65716L7.32322 8.83394L1.51071 14.6464L0.353554 13.4893L6.16606 7.67678L6.34284 7.5L6.16606 7.32322L0.353553 1.51071L1.51071 0.353553L7.32322 6.16606L7.5 6.34284L7.67678 6.16606L13.4893 0.353554L14.6464 1.51071L8.83394 7.32322L8.65716 7.5L8.83394 7.67678Z" stroke="white" stroke-width="0.5"></path></svg></a>';
        // const productRemove = '<div class="ajax-cart-item__remove ' + defaults.removeFromCartNoDot + '"></div>';

        const concatProductInfo = '<div class="cart-block border-bottom" data-line="' + Number(index + 1) + '">' + remove_btn + product_card + '</div>';

        cartWrapper.innerHTML = cartWrapper.innerHTML + concatProductInfo;

    });

    // document.querySelectorAll('.js-ajax-remove-from-cart')
    //     .forEach((element) => {
    //         element.addEventListener('click', function() {
    //             const lineID = this.parentNode.getAttribute('data-line');
    //             console.log('aa');
    //         });
    //     });

    removeFromCart = document.querySelectorAll(defaults.removeFromCart);
    for (let i = 0; i < removeFromCart.length; i++) {
        removeFromCart[i].addEventListener('click', function () {
            const line = this.parentNode.getAttribute('data-line');
            var quantity = 0;
            console.log(line);
            changeItem(line, quantity);
        });
    }
    cartQtyInput = document.querySelectorAll(defaults.cartQtyInput);
    for (let i = 0; i < cartQtyInput.length; i++) {
        cartQtyInput[i].addEventListener('change', function () {
            const line = $(this).parents('.cart-block').data('line');
            var quantity = parseInt(this.value);
            // console.log(line);
            changeItem(line, quantity);
            // cartCounter.innerHTML = quantity;
        })
    }
    min_btn = document.querySelectorAll(defaults.min_btn);
    for (let i = 0; i < min_btn.length; i++) {
        min_btn[i].addEventListener("click", function () {
            let qty_input = this.nextElementSibling;
            let value = qty_input.value;
            // let drawer_count = Number(cartCounter.innerHTML);
            qty_input.value = value - 1;
            qty_input.dispatchEvent(new Event('change'));
            let cart_val = value;
            // setTimeout(function(){
            //     cartCounter.innerHTML = drawer_count  - 1;
            // }, 300);

        })
    }
    pls_btn = document.querySelectorAll(defaults.pls_btn);
    for (let i = 0; i < pls_btn.length; i++) {
        pls_btn[i].addEventListener("click", function () {
            let qty_input = this.previousElementSibling;
            let value = parseInt(qty_input.value);
            // let drawer_count = Number(cartCounter.innerHTML);
            qty_input.value = value + 1;
            qty_input.dispatchEvent(new Event('change'));
            $('#cart-number').text('');
            let cart_val = 1 + value;
            // setTimeout(function(){
            //     cartCounter.innerHTML = drawer_count + 1;
            // }, 300);
        })
    }
}

// function openCartDrawer() {
//     cartDrawer.classList.add('is-open');
// }

// function closeCartDrawer() {
//     cartDrawer.classList.remove('is-open');
// }

function clearCartDrawer() {
    cartWrapper.innerHTML = '';
}

function openAddModal() {
    cartModal = $(document).find('#modalShoppingCart');
    // $(defaults.cartDrawerTrigger).trigger('click');
    // $('#offCanvasShoppingCart').foundation('open');
    cartModal.modal('show');
}

function closeAddModal() {
    cartModal = document.querySelector('#modalShoppingCart');
    body.classList.remove('modal-open');
    cartModal.classList.remove('show');
}

// function openCartOverlay() {
//     cartOverlay.classList.add('is-open');
//     htmlSelector.classList.add('is-locked');
// }

// function closeCartOverlay() {
//     cartOverlay.classList.remove('is-open');
//     htmlSelector.classList.remove('is-locked');
// }

// cartDrawerClose.addEventListener('click', function() {
//     closeAddModal();
//     // closeCartOverlay();
// });

// cartDrawerClose.addEventListener('click', function() {
//     closeCartDrawer();
//     closeCartOverlay();
// });
// cart is empty stanje
// cartOverlay.addEventListener('click', function() {
//     closeAddModal();
//     closeCartDrawer();
//     closeCartOverlay();
// });

// cartDrawerTrigger.addEventListener('click', function(event) {
//     event.preventDefault();
//     //fetchCart();
//     openCartDrawer();
//     openCartOverlay();
// });

// document.addEventListener('DOMContentLoaded', function() {
//     fetchCart();
// });

$(window).on("load", function () {
    fetchCart();
})
/////////////////////////
//////End Ajax Cart//////
/////////////////////////



function addItemToCart(variant_id, qty) {
    // console.log(variant_id, qty + " ++++++++++++++++++++++++++++");
    let quantity = qty;
    var data = {
        "id": variant_id,
        "quantity": qty,
    };

    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // console.log(quantity);
            addToCartOk(quantity);
        })
        .catch(function (error) {
            console.error(error);
        });
}