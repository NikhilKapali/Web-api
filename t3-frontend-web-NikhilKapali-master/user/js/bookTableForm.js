$(document).ready(function () {

    var tok = localStorage.getItem('token');
    var FirstName;
    var LastName;
    var Email;
    var UserId;
    var tableImageName;
    //let imageFile='';
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    /// Table creation

    $.getJSON('http://localhost:3000/getTableById/' + id, function (res) {
        console.log(id);
        $('#tableImageName').append(
            '<img class="img-responsive" src="http://localhost:3000/imageTable/' + res.tableImageName + '">'
        );
        $('#tableName').val(res.tableName);
        $('#Category').val(res.Category);
        $('#Price').val(res.Price);

        tableImageName = res.tableImageName;

    });

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

        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    $('#bookTableForm').click(function (e) {
        e.preventDefault();

        var tableName = $("#tableName").val();
        var Category = $("#Category").val();
        var Price = $("#Price").val();
        var FirstName = $("#FirstName").val();
        var LastName = $("#LastName").val();
        var Email = $("#Email").val();
        var Time = $("#Time").val();
        var DateTable = $("#DateTable").val();
        var Message = $("#Message").val();

        var data = {
            UserId: UserId,
            tableImageName: tableImageName,
            tableName: tableName,
            Category: Category,
            Price: Price,
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Time: Time,
            DateTable: DateTable,
            Message: Message
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/bookTable',
            data: data,
            beforeSend: function (xhr) {
                if (tok) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (res, textStatus, xhr) {

                alert("Table Reserved Successfully");
                location.href = "bookTable.html"
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });
        return false;
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