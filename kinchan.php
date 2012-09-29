<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-style-type" content="text/css" charset="utf-8">
    <meta http-equiv="content-script-type" content="text/javascript" charset="utf-8">
 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="./bootstrap/css/bootstrap.min.css"> 
	<link rel="stylesheet" type="text/css" href="./bootstrap/css/bootstrap-responsive.min.css"> 
    <link rel="stylesheet" type="text/css" href="./kinchan.css" charset="utf-8">
<title>採点</title>
</head>
<body>
	
	<?php
		//セッションでカテゴリを調整する
		session_start();
		$_SESSION["category"] = 1;
	?>
	
	<!-- ヘッダー -->
   	<div class="navbar">
     	<div class="navbar-inner header">
	 		<div class="container">
				<div class="header_title" >欽ちゃんシステム</div>
     		</div>
	 	</div>
   	</div>
  	<!--コンテンツ --> 
	<div id="container">
		<div class="container-fluid">	
			<div class="row-fluid">
				<!--
				<select class="content"></select>
				<span class="btn btn-large" id ="start" >start</span>
				-->
			</div>
			<div class="row-fluid">
			<div class="span4">				
			</div>
			<div class="span8 audience">
				<div class="row-fluid">
					<div class="span3">
						<ul id='audiencePoint' class="point">
							<li id='l20' ><div>20</div></li>
							<li id='l19' ><div>19</div></li>
							<li id='l18' ><div>18</div></li>
							<li id='l17' ><div>17</div></li>
							<li id='l16' ><div>16</div></li>
							<li id='l15' ><div>15</div></li>
							<li id='l14' ><div>14</div></li>
							<li id='l13' ><div>13</div></li>
							<li id='l12' ><div>12</div></li>
							<li id='l11' ><div>11</div></li>
							<li id='l10' ><div>10</div></li>
							<li id='l9' ><div >9</div></li>
							<li id='l8' ><div >8</div></li>
							<li id='l7' ><div >7</div></li>
							<li id='l6' ><div >6</div></li>
							<li id='l5' ><div >5</div></li>
							<li id='l4' ><div >4</div></li>
							<li id='l3' ><div >3</div></li>
							<li id='l2' ><div >2</div></li>
							<li id='l1' ><div >1</div></li>
						</ul>
					</div>
					<div class="span8">
						<!-- usteream-->
						<select class="content"></select>
						<span class="btn btn-large" id ="start" >start</span>
						<span class="btn btn-large" id="add">データ追加</span>
						<div class="dbset" style="display:none">
							<input type="number" class="number"/>
							<input type="text" class="name"/>
						</div>
						<div>
							<div class="audienceCount"></div>
						</div>
					</div>
				</div>		
			</div>
		</div>
	</div>
    <script src="./jquery/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="./init.js" type="text/javascript" charset="utf-8"></script>
    <script src="./point.js" type="text/javascript" charset="utf-8"></script>
    <script src="./kinchanDB.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>

