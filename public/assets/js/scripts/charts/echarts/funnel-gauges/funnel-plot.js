$(window).on("load",function(){require.config({paths:{echarts:'../../../app-assets/vendors/js/charts/echarts'}});require(['echarts','echarts/chart/funnel','echarts/chart/gauge'],function(ec){var myChart=ec.init(document.getElementById('funnel-plot'));chartOptions={tooltip:{trigger:'item',formatter:"{a} <br/>{b} : {c}%"},legend:{data:['Work','Eat','Commute','Watch TV','Sleep']},color:['#00A5A8','#626E82','#FF7D4D','#FF4558','#28D094'],calculable:true,series:[{name:'Funnel plot',type:'funnel',data:[{value:60,name:'Work'},{value:40,name:'Eat'},{value:20,name:'Commute'},{value:80,name:'Watch TV'},{value:100,name:'Sleep'}]}]};myChart.setOption(chartOptions);$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){setTimeout(function(){myChart.resize();},200);}});});});