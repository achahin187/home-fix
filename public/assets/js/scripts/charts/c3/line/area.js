$(window).on("load",function(){var areaChart=c3.generate({bindto:'#area-chart',size:{height:400},point:{r:4},color:{pattern:['#673AB7','#E91E63']},data:{columns:[['data1',300,350,300,0,0,0],['data2',130,100,140,200,150,50]],types:{data1:'area',data2:'area-spline'}},grid:{y:{show:true}}});$(".menu-toggle").on('click',function(){areaChart.resize();});});