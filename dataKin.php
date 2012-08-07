<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

mysql_connect("localhost","kin","kin");
mysql_select_db("sse-test");

echo 'retry:1000'.PHP_EOL.PHP_EOL;

$sql="select user,point from kin where time Between (now() - interval 1 second ) And now()";

$rs = mysql_query($sql);
echo 'data:{ "user":['.PHP_EOL;
if (mysql_num_rows($rs)) {
    while ($row = mysql_fetch_assoc($rs)) {
	echo 'data: {"name":"'.$row['user'].'", "point":"'.$row['point'].'"},'.PHP_EOL;
    } 
}
echo 'data: {"name":"","point":""} ],'.PHP_EOL;

$sum=0;
$cnt=0;
$sql="select * from kin ";

$rs = mysql_query($sql);
if (mysql_num_rows($rs)) {
    while ($row = mysql_fetch_assoc($rs)) {
    	$sum += $row['point'];
    	$cnt++;
    } 
}

echo 'data: "sum":'.$sum.' }'.PHP_EOL.PHP_EOL;


ob_flush();
flush();
?>
