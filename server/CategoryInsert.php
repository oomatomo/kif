<?php
  if($_SERVER["REQUEST_METHOD"] != "POST"){
	return;
  }
  //文字コードutf-8
  header("Content-Type: text/html; charset=UTF-8");
  //pear
  require_once('./JSON.php');
  
  $number = $_POST['number'];
  $number = mb_convert_encoding($number,"UTF-8");

  $content = $_POST['content'];
  $content = mb_convert_encoding($content,"UTF-8");
  
  //DB設定  
  mysql_connect("localhost","kin","kin");
  // DBを選択する
  mysql_select_db("kif");

  $sql=sprintf("insert into Category (number,content) values ('%d','%s')",$number,$content);
  $rs = mysql_query($sql);
  
?>
