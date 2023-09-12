//calculates grand total price of shopping cart
var calcGrandTotalPrice = function() {
    //get each total item price and add to grand total
    var grandTotal = 0;
    $(".totalPrice").each(function(i, element) {
        var price = parseFloat($(element).children("span").text());
        grandTotal += price;
    });

    //inject grand total value into html element
    $("#grandTotal").html("$" + grandTotal.toFixed(2));

}

//updates total prices of all items
var updateTotalPrice = function() {
    //loop through each item's total price
    $(".totalPrice").each(function(i, element) {

        //get price, quantity and new total values
        var itemPrice = parseFloat($(element).siblings(".unitPrice").children("span").text());
        var quantity = parseFloat($(element).siblings(".quantity").children("input").val());
        var newTotal = parseFloat(itemPrice * quantity);

        //remove item if quantity is 0
        if(quantity <= 0) {
            $(this).closest("tr").remove();
        }
        
        //inject new item total into html element
        $(element).children('span').html(newTotal.toFixed(2));
    });
}

//event listener for when DOM is loaded 
$(document).ready(function() {
    //reset quantity input vals to 1
    $(".quantity input").val(1);

    // update item's total price when new quantity inputted
    var timeout;
    $(document).on("input", ".quantity input", function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            updateTotalPrice(this);

            //enable calc grand total button
            $("#calcTotal").removeAttr("disabled");
        }, 1000);
    })

    //calculates grand total on button click
    $(document).on("click", "#calcTotal", function(event) {
        calcGrandTotalPrice();

        //disable calc grand total button
        $("#calcTotal").attr("disabled", "disabled");
    });

    //add item into shopping cart
    $("#addItem").on("submit", function(event) {
        event.preventDefault();

        //get item name and price
        var name = $(this).children("[name=name]").val();
        var unitPrice = $(this).children("[name=unitPrice]").val();

        //remove non-numeric chars from price, convert to float, round to 2nd decimal digit
        unitPrice = parseFloat(unitPrice.replace(/[^\d.]/g, "")).toFixed(2);
        
        //stringified tr element 
        var htmlString = '<tr><td class="name">' + name + '</td><td class="unitPrice">$<span>' + unitPrice + '</span></td><td class="quantity"><input type="number" value="1" class="col-6 col-md-4"><button class="remove btn btn-danger btn-sm ms-3">Remove</button></td><td class="totalPrice">$<span>' + unitPrice + '</span></td></tr>';
        
        if(isNaN(unitPrice)) {
            // show alert if unit price is NaN
            alert("Invalid Price. Please try again.");
        }
        else {
            // or else add tr element to end of tbody element
            $("tbody").append(htmlString);
        }

        
        //clear out input boxes
        $(this).children("[name=name]").val('');
        $(this).children("[name=unitPrice]").val('');

        //enable calc grand total button
        $("#calcTotal").removeAttr("disabled");
    });

    //remove item when button pressed
    $(document).on("click", ".remove", function(event) {
        $(this).closest("tr").remove();

        //enable calc grand total button
        $("#calcTotal").removeAttr("disabled");
    });

});