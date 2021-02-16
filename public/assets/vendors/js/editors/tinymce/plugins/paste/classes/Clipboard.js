define("tinymce/pasteplugin/Clipboard",["tinymce/Env","tinymce/dom/RangeUtils","tinymce/util/VK","tinymce/pasteplugin/Utils","tinymce/util/Delay"],function(Env,RangeUtils,VK,Utils,Delay){return function(editor){var self=this,pasteBinElm,lastRng,keyboardPasteTimeStamp=0,draggingInternally=false;var pasteBinDefaultContent='%MCEPASTEBIN%',keyboardPastePlainTextState;var mceInternalUrlPrefix='data:text/mce-internal,';var uniqueId=Utils.createIdGenerator("mceclip");function pasteHtml(html){var args,dom=editor.dom;args=editor.fire('BeforePastePreProcess',{content:html});args=editor.fire('PastePreProcess',args);html=args.content;if(!args.isDefaultPrevented()){if(editor.hasEventListeners('PastePostProcess')&&!args.isDefaultPrevented()){var tempBody=dom.add(editor.getBody(),'div',{style:'display:none'},html);args=editor.fire('PastePostProcess',{node:tempBody});dom.remove(tempBody);html=args.node.innerHTML;}
if(!args.isDefaultPrevented()){editor.insertContent(html,{merge:editor.settings.paste_merge_formats!==false,data:{paste:true}});}}}
function pasteText(text){text=editor.dom.encode(text).replace(/\r\n/g,'\n');var startBlock=editor.dom.getParent(editor.selection.getStart(),editor.dom.isBlock);var forcedRootBlockName=editor.settings.forced_root_block;var forcedRootBlockStartHtml;if(forcedRootBlockName){forcedRootBlockStartHtml=editor.dom.createHTML(forcedRootBlockName,editor.settings.forced_root_block_attrs);forcedRootBlockStartHtml=forcedRootBlockStartHtml.substr(0,forcedRootBlockStartHtml.length-3)+'>';}
if((startBlock&&/^(PRE|DIV)$/.test(startBlock.nodeName))||!forcedRootBlockName){text=Utils.filter(text,[[/\n/g,"<br>"]]);}else{text=Utils.filter(text,[[/\n\n/g,"</p>"+forcedRootBlockStartHtml],[/^(.*<\/p>)(<p>)$/,forcedRootBlockStartHtml+'$1'],[/\n/g,"<br />"]]);if(text.indexOf('<p>')!=-1){text=forcedRootBlockStartHtml+text;}}
pasteHtml(text);}
function createPasteBin(){var dom=editor.dom,body=editor.getBody();var viewport=editor.dom.getViewPort(editor.getWin()),scrollTop=viewport.y,top=20;var scrollContainer;lastRng=editor.selection.getRng();if(editor.inline){scrollContainer=editor.selection.getScrollContainer();if(scrollContainer&&scrollContainer.scrollTop>0){scrollTop=scrollContainer.scrollTop;}}
function getCaretRect(rng){var rects,textNode,node,container=rng.startContainer;rects=rng.getClientRects();if(rects.length){return rects[0];}
if(!rng.collapsed||container.nodeType!=1){return;}
node=container.childNodes[lastRng.startOffset];while(node&&node.nodeType==3&&!node.data.length){node=node.nextSibling;}
if(!node){return;}
if(node.tagName=='BR'){textNode=dom.doc.createTextNode('\uFEFF');node.parentNode.insertBefore(textNode,node);rng=dom.createRng();rng.setStartBefore(textNode);rng.setEndAfter(textNode);rects=rng.getClientRects();dom.remove(textNode);}
if(rects.length){return rects[0];}}
if(lastRng.getClientRects){var rect=getCaretRect(lastRng);if(rect){top=scrollTop+(rect.top-dom.getPos(body).y);}else{top=scrollTop;var container=lastRng.startContainer;if(container){if(container.nodeType==3&&container.parentNode!=body){container=container.parentNode;}
if(container.nodeType==1){top=dom.getPos(container,scrollContainer||body).y;}}}}
pasteBinElm=dom.add(editor.getBody(),'div',{id:"mcepastebin",contentEditable:true,"data-mce-bogus":"all",style:'position: absolute; top: '+top+'px;'+
'width: 10px; height: 10px; overflow: hidden; opacity: 0'},pasteBinDefaultContent);if(Env.ie||Env.gecko){dom.setStyle(pasteBinElm,'left',dom.getStyle(body,'direction',true)=='rtl'?0xFFFF:-0xFFFF);}
dom.bind(pasteBinElm,'beforedeactivate focusin focusout',function(e){e.stopPropagation();});pasteBinElm.focus();editor.selection.select(pasteBinElm,true);}
function removePasteBin(){if(pasteBinElm){var pasteBinClone;while((pasteBinClone=editor.dom.get('mcepastebin'))){editor.dom.remove(pasteBinClone);editor.dom.unbind(pasteBinClone);}
if(lastRng){editor.selection.setRng(lastRng);}}
pasteBinElm=lastRng=null;}
function getPasteBinHtml(){var html='',pasteBinClones,i,clone,cloneHtml;pasteBinClones=editor.dom.select('div[id=mcepastebin]');for(i=0;i<pasteBinClones.length;i++){clone=pasteBinClones[i];if(clone.firstChild&&clone.firstChild.id=='mcepastebin'){clone=clone.firstChild;}
cloneHtml=clone.innerHTML;if(html!=pasteBinDefaultContent){html+=cloneHtml;}}
return html;}
function getDataTransferItems(dataTransfer){var items={};if(dataTransfer){if(dataTransfer.getData){var legacyText=dataTransfer.getData('Text');if(legacyText&&legacyText.length>0){if(legacyText.indexOf(mceInternalUrlPrefix)==-1){items['text/plain']=legacyText;}}}
if(dataTransfer.types){for(var i=0;i<dataTransfer.types.length;i++){var contentType=dataTransfer.types[i];items[contentType]=dataTransfer.getData(contentType);}}}
return items;}
function getClipboardContent(clipboardEvent){return getDataTransferItems(clipboardEvent.clipboardData||editor.getDoc().dataTransfer);}
function hasHtmlOrText(content){return hasContentType(content,'text/html')||hasContentType(content,'text/plain');}
function pasteImageData(e,rng){var dataTransfer=e.clipboardData||e.dataTransfer;function getBase64FromUri(uri){var idx;idx=uri.indexOf(',');if(idx!==-1){return uri.substr(idx+1);}
return null;}
function processItems(items){var i,item,reader,hadImage=false;function pasteImage(reader,blob){if(rng){editor.selection.setRng(rng);rng=null;}
var blobCache=editor.editorUpload.blobCache;var blobInfo=blobCache.create(uniqueId(),blob,getBase64FromUri(reader.result));blobCache.add(blobInfo);pasteHtml('<img src="'+blobInfo.blobUri()+'">');}
if(items){for(i=0;i<items.length;i++){item=items[i];if(/^image\/(jpeg|png|gif|bmp)$/.test(item.type)){var blob=item.getAsFile?item.getAsFile():item;reader=new FileReader();reader.onload=pasteImage.bind(null,reader,blob);reader.readAsDataURL(blob);e.preventDefault();hadImage=true;}}}
return hadImage;}
if(editor.settings.paste_data_images&&dataTransfer){return processItems(dataTransfer.items)||processItems(dataTransfer.files);}}
function isBrokenAndroidClipboardEvent(e){var clipboardData=e.clipboardData;return navigator.userAgent.indexOf('Android')!=-1&&clipboardData&&clipboardData.items&&clipboardData.items.length===0;}
function getCaretRangeFromEvent(e){return RangeUtils.getCaretRangeFromPoint(e.clientX,e.clientY,editor.getDoc());}
function hasContentType(clipboardContent,mimeType){return mimeType in clipboardContent&&clipboardContent[mimeType].length>0;}
function isKeyboardPasteEvent(e){return(VK.metaKeyPressed(e)&&e.keyCode==86)||(e.shiftKey&&e.keyCode==45);}
function registerEventHandlers(){editor.on('keydown',function(e){function removePasteBinOnKeyUp(e){if(isKeyboardPasteEvent(e)&&!e.isDefaultPrevented()){removePasteBin();}}
if(isKeyboardPasteEvent(e)&&!e.isDefaultPrevented()){keyboardPastePlainTextState=e.shiftKey&&e.keyCode==86;if(keyboardPastePlainTextState&&Env.webkit&&navigator.userAgent.indexOf('Version/')!=-1){return;}
e.stopImmediatePropagation();keyboardPasteTimeStamp=new Date().getTime();if(Env.ie&&keyboardPastePlainTextState){e.preventDefault();editor.fire('paste',{ieFake:true});return;}
removePasteBin();createPasteBin();editor.once('keyup',removePasteBinOnKeyUp);editor.once('paste',function(){editor.off('keyup',removePasteBinOnKeyUp);});}});function insertClipboardContent(clipboardContent,isKeyBoardPaste,plainTextMode){var content;if(hasContentType(clipboardContent,'text/html')){content=clipboardContent['text/html'];}else{content=getPasteBinHtml();if(content==pasteBinDefaultContent){plainTextMode=true;}}
content=Utils.trimHtml(content);if(pasteBinElm&&pasteBinElm.firstChild&&pasteBinElm.firstChild.id==='mcepastebin'){plainTextMode=true;}
removePasteBin();if(!content.length){plainTextMode=true;}
if(plainTextMode){if(hasContentType(clipboardContent,'text/plain')&&content.indexOf('</p>')==-1){content=clipboardContent['text/plain'];}else{content=Utils.innerText(content);}}
if(content==pasteBinDefaultContent){if(!isKeyBoardPaste){editor.windowManager.alert('Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents.');}
return;}
if(plainTextMode){pasteText(content);}else{pasteHtml(content);}}
var getLastRng=function(){return lastRng||editor.selection.getRng();};editor.on('paste',function(e){var clipboardTimer=new Date().getTime();var clipboardContent=getClipboardContent(e);var clipboardDelay=new Date().getTime()-clipboardTimer;var isKeyBoardPaste=(new Date().getTime()-keyboardPasteTimeStamp-clipboardDelay)<1000;var plainTextMode=self.pasteFormat=="text"||keyboardPastePlainTextState;keyboardPastePlainTextState=false;if(e.isDefaultPrevented()||isBrokenAndroidClipboardEvent(e)){removePasteBin();return;}
if(!hasHtmlOrText(clipboardContent)&&pasteImageData(e,getLastRng())){removePasteBin();return;}
if(!isKeyBoardPaste){e.preventDefault();}
if(Env.ie&&(!isKeyBoardPaste||e.ieFake)){createPasteBin();editor.dom.bind(pasteBinElm,'paste',function(e){e.stopPropagation();});editor.getDoc().execCommand('Paste',false,null);clipboardContent["text/html"]=getPasteBinHtml();}
if(hasContentType(clipboardContent,'text/html')){e.preventDefault();insertClipboardContent(clipboardContent,isKeyBoardPaste,plainTextMode);}else{Delay.setEditorTimeout(editor,function(){insertClipboardContent(clipboardContent,isKeyBoardPaste,plainTextMode);},0);}});editor.on('dragstart dragend',function(e){draggingInternally=e.type=='dragstart';});function isPlainTextFileUrl(content){return content['text/plain'].indexOf('file://')===0;}
editor.on('drop',function(e){var dropContent,rng;rng=getCaretRangeFromEvent(e);if(e.isDefaultPrevented()||draggingInternally){return;}
dropContent=getDataTransferItems(e.dataTransfer);if((!hasHtmlOrText(dropContent)||isPlainTextFileUrl(dropContent))&&pasteImageData(e,rng)){return;}
if(rng&&editor.settings.paste_filter_drop!==false){var content=dropContent['mce-internal']||dropContent['text/html']||dropContent['text/plain'];if(content){e.preventDefault();Delay.setEditorTimeout(editor,function(){editor.undoManager.transact(function(){if(dropContent['mce-internal']){editor.execCommand('Delete');}
editor.selection.setRng(rng);content=Utils.trimHtml(content);if(!dropContent['text/html']){pasteText(content);}else{pasteHtml(content);}});});}}});editor.on('dragover dragend',function(e){if(editor.settings.paste_data_images){e.preventDefault();}});}
self.pasteHtml=pasteHtml;self.pasteText=pasteText;editor.on('preInit',function(){registerEventHandlers();editor.parser.addNodeFilter('img',function(nodes,name,args){function isPasteInsert(args){return args.data&&args.data.paste===true;}
function remove(node){if(!node.attr('data-mce-object')&&src!==Env.transparentSrc){node.remove();}}
function isWebKitFakeUrl(src){return src.indexOf("webkit-fake-url")===0;}
function isDataUri(src){return src.indexOf("data:")===0;}
if(!editor.settings.paste_data_images&&isPasteInsert(args)){var i=nodes.length;while(i--){var src=nodes[i].attributes.map.src;if(!src){continue;}
if(isWebKitFakeUrl(src)){remove(nodes[i]);}else if(!editor.settings.allow_html_data_urls&&isDataUri(src)){remove(nodes[i]);}}}});});};});