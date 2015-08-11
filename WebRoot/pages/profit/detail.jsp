<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>收入页面-财务管理系统</title>
	<%@include file="../../common/common.jsp" %>
	<script src="js/jquery.pagination.js"></script>
	<script src="js/chart/fusioncharts.js"></script>
	<script src="js/chart/fusioncharts.theme.fint.js"></script>
	<script src="js/chart/mychart.js"></script>
	<style type="text/css">
		#content{position: relative;}
		.cheader{position: fixed;width: 100%;top:52px;z-index: 5;}
		#contentbox{overflow-y:auto;width: 100%; position:absolute;}
		.tmui-buttons a{background:green;color:#fff;float: left;padding: 5px;}
		#typeId{padding:5px;}
		.range{width: 60px;}
	</style>
  </head>
  <body>
  	<!-- 容器 -->
  	<div id="container">
  	  <!-- 头部 -->
	  <%@include file="../../common/header.jsp" %>
	  <!-- 中间内容 -->
	  <div id="mainContent">
	    <!-- 左侧导航栏 -->	
	    <div id="sidebar">
	    	<%@include file="../../common/slider.jsp" %>
	    </div>
	    <!-- 内容区域 -->
	    <div id="content">
	    	<!--表格-->
			<div id="contentbox">
				<!--标题-->
				<!--日期-->
				<div class="ta_selete tmui-buttons">
					<div class="fr">
						&nbsp;&nbsp;时间：
						<select id="typeId" onchange="tm_switchTime()">
							<option value="today">--Today--</option>
							<option value="year">--This Year--</option>
						</select>
					</div>
					<div class="fl mar_lef10 charttype" style="line-height:35px;">
						展示图形：
						<select onchange="tm_change_line(this)" class="fr" id="sel">
							<option value="column2d">column2d</option>
							<option value="line">line</option>
							<option value="bar2d">bar2d</option>
							<script type="text/html" id="today_opts">
								<option value="column2d">column2d</option>
								<option value="line">line</option>
								<option value="bar2d">bar2d</option>
							</script>
							<script type="text/html" id="year_opts">
								<option value="column2d">column2d</option>
								<option value="line">line</option>
								<option value="bar2d">bar2d</option>
							</script>
						</select>
					</div>
				</div>
				<div>
					<div class="fl">
						<div id="chart3"></div>
					</div>
					<div class="fl">
						<div id="chart"></div>
					</div>
					<div class="fr">
						<div id="chart2"></div>
					</div>
				</div>
				<div class="page" style="margin-top: 5px;float: right;"></div>
			</div>
	    </div><!-- 内容区域结束 -->
	  </div>
	</div>
	<script type="text/javascript">
		$(function(){
			var height = $(window).height();
			$("#sidebar").height(height-55);
			$("#contentbox").height(height-90);
			$(window).resize(function(){
				var height = $(this).height();
				$("#sidebar").height(height-55);
				$("#contentbox").height(height-90);
			});
			tm_loadingData("column2d");
			/* tm_loadingYear();
			tm_loadingType(); */
		});
		//变换 展示图形
		function tm_change_line(obj){
			var value = obj.value;
			tm_loadingData(value);
		}
		
		function tm_getType(key){
			//执行一个ajax到后台去查询所有的分类
			var options={
				url:basePath+"profit/listTemplate",
				data:{"startIndex":pageNum*pageSize,"pageSize":pageSize,"typeId":typeId,"maxMoney":maxMoney,"minMoney":minMoney},
				callback:function(data){
					$("#tbody").html(data);
					keyHighlighter(typeName);
					if(callback){
						var itemCount =$("#itemCount").val();
						$("#totalNum").text(itemCount);
						callback(itemCount);
					}
				}
			};
			$.yj_utils.yj_ajax(options);
			var json = {
				1:{name:"工资",color:"F97D10"},	
				2:{name:"红包",color:"FF0000"},	
				3:{name:"基金",color:"141414"},
				4:{name:"中奖",color:"ccc"},
				5:{name:"生活费",color:"FF0045"},	
				6:{name:"理财",color:"CC1414"}
			};
			return json[key];
		}
		
		/*统计今天的收入金额排行*/
		function tm_loadingData(type){
			$.ajax({
				type:"post",
				url:basePath+"ajax/profit/todayProfit",
				success:function(data){
					if(isEmpty(data.profits)){
						alert("数据为空！");
					}else{
						var jsonData = data.profits;
						var length = jsonData.length;
						var html = "";
						for(var i=0;i<length;i++){
							var str=jsonData[i].createTime;
							var pos =str.indexOf(":");
							var dateString=str.substr(pos-2);
							html+="<set label='"+tm_getType(jsonData[i].typeId).name+"'  value='"+jsonData[i].money+"' alpha='100' tooltext='金额："+jsonData[i].money+"元{br}描述："+jsonData[i].description+"{br}添加时间："+dateString+"' />";
						}
						$.tzChart({
							target:"chart",
							type:type,
							height:"360",
							width:"31%",
							data:"<chart showLegend= '1' enableMultiSlicing= '0' slicingDistance= '15' showPercentValues= '1' showPercentInTooltip= '0' plotTooltext= 'Type : $label{br}Money : $datavalue' theme= 'fint' caption='今日收入' xaxisName='"+new Date().format("yyyy年MM月dd日")+"' yaxisname='收入(元)' numberprefix='￥' palettecolors='#EED17F,#97CBE7,#074868,#B0D67A,#2C560A,#DD9D82' bgcolor='#ffffff' borderalpha='20' canvasborderalpha='0' useplotgradientcolor='0' plotborderalpha='10' placevaluesinside='1' rotatevalues='1' valuefontcolor='#ffffff' showxaxisline='1' xaxislinecolor='#999999' divlinecolor='#999999' divlinedashed='1' showalternatehgridcolor='0' subcaptionfontbold='0' subcaptionfontsize='14'>"+html+"</chart>"
						});
					}
				}
			});
		}
		//时间字符串格式化
		//实现本周，本年，本月,三天前，昨天的收入情况
		/* function tm_loadingYear(){
			$.ajax({
				type:"post",
				url:basePath+"/json/profit/detailYear",
				success:function(data){
					var jsonData = eval("("+data.result+")");
					var html = "";
					for(var key in jsonData){
						html+="<set label='"+key+"'  value='"+jsonData[key]+"'/>";
					}
					$.tzChart({target:"chart2",type:"column2d",height:"360",width:"67%",data:"<chart caption='2014年度收入明细' yaxisname='收入金额(月/元)' numberprefix='￥'  bgcolor='e5e5e5' showborder='0' theme='fint'>"+html+"</chart>"});
				}
			});
		} */
	</script>
  </body>
</html>