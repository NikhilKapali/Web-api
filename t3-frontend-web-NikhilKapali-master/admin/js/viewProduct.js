$(document).ready(function () {
    var tok = localStorage.getItem('token');
    $.getJSON('http://localhost:3000/getMenu', function (res) {
        $.each(res, function (index) {
            $('#showDish').append('<tr>' + '<td><span>' +
                '<img src="http://localhost:3000/images/' + res[index].dishImageName + '" width="200" height="150">' + '</span></td>' +
                "<td><span>" + res[index].dishName + "</span></td>" + "<td><span>" + res[index].Category + "</span></td>"
                + "<td><span>" + res[index].Price + "</span></td>"

                + '<td><span><button id="delete" class="btn btn-lg btn-primary" value="' + res[index]._id
                + '">Delete</button></span></td>' +
                '<td><span><a class="btn btn-lg btn-primary" href ="updateDish.html?id=' + res[index]._id
                + '">Update</a></span></td>' + '</tr>');
        });

    });


    $('#showDish').on('click', '#delete', function () {
        alert("Successfully deleted!!")
        location.href = 'viewProduct.html';
        id = $(this).val();
        $.ajax({
            url: 'http://localhost:3000/delete-dish/' + id,
            type: 'DELETE',
            dataType: 'json',
            data: id,
            success: function (data, textStatus, xhr) {
                console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
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
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Hi,' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });

});