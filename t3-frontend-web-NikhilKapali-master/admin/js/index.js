$(document).ready(function () {

    var tok = localStorage.getItem('token');
    var email = localStorage.getItem('email');

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
            alert("Welcome" + " " + user.email);
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Mr.' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });
});