$(window).on("load",function(){require.config({paths:{echarts:'../../../app-assets/vendors/js/charts/echarts'}});require(['echarts','echarts/chart/bar','echarts/chart/line','echarts/chart/scatter','echarts/chart/pie'],function(ec){var myChart=ec.init(document.getElementById('column-line'));chartOptions={grid:{x:40,x2:40,y:45,y2:25},tooltip:{trigger:'axis'},legend:{data:['Evaporation','Precipitation','Average temperature']},color:['#00A5A8','#FF4558','#FF7D4D'],calculable:true,xAxis:[{type:'category',data:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}],yAxis:[{type:'value',name:'Water',axisLabel:{formatter:'{value} ml'}},{type:'value',name:'Temperature',axisLabel:{formatter:'{value} °C'}}],series:[{name:'Evaporation',type:'bar',data:[2.0,4.9,7.0,23.2,25.6,76.7,135.6,162.2,32.6,20.0,6.4,3.3]},{name:'Precipitation',type:'bar',data:[2.6,5.9,9.0,26.4,28.7,70.7,175.6,182.2,48.7,18.8,6.0,2.3]},{name:'Average temperature',type:'line',yAxisIndex:1,data:[2.0,2.2,3.3,4.5,6.3,10.2,20.3,23.4,23.0,16.5,12.0,6.2]}]};myChart.setOption(chartOptions);$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){setTimeout(function(){myChart.resize();},200);}});});});