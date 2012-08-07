<?php

  if($_SERVER["REQUEST_METHOD"] != "POST"){
	return;
  }
  //文字コードutf-8
  header("Content-Type: text/html; charset=UTF-8");
  //pear
  require_once('./JSON.php');
  $user = $_POST['user'];
  $user = mb_convert_encoding($user,"EUC-JP","UTF-8");
  
  $point = $_POST['point'];
  $point = mb_convert_encoding($point,"EUC-JP","UTF-8");
  
  //DB設定  
  mysql_connect("localhost","root","root");

  // DBを選択する
  mysql_select_db("sse-test");

  $sql=sprintf("insert into kin (user,point) values ('%s','%d')",$user,$point);
  $rs = mysql_query($sql);

?>
