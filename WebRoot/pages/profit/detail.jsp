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
	<script src="js/chart/tzchart.js"></script>
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
	    	<div class="cheader"><p class="ta_title">收入明细列表</p></div>
	    	<!--表格-->
			<div id="contentbox">
				<!--标题-->
				<!--日期-->
				<div class="ta_selete tmui-buttons" style="display: none;">
					<div class="fl"><a class="fl" href="profit/add">添加收入明细</a> </div>
					<div class="fl">
						&nbsp;&nbsp;类型:
						<select id="typeId" onchange="tm_searchProfit(this,false)">
							<option value="">--所有类型--</option>
			          		<c:forEach var="pt" items="${maps}">
			          			<option value="${pt.id}">${pt.name}</option>
			          		</c:forEach>
						</select>
						金额范围
						<input type="text" id="minMoney" class="range">到 
						<input type="text" id="maxMoney" class="range" > 
						<input type="button" onclick="tm_searchProfit(this,true)" value="搜 索">
					</div>
				</div>
				<div>
					<select onchange="tm_change_line(this)" class="fr">
							<option>--请选择--</option>
							<option value="mscolumn2d">mscolumn2d</option>
							<option value="mscolumn3d">mscolumn3d</option>
							<option value="msline">msline</option>
							<option value="msbar2d">msbar2d</option>
							<option value="msbar3d">msbar3d</option>
							<option value="msarea">msarea</option>
							<option value="marimekko">marimekko</option>
							<option value="zoomline">zoomline</option>
					</select>
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
			
			tm_loadingData();
			tm_loadingYear();
			tm_loadingType();
			//testJson()；
		});
		
		function tm_change_line(obj){
			var value = obj.value;
			tm_loadingType(value);
		}
		
		/*统计当年出每种收入类型的 每个月消费明细对比*/
		function tm_loadingType(type){
			$.ajax({
				type:"post",
				url:basePath+"/json/profit/detailType",
				success:function(data){
					var jsonData = eval("("+data.result+")");
					var arr = [];
					for(var key in jsonData){
						var jdata = jsonData[key];
						//把你表中的分类查询出来，缓存起来返回一个hashMap id=key namev=alue
						/* var ldata = tm_getType(key); */
						/* var label = ldata.name,color=ldata.color; */
						var html = "<dataset seriesname='"+label+"' color='"+color+"'>";
						var length = jdata.length;
						for(var i=0;i<length;i++){
							/* for(var k in jdata[i]){
								html+="<set label='"+jdata[i][k]+"' value='"+jdata[i][k]+"' />";
							} */
						}
						html+="</dataset>";
						arr.push(html);
					}
					if(isEmpty(type))type="mscolumn2d";
					$.tzChart({target:"chart3",type:type,height:"480",width:"100%",data:
					"<chart caption='2014年度收入类型统计明细对比'  subcaption='' xaxisname='月份' yaxisname='每月/元' palette='3' bgcolor='e5e5e5' canvasbgcolor='66D6FF' canvasbgalpha='5' canvasborderthickness='1' canvasborderalpha='20' legendshadow='0' numbersuffix='￥' showvalues='0' alternatehgridcolor='ffffff' alternatehgridalpha='100' showborder='0' legendborderalpha='0' legendiconscale='1.5' divlineisdashed='1'>"+
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
					"</categories>"+arr.toString()+
					"<styles>"+
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
			});
		}
		
		function tm_getType(key){
			//执行一个ajax到后台去查询所有的分类
			var json = {
				1:{name:"工资",color:"F97D10"},	
				2:{name:"红包",color:"FF0000"},	
				3:{name:"基金",color:"141414"},	
				5:{name:"生活费",color:"FF0045"},	
				6:{name:"理财",color:"CC1414"}
			};
			return json[key];
		}
		
		/*统计今天的收入金额排行*/
		function tm_loadingData(){
			$.ajax({
				type:"post",
				url:basePath+"/json/profit/detailAjax",
				success:function(data){
					var jsonData = data.profitBeans;
					var length = jsonData.length;
					var html = "";
					for(var i=0;i<length;i++){
						html+="<set  value='"+jsonData[i].money+"' alpha='100' tooltext='描述: {br}"+jsonData[i].description+"{br}添加时间:{br}"+jsonData[i].createTime+"' />";
					}
					$.tzChart({target:"chart",type:"pie2d",height:"360",width:"31%",data:"<chart caption='今天收入金额排行' numberprefix='￥' plotgradientcolor='' bgcolor='e5e5e5' showalternatehgridcolor='0' showplotborder='0' divlinecolor='CCCCCC' showvalues='1' showcanvasborder='0' canvasbordercolor='CCCCCC' canvasborderthickness='1' yaxismaxvalue='30000' captionpadding='30' linethickness='3' sshowanchors='0' yaxisvaluespadding='15' showlegend='1' use3dlighting='0' showshadow='0' legendshadow='0' legendborderalpha='0' showborder='0' palettecolors='#111111,#4684b2,#ff00000,#B0D67A,#2C560A,#DD9D82'>"+html+"</chart>"});
				}
			});
		}
		
		//实现本周，本年，本月,三天前，昨天的收入情况
		function tm_loadingYear(){
			$.ajax({
				type:"post",
				url:basePath+"/json/profit/detailYear",
				success:function(data){
					/* var jsonData = eval("("+data.result+")"); */
					var html = "";
					/* for(var key in jsonData){
						html+="<set label='"+key+"'  value='"+jsonData[key]+"'/>";
					} */
					$.tzChart({target:"chart2",type:"column2d",height:"360",width:"67%",data:"<chart caption='2014年度收入明细' yaxisname='收入金额(月/元)' numberprefix='￥'  bgcolor='e5e5e5' showborder='0' theme='fint'>"+html+"</chart>"});
				}
			});
		}
		
		
		
		
		

		//测试javascript如何获取java集合和实体的数据
		function testJson(){
// 			var json1 = {id:1,money:100};
// 			var json2 = {id:2,money:200};
// 			var arr = [];
// 			arr.push(json1);
// 			arr.push(json2);
// 			for(var i=0;i<arr.length;i++){
// 				alert(arr[i].id+"==="+arr[i].money);
// 			}
			
			//获取javascript对象的key和value的方式
			// 		var jsonData  = {
			// 				1:100,
			// 				2:200,
			// 				3:89
			// 		}
					
			// 		for(var key in jsonData){
			// 			alert(key+"==="+jsonData[key]);
			// 		}
			
			$.ajax({
				type:"post",
				url:basePath+"/json/profit/testJson",
				success:function(data){
					//获取集合
					/*var jsonString = data.result;
					var jsonData = eval("("+jsonString+")");
					for(var i=0;i<jsonData.length;i++){
						$(".page").prepend("<div>"+jsonData[i].id+"==="+jsonData[i].money+"</div>")
					}*/
					
					
					//获取单条
					var jsonString = data.result;
					var jsonData = eval("("+jsonString+")");
					alert(jsonData.id+"==="+jsonData.money);
				}
			});
		};
		
	</script>
  </body>
</html>