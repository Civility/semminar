'use strict'
$(document).ready(function()  {

      $('.list__btn').on("click", function(){
        var $sss =  $(this).attr("value");
        $('#citySeminar option[value='+$sss+']').prop('selected', true);
      })
      
    $('.checkbox').prop('indeterminate', true);

    $('#agr').change(function() {
        if ($(this).prop('checked') == true) {
            $('#regform button[type="submit"]').prop('disabled', false);
        } else {
            $('#regform button[type="submit"]').prop('disabled', true);
        }
    });

    $("#regform").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
          submitMSG(false, "Вы правильно заполнили форму?");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm(){
        var citySeminar = $("#citySeminar").val(),
            firm = $("#firm").val(),
            occupation = $("#occupation").val(),
            fio = $("#fio").val(),
            phone = $("#phone").val(),
            city = $("#city").val();
        $.ajax({
            type: "POST",
            url: "./assets/send.php",
            data: "fio=" + fio + "&firm=" + firm + "&phone=" + phone + "&occupation=" + occupation + "&citySeminar=" + citySeminar + "&city=" + city,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                } else {
                    submitMSG(false,text);
                }
            }
        });
    }
    function formSuccess(){
        $("#regform")[0].reset();
        submitMSG(true, "Сообщение отправлено!")
    }
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h2 w-100 text-center bg-success text-white text-shadow btn-lg";
        } else {
            var msgClasses = "h2 w-100 text-center bg-danger text-white text-shadow btn-lg";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg).fadeOut(3500);
    }
    $("#regform").submit(function() {
        $.ajax({
          type: "POST",
          url: "./assets/mail.php",
          data: $(this).serialize()
        });
        return false;
      });
})