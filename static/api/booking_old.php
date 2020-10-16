<?php

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
  "Datum: " . $jsonData->from . " - " . $jsonData->to . "\r\n\r\n" .
  "Övrig info: \r\n " . $jsonData->other . "\r\n";

  $headers = 'From: ' . $mailFrom;

  /*if (!empty($jsonData->email)) {
    $headers .= '\r\nReply-To: ' . $jsonData->email;
  }*/

  $sent = mail($mailTo, $mailHeader, $message, $headers);

  $data = array(
    'sent' => $sent
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
