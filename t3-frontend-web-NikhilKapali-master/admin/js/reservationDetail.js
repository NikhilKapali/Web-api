$(document).ready(function () {
    var tok = localStorage.getItem('token');
    $.getJSON('http://localhost:3000/showReservationList', function (res) {
        $.each(res, function (index) {
            $('#showReservation').append('<tr>' + '<td> ' +
                '<img src="http://localhost:3000/imageTable/' + res[index].tableImageName + '" width="200" height="150">' + '</td>' +
                "<td>" + res[index].tableName + "</td>" + "<td>" + res[index].Category + "</td>"
                + "<td>" + res[index].Email + "</td>" + "<td>" + res[index].FirstName + "</td>"
                + "<td>" + res[index].Time + "</td>" + "<td>" + res[index].DateTable + "</td>"
                + "<td>" + res[index].Message + "</td>" +
                '<td><button id="delete" class="btn btn-lg btn-primary" value="' + res[index]._id
                + '">Delete</button></td>' + '</tr>');
        });

    });


    $('#showReservation').on('click', '#delete', function () {
        alert("Successfully deleted!!")
        location.href = 'reservationDetail.html';
        id = $(this).val();
        //alert(id);
        $.ajax({
            url: 'http://localhost:3000/delete-reservation/' + id,
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
