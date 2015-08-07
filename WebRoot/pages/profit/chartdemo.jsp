<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp" %>
<!-- 通用标签的导入 -->
<html>
<head>
<title>My first chart using FusionCharts Suite XT</title>
<script type="text/javascript" src="${basePath}/js/chart/fusioncharts.js"></script>
<script type="text/javascript" src="${basePath}/js/chart/fusioncharts.theme.fint.js"></script>
<script type="text/javascript" src="${basePath}/js/jquery-1.11.1.min.js"></script>
</head>
<body>
<div id="target">FusionCharts XT will load here!</div>
<div id="target2">FusionCharts XT will load here!</div>
<div id="target3">FusionCharts XT will load here!</div>
<script type="text/javascript">
//fusioncharts.theme.fint.js == column2d,column3d,line,area2d,bar2d,pie2d,pie3d,doughnut2d,doughnut3d,pareto2d,pareto3d 



$.tzChart({target:"target3",type:"pie2d",data:"<chart caption='2014年第三季度统计收入明细' subcaption='keke老师的收入' yaxisname='月/元' plotgradientcolor='' bgcolor='ffffff' showalternatehgridcolor='0' showplotborder='0' divlinecolor='#CCCCCC' showvalues='1' showcanvasborder='0' canvasbordercolor='#CCCCCC' canvasborderthickness='1' captionpadding='30' linethickness='3' yaxisvaluespadding='15' showshadow='0' labelsepchar=': ' basefontcolor='000000' labeldisplay='AUTO' numberscalevalue='1000,1000,1000'  numberSuffix='%' animation='0' palettecolors='e44a00' showborder='0'>"+
		"<set label='Football' value='10' alpha='100' tooltext='Popular in: {br}Europe{br}Africa{br}Asia{br}Americas' />"+
        "<set label='Cricket' value='30' alpha='90' tooltext='Popular in: {br}India{br}UK{br}Pakistan{br}England{br}Australia' />"+
        "<set label='Field Hockey' value='50' alpha='80' tooltext='Popular in: {br}Asia{br}Europe{br}Africa{br}Australia' />"+
        "<set label='Tennis' value='33' alpha='70' tooltext='Popular in: {br}Europe{br}Americas{br}Asia' />"+
        "<set label='Volleyball' value='55' alpha='55' tooltext='Popular in: {br}Asia{br}Europe{br}Americas{brAustralia' />"+
        "<set label='Table Tennis' value='21' alpha='55' tooltext='Popular in: {br}Asia{br}Europe{br}Africa{br}Americas' />"+
        "<set label='Baseball' value='45' alpha='40' tooltext='Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic' />"+
        "<set label='Golf' value='88' alpha='30' tooltext='Popular in: {br}US{br}Canada{br}Europe' />"+
        "<set label='Basketball' value='99' alpha='30' tooltext='Popular in: {br}US{br}Canada' />"+
        "<set label='American Football' value='22' alpha='25' tooltext='Popular in: {br}US' />"+
    "</chart>"});
</script>

</body>
</html>