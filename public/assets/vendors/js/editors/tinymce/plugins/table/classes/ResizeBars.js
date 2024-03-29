define("tinymce/tableplugin/ResizeBars",["tinymce/util/Tools","tinymce/util/VK"],function(Tools,VK){var hoverTable;return function(editor){var RESIZE_BAR_CLASS='mce-resize-bar',RESIZE_BAR_ROW_CLASS='mce-resize-bar-row',RESIZE_BAR_ROW_CURSOR_STYLE='row-resize',RESIZE_BAR_ROW_DATA_ATTRIBUTE='data-row',RESIZE_BAR_ROW_DATA_INITIAL_TOP_ATTRIBUTE='data-initial-top',RESIZE_BAR_COL_CLASS='mce-resize-bar-col',RESIZE_BAR_COL_CURSOR_STYLE='col-resize',RESIZE_BAR_COL_DATA_ATTRIBUTE='data-col',RESIZE_BAR_COL_DATA_INITIAL_LEFT_ATTRIBUTE='data-initial-left',RESIZE_BAR_THICKNESS=4,RESIZE_MINIMUM_WIDTH=10,RESIZE_MINIMUM_HEIGHT=10,RESIZE_BAR_DRAGGING_CLASS='mce-resize-bar-dragging';var percentageBasedSizeRegex=new RegExp(/(\d+(\.\d+)?%)/),pixelBasedSizeRegex=new RegExp(/px|em/);var delayDrop,dragging,blockerElement,dragBar,lastX,lastY;function getTopEdge(index,row){return{index:index,y:editor.dom.getPos(row).y};}
function getBottomEdge(index,row){return{index:index,y:editor.dom.getPos(row).y+row.offsetHeight};}
function getLeftEdge(index,cell){return{index:index,x:editor.dom.getPos(cell).x};}
function getRightEdge(index,cell){return{index:index,x:editor.dom.getPos(cell).x+cell.offsetWidth};}
function isRtl(){var dir=editor.getBody().dir;return dir==='rtl';}
function isInline(){return editor.inline;}
function getBody(){return isInline?editor.getBody().ownerDocument.body:editor.getBody();}
function getInnerEdge(index,cell){return isRtl()?getRightEdge(index,cell):getLeftEdge(index,cell);}
function getOuterEdge(index,cell){return isRtl()?getLeftEdge(index,cell):getRightEdge(index,cell);}
function getPercentageWidthFallback(element,table){return getComputedStyleSize(element,'width')/getComputedStyleSize(table,'width')*100;}
function getComputedStyleSize(element,property){var widthString=editor.dom.getStyle(element,property,true);var width=parseInt(widthString,10);return width;}
function getCurrentTablePercentWidth(table){var tableWidth=getComputedStyleSize(table,'width');var tableParentWidth=getComputedStyleSize(table.parentElement,'width');return tableWidth/tableParentWidth*100;}
function getCellPercentDelta(table,delta){var tableWidth=getComputedStyleSize(table,'width');return delta/tableWidth*100;}
function getTablePercentDelta(table,delta){var tableParentWidth=getComputedStyleSize(table.parentElement,'width');return delta/tableParentWidth*100;}
function findPositions(getInner,getOuter,thingsToMeasure){var tablePositions=[];for(var i=1;i<thingsToMeasure.length;i++){var item=thingsToMeasure[i].element;tablePositions.push(getInner(i-1,item));}
var lastTableLineToMake=thingsToMeasure[thingsToMeasure.length-1];tablePositions.push(getOuter(thingsToMeasure.length-1,lastTableLineToMake.element));return tablePositions;}
function clearBars(){var bars=editor.dom.select('.'+RESIZE_BAR_CLASS,getBody());Tools.each(bars,function(bar){editor.dom.remove(bar);});}
function refreshBars(tableElement){clearBars();drawBars(tableElement);}
function generateBar(classToAdd,cursor,left,top,height,width,indexAttr,index){var bar={'data-mce-bogus':'all','class':RESIZE_BAR_CLASS+' '+classToAdd,'unselectable':'on','data-mce-resize':false,style:'cursor: '+cursor+'; '+
'margin: 0; '+
'padding: 0; '+
'position: absolute; '+
'left: '+left+'px; '+
'top: '+top+'px; '+
'height: '+height+'px; '+
'width: '+width+'px; '};bar[indexAttr]=index;return bar;}
function drawRows(rowPositions,tableWidth,tablePosition){Tools.each(rowPositions,function(rowPosition){var left=tablePosition.x,top=rowPosition.y-RESIZE_BAR_THICKNESS/2,height=RESIZE_BAR_THICKNESS,width=tableWidth;editor.dom.add(getBody(),'div',generateBar(RESIZE_BAR_ROW_CLASS,RESIZE_BAR_ROW_CURSOR_STYLE,left,top,height,width,RESIZE_BAR_ROW_DATA_ATTRIBUTE,rowPosition.index));});}
function drawCols(cellPositions,tableHeight,tablePosition){Tools.each(cellPositions,function(cellPosition){var left=cellPosition.x-RESIZE_BAR_THICKNESS/2,top=tablePosition.y,height=tableHeight,width=RESIZE_BAR_THICKNESS;editor.dom.add(getBody(),'div',generateBar(RESIZE_BAR_COL_CLASS,RESIZE_BAR_COL_CURSOR_STYLE,left,top,height,width,RESIZE_BAR_COL_DATA_ATTRIBUTE,cellPosition.index));});}
function getTableDetails(table){return Tools.map(table.rows,function(row){var cells=Tools.map(row.cells,function(cell){var rowspan=cell.hasAttribute('rowspan')?parseInt(cell.getAttribute('rowspan'),10):1;var colspan=cell.hasAttribute('colspan')?parseInt(cell.getAttribute('colspan'),10):1;return{element:cell,rowspan:rowspan,colspan:colspan};});return{element:row,cells:cells};});}
function getTableGrid(tableDetails){function key(rowIndex,colIndex){return rowIndex+','+colIndex;}
function getAt(rowIndex,colIndex){return access[key(rowIndex,colIndex)];}
function getAllCells(){var allCells=[];Tools.each(rows,function(row){allCells=allCells.concat(row.cells);});return allCells;}
function getAllRows(){return rows;}
var access={};var rows=[];var maxRows=0;var maxCols=0;Tools.each(tableDetails,function(row,rowIndex){var currentRow=[];Tools.each(row.cells,function(cell){var start=0;while(access[key(rowIndex,start)]!==undefined){start++;}
var current={element:cell.element,colspan:cell.colspan,rowspan:cell.rowspan,rowIndex:rowIndex,colIndex:start};for(var i=0;i<cell.colspan;i++){for(var j=0;j<cell.rowspan;j++){var cr=rowIndex+j;var cc=start+i;access[key(cr,cc)]=current;maxRows=Math.max(maxRows,cr+1);maxCols=Math.max(maxCols,cc+1);}}
currentRow.push(current);});rows.push({element:row.element,cells:currentRow});});return{grid:{maxRows:maxRows,maxCols:maxCols},getAt:getAt,getAllCells:getAllCells,getAllRows:getAllRows};}
function range(start,end){var r=[];for(var i=start;i<end;i++){r.push(i);}
return r;}
function decide(getBlock,isSingle,getFallback){var inBlock=getBlock();var singleInBlock;for(var i=0;i<inBlock.length;i++){if(isSingle(inBlock[i])){singleInBlock=inBlock[i];}}
return singleInBlock?singleInBlock:getFallback();}
function getColumnBlocks(tableGrid){var cols=range(0,tableGrid.grid.maxCols);var rows=range(0,tableGrid.grid.maxRows);return Tools.map(cols,function(col){function getBlock(){var details=[];for(var i=0;i<rows.length;i++){var detail=tableGrid.getAt(i,col);if(detail&&detail.colIndex===col){details.push(detail);}}
return details;}
function isSingle(detail){return detail.colspan===1;}
function getFallback(){var item;for(var i=0;i<rows.length;i++){item=tableGrid.getAt(i,col);if(item){return item;}}
return null;}
return decide(getBlock,isSingle,getFallback);});}
function getRowBlocks(tableGrid){var cols=range(0,tableGrid.grid.maxCols);var rows=range(0,tableGrid.grid.maxRows);return Tools.map(rows,function(row){function getBlock(){var details=[];for(var i=0;i<cols.length;i++){var detail=tableGrid.getAt(row,i);if(detail&&detail.rowIndex===row){details.push(detail);}}
return details;}
function isSingle(detail){return detail.rowspan===1;}
function getFallback(){return tableGrid.getAt(row,0);}
return decide(getBlock,isSingle,getFallback);});}
function drawBars(table){var tableDetails=getTableDetails(table);var tableGrid=getTableGrid(tableDetails);var rows=getRowBlocks(tableGrid);var cols=getColumnBlocks(tableGrid);var tablePosition=editor.dom.getPos(table);var rowPositions=rows.length>0?findPositions(getTopEdge,getBottomEdge,rows):[];var colPositions=cols.length>0?findPositions(getInnerEdge,getOuterEdge,cols):[];drawRows(rowPositions,table.offsetWidth,tablePosition);drawCols(colPositions,table.offsetHeight,tablePosition);}
function deduceSize(deducables,index,isPercentageBased,table){if(index<0||index>=deducables.length-1){return "";}
var current=deducables[index];if(current){current={value:current,delta:0};}else{var reversedUpToIndex=deducables.slice(0,index).reverse();for(var i=0;i<reversedUpToIndex.length;i++){if(reversedUpToIndex[i]){current={value:reversedUpToIndex[i],delta:i+1};}}}
var next=deducables[index+1];if(next){next={value:next,delta:1};}else{var rest=deducables.slice(index+1);for(var j=0;j<rest.length;j++){if(rest[j]){next={value:rest[j],delta:j+1};}}}
var extras=next.delta-current.delta;var pixelWidth=Math.abs(next.value-current.value)/extras;return isPercentageBased?pixelWidth/getComputedStyleSize(table,'width')*100:pixelWidth;}
function getStyleOrAttrib(element,property){var sizeString=editor.dom.getStyle(element,property);if(!sizeString){sizeString=editor.dom.getAttrib(element,property);}
if(!sizeString){sizeString=editor.dom.getStyle(element,property,true);}
return sizeString;}
function getWidth(element,isPercentageBased,table){var widthString=getStyleOrAttrib(element,'width');var widthNumber=parseInt(widthString,10);var getWidthFallback=isPercentageBased?getPercentageWidthFallback(element,table):getComputedStyleSize(element,'width');if(isPercentageBased&&!isPercentageBasedSize(widthString)||!isPercentageBased&&!isPixelBasedSize(widthString)){widthNumber=0;}
return!isNaN(widthNumber)&&widthNumber>0?widthNumber:getWidthFallback;}
function getWidths(tableGrid,isPercentageBased,table){var cols=getColumnBlocks(tableGrid);var backups=Tools.map(cols,function(col){return getInnerEdge(col.colIndex,col.element).x;});var widths=[];for(var i=0;i<cols.length;i++){var span=cols[i].element.hasAttribute('colspan')?parseInt(cols[i].element.getAttribute('colspan'),10):1;var width=span>1?deduceSize(backups,i):getWidth(cols[i].element,isPercentageBased,table);width=width?width:RESIZE_MINIMUM_WIDTH;widths.push(width);}
return widths;}
function getPixelHeight(element){var heightString=getStyleOrAttrib(element,'height');var heightNumber=parseInt(heightString,10);if(isPercentageBasedSize(heightString)){heightNumber=0;}
return!isNaN(heightNumber)&&heightNumber>0?heightNumber:getComputedStyleSize(element,'height');}
function getPixelHeights(tableGrid){var rows=getRowBlocks(tableGrid);var backups=Tools.map(rows,function(row){return getTopEdge(row.rowIndex,row.element).y;});var heights=[];for(var i=0;i<rows.length;i++){var span=rows[i].element.hasAttribute('rowspan')?parseInt(rows[i].element.getAttribute('rowspan'),10):1;var height=span>1?deduceSize(backups,i):getPixelHeight(rows[i].element);height=height?height:RESIZE_MINIMUM_HEIGHT;heights.push(height);}
return heights;}
function determineDeltas(sizes,column,step,min,isPercentageBased){var result=sizes.slice(0);function generateZeros(array){return Tools.map(array,function(){return 0;});}
function onOneColumn(){var deltas;if(isPercentageBased){deltas=[100-result[0]];}else{var newNext=Math.max(min,result[0]+step);deltas=[newNext-result[0]];}
return deltas;}
function onLeftOrMiddle(index,next){var startZeros=generateZeros(result.slice(0,index));var endZeros=generateZeros(result.slice(next+1));var deltas;if(step>=0){var newNext=Math.max(min,result[next]-step);deltas=startZeros.concat([step,newNext-result[next]]).concat(endZeros);}else{var newThis=Math.max(min,result[index]+step);var diffx=result[index]-newThis;deltas=startZeros.concat([newThis-result[index],diffx]).concat(endZeros);}
return deltas;}
function onRight(previous,index){var startZeros=generateZeros(result.slice(0,index));var deltas;if(step>=0){deltas=startZeros.concat([step]);}else{var size=Math.max(min,result[index]+step);deltas=startZeros.concat([size-result[index]]);}
return deltas;}
var deltas;if(sizes.length===0){deltas=[];}else if(sizes.length===1){deltas=onOneColumn();}else if(column===0){deltas=onLeftOrMiddle(0,1);}else if(column>0&&column<sizes.length-1){deltas=onLeftOrMiddle(column,column+1);}else if(column===sizes.length-1){deltas=onRight(column-1,column);}else{deltas=[];}
return deltas;}
function total(start,end,measures){var r=0;for(var i=start;i<end;i++){r+=measures[i];}
return r;}
function recalculateWidths(tableGrid,widths){var allCells=tableGrid.getAllCells();return Tools.map(allCells,function(cell){var width=total(cell.colIndex,cell.colIndex+cell.colspan,widths);return{element:cell.element,width:width,colspan:cell.colspan};});}
function recalculateCellHeights(tableGrid,heights){var allCells=tableGrid.getAllCells();return Tools.map(allCells,function(cell){var height=total(cell.rowIndex,cell.rowIndex+cell.rowspan,heights);return{element:cell.element,height:height,rowspan:cell.rowspan};});}
function recalculateRowHeights(tableGrid,heights){var allRows=tableGrid.getAllRows();return Tools.map(allRows,function(row,i){return{element:row.element,height:heights[i]};});}
function isPercentageBasedSize(size){return percentageBasedSizeRegex.test(size);}
function isPixelBasedSize(size){return pixelBasedSizeRegex.test(size);}
function adjustWidth(table,delta,index){var tableDetails=getTableDetails(table);var tableGrid=getTableGrid(tableDetails);function setSizes(newSizes,styleExtension){Tools.each(newSizes,function(cell){editor.dom.setStyle(cell.element,'width',cell.width+styleExtension);editor.dom.setAttrib(cell.element,'width',null);});}
function getNewTablePercentWidth(){return index<tableGrid.grid.maxCols-1?getCurrentTablePercentWidth(table):getCurrentTablePercentWidth(table)+getTablePercentDelta(table,delta);}
function getNewTablePixelWidth(){return index<tableGrid.grid.maxCols-1?getComputedStyleSize(table,'width'):getComputedStyleSize(table,'width')+delta;}
function setTableSize(newTableWidth,styleExtension,isPercentBased){if(index==tableGrid.grid.maxCols-1||!isPercentBased){editor.dom.setStyle(table,'width',newTableWidth+styleExtension);editor.dom.setAttrib(table,'width',null);}}
var percentageBased=isPercentageBasedSize(table.width)||isPercentageBasedSize(table.style.width);var widths=getWidths(tableGrid,percentageBased,table);var step=percentageBased?getCellPercentDelta(table,delta):delta;var deltas=determineDeltas(widths,index,step,RESIZE_MINIMUM_WIDTH,percentageBased,table);var newWidths=[];for(var i=0;i<deltas.length;i++){newWidths.push(deltas[i]+widths[i]);}
var newSizes=recalculateWidths(tableGrid,newWidths);var styleExtension=percentageBased?'%':'px';var newTableWidth=percentageBased?getNewTablePercentWidth():getNewTablePixelWidth();editor.undoManager.transact(function(){setSizes(newSizes,styleExtension);setTableSize(newTableWidth,styleExtension,percentageBased);});}
function adjustHeight(table,delta,index){var tableDetails=getTableDetails(table);var tableGrid=getTableGrid(tableDetails);var heights=getPixelHeights(tableGrid);var newHeights=[],newTotalHeight=0;for(var i=0;i<heights.length;i++){newHeights.push(i===index?delta+heights[i]:heights[i]);newTotalHeight+=newTotalHeight[i];}
var newCellSizes=recalculateCellHeights(tableGrid,newHeights);var newRowSizes=recalculateRowHeights(tableGrid,newHeights);editor.undoManager.transact(function(){Tools.each(newRowSizes,function(row){editor.dom.setStyle(row.element,'height',row.height+'px');editor.dom.setAttrib(row.element,'height',null);});Tools.each(newCellSizes,function(cell){editor.dom.setStyle(cell.element,'height',cell.height+'px');editor.dom.setAttrib(cell.element,'height',null);});editor.dom.setStyle(table,'height',newTotalHeight+'px');editor.dom.setAttrib(table,'height',null);});}
function scheduleDelayedDropEvent(){delayDrop=setTimeout(function(){drop();},200);}
function cancelDelayedDropEvent(){clearTimeout(delayDrop);}
function getBlockerElement(){var blocker=document.createElement('div');blocker.setAttribute('style','margin: 0; '+
'padding: 0; '+
'position: fixed; '+
'left: 0px; '+
'top: 0px; '+
'height: 100%; '+
'width: 100%;');blocker.setAttribute('data-mce-bogus','all');return blocker;}
function bindBlockerEvents(blocker,dragHandler){editor.dom.bind(blocker,'mouseup',function(){drop();});editor.dom.bind(blocker,'mousemove',function(e){cancelDelayedDropEvent();if(dragging){dragHandler(e);}});editor.dom.bind(blocker,'mouseout',function(){scheduleDelayedDropEvent();});}
function drop(){editor.dom.remove(blockerElement);if(dragging){editor.dom.removeClass(dragBar,RESIZE_BAR_DRAGGING_CLASS);dragging=false;var index,delta;if(isCol(dragBar)){var initialLeft=parseInt(editor.dom.getAttrib(dragBar,RESIZE_BAR_COL_DATA_INITIAL_LEFT_ATTRIBUTE),10);var newLeft=editor.dom.getPos(dragBar).x;index=parseInt(editor.dom.getAttrib(dragBar,RESIZE_BAR_COL_DATA_ATTRIBUTE),10);delta=isRtl()?initialLeft-newLeft:newLeft-initialLeft;adjustWidth(hoverTable,delta,index);}else if(isRow(dragBar)){var initialTop=parseInt(editor.dom.getAttrib(dragBar,RESIZE_BAR_ROW_DATA_INITIAL_TOP_ATTRIBUTE),10);var newTop=editor.dom.getPos(dragBar).y;index=parseInt(editor.dom.getAttrib(dragBar,RESIZE_BAR_ROW_DATA_ATTRIBUTE),10);delta=newTop-initialTop;adjustHeight(hoverTable,delta,index);}
refreshBars(hoverTable);editor.nodeChanged();}}
function setupBaseDrag(bar,dragHandler){blockerElement=blockerElement?blockerElement:getBlockerElement();dragging=true;editor.dom.addClass(bar,RESIZE_BAR_DRAGGING_CLASS);dragBar=bar;bindBlockerEvents(blockerElement,dragHandler);editor.dom.add(getBody(),blockerElement);}
function isCol(target){return editor.dom.hasClass(target,RESIZE_BAR_COL_CLASS);}
function isRow(target){return editor.dom.hasClass(target,RESIZE_BAR_ROW_CLASS);}
function colDragHandler(event){lastX=lastX!==undefined?lastX:event.clientX;var deltaX=event.clientX-lastX;lastX=event.clientX;var oldLeft=editor.dom.getPos(dragBar).x;editor.dom.setStyle(dragBar,'left',oldLeft+deltaX+'px');}
function rowDragHandler(event){lastY=lastY!==undefined?lastY:event.clientY;var deltaY=event.clientY-lastY;lastY=event.clientY;var oldTop=editor.dom.getPos(dragBar).y;editor.dom.setStyle(dragBar,'top',oldTop+deltaY+'px');}
function setupColDrag(bar){lastX=undefined;setupBaseDrag(bar,colDragHandler);}
function setupRowDrag(bar){lastY=undefined;setupBaseDrag(bar,rowDragHandler);}
function mouseDownHandler(e){var target=e.target,body=editor.getBody();if(!editor.$.contains(body,hoverTable)&&hoverTable!==body){return;}
if(isCol(target)){e.preventDefault();var initialLeft=editor.dom.getPos(target).x;editor.dom.setAttrib(target,RESIZE_BAR_COL_DATA_INITIAL_LEFT_ATTRIBUTE,initialLeft);setupColDrag(target);}else if(isRow(target)){e.preventDefault();var initialTop=editor.dom.getPos(target).y;editor.dom.setAttrib(target,RESIZE_BAR_ROW_DATA_INITIAL_TOP_ATTRIBUTE,initialTop);setupRowDrag(target);}else{clearBars();}}
editor.on('init',function(){editor.dom.bind(getBody(),'mousedown',mouseDownHandler);});editor.on('ObjectResized',function(e){var table=e.target;if(table.nodeName==='TABLE'){var newCellSizes=[];Tools.each(table.rows,function(row){Tools.each(row.cells,function(cell){var width=editor.dom.getStyle(cell,'width',true);newCellSizes.push({cell:cell,width:width});});});Tools.each(newCellSizes,function(newCellSize){editor.dom.setStyle(newCellSize.cell,'width',newCellSize.width);editor.dom.setAttrib(newCellSize.cell,'width',null);});}});editor.on('mouseover',function(e){if(!dragging){var tableElement=editor.dom.getParent(e.target,'table');if(e.target.nodeName==='TABLE'||tableElement){hoverTable=tableElement;refreshBars(tableElement);}}});editor.on('keydown',function(e){switch(e.keyCode){case VK.LEFT:case VK.RIGHT:case VK.UP:case VK.DOWN:clearBars();break;}});editor.on('remove',function(){clearBars();editor.dom.unbind(getBody(),'mousedown',mouseDownHandler);});return{adjustWidth:adjustWidth,adjustHeight:adjustHeight,clearBars:clearBars,drawBars:drawBars,determineDeltas:determineDeltas,getTableGrid:getTableGrid,getTableDetails:getTableDetails,getWidths:getWidths,getPixelHeights:getPixelHeights,isPercentageBasedSize:isPercentageBasedSize,isPixelBasedSize:isPixelBasedSize,recalculateWidths:recalculateWidths,recalculateCellHeights:recalculateCellHeights,recalculateRowHeights:recalculateRowHeights};};});