<?php
//会場のポイントを取得する
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

//DB接続情報
mysql_connect("localhost","kin","kin");
mysql_select_db("kif");

//再接続時間
echo 'retry:3000'.PHP_EOL.PHP_EOL;

//カテゴリを出力
$sql="select Category.content as name ,sum(point) as sum ,count(*) as count from Kin ,Category where  category = Category.number group by category";

$rs = mysql_query($sql);

echo 'data:{ "point" : ['.PHP_EOL;

if (mysql_num_rows($rs)) {
    while ($row = mysql_fetch_assoc($rs)) {
    	if($row['name'] == "テスト") continue;
		echo 'data: { "name":"'.$row['name'].'", "sum":"'.$row['sum'].'", "count":"'.$row['count'].'" },'.PHP_EOL;
    } 
}

//調整のため出力
echo 'data: { "name": "0", "sum": "0" ,"count": "0" } ] }'.PHP_EOL.PHP_EOL;

ob_flush();
flush();

?>
