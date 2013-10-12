<?php

  //セッション変数を変更する
  if($_SERVER["REQUEST_METHOD"] != "POST"){
    return;
  }
  //文字コードutf-8
  header("Content-Type: text/html; charset=UTF-8");
  parse_str(file_get_contents('php://input'), $_POST);
  //送信されたデータGET
  $content = $_POST['content'];
  session_start();
  $_SESSION["category"] = $content;
?>
