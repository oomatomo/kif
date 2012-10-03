$(function(){
	
	
	//ランキング表のレイアウト
	var rank_height = $('body').height();
	var rank_width = $('body').width() ;
		
	$("#rank_table tr").height(rank_height / 6);
	
	for(var i = 1 ; i < 6 ;i++)
	{
		$("#rank"+i +" .rank_number").css("margin-left",(rank_width / 20 * i)+"px");
		$("#rank"+i).children().css("width",(rank_width / 10)+"px");	
	}
	
	//項目のレイアウト
	$("#rank_head_number").width($("#rank1 .rank_number").width());
	$("#rank_head_name").width($("#rank1 .rank_name").width());
	$("#rank_head_ave").width($("#rank1 .rank_ave").width());
	$("#rank_head_cnt").width($("#rank1 .rank_cnt").width());
	//
	//ランキング画面のデータ取得
	//
	var sseRank;
	var data =new Array();
	sseRank =new EventSource("./server/Ranking.php");
	
	sseRank.onmessage = function(ev)
	{
		ev.data.split('\n').join('');
		//四捨五入
		var json =JSON.parse(ev.data);
		
		for(var i = 0 ; i < json.point.length -1 ; i++)
		{
			data[i] = json.point[i];
			data[i].ave = json.point[i].sum / ( json.point[i].count * 4 ) * 100;
		}
		//データをソートする
		sortData(0,data.length-1);	
		//テーブル入れ替え
		sortTable();
	}
	//データをソートする
	function sortData(start,end)
	{
		var x = data[Math.floor((start + end) / 2)].ave;
		var i = start;
		var j = end;
		
		while (true)
		{
			while (data[i].ave > x) i++;
			while (x > data[j].ave) j--;
			if (i >= j) break;
			n = data[i];
			data[i] = data[j];
			data[j] = n;
			i++;
			j--; 
		}
		if (start < i-1) sortData(start,i-1);
		if (j+1 < end)   sortData(j+1,end);
	}
	
	//
	//テーブルの入れ替え
	//
	function sortTable()
	{
		for(var i = 0 ;i < 5 ; i++)
		{
			$("#rank"+(i+1)).find(".rank_name").text(data[i].name);
			$("#rank"+(i+1)).find(".rank_ave").text(Math.round(data[i].ave)+"%");
			$("#rank"+(i+1)).find(".rank_cnt").text(Math.round(data[i].count)+"人");
		}
	}
});