

var products=[];
var price_total = [];
let bundle_blocks = $(document).find('.choose-block');
let product__cushion = $(document).find('.carousel-cell').not('.disabled');
let bundle_cart__btn = $(document).find('#bundle-add-to-cart');
let price_elm = $('.customize-product-block .price');
$(function () {
    $('.carousel-cell').tooltip({trigger:'hover'})
  })

product__cushion.on('click', function(){
    products=[];
    price_total = [];
    // console.log($(this).data('product-handle'));
    let product_cell = $(this);
    $(this).siblings('.carousel-cell').removeClass('active').addClass('in-active');
    product_cell.removeClass('in-active').addClass('active');
    let product_handle = product_cell.data('product-handle');
    let price_span = product_cell.parents('.choose-block').find('.price');
    jQuery.getJSON('/products/'+ product_handle +'.js', function(product) { 
        let price = Shopify.formatMoney(product.variants[0].price);
        product_cell.parents('.choose-block').attr('data-selected', product.variants[0].id ).attr('data-price', product.variants[0].price );
        // console.log(product_cell.parents('.choose-block'));
        price_span.empty().html("+" + price);
        
    } )
    .done(function() {
        
        // products.push(product_cell.parents('.choose-block').data('selected'));
        // price_total.push(product_cell.parents('.choose-block').data('price'));
        for (let index = 0; index < bundle_blocks.length; index++) {
            var element = bundle_blocks.eq(index);
            let block_product = element.attr('data-selected');
            let block_price = element.attr('data-price');
            products.push(block_product);
            price_total.push(block_price);
        }
        // $('.choose-block').each(function(){
        //     let block_product = $(this).data('selected');
        //     let block_price = $(this).data('price');
        //     if (block_product || block_price) {
        //         console.log(block_product);
        //         products.push(block_product);
        //         price_total.push(block_price);
        //     }
        // })
        let _products = products.filter(function(v){return v!==''});
        let _price_total = price_total.filter(function(v){return v!==''});

        let total_price = 0;
        for (let index = 0; index < _price_total.length; index++) {
            total_price = total_price + parseInt(_price_total[index]);
        }
        total_price = Shopify.formatMoney(total_price);
        price_elm.empty().html(total_price);
        bundle_cart__btn.attr('data-products', _products);
        // console.log(products);
    })
    .fail(function() {
    console.log( "error" );
    });
});
$('#cushion-insert').on('click', function(){
    let product = [];
    product.push($(this).data('id').toString());
    // console.log(product);
    ajax_boughtTogether(product);
})
bundle_cart__btn.on('click', function(){
    let products = $(this).attr('data-products');
    console.log(products);
    ajax_boughtTogether(products);
})


