<html>
 <head>
 <meta charset="utf-8"/>
 <meta http-equiv="content-style-type" content="text/css" charset="utf-8">
 <meta http-equiv="content-script-type" content="text/javascript" charset="utf-8">
 <link rel="stylesheet" type="text/css" href="./bootstrap/css/bootstrap.min.css"> 
 <link rel="stylesheet" type="text/css" href="./kinchan_input.css">
 <script src="./jquery/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>
 <title>きんちゃんシステム</title>
 </head>
 <script type="text/javascript">
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
	    $("[name=''point]").each(function(){
	        $(this).removeClass("btn-primary");
	    });
	    $(this).addClass("btn-primary");
	     
	});

	//データ送信
	$("#submit").click(function(){
	    var user = $("#name_text").val();
	    var point =point_get();
	   
	    if(user === "" || point === "")
	    {
	    	return;
	    }
	    //データ送信
	    $.ajax({
		type:"POST",
		url:"./pointGet.php",
		data:{
		    "user":user,"point":point
		}
		,success:function(ret){
		    $("#test").text(ret); 
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

	    return ;
	}
	
  });
 </script>

 <body>

   <!-- ヘッダー -->
   <div class="navbar navbar-fixed-top">
     <div class="navbar-inner">
       <div class="container">
        <div class="nav-collapse collapse">
		<div class="header_title" >投票画面</div>
		</div>
       </div>
     </div>
   </div>
  
  <!--コンテンツ --> 
   <div class="content">
     <!--　名前スペース -->
     <div id="name">
     	 <div id="name_label"></div>
         <input id="name_text" type="text" />
     </div><br/> 
     <button id="name_set" class="btn btn-primary btn-large" >登録</button>
     
     <!-- タブ
     <ul class="nav nav-tabs">
        <li><a id="tab" href="#test" data-toggle="tab">test</a></li>
        <li><a id="tab2" href="#test2" data-toggle="tab">test2</a></li>
     </ul>
     -->
    <br><br>
    <div class="addPoint">
      <div >得点を選択してください</div>
      <br>
      <input type="button" id="p0" name="point" class="btn" value="0点" />
      <input type="button" id="p1" name="point" class="btn" value="1点" />
      <input type="button" id="p2" name="point" class="btn" value="2点" />
      <input type="button" id="p3" name="point" class="btn" value="3点" />
      <input type="button" id="p4" name="point" class="btn" value="4点" />
      <br><br>
      <button id="submit" class="btn btn-success btn-large" >送信</button>
      <br><br>
      <div id="error"></div>
    <div>
    
  </div>
 </body>


</html>
