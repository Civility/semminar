<?php
//ручная запись
$firm  = $fio = $phone  = $city = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$firm = test_input($_POST['firm']);
$fio = test_input($_POST['fio']);
$phone = test_input($_POST['phone']);
$city = test_input($_POST['city']);
$citySeminar = test_input($_POST['citySeminar']);
$occupation = test_input($_POST['occupation']);
}
$time = date('Y-m-d H:i:s');
$file = "text/text.txt";
$cityMail = ($citySeminar = "MSK") ? "natalya.ilyna@utsrus.com" : "pavel.asipkov@utsrus.com";
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$Saved_File = fopen($file, 'a+');

if (empty($firm) ||  empty($fio) || empty($phone) || empty($city) ) {
    $firm = (empty($firm)) ? "ОШИБКА" : $firm;
    $fio = (empty($fio)) ? "ОШИБКА" : $fio;
    $phone = (empty($phone)) ?  "ОШИБКА" : $phone;
    $city = (empty($city)) ?  "ОШИБКА" : $city;
    $occupation = (empty($occupation)) ?  "ОШИБКА" : $occupation;
    $citySeminar = (empty($citySeminar)) ?  "ОШИБКА" : $citySeminar;
    $doc = "\n
    $time
    ФИО: $fio
    Телефон: $phone
    Название компании: $firm
    Город компании: $city
    Род деятельности: $occupation
    Города Семинара: $citySeminar
    Почта : $cityMail
    ";
    fwrite($Saved_File, $doc);
} else {
    if (!empty($firm) && !empty($fio) && !empty($phone) && !empty($city) ){
        $doc = "\n
        $time
        ФИО: $fio
        Телефон: $phone
        Название компании: $firm
        Город компании: $city
        Род деятельности: $occupation
        Города Семинара: $citySeminar
        Почта : $cityMail
        ";
        fwrite($Saved_File, $doc);
    }
}
fclose($Saved_File);

?>