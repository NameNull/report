<html>
<head>
<title>My First Column 3D chart</title>
<script type="text/javascript" src="/report/js/chart/fusioncharts.js"></script>
<script type="text/javascript" src="/report/js/chart/fusioncharts.theme.fint.js"></script>
<script type="text/javascript">

FusionCharts.ready(function () {
    var demographicsChart = new FusionCharts({
        "type": "column3d",
        "renderAt": "chartContainer",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "showLegend": "1",
                "enableMultiSlicing": "0",
                "slicingDistance": "15",

                //To show the values in percentage
                "showPercentValues": "1",
                "showPercentInTooltip": "0",
                "plotTooltext": "Type : $label{br}Money : $datavalue",
                "theme": "fint"
            },
            "data": [{
                "label": "Teenage",
                "value": "1250400"
            }, {
                "label": "Adult",
                "value": "1463300"
            }, {
                "label": "Mid-age",
                "value": "1050700"
            }, {
                "label": "Senior",
                "value": "491000"
            }]
        }
    });

    demographicsChart.render();
});

</script>
</head>
<body>
 <div id="chartContainer">A pie 3D chart will load here!</div>
</body>
</html>