$(window).on("load",function(){require.config({paths:{echarts:'../../../app-assets/vendors/js/charts/echarts'}});require(['echarts','echarts/chart/bar','echarts/chart/line'],function(ec){var myChart=ec.init(document.getElementById('basic-area'));chartOptions={grid:{x:40,x2:20,y:35,y2:25},tooltip:{trigger:'axis'},legend:{data:['New orders','In progress','Closed deals']},color:['#FF4961','#40C7CA','#FF9149'],calculable:true,xAxis:[{type:'category',boundaryGap:false,data:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']}],yAxis:[{type:'value'}],series:[{name:'Closed deals',type:'line',smooth:true,itemStyle:{normal:{areaStyle:{type:'default'}}},data:[10,12,21,54,260,830,710]},{name:'In progress',type:'line',smooth:true,itemStyle:{normal:{areaStyle:{type:'default'}}},data:[30,182,434,791,390,30,10]},{name:'New orders',type:'line',smooth:true,itemStyle:{normal:{areaStyle:{type:'default'}}},data:[1320,1132,601,234,120,90,20]}]};myChart.setOption(chartOptions);$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){setTimeout(function(){myChart.resize();},200);}});});});