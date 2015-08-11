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
						<select id="typeId" onchange="tm_change_time(this)">
							<option value="today">--Today--</option>
							<option value="year">--This Year--</option>
							<option value="years">--Every Year--</option>
						</select>
					</div>
					<div class="fl mar_lef10 charttype" style="line-height:35px;">
						展示图形：
						<select onchange="tm_change_line(this)" class="fr" id="sel">
							<option value="column2d">column2d</option>
							<option value="line">line</option>
							<option value="bar2d">bar2d</option>
						</select>
						<select class="dis_none" id="type_opts">
							<c:forEach items="${maps }" var="map">
								<option value="${map.id}">${map.name}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div style="border:1px solid #ccc;background:#ccc; margin:20px;">
					<div id="chart"></div>
				</div>
			</div>
	    </div><!-- 内容区域结束 -->
	  </div>
	</div>

	<script type="text/html" id="today_opts">
		<option value="column2d">column2d</option>
		<option value="line">line</option>
		<option value="bar2d">bar2d</option>
	</script>
	<script type="text/html" id="year_opts">
		<option value="msline">msline</option>
		<option value="mscolumn2d">mscolumn2d</option>
		<option value="msarea">msarea</option>
	</script>
	<script type="text/javascript">
		//获取类型
		var arr=[];
		$("#type_opts").find("option").each(function(){
			arr[$(this).val()]={name:$(this).text()};
		});
		$(function(){
			var height = $(window).height();
			$("#sidebar").height(height-55);
			$("#contentbox").height(height-90);
			$(window).resize(function(){
				var height = $(this).height();
				$("#sidebar").height(height-55);
				$("#contentbox").height(height-90);
			});
			tm_loadingTodayData("column2d");
		});
		//变换展示图形
		function tm_change_line(obj){
			var value = obj.value;
			var year=new Date().format("yyyy");
			var time=$("#typeId").find("option:selected").val();
			switch(time){
				case "today":
					tm_loadingTodayData(value);
					break;
				case "year":
					tm_loadingYearData(value,"ajax/profit/yearProfit","今年每个类型的月收入情况",year);
					break;
				case "years":
					tm_loadingYearData(value,"ajax/profit/yearsProfit","每年每月的总收入情况");
					break;
				default:
					tm_loadingTodayData(value);
					break;
			}
		}
		//变换时间
		function tm_change_time(obj){
			var value=obj.value;
			var year=new Date().format("yyyy");
			switch(value){
				case "today":
					tm_loadingTodayData("column2d");
					$("#sel").html($("#today_opts").html());
					break;
				case "year":
					tm_loadingYearData("msline","ajax/profit/yearProfit","今年每个类型的月收入情况",year);
					$("#sel").html($("#year_opts").html());
					break;
				case "years":
					tm_loadingYearData("msline","ajax/profit/yearsProfit","每年每月的总收入情况");
					$("#sel").html($("#year_opts").html());
					break;
				default:
					tm_loadingTodayData("column2d");break;
			}
		}
		//arr转字符串
		function getTypeName(key){
			return arr[key].name;
		}
		/*统计今天的收入金额排行*/
		function tm_loadingTodayData(type){
			var options={
				url:basePath+"ajax/profit/todayProfit",
				callback:function(data){
					if(isEmpty(data.profits)){
						tm_dialog({content:"今天并没有收入！",sureText:"添加收入",cancleText:"再看看",callback:function(ok){
							if(ok){
								location.href=basePath+"profit/add";
							}
						}});
					}else{
						var jsonData = data.profits;
						var length = jsonData.length;
						var html = "";
						for(var i=0;i<length;i++){
							var str=jsonData[i].createTime;
							var pos =str.indexOf(":");
							var dateString=str.substr(pos-2);
							html+="<set label='"+getTypeName(jsonData[i].typeId)+"'  value='"+jsonData[i].money+"' alpha='100' tooltext='金额："+jsonData[i].money+"元{br}描述："+jsonData[i].description+"{br}添加时间："+dateString+"' />";
						}
						$.tzChart({
							target:"chart",
							type:type,
							height:"400",
							width:"100%",
							data:"<chart showLegend= '1' enableMultiSlicing= '0' slicingDistance= '15' showPercentValues= '1' showPercentInTooltip= '0' plotTooltext= 'Type : $label{br}Money : $datavalue' theme= 'fint' caption='今日收入' xaxisName='"+new Date().format("yyyy年MM月dd日")+"' yaxisname='收入(元)' numberprefix='￥' palettecolors='#EED17F,#97CBE7,#074868,#B0D67A,#2C560A,#DD9D82' bgcolor='#ffffff' borderalpha='20' canvasborderalpha='0' useplotgradientcolor='0' plotborderalpha='10' placevaluesinside='1' rotatevalues='1' valuefontcolor='#ffffff' showxaxisline='1' xaxislinecolor='#999999' divlinecolor='#999999' divlinedashed='1' showalternatehgridcolor='0' subcaptionfontbold='0' subcaptionfontsize='14'>"+html+"</chart>"
						});
					}
				}
			};
			$.yj_utils.yj_ajax(options);
		}
		/*统计当年出每种收入类型的 每个月消费明细对比*/
		function tm_loadingYearData(type,url,title,year){
			var options={
				url:basePath+url,
				data:{year:year},
				callback:function(data){
					if(isEmpty(data.maps)){
						alert("数据转换异常！");
					}else{
						var jsonData = data.maps;
						var ilength = jsonData.length;
						var ihtml = ""; 
						var seriesname="";
						for(var i=0;i<ilength;i++){
							if(isEmpty(year)){
								seriesname=jsonData[i].type+"年";
							}else{
								seriesname=getTypeName(jsonData[i].type);
							}
							var jhtml="<dataset seriesname='"+seriesname+"'>";
							var month_money=jsonData[i].month_money;
							var jlength=month_money.length;
							for(var j=0;j<jlength;j++){
								jhtml+="<set value='"+month_money[j].money+"'/>";
							}
							jhtml+="</dataset>";
							ihtml+=jhtml;
						}
						$.tzChart({
							target:"chart",
							type:type,
							height:"400",
							width:"100%",
							data:"<chart caption='"+title+"'  yaxisname='收入(元)'  numberprefix='￥' plotgradientcolor='' bgcolor='FFFFFF' showalternatehgridcolor='0' divlinecolor='CCCCCC' showvalues='0' showcanvasborder='1' canvasborderalpha='0' canvasbordercolor='CCCCCC' canvasborderthickness='1' captionpadding='30' linethickness='3' yaxisvaluespadding='15' legendshadow='0' legendborderalpha='0' palettecolors='#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78' showborder='0'>"+
							"<categories>"+
							"<category label='一月' />"+
							"<category label='二月' />"+
							"<category label='三月' />"+
							"<category label='四月' />"+
							"<category label='五月' />"+
							"<category label='六月' />"+
							"<category label='七月' />"+
							"<category label='八月' />"+
							"<category label='九月' />"+
							"<category label='十月' />"+
							"<category label='十一月' />"+
							"<category label='十二月' />"+
							"</categories>"+ihtml+"<styles>"+
							"<definition>"+
							"<style name='captionFont' type='font' size='15' />"+
							"</definition>"+
							"<application>"+
							"<apply toobject='caption' styles='captionfont' />"+
							"</application>"+
							"</styles>"+
							"</chart>"
						}); 
					}
				}
			};
			$.yj_utils.yj_ajax(options);
		}
		/*每年收入*/
		
	</script>
  </body>
</html>