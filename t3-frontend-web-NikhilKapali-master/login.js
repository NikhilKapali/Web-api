function validation() {
    var Email = $("#Email").val();
    var Password = $("#Password").val();
    if (Email == "") {
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
    $('#loginUser').click(function (e) {
        e.preventDefault();
        if (validation()) {
            var Email = $("#Email").val();
            var Password = $("#Password").val();
            var data = {
                "Email": Email,
                "Password": Password
            }
            $.ajax({
                type: 'post',
                url: 'http://localhost:3000/userLogin',
                data: data,
                success: function (res, textStatus, xhr) {
                    if (res.token != null) {
                        localStorage.setItem("token", res.token)
                        alert("Logged in Successfully")
                        if (res.user.usertype == "Admin") {
                            location.href = "admin/index.html";
                        }
                        else {
                            location.href = "user/home.html";
                        }

                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                    alert("Login denied");

                }
            });
        }
    });
});  