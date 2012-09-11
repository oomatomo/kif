$(function(){

	var Point =function(target){
		//プロパティ
		this.sumPoint = 0;					//合計得点
		this.currentPoint =0;				//描画完了の得点
		this.countPoint = 0;				//得点の変化をチェックする
		this.count=0;						//得点変化なしの時間
		this.targetPoint =target+"Point";	//描画対象の要素
		this.targetSum=target+"Sum";		//合計得点
		this.bgmfile = "p";			//ポイントBGMファイル
		this.resultfile = "fail";			//結果BGMファイル
		this.resultFlag = false;			//結果のフラグ
		this.settime = 500;					//インターバルの時間
		this.color = "yellow";				//得点のカラー					
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
		//得点のアップ		TODO:得点の勢いを考える　ランダムに実装
		//
		this.upPoint = function()
		{
			var diff = this.sumPoint - this.currentPoint;
			//現在描画しているポイント
			this.currentPoint++;
			var work = this.currentPoint;
			
			if(diff > 3)
			{
				//ランダムに得点の表示を決める
				//this.currentPoint = work + Math.floor( Math.random() * diff);
				this.settime = Math.floor( Math.random() * 600);
				$(".test").text(this.settime);
			}
			else
			{
				if(work >=15)
				{
					this.settime = 900;
				}
				else if(work >10)
				{
					this.settime = 700;
				}
//				$(".test").text(work+"kizonn");
			}

			//速さ以外の調整			
			if(work >=15)
			{
				this.resultfile = "fanfale";
				this.color ="red";
			}
			
			$('ul#'+ this.targetPoint +' li#l' + work).children().addClass(this.color);
			this.playBGM(work);		
			
		},
		//
		//得点ダウン	TODO:得点が減るときのBGM
		//
		this.downPoint = function()
		{
			var i = this.currentPoint;
			for(; i > this.sumPoint ; i--)
			{
				$('ul#'+ this.targetPoint +' li#l'+i).children().removeClass("yellow red");
			}
			this.currentPoint = i;
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
		this.playBGM=function(data)
		{				
			var bgm = this.bgmfile+data;
			$("body").append('<embed id="point" src="./bgm/'+bgm+'.wav" autostart="true" hidden="true" loop="false">');
		},
		//
		//結果BGMをならす
		//
		this.playResultBGM = function()
		{
			$("body").append('<embed id="result" src="./bgm/'+this.resultfile+'.wav" autostart="true" hidden="true" loop="false">');			
		},
		//
		//すべてをリセットする
		//
		this.resetAll = function()
		{			
			this.resetPoint();
			$("embed#point").remove();
			$("embed#result").remove();
			//$("."+this.targetSum).text("0点");
		}
	}

	//--------------------------------------------------
	//会場用
	//
	//初期選択を①に設定
	$.ajax({
		type:"POST",
		url:"./server/InsertContent.php",
		data:
		{
		    "content":1
	    },
    });
    
    //初期化する場合は以下の３つを解放する
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
	
	//initAudience = setInterval(initAudiencePoint,100);

	//
	//ポイントの有無を調べ、始めのBGMを流し、ポイントの表示用の繰り返しを行う
	//
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
			},2000);
			clearInterval(initAudience);
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
			//四捨五入
			var sum = Math.round(use.sum / ( use.cnt / 5 ));
			AudiencePoint.setSumPoint(sum);

			//$(".audienceSum").text(use.sum+"点");
			$(".audienceCount").text(use.cnt+"人");
		}
	}
	
	//
	//カウントダウン
	
	var targetTime;
	var countInterval;
	$('#start').click(function()
	{
		//SSE
		initAudience = setInterval(initAudiencePoint,100);
		startSseAudience();
				
	});

	
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
			    clearInterval(setAudience);
			    sseAudience.close();			    
			    AudiencePoint = new Point("audience");
		    }
	    });
	    
	});

});

