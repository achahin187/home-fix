google.load('visualization','1.0',{'packages':['corechart']});google.setOnLoadCallback(drawCombo);function drawCombo(){var data=google.visualization.arrayToDataTable([['Month','Bolivia','Ecuador','Madagascar','Papua New Guinea','Rwanda','Average'],['2004/05',165,938,522,998,450,614.6],['2005/06',135,1120,599,1268,288,682],['2006/07',157,1167,587,807,397,623],['2007/08',139,1110,615,968,215,609.4],['2008/09',136,691,629,1026,366,569.6]]);var options_bar={title:'Monthly Coffee Production by Country',seriesType:'bars',series:{5:{type:'line'}},colors:['#99B898','#FECEA8','#FF847C','#E84A5F','#474747'],height:450,fontSize:12,chartArea:{left:'5%',width:'90%',height:350},vAxis:{title:'Cups',gridlines:{color:'#e9e9e9',count:5},minValue:0},hAxis:{title:'Month',gridlines:{color:'#e9e9e9',count:5},minValue:0},legend:{position:'top',alignment:'center',textStyle:{fontSize:12}}};var bar=new google.visualization.ComboChart(document.getElementById('combo-chart'));bar.draw(data,options_bar);}
$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){drawCombo();}});