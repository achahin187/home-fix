google.load('visualization','1.0',{'packages':['corechart']});google.setOnLoadCallback(drawPieDiffRadius);function drawPieDiffRadius(){var oldData=google.visualization.arrayToDataTable([['Major','Degrees'],['Business',256070],['Education',108034],['Social Sciences & History',127101],['Health',81863],['Psychology',74194]]);var newData=google.visualization.arrayToDataTable([['Major','Degrees'],['Business',358293],['Education',101265],['Social Sciences & History',172780],['Health',129634],['Psychology',97216]]);var options_diff_radius={title:'My Daily Activities',height:400,fontSize:12,colors:['#99B898','#FECEA8','#FF847C','#E84A5F','#474747'],chartArea:{left:'5%',width:'90%',height:350},diff:{innerCircle:{radiusFactor:0.8}}};var pieDiffRadius=new google.visualization.PieChart(document.getElementById('pie-diff-radius'));var diffData=pieDiffRadius.computeDiff(oldData,newData);pieDiffRadius.draw(diffData,options_diff_radius);}
$(function(){$(window).on('resize',resize);$(".menu-toggle").on('click',resize);function resize(){drawPieDiffRadius();}});