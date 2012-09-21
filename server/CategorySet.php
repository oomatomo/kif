<?php

  //セッション変数を変更する
  if($_SERVER["REQUEST_METHOD"] != "POST"){
	return;
  }
  //文字コードutf-8
  header("Content-Type: text/html; charset=UTF-8");
  //pear
  require_once('./JSON.php');
  //送信されたデータGET
  $content = $_POST['content'];
  $content = mb_convert_encoding($content,"UTF-8");
    
  session_start();
  $_SESSION["category"] = $content;
  
?>