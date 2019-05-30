<?php
//ручная запись
$message = $_POST['message'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$technol = $_POST['technol'];
$prezent = $_POST['prezent'];
$city = $_POST['city'];
$firm = $_POST['firm'];
$sovet = $_POST['sovet'];
$time = date('Y-m-d H:i:s');
$file = "text/text.txt";
$doc = "\n
$time
Имя: $name 
email: $email
Телефон: $phone
Наименование компании: $firm
Город компании: $city
Технология: $technol
Совет по гостинице: $sovet
Презентация компании: $prezent
Текст сообщения:
$message";
$Saved_File = fopen($file, 'a+');
fwrite($Saved_File, $doc);
fclose($Saved_File);
?>