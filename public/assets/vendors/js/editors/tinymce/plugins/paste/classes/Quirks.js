define("tinymce/pasteplugin/Quirks",["tinymce/Env","tinymce/util/Tools","tinymce/pasteplugin/WordFilter","tinymce/pasteplugin/Utils"],function(Env,Tools,WordFilter,Utils){"use strict";return function(editor){function addPreProcessFilter(filterFunc){editor.on('BeforePastePreProcess',function(e){e.content=filterFunc(e.content);});}
function removeExplorerBrElementsAfterBlocks(html){if(!WordFilter.isWordContent(html)){return html;}
var blockElements=[];Tools.each(editor.schema.getBlockElements(),function(block,blockName){blockElements.push(blockName);});var explorerBlocksRegExp=new RegExp('(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?('+blockElements.join('|')+')[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*','g');html=Utils.filter(html,[[explorerBlocksRegExp,'$1']]);html=Utils.filter(html,[[/<br><br>/g,'<BR><BR>'],[/<br>/g,' '],[/<BR><BR>/g,'<br>']]);return html;}
function removeWebKitStyles(content){if(WordFilter.isWordContent(content)){return content;}
var webKitStyles=editor.settings.paste_webkit_styles;if(editor.settings.paste_remove_styles_if_webkit===false||webKitStyles=="all"){return content;}
if(webKitStyles){webKitStyles=webKitStyles.split(/[, ]/);}
if(webKitStyles){var dom=editor.dom,node=editor.selection.getNode();content=content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi,function(all,before,value,after){var inputStyles=dom.parseStyle(value,'span'),outputStyles={};if(webKitStyles==="none"){return before+after;}
for(var i=0;i<webKitStyles.length;i++){var inputValue=inputStyles[webKitStyles[i]],currentValue=dom.getStyle(node,webKitStyles[i],true);if(/color/.test(webKitStyles[i])){inputValue=dom.toHex(inputValue);currentValue=dom.toHex(currentValue);}
if(currentValue!=inputValue){outputStyles[webKitStyles[i]]=inputValue;}}
outputStyles=dom.serializeStyle(outputStyles,'span');if(outputStyles){return before+' style="'+outputStyles+'"'+after;}
return before+after;});}else{content=content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi,'$1$3');}
content=content.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi,function(all,before,value,after){return before+' style="'+value+'"'+after;});return content;}
if(Env.webkit){addPreProcessFilter(removeWebKitStyles);}
if(Env.ie){addPreProcessFilter(removeExplorerBrElementsAfterBlocks);}};});