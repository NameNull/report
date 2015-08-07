/*
 * fusioncharts.theme.fint.js == 
 * column2d,column3d,line,area2d,bar2d,pie2d,pie3d,doughnut2d,doughnut3d,pareto2d,pareto3d 
 * */
$.tzChart = function(options){
	var opts = $.extend({},{
		target:"",
		width:"100%",
		height:"400",
		type:"column2d",// column2d,column3d,line,area2d,bar2d,pie2d,pie3d,doughnut2d,doughnut3d,pareto2d,pareto3d 
		dataType:"xml",
		data:"",
		callback:function(){
		}
	},options);
	FusionCharts.ready(function(){
	    var revenueChart = new FusionCharts({
	        "type": opts.type,//报表的类型:column2d,column3d,line,area2d,bar2d,pie2d,pie3d,doughnut2d,doughnut3d,pareto2d,pareto3d
	        "renderAt": opts.target,//报表统计的目标，存放的位置
	        "width": opts.width,//报表统计的宽度
	        "height": opts.height,//报表的高度
	        "dataFormat": opts.dataType,//报表的格式指明 xml/json dataSource的数据：取决于dataFormat
	        "dataSource": opts.data 
	  });
	  revenueChart.render();
	});
};