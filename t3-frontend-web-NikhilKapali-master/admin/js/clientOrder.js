$(document).ready(function () {
    var tok = localStorage.getItem('token');
    $.getJSON('http://localhost:3000/showOrderList', function (res) {
        $.each(res, function (index) {
            $('#showOrder').append('<tr>' + '<td> ' +
                '<img src="http://localhost:3000/images/' + res[index].dishImageName + '" width="200" height="150">' + '</td>' +
                "<td>" + res[index].dishName + "</td>" + "<td>" + res[index].Category + "</td>"
                + "<td>" + res[index].Price + "</td>" + "<td>" + res[index].FirstName + "</td>"
                + "<td>" + res[index].Address + "</td>" + "<td>" + res[index].Payment + "</td>"
                + "<td>" + res[index].Message + "</td>" +
                '<td><button id="delete" class="btn btn-lg btn-primary" value="' + res[index]._id
                + '">Delete</button></td>' + '</tr>');
        });

    });


    $('#showOrder').on('click', '#delete', function () {
        alert("Successfully deleted!!")
        location.href = 'clientOrder.html';
        id = $(this).val();
        $.ajax({
            url: 'http://localhost:3000/delete-order/' + id,
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
