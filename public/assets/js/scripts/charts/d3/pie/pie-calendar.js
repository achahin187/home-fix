$(window).on("load",function(){var d3CalendarGlobals=function(){var ele=d3.select("#pie-calendar"),calendarWidth=1380,calendarHeight=820,gridXTranslation=10,gridYTranslation=40,cellColorForCurrentMonth='#EAEAEA',cellColorForPreviousMonth='#FFFFFF',counter=0,currentMonth=new Date().getMonth(),monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],datesGroup;function publicCalendarWidth(){return calendarWidth;}
function publicCalendarHeight(){return calendarHeight;}
function publicGridXTranslation(){return gridXTranslation;}
function publicGridYTranslation(){return gridYTranslation;}
function publicGridWidth(){return calendarWidth-10;}
function publicGridHeight(){return calendarHeight-40;}
function publicCellWidth(){return publicGridWidth()/7;}
function publicCellHeight(){return publicGridHeight()/5;}
function publicGetDatesGroup(){return datesGroup;}
function publicSetDatesGroup(value){datesGroup=value;}
function publicIncrementCounter(){counter=counter+1;}
function publicDecrementCounter(){counter=counter-1;}
function publicMonthToDisplay(){var dateToDisplay=new Date();dateToDisplay.setMonth(currentMonth+counter);return dateToDisplay.getMonth();}
function publicMonthToDisplayAsText(){return monthNames[publicMonthToDisplay()];}
function publicYearToDisplay(){var dateToDisplay=new Date();dateToDisplay.setMonth(currentMonth+counter);return dateToDisplay.getFullYear();}
function publicGridCellPositions(){var cellPositions=[];for(y=0;y<5;y++){for(x=0;x<7;x++){cellPositions.push([x*publicCellWidth(),y*publicCellHeight()]);}}
return cellPositions;}
function publicDaysInMonth(){var daysArray=[];var firstDayOfTheWeek=new Date(publicYearToDisplay(),publicMonthToDisplay(),1).getDay();var daysInPreviousMonth=new Date(publicYearToDisplay(),publicMonthToDisplay(),0).getDate();for(i=1;i<=firstDayOfTheWeek;i++){daysArray.push([daysInPreviousMonth-firstDayOfTheWeek+i,cellColorForCurrentMonth]);}
var daysInMonth=new Date(publicYearToDisplay(),publicMonthToDisplay()+1,0).getDate();for(i=1;i<=daysInMonth;i++){daysArray.push([i,cellColorForPreviousMonth]);}
var daysRequiredFromNextMonth=35-daysArray.length;for(i=1;i<=daysRequiredFromNextMonth;i++){daysArray.push([i,cellColorForCurrentMonth]);}
return daysArray.slice(0,35);}
return{calendarWidth:publicCalendarWidth(),calendarHeight:publicCalendarHeight(),gridXTranslation:publicGridXTranslation(),gridYTranslation:publicGridYTranslation(),gridWidth:publicGridWidth(),gridHeight:publicGridHeight(),cellWidth:publicCellWidth(),cellHeight:publicCellHeight(),getDatesGroup:publicGetDatesGroup,setDatesGroup:publicSetDatesGroup,incrementCounter:publicIncrementCounter,decrementCounter:publicDecrementCounter,monthToDisplay:publicMonthToDisplay(),monthToDisplayAsText:publicMonthToDisplayAsText,yearToDisplay:publicYearToDisplay,gridCellPositions:publicGridCellPositions(),daysInMonth:publicDaysInMonth}}();$(document).ready(function(){renderCalendarGrid();renderDaysOfMonth();$('#back').on('click',displayPreviousMonth);$('#forward').on('click',displayNextMonth);});function displayPreviousMonth(){d3CalendarGlobals.decrementCounter();renderDaysOfMonth();}
function displayNextMonth(){d3CalendarGlobals.incrementCounter();renderDaysOfMonth();}
function renderDaysOfMonth(month,year){$('#currentMonth').text(d3CalendarGlobals.monthToDisplayAsText()+' '+d3CalendarGlobals.yearToDisplay());var daysInMonthToDisplay=d3CalendarGlobals.daysInMonth();var cellPositions=d3CalendarGlobals.gridCellPositions;d3CalendarGlobals.datesGroup.selectAll("text").data(daysInMonthToDisplay).attr("x",function(d,i){return cellPositions[i][0];}).attr("y",function(d,i){return cellPositions[i][1];}).attr("dx",20).attr("dy",20).attr("transform","translate("+d3CalendarGlobals.gridXTranslation+","+d3CalendarGlobals.gridYTranslation+")").text(function(d){return d[0];});d3CalendarGlobals.calendar.selectAll("rect").data(daysInMonthToDisplay).style("fill",function(d){return d[1];});drawGraphsForMonthlyData();}
function drawGraphsForMonthlyData(){var data=getDataForMonth();var outerRadius=d3CalendarGlobals.cellWidth/3;var innerRadius=0;var pie=d3.layout.pie();var color=d3.scale.ordinal().range(["#99B898","#FECEA8","#FF847C","#E84A5F","#F8B195","#F67280","#C06C84"]);var arc=d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);var indexedPieData=[];for(i=0;i<data.length;i++){var pieSlices=pie(data[i]);for(j=0;j<pieSlices.length;j++){indexedPieData.push([pieSlices[j],i,j]);}}
var cellPositions=d3CalendarGlobals.gridCellPositions;d3CalendarGlobals.chartsGroup.selectAll("g.arc").remove();var arcs=d3CalendarGlobals.chartsGroup.selectAll("g.arc").data(indexedPieData).enter().append("g").attr("class","arc").attr("transform",function(d){var currentDataIndex=d[1];return "translate("+(outerRadius+d3CalendarGlobals.gridXTranslation*5+cellPositions[currentDataIndex][0])+", "+(outerRadius+d3CalendarGlobals.gridYTranslation*1.25+cellPositions[currentDataIndex][1])+")";});arcs.append("path").attr("fill",function(d,i){return color(d[2]);}).attr("d",function(d,i){return arc(d[0]);});arcs.append("text").attr("transform",function(d,i){return "translate("+arc.centroid(d[0])+")";}).attr("text-anchor","middle").text(function(d,i){return d[0].value;}).style("fill","#FFF");}
function getDataForMonth(){var randomData=[];for(var i=0;i<35;i++){randomData.push([Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)]);}
return randomData;}
function renderCalendarGrid(month,year){d3CalendarGlobals.calendar=d3.select("#pie-calendar").append("svg").attr("class","calendar").attr("width",d3CalendarGlobals.calendarWidth).attr("height",d3CalendarGlobals.calendarHeight).append("g");var cellPositions=d3CalendarGlobals.gridCellPositions;d3CalendarGlobals.calendar.selectAll("rect").data(cellPositions).enter().append("rect").attr("x",function(d){return d[0];}).attr("y",function(d){return d[1];}).attr("width",d3CalendarGlobals.cellWidth).attr("height",d3CalendarGlobals.cellHeight).style("stroke","#555").style("fill","white").attr("transform","translate("+d3CalendarGlobals.gridXTranslation+","+d3CalendarGlobals.gridYTranslation+")");var daysOfTheWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];d3CalendarGlobals.calendar.selectAll("headers").data([0,1,2,3,4,5,6]).enter().append("text").attr("x",function(d){return cellPositions[d][0];}).attr("y",function(d){return cellPositions[d][1];}).attr("dx",d3CalendarGlobals.gridXTranslation+5).attr("dy",30).text(function(d){return daysOfTheWeek[d]});d3CalendarGlobals.datesGroup=d3CalendarGlobals.calendar.append("svg:g");var daysInMonthToDisplay=d3CalendarGlobals.daysInMonth();d3CalendarGlobals.datesGroup.selectAll("daysText").data(daysInMonthToDisplay).enter().append("text").attr("x",function(d,i){return cellPositions[i][0];}).attr("y",function(d,i){return cellPositions[i][1];}).attr("dx",20).attr("dy",20).attr("transform","translate("+d3CalendarGlobals.gridXTranslation+","+d3CalendarGlobals.gridYTranslation+")").text(function(d){return d[0];});d3CalendarGlobals.chartsGroup=d3CalendarGlobals.calendar.append("svg:g");drawGraphsForMonthlyData();}
$(window).on('resize',resize);$('.menu-toggle').on('click',resize);function resize(){width=ele.node().getBoundingClientRect().width-margin.left-margin.right;container.attr("width",width+margin.left+margin.right);svg.attr("width",width+margin.left+margin.right);x.range([0,width]);svg.selectAll('.d3-xaxis').call(xAxis);svg.selectAll('.d3-line').attr("d",line);}});