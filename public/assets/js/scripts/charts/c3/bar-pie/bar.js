$(window).on("load",function(){var barChart=c3.generate({bindto:'#bar-chart',size:{height:400},color:{pattern:['#E84A5F']},data:{columns:[['data1',30,200,100,400,150,250]],type:'bar'},axis:{rotated:true},grid:{y:{show:true}}});$(".menu-toggle").on('click',function(){barChart.resize();});});