tinymce.PluginManager.add('textpattern',function(editor){var isPatternsDirty=true,patterns;patterns=editor.settings.textpattern_patterns||[{start:'*',end:'*',format:'italic'},{start:'**',end:'**',format:'bold'},{start:'#',format:'h1'},{start:'##',format:'h2'},{start:'###',format:'h3'},{start:'####',format:'h4'},{start:'#####',format:'h5'},{start:'######',format:'h6'},{start:'1. ',cmd:'InsertOrderedList'},{start:'* ',cmd:'InsertUnorderedList'},{start:'- ',cmd:'InsertUnorderedList'}];function getPatterns(){if(isPatternsDirty){patterns.sort(function(a,b){if(a.start.length>b.start.length){return-1;}
if(a.start.length<b.start.length){return 1;}
return 0;});isPatternsDirty=false;}
return patterns;}
function findPattern(text){var patterns=getPatterns();for(var i=0;i<patterns.length;i++){if(text.indexOf(patterns[i].start)!==0){continue;}
if(patterns[i].end&&text.lastIndexOf(patterns[i].end)!=text.length-patterns[i].end.length){continue;}
return patterns[i];}}
function findEndPattern(text,offset,delta){var patterns,pattern,i;patterns=getPatterns();for(i=0;i<patterns.length;i++){pattern=patterns[i];if(pattern.end&&text.substr(offset-pattern.end.length-delta,pattern.end.length)==pattern.end){return pattern;}}}
function applyInlineFormat(space){var selection,dom,rng,container,offset,startOffset,text,patternRng,pattern,delta,format;function splitContainer(){container=container.splitText(startOffset);container.splitText(offset-startOffset-delta);container.deleteData(0,pattern.start.length);container.deleteData(container.data.length-pattern.end.length,pattern.end.length);}
selection=editor.selection;dom=editor.dom;if(!selection.isCollapsed()){return;}
rng=selection.getRng(true);container=rng.startContainer;offset=rng.startOffset;text=container.data;delta=space?1:0;if(container.nodeType!=3){return;}
pattern=findEndPattern(text,offset,delta);if(!pattern){return;}
startOffset=Math.max(0,offset-delta);startOffset=text.lastIndexOf(pattern.start,startOffset-pattern.end.length-1);if(startOffset===-1){return;}
patternRng=dom.createRng();patternRng.setStart(container,startOffset);patternRng.setEnd(container,offset-delta);pattern=findPattern(patternRng.toString());if(!pattern||!pattern.end){return;}
if(container.data.length<=pattern.start.length+pattern.end.length){return;}
format=editor.formatter.get(pattern.format);if(format&&format[0].inline){splitContainer();editor.formatter.apply(pattern.format,{},container);return container;}}
function applyBlockFormat(){var selection,dom,container,firstTextNode,node,format,textBlockElm,pattern,walker,rng,offset;selection=editor.selection;dom=editor.dom;if(!selection.isCollapsed()){return;}
textBlockElm=dom.getParent(selection.getStart(),'p');if(textBlockElm){walker=new tinymce.dom.TreeWalker(textBlockElm,textBlockElm);while((node=walker.next())){if(node.nodeType==3){firstTextNode=node;break;}}
if(firstTextNode){pattern=findPattern(firstTextNode.data);if(!pattern){return;}
rng=selection.getRng(true);container=rng.startContainer;offset=rng.startOffset;if(firstTextNode==container){offset=Math.max(0,offset-pattern.start.length);}
if(tinymce.trim(firstTextNode.data).length==pattern.start.length){return;}
if(pattern.format){format=editor.formatter.get(pattern.format);if(format&&format[0].block){firstTextNode.deleteData(0,pattern.start.length);editor.formatter.apply(pattern.format,{},firstTextNode);rng.setStart(container,offset);rng.collapse(true);selection.setRng(rng);}}
if(pattern.cmd){editor.undoManager.transact(function(){firstTextNode.deleteData(0,pattern.start.length);editor.execCommand(pattern.cmd);});}}}}
function handleEnter(){var rng,wrappedTextNode;wrappedTextNode=applyInlineFormat();if(wrappedTextNode){rng=editor.dom.createRng();rng.setStart(wrappedTextNode,wrappedTextNode.data.length);rng.setEnd(wrappedTextNode,wrappedTextNode.data.length);editor.selection.setRng(rng);}
applyBlockFormat();}
function handleSpace(){var wrappedTextNode,lastChar,lastCharNode,rng,dom;wrappedTextNode=applyInlineFormat(true);if(wrappedTextNode){dom=editor.dom;lastChar=wrappedTextNode.data.slice(-1);if(/[\u00a0 ]/.test(lastChar)){wrappedTextNode.deleteData(wrappedTextNode.data.length-1,1);lastCharNode=dom.doc.createTextNode(lastChar);if(wrappedTextNode.nextSibling){dom.insertAfter(lastCharNode,wrappedTextNode.nextSibling);}else{wrappedTextNode.parentNode.appendChild(lastCharNode);}
rng=dom.createRng();rng.setStart(lastCharNode,1);rng.setEnd(lastCharNode,1);editor.selection.setRng(rng);}}}
editor.on('keydown',function(e){if(e.keyCode==13&&!tinymce.util.VK.modifierPressed(e)){handleEnter();}},true);editor.on('keyup',function(e){if(e.keyCode==32&&!tinymce.util.VK.modifierPressed(e)){handleSpace();}});this.getPatterns=getPatterns;this.setPatterns=function(newPatterns){patterns=newPatterns;isPatternsDirty=true;};});