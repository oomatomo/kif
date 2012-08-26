$(function(){
	
	var sumPoint = 0;
	var befPoint = sumPoint;
	var count = 0;
	var countPoint = 0;
	var timer ;

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
	
	function reset()
	{
		//$("[name=tp]").each(function(){$(this).text("0点");});
		$('li').each(function(){$(this).children().removeClass("yellow orenge red")});
		befPoint = 0;
	}
	
	//１秒ごとにチェック
	function setPoint()
	{	
	    if( befPoint < sumPoint){
			var nowPoint = befPoint + 1;
			
			$("embed #point").remove();
			
			if(nowPoint < 10){
				$("body").append('<embed id="point" src="./bgm/point1.wav" autostart="true" hidden="true" loop="false">');
				$('#l'+ nowPoint).children().addClass("yellow");
			}else if (nowPoint < 15){
				$("body").append('<embed id="point" src="./bgm/point2.wav" autostart="true" hidden="true" loop="false">');
				$('#l'+ nowPoint).children().addClass("yellow");
				clearInterval(timer);
				timer = setInterval(setPoint,700);
			}else{
				$("body").append('<embed id="point" src="./bgm/point1.wav" autostart="true" hidden="true" loop="false">');
				$('#l'+ nowPoint).children().addClass("red");
				clearInterval(timer);
				timer = setInterval(setPoint,900);
			}
			$(".sum").text(nowPoint+"点");
			befPoint++;
		}  
	    else if(sumPoint==0)
	    {
			reset();
	    }

		//result
		if(befPoint == sumPoint && sumPoint != 0 )
		{
			count++;
		}
		if(count == 4 )
		{
			countPoint = sumPoint;
			$("body").append('<embed id="result" src="./bgm/ok.wav" autostart="true" hidden="true" loop="false">');
		}

		else if(count >=4 && countPoint != sumPoint)
		{
			countPoint = sumPoint;
			$("embed #point").remove();
			$("body").append('<embed id="result" src="./bgm/ok.wav" autostart="true" hidden="true" loop="false">');
		}

	}

	function init(){
		// １秒ごと	
		if(sumPoint>0)
		{
			//BGM再生
			$("embed #set").remove();
			$("body").append('<embed id="set" src="./bgm/set.wav" autostart="true" hidden="true" loop="false">');
			//BGM再生後ポイント追加	
			setTimeout(function(){
				timer = setInterval(setPoint,400);
				},
				1500);
			//init 解放
			clearInterval(init);
		}
	}		
	
	var init = setInterval(init,1);

	function SumPointRemove()
	{
		$("[name=tp]").each(function(){$(this).text("0点");});
		$('li').each(function(){$(this).children().removeClass("yellow orenge red")});
	}
	
	//
	// SSE
	//
	var sse1 =new EventSource("./dataKin.php");
	
	sse1.onmessage = function(ev){
		ev.data.split('\n').join('');
		var use=JSON.parse(ev.data);
		
		if(use.sum <=20)
		{
			sumPoint=use.sum;
		}
		else
		{
			sumPoint=20;
		}
		if(sumPoint >= befPoint){
			//UserPointAdd(use);
		}
		
	}
	
	//
	//init
	//
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

