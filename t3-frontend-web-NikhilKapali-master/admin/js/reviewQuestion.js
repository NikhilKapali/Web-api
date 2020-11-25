$(document).ready(function () {

    $.getJSON('http://localhost:3000/getReview', function (res) {
        $.each(res, function (index) {
            $('#showReview').append('<tr>' + '<td> ' +
                '<img src="http://localhost:3000/imageProfile/' + res[index].profilePicture + '" width="200" height="150">' + '</td>' +
                "<td>" + res[index].FirstName + "</td>" + "<td>" + res[index].LastName + "</td>"
                + "<td>" + res[index].Email + "</td>" + "<td>" + res[index].DateReview + "</td>"
                + "<td>" + res[index].Message + "</td>" + "<td>" + res[index].Rating + "</td>" +
                '<td><button id="delete" class="btn btn-lg btn-primary" value="' + res[index]._id
                + '">Delete</button></td>' + '</tr>'

            );
        });

    });

    $('#showReview').on('click', '#delete', function () {
        alert("Successfully deleted!!")
        location.href = 'reviewQuestion.html';
        id = $(this).val();
        //alert(id);
        $.ajax({
            url: 'http://localhost:3000/delete-review/' + id,
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
