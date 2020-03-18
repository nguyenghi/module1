var user = {} || user;

user.login = function(){
    if($('.form-signin').valid()){
        let email = $('#inputEmail').val();
        let pass = $('#inputPassword').val();
        let author = false;
        $.ajax({
            url: "https://vitabookshop.herokuapp.com/user",

            method : 'GET',
            dataType : 'json',
            success : function(data){
                $.each(data, function(index, value){
                    if(value.email == email && value.password == pass){
                        window.location.href = "../data.html";
                        author = true;
                    }
                });
                if(!author){
                    $('#error-msg').removeClass('d-none');
                }
            }
        });
    }
}

user.init = function(){
}

$(document).ready(function(){
    
});

$(document).on({
    ajaxStart: function () {
        $(".loader").show();
    },
    ajaxStop: function () {
        $(".loader").hide();
    },
    ajaxError: function () {
        $(".loader").hide();
    }
});