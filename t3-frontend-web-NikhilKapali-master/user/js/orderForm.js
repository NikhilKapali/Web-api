$(document).ready(function () {

    var tok = localStorage.getItem('token');
    var email = localStorage.getItem('email');
    var FirstName;
    var LastName;
    var Email;
    var Address;
    var UserId;
    var dishImageName;
    var urlParams = new URLSearchParams(window.location.search);
    let imageFile = '';
    var id = urlParams.get("id");


    $.getJSON('http://localhost:3000/getDishById/' + id, function (res) {
        console.log(id);
        $('#dishImageName').append(
            '<img class="img-responsive" src="http://localhost:3000/images/' + res.dishImageName + '" width = "550px" height = "450px">'
        );
        $('#dishName').val(res.dishName);
        $('#Category').val(res.Category);
        $('#Price').val(res.Price);

        dishImageName = res.dishImageName;

    });

    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/users/me',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            $('#ID_user').val(data._id);
            $("#FirstName").val(data.firstname + " " + data.lastname);
            $("#Email").val(data.email);
            $("#Address").val(data.address);

            UserId = data._id;
            FirstName = data.FirstName;
            LastName = data.LastName;
            Email = data.Email;
            Address = data.Address;
            console.log(UserId);

        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    // for logging out  
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

    /// dashboard creation
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

    $('#orderFoodForm').on("submit", function (e) {
        e.preventDefault();
        var dishName = $("#dishName").val();
        var Category = $("#Category").val();
        var Price = $("#Price").val();
        var FirstName = $("#FirstName").val();
        //var LastName = $("#LastName").val();
        var Email = $("#Email").val();
        var Address = $("#Address").val();
        var Message = $("#Message").val();
        var Payment = $("#Payment").val();

        var data = {
            UserId: UserId,
            dishImageName: dishImageName,
            dishName: dishName,
            Category: Category,
            Price: Price,
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Address: Address,
            Message: Message,
            Payment: Payment
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/orderFood',
            data: data,
            beforeSend: function (xhr) {
                if (tok) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (res, textStatus, xhr) {
                alert("Food Ordered Successfully");
                location.href = "menu.html"
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });
        return false;
    });



});  