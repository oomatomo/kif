<?php

  if($_SERVER["REQUEST_METHOD"] != "POST"){
    return;
  }
  //文字コードutf-8
  header("Content-Type: text/html; charset=UTF-8");
  parse_str(file_get_contents('php://input'), $_POST);
  $point = $_POST['point'];
  $category = $_POST['category'];

  //DB設定
  mysql_connect("localhost","kin","kin");
  // DBを選択する
  mysql_select_db("kif");

  $sql=sprintf("insert into Kin (point,category) values ('%d','%d')",$point,$category);
  $rs = mysql_query($sql);

?>
