define("tinymce/imagetoolsplugin/UndoStack",[],function(){return function(){var data=[],index=-1;function add(state){var removed;removed=data.splice(++index);data.push(state);return{state:state,removed:removed};}
function undo(){if(canUndo()){return data[--index];}}
function redo(){if(canRedo()){return data[++index];}}
function canUndo(){return index>0;}
function canRedo(){return index!=-1&&index<data.length-1;}
return{data:data,add:add,undo:undo,redo:redo,canUndo:canUndo,canRedo:canRedo};};});