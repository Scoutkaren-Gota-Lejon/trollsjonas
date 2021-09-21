<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'settings.php';

$mailTo = "boka@gotalejon.org";
$mailHeader = "Trollsjönäs: Bokning från hemsidan";
$mailFrom = "Bokningsförfrågan <no-reply@gotalejon.org>";

if (isset($_POST)) {
  // Takes raw data from the request
  $jsonInput = file_get_contents('php://input');

  // Converts it into a PHP object
  $jsonData = json_decode($jsonInput);

  $message = "Bokningsförfrågan från hemsidan. \r\n \r\n" .
  "Organisation: " . $jsonData->organisation . "\r\n" .
  "Namn: " . $jsonData->name . "\r\n" .
  "E-post: " . $jsonData->email . "\r\n" .
  "Telefon: " . $jsonData->phone . "\r\n" .
  "Datum: " . $jsonData->from . " - " . $jsonData->to . "\r\n" .
  "Antal personer: " . $jsonData->antal . "\r\n" .
  "Hyra kanoter? " . ($jsonData->kanoter ? 'Ja' : '-') . "\r\n" .
  "Övrig info: \r\n " . $jsonData->other . "\r\n";

  $messageHtml = "Bokningsförfrågan från hemsidan. <br><br>" .
  "Organisation: " . $jsonData->organisation . "<br>" .
  "Namn: " . $jsonData->name . "<br>" .
  "E-post: " . $jsonData->email . "<br>" .
  "Telefon: " . $jsonData->phone . "<br>" .
  "Datum: " . $jsonData->from . " - " . $jsonData->to . "<br>" .
  "Antal personer: " . $jsonData->antal . "<br>" .
  "Hyra kanoter? " . ($jsonData->kanoter ? 'Ja' : '-') . "<br><br>" .
  "Övrig info: <br> " . $jsonData->other . "<br>";

  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer(true);

  try {
    //Server settings
    $mail->Encoding = 'base64';
    $mail->SMTPDebug = SMTP::DEBUG_OFF;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = $SMTP_USERNAME;                     // SMTP username
    $mail->Password   = $SMTP_PASSWORD;                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('boka@gotalejon.org', 'Bokningsförfrågan');
    $mail->addAddress($mailTo);               // Name is optional
    $mail->addAddress("gert.andersson68@gmail.com");
    $mail->addAddress("len.sjoberg@telia.com");
    if (!empty($jsonData->email)) {
      $mail->addReplyTo($jsonData->email);
    }

    // Content
    $mail->CharSet = 'UTF-8';
    //$mail->addCustomHeader('Content-Type', 'text/plain;charset=utf-8');
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $mailHeader;
    $mail->Body    = $messageHtml;
    $mail->AltBody = $message;

    $sent = $mail->send();
    $error = "";

  } catch (Exception $e) {
    $error =  "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

    $sent = false;
  }

  $data = array(
    'sent' => $sent,
    'msg' => $error,
  );

  //Convert our data into a JSON string.
  $json = json_encode($data);

  //Set the Content-Type header to application/json.
  header('Content-Type: application/json');

  //Output the JSON string to the browser.
  echo $json;

  return;
}

echo "{}";
