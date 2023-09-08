//calculates grand total price of shopping cart
var calcGrandTotalPrice = function() {
    // var totalPrices = [];
    var grandTotal = 0;
    $(".totalPrice").each(function(i, element) {
        var price = parseFloat($(element).find("span").text());
        grandTotal += price;
        // totalPrices.push(price);
    })

    $("#grandTotal").html("$" + grandTotal + ".00");

}

//updates total prices of all items
var updateTotalPrice = function() {
    $(".totalPrice").each(function(i, element) {
        var itemPrice = parseFloat($(element).siblings(".unitPrice").children("span").text());
        var quantity = parseFloat($(element).siblings(".quantity").children("input").val());
        var newTotal = parseInt(itemPrice * quantity);
        $(element).children('span').html(newTotal);
    });

}


$(document).ready(function() {

    // update item's total price when new quantity inputted
    var timeout;
    $(document).on("input", ".quantity input", function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            updateTotalPrice(this);
        }, 1000);
    })

    //calculates grand total on button click
    $(document).on("click", "#calcTotal", function(event) {
        calcGrandTotalPrice();
    });

    calcGrandTotalPrice();
})