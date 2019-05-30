<?php
$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Поле обязательно к заполнению ";
} else {
 $name = htmlspecialchars($_POST["name"]); $name = stripslashes($_POST["name"]); $name = urldecode($_POST["name"]); $name = trim(strip_tags($_POST['name']));
}
// firm
if (empty($_POST["firm"])) {
    $firm = htmlspecialchars($_POST['firm']);
} else {
 $firm = htmlspecialchars($_POST["firm"]); $firm = stripslashes($_POST["firm"]); $firm = urldecode($_POST["firm"]); $firm = trim(strip_tags($_POST['firm']));
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG = "Поле обязательно к заполнению ";
} else {
 $email = htmlspecialchars($_POST["email"]); $email = stripslashes($_POST["email"]); $email = urldecode($_POST["email"]); $email = trim(strip_tags($_POST['email']));
}

// PHONE
if (empty($_POST["phone"])) {
    $errorMSG = "Поле обязательно к заполнению";
} else {
 $phone = htmlspecialchars($_POST["phone"]); $phone = stripslashes($_POST["phone"]); $phone = urldecode($_POST["phone"]); $phone = trim(strip_tags($_POST['phone']));
}

// technol
if (!isset($_POST["technol"])) {
    $errorMSG = "Ошибка";
} else {
 $technol = htmlspecialchars($_POST["technol"]); $technol = stripslashes($_POST["technol"]); $technol = urldecode($_POST["technol"]); $technol = trim(strip_tags($_POST['technol']));
}

// sovet
if (isset($_POST["sovet"])) {
    $sovet = htmlspecialchars($_POST["sovet"]);
    $sovet = stripslashes($_POST["sovet"]);
    $sovet = urldecode($_POST["sovet"]);
    $sovet = trim(strip_tags($_POST['sovet']));    
}else {
    $sovet = "НЕТ";
}
// prezent
if (isset($_POST["prezent"])) {
    $prezent = htmlspecialchars($_POST["prezent"]);
    $prezent = stripslashes($_POST["prezent"]);
    $prezent = urldecode($_POST["prezent"]);
    $prezent = trim(strip_tags($_POST['prezent']));
}else {
    $prezent = "НЕТ";
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG = "Обязательно заполните";
} else {
 $message = htmlspecialchars($_POST["message"]); $message = stripslashes($_POST["message"]); $message =  trim($_POST["message"]); $message = urldecode($_POST["message"]); $message = trim(strip_tags($_POST['message']));
}
$EmailTo = "";
$Subject = "seminar.utsrus.com";

// prepare email body text
$Body ='<html>
    <head><title>'.$Subject.'</title></head>
    <body>
        <p>Имя: '.$name.'</p>
        <p>Организация: '.$firm.'</p>
        <p>Телефон: '.$phone.'</p>
        <p>E-mail: '.$email.'</p>
        <p>Сообщение: '.$message.'</p>
        <p>Технологии: '.$technol.'</p>
        <p>Нужен совет по гостинице: '.$sovet.'</p>
        <p>Презентация своей компании: '.$prezent.'</p>
    </body>
</html>';
    $header = "Content-type: text/html; charset=utf-8 \r\n";
    $header .= "From:".$email."\n\n";
// send email
$success = mail($EmailTo, $Subject, $Body, $header);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Ошибка";
    } else {
        echo $errorMSG;
    }
}

?>