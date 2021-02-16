define("tinymce/tableplugin/CellSelection",["tinymce/tableplugin/TableGrid","tinymce/dom/TreeWalker","tinymce/util/Tools"],function(TableGrid,TreeWalker,Tools){return function(editor,selectionChange){var dom=editor.dom,tableGrid,startCell,startTable,lastMouseOverTarget,hasCellSelection=true,resizing;function clear(force){editor.getBody().style.webkitUserSelect='';if(force||hasCellSelection){editor.$('td[data-mce-selected],th[data-mce-selected]').removeAttr('data-mce-selected');hasCellSelection=false;}}
var endSelection=function(){startCell=tableGrid=startTable=lastMouseOverTarget=null;selectionChange(false);};function isCellInTable(table,cell){if(!table||!cell){return false;}
return table===dom.getParent(cell,'table');}
function cellSelectionHandler(e){var sel,target=e.target,currentCell;if(resizing){return;}
if(target===lastMouseOverTarget){return;}
lastMouseOverTarget=target;if(startTable&&startCell){currentCell=dom.getParent(target,'td,th');if(!isCellInTable(startTable,currentCell)){currentCell=dom.getParent(startTable,'td,th');}
if(startCell===currentCell&&!hasCellSelection){return;}
selectionChange(true);if(isCellInTable(startTable,currentCell)){e.preventDefault();if(!tableGrid){tableGrid=new TableGrid(editor,startTable,startCell);editor.getBody().style.webkitUserSelect='none';}
tableGrid.setEndCell(currentCell);hasCellSelection=true;sel=editor.selection.getSel();try{if(sel.removeAllRanges){sel.removeAllRanges();}else{sel.empty();}}catch(ex){}}}}
editor.on('SelectionChange',function(e){if(hasCellSelection){e.stopImmediatePropagation();}},true);editor.on('MouseDown',function(e){if(e.button!=2&&!resizing){clear();startCell=dom.getParent(e.target,'td,th');startTable=dom.getParent(startCell,'table');}});editor.on('mouseover',cellSelectionHandler);editor.on('remove',function(){dom.unbind(editor.getDoc(),'mouseover',cellSelectionHandler);clear();});editor.on('MouseUp',function(){var rng,sel=editor.selection,selectedCells,walker,node,lastNode;function setPoint(node,start){var walker=new TreeWalker(node,node);do{if(node.nodeType==3&&Tools.trim(node.nodeValue).length!==0){if(start){rng.setStart(node,0);}else{rng.setEnd(node,node.nodeValue.length);}
return;}
if(node.nodeName=='BR'){if(start){rng.setStartBefore(node);}else{rng.setEndBefore(node);}
return;}}while((node=(start?walker.next():walker.prev())));}
if(startCell){if(tableGrid){editor.getBody().style.webkitUserSelect='';}
selectedCells=dom.select('td[data-mce-selected],th[data-mce-selected]');if(selectedCells.length>0){rng=dom.createRng();node=selectedCells[0];rng.setStartBefore(node);rng.setEndAfter(node);setPoint(node,1);walker=new TreeWalker(node,dom.getParent(selectedCells[0],'table'));do{if(node.nodeName=='TD'||node.nodeName=='TH'){if(!dom.getAttrib(node,'data-mce-selected')){break;}
lastNode=node;}}while((node=walker.next()));setPoint(lastNode);sel.setRng(rng);}
editor.nodeChanged();endSelection();}});editor.on('KeyUp Drop SetContent',function(e){clear(e.type=='setcontent');endSelection();resizing=false;});editor.on('ObjectResizeStart ObjectResized',function(e){resizing=e.type!='objectresized';});return{clear:clear};};});