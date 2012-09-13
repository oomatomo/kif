$(function(){
 
	//カテゴリの取得
	function getCategory()
	{
		
	}
	var count_category = 8;
	
	//
	//投票画面をカテゴリごとに一つにまとめる
	//
	var point_width = $(".point").width();
	var withs ;
	
	function setUpPoint()
	{
		//カテゴリ分の幅
		var poll_content = $(".point");
		$(".point").remove();
		for(var i = 0 ; i < count_category ; i++)
		{
			poll_content.children(".point_header").text("No"+(i+1));	
			poll_content.clone(true).addClass("p"+(i+1)).appendTo(".step");
		}
		$(".step").width(point_width*count_category);
		$(".point").css("float","left").width(point_width);
		$(".p1").addClass("selected");
	}
	
	setUpPoint();
	//
	//投票画面の調整
	//
	function setPoll(number)
	{
		var selected = $(".selected");
		
		$(".box_header").text("No."+number);
		$(".tab_number").text(number);
		
		//クッキーの情報を取得 Stringへ変換
		var exitCheck = $.cookie(""+number);
		
		//結果の文字を中央に配置
		var all_height = $(".poll").height() / 2; 
		$(".result").css("padding-top",all_height);
		
		//クッキーの情報元に結果を表示
		var poll = selected.find(".poll");
		var result = selected.find(".result");
		if(exitCheck == "true")
		{
			poll.css("display","none");			
			result.height(all_height).fadeIn();	
		}
		else
		{
			result.css("display","none");			
			poll.fadeIn();
		}

	}
		
	//
	//次へのボタン
	//
	$(".next").bind("click",function()
	{
		var number = Number($(".tab_number").text())+1;
		if(number > count_category) return;

		$(".p"+(number-1)).removeClass("selected");
		$(".p"+number).addClass("selected");
		
		setPoll(number);
		
		$(".step").animate({
            'marginLeft': "-" + point_width * ( number -1)+ 'px'
        });			

	});
	
	//
	//戻るボタン
	//
	$(".prev").bind("click",function(){

		var number = Number($(".tab_number").text())-1;
		if(number < 1) return;
		
		$(".p"+(number+1)).removeClass("selected");
		$(".p"+number).addClass("selected");
		setPoll(number);

		$(".step").animate({
            'marginLeft': "-" + point_width * ( number -1)+ 'px'
        });			
		
	})
	
	
    //
    //スライダーの表示
    //
	$("body").live("pageshow",setSlider());
	
	function setSlider(){
		//スライダー関係のオブジェクト
		//得点の高さ
	    var slider = $(".slider_bar");
	    var slider_point  = $(".slider_point");
	    var slider_submit = $(".slider_submit");
        var poll_height = $(".poll").height();
        slider_point.css("margin",poll_height/10 +"px 0");
        slider_submit.css("margin",poll_height/10+"px 0");

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
        
    }
    
	var isTouch = ('ontouchstart' in window);
    var dragging = false;
    
	$('.slider_btn').bind({
                                  
		/* タッチの開始、マウスボタンを押したとき */
		'touchstart mousedown': function(e) {
            e.preventDefault();
                      
            // 開始位置 X,Y 座標を覚えておく
            this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
            //タッチフラグ                                     
            this.touched = true;

        },
        
        'touchmove mousemove': function(e) {
			if (!this.touched) {
            	return;
            }
            e.preventDefault();
            //if(!e.pageY) e = e.touches[0];
            var selected = $(".selected");
		    var slider_bar = selected.find(".slider_bar");
		    var slider_point  = selected.find(".slider_point");
		    var slider_submit = selected.find(".slider_submit");
		    //スライダーのボタン
		    var slider_btn = slider_bar.find(".slider_btn");
		    //ボタンの高さ
		    var size = slider_btn.height();
		    //スライダーのトップ　ボタンの半分が基準になる
		    var top = - size / 2;
		    //スライダーのボトム　
		    var height = slider_bar.height() + top ;
    
            e.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
            //現在のY座標
            var y = e.pageY -( slider_bar.offset().top + size / 2 );
            if(y < top)
            { 
            	y = top;
            }
            else if(y > height)
            {
            	y = height;
            }
            slider_btn.get(0).style.top = y + "px";
            value = 100 - Math.floor(100 * (y - top) / (height - top));
            value = Math.round(value / 25);
            slider_point.text(value+"点");                
		},
		
		'touchend mouseup': function(e){
			if (!this.touched) {
            	return;
            }         
            // タッチ処理は終了したため、フラグをたたむ
            this.touched = false;		
        },
	});
	
	//
	//タブ内の高さの統一
	//
	function setTab()
	{
		var tab_height = $(".tab").height();
		var tab_weight = $(".tab").width() / 4;
		if(tab_height < 35) tab_height = 35 ;		
		//タブ内の全ての高さを調整
		$(".next , .prev , .tab_selected").height(tab_height).width(tab_weight);
		
	}
	
	setTab();

	//データ送信イベント
	$(".slider_submit").bind("click",function()
	{
		var selected = $(".selected");
		var poll = selected.find(".poll");	    
		var p_height = poll.height() ;	
		var loader = selected.find(".loader");
		loader.height(p_height);
		selected.find(".loder_img").css("padding-top",p_height / 2 +"px");
		$.Deferred(function(dfd) {
		dfd.pipe(function() { return poll.fadeOut("slow"); })
		   .pipe(function() { return loader.fadeIn("slow"); })
		   .pipe(function() { return postPoint()})
		}).resolve();	 	

	});

	//データ送信メソッド
	function postPoint()
	{
		var selected = $(".selected");
		var point = selected.find(".slider_point").text().charAt(0);	 	
		//データ送信
	    var category = $(".tab_number").text();		
		//結果の文字を中央に配置
		var all_height = selected.find(".poll").height() / 2; 
		selected.find(".result").css("padding-top",all_height).height(all_height);
	    	    
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
				dfd.pipe(function() { return selected.find(".loader").fadeOut("slow"); })
				   .pipe(function() { return selected.find(".result").fadeIn("slow"); })
				}).resolve();
			}
		});

	}

	$(".retry").bind("click",function()
	{
		//スラーダー表示
		var category = $(".tab_number").text();
		$.cookie(category,false);
		$.Deferred(function(dfd) {
		dfd.pipe(function() { return $(".result").fadeOut("slow"); })
		   .pipe(function() { return $(".poll").fadeIn("slow"); })
		}).resolve();		
	});


});						

