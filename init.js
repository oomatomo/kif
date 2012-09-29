$(function(){
	
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
		var dt;
		$.ajax({
			type:"GET",
			dataType: "json",
	        url: "./server/ContentGet.php",
	        success: function(data) 
	        {
				dt =data;
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
	
	
	

});