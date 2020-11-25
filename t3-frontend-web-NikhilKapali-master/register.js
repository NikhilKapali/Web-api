function validation() {
    var FirstName = $("#FirstName").val();
    var LastName = $("#LastName").val();
    var Address = $("#Address").val();
    var PhNumber = $("#PhNumber").val();
    var Email = $("#Email").val();
    var Usertype = $("#Usertype").val();
    var Password = $("#Password").val();
    if (FirstName == "") {
        alert("Nmae Field is empty!! Please fill out the FORM");
        $('#FirsrtName').focus();
        return false;
    }
    else if (LastName == "") {
        alert("Name Field is empty!! Please fill out the FORM");
        $('#LastName').focus();
        return false;
    }
    else if (Address == "") {
        alert("Address Field is empty!! Please fill out the FORM");
        $('#Address').focus();
        return false;
    }
    else if (PhNumber == "") {
        alert("Number Field is empty!! Please fill out the FORM");
        $('#PhNumber').focus();
        return false;
    }
    else if (Email == "") {
        alert("Email is empty!! Please fill out the FORM");
        $('#Email').focus();
        return false;
    }
    else if (Password == "") {
        alert("Password is empty!! Please fill out the FORM");
        $('#Password').focus();
        return false;
    }
    else {
        return true;
    }

}
$(document).ready(function () {
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
    $('#RegisterUser').on("click", function (e) {
        e.preventDefault();
        if (validation()) {
            var FirstName = $("#FirstName").val();
            var LastName = $("#LastName").val();
            var Address = $("#Address").val();
            var PhNumber = $("#PhNumber").val();
            var Email = $("#Email").val();
            var Usertype = $("#Usertype").val();
            var Password = $("#Password").val();
            var data = {
                "profilePicture": imageFile,
                "FirstName": FirstName,
                "LastName": LastName,
                "Address": Address,
                "PhNumber": PhNumber,
                "Email": Email,
                "Usertype": Usertype,
                "Password": Password
            };
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/userUpload',
                data: data,
                success: function (res, textStatus, xhr) {
                    alert("Registered Successfully");
                    location.href = "login.html";
                    console.log('abc');
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                    console.log('Error in Operation');
                }
            });
        }
    });
});