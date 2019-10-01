<?php
$message = $HTTP_GET_VARS['mensaje'];
$nombre = $HTTP_GET_VARS['nombre'];

$to      = 'ivanju21@gmail.com';
$subject = 'the subject';
$body = $message.' Atte: '.$nombre;
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $body, $headers);
?> 