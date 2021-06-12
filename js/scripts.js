
var products = {
    'white': {

        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg'
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg'
        }
    },

    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg'
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png'
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
// 1: above 1.000 units - 20% discount
// 2: above 500 units - 12% discount
// 3: above 100 units - 5% discount


// Solution:

$(function () {
    search_params["quantity"] = $("#quantity").val();
    search_params["color"] = "colored";
    search_params["quality"] = "q150";
    search_params['style'] = $('#style option:selected').val();
    var styleText = $('#style option:selected').text(),
        qualityText = $("#quality .selected").text()
        , colorText = $("#color .selected").text();
    console.log(styleText);
    callMe();
    console.log("2");

    $("#quantity").change(function () {
        search_params["quantity"] = $("#quantity").val();
        callMe();
    });

    $("#white").click(function () {
        search_params["color"] = "white";
        colorText = $("#white").text();
        $("#white").addClass("selected");
        $("#colored").removeClass("selected");
        callMe();
    });
    $("#colored").click(function () {
        search_params["color"] = "colored";
        colorText = $("#colored").text();
        $("#colored").addClass("selected");
        $("#white").removeClass("selected");
        callMe();
    });

    $("#q150").click(function () {
        search_params["quality"] = "q150";
        qualityText = $("#q150").text();
        $("#q150").addClass("selected");
        $("#q190").removeClass("selected");
        callMe();
    });
    $("#q190").click(function () {
        search_params["quality"] = "q190";
        qualityText = $("#q190").text();
        $("#q190").addClass("selected");
        $("#q150").removeClass("selected");
        callMe();
    });

    var selectedValue = $('#style').val();
    $("#style").change(function () {
        selectedValue = $("#style option:selected").val();
        styleText = $('#style option:selected').text();
        search_params['style'] = selectedValue;
        callMe();
    });

    function callMe() {
        $(".refresh-loader").show();

        var num, col, qua, st;
        num = search_params["quantity"];
        col = search_params["color"];
        qua = search_params["quality"];
        st = search_params["style"];

        // for image
        //console.log($("#photo-product").attr('src'));
        var url = "img/" + products[col][st]['photo'];
        $("#photo-product").attr('src', url);

        // For order details 
        console.log($("#result-style").html());
        $("#result-style").html(styleText);
        $("#result-quality").html(qualityText);
        $("#result-color").html(colorText);
        $("#result-quantity").html(num);

        calculate(num, col, qua, st);
        setTimeout(function () {
            $(".refresh-loader").hide();
        }, 100);

    }
    function calculate(num, col, qua, st) {
        var unitPrice = products[col][st]['unit_price'];
        if (qua == "q190") {
            unitPrice = 1.12 * unitPrice;
        }
        var discount = 0;
        if (num > 1000) {
            discount = 0.2;
        }
        else if (num > 500) {
            discount = 0.12;
        }
        else if (num > 100) {
            discount = 0.05;
        }
        var total = (num * unitPrice) * (1 - discount);
        total = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
        $("#total-price").text(" " + total);
    }

});










