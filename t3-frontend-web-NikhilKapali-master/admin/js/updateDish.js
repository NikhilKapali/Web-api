$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    let imageFile = '';
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
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });
    $.getJSON('http://localhost:3000/getDishById/' + id, function (res) {
        console.log(id);
        $('#dishName').val(res.dishName);
        $('#Category').val(res.Category);
        $('#Price').val(res.Price);
        alert(id);
        $('#showDish').append(
            '<img src="http://localhost:3000/images/' + res.dishImageName + '" width="200" height="150">');

    });

    $('#updateForm').on("submit", function (e) {
        e.preventDefault();
        var dishName = $("#dishName").val();
        var Category = $("#Category").val();
        var Price = $("#Price").val();

        var data = {
            dishImageName: imageFile,
            dishName: dishName,
            Category: Category,
            Price: Price
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/updatingDish/' + id,
            data: data,
            success: function (res, textStatus, xhr) {
                alert(res.message);
                location.href = "viewProduct.html"
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });
        return false;
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
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Mr.' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });
});