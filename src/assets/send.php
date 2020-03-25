<?php
$errorMSG = "";

// fio
if (empty($_POST["fio"])) {
    $errorMSG = "Поле обязательно к заполнению ";
} else {
 $fio = test_input($_POST["fio"]);
}

// firm
if (empty($_POST["firm"])) {
    $errorMSG = "Поле обязательно к заполнению";
} else {
 $firm = test_input($_POST["firm"]);
}

//city
if (empty($_POST["city"])) {
    $errorMSG = "Поле обязательно к заполнению";
} else {
 $city = test_input($_POST["city"]);
}
// // EMAIL
// if (empty($_POST["email"])) {
//     $errorMSG = "Поле обязательно к заполнению ";
// } else {
//  $email = htmlspecialchars($_POST["email"]); $email = stripslashes($_POST["email"]); $email = urldecode($_POST["email"]); $email = trim(strip_tags($_POST['email']));
// }

// PHONE
if (empty($_POST["phone"])) {
    $errorMSG = "Поле обязательно к заполнению";
} else {
 $phone = test_input($_POST["phone"]);
}

// occupation
if (!isset($_POST["occupation"])) {
    $errorMSG = "Нужно выбрать";
} else {
 $occupation = test_input($_POST["occupation"]);
}
// citySeminar
if (!isset($_POST["citySeminar"])) {
    $errorMSG = "Нужно выбрать";
} else {
 $citySeminar = test_input($_POST["citySeminar"]);
}
// sovet
// if (isset($_POST["sovet"])) {
//     $sovet = htmlspecialchars($_POST["sovet"]);
//     $sovet = stripslashes($_POST["sovet"]);
//     $sovet = urldecode($_POST["sovet"]);
//     $sovet = trim(strip_tags($_POST['sovet']));    
// }else {
//     $sovet = "НЕТ";
// }
// prezent
// if (isset($_POST["prezent"])) {
//     $prezent = htmlspecialchars($_POST["prezent"]);
//     $prezent = stripslashes($_POST["prezent"]);
//     $prezent = urldecode($_POST["prezent"]);
//     $prezent = trim(strip_tags($_POST['prezent']));
// }else {
//     $prezent = "НЕТ";
// }

// MESSAGE
// if (empty($_POST["message"])) {
//     $errorMSG = "Обязательно заполните";
// } else {
//  $message = htmlspecialchars($_POST["message"]); $message = stripslashes($_POST["message"]); $message =  trim($_POST["message"]); $message = urldecode($_POST["message"]); $message = trim(strip_tags($_POST['message']));
// }
// $cityMail = ($citySeminar == "MSK") ? "natalya.ilyna@utsrus.com" : "pavel.asipkov@utsrus.com";

function test_input($data) {
    $data = trim(strip_tags($data));
    $data = stripslashes($data);
    $data = urldecode($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($citySeminar == "MSK") {
    $cityMail =  "natalya.ilyna@utsrus.com";
} else {
    $cityMail =  "pavel.asipkov@utsrus.com";
}

$EmailTo = $cityMail;
$Subject = "seminar.utsrus.com";

// prepare email body text
$Body ='<html>
    <head><title>'.$Subject.'</title></head>
    <body>
        <p>Город семинара: '.$citySeminar.'</p>
        <p>Компания: '.$firm.'</p>
        <p>Род деятельности: '.$occupation.'</p>
        <p>ФИО: '.$fio.'</p>
        <p>Телефон: '.$phone.'</p>
        <p>Город: '.$city.'</p>
    </body>
</html>';
    $header = "Content-type: text/html; charset=utf-8 \r\n";
    $header .= "From:".$fio."\n\n";
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