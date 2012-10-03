<?php
	//header
	header("Content-Type: text/html; charset=UTF-8");
	//DB設定  
  	mysql_connect("localhost","kin","kin");
  	// DBを選択する
  	mysql_select_db("kif");
	$sql = "select max(number) as max from Category";
	$rs = mysql_query($sql);
	$max;
	
	if (mysql_num_rows($rs)) {
    	while ($row = mysql_fetch_assoc($rs)) {
			$max = $row['max'];
		} 
	}
	echo json_encode($max);	
?>
