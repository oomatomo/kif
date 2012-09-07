<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

mysql_connect("localhost","kin","kin");
mysql_select_db("kif");

echo 'retry:1000'.PHP_EOL.PHP_EOL;

$current =1;
$sql = "select number from Current order by id desc limit 1";
$rs = mysql_query($sql);
if (mysql_num_rows($rs)) {
   	while ($row = mysql_fetch_assoc($rs)) {
   	$current= $row['number'];	
	} 
}

$sql="select user,point from Kin where time Between (now() - interval 1 second ) And now() and category =".$current;

$rs = mysql_query($sql);
echo 'data:{ "category":'.$current.',"user":['.PHP_EOL;

if (mysql_num_rows($rs)) {
    while ($row = mysql_fetch_assoc($rs)) {
	echo 'data: {"name":"'.$row['user'].'", "point":"'.$row['point'].'"},'.PHP_EOL;
    } 
}

echo 'data: {"name":"","point":""} ],'.PHP_EOL;

$sum=0;

$count=0;
$sql="select * from Kin where category =".$current;

$rs = mysql_query($sql);
if (mysql_num_rows($rs)) {
    while ($row = mysql_fetch_assoc($rs)) {
    	$sum += $row['point'];
    	$count++;
    } 
}

echo 'data: "sum":'.$sum.',"cnt":'.$count.' }'.PHP_EOL.PHP_EOL;

ob_flush();
flush();

?>
