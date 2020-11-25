$(document).ready(function () {

    var tok = localStorage.getItem('token');

    var UserId;
    var FirstName;
    var LastName;
    var Email;
    var Date;
    var Rating;
    var Message;
    var profilePicture;
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
            $("#FirstName").val(data.firstname);
            $("#LastName").val(data.lastname);
            $("#Email").val(data.email);

            UserId = data._id;
            FirstName = data.FirstName;
            LastName = data.LastName;
            Email = data.Email;
            console.log(UserId);

            $('#profilePicture').append(
                '<img src="http://localhost:3000/imageProfile/' + data.profilePicture + '" width="500" height="400">');

            profilePicture = data.profilePicture;

        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    // dashboard creation
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
            location.href = "../login.html";
        }
    });


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

    $('#reviewForm').click(function (e) {
        e.preventDefault();
        var FirstName = $("#FirstName").val();
        var LastName = $("#LastName").val();
        var Email = $("#Email").val();
        var DateReview = $('#DateReview').val();
        var Message = $("#Message").val();
        var Rating = $("#Rating").val();

        var data = {
            UserId: UserId,
            profilePicture: profilePicture,
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            DateReview: DateReview,
            Message: Message,
            Rating: Rating
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/userReview',
            data: data,
            beforeSend: function (xhr) {
                if (tok) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (res, textStatus, xhr) {
                alert("Review Added Successfully");
                location.href = "viewReview.html"
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });
        return false;
    });
});  