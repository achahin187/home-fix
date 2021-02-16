$(window).on("load",function(){require.config({paths:{echarts:'../../../app-assets/vendors/js/charts/echarts'}});require(['echarts','echarts/chart/bar','echarts/chart/line'],function(ec){var myChart=ec.init(document.getElementById('change-waterfall'));chartOptions={grid:{x:45,x2:10,y:35,y2:25},tooltip:{trigger:'axis',axisPointer:{type:'shadow'},formatter:function(params){var tar;if(params[1].value!='-'){tar=params[1];}
else{tar=params[0];}
return tar.name+'<br/>'+tar.seriesName+': '+tar.value;}},legend:{data:['Expenses','Income']},color:['#666EE8','#FF4961'],xAxis:[{type:'category',data:['January','February','March','April','May','June','July','August','September','October','November','December']}],yAxis:[{type:'value'}],series:[{name:'Aid',type:'bar',stack:'Total',itemStyle:{normal:{barBorderColor:'rgba(0,0,0,0)',color:'rgba(0,0,0,0)'},emphasis:{barBorderColor:'rgba(0,0,0,0)',color:'rgba(0,0,0,0)'}},data:[0,900,1245,1530,1376,1376,1511,1689,1856,1495,1292,992]},{name:'Income',type:'bar',stack:'Total',itemStyle:{normal:{label:{show:true,position:'top'}}},data:[900,345,393,'-','-',135,178,286,'-','-','-']},{name:'Expenses',type:'bar',stack:'Total',itemStyle:{normal:{label:{show:true,position:'bottom'}}},data:['-','-','-',108,154,'-','-','-',119,361,203,300]}]};myChart.setOption(chartOptions);$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){setTimeout(function(){myChart.resize();},200);}});});});