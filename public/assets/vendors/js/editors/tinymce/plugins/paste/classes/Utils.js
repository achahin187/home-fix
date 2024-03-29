define("tinymce/pasteplugin/Utils",["tinymce/util/Tools","tinymce/html/DomParser","tinymce/html/Schema"],function(Tools,DomParser,Schema){function filter(content,items){Tools.each(items,function(v){if(v.constructor==RegExp){content=content.replace(v,'');}else{content=content.replace(v[0],v[1]);}});return content;}
function innerText(html){var schema=new Schema(),domParser=new DomParser({},schema),text='';var shortEndedElements=schema.getShortEndedElements();var ignoreElements=Tools.makeMap('script noscript style textarea video audio iframe object',' ');var blockElements=schema.getBlockElements();function walk(node){var name=node.name,currentNode=node;if(name==='br'){text+='\n';return;}
if(shortEndedElements[name]){text+=' ';}
if(ignoreElements[name]){text+=' ';return;}
if(node.type==3){text+=node.value;}
if(!node.shortEnded){if((node=node.firstChild)){do{walk(node);}while((node=node.next));}}
if(blockElements[name]&&currentNode.next){text+='\n';if(name=='p'){text+='\n';}}}
html=filter(html,[/<!\[[^\]]+\]>/g]);walk(domParser.parse(html));return text;}
function trimHtml(html){function trimSpaces(all,s1,s2){if(!s1&&!s2){return ' ';}
return '\u00a0';}
html=filter(html,[/^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/g,/<!--StartFragment-->|<!--EndFragment-->/g,[/( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,trimSpaces],/<br class="Apple-interchange-newline">/g,/<br>$/i]);return html;}
function createIdGenerator(prefix){var count=0;return function(){return prefix+(count++);};}
return{filter:filter,innerText:innerText,trimHtml:trimHtml,createIdGenerator:createIdGenerator};});