$(document).ready(function () {

    $.getJSON('http://localhost:3000/getTable', function (res) {
        $.each(res, function (index) {
            $('#showTable').append('<div class="col-md-4 box border py-5 ">' + '<div class="box-image p-2">' +
                '<img src="http://localhost:3000/imageTable/' + res[index].tableImageName + '" width="300" height="200">'
                + '</div>' + '<div class="box-title text-monospace text-success alert-danger">' + '<h3>' + res[index].tableName + '</h3>' + '</div>'
                + '<div class="box-price font-weight-bolder font-italic alert-info">' + '<font size="3">' + res[index].Category + '</font>' + '<br />'
                + '<font size="3">' + res[index].Price + '</font>' + '</div>'
                + '<a class="btn btn-success btn-xs p-2" href ="bookTableForm.html?id=' + res[index]._id
                + '">Book This Table</a></td>'
                + '</div>'

            );
        });

    });
    var tok = localStorage.getItem('token');
    var email = localStorage.getItem('email');

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
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Hi,' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });



});