$(function(){

	var Point =function(target){
		//プロパティ
		this.sumPoint = 0;		//合計得点
		this.currentPoint =0;	//描画完了の得点
		this.countPoint = 0;	//得点の変化をチェックする
		this.count=0;			//得点変化なしの時間
		this.targetPoint =target+"Point";	//描画対象の要素
		this.targetSum=target+"Sum";	//合計得点
		this.bgmfile = "point1";//BGMファイル
		this.resultFlag = false;//結果のフラグ
		this.settime = 500;		//インターバルの時間
		this.color = "yellow";	//得点のカラー					
		//
		//得点管理
		//
		this.setSumPoint=function(data)
		{
			this.sumPoint = data;
		},
		//
		//現在点の管理
		//
		this.setCountPoint = function()
		{
			this.countPoint = this.sumPoint;
		},
		//
		//ポイントのチェック　アップ・ダウン
		//
		this.checkPoint　= function()
		{
			if(this.currentPoint < this.sumPoint)
			{
				this.upPoint();
			}  
		    else if(this.sumPoint==0)
		    {
				this.resetPoint();
		    }
		    else if(this.currentPoint > this.sumPoint)
		    {
				this.downPoint();			    
		    } 
			
			this.checkResult();
		},
		//
		//得点のアップ
		//
		this.upPoint = function()
		{

			this.currentPoint++;			
			//得点に合った設定を行う			
			if(this.currentPoint > 15)
			{
				this.bgmfile = "point2";
				this.color = "red";
				this.settime = 900;
			}
			else if (this.currentPoint > 10)
			{
				this.settime = 700;
				//TODO:得点bgnの設定
			}
			
			this.setColor();						
			this.playBGM();		
		},
		//
		//得点ダウン
		//
		this.downPoint = function()
		{
			var i = this.currentPoint;
			for(; i > this.sumPoint ; i--)
			{
				$('ul#'+ this.targetPoint +' li#l'+i).children().removeClass("yellow red");
			}
			this.currentPoint =i;
		}
		//
		//得点のリセット
		//
		this.resetPoint = function()
		{
			$('ul#'+ this.targetPoint +' li').each(function(){
				$(this).children().removeClass("yellow red");
				$(this).children().addClass("def");
				$(this).children().addClass("gray");
			});
		},
		//
		//カラーを表示
		//
		this.setColor = function()
		{
			$('ul#'+ this.targetPoint +' li#l' + this.currentPoint).children().addClass(this.color);
		}		
		//
		//result処理
		//
		this.checkResult = function()
		{
			//１秒ごとに得点の変化をチェック
			if(this.currentPoint == this.sumPoint && this.sumPoint != 0 )
			{
				this.count++;
			}
			//４秒後に得点の判定を行う
			if(this.count == 6 )
			{
				this.setCountPoint();
				this.playResultBGM();
				this.resultFlag = true;
			}
			//採点後の得点の判定　	
			if(this.resultFlag == true && this.countPoint != this.sumPoint)
			{
				this.setCountPoint();
				this.playResultBGM();
			}		
			
		},		
		//
		//得点BGMをならす
		//
		this.playBGM=function()
		{				
			$("embed#point"+ (this.currentPoint-2)).remove();
			$("body").append('<embed id="point'+this.currentPoint+'" src="./bgm/'+this.bgmfile+'.wav" autostart="true" hidden="true" loop="false">');
		},
		//
		//結果BGMをならす
		//
		this.playResultBGM = function()
		{
			$("embed#result").remove();
			$("body").append('<embed id="result" src="./bgm/ok.wav" autostart="true" hidden="true" loop="false">');			
		},
		//
		//すべてをリセットする
		//
		this.resetAll = function()
		{			
			this.resetPoint();
			$("."+this.targetSum).text("0点");
		}
	}

	//--------------------------------------------------
	//会場用
	//
	var AudiencePoint = new Point("audience");
	var setAudience;
	var initAudience;
	//
	//繰り返し処理 　クラスではうまく行かなかったwhy？Interbalのときにクラス内の処理ではなくなってしまう
	//
	function setAudiencePoint()
	{
		var targetObject = AudiencePoint;	
    	
    	//点数の判定
		targetObject.checkPoint();
		
		//result処理
		clearInterval(setAudience)
		setAudience = setInterval(setAudiencePoint,targetObject.settime);
	}
	
	initAudience = setInterval(initAudiencePoint,100);

	function initAudiencePoint()
	{
		var targetObject = AudiencePoint;
		//得点の有無を調べる
		if(targetObject.sumPoint>0 )
		{
			//BGM再生
			$("embed #set").remove();
			$("body").append('<embed id="set" src="./bgm/set.wav" autostart="true" hidden="true" loop="false">');
			//BGM再生後ポイント追加	
			setAudience = setInterval(function(){
				setAudiencePoint();
			},1500);
			clearInterval(initAudience);
		}
	}
	
	//--------------------------------------------------
	//審査員
	//
	var JudgePoint = new Point("judge");
	var setJudge;
	var initJudge;
	
	//
	//
	//--------------------------------------------------
	
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
		
	//
	// SSE
	//
	//会場用SSE	
	var sseAudience;
	
	function startSseAudience()
	{
		sseAudience =new EventSource("./server/AudienceKin.php");
		
		sseAudience.onmessage = function(ev)
		{
			ev.data.split('\n').join('');
			var use=JSON.parse(ev.data);
			
			if(use.sum <=20)
			{	
				//四捨五入
				var sum = Math.round(use.sum / ( use.cnt / 5 ));
				AudiencePoint.setSumPoint(sum);
			}

			$(".audienceSum").text(use.sum+"点");
			$(".audienceCount").text(use.cnt+"人");
		}
	}
	
	//
	//カウントダウン
	//
	var targetTime;
	var countInterval;
	$('#start').click(function()
	{
		//SSE
		startSseAudience();
		//カウントダウン
		//$(this).hide("slow");
		var dd = new Date();
		dd.setSeconds(dd.getSeconds()+45);
		targetTime =dd.getTime(); 
		countInterval =  setInterval(function()
		{
			getCountTime();
		}, 100);
		//$(".time").show("slow");
				
	});

	function getCountTime(){
		var dd = new Date().getTime();
		
		if(dd > targetTime)
		{
			stopCountTime();
			return;
		}
		var countTime = (dd - targetTime) / 1000; 
		var myS = -(Math.floor(countTime%1000*10)/10);
		$('.time').text(myS.toFixed(1));	
	}

	function stopCountTime(){
		$('.time').text("00:0");	
		$("#start").show("slow");
		AudiencePoint.reset();
		sseAudience.close();
		clearInterval(countInterval);
	}
	
	//	
	//点数の初期表示設定
	//
	$('li ').each(function(){ 
		$(this).children().addClass("def");
		$(this).children().addClass("gray");
	});

	//
	//カテゴリセレクトボックス
	//
	function initSelect(){
		$.ajax({
			type:"GET",
			dataType: "json",
	        url: "./server/Content.php",
	        success: function(data) 
	        {
				var dt =data;
				for(var i =0 ; i<dt.length ; i++ )
				{
					//IE error
					$('select.content').append($('<option>').attr({ value:dt[i].number }).text(dt[i].number +"-"+dt[i].content));	
				}
			}
		});
	}
	//実行 
	initSelect();
	
	//
	//カテゴリごとの設定
	//
	$("select.content").change(function()
	{
		
		var content = $("select.content option:selected").val();
		
		$.ajax({
			type:"POST",
			url:"./server/InsertContent.php",
			data:
			{
			    "content":content
		    },
		    success:function(data)
		    {
			    AudiencePoint.resetAll();
			    
			    AudiencePoint = new Point("audiencePoint");
		    }
	    });
	    
	});

});

