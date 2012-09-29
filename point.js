$(function(){

	var Point =function(target){
		//プロパティ
		//要素対象
		this.targetPoint =target+"Point";	//描画対象の要素
		this.targetSum=target+"Sum";		//合計得点
		//得点管理
		this.sumPoint = 0;					//合計得点
		this.currentPoint =0;				//描画完了の得点
		this.countPoint = 0;				//得点の変化をチェックする
		this.count=0;						//得点変化なしの時間
		this.settime = 500;					//ポイント描画インターバルの時間
		//ファイル　色
		//this.bgmfile = "";				//ポイントBGMファイル
		this.color = "yellow";				//得点のカラー					
		this.resultfile = "fail";			//結果BGMファイル
		this.recheckfile ;
		//得点フラグ
		this.resultFlag = false;			//結果実施のフラグ
		this.recheckFlag = false;			//結果再チェックフラグ
		this.passFlag = false;				//15点以上フラグ
		
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
		     
			if(this.currentPoint >= 15)
			{
				this.resultfile = "fanfale";
				this.color = "red";
				this.passFlag = true;
			}
			else
			{
				this.resultfile = "fail";
				this.color = "yellow";
				this.passFlag = false;	
			}
			
			//結果のチェック
			if(this.resultFlag == false)
			{
				this.checkResult();			
			}
			else
			{
				this.recheckResult();				
			}
		},
		
		//
		//得点のアップ		TODO:得点の勢いを考える　ランダムに実装
		//
		this.upPoint = function()
		{
			//現在描画しているポイント
			this.currentPoint++;

			this.checkSpeed();
			//速さ以外の調整						
			this.playBGM(this.currentPoint);
			$('ul#'+ this.targetPoint +' li#l' + this.currentPoint).children().addClass(this.color);
					
			
		},
		
		//
		//スピードのチェック
		//
		this.checkSpeed = function()
		{
			var diff = this.sumPoint - this.currentPoint;
			
			var now = this.currentPoint;
			
			if(diff > 3)
			{
				if(now >=15)
				{
					this.settime = Math.floor( Math.random() * 300);
				}
				else if(now >=10)
				{
					this.settime = Math.floor( Math.random() * 400);
				}
				else if(now >=5)
				{
					this.settime = Math.floor( Math.random() * 500);
				}
				else
				{
					this.settime = Math.floor( Math.random() * 800);
				}
			}
			else if(diff == 1)
			{
				if(this.currentPoint >=15)
				{
					this.settime = 500;
				}
				else
				{
					this.settime = 700;
				}
			}
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
				this.playDownBGM();
				
			}
			this.currentPoint = i;
		},
		
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
		//結果の処理　
		//
		this.checkResult = function()
		{
			//点数の変化チェック
			if(this.currentPoint == this.sumPoint && this.sumPoint != 0 )
			{
				this.count++;
			}
			//点数の変化が一定時間なし　もしくは　１５点以上になった　場合　結果を判断
			if(this.count == 6  || this.passFlag == true)
			{
				this.setCountPoint();
				this.playResultBGM();
				//以下フラグなどの処理
				this.resultFlag = true;
				this.count =7;
				this.recheckfile = this.resultfile;
			}
		},
		
		//
		//結果を再チェック
		//
		this.recheckResult = function()
		{
			//得点変化チェック
			if(this.recheckfile != this.resultfile)
			{
				this.playResultBGM();
				this.recheckfile = this.resultfile;								
			}
		}
		
		//
		//得点BGMをならす
		//
		this.playBGM=function(data)
		{				
			var bgm = data;//this.bgmfile+data;
			$("body").append('<embed id="point" src="./bgm/'+bgm+'.wav" autostart="true" hidden="true" loop="false">');
		},
		
		this.playDownBGM = function()
		{
			$("body").append('<embed id="point" src="./bgm/down.wav" autostart="true" hidden="true" loop="false">');				
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
	//SSE起動
	//
	$('#start').click(function()
	{
		var status = $(this).text();
		if(status == "start")
		{
			var content = $("select.content option:selected").val();
			$.ajax({
				type:"POST",
				url:"./server/CategorySet.php",
				data:
				{
				    "content":content
				},
				success:function(data)
				{
					initAudience = setInterval(initAudiencePoint,100);
					startSseAudience();
			    }
			});
			$(this).text("stop");					

		}
		else 
		{
			$(this).text("start");
			AudiencePoint.resetAll();
			clearInterval(setAudience);
			sseAudience.close();			    
			AudiencePoint = new Point("audience");
		}
				
	});
	

});

