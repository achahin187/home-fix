$(window).on("load",function(){var ele=d3.select("#line-chart"),margin={top:20,right:20,bottom:30,left:50},width=ele.node().getBoundingClientRect().width-margin.left-margin.right,height=500-margin.top-margin.bottom;var formatDate=d3.time.format("%d-%b-%y");var x=d3.time.scale().range([0,width]);var y=d3.scale.linear().range([height,0]);var xAxis=d3.svg.axis().scale(x).orient("bottom");var yAxis=d3.svg.axis().scale(y).orient("left");var line=d3.svg.line().x(function(d){return x(d.date);}).y(function(d){return y(d.close);});var container=ele.append("svg");var svg=container.attr("width",width+margin.left+margin.right).attr("height",height+margin.top+margin.bottom).append("g").attr("transform","translate("+margin.left+","+margin.top+")");d3.tsv("../../../app-assets/data/d3/line/line.tsv",type,function(error,data){if(error)throw error;x.domain(d3.extent(data,function(d){return d.date;}));y.domain(d3.extent(data,function(d){return d.close;}));svg.append("g").attr("class","d3-axis d3-xaxis").attr("transform","translate(0,"+height+")").call(xAxis);svg.append("g").attr("class","d3-axis d3-yaxis").call(yAxis).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").style("fill","#00BCD4").style("font-size",12).text("Price ($)");svg.append("path").datum(data).attr("class","d3-line").attr("d",line).style("fill","none").style("stroke-width",3).style("stroke","#00BCD4");});function type(d){d.date=formatDate.parse(d.date);d.close=+d.close;return d;}
$(window).on('resize',resize);$('.menu-toggle').on('click',resize);function resize(){width=ele.node().getBoundingClientRect().width-margin.left-margin.right;container.attr("width",width+margin.left+margin.right);svg.attr("width",width+margin.left+margin.right);x.range([0,width]);svg.selectAll('.d3-xaxis').call(xAxis);svg.selectAll('.d3-line').attr("d",line);}});