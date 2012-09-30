<?php
	//header
	header("Content-Type: text/html; charset=UTF-8");
	//DB設定  
  	mysql_connect("localhost","kin","kin");
  	// DBを選択する
  	mysql_select_db("kif");
	$sql = "select * from Category";
	$rs = mysql_query($sql);
	$array = array();
	if (mysql_num_rows($rs)) {
		$i = 0;
    	while ($row = mysql_fetch_assoc($rs)) {
			$array[$i] = array('number'=>$row['number'],'content'=>$row['content']);
			$i++;
		} 
	}
	echo json_encode($array);	
?>
