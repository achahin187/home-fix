$(window).on("load",function(){require.config({paths:{echarts:'../../../app-assets/vendors/js/charts/echarts'}});require(['echarts','echarts/chart/scatter',],function(ec){var myChart=ec.init(document.getElementById('time-data'));chartOptions={grid:{x:40,x2:40,y:55,y2:80},tooltip:{trigger:'axis',axisPointer:{show:true,type:'cross',lineStyle:{type:'dashed',width:1}}},dataZoom:{show:true,start:30,end:70},legend:{data:['series1']},dataRange:{min:0,max:100,orient:'horizontal',y:30,x:'center',color:['lightgreen','orange'],splitNumber:5},color:['#00A5A8','#FF7D4D','#FF4558'],calculable:true,xAxis:[{type:'time',splitNumber:10}],yAxis:[{type:'value'}],animation:false,series:[{name:'series1',type:'scatter',tooltip:{trigger:'axis',formatter:function(params){var date=new Date(params.value[0]);return params.seriesName
+' （'
+date.getFullYear()+'-'
+(date.getMonth()+1)+'-'
+date.getDate()+' '
+date.getHours()+':'
+date.getMinutes()
+'）<br/>'
+params.value[1]+', '
+params.value[2];},axisPointer:{type:'cross',lineStyle:{type:'dashed',width:1}}},symbolSize:function(value){return Math.round(value[2]/10);},data:(function(){var d=[];var len=0;var now=new Date();var value;while(len++<1500){d.push([new Date(2014,9,1,0,Math.round(Math.random()*10000)),(Math.random()*30).toFixed(2)-0,(Math.random()*100).toFixed(2)-0]);}
return d;})()}]};myChart.setOption(chartOptions);$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){setTimeout(function(){myChart.resize();},200);}});});});