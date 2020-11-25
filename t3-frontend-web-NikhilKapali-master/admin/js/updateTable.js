$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    var tok = localStorage.getItem('token');
    let imageFile = '';
    $("#tableImageName").on('change', function () {
        let formData = new FormData();
        let files = $("#tableImageName").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/uploadTableImage',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });

    $.getJSON('http://localhost:3000/getTableById/' + id, function (res) {
        console.log(id);
        $('#tableName').val(res.tableName);
        $('#Category').val(res.Category);
        $('#Price').val(res.Price);
        alert(id);
        $('#showTable').append(
            '<img src="http://localhost:3000/imageTable/' + res.tableImageName + '" width="200" height="150">');


    });

    $('#updateTableForm').on("submit", function (e) {
        e.preventDefault();
        var tableName = $("#tableName").val();
        var Category = $("#Category").val();
        var Price = $("#Price").val();

        var data = {
            tableImageName: imageFile,
            tableName: tableName,
            Category: Category,
            Price: Price
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/updatingTable/' + id,
            data: data,
            success: function (res, textStatus, xhr) {
                alert(res.message);
                location.href = "tableDetail.html"
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });
        return false;
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
            $('#username').append('<div class="text-bold text-success p-2"' + '<li>' + 'Mr.' + user.firstname + '</li>' + '</div>');
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            location.href = "../login.html";
        }
    });
});		
