define("tinymce/tableplugin/TableGrid",["tinymce/util/Tools","tinymce/Env","tinymce/tableplugin/Utils"],function(Tools,Env,Utils){var each=Tools.each,getSpanVal=Utils.getSpanVal;return function(editor,table,selectedCell){var grid,gridWidth,startPos,endPos,selection=editor.selection,dom=selection.dom;function removeCellSelection(){editor.$('td[data-mce-selected],th[data-mce-selected]').removeAttr('data-mce-selected');}
function isEditorBody(node){return node===editor.getBody();}
function getChildrenByName(node,names){if(!node){return[];}
names=Tools.map(names.split(','),function(name){return name.toLowerCase();});return Tools.grep(node.childNodes,function(node){return Tools.inArray(names,node.nodeName.toLowerCase())!==-1;});}
function buildGrid(){var startY=0;grid=[];gridWidth=0;each(['thead','tbody','tfoot'],function(part){var partElm=getChildrenByName(table,part)[0];var rows=getChildrenByName(partElm,'tr');each(rows,function(tr,y){y+=startY;each(getChildrenByName(tr,'td,th'),function(td,x){var x2,y2,rowspan,colspan;if(grid[y]){while(grid[y][x]){x++;}}
rowspan=getSpanVal(td,'rowspan');colspan=getSpanVal(td,'colspan');for(y2=y;y2<y+rowspan;y2++){if(!grid[y2]){grid[y2]=[];}
for(x2=x;x2<x+colspan;x2++){grid[y2][x2]={part:part,real:y2==y&&x2==x,elm:td,rowspan:rowspan,colspan:colspan};}}
gridWidth=Math.max(gridWidth,x+1);});});startY+=rows.length;});}
function fireNewRow(node){editor.fire('newrow',{node:node});return node;}
function fireNewCell(node){editor.fire('newcell',{node:node});return node;}
function cloneNode(node,children){node=node.cloneNode(children);node.removeAttribute('id');return node;}
function getCell(x,y){var row;row=grid[y];if(row){return row[x];}}
function setSpanVal(td,name,val){if(td){val=parseInt(val,10);if(val===1){td.removeAttribute(name,1);}else{td.setAttribute(name,val,1);}}}
function isCellSelected(cell){return cell&&(!!dom.getAttrib(cell.elm,'data-mce-selected')||cell==selectedCell);}
function getSelectedRows(){var rows=[];each(table.rows,function(row){each(row.cells,function(cell){if(dom.getAttrib(cell,'data-mce-selected')||(selectedCell&&cell==selectedCell.elm)){rows.push(row);return false;}});});return rows;}
function deleteTable(){var rng=dom.createRng();if(isEditorBody(table)){return;}
rng.setStartAfter(table);rng.setEndAfter(table);selection.setRng(rng);dom.remove(table);}
function cloneCell(cell){var formatNode,cloneFormats={};if(editor.settings.table_clone_elements!==false){cloneFormats=Tools.makeMap((editor.settings.table_clone_elements||'strong em b i span font h1 h2 h3 h4 h5 h6 p div').toUpperCase(),/[ ,]/);}
Tools.walk(cell,function(node){var curNode;if(node.nodeType==3){each(dom.getParents(node.parentNode,null,cell).reverse(),function(node){if(!cloneFormats[node.nodeName]){return;}
node=cloneNode(node,false);if(!formatNode){formatNode=curNode=node;}else if(curNode){curNode.appendChild(node);}
curNode=node;});if(curNode){curNode.innerHTML=Env.ie&&Env.ie<10?'&nbsp;':'<br data-mce-bogus="1" />';}
return false;}},'childNodes');cell=cloneNode(cell,false);fireNewCell(cell);setSpanVal(cell,'rowSpan',1);setSpanVal(cell,'colSpan',1);if(formatNode){cell.appendChild(formatNode);}else{Utils.paddCell(cell);}
return cell;}
function cleanup(){var rng=dom.createRng(),row;each(dom.select('tr',table),function(tr){if(tr.cells.length===0){dom.remove(tr);}});if(dom.select('tr',table).length===0){rng.setStartBefore(table);rng.setEndBefore(table);selection.setRng(rng);dom.remove(table);return;}
each(dom.select('thead,tbody,tfoot',table),function(part){if(part.rows.length===0){dom.remove(part);}});buildGrid();if(startPos){row=grid[Math.min(grid.length-1,startPos.y)];if(row){selection.select(row[Math.min(row.length-1,startPos.x)].elm,true);selection.collapse(true);}}}
function fillLeftDown(x,y,rows,cols){var tr,x2,r,c,cell;tr=grid[y][x].elm.parentNode;for(r=1;r<=rows;r++){tr=dom.getNext(tr,'tr');if(tr){for(x2=x;x2>=0;x2--){cell=grid[y+r][x2].elm;if(cell.parentNode==tr){for(c=1;c<=cols;c++){dom.insertAfter(cloneCell(cell),cell);}
break;}}
if(x2==-1){for(c=1;c<=cols;c++){tr.insertBefore(cloneCell(tr.cells[0]),tr.cells[0]);}}}}}
function split(){each(grid,function(row,y){each(row,function(cell,x){var colSpan,rowSpan,i;if(isCellSelected(cell)){cell=cell.elm;colSpan=getSpanVal(cell,'colspan');rowSpan=getSpanVal(cell,'rowspan');if(colSpan>1||rowSpan>1){setSpanVal(cell,'rowSpan',1);setSpanVal(cell,'colSpan',1);for(i=0;i<colSpan-1;i++){dom.insertAfter(cloneCell(cell),cell);}
fillLeftDown(x,y,rowSpan-1,colSpan);}}});});}
function merge(cell,cols,rows){var pos,startX,startY,endX,endY,x,y,startCell,endCell,children,count;if(cell){pos=getPos(cell);startX=pos.x;startY=pos.y;endX=startX+(cols-1);endY=startY+(rows-1);}else{startPos=endPos=null;each(grid,function(row,y){each(row,function(cell,x){if(isCellSelected(cell)){if(!startPos){startPos={x:x,y:y};}
endPos={x:x,y:y};}});});if(startPos){startX=startPos.x;startY=startPos.y;endX=endPos.x;endY=endPos.y;}}
startCell=getCell(startX,startY);endCell=getCell(endX,endY);if(startCell&&endCell&&startCell.part==endCell.part){split();buildGrid();startCell=getCell(startX,startY).elm;setSpanVal(startCell,'colSpan',(endX-startX)+1);setSpanVal(startCell,'rowSpan',(endY-startY)+1);for(y=startY;y<=endY;y++){for(x=startX;x<=endX;x++){if(!grid[y]||!grid[y][x]){continue;}
cell=grid[y][x].elm;if(cell!=startCell){children=Tools.grep(cell.childNodes);each(children,function(node){startCell.appendChild(node);});if(children.length){children=Tools.grep(startCell.childNodes);count=0;each(children,function(node){if(node.nodeName=='BR'&&count++<children.length-1){startCell.removeChild(node);}});}
dom.remove(cell);}}}
cleanup();}}
function insertRow(before){var posY,cell,lastCell,x,rowElm,newRow,newCell,otherCell,rowSpan,spanValue;each(grid,function(row,y){each(row,function(cell){if(isCellSelected(cell)){cell=cell.elm;rowElm=cell.parentNode;newRow=fireNewRow(cloneNode(rowElm,false));posY=y;if(before){return false;}}});if(before){return!posY;}});if(posY===undefined){return;}
for(x=0,spanValue=0;x<grid[0].length;x+=spanValue){if(!grid[posY][x]){continue;}
cell=grid[posY][x].elm;spanValue=getSpanVal(cell,'colspan');if(cell!=lastCell){if(!before){rowSpan=getSpanVal(cell,'rowspan');if(rowSpan>1){setSpanVal(cell,'rowSpan',rowSpan+1);continue;}}else{if(posY>0&&grid[posY-1][x]){otherCell=grid[posY-1][x].elm;rowSpan=getSpanVal(otherCell,'rowSpan');if(rowSpan>1){setSpanVal(otherCell,'rowSpan',rowSpan+1);continue;}}}
newCell=cloneCell(cell);setSpanVal(newCell,'colSpan',cell.colSpan);newRow.appendChild(newCell);lastCell=cell;}}
if(newRow.hasChildNodes()){if(!before){dom.insertAfter(newRow,rowElm);}else{rowElm.parentNode.insertBefore(newRow,rowElm);}}}
function insertCol(before){var posX,lastCell;each(grid,function(row){each(row,function(cell,x){if(isCellSelected(cell)){posX=x;if(before){return false;}}});if(before){return!posX;}});each(grid,function(row,y){var cell,rowSpan,colSpan;if(!row[posX]){return;}
cell=row[posX].elm;if(cell!=lastCell){colSpan=getSpanVal(cell,'colspan');rowSpan=getSpanVal(cell,'rowspan');if(colSpan==1){if(!before){dom.insertAfter(cloneCell(cell),cell);fillLeftDown(posX,y,rowSpan-1,colSpan);}else{cell.parentNode.insertBefore(cloneCell(cell),cell);fillLeftDown(posX,y,rowSpan-1,colSpan);}}else{setSpanVal(cell,'colSpan',cell.colSpan+1);}
lastCell=cell;}});}
function getSelectedCells(grid){return Tools.grep(getAllCells(grid),isCellSelected);}
function getAllCells(grid){var cells=[];each(grid,function(row){each(row,function(cell){cells.push(cell);});});return cells;}
function deleteCols(){var cols=[];if(isEditorBody(table)){if(grid[0].length==1){return;}
if(getSelectedCells(grid).length==getAllCells(grid).length){return;}}
each(grid,function(row){each(row,function(cell,x){if(isCellSelected(cell)&&Tools.inArray(cols,x)===-1){each(grid,function(row){var cell=row[x].elm,colSpan;colSpan=getSpanVal(cell,'colSpan');if(colSpan>1){setSpanVal(cell,'colSpan',colSpan-1);}else{dom.remove(cell);}});cols.push(x);}});});cleanup();}
function deleteRows(){var rows;function deleteRow(tr){var pos,lastCell;each(tr.cells,function(cell){var rowSpan=getSpanVal(cell,'rowSpan');if(rowSpan>1){setSpanVal(cell,'rowSpan',rowSpan-1);pos=getPos(cell);fillLeftDown(pos.x,pos.y,1,1);}});pos=getPos(tr.cells[0]);each(grid[pos.y],function(cell){var rowSpan;cell=cell.elm;if(cell!=lastCell){rowSpan=getSpanVal(cell,'rowSpan');if(rowSpan<=1){dom.remove(cell);}else{setSpanVal(cell,'rowSpan',rowSpan-1);}
lastCell=cell;}});}
rows=getSelectedRows();if(isEditorBody(table)&&rows.length==table.rows.length){return;}
each(rows.reverse(),function(tr){deleteRow(tr);});cleanup();}
function cutRows(){var rows=getSelectedRows();if(isEditorBody(table)&&rows.length==table.rows.length){return;}
dom.remove(rows);cleanup();return rows;}
function copyRows(){var rows=getSelectedRows();each(rows,function(row,i){rows[i]=cloneNode(row,true);});return rows;}
function pasteRows(rows,before){var selectedRows=getSelectedRows(),targetRow=selectedRows[before?0:selectedRows.length-1],targetCellCount=targetRow.cells.length;if(!rows){return;}
each(grid,function(row){var match;targetCellCount=0;each(row,function(cell){if(cell.real){targetCellCount+=cell.colspan;}
if(cell.elm.parentNode==targetRow){match=1;}});if(match){return false;}});if(!before){rows.reverse();}
each(rows,function(row){var i,cellCount=row.cells.length,cell;fireNewRow(row);for(i=0;i<cellCount;i++){cell=row.cells[i];fireNewCell(cell);setSpanVal(cell,'colSpan',1);setSpanVal(cell,'rowSpan',1);}
for(i=cellCount;i<targetCellCount;i++){row.appendChild(fireNewCell(cloneCell(row.cells[cellCount-1])));}
for(i=targetCellCount;i<cellCount;i++){dom.remove(row.cells[i]);}
if(before){targetRow.parentNode.insertBefore(row,targetRow);}else{dom.insertAfter(row,targetRow);}});removeCellSelection();}
function getPos(target){var pos;each(grid,function(row,y){each(row,function(cell,x){if(cell.elm==target){pos={x:x,y:y};return false;}});return!pos;});return pos;}
function setStartCell(cell){startPos=getPos(cell);}
function findEndPos(){var maxX,maxY;maxX=maxY=0;each(grid,function(row,y){each(row,function(cell,x){var colSpan,rowSpan;if(isCellSelected(cell)){cell=grid[y][x];if(x>maxX){maxX=x;}
if(y>maxY){maxY=y;}
if(cell.real){colSpan=cell.colspan-1;rowSpan=cell.rowspan-1;if(colSpan){if(x+colSpan>maxX){maxX=x+colSpan;}}
if(rowSpan){if(y+rowSpan>maxY){maxY=y+rowSpan;}}}}});});return{x:maxX,y:maxY};}
function setEndCell(cell){var startX,startY,endX,endY,maxX,maxY,colSpan,rowSpan,x,y;endPos=getPos(cell);if(startPos&&endPos){startX=Math.min(startPos.x,endPos.x);startY=Math.min(startPos.y,endPos.y);endX=Math.max(startPos.x,endPos.x);endY=Math.max(startPos.y,endPos.y);maxX=endX;maxY=endY;for(y=startY;y<=endY;y++){for(x=startX;x<=endX;x++){cell=grid[y][x];if(cell.real){colSpan=cell.colspan-1;rowSpan=cell.rowspan-1;if(colSpan){if(x+colSpan>maxX){maxX=x+colSpan;}}
if(rowSpan){if(y+rowSpan>maxY){maxY=y+rowSpan;}}}}}
removeCellSelection();for(y=startY;y<=maxY;y++){for(x=startX;x<=maxX;x++){if(grid[y][x]){dom.setAttrib(grid[y][x].elm,'data-mce-selected','1');}}}}}
function moveRelIdx(cellElm,delta){var pos,index,cell;pos=getPos(cellElm);index=pos.y*gridWidth+pos.x;do{index+=delta;cell=getCell(index%gridWidth,Math.floor(index/gridWidth));if(!cell){break;}
if(cell.elm!=cellElm){selection.select(cell.elm,true);if(dom.isEmpty(cell.elm)){selection.collapse(true);}
return true;}}while(cell.elm==cellElm);return false;}
table=table||dom.getParent(selection.getStart(true),'table');buildGrid();selectedCell=selectedCell||dom.getParent(selection.getStart(true),'th,td');if(selectedCell){startPos=getPos(selectedCell);endPos=findEndPos();selectedCell=getCell(startPos.x,startPos.y);}
Tools.extend(this,{deleteTable:deleteTable,split:split,merge:merge,insertRow:insertRow,insertCol:insertCol,deleteCols:deleteCols,deleteRows:deleteRows,cutRows:cutRows,copyRows:copyRows,pasteRows:pasteRows,getPos:getPos,setStartCell:setStartCell,setEndCell:setEndCell,moveRelIdx:moveRelIdx,refresh:buildGrid});};});