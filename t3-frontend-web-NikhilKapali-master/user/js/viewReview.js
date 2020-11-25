$(document).ready(function () {

    $.getJSON('http://localhost:3000/getReview', function (res) {
        $.each(res, function (index) {
            $('#showReview').append('<div class="col-md-6 box border py-4 ">' + '<div class="box-image p-2">' +
                '<img src="http://localhost:3000/imageProfile/' + res[index].profilePicture + '" width="300" height="200">'
                + '</div>' + '<div class="box-title text-sans-serif text-light text-uppercase">' + '<h3>' + res[index].FirstName + '</h3>'
                + '</div><div class="font-weight-bolder float-right text-danger text-uppercase">'
                + '<font size="3">' + res[index].Email + '</font><br />' + '<font size="3">' + res[index].DateReview + '</font><br/>'
                + '<font size="3">' + res[index].Rating + '</font></div><br/>'
                + '<br/><br/><div class="text-uppercase p-4 font-weight-bolder alert-info">' + '<font size="3">' + res[index].Message + '</font>' + '<br />' + '</div>'
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
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Hi,' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });



});