<?php
//会場のポイントを取得する
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

//DB接続情報
mysql_connect("localhost","kin","kin");
mysql_select_db("kif");

session_start();
$current = $_SESSION["category"];

//再接続時間
echo 'retry:1000'.PHP_EOL.PHP_EOL;

//合計得点
$sum=0;
$count=0;
$sql="select category ,sum(point) as sum ,count(*) as count from Kin where category =".$current." group by category;";

$rs = mysql_query($sql);
if (mysql_num_rows($rs)) {
  while ($row = mysql_fetch_assoc($rs)) {
    $sum = $row['sum'];
    $count = $row['count'];
  }
}

echo 'data:{ "sum":'.$sum.',"cnt":'.$count.' }'.PHP_EOL.PHP_EOL;

ob_flush();
flush();

?>
