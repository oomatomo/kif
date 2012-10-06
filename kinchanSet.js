$(function(){
	
	//	
	//点数の初期表示設定
	//
	$('ul.point li ').each(function(){ 
		$(this).children().addClass("def");
		$(this).children().addClass("gray");
	});

	//
	//カテゴリセレクトボックス
	//
	function initSelect(){
		var dt;
		$('select.content').children().remove();
		$.ajax({
			type:"GET",
			dataType: "json",
	        url: "./server/CategoryGet.php",
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
	
	
	$('#add').click(function()
	{
		$('.dbset').toggle();
		$("#Category_result").text("");
		//maxの番号取得
		$.ajax({
			type:"GET",
			dataType: "json",
	        url: "./server/CategoryMax.php",
	        success: function(data) 
	        {
	        	$('#Category_number').val( Number(data) + 1);
			}
		});
			
	});
	
	$('#addDB').click(function(){
		var number = $('#Category_number').val();
		var content = $('#Category_content').val();
		$.ajax({
			type:"POST",
			url:"./server/CategoryInsert.php",
			data:
			{
				"number":number,
			    "content":content
			},
			success:function(data)
			{
				$("#Category_result").text("成功");
				$('#Category_number').val("");
				$('#Category_content').val("");
				initSelect();
		    }
		});
	})

});