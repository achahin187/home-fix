$(window).on("load",function(){require.config({paths:{echarts:'../../../app-assets/vendors/js/charts/echarts'}});require(['echarts','echarts/chart/funnel','echarts/chart/gauge'],function(ec){var myChart=ec.init(document.getElementById('angular-gauge'));anggaugeOptions={tooltip:{formatter:"{a} <br/>{b} : {c}%"},toolbox:{show:true,feature:{mark:{show:true},restore:{show:true},saveAsImage:{show:true}}},calculable:true,series:[{name:'Personalized Dashboard',type:'gauge',center:['50%','50%'],radius:[0,'75%'],startAngle:140,endAngle:-140,min:0,max:100,precision:0,splitNumber:10,axisLine:{show:true,lineStyle:{color:[[0.2,'lightgreen'],[0.4,'orange'],[0.8,'skyblue'],[1,'#ff4500']],width:30}},axisTick:{show:true,splitNumber:5,length:8,lineStyle:{color:'#eee',width:1,type:'solid'}},axisLabel:{show:true,formatter:function(v){switch(v+''){case '10':return 'Weak';case '30':return 'Low';case '60':return 'In';case '90':return 'High';default:return '';}},textStyle:{color:'#333'}},splitLine:{show:true,length:30,lineStyle:{color:'#eee',width:2,type:'solid'}},pointer:{length:'80%',width:8,color:'auto'},title:{show:true,offsetCenter:['-65%',-10],textStyle:{color:'#333',fontSize:15}},detail:{show:true,backgroundColor:'rgba(0,0,0,0)',borderWidth:0,borderColor:'#ccc',width:100,height:40,offsetCenter:['-60%',10],formatter:'{value}%',textStyle:{color:'auto',fontSize:30}},data:[{value:50,name:'Dashboard'}]}]};myChart.setOption(anggaugeOptions);$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){setTimeout(function(){myChart.resize();},200);}
clearInterval(timeTicket);var timeTicket=setInterval(function(){anggaugeOptions.series[0].data[0].value=(Math.random()*100).toFixed(2)-0;myChart.setOption(anggaugeOptions,true);},2000);});});});