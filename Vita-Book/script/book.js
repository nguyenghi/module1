var book = {} || book;

book.drawTable = function () {
    $.ajax({
        url: "https://vitabookshop.herokuapp.com/books",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbBooks').empty();
            var i = 0;
            $.each(data, function (i, v) {
                $('#tbBooks').append(
                    "<tr>" +
                    "<td>" + v.id + "</td>" +
                    "<td>" + v.bookName + "</td>" +
                    "<td>" + v.writer + "</td>" +

                    "<td><img src='" + v.avatar + "' width='50px' height='60px' /></td>" +
                    "<td>" + v.thePrice + "</td>" +
                    "<td>" + v.introduce + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' title='edit book' onclick='book.get(" + v.id + ")'><i class='fa fa-edit'></i></a> " +
                    "<a href='javascript:;' title='remove book' onclick='book.delete(" + v.id + ")' ><i class='fa fa-trash'></i></a>" +
                    "</td>" +
                    "</tr>"
                );
            }); $("#search").DataTable();
        }
    });
};
book.openModal = function () {
    book.reset();
    $('#addEditBook').modal('show');
}
book.save = function () {
    if ($('#formAddEditBook').valid()) {
        if ($('#id').val() == 0) {
            var bookObj = {};
            bookObj.bookName = $('#BookName').val();
            bookObj.writer = $('#Writer').val();
            bookObj.avatar = $('#Avatar').val();
            bookObj.thePrice = $('#ThePrice').val();
            bookObj.introduce = $('#Introduce').val();
         
            $.ajax({
                url: "https://vitabookshop.herokuapp.com/books",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(bookObj),
                success: function (data) {
                    $('#addEditBook').modal('hide');
                    book.drawTable();
                }
            });
        }
        else {
            var bookObj = {};
            bookObj.bookName = $('#BookName').val();
            bookObj.writer = $('#Writer').val();
            bookObj.avatar = $('#Avatar').val();
            bookObj.introduce = $('#Introduce').val();
            bookObj.thePrice = $('#ThePrice').val();
            bookObj.id = $('#id').val();

            $.ajax({
                url: "https://vitabookshop.herokuapp.com/books/" + bookObj.id,
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(bookObj),
                success: function (data) {
                    $('#addEditBook').modal('hide');
                    book.drawTable();
                }
            });
        }

    }
}; 
book.delete = function (id) {
    bootbox.confirm({
        title: "Remove Book",
        message: "Do you want to remove this book?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                url: "https://vitabookshop.herokuapp.com/books/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function (data) {
                        book.drawTable();
                    }
                });
            }
        }
    });
};

book.get = function (id) {
    $.ajax({
        url: "https://vitabookshop.herokuapp.com/books/" + id,
        
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#BookName').val(data.bookName);
            $('#Writer').val(data.writer);
            $('#Avatar').val(data.avatar);
            $('#Introduce').val(data.introduce);
            $('#ThePrice').val(data.thePrice);
            $('#id').val(data.id);


            var validator = $("#formAddEditBook").validate();
            validator.resetForm();
            $('#addEditBook').modal('show');
        }
    });
};

book.reset = function () {
    $('#BookName').val("");
    $('#Writer').val("");
    $('#Avatar').val('');
    $('#Introduce').val("");
    $('#ThePrice').val("");
    $('#id').val(0);
    var validator = $("#formAddEditBook").validate();
    validator.resetForm();
};





book.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#falseinput').attr('src', e.target.result);
            $('#base').val(e.target.result);
            $('#showAvatar').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
};
book.init = function () {
    book.drawTable();
};

$(document).ready(function () {
    book.init();
});