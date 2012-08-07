<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-style-type" content="text/css" charset="utf-8">
    <meta http-equiv="content-script-type" content="text/javascript" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="./kinchan.css" charset="utf-8">
    <script src="./jquery/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>

<script type="text/javascript">
$(function(){
	
	var sumPoint = 0;
	var befPoint = sumPoint;
	var deferred=$.Deferred();
	
	//ユーザ表示
	function UserPointAdd(use)
	{
		for(var j=0;j<use.user.length;j++){
			var user=use.user[j].name;
			var point=use.user[j].point;
			$('#'+user+'p').text(point+"点");
			for(var i=0;i<=point;i++){
				$('#'+user+'l'+i).children().addClass("orenge");
			}
		}
	}

	//１秒ごとにチェック
	setInterval(function()
		{	
		    if( befPoint < sumPoint){
				var nowPoint = befPoint + 1;
				if(nowPoint < 10){
					$('#l'+ nowPoint).children().addClass("yellow");
				}else if (nowPoint < 15){
					$('#l'+ nowPoint).children().addClass("orenge");
				}else{
					$('#l'+ nowPoint).children().addClass("red");
				}
				$("#sum").text(nowPoint+"点");
				befPoint++;
		    }  
		    else if(sumPoint==0)
		    { 
				$("[name=tp]").each(function(){$(this).text("0点");});
				$('li').each(function(){$(this).children().removeClass("yellow orenge red")});
				befPoint = 0;
		    }
		    $("#sum").text(sumPoint+"点");
		    
		},500);
	
	function SumPointRemove()
	{
		$("[name=tp]").each(function(){$(this).text("0点");});
		$('li').each(function(){$(this).children().removeClass("yellow orenge red")});
	}
		
	var sse1 =new EventSource("./dataKin.php");
	
	sse1.onmessage = function(ev){
		ev.data.split('\n').join('');
		var use=JSON.parse(ev.data);
		sumPoint=use.sum;
		
		if(sumPoint >= befPoint){
			//UserPointAdd(use);
		}
	}
	
	$('li ').each(function(){ 
		$(this).children().addClass("def");
		$(this).children().addClass("gray");
	});

	/*
	$('#usershow').click(function(){
		var result = $(".test").is(':visible');
		if(result){
			$(".test").fadeOut("slow");
		}else{
			$(".test").fadeIn("slow");
		}
	});
	*/
});
</script>
<title>採点</title>
</head>
<body>
	<img class="bg" src="./kin.png" alt="" />
	<div id="container"> 
	 <table > 
	 <tr style="font-size:3em;"><th style="text-align:right;"></th>
	 <th>POINT</th>
	 </tr>
	 <tr>
	   <td></td>
	   <td width="80%">
		<ul id='point'>
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
	   </td>
	   <!--<td>
		<table class="test" id="ut">
		<tr><td id="sum" style="font-size:2em;">0点</td>
		</tr>
		<tr>
		  <td width="20%">神戸太郎</td>
		  <td width="50%">
		    <ul class="user">
		        <li name="tp" id='t1p'>0点</li>
			<li id='t1l4' ><div ></div></li>
			<li id='t1l3' ><div ></div></li>
			<li id='t1l2' ><div ></div></li>
			<li id='t1l1' ><div ></div></li>
		    </ul>
		  </td>
		</tr>
		<tr>
		  <td>神戸次郎</td>
		  <td>
		    <ul class="user">
		        <li name="tp" id='t2p'>0点</li>
			<li id='t2l4' ><div ></div></li>
			<li id='t2l3' ><div ></div></li>
			<li id='t2l2' ><div ></div></li>
			<li id='t2l1' ><div ></div></li>
		    </ul>
		  </td>
		</tr>
		<tr>
		  <td>神戸三郎</td>
		  <td>
		    <ul class="user">
		        <li name="tp" id='t3p'>0点</li>
			<li id='t3l4' ><div ></div></li>
			<li id='t3l3' ><div ></div></li>
			<li id='t3l2' ><div ></div></li>
			<li id='t3l1' ><div ></div></li>
		    </ul>
		  </td>
		</tr>
		<tr>
		  <td>神戸四郎</td>
		  <td>
		    <ul class="user">
		        <li name="tp" id='t4p'>0点</li>
			<li id='t4l4' ><div ></div></li>
			<li id='t4l3' ><div ></div></li>
			<li id='t4l2' ><div ></div></li>
			<li id='t4l1' ><div ></div></li>
		    </ul>
		  </td>
		</tr>
		<tr>
		  <td>神戸五郎</td>
		  <td>
		    <ul class="user">
		        <li name="tp" id='t5p'>0点</li>
			<li id='t5l4' ><div ></div></li>
			<li id='t5l3' ><div ></div></li>
			<li id='t5l2' ><div ></div></li>
			<li id='t5l1' ><div ></div></li>
		    </ul>
		  </td>
		</tr>
		<tr>
		  <td>神戸六郎</td>
		  <td>
		    <ul class="user">
		        <li name="tp" id='t6p'>0点</li>
			<li id='t6l4' ><div ></div></li>
			<li id='t6l3' ><div ></div></li>
			<li id='t6l2' ><div ></div></li>
			<li id='t6l1' ><div ></div></li>
		    </ul>
		  </td>
		</tr>
		</table>
	   </td>
	   -->
	 </tr>
	</table>
	</div>
</body>
</html>

