<?php

  if($_SERVER["REQUEST_METHOD"] != "POST"){
	return;
  }
  //文字コードutf-8
  header("Content-Type: text/html; charset=UTF-8");
  //pear
  require_once('./JSON.php');
  
  $point = $_POST['point'];
  $point = mb_convert_encoding($point,"UTF-8");

  $category = $_POST['category'];
  $category = mb_convert_encoding($category,"UTF-8");
  
  //DB設定  
  mysql_connect("localhost","kin","kin");
  // DBを選択する
  mysql_select_db("kif");

  $sql=sprintf("insert into Kin (point,category) values ('%d','%d')",$point,$category);
  $rs = mysql_query($sql);

?>
