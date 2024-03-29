(function(exports,undefined){"use strict";var modules={};function require(ids,callback){var module,defs=[];for(var i=0;i<ids.length;++i){module=modules[ids[i]]||resolve(ids[i]);if(!module){throw 'module definition dependecy not found: '+ids[i];}
defs.push(module);}
callback.apply(null,defs);}
function define(id,dependencies,definition){if(typeof id!=='string'){throw 'invalid module definition, module id must be defined and be a string';}
if(dependencies===undefined){throw 'invalid module definition, dependencies must be specified';}
if(definition===undefined){throw 'invalid module definition, definition function must be specified';}
require(dependencies,function(){modules[id]=definition.apply(null,arguments);});}
function defined(id){return!!modules[id];}
function resolve(id){var target=exports;var fragments=id.split(/[.\/]/);for(var fi=0;fi<fragments.length;++fi){if(!target[fragments[fi]]){return;}
target=target[fragments[fi]];}
return target;}
function expose(ids){var i,target,id,fragments,privateModules;for(i=0;i<ids.length;i++){target=exports;id=ids[i];fragments=id.split(/[.\/]/);for(var fi=0;fi<fragments.length-1;++fi){if(target[fragments[fi]]===undefined){target[fragments[fi]]={};}
target=target[fragments[fi]];}
target[fragments[fragments.length-1]]=modules[id];}
if(exports.AMDLC_TESTS){privateModules=exports.privateModules||{};for(id in modules){privateModules[id]=modules[id];}
for(i=0;i<ids.length;i++){delete privateModules[ids[i]];}
exports.privateModules=privateModules;}}
define("tinymce/spellcheckerplugin/DomTextMatcher",[],function(){function isContentEditableFalse(node){return node&&node.nodeType==1&&node.contentEditable==="false";}
return function(node,editor){var m,matches=[],text,dom=editor.dom;var blockElementsMap,hiddenTextElementsMap,shortEndedElementsMap;blockElementsMap=editor.schema.getBlockElements();hiddenTextElementsMap=editor.schema.getWhiteSpaceElements();shortEndedElementsMap=editor.schema.getShortEndedElements();function createMatch(m,data){if(!m[0]){throw 'findAndReplaceDOMText cannot handle zero-length matches';}
return{start:m.index,end:m.index+m[0].length,text:m[0],data:data};}
function getText(node){var txt;if(node.nodeType===3){return node.data;}
if(hiddenTextElementsMap[node.nodeName]&&!blockElementsMap[node.nodeName]){return '';}
if(isContentEditableFalse(node)){return '\n';}
txt='';if(blockElementsMap[node.nodeName]||shortEndedElementsMap[node.nodeName]){txt+='\n';}
if((node=node.firstChild)){do{txt+=getText(node);}while((node=node.nextSibling));}
return txt;}
function stepThroughMatches(node,matches,replaceFn){var startNode,endNode,startNodeIndex,endNodeIndex,innerNodes=[],atIndex=0,curNode=node,matchLocation,matchIndex=0;matches=matches.slice(0);matches.sort(function(a,b){return a.start-b.start;});matchLocation=matches.shift();out:while(true){if(blockElementsMap[curNode.nodeName]||shortEndedElementsMap[curNode.nodeName]||isContentEditableFalse(curNode)){atIndex++;}
if(curNode.nodeType===3){if(!endNode&&curNode.length+atIndex>=matchLocation.end){endNode=curNode;endNodeIndex=matchLocation.end-atIndex;}else if(startNode){innerNodes.push(curNode);}
if(!startNode&&curNode.length+atIndex>matchLocation.start){startNode=curNode;startNodeIndex=matchLocation.start-atIndex;}
atIndex+=curNode.length;}
if(startNode&&endNode){curNode=replaceFn({startNode:startNode,startNodeIndex:startNodeIndex,endNode:endNode,endNodeIndex:endNodeIndex,innerNodes:innerNodes,match:matchLocation.text,matchIndex:matchIndex});atIndex-=(endNode.length-endNodeIndex);startNode=null;endNode=null;innerNodes=[];matchLocation=matches.shift();matchIndex++;if(!matchLocation){break;}}else if((!hiddenTextElementsMap[curNode.nodeName]||blockElementsMap[curNode.nodeName])&&curNode.firstChild){if(!isContentEditableFalse(curNode)){curNode=curNode.firstChild;continue;}}else if(curNode.nextSibling){curNode=curNode.nextSibling;continue;}
while(true){if(curNode.nextSibling){curNode=curNode.nextSibling;break;}else if(curNode.parentNode!==node){curNode=curNode.parentNode;}else{break out;}}}}
function genReplacer(callback){function makeReplacementNode(fill,matchIndex){var match=matches[matchIndex];if(!match.stencil){match.stencil=callback(match);}
var clone=match.stencil.cloneNode(false);clone.setAttribute('data-mce-index',matchIndex);if(fill){clone.appendChild(dom.doc.createTextNode(fill));}
return clone;}
return function(range){var before,after,parentNode,startNode=range.startNode,endNode=range.endNode,matchIndex=range.matchIndex,doc=dom.doc;if(startNode===endNode){var node=startNode;parentNode=node.parentNode;if(range.startNodeIndex>0){before=doc.createTextNode(node.data.substring(0,range.startNodeIndex));parentNode.insertBefore(before,node);}
var el=makeReplacementNode(range.match,matchIndex);parentNode.insertBefore(el,node);if(range.endNodeIndex<node.length){after=doc.createTextNode(node.data.substring(range.endNodeIndex));parentNode.insertBefore(after,node);}
node.parentNode.removeChild(node);return el;}
before=doc.createTextNode(startNode.data.substring(0,range.startNodeIndex));after=doc.createTextNode(endNode.data.substring(range.endNodeIndex));var elA=makeReplacementNode(startNode.data.substring(range.startNodeIndex),matchIndex);var innerEls=[];for(var i=0,l=range.innerNodes.length;i<l;++i){var innerNode=range.innerNodes[i];var innerEl=makeReplacementNode(innerNode.data,matchIndex);innerNode.parentNode.replaceChild(innerEl,innerNode);innerEls.push(innerEl);}
var elB=makeReplacementNode(endNode.data.substring(0,range.endNodeIndex),matchIndex);parentNode=startNode.parentNode;parentNode.insertBefore(before,startNode);parentNode.insertBefore(elA,startNode);parentNode.removeChild(startNode);parentNode=endNode.parentNode;parentNode.insertBefore(elB,endNode);parentNode.insertBefore(after,endNode);parentNode.removeChild(endNode);return elB;};}
function unwrapElement(element){var parentNode=element.parentNode;parentNode.insertBefore(element.firstChild,element);element.parentNode.removeChild(element);}
function getWrappersByIndex(index){var elements=node.getElementsByTagName('*'),wrappers=[];index=typeof index=="number"?""+index:null;for(var i=0;i<elements.length;i++){var element=elements[i],dataIndex=element.getAttribute('data-mce-index');if(dataIndex!==null&&dataIndex.length){if(dataIndex===index||index===null){wrappers.push(element);}}}
return wrappers;}
function indexOf(match){var i=matches.length;while(i--){if(matches[i]===match){return i;}}
return-1;}
function filter(callback){var filteredMatches=[];each(function(match,i){if(callback(match,i)){filteredMatches.push(match);}});matches=filteredMatches;return this;}
function each(callback){for(var i=0,l=matches.length;i<l;i++){if(callback(matches[i],i)===false){break;}}
return this;}
function wrap(callback){if(matches.length){stepThroughMatches(node,matches,genReplacer(callback));}
return this;}
function find(regex,data){if(text&&regex.global){while((m=regex.exec(text))){matches.push(createMatch(m,data));}}
return this;}
function unwrap(match){var i,elements=getWrappersByIndex(match?indexOf(match):null);i=elements.length;while(i--){unwrapElement(elements[i]);}
return this;}
function matchFromElement(element){return matches[element.getAttribute('data-mce-index')];}
function elementFromMatch(match){return getWrappersByIndex(indexOf(match))[0];}
function add(start,length,data){matches.push({start:start,end:start+length,text:text.substr(start,length),data:data});return this;}
function rangeFromMatch(match){var wrappers=getWrappersByIndex(indexOf(match));var rng=editor.dom.createRng();rng.setStartBefore(wrappers[0]);rng.setEndAfter(wrappers[wrappers.length-1]);return rng;}
function replace(match,text){var rng=rangeFromMatch(match);rng.deleteContents();if(text.length>0){rng.insertNode(editor.dom.doc.createTextNode(text));}
return rng;}
function reset(){matches.splice(0,matches.length);unwrap();return this;}
text=getText(node);return{text:text,matches:matches,each:each,filter:filter,reset:reset,matchFromElement:matchFromElement,elementFromMatch:elementFromMatch,find:find,add:add,wrap:wrap,unwrap:unwrap,replace:replace,rangeFromMatch:rangeFromMatch,indexOf:indexOf};};});define("tinymce/spellcheckerplugin/Plugin",["tinymce/spellcheckerplugin/DomTextMatcher","tinymce/PluginManager","tinymce/util/Tools","tinymce/ui/Menu","tinymce/dom/DOMUtils","tinymce/util/XHR","tinymce/util/URI","tinymce/util/JSON"],function(DomTextMatcher,PluginManager,Tools,Menu,DOMUtils,XHR,URI,JSON){PluginManager.add('spellchecker',function(editor,url){var languageMenuItems,self=this,lastSuggestions,started,suggestionsMenu,settings=editor.settings;var hasDictionarySupport;function getTextMatcher(){if(!self.textMatcher){self.textMatcher=new DomTextMatcher(editor.getBody(),editor);}
return self.textMatcher;}
function buildMenuItems(listName,languageValues){var items=[];Tools.each(languageValues,function(languageValue){items.push({selectable:true,text:languageValue.name,data:languageValue.value});});return items;}
var languagesString=settings.spellchecker_languages||'English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR,'+
'German=de,Italian=it,Polish=pl,Portuguese=pt_BR,'+
'Spanish=es,Swedish=sv';languageMenuItems=buildMenuItems('Language',Tools.map(languagesString.split(','),function(langPair){langPair=langPair.split('=');return{name:langPair[0],value:langPair[1]};}));function isEmpty(obj){for(var name in obj){return false;}
return true;}
function showSuggestions(word,spans){var items=[],suggestions=lastSuggestions[word];Tools.each(suggestions,function(suggestion){items.push({text:suggestion,onclick:function(){editor.insertContent(editor.dom.encode(suggestion));editor.dom.remove(spans);checkIfFinished();}});});items.push({text:'-'});if(hasDictionarySupport){items.push({text:'Add to Dictionary',onclick:function(){addToDictionary(word,spans);}});}
items.push.apply(items,[{text:'Ignore',onclick:function(){ignoreWord(word,spans);}},{text:'Ignore all',onclick:function(){ignoreWord(word,spans,true);}}]);suggestionsMenu=new Menu({items:items,context:'contextmenu',onautohide:function(e){if(e.target.className.indexOf('spellchecker')!=-1){e.preventDefault();}},onhide:function(){suggestionsMenu.remove();suggestionsMenu=null;}});suggestionsMenu.renderTo(document.body);var pos=DOMUtils.DOM.getPos(editor.getContentAreaContainer());var targetPos=editor.dom.getPos(spans[0]);var root=editor.dom.getRoot();if(root.nodeName=='BODY'){targetPos.x-=root.ownerDocument.documentElement.scrollLeft||root.scrollLeft;targetPos.y-=root.ownerDocument.documentElement.scrollTop||root.scrollTop;}else{targetPos.x-=root.scrollLeft;targetPos.y-=root.scrollTop;}
pos.x+=targetPos.x;pos.y+=targetPos.y;suggestionsMenu.moveTo(pos.x,pos.y+spans[0].offsetHeight);}
function getWordCharPattern(){return editor.getParam('spellchecker_wordchar_pattern')||new RegExp("[^"+
"\\s!\"#$%&()*+,-./:;<=>?@[\\]^_{|}`"+
"\u00a7\u00a9\u00ab\u00ae\u00b1\u00b6\u00b7\u00b8\u00bb"+
"\u00bc\u00bd\u00be\u00bf\u00d7\u00f7\u00a4\u201d\u201c\u201e\u00a0\u2002\u2003\u2009"+
"]+","g");}
function defaultSpellcheckCallback(method,text,doneCallback,errorCallback){var data={method:method,lang:settings.spellchecker_language},postData='';data[method=="addToDictionary"?"word":"text"]=text;Tools.each(data,function(value,key){if(postData){postData+='&';}
postData+=key+'='+encodeURIComponent(value);});XHR.send({url:new URI(url).toAbsolute(settings.spellchecker_rpc_url),type:"post",content_type:'application/x-www-form-urlencoded',data:postData,success:function(result){result=JSON.parse(result);if(!result){var message=editor.translate("Server response wasn't proper JSON.");errorCallback(message);}else if(result.error){errorCallback(result.error);}else{doneCallback(result);}},error:function(){var message=editor.translate("The spelling service was not found: (")+
settings.spellchecker_rpc_url+
editor.translate(")");errorCallback(message);}});}
function sendRpcCall(name,data,successCallback,errorCallback){var spellCheckCallback=settings.spellchecker_callback||defaultSpellcheckCallback;spellCheckCallback.call(self,name,data,successCallback,errorCallback);}
function spellcheck(){if(finish()){return;}
function errorCallback(message){editor.notificationManager.open({text:message,type:'error'});editor.setProgressState(false);finish();}
editor.setProgressState(true);sendRpcCall("spellcheck",getTextMatcher().text,markErrors,errorCallback);editor.focus();}
function checkIfFinished(){if(!editor.dom.select('span.mce-spellchecker-word').length){finish();}}
function addToDictionary(word,spans){editor.setProgressState(true);sendRpcCall("addToDictionary",word,function(){editor.setProgressState(false);editor.dom.remove(spans,true);checkIfFinished();},function(message){editor.notificationManager.open({text:message,type:'error'});editor.setProgressState(false);});}
function ignoreWord(word,spans,all){editor.selection.collapse();if(all){Tools.each(editor.dom.select('span.mce-spellchecker-word'),function(span){if(span.getAttribute('data-mce-word')==word){editor.dom.remove(span,true);}});}else{editor.dom.remove(spans,true);}
checkIfFinished();}
function finish(){getTextMatcher().reset();self.textMatcher=null;if(started){started=false;editor.fire('SpellcheckEnd');return true;}}
function getElmIndex(elm){var value=elm.getAttribute('data-mce-index');if(typeof value=="number"){return ""+value;}
return value;}
function findSpansByIndex(index){var nodes,spans=[];nodes=Tools.toArray(editor.getBody().getElementsByTagName('span'));if(nodes.length){for(var i=0;i<nodes.length;i++){var nodeIndex=getElmIndex(nodes[i]);if(nodeIndex===null||!nodeIndex.length){continue;}
if(nodeIndex===index.toString()){spans.push(nodes[i]);}}}
return spans;}
editor.on('click',function(e){var target=e.target;if(target.className=="mce-spellchecker-word"){e.preventDefault();var spans=findSpansByIndex(getElmIndex(target));if(spans.length>0){var rng=editor.dom.createRng();rng.setStartBefore(spans[0]);rng.setEndAfter(spans[spans.length-1]);editor.selection.setRng(rng);showSuggestions(target.getAttribute('data-mce-word'),spans);}}});editor.addMenuItem('spellchecker',{text:'Spellcheck',context:'tools',onclick:spellcheck,selectable:true,onPostRender:function(){var self=this;self.active(started);editor.on('SpellcheckStart SpellcheckEnd',function(){self.active(started);});}});function updateSelection(e){var selectedLanguage=settings.spellchecker_language;e.control.items().each(function(ctrl){ctrl.active(ctrl.settings.data===selectedLanguage);});}
function markErrors(data){var suggestions;if(data.words){hasDictionarySupport=!!data.dictionary;suggestions=data.words;}else{suggestions=data;}
editor.setProgressState(false);if(isEmpty(suggestions)){var message=editor.translate('No misspellings found.');editor.notificationManager.open({text:message,type:'info'});started=false;return;}
lastSuggestions=suggestions;getTextMatcher().find(getWordCharPattern()).filter(function(match){return!!suggestions[match.text];}).wrap(function(match){return editor.dom.create('span',{"class":'mce-spellchecker-word',"data-mce-bogus":1,"data-mce-word":match.text});});started=true;editor.fire('SpellcheckStart');}
var buttonArgs={tooltip:'Spellcheck',onclick:spellcheck,onPostRender:function(){var self=this;editor.on('SpellcheckStart SpellcheckEnd',function(){self.active(started);});}};if(languageMenuItems.length>1){buttonArgs.type='splitbutton';buttonArgs.menu=languageMenuItems;buttonArgs.onshow=updateSelection;buttonArgs.onselect=function(e){settings.spellchecker_language=e.control.settings.data;};}
editor.addButton('spellchecker',buttonArgs);editor.addCommand('mceSpellCheck',spellcheck);editor.on('remove',function(){if(suggestionsMenu){suggestionsMenu.remove();suggestionsMenu=null;}});editor.on('change',checkIfFinished);this.getTextMatcher=getTextMatcher;this.getWordCharPattern=getWordCharPattern;this.markErrors=markErrors;this.getLanguage=function(){return settings.spellchecker_language;};settings.spellchecker_language=settings.spellchecker_language||settings.language||'en';});});expose(["tinymce/spellcheckerplugin/DomTextMatcher"]);})(this);