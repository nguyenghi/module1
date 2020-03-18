var home = {} || home;
var slideIndex = 0;

home.load = function () {
    $.ajax({
        url: "https://vitabookshop.herokuapp.com/books",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#main').empty();
            $.each(data, function (index, value) {
                $('#main').append(
                    '<div class="col-lg-4 col-md-6 mb-4">' +
                    '<div class="card h-100">' +
                    '<img class="card-img-top" src="' + value.avatar + '" alt="' + value.bookName + '">' +
                    '<div class="card-body">' +
                    '<h4 class="card-title">' + '<a href="#">' + value.bookName + '</a>' + '</h4>' +

                    '<h5>' + value.writer + '</h5>' +
                    '<h3 >' + value.thePrice + '</h3>' +
                    '<p class="card-text">' + value.introduce + '</p>' +
                    '</div>' +
                    '<div class="card-footer">' +
                    '<button type="button" class="btn btn-outline-info">Thêm vào giỏ hàng</button>'+'<br>'+
                    '<small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>'+
                                
                            '</div>' +
                    '</div>' +
                    '</div>');
            });
        }
    });
}

home.init = function () {
    home.load();
}

$(document).ready(function () {
    home.init();
});
var bookSearch = $('.search-nav');
var searchClose = $('.search-close');

    bookSearch.on('click', function () {
        $('search').toggleClass('search-wrapper-on');
    });

    searchClose.on('click', function () {
        $('search').removeClass('search-wrapper-on');
    });