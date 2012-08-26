$(function(){
 
 	//名前セット
 	$("#name_set").click(function(){
	    var btnStatus = $(this).text();
	    if(btnStatus === "登録"){
	        var name = $("#name_text").val();
	        if(name === "") return;
	        $("#name_text").fadeOut().promise().done(function(){
	     		$("#name_label").text("名前：" + name).fadeIn();
			});
	        $(this).text("変更");
	    }else{
	        $("#name_label").fadeOut().promise().done(function(){
	     		$("#name_text").fadeIn();
			});
		$(this).text("登録");
	    }
	});

	//得点の受信
	$("[name='point']").click(function(){
	    
		var existiCheck = $(this).hasClass("btn-primary");

		$("[name=''point]").each(function(){
	        $(this).removeClass("btn-primary");
	    });

		//存在チェック
		if(existiCheck) return;

		$(this).addClass("btn-primary");
	     
	});

	//データ送信
	$("#submit").click(function(){
	    var user = $("#name_text").val();
	    var point =point_get();
	    var category = $("li[class='selected']").text();

	    if(user === "" || point === "")
	    {
	    	return alert("名前もしくは点数を選択してください。");
	    }
	    
		//データ送信
	    $.ajax({
		type:"POST",
		url:"./pointGet.php",
		data:{
		    "user":user,"point":point,"category":category
		}
		,success:function(ret){
			//cookieにtabの情報
			$.cookie(category,true);
			$(".poll"),fadeOut();

		}
	    });

	});

	function point_get(){
	    var flag = $("[name='point']").hasClass("btn-primary");
	    //点数を選択済みかチェック
	    if(flag)
	    {
	    	var point = $("input.btn-primary").attr("id");
	    	if (typeof(jQuery) !== undefined)
			{
		    return point.charAt(1);
	    	}
	    }

	    return "";
	}

	//tab 選択時のクラス
	var tabclass = "selected";
	
	$(".tablist li").each(function(){
		//要素数
		var index = $(this).index();		

		if(index % 4 == 0)
		{
			$(this).css("clear","both");
		}

		if(index == 0)
		{
			$(".box_header").text("No.1");
			$(this).addClass(tabclass);
		}
	});	

	$(".tablist li").bind("click",function(){
		var check = $(this).hasClass(tabclass);
		
		if(check) return;
		
		$(".tablist li").each(function(){
	        $(this).removeClass(tabclass);
	    });
		
		$(this).addClass(tabclass);
		var number = $(this).text();
		
		$(".box_header").text("No."+number);

		var exitCheck = $.cookie(number);
		
		$(".poll").fadeOut();

		if(exitCheck)
		{
			
		}
		else
		{
			$(".poll").fadeIn();
		}
	});

	

  });

