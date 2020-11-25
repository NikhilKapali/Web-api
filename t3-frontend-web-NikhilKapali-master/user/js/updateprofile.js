$(document).ready(function () {

    var tok = localStorage.getItem('token');
    console.log(tok);
    var id;
    var FirstName;
    var LastName;
    var Address;
    var PhNumber;
    var Email;
    var Usertype;
    var Password;
    let imageFile = '';
    $("#profilePicture").on('change', function () {
        let formData = new FormData();
        let files = $("#profilePicture").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/uploadProfilePicture',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                $('#showImage').append(
                    '<img src="http://localhost:3000/imageProfile/' + imageFile + '" width="200" height="150">'
                );
            },
            error: function () {
                alert("Image upload failed!");

            }
        });
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
            $("#FirstName").val(data.firstname);
            $("#LastName").val(data.lastname);
            $("#Address").val(data.address);
            $("#PhNumber").val(data.phone);
            $("#Email").val(data.email);
            $("#Usertype").val(data.usertype);
            $("#Password").val(data.password);

            profilePicture = imageFile;
            id = data._id;
            FirstName = data.FirstName;
            LastName = data.LastName;
            Address = data.Address;
            PhNumber = data.PhNumber;
            Email = data.Email;
            Usertype = data.Usertype;
            Password = data.Password;

            console.log(id);

            $('#showImage').append(
                '<img src="http://localhost:3000/imageProfile/' + data.profilePicture + '" width="200" height="150">');
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Mr.' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });
    $("#update_profile").click(function (e) {
        e.preventDefault();
        var FirstName = $("#FirstName").val();
        var LastName = $("#LastName").val();
        var Address = $("#Address").val();
        var PhNumber = $("#PhNumber").val();
        var Email = $("#Email").val();
        var Usertype = $("#Usertype").val();
        var Password = $("#Password").val();
        var data = {
            "profilePicture": imageFile,
            "firstname": FirstName,
            "lastname": LastName,
            "address": Address,
            "phone": PhNumber,
            "email": Email,
            "usertype": Usertype,
            "password": Password
        };
        console.log(data);

        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/updateprofile",
            data: data,
            success: function (result) {
                Location.href = "home.html";
                alert(result);

            },
            beforeSend: function (xhr) {
                if (tok) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
        });

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
                location.href = "../login.html";
            }
        });
    });

});