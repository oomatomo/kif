<?php
//会場のポイントを取得する
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

//DB接続情報
mysql_connect("localhost","kin","kin");
mysql_select_db("kif");

//再接続時間
echo 'retry:1000'.PHP_EOL.PHP_EOL;

//カテゴリを出力
#session_start();
#$current = $_SESSION["category"];

#echo 'data:{ "category":'.$current.',"user":['.PHP_EOL;

/*登録したユーザの取得
$sql="select user,point from Kin where time Between (now() - interval 1 second ) And now() and category =".$current;

$rs = mysql_query($sql);

if (mysql_num_rows($rs)) {
    while ($row = mysql_fetch_assoc($rs)) {
	echo 'data: {"name":"'.$row['user'].'", "point":"'.$row['point'].'"},'.PHP_EOL;
    } 
}
*/
//調整のため出力
#echo 'data: {"name":"","point":""} ],'.PHP_EOL;

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
