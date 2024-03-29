tinymce.PluginManager.add('autolink',function(editor){var AutoUrlDetectState;var AutoLinkPattern=/^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@)(.+)$/i;if(editor.settings.autolink_pattern){AutoLinkPattern=editor.settings.autolink_pattern;}
editor.on("keydown",function(e){if(e.keyCode==13){return handleEnter(editor);}});if(tinymce.Env.ie){editor.on("focus",function(){if(!AutoUrlDetectState){AutoUrlDetectState=true;try{editor.execCommand('AutoUrlDetect',false,true);}catch(ex){}}});return;}
editor.on("keypress",function(e){if(e.keyCode==41){return handleEclipse(editor);}});editor.on("keyup",function(e){if(e.keyCode==32){return handleSpacebar(editor);}});function handleEclipse(editor){parseCurrentLine(editor,-1,'(',true);}
function handleSpacebar(editor){parseCurrentLine(editor,0,'',true);}
function handleEnter(editor){parseCurrentLine(editor,-1,'',false);}
function parseCurrentLine(editor,end_offset,delimiter){var rng,end,start,endContainer,bookmark,text,matches,prev,len,rngText;function scopeIndex(container,index){if(index<0){index=0;}
if(container.nodeType==3){var len=container.data.length;if(index>len){index=len;}}
return index;}
function setStart(container,offset){if(container.nodeType!=1||container.hasChildNodes()){rng.setStart(container,scopeIndex(container,offset));}else{rng.setStartBefore(container);}}
function setEnd(container,offset){if(container.nodeType!=1||container.hasChildNodes()){rng.setEnd(container,scopeIndex(container,offset));}else{rng.setEndAfter(container);}}
if(editor.selection.getNode().tagName=='A'){return;}
rng=editor.selection.getRng(true).cloneRange();if(rng.startOffset<5){prev=rng.endContainer.previousSibling;if(!prev){if(!rng.endContainer.firstChild||!rng.endContainer.firstChild.nextSibling){return;}
prev=rng.endContainer.firstChild.nextSibling;}
len=prev.length;setStart(prev,len);setEnd(prev,len);if(rng.endOffset<5){return;}
end=rng.endOffset;endContainer=prev;}else{endContainer=rng.endContainer;if(endContainer.nodeType!=3&&endContainer.firstChild){while(endContainer.nodeType!=3&&endContainer.firstChild){endContainer=endContainer.firstChild;}
if(endContainer.nodeType==3){setStart(endContainer,0);setEnd(endContainer,endContainer.nodeValue.length);}}
if(rng.endOffset==1){end=2;}else{end=rng.endOffset-1-end_offset;}}
start=end;do{setStart(endContainer,end>=2?end-2:0);setEnd(endContainer,end>=1?end-1:0);end-=1;rngText=rng.toString();}while(rngText!=' '&&rngText!==''&&rngText.charCodeAt(0)!=160&&(end-2)>=0&&rngText!=delimiter);if(rng.toString()==delimiter||rng.toString().charCodeAt(0)==160){setStart(endContainer,end);setEnd(endContainer,start);end+=1;}else if(rng.startOffset===0){setStart(endContainer,0);setEnd(endContainer,start);}else{setStart(endContainer,end);setEnd(endContainer,start);}
text=rng.toString();if(text.charAt(text.length-1)=='.'){setEnd(endContainer,start-1);}
text=rng.toString();matches=text.match(AutoLinkPattern);if(matches){if(matches[1]=='www.'){matches[1]='http://www.';}else if(/@$/.test(matches[1])&&!/^mailto:/.test(matches[1])){matches[1]='mailto:'+matches[1];}
bookmark=editor.selection.getBookmark();editor.selection.setRng(rng);editor.execCommand('createlink',false,matches[1]+matches[2]);editor.selection.moveToBookmark(bookmark);editor.nodeChanged();}}});