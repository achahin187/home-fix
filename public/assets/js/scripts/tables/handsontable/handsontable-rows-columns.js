document.addEventListener("DOMContentLoaded",function(){var example=document.getElementById('scrolling'),hot1;hot1=new Handsontable(example,{data:Handsontable.helper.createSpreadsheetData(100,100),height:400,colWidths:50,rowHeights:32,rowHeaders:true,colHeaders:true});var myData=Handsontable.helper.createSpreadsheetData(100,50),container=document.getElementById('fixing'),hot;hot=new Handsontable(container,{data:myData,colWidths:[47,47,47,47,47,47,47,47,47,47],rowHeaders:true,colHeaders:true,fixedRowsTop:2,fixedColumnsLeft:2});var container=document.getElementById('resizing'),hot;hot=new Handsontable(container,{data:Handsontable.helper.createSpreadsheetData(10,10),rowHeaders:true,colHeaders:true,colWidths:[55,80,80,80,80,80,80],rowHeights:[50,40,100],manualColumnResize:true,manualRowResize:true});var moving=document.getElementById('moving'),hot;hot=new Handsontable(moving,{data:Handsontable.helper.createSpreadsheetData(100,20),rowHeaders:true,colHeaders:true,manualColumnMove:true,manualRowMove:true});});