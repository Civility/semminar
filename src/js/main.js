'use strict'
$(document).ready(function() {
    // что бы правильно работал checkbox
    $('#sovet').on('change', function(){
        this.value = this.checked ? 'да' : 'нет';
     }).change();
     $('#prezent').on('change', function(){
        this.value = this.checked ? 'да' : 'нет';
     }).change();

    $('.checkbox').prop('indeterminate', true);
    //отправка почты
    $('#agr').change(function() {
        if ($(this).prop('checked') == true) {
        $('#contactForm button[type="submit"]').prop('disabled', false);
        } else {
        $('#contactForm button[type="submit"]').prop('disabled', true);
        }
    });
    
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
          submitMSG(false, "Вы правильно заполнили форму?");
        } else {
            event.preventDefault();
            submitForm();
        }
    });
    
    function submitForm(){
        var name = $("#name").val(),
            firm = $("#firm").val(),
            email = $("#email").val(),
            phone = $("#phone").val(),
            message = $("#message").val(),
            technol = $("#technol").val(),
            sovet = $("#sovet").val(),
            prezent = $("#prezent").val();
    
        $.ajax({
            type: "POST",
            url: "./form/send.php",
            data: "name=" + name + "&firm=" + firm + "&phone=" + phone + "&email=" + email + "&technol=" + technol + "&message=" + message + "&sovet=" + sovet + "&prezent=" + prezent,
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
        $("#contactForm")[0].reset();
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
  $("#contactForm").submit(function() {
    $.ajax({
      type: "POST",
      url: "form/mail.php",
      data: $(this).serialize()
    });
    return false;
  });

    
    $('.site a[href^="#"]').click( function(){
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 700);
        }
        return false;
    });


});