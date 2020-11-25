function validation() {
    var dishName = $("#dishName").val();
    var Category = $("#Category").val();
    var Price = $("#Price").val();
    if (dishName == "") {
        alert("The Name of Dish is empty!! Please fill out the FORM");
        $('#dishName').focus();
        return false;
    }
    else if (Category == "") {
        alert("Category of Dish is empty!! Please fill out the FORM");
        $('#Category').focus();
        return false;
    }
    else if (Price == "") {
        alert("Price of Dish is empty!! Please fill out the FORM");
        $('#Price').focus();
        return false;
    }
    else {
        return true;
    }
}
$(document).ready(function () {
    let imageFile = '';
    var tok = localStorage.getItem('token');
    $("#dishImageName").on('change', function () {
        let formData = new FormData();
        let files = $("#dishImageName").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/uploadDishImage',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                $('#showImage').append(
                    '<img src="http://localhost:3000/images/' + imageFile + '" width="200" height="150">'
                );
            },
            error: function () {
                alert("Image upload failed!");

            }
        });
    });


    $('#AddDish').click(function (e) {
        e.preventDefault();
        if (validation()) {
            var dishName = $("#dishName").val();
            var Category = $("#Category").val();
            var Price = $("#Price").val();
            var data = {
                'dishImageName': imageFile,
                'dishName': dishName,
                'Category': Category,
                'Price': "Rs." + " " + Price
            };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/addDish',
                data: data,
                success: function (res, textStatus, xhr) {
                    alert("New Dish Added to the Menu Successfully");
                    location.href = "productAdd.html";
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                    console.log('Error in Operation');
                }
            });
        }
    });

    /// Loging out
    $("#logout").click(function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/users/logout',
            beforeSend: function (xhr) {
                if (tok) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (data) {
                location.href = "../login.html";

            },

            error: function () {
                //alert("Sorry, you are not logged in.");
                location.href = "../login.html";
            }
        });
    });

    /// user session creation
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/users/me',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (user) {
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Hi,' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });
});  
