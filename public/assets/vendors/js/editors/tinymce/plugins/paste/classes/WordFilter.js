define("tinymce/pasteplugin/WordFilter",["tinymce/util/Tools","tinymce/html/DomParser","tinymce/html/Schema","tinymce/html/Serializer","tinymce/html/Node","tinymce/pasteplugin/Utils"],function(Tools,DomParser,Schema,Serializer,Node,Utils){function isWordContent(content){return((/<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i).test(content)||(/class="OutlineElement/).test(content)||(/id="?docs\-internal\-guid\-/.test(content)));}
function isNumericList(text){var found,patterns;patterns=[/^[IVXLMCD]{1,2}\.[ \u00a0]/,/^[ivxlmcd]{1,2}\.[ \u00a0]/,/^[a-z]{1,2}[\.\)][ \u00a0]/,/^[A-Z]{1,2}[\.\)][ \u00a0]/,/^[0-9]+\.[ \u00a0]/,/^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,/^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/];text=text.replace(/^[\u00a0 ]+/,'');Tools.each(patterns,function(pattern){if(pattern.test(text)){found=true;return false;}});return found;}
function isBulletList(text){return /^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(text);}
function WordFilter(editor){var settings=editor.settings;editor.on('BeforePastePreProcess',function(e){var content=e.content,retainStyleProperties,validStyles;content=content.replace(/<b[^>]+id="?docs-internal-[^>]*>/gi,'');content=content.replace(/<br class="?Apple-interchange-newline"?>/gi,'');retainStyleProperties=settings.paste_retain_style_properties;if(retainStyleProperties){validStyles=Tools.makeMap(retainStyleProperties.split(/[, ]/));}
function convertFakeListsToProperLists(node){var currentListNode,prevListNode,lastLevel=1;function getText(node){var txt='';if(node.type===3){return node.value;}
if((node=node.firstChild)){do{txt+=getText(node);}while((node=node.next));}
return txt;}
function trimListStart(node,regExp){if(node.type===3){if(regExp.test(node.value)){node.value=node.value.replace(regExp,'');return false;}}
if((node=node.firstChild)){do{if(!trimListStart(node,regExp)){return false;}}while((node=node.next));}
return true;}
function removeIgnoredNodes(node){if(node._listIgnore){node.remove();return;}
if((node=node.firstChild)){do{removeIgnoredNodes(node);}while((node=node.next));}}
function convertParagraphToLi(paragraphNode,listName,start){var level=paragraphNode._listLevel||lastLevel;if(level!=lastLevel){if(level<lastLevel){if(currentListNode){currentListNode=currentListNode.parent.parent;}}else{prevListNode=currentListNode;currentListNode=null;}}
if(!currentListNode||currentListNode.name!=listName){prevListNode=prevListNode||currentListNode;currentListNode=new Node(listName,1);if(start>1){currentListNode.attr('start',''+start);}
paragraphNode.wrap(currentListNode);}else{currentListNode.append(paragraphNode);}
paragraphNode.name='li';if(level>lastLevel&&prevListNode){prevListNode.lastChild.append(currentListNode);}
lastLevel=level;removeIgnoredNodes(paragraphNode);trimListStart(paragraphNode,/^\u00a0+/);trimListStart(paragraphNode,/^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/);trimListStart(paragraphNode,/^\u00a0+/);}
var elements=[],child=node.firstChild;while(typeof child!=='undefined'&&child!==null){elements.push(child);child=child.walk();if(child!==null){while(typeof child!=='undefined'&&child.parent!==node){child=child.walk();}}}
for(var i=0;i<elements.length;i++){node=elements[i];if(node.name=='p'&&node.firstChild){var nodeText=getText(node);if(isBulletList(nodeText)){convertParagraphToLi(node,'ul');continue;}
if(isNumericList(nodeText)){var matches=/([0-9]+)\./.exec(nodeText);var start=1;if(matches){start=parseInt(matches[1],10);}
convertParagraphToLi(node,'ol',start);continue;}
if(node._listLevel){convertParagraphToLi(node,'ul',1);continue;}
currentListNode=null;}else{prevListNode=currentListNode;currentListNode=null;}}}
function filterStyles(node,styleValue){var outputStyles={},matches,styles=editor.dom.parseStyle(styleValue);Tools.each(styles,function(value,name){switch(name){case 'mso-list':matches=/\w+ \w+([0-9]+)/i.exec(styleValue);if(matches){node._listLevel=parseInt(matches[1],10);}
if(/Ignore/i.test(value)&&node.firstChild){node._listIgnore=true;node.firstChild._listIgnore=true;}
break;case "horiz-align":name="text-align";break;case "vert-align":name="vertical-align";break;case "font-color":case "mso-foreground":name="color";break;case "mso-background":case "mso-highlight":name="background";break;case "font-weight":case "font-style":if(value!="normal"){outputStyles[name]=value;}
return;case "mso-element":if(/^(comment|comment-list)$/i.test(value)){node.remove();return;}
break;}
if(name.indexOf('mso-comment')===0){node.remove();return;}
if(name.indexOf('mso-')===0){return;}
if(retainStyleProperties=="all"||(validStyles&&validStyles[name])){outputStyles[name]=value;}});if(/(bold)/i.test(outputStyles["font-weight"])){delete outputStyles["font-weight"];node.wrap(new Node("b",1));}
if(/(italic)/i.test(outputStyles["font-style"])){delete outputStyles["font-style"];node.wrap(new Node("i",1));}
outputStyles=editor.dom.serializeStyle(outputStyles,node.name);if(outputStyles){return outputStyles;}
return null;}
if(settings.paste_enable_default_filters===false){return;}
if(isWordContent(e.content)){e.wordContent=true;content=Utils.filter(content,[/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi,"\u00a0"],[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(str,spaces){return(spaces.length>0)?spaces.replace(/./," ").slice(Math.floor(spaces.length/2)).split("").join("\u00a0"):"";}]]);var validElements=settings.paste_word_valid_elements;if(!validElements){validElements=('-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,'+
'-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,'+
'td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody');}
var schema=new Schema({valid_elements:validElements,valid_children:'-li[p]'});Tools.each(schema.elements,function(rule){if(!rule.attributes["class"]){rule.attributes["class"]={};rule.attributesOrder.push("class");}
if(!rule.attributes.style){rule.attributes.style={};rule.attributesOrder.push("style");}});var domParser=new DomParser({},schema);domParser.addAttributeFilter('style',function(nodes){var i=nodes.length,node;while(i--){node=nodes[i];node.attr('style',filterStyles(node,node.attr('style')));if(node.name=='span'&&node.parent&&!node.attributes.length){node.unwrap();}}});domParser.addAttributeFilter('class',function(nodes){var i=nodes.length,node,className;while(i--){node=nodes[i];className=node.attr('class');if(/^(MsoCommentReference|MsoCommentText|msoDel)$/i.test(className)){node.remove();}
node.attr('class',null);}});domParser.addNodeFilter('del',function(nodes){var i=nodes.length;while(i--){nodes[i].remove();}});domParser.addNodeFilter('a',function(nodes){var i=nodes.length,node,href,name;while(i--){node=nodes[i];href=node.attr('href');name=node.attr('name');if(href&&href.indexOf('#_msocom_')!=-1){node.remove();continue;}
if(href&&href.indexOf('file://')===0){href=href.split('#')[1];if(href){href='#'+href;}}
if(!href&&!name){node.unwrap();}else{if(name&&!/^_?(?:toc|edn|ftn)/i.test(name)){node.unwrap();continue;}
node.attr({href:href,name:name});}}});var rootNode=domParser.parse(content);if(settings.paste_convert_word_fake_lists!==false){convertFakeListsToProperLists(rootNode);}
e.content=new Serializer({validate:settings.validate},schema).serialize(rootNode);}});}
WordFilter.isWordContent=isWordContent;return WordFilter;});