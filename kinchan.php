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
	<div class="container-fluid">	
		<!-- タブの部分 -->
		<div class="tabbable tabs-right">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#Point" data-toggle="tab">投票</a></li>
				<li class=""><a href="#Rank" data-toggle="tab">ランキング</a></li>
				<li class=""><a href="#Set" data-toggle="tab">設定</a></li>
				<li class=""><div id ="start" class="blue">start</div></li>
			</ul>
			<!-- tab content-->
			<div class="tab-content">
				<div id="Point" class="tab-pane active">
					<div class="row-fluid">
						<div class="span4">				
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
						<div class="span8 audience">
							<div style="margin:20px;">参加者<span  class="audienceCount" >0</span>人</div>
							<iframe src="http://www.ustream.tv/embed/12170443" width="700" height="512" scrolling="no" frameborder="0" style="border: 0px none transparent;"></iframe>
						</div>
					</div>
				</div>
				<!-- ランキングページ -->
				<div id="Rank" class="tab-pane">
					<table id="rank_table" width="100%">
						<tr><td id="rank1"><div class="rank_number">1st</div><div class="rank_name"></div><div class="rank_ave"></div>%</td></tr>
						<tr><td id="rank2"><div class="rank_number">2sd</div><div class="rank_name"></div><div class="rank_ave"></div>%</td></tr>
						<tr><td id="rank3"><div class="rank_number">3rd</div><div class="rank_name"></div><div class="rank_ave"></div>%</td></tr>
						<tr><td id="rank4"><div class="rank_number">4th</div><div class="rank_name"></div><div class="rank_ave"></div>%</td></tr>
						<tr><td id="rank5"><div class="rank_number">5th</div><div class="rank_name"></div><div class="rank_ave"></div>%</td></tr>					
					</table>
				</div>
				<!-- 設定 -->
				<div id="Set" class="tab-pane">
					<table class="table table-striped">
						<tr><th>発表者</th><td><select class="content" style="font-size:1.5em;"></select></td></tr>
						<tr><th>追加</th>
							<td><span class="btn btn-large" id="add">データ追加</span><td>
							<td><span  class="dbset" style="display:none">
								<input type="number" id="Category_number" />
								<input type="text" id="Category_content" />
								<span class="btn btn-large btn-info" id="addDB">登録</span>
								<span id="Category_result"></span>
							</span></td>
						</td></tr>
					</table>
					
				</div>
			<!-- tab content-->
			</div>
		</div>
	</div>
    <script src="./jquery/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="./bootstrap/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="./kinchanPoint.js" type="text/javascript" charset="utf-8"></script>
    <script src="./kinchanRank.js" type="text/javascript" charset="utf-8"></script>
    <script src="./kinchanSet.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>

