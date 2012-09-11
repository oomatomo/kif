$(function(){
 
  	//データ送信イベント
	$("#slider_submit").click(function(){
	    
		var p_height = $(".poll").height() ;	
		$(".loader").height(p_height);
		$("#loder_img").css("padding-top",p_height / 2 +"px");
		$.Deferred(function(dfd) {
		dfd.pipe(function() { return $(".poll").fadeOut("slow"); })
		   .pipe(function() { return $(".loader").fadeIn("slow"); })
		   .pipe(function() { return postPoint()})
		}).resolve();	 	
		
	 	$(".poll").promise().then(function(){
	 		$(".loader").fadeIn("slow").promise().then(postPoint);
	 	});

	});

	//データ送信メソッド
	function postPoint()
	{
		var point = $(".slider_point").text().charAt(0);	 	
		//データ送信
	    var category = $("li[class='selected']").text();
		//結果の文字を中央に配置
		var all_height = $(".poll").height()/2; 
		$(".result").css("padding-top",all_height).height(all_height);
	    	    
	    $.ajax({
			type:"POST",
			url:"./server/pointGet.php",
			data:
			{
			    "point":point,"category":category
			},
			success:function(){
				$.cookie(category,true);
				//結果表示
				$.Deferred(function(dfd) {
				dfd.pipe(function() { return $(".loader").fadeOut("slow"); })
				   .pipe(function() { return $(".result").fadeIn("slow"); })
				}).resolve();
			}
		});

	}

	$("#retry").click(function(){
		//スラーダー表示
		var category = $("li[class='selected']").text();
		$.cookie(category,false);
		$.Deferred(function(dfd) {
		dfd.pipe(function() { return $(".result").fadeOut("slow"); })
		   .pipe(function() { return $(".poll").fadeIn("slow"); })
		}).resolve();		
	});

	//tab 選択時のクラス
	var tabclass = "selected";
	var tab_list = $(".tab_list li");
	
	tab_list.each(function()
	{
		//要素数
		var index = $(this).index();		
		if(index == 0)
		{
			$(".box_header").text("No.1");
			$(this).addClass(tabclass);
		}
	});	

	tab_list.bind("click",function()
	{
		var check = $(this).hasClass(tabclass);
		
		if(check) return;
		
		tab_list.each(function()
		{
	        $(this).removeClass(tabclass);
	    });
		
		$(this).addClass(tabclass);
		var number = $(this).text();
				
		$(".box_header").text("No."+number);
		//クッキーの情報を取得
		var exitCheck = $.cookie(number);
		
		//結果の文字を中央に配置
		var all_height = $(".poll").height() / 2; 
		$(".result").css("padding-top",all_height);
		
		//クッキーの情報元に結果を表示
		if(exitCheck)
		{
			$(".poll").css("display","none");			
			$(".result").height(all_height).fadeIn();	
		}
		else
		{
			$(".result").css("display","none");			
			$(".poll").fadeIn();
		}

	});
	
	
	//スライダー
	$("body").live("pageshow",setSlider());
	
	function setSlider(){
		//スライダー関係のオブジェクト
        var slider = $(".slider_bar");
        var slider_point  = $(".slider_point");
        var slider_submit = $("#slider_submit");
		//得点の高さ
        var poll_height = $(".poll").height();
        slider_point.css("padding-top",poll_height/2 +"px");
        slider_submit.css("margin-top",poll_height/2 +"px");

        //高さ調整
        slider.height(poll_height);
        //スライダーのボタン
        var slider_btn = slider.find(".slider_btn");
        //ボタンの高さ
        var size = slider_btn.height();
        //スライダーのトップ　ボタンの半分が基準になる
        var top = - size / 2;
        //スライダーのボトム　
        var height = slider.height() + top ;
        
        // 初期位置
        slider_btn.css("top", (height - top) * 0.5 + top + "px");
        slider_point.text("2点");
        //スマフォ＆＆PCの場合のクリックタッチイベント
        var ua = navigator.userAgent;
        if(ua.indexOf("iPhone") > 0 || ua.indexOf("Android") > 0){
            var start = "touchstart";
            var move  = "touchmove";
            var end   = "touchend";
        } else {
            var start = "mousedown";
            var move  = "mousemove";
            var end   = "mouseup";
        }
        
        //タッチ処理
        //タッチフラグ
        var dragging = false;

        //スライダーボタンのクリックイベント
        slider_btn.bind(start,slideStart);
        $("body").bind(move, slideMove);
        $("body").bind(end, slideEnd);
        /*
        slider.add(".slider_down,.slider_up").bind("click", function(e) {
            dragging = true;
            slideMove(e);
            dragging = false;   
        });
        */
        function slideStart(e) {
            dragging = true;
        }
		//動いている間の処理        
        function slideMove(e) {
            if(dragging){
                e.preventDefault();
                if(!e.pageY) e = e.touches[0];
                //現在のY座標
                var y = e.pageY -( slider.offset().top + size / 2 );
                if(y < top)
                { 
                	y = top;
                }
                else if(y > height)
                {
                	y = height;
	            }
                //input.css("top", y + "px");
                slider_btn.get(0).style.top = y + "px";
                value = 100 - Math.floor(100 * (y - top) / (height - top));
                value = Math.round(value / 25);
                slider_point.text(value+"点");                
            }
        }
        
        function slideEnd(e){
        	if(dragging) dragging = false;
        }    
    }
});

