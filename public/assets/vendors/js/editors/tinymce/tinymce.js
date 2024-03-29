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
define("tinymce/geom/Rect",[],function(){"use strict";var min=Math.min,max=Math.max,round=Math.round;function relativePosition(rect,targetRect,rel){var x,y,w,h,targetW,targetH;x=targetRect.x;y=targetRect.y;w=rect.w;h=rect.h;targetW=targetRect.w;targetH=targetRect.h;rel=(rel||'').split('');if(rel[0]==='b'){y+=targetH;}
if(rel[1]==='r'){x+=targetW;}
if(rel[0]==='c'){y+=round(targetH/2);}
if(rel[1]==='c'){x+=round(targetW/2);}
if(rel[3]==='b'){y-=h;}
if(rel[4]==='r'){x-=w;}
if(rel[3]==='c'){y-=round(h/2);}
if(rel[4]==='c'){x-=round(w/2);}
return create(x,y,w,h);}
function findBestRelativePosition(rect,targetRect,constrainRect,rels){var pos,i;for(i=0;i<rels.length;i++){pos=relativePosition(rect,targetRect,rels[i]);if(pos.x>=constrainRect.x&&pos.x+pos.w<=constrainRect.w+constrainRect.x&&pos.y>=constrainRect.y&&pos.y+pos.h<=constrainRect.h+constrainRect.y){return rels[i];}}
return null;}
function inflate(rect,w,h){return create(rect.x-w,rect.y-h,rect.w+w*2,rect.h+h*2);}
function intersect(rect,cropRect){var x1,y1,x2,y2;x1=max(rect.x,cropRect.x);y1=max(rect.y,cropRect.y);x2=min(rect.x+rect.w,cropRect.x+cropRect.w);y2=min(rect.y+rect.h,cropRect.y+cropRect.h);if(x2-x1<0||y2-y1<0){return null;}
return create(x1,y1,x2-x1,y2-y1);}
function clamp(rect,clampRect,fixedSize){var underflowX1,underflowY1,overflowX2,overflowY2,x1,y1,x2,y2,cx2,cy2;x1=rect.x;y1=rect.y;x2=rect.x+rect.w;y2=rect.y+rect.h;cx2=clampRect.x+clampRect.w;cy2=clampRect.y+clampRect.h;underflowX1=max(0,clampRect.x-x1);underflowY1=max(0,clampRect.y-y1);overflowX2=max(0,x2-cx2);overflowY2=max(0,y2-cy2);x1+=underflowX1;y1+=underflowY1;if(fixedSize){x2+=underflowX1;y2+=underflowY1;x1-=overflowX2;y1-=overflowY2;}
x2-=overflowX2;y2-=overflowY2;return create(x1,y1,x2-x1,y2-y1);}
function create(x,y,w,h){return{x:x,y:y,w:w,h:h};}
function fromClientRect(clientRect){return create(clientRect.left,clientRect.top,clientRect.width,clientRect.height);}
return{inflate:inflate,relativePosition:relativePosition,findBestRelativePosition:findBestRelativePosition,intersect:intersect,clamp:clamp,create:create,fromClientRect:fromClientRect};});define("tinymce/util/Promise",[],function(){if(window.Promise){return window.Promise;}
var asap=Promise.immediateFn||(typeof setImmediate==='function'&&setImmediate)||function(fn){setTimeout(fn,1);};function bind(fn,thisArg){return function(){fn.apply(thisArg,arguments);};}
var isArray=Array.isArray||function(value){return Object.prototype.toString.call(value)==="[object Array]";};function Promise(fn){if(typeof this!=='object')throw new TypeError('Promises must be constructed via new');if(typeof fn!=='function')throw new TypeError('not a function');this._state=null;this._value=null;this._deferreds=[];doResolve(fn,bind(resolve,this),bind(reject,this));}
function handle(deferred){var me=this;if(this._state===null){this._deferreds.push(deferred);return;}
asap(function(){var cb=me._state?deferred.onFulfilled:deferred.onRejected;if(cb===null){(me._state?deferred.resolve:deferred.reject)(me._value);return;}
var ret;try{ret=cb(me._value);}
catch(e){deferred.reject(e);return;}
deferred.resolve(ret);});}
function resolve(newValue){try{if(newValue===this)throw new TypeError('A promise cannot be resolved with itself.');if(newValue&&(typeof newValue==='object'||typeof newValue==='function')){var then=newValue.then;if(typeof then==='function'){doResolve(bind(then,newValue),bind(resolve,this),bind(reject,this));return;}}
this._state=true;this._value=newValue;finale.call(this);}catch(e){reject.call(this,e);}}
function reject(newValue){this._state=false;this._value=newValue;finale.call(this);}
function finale(){for(var i=0,len=this._deferreds.length;i<len;i++){handle.call(this,this._deferreds[i]);}
this._deferreds=null;}
function Handler(onFulfilled,onRejected,resolve,reject){this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;this.onRejected=typeof onRejected==='function'?onRejected:null;this.resolve=resolve;this.reject=reject;}
function doResolve(fn,onFulfilled,onRejected){var done=false;try{fn(function(value){if(done)return;done=true;onFulfilled(value);},function(reason){if(done)return;done=true;onRejected(reason);});}catch(ex){if(done)return;done=true;onRejected(ex);}}
Promise.prototype['catch']=function(onRejected){return this.then(null,onRejected);};Promise.prototype.then=function(onFulfilled,onRejected){var me=this;return new Promise(function(resolve,reject){handle.call(me,new Handler(onFulfilled,onRejected,resolve,reject));});};Promise.all=function(){var args=Array.prototype.slice.call(arguments.length===1&&isArray(arguments[0])?arguments[0]:arguments);return new Promise(function(resolve,reject){if(args.length===0)return resolve([]);var remaining=args.length;function res(i,val){try{if(val&&(typeof val==='object'||typeof val==='function')){var then=val.then;if(typeof then==='function'){then.call(val,function(val){res(i,val);},reject);return;}}
args[i]=val;if(--remaining===0){resolve(args);}}catch(ex){reject(ex);}}
for(var i=0;i<args.length;i++){res(i,args[i]);}});};Promise.resolve=function(value){if(value&&typeof value==='object'&&value.constructor===Promise){return value;}
return new Promise(function(resolve){resolve(value);});};Promise.reject=function(value){return new Promise(function(resolve,reject){reject(value);});};Promise.race=function(values){return new Promise(function(resolve,reject){for(var i=0,len=values.length;i<len;i++){values[i].then(resolve,reject);}});};return Promise;});define("tinymce/util/Delay",["tinymce/util/Promise"],function(Promise){var requestAnimationFramePromise;function requestAnimationFrame(callback,element){var i,requestAnimationFrameFunc=window.requestAnimationFrame,vendors=['ms','moz','webkit'];function featurefill(callback){window.setTimeout(callback,0);}
for(i=0;i<vendors.length&&!requestAnimationFrameFunc;i++){requestAnimationFrameFunc=window[vendors[i]+'RequestAnimationFrame'];}
if(!requestAnimationFrameFunc){requestAnimationFrameFunc=featurefill;}
requestAnimationFrameFunc(callback,element);}
function wrappedSetTimeout(callback,time){if(typeof time!='number'){time=0;}
return setTimeout(callback,time);}
function wrappedSetInterval(callback,time){if(typeof time!='number'){time=0;}
return setInterval(callback,time);}
function wrappedClearTimeout(id){return clearTimeout(id);}
function wrappedClearInterval(id){return clearInterval(id);}
return{requestAnimationFrame:function(callback,element){if(requestAnimationFramePromise){requestAnimationFramePromise.then(callback);return;}
requestAnimationFramePromise=new Promise(function(resolve){if(!element){element=document.body;}
requestAnimationFrame(resolve,element);}).then(callback);},setTimeout:wrappedSetTimeout,setInterval:wrappedSetInterval,setEditorTimeout:function(editor,callback,time){return wrappedSetTimeout(function(){if(!editor.removed){callback();}},time);},setEditorInterval:function(editor,callback,time){var timer;timer=wrappedSetInterval(function(){if(!editor.removed){callback();}else{clearInterval(timer);}},time);return timer;},throttle:function(callback,time){var timer,func;func=function(){var args=arguments;clearTimeout(timer);timer=wrappedSetTimeout(function(){callback.apply(this,args);},time);};func.stop=function(){clearTimeout(timer);};return func;},clearInterval:wrappedClearInterval,clearTimeout:wrappedClearTimeout};});define("tinymce/Env",[],function(){var nav=navigator,userAgent=nav.userAgent;var opera,webkit,ie,ie11,ie12,gecko,mac,iDevice,android,fileApi,phone,tablet,windowsPhone;function matchMediaQuery(query){return "matchMedia"in window?matchMedia(query).matches:false;}
opera=window.opera&&window.opera.buildNumber;android=/Android/.test(userAgent);webkit=/WebKit/.test(userAgent);ie=!webkit&&!opera&&(/MSIE/gi).test(userAgent)&&(/Explorer/gi).test(nav.appName);ie=ie&&/MSIE (\w+)\./.exec(userAgent)[1];ie11=userAgent.indexOf('Trident/')!=-1&&(userAgent.indexOf('rv:')!=-1||nav.appName.indexOf('Netscape')!=-1)?11:false;ie12=(userAgent.indexOf('Edge/')!=-1&&!ie&&!ie11)?12:false;ie=ie||ie11||ie12;gecko=!webkit&&!ie11&&/Gecko/.test(userAgent);mac=userAgent.indexOf('Mac')!=-1;iDevice=/(iPad|iPhone)/.test(userAgent);fileApi="FormData"in window&&"FileReader"in window&&"URL"in window&&!!URL.createObjectURL;phone=matchMediaQuery("only screen and (max-device-width: 480px)")&&(android||iDevice);tablet=matchMediaQuery("only screen and (min-width: 800px)")&&(android||iDevice);windowsPhone=userAgent.indexOf('Windows Phone')!=-1;if(ie12){webkit=false;}
var contentEditable=!iDevice||fileApi||userAgent.match(/AppleWebKit\/(\d*)/)[1]>=534;return{opera:opera,webkit:webkit,ie:ie,gecko:gecko,mac:mac,iOS:iDevice,android:android,contentEditable:contentEditable,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:ie!=8,range:window.getSelection&&"Range"in window,documentMode:ie&&!ie12?(document.documentMode||7):10,fileApi:fileApi,ceFalse:(ie===false||ie>8),desktop:!phone&&!tablet,windowsPhone:windowsPhone};});define("tinymce/dom/EventUtils",["tinymce/util/Delay","tinymce/Env"],function(Delay,Env){"use strict";var eventExpandoPrefix="mce-data-";var mouseEventRe=/^(?:mouse|contextmenu)|click/;var deprecated={keyLocation:1,layerX:1,layerY:1,returnValue:1,webkitMovementX:1,webkitMovementY:1,keyIdentifier:1};function addEvent(target,name,callback,capture){if(target.addEventListener){target.addEventListener(name,callback,capture||false);}else if(target.attachEvent){target.attachEvent('on'+name,callback);}}
function removeEvent(target,name,callback,capture){if(target.removeEventListener){target.removeEventListener(name,callback,capture||false);}else if(target.detachEvent){target.detachEvent('on'+name,callback);}}
function getTargetFromShadowDom(event,defaultTarget){var path,target=defaultTarget;path=event.path;if(path&&path.length>0){target=path[0];}
if(event.deepPath){path=event.deepPath();if(path&&path.length>0){target=path[0];}}
return target;}
function fix(originalEvent,data){var name,event=data||{},undef;function returnFalse(){return false;}
function returnTrue(){return true;}
for(name in originalEvent){if(!deprecated[name]){event[name]=originalEvent[name];}}
if(!event.target){event.target=event.srcElement||document;}
if(Env.experimentalShadowDom){event.target=getTargetFromShadowDom(originalEvent,event.target);}
if(originalEvent&&mouseEventRe.test(originalEvent.type)&&originalEvent.pageX===undef&&originalEvent.clientX!==undef){var eventDoc=event.target.ownerDocument||document;var doc=eventDoc.documentElement;var body=eventDoc.body;event.pageX=originalEvent.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-
(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=originalEvent.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-
(doc&&doc.clientTop||body&&body.clientTop||0);}
event.preventDefault=function(){event.isDefaultPrevented=returnTrue;if(originalEvent){if(originalEvent.preventDefault){originalEvent.preventDefault();}else{originalEvent.returnValue=false;}}};event.stopPropagation=function(){event.isPropagationStopped=returnTrue;if(originalEvent){if(originalEvent.stopPropagation){originalEvent.stopPropagation();}else{originalEvent.cancelBubble=true;}}};event.stopImmediatePropagation=function(){event.isImmediatePropagationStopped=returnTrue;event.stopPropagation();};if(!event.isDefaultPrevented){event.isDefaultPrevented=returnFalse;event.isPropagationStopped=returnFalse;event.isImmediatePropagationStopped=returnFalse;}
if(typeof event.metaKey=='undefined'){event.metaKey=false;}
return event;}
function bindOnReady(win,callback,eventUtils){var doc=win.document,event={type:'ready'};if(eventUtils.domLoaded){callback(event);return;}
function readyHandler(){if(!eventUtils.domLoaded){eventUtils.domLoaded=true;callback(event);}}
function waitForDomLoaded(){if(doc.readyState==="complete"||(doc.readyState==="interactive"&&doc.body)){removeEvent(doc,"readystatechange",waitForDomLoaded);readyHandler();}}
function tryScroll(){try{doc.documentElement.doScroll("left");}catch(ex){Delay.setTimeout(tryScroll);return;}
readyHandler();}
if(doc.addEventListener){if(doc.readyState==="complete"){readyHandler();}else{addEvent(win,'DOMContentLoaded',readyHandler);}}else{addEvent(doc,"readystatechange",waitForDomLoaded);if(doc.documentElement.doScroll&&win.self===win.top){tryScroll();}}
addEvent(win,'load',readyHandler);}
function EventUtils(){var self=this,events={},count,expando,hasFocusIn,hasMouseEnterLeave,mouseEnterLeave;expando=eventExpandoPrefix+(+new Date()).toString(32);hasMouseEnterLeave="onmouseenter"in document.documentElement;hasFocusIn="onfocusin"in document.documentElement;mouseEnterLeave={mouseenter:'mouseover',mouseleave:'mouseout'};count=1;self.domLoaded=false;self.events=events;function executeHandlers(evt,id){var callbackList,i,l,callback,container=events[id];callbackList=container&&container[evt.type];if(callbackList){for(i=0,l=callbackList.length;i<l;i++){callback=callbackList[i];if(callback&&callback.func.call(callback.scope,evt)===false){evt.preventDefault();}
if(evt.isImmediatePropagationStopped()){return;}}}}
self.bind=function(target,names,callback,scope){var id,callbackList,i,name,fakeName,nativeHandler,capture,win=window;function defaultNativeHandler(evt){executeHandlers(fix(evt||win.event),id);}
if(!target||target.nodeType===3||target.nodeType===8){return;}
if(!target[expando]){id=count++;target[expando]=id;events[id]={};}else{id=target[expando];}
scope=scope||target;names=names.split(' ');i=names.length;while(i--){name=names[i];nativeHandler=defaultNativeHandler;fakeName=capture=false;if(name==="DOMContentLoaded"){name="ready";}
if(self.domLoaded&&name==="ready"&&target.readyState=='complete'){callback.call(scope,fix({type:name}));continue;}
if(!hasMouseEnterLeave){fakeName=mouseEnterLeave[name];if(fakeName){nativeHandler=function(evt){var current,related;current=evt.currentTarget;related=evt.relatedTarget;if(related&&current.contains){related=current.contains(related);}else{while(related&&related!==current){related=related.parentNode;}}
if(!related){evt=fix(evt||win.event);evt.type=evt.type==='mouseout'?'mouseleave':'mouseenter';evt.target=current;executeHandlers(evt,id);}};}}
if(!hasFocusIn&&(name==="focusin"||name==="focusout")){capture=true;fakeName=name==="focusin"?"focus":"blur";nativeHandler=function(evt){evt=fix(evt||win.event);evt.type=evt.type==='focus'?'focusin':'focusout';executeHandlers(evt,id);};}
callbackList=events[id][name];if(!callbackList){events[id][name]=callbackList=[{func:callback,scope:scope}];callbackList.fakeName=fakeName;callbackList.capture=capture;callbackList.nativeHandler=nativeHandler;if(name==="ready"){bindOnReady(target,nativeHandler,self);}else{addEvent(target,fakeName||name,nativeHandler,capture);}}else{if(name==="ready"&&self.domLoaded){callback({type:name});}else{callbackList.push({func:callback,scope:scope});}}}
target=callbackList=0;return callback;};self.unbind=function(target,names,callback){var id,callbackList,i,ci,name,eventMap;if(!target||target.nodeType===3||target.nodeType===8){return self;}
id=target[expando];if(id){eventMap=events[id];if(names){names=names.split(' ');i=names.length;while(i--){name=names[i];callbackList=eventMap[name];if(callbackList){if(callback){ci=callbackList.length;while(ci--){if(callbackList[ci].func===callback){var nativeHandler=callbackList.nativeHandler;var fakeName=callbackList.fakeName,capture=callbackList.capture;callbackList=callbackList.slice(0,ci).concat(callbackList.slice(ci+1));callbackList.nativeHandler=nativeHandler;callbackList.fakeName=fakeName;callbackList.capture=capture;eventMap[name]=callbackList;}}}
if(!callback||callbackList.length===0){delete eventMap[name];removeEvent(target,callbackList.fakeName||name,callbackList.nativeHandler,callbackList.capture);}}}}else{for(name in eventMap){callbackList=eventMap[name];removeEvent(target,callbackList.fakeName||name,callbackList.nativeHandler,callbackList.capture);}
eventMap={};}
for(name in eventMap){return self;}
delete events[id];try{delete target[expando];}catch(ex){target[expando]=null;}}
return self;};self.fire=function(target,name,args){var id;if(!target||target.nodeType===3||target.nodeType===8){return self;}
args=fix(null,args);args.type=name;args.target=target;do{id=target[expando];if(id){executeHandlers(args,id);}
target=target.parentNode||target.ownerDocument||target.defaultView||target.parentWindow;}while(target&&!args.isPropagationStopped());return self;};self.clean=function(target){var i,children,unbind=self.unbind;if(!target||target.nodeType===3||target.nodeType===8){return self;}
if(target[expando]){unbind(target);}
if(!target.getElementsByTagName){target=target.document;}
if(target&&target.getElementsByTagName){unbind(target);children=target.getElementsByTagName('*');i=children.length;while(i--){target=children[i];if(target[expando]){unbind(target);}}}
return self;};self.destroy=function(){events={};};self.cancel=function(e){if(e){e.preventDefault();e.stopImmediatePropagation();}
return false;};}
EventUtils.Event=new EventUtils();EventUtils.Event.bind(window,'ready',function(){});return EventUtils;});define("tinymce/dom/Sizzle",[],function(){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,expando="sizzle"+-(new Date()),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true;}
return 0;},strundefined=typeof undefined,MAX_NEGATIVE=1<<31,hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,indexOf=arr.indexOf||function(elem){var i=0,len=this.length;for(;i<len;i++){if(this[i]===elem){return i;}}
return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",whitespace="[\\x20\\t\\r\\n\\f]",identifier="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+
"*([*^$|!~]?=)"+whitespace+
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+
"*\\]",pseudos=":("+identifier+")(?:\\(("+
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+
".*"+
")\\)|)",rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+
"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+
"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+
whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g,runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000;return high!==high||escapedWhitespace?escaped:high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);};try{push.apply((arr=slice.call(preferredDoc.childNodes)),preferredDoc.childNodes);arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?function(target,els){push_native.apply(target,slice.call(els));}:function(target,els){var j=target.length,i=0;while((target[j++]=els[i++])){}
target.length=j-1;}};}
function Sizzle(selector,context,results,seed){var match,elem,m,nodeType,i,groups,old,nid,newContext,newSelector;if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}
context=context||document;results=results||[];if(!selector||typeof selector!=="string"){return results;}
if((nodeType=context.nodeType)!==1&&nodeType!==9){return[];}
if(documentIsHTML&&!seed){if((match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);return results;}}else{return results;}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;}else if((m=match[3])&&support.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}
if(support.qsa&&(!rbuggyQSA||!rbuggyQSA.test(selector))){nid=old=expando;newContext=context;newSelector=nodeType===9&&selector;if(nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&");}else{context.setAttribute("id",nid);}
nid="[id='"+nid+"'] ";i=groups.length;while(i--){groups[i]=nid+toSelector(groups[i]);}
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;newSelector=groups.join(",");}
if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally{if(!old){context.removeAttribute("id");}}}}}
return select(selector.replace(rtrim,"$1"),context,results,seed);}
function createCache(){var keys=[];function cache(key,value){if(keys.push(key+" ")>Expr.cacheLength){delete cache[keys.shift()];}
return(cache[key+" "]=value);}
return cache;}
function markFunction(fn){fn[expando]=true;return fn;}
function assert(fn){var div=document.createElement("div");try{return!!fn(div);}catch(e){return false;}finally{if(div.parentNode){div.parentNode.removeChild(div);}
div=null;}}
function addHandle(attrs,handler){var arr=attrs.split("|"),i=attrs.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}
function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-
(~a.sourceIndex||MAX_NEGATIVE);if(diff){return diff;}
if(cur){while((cur=cur.nextSibling)){if(cur===b){return-1;}}}
return a?1:-1;}
function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}
function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}
function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j]);}}});});}
function testContext(context){return context&&typeof context.getElementsByTagName!==strundefined&&context;}
support=Sizzle.support={};isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};setDocument=Sizzle.setDocument=function(node){var hasCompare,doc=node?node.ownerDocument||node:preferredDoc,parent=doc.defaultView;function getTop(win){try{return win.top;}catch(ex){}
return null;}
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;}
document=doc;docElem=doc.documentElement;documentIsHTML=!isXML(doc);if(parent&&parent!==getTop(parent)){if(parent.addEventListener){parent.addEventListener("unload",function(){setDocument();},false);}else if(parent.attachEvent){parent.attachEvent("onunload",function(){setDocument();});}}
support.attributes=assert(function(div){div.className="i";return!div.getAttribute("className");});support.getElementsByTagName=assert(function(div){div.appendChild(doc.createComment(""));return!div.getElementsByTagName("*").length;});support.getElementsByClassName=rnative.test(doc.getElementsByClassName);support.getById=assert(function(div){docElem.appendChild(div).id=expando;return!doc.getElementsByName||!doc.getElementsByName(expando).length;});if(support.getById){Expr.find["ID"]=function(id,context){if(typeof context.getElementById!==strundefined&&documentIsHTML){var m=context.getElementById(id);return m&&m.parentNode?[m]:[];}};Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};}else{delete Expr.find["ID"];Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!==strundefined&&elem.getAttributeNode("id");return node&&node.value===attrId;};};}
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!==strundefined){return context.getElementsByTagName(tag);}}:function(tag,context){var elem,tmp=[],i=0,results=context.getElementsByTagName(tag);if(tag==="*"){while((elem=results[i++])){if(elem.nodeType===1){tmp.push(elem);}}
return tmp;}
return results;};Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(documentIsHTML){return context.getElementsByClassName(className);}};rbuggyMatches=[];rbuggyQSA=[];if((support.qsa=rnative.test(doc.querySelectorAll))){assert(function(div){div.innerHTML="<select msallowcapture=''><option selected=''></option></select>";if(div.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}});assert(function(div){var input=doc.createElement("input");input.setAttribute("type","hidden");div.appendChild(input).setAttribute("name","D");if(div.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");}
div.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}
if((support.matchesSelector=rnative.test((matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)))){assert(function(div){support.disconnectedMatch=matches.call(div,"div");matches.call(div,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}
rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));hasCompare=rnative.test(docElem.compareDocumentPosition);contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}}}
return false;};sortOrder=hasCompare?function(a,b){if(a===b){hasDuplicate=true;return 0;}
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}
compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1;if(compare&1||(!support.sortDetached&&b.compareDocumentPosition(a)===compare)){if(a===doc||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return-1;}
if(b===doc||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1;}
return sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0;}
return compare&4?-1:1;}:function(a,b){if(a===b){hasDuplicate=true;return 0;}
var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];if(!aup||!bup){return a===doc?-1:b===doc?1:aup?-1:bup?1:sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0;}else if(aup===bup){return siblingCheck(a,b);}
cur=a;while((cur=cur.parentNode)){ap.unshift(cur);}
cur=b;while((cur=cur.parentNode)){bp.unshift(cur);}
while(ap[i]===bp[i]){i++;}
return i?siblingCheck(ap[i],bp[i]):ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return doc;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){if((elem.ownerDocument||elem)!==document){setDocument(elem);}
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);if(ret||support.disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}
return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){if((context.ownerDocument||context)!==document){setDocument(context);}
return contains(context,elem);};Sizzle.attr=function(elem,name){if((elem.ownerDocument||elem)!==document){setDocument(elem);}
var fn=Expr.attrHandle[name.toLowerCase()],val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while((elem=results[i++])){if(elem===results[i]){j=duplicates.push(i);}}
while(j--){results.splice(duplicates[j],1);}}
sortInput=null;return results;};getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){while((node=elem[i++])){ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent;}else{for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}
return ret;};Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(match){match[1]=match[1].replace(runescape,funescape);match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}
return match.slice(0,4);},"CHILD":function(match){match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){if(!match[3]){Sizzle.error(match[0]);}
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+((match[7]+match[8])||match[3]==="odd");}else if(match[3]){Sizzle.error(match[0]);}
return match;},"PSEUDO":function(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}
if(match[3]){match[2]=match[4]||match[5]||"";}else if(unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}
return match.slice(0,3);}},filter:{"TAG":function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!==strundefined&&elem.getAttribute("class")||"");});},"ATTR":function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}
if(!operator){return true;}
result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?function(elem){return!!elem.parentNode;}:function(elem,context,xml){var cache,outerCache,node,diff,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType;if(parent){if(simple){while(dir){node=elem;while((node=node[dir])){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}
start=dir=type==="only"&&!start&&"nextSibling";}
return true;}
start=[forward?parent.firstChild:parent.lastChild];if(forward&&useCache){outerCache=parent[expando]||(parent[expando]={});cache=outerCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=cache[0]===dirruns&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if(node.nodeType===1&&++diff&&node===elem){outerCache[type]=[dirruns,nodeIndex,diff];break;}}}else if(useCache&&(cache=(elem[expando]||(elem[expando]={}))[type])&&cache[0]===dirruns){diff=cache[1];}else{while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){if(useCache){(node[expando]||(node[expando]={}))[type]=[dirruns,diff];}
if(node===elem){break;}}}}
diff-=last;return diff===first||(diff%first===0&&diff/first>=0);}};},"PSEUDO":function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);if(fn[expando]){return fn(argument);}
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf.call(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}
return fn;}},pseudos:{"not":markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results);return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}),"lang":markFunction(function(lang){if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}
lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if((elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),"target":function(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function(elem){return elem===docElem;},"focus":function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},"enabled":function(elem){return elem.disabled===false;},"disabled":function(elem){return elem.disabled===true;},"checked":function(elem){var nodeName=elem.nodeName.toLowerCase();return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected);},"selected":function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},"empty":function(elem){for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}
return true;},"parent":function(elem){return!Expr.pseudos["empty"](elem);},"header":function(elem){return rheader.test(elem.nodeName);},"input":function(elem){return rinputs.test(elem.nodeName);},"button":function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}
return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}
return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}
for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}
function setFilters(){}
setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}
soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar;}
groups.push((tokens=[]));}
matched=false;if((match=rcombinators.exec(soFar))){matched=match.shift();tokens.push({value:matched,type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}
if(!matched){break;}}
return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}
return selector;}
function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}}:function(elem,context,xml){var oldCache,outerCache,newCache=[dirruns,doneName];if(xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});if((oldCache=outerCache[dir])&&oldCache[0]===dirruns&&oldCache[1]===doneName){return(newCache[2]=oldCache[2]);}else{outerCache[dir]=newCache;if((newCache[2]=matcher(elem,context,xml))){return true;}}}}}};}
function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}
return true;}:matchers[0];}
function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}
return results;}
function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}
return newUnmatched;}
function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}
if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}
return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;if(matcher){matcher(matcherIn,matcherOut,context,xml);}
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);i=temp.length;while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}
if(seed){if(postFinder||preFilter){if(postFinder){temp=[];i=matcherOut.length;while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem));}}
postFinder(null,(matcherOut=[]),temp,xml);}
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf.call(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}
function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){return(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));}];for(;i<len;i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);if(matcher[expando]){j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}
return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&toSelector(tokens));}
matchers.push(matcher);}}
return elementMatcher(matchers);}
function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,elems=seed||byElement&&Expr.find["TAG"]("*",outermost),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.random()||0.1),len=elems.length;if(outermost){outermostContext=context!==document&&context;}
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;while((matcher=elementMatchers[j++])){if(matcher(elem,context,xml)){results.push(elem);break;}}
if(outermost){dirruns=dirrunsUnique;}}
if(bySet){if((elem=!matcher&&elem)){matchedCount--;}
if(seed){unmatched.push(elem);}}}
matchedCount+=i;if(bySet&&i!==matchedCount){j=0;while((matcher=setMatchers[j++])){matcher(unmatched,setMatched,context,xml);}
if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}
setMatched=condense(setMatched);}
push.apply(results,setMatched);if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results);}}
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}
return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}
compile=Sizzle.compile=function(selector,match){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){if(!match){match=tokenize(selector);}
i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));cached.selector=selector;}
return cached;};select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize((selector=compiled.selector||selector));results=results||[];if(match.length===1){tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;}else if(compiled){context=context.parentNode;}
selector=selector.slice(tokens.shift().value.length);}
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];if(Expr.relative[(type=token.type)]){break;}
if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context))){tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}
break;}}}}
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};support.sortStable=expando.split("").sort(sortOrder).join("")===expando;support.detectDuplicates=!!hasDuplicate;setDocument();support.sortDetached=assert(function(div1){return div1.compareDocumentPosition(document.createElement("div"))&1;});if(!assert(function(div){div.innerHTML="<a href='#'></a>";return div.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}
if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";div.firstChild.setAttribute("value","");return div.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}
if(!assert(function(div){return div.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}
return Sizzle;});define("tinymce/util/Arr",[],function(){var isArray=Array.isArray||function(obj){return Object.prototype.toString.call(obj)==="[object Array]";};function toArray(obj){var array=obj,i,l;if(!isArray(obj)){array=[];for(i=0,l=obj.length;i<l;i++){array[i]=obj[i];}}
return array;}
function each(o,cb,s){var n,l;if(!o){return 0;}
s=s||o;if(o.length!==undefined){for(n=0,l=o.length;n<l;n++){if(cb.call(s,o[n],n,o)===false){return 0;}}}else{for(n in o){if(o.hasOwnProperty(n)){if(cb.call(s,o[n],n,o)===false){return 0;}}}}
return 1;}
function map(array,callback){var out=[];each(array,function(item,index){out.push(callback(item,index,array));});return out;}
function filter(a,f){var o=[];each(a,function(v,index){if(!f||f(v,index,a)){o.push(v);}});return o;}
function indexOf(a,v){var i,l;if(a){for(i=0,l=a.length;i<l;i++){if(a[i]===v){return i;}}}
return-1;}
function reduce(collection,iteratee,accumulator,thisArg){var i=0;if(arguments.length<3){accumulator=collection[0];}
for(;i<collection.length;i++){accumulator=iteratee.call(thisArg,accumulator,collection[i],i);}
return accumulator;}
function findIndex(array,predicate,thisArg){var i,l;for(i=0,l=array.length;i<l;i++){if(predicate.call(thisArg,array[i],i,array)){return i;}}
return-1;}
function find(array,predicate,thisArg){var idx=findIndex(array,predicate,thisArg);if(idx!==-1){return array[idx];}
return undefined;}
function last(collection){return collection[collection.length-1];}
return{isArray:isArray,toArray:toArray,each:each,map:map,filter:filter,indexOf:indexOf,reduce:reduce,findIndex:findIndex,find:find,last:last};});define("tinymce/util/Tools",["tinymce/Env","tinymce/util/Arr"],function(Env,Arr){var whiteSpaceRegExp=/^\s*|\s*$/g;function trim(str){return(str===null||str===undefined)?'':(""+str).replace(whiteSpaceRegExp,'');}
function is(obj,type){if(!type){return obj!==undefined;}
if(type=='array'&&Arr.isArray(obj)){return true;}
return typeof obj==type;}
function makeMap(items,delim,map){var i;items=items||[];delim=delim||',';if(typeof items=="string"){items=items.split(delim);}
map=map||{};i=items.length;while(i--){map[items[i]]={};}
return map;}
function create(s,p,root){var self=this,sp,ns,cn,scn,c,de=0;s=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(s);cn=s[3].match(/(^|\.)(\w+)$/i)[2];ns=self.createNS(s[3].replace(/\.\w+$/,''),root);if(ns[cn]){return;}
if(s[2]=='static'){ns[cn]=p;if(this.onCreate){this.onCreate(s[2],s[3],ns[cn]);}
return;}
if(!p[cn]){p[cn]=function(){};de=1;}
ns[cn]=p[cn];self.extend(ns[cn].prototype,p);if(s[5]){sp=self.resolve(s[5]).prototype;scn=s[5].match(/\.(\w+)$/i)[1];c=ns[cn];if(de){ns[cn]=function(){return sp[scn].apply(this,arguments);};}else{ns[cn]=function(){this.parent=sp[scn];return c.apply(this,arguments);};}
ns[cn].prototype[cn]=ns[cn];self.each(sp,function(f,n){ns[cn].prototype[n]=sp[n];});self.each(p,function(f,n){if(sp[n]){ns[cn].prototype[n]=function(){this.parent=sp[n];return f.apply(this,arguments);};}else{if(n!=cn){ns[cn].prototype[n]=f;}}});}
self.each(p['static'],function(f,n){ns[cn][n]=f;});}
function extend(obj,ext){var i,l,name,args=arguments,value;for(i=1,l=args.length;i<l;i++){ext=args[i];for(name in ext){if(ext.hasOwnProperty(name)){value=ext[name];if(value!==undefined){obj[name]=value;}}}}
return obj;}
function walk(o,f,n,s){s=s||this;if(o){if(n){o=o[n];}
Arr.each(o,function(o,i){if(f.call(s,o,i,n)===false){return false;}
walk(o,f,n,s);});}}
function createNS(n,o){var i,v;o=o||window;n=n.split('.');for(i=0;i<n.length;i++){v=n[i];if(!o[v]){o[v]={};}
o=o[v];}
return o;}
function resolve(n,o){var i,l;o=o||window;n=n.split('.');for(i=0,l=n.length;i<l;i++){o=o[n[i]];if(!o){break;}}
return o;}
function explode(s,d){if(!s||is(s,'array')){return s;}
return Arr.map(s.split(d||','),trim);}
function _addCacheSuffix(url){var cacheSuffix=Env.cacheSuffix;if(cacheSuffix){url+=(url.indexOf('?')===-1?'?':'&')+cacheSuffix;}
return url;}
return{trim:trim,isArray:Arr.isArray,is:is,toArray:Arr.toArray,makeMap:makeMap,each:Arr.each,map:Arr.map,grep:Arr.filter,inArray:Arr.indexOf,extend:extend,create:create,walk:walk,createNS:createNS,resolve:resolve,explode:explode,_addCacheSuffix:_addCacheSuffix};});define("tinymce/dom/DomQuery",["tinymce/dom/EventUtils","tinymce/dom/Sizzle","tinymce/util/Tools","tinymce/Env"],function(EventUtils,Sizzle,Tools,Env){var doc=document,push=Array.prototype.push,slice=Array.prototype.slice;var rquickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;var Event=EventUtils.Event,undef;var skipUniques=Tools.makeMap('children,contents,next,prev');function isDefined(obj){return typeof obj!=='undefined';}
function isString(obj){return typeof obj==='string';}
function isWindow(obj){return obj&&obj==obj.window;}
function createFragment(html,fragDoc){var frag,node,container;fragDoc=fragDoc||doc;container=fragDoc.createElement('div');frag=fragDoc.createDocumentFragment();container.innerHTML=html;while((node=container.firstChild)){frag.appendChild(node);}
return frag;}
function domManipulate(targetNodes,sourceItem,callback,reverse){var i;if(isString(sourceItem)){sourceItem=createFragment(sourceItem,getElementDocument(targetNodes[0]));}else if(sourceItem.length&&!sourceItem.nodeType){sourceItem=DomQuery.makeArray(sourceItem);if(reverse){for(i=sourceItem.length-1;i>=0;i--){domManipulate(targetNodes,sourceItem[i],callback,reverse);}}else{for(i=0;i<sourceItem.length;i++){domManipulate(targetNodes,sourceItem[i],callback,reverse);}}
return targetNodes;}
if(sourceItem.nodeType){i=targetNodes.length;while(i--){callback.call(targetNodes[i],sourceItem);}}
return targetNodes;}
function hasClass(node,className){return node&&className&&(' '+node.className+' ').indexOf(' '+className+' ')!==-1;}
function wrap(elements,wrapper,all){var lastParent,newWrapper;wrapper=DomQuery(wrapper)[0];elements.each(function(){var self=this;if(!all||lastParent!=self.parentNode){lastParent=self.parentNode;newWrapper=wrapper.cloneNode(false);self.parentNode.insertBefore(newWrapper,self);newWrapper.appendChild(self);}else{newWrapper.appendChild(self);}});return elements;}
var numericCssMap=Tools.makeMap('fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom',' ');var booleanMap=Tools.makeMap('checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected',' ');var propFix={'for':'htmlFor','class':'className','readonly':'readOnly'};var cssFix={'float':'cssFloat'};var attrHooks={},cssHooks={};function DomQuery(selector,context){return new DomQuery.fn.init(selector,context);}
function inArray(item,array){var i;if(array.indexOf){return array.indexOf(item);}
i=array.length;while(i--){if(array[i]===item){return i;}}
return-1;}
var whiteSpaceRegExp=/^\s*|\s*$/g;function trim(str){return(str===null||str===undef)?'':(""+str).replace(whiteSpaceRegExp,'');}
function each(obj,callback){var length,key,i,undef,value;if(obj){length=obj.length;if(length===undef){for(key in obj){if(obj.hasOwnProperty(key)){value=obj[key];if(callback.call(value,key,value)===false){break;}}}}else{for(i=0;i<length;i++){value=obj[i];if(callback.call(value,i,value)===false){break;}}}}
return obj;}
function grep(array,callback){var out=[];each(array,function(i,item){if(callback(item,i)){out.push(item);}});return out;}
function getElementDocument(element){if(!element){return doc;}
if(element.nodeType==9){return element;}
return element.ownerDocument;}
DomQuery.fn=DomQuery.prototype={constructor:DomQuery,selector:"",context:null,length:0,init:function(selector,context){var self=this,match,node;if(!selector){return self;}
if(selector.nodeType){self.context=self[0]=selector;self.length=1;return self;}
if(context&&context.nodeType){self.context=context;}else{if(context){return DomQuery(selector).attr(context);}
self.context=context=document;}
if(isString(selector)){self.selector=selector;if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null];}else{match=rquickExpr.exec(selector);}
if(match){if(match[1]){node=createFragment(selector,getElementDocument(context)).firstChild;while(node){push.call(self,node);node=node.nextSibling;}}else{node=getElementDocument(context).getElementById(match[2]);if(!node){return self;}
if(node.id!==match[2]){return self.find(selector);}
self.length=1;self[0]=node;}}else{return DomQuery(context).find(selector);}}else{this.add(selector,false);}
return self;},toArray:function(){return Tools.toArray(this);},add:function(items,sort){var self=this,nodes,i;if(isString(items)){return self.add(DomQuery(items));}
if(sort!==false){nodes=DomQuery.unique(self.toArray().concat(DomQuery.makeArray(items)));self.length=nodes.length;for(i=0;i<nodes.length;i++){self[i]=nodes[i];}}else{push.apply(self,DomQuery.makeArray(items));}
return self;},attr:function(name,value){var self=this,hook;if(typeof name==="object"){each(name,function(name,value){self.attr(name,value);});}else if(isDefined(value)){this.each(function(){var hook;if(this.nodeType===1){hook=attrHooks[name];if(hook&&hook.set){hook.set(this,value);return;}
if(value===null){this.removeAttribute(name,2);}else{this.setAttribute(name,value,2);}}});}else{if(self[0]&&self[0].nodeType===1){hook=attrHooks[name];if(hook&&hook.get){return hook.get(self[0],name);}
if(booleanMap[name]){return self.prop(name)?name:undef;}
value=self[0].getAttribute(name,2);if(value===null){value=undef;}}
return value;}
return self;},removeAttr:function(name){return this.attr(name,null);},prop:function(name,value){var self=this;name=propFix[name]||name;if(typeof name==="object"){each(name,function(name,value){self.prop(name,value);});}else if(isDefined(value)){this.each(function(){if(this.nodeType==1){this[name]=value;}});}else{if(self[0]&&self[0].nodeType&&name in self[0]){return self[0][name];}
return value;}
return self;},css:function(name,value){var self=this,elm,hook;function camel(name){return name.replace(/-(\D)/g,function(a,b){return b.toUpperCase();});}
function dashed(name){return name.replace(/[A-Z]/g,function(a){return '-'+a;});}
if(typeof name==="object"){each(name,function(name,value){self.css(name,value);});}else{if(isDefined(value)){name=camel(name);if(typeof value==='number'&&!numericCssMap[name]){value+='px';}
self.each(function(){var style=this.style;hook=cssHooks[name];if(hook&&hook.set){hook.set(this,value);return;}
try{this.style[cssFix[name]||name]=value;}catch(ex){}
if(value===null||value===''){if(style.removeProperty){style.removeProperty(dashed(name));}else{style.removeAttribute(name);}}});}else{elm=self[0];hook=cssHooks[name];if(hook&&hook.get){return hook.get(elm);}
if(elm.ownerDocument.defaultView){try{return elm.ownerDocument.defaultView.getComputedStyle(elm,null).getPropertyValue(dashed(name));}catch(ex){return undef;}}else if(elm.currentStyle){return elm.currentStyle[camel(name)];}}}
return self;},remove:function(){var self=this,node,i=this.length;while(i--){node=self[i];Event.clean(node);if(node.parentNode){node.parentNode.removeChild(node);}}
return this;},empty:function(){var self=this,node,i=this.length;while(i--){node=self[i];while(node.firstChild){node.removeChild(node.firstChild);}}
return this;},html:function(value){var self=this,i;if(isDefined(value)){i=self.length;try{while(i--){self[i].innerHTML=value;}}catch(ex){DomQuery(self[i]).empty().append(value);}
return self;}
return self[0]?self[0].innerHTML:'';},text:function(value){var self=this,i;if(isDefined(value)){i=self.length;while(i--){if("innerText"in self[i]){self[i].innerText=value;}else{self[0].textContent=value;}}
return self;}
return self[0]?(self[0].innerText||self[0].textContent):'';},append:function(){return domManipulate(this,arguments,function(node){if(this.nodeType===1||(this.host&&this.host.nodeType===1)){this.appendChild(node);}});},prepend:function(){return domManipulate(this,arguments,function(node){if(this.nodeType===1||(this.host&&this.host.nodeType===1)){this.insertBefore(node,this.firstChild);}},true);},before:function(){var self=this;if(self[0]&&self[0].parentNode){return domManipulate(self,arguments,function(node){this.parentNode.insertBefore(node,this);});}
return self;},after:function(){var self=this;if(self[0]&&self[0].parentNode){return domManipulate(self,arguments,function(node){this.parentNode.insertBefore(node,this.nextSibling);},true);}
return self;},appendTo:function(val){DomQuery(val).append(this);return this;},prependTo:function(val){DomQuery(val).prepend(this);return this;},replaceWith:function(content){return this.before(content).remove();},wrap:function(content){return wrap(this,content);},wrapAll:function(content){return wrap(this,content,true);},wrapInner:function(content){this.each(function(){DomQuery(this).contents().wrapAll(content);});return this;},unwrap:function(){return this.parent().each(function(){DomQuery(this).replaceWith(this.childNodes);});},clone:function(){var result=[];this.each(function(){result.push(this.cloneNode(true));});return DomQuery(result);},addClass:function(className){return this.toggleClass(className,true);},removeClass:function(className){return this.toggleClass(className,false);},toggleClass:function(className,state){var self=this;if(typeof className!='string'){return self;}
if(className.indexOf(' ')!==-1){each(className.split(' '),function(){self.toggleClass(this,state);});}else{self.each(function(index,node){var existingClassName,classState;classState=hasClass(node,className);if(classState!==state){existingClassName=node.className;if(classState){node.className=trim((" "+existingClassName+" ").replace(' '+className+' ',' '));}else{node.className+=existingClassName?' '+className:className;}}});}
return self;},hasClass:function(className){return hasClass(this[0],className);},each:function(callback){return each(this,callback);},on:function(name,callback){return this.each(function(){Event.bind(this,name,callback);});},off:function(name,callback){return this.each(function(){Event.unbind(this,name,callback);});},trigger:function(name){return this.each(function(){if(typeof name=='object'){Event.fire(this,name.type,name);}else{Event.fire(this,name);}});},show:function(){return this.css('display','');},hide:function(){return this.css('display','none');},slice:function(){return new DomQuery(slice.apply(this,arguments));},eq:function(index){return index===-1?this.slice(index):this.slice(index,+index+1);},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},find:function(selector){var i,l,ret=[];for(i=0,l=this.length;i<l;i++){DomQuery.find(selector,this[i],ret);}
return DomQuery(ret);},filter:function(selector){if(typeof selector=='function'){return DomQuery(grep(this.toArray(),function(item,i){return selector(i,item);}));}
return DomQuery(DomQuery.filter(selector,this.toArray()));},closest:function(selector){var result=[];if(selector instanceof DomQuery){selector=selector[0];}
this.each(function(i,node){while(node){if(typeof selector=='string'&&DomQuery(node).is(selector)){result.push(node);break;}else if(node==selector){result.push(node);break;}
node=node.parentNode;}});return DomQuery(result);},offset:function(offset){var elm,doc,docElm;var x=0,y=0,pos;if(!offset){elm=this[0];if(elm){doc=elm.ownerDocument;docElm=doc.documentElement;if(elm.getBoundingClientRect){pos=elm.getBoundingClientRect();x=pos.left+(docElm.scrollLeft||doc.body.scrollLeft)-docElm.clientLeft;y=pos.top+(docElm.scrollTop||doc.body.scrollTop)-docElm.clientTop;}}
return{left:x,top:y};}
return this.css(offset);},push:push,sort:[].sort,splice:[].splice};Tools.extend(DomQuery,{extend:Tools.extend,makeArray:function(object){if(isWindow(object)||object.nodeType){return[object];}
return Tools.toArray(object);},inArray:inArray,isArray:Tools.isArray,each:each,trim:trim,grep:grep,find:Sizzle,expr:Sizzle.selectors,unique:Sizzle.uniqueSort,text:Sizzle.getText,contains:Sizzle.contains,filter:function(expr,elems,not){var i=elems.length;if(not){expr=":not("+expr+")";}
while(i--){if(elems[i].nodeType!=1){elems.splice(i,1);}}
if(elems.length===1){elems=DomQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[];}else{elems=DomQuery.find.matches(expr,elems);}
return elems;}});function dir(el,prop,until){var matched=[],cur=el[prop];if(typeof until!='string'&&until instanceof DomQuery){until=until[0];}
while(cur&&cur.nodeType!==9){if(until!==undefined){if(cur===until){break;}
if(typeof until=='string'&&DomQuery(cur).is(until)){break;}}
if(cur.nodeType===1){matched.push(cur);}
cur=cur[prop];}
return matched;}
function sibling(node,siblingName,nodeType,until){var result=[];if(until instanceof DomQuery){until=until[0];}
for(;node;node=node[siblingName]){if(nodeType&&node.nodeType!==nodeType){continue;}
if(until!==undefined){if(node===until){break;}
if(typeof until=='string'&&DomQuery(node).is(until)){break;}}
result.push(node);}
return result;}
function firstSibling(node,siblingName,nodeType){for(node=node[siblingName];node;node=node[siblingName]){if(node.nodeType==nodeType){return node;}}
return null;}
each({parent:function(node){var parent=node.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(node){return dir(node,"parentNode");},next:function(node){return firstSibling(node,'nextSibling',1);},prev:function(node){return firstSibling(node,'previousSibling',1);},children:function(node){return sibling(node.firstChild,'nextSibling',1);},contents:function(node){return Tools.toArray((node.nodeName==="iframe"?node.contentDocument||node.contentWindow.document:node).childNodes);}},function(name,fn){DomQuery.fn[name]=function(selector){var self=this,result=[];self.each(function(){var nodes=fn.call(result,this,selector,result);if(nodes){if(DomQuery.isArray(nodes)){result.push.apply(result,nodes);}else{result.push(nodes);}}});if(this.length>1){if(!skipUniques[name]){result=DomQuery.unique(result);}
if(name.indexOf('parents')===0){result=result.reverse();}}
result=DomQuery(result);if(selector){return result.filter(selector);}
return result;};});each({parentsUntil:function(node,until){return dir(node,"parentNode",until);},nextUntil:function(node,until){return sibling(node,'nextSibling',1,until).slice(1);},prevUntil:function(node,until){return sibling(node,'previousSibling',1,until).slice(1);}},function(name,fn){DomQuery.fn[name]=function(selector,filter){var self=this,result=[];self.each(function(){var nodes=fn.call(result,this,selector,result);if(nodes){if(DomQuery.isArray(nodes)){result.push.apply(result,nodes);}else{result.push(nodes);}}});if(this.length>1){result=DomQuery.unique(result);if(name.indexOf('parents')===0||name==='prevUntil'){result=result.reverse();}}
result=DomQuery(result);if(filter){return result.filter(filter);}
return result;};});DomQuery.fn.is=function(selector){return!!selector&&this.filter(selector).length>0;};DomQuery.fn.init.prototype=DomQuery.fn;DomQuery.overrideDefaults=function(callback){var defaults;function sub(selector,context){defaults=defaults||callback();if(arguments.length===0){selector=defaults.element;}
if(!context){context=defaults.context;}
return new sub.fn.init(selector,context);}
DomQuery.extend(sub,this);return sub;};function appendHooks(targetHooks,prop,hooks){each(hooks,function(name,func){targetHooks[name]=targetHooks[name]||{};targetHooks[name][prop]=func;});}
if(Env.ie&&Env.ie<8){appendHooks(attrHooks,'get',{maxlength:function(elm){var value=elm.maxLength;if(value===0x7fffffff){return undef;}
return value;},size:function(elm){var value=elm.size;if(value===20){return undef;}
return value;},'class':function(elm){return elm.className;},style:function(elm){var value=elm.style.cssText;if(value.length===0){return undef;}
return value;}});appendHooks(attrHooks,'set',{'class':function(elm,value){elm.className=value;},style:function(elm,value){elm.style.cssText=value;}});}
if(Env.ie&&Env.ie<9){cssFix['float']='styleFloat';appendHooks(cssHooks,'set',{opacity:function(elm,value){var style=elm.style;if(value===null||value===''){style.removeAttribute('filter');}else{style.zoom=1;style.filter='alpha(opacity='+(value*100)+')';}}});}
DomQuery.attrHooks=attrHooks;DomQuery.cssHooks=cssHooks;return DomQuery;});define("tinymce/html/Styles",[],function(){return function(settings,schema){var rgbRegExp=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,urlOrStrRegExp=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,styleRegExp=/\s*([^:]+):\s*([^;]+);?/g,trimRightRegExp=/\s+$/,undef,i,encodingLookup={},encodingItems,validStyles,invalidStyles,invisibleChar='\uFEFF';settings=settings||{};if(schema){validStyles=schema.getValidStyles();invalidStyles=schema.getInvalidStyles();}
encodingItems=('\\" \\\' \\; \\: ; : '+invisibleChar).split(' ');for(i=0;i<encodingItems.length;i++){encodingLookup[encodingItems[i]]=invisibleChar+i;encodingLookup[invisibleChar+i]=encodingItems[i];}
function toHex(match,r,g,b){function hex(val){val=parseInt(val,10).toString(16);return val.length>1?val:'0'+val;}
return '#'+hex(r)+hex(g)+hex(b);}
return{toHex:function(color){return color.replace(rgbRegExp,toHex);},parse:function(css){var styles={},matches,name,value,isEncoded,urlConverter=settings.url_converter;var urlConverterScope=settings.url_converter_scope||this;function compress(prefix,suffix,noJoin){var top,right,bottom,left;top=styles[prefix+'-top'+suffix];if(!top){return;}
right=styles[prefix+'-right'+suffix];if(!right){return;}
bottom=styles[prefix+'-bottom'+suffix];if(!bottom){return;}
left=styles[prefix+'-left'+suffix];if(!left){return;}
var box=[top,right,bottom,left];i=box.length-1;while(i--){if(box[i]!==box[i+1]){break;}}
if(i>-1&&noJoin){return;}
styles[prefix+suffix]=i==-1?box[0]:box.join(' ');delete styles[prefix+'-top'+suffix];delete styles[prefix+'-right'+suffix];delete styles[prefix+'-bottom'+suffix];delete styles[prefix+'-left'+suffix];}
function canCompress(key){var value=styles[key],i;if(!value){return;}
value=value.split(' ');i=value.length;while(i--){if(value[i]!==value[0]){return false;}}
styles[key]=value[0];return true;}
function compress2(target,a,b,c){if(!canCompress(a)){return;}
if(!canCompress(b)){return;}
if(!canCompress(c)){return;}
styles[target]=styles[a]+' '+styles[b]+' '+styles[c];delete styles[a];delete styles[b];delete styles[c];}
function encode(str){isEncoded=true;return encodingLookup[str];}
function decode(str,keep_slashes){if(isEncoded){str=str.replace(/\uFEFF[0-9]/g,function(str){return encodingLookup[str];});}
if(!keep_slashes){str=str.replace(/\\([\'\";:])/g,"$1");}
return str;}
function processUrl(match,url,url2,url3,str,str2){str=str||str2;if(str){str=decode(str);return "'"+str.replace(/\'/g,"\\'")+"'";}
url=decode(url||url2||url3);if(!settings.allow_script_urls){var scriptUrl=url.replace(/[\s\r\n]+/,'');if(/(java|vb)script:/i.test(scriptUrl)){return "";}
if(!settings.allow_svg_data_urls&&/^data:image\/svg/i.test(scriptUrl)){return "";}}
if(urlConverter){url=urlConverter.call(urlConverterScope,url,'style');}
return "url('"+url.replace(/\'/g,"\\'")+"')";}
if(css){css=css.replace(/[\u0000-\u001F]/g,'');css=css.replace(/\\[\"\';:\uFEFF]/g,encode).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(str){return str.replace(/[;:]/g,encode);});while((matches=styleRegExp.exec(css))){name=matches[1].replace(trimRightRegExp,'').toLowerCase();value=matches[2].replace(trimRightRegExp,'');value=value.replace(/\\[0-9a-f]+/g,function(e){return String.fromCharCode(parseInt(e.substr(1),16));});if(name&&value.length>0){if(!settings.allow_script_urls&&(name=="behavior"||/expression\s*\(|\/\*|\*\//.test(value))){continue;}
if(name==='font-weight'&&value==='700'){value='bold';}else if(name==='color'||name==='background-color'){value=value.toLowerCase();}
value=value.replace(rgbRegExp,toHex);value=value.replace(urlOrStrRegExp,processUrl);styles[name]=isEncoded?decode(value,true):value;}
styleRegExp.lastIndex=matches.index+matches[0].length;}
compress("border","",true);compress("border","-width");compress("border","-color");compress("border","-style");compress("padding","");compress("margin","");compress2('border','border-width','border-style','border-color');if(styles.border==='medium none'){delete styles.border;}
if(styles['border-image']==='none'){delete styles['border-image'];}}
return styles;},serialize:function(styles,elementName){var css='',name,value;function serializeStyles(name){var styleList,i,l,value;styleList=validStyles[name];if(styleList){for(i=0,l=styleList.length;i<l;i++){name=styleList[i];value=styles[name];if(value!==undef&&value.length>0){css+=(css.length>0?' ':'')+name+': '+value+';';}}}}
function isValid(name,elementName){var styleMap;styleMap=invalidStyles['*'];if(styleMap&&styleMap[name]){return false;}
styleMap=invalidStyles[elementName];if(styleMap&&styleMap[name]){return false;}
return true;}
if(elementName&&validStyles){serializeStyles('*');serializeStyles(elementName);}else{for(name in styles){value=styles[name];if(value!==undef&&value.length>0){if(!invalidStyles||isValid(name,elementName)){css+=(css.length>0?' ':'')+name+': '+value+';';}}}}
return css;}};};});define("tinymce/dom/TreeWalker",[],function(){return function(startNode,rootNode){var node=startNode;function findSibling(node,startName,siblingName,shallow){var sibling,parent;if(node){if(!shallow&&node[startName]){return node[startName];}
if(node!=rootNode){sibling=node[siblingName];if(sibling){return sibling;}
for(parent=node.parentNode;parent&&parent!=rootNode;parent=parent.parentNode){sibling=parent[siblingName];if(sibling){return sibling;}}}}}
function findPreviousNode(node,startName,siblingName,shallow){var sibling,parent,child;if(node){sibling=node[siblingName];if(rootNode&&sibling===rootNode){return;}
if(sibling){if(!shallow){for(child=sibling[startName];child;child=child[startName]){if(!child[startName]){return child;}}}
return sibling;}
parent=node.parentNode;if(parent&&parent!==rootNode){return parent;}}}
this.current=function(){return node;};this.next=function(shallow){node=findSibling(node,'firstChild','nextSibling',shallow);return node;};this.prev=function(shallow){node=findSibling(node,'lastChild','previousSibling',shallow);return node;};this.prev2=function(shallow){node=findPreviousNode(node,'lastChild','previousSibling',shallow);return node;};};});define("tinymce/dom/Range",["tinymce/util/Tools"],function(Tools){function Range(dom){var self=this,doc=dom.doc,EXTRACT=0,CLONE=1,DELETE=2,TRUE=true,FALSE=false,START_OFFSET='startOffset',START_CONTAINER='startContainer',END_CONTAINER='endContainer',END_OFFSET='endOffset',extend=Tools.extend,nodeIndex=dom.nodeIndex;function createDocumentFragment(){return doc.createDocumentFragment();}
function setStart(n,o){_setEndPoint(TRUE,n,o);}
function setEnd(n,o){_setEndPoint(FALSE,n,o);}
function setStartBefore(n){setStart(n.parentNode,nodeIndex(n));}
function setStartAfter(n){setStart(n.parentNode,nodeIndex(n)+1);}
function setEndBefore(n){setEnd(n.parentNode,nodeIndex(n));}
function setEndAfter(n){setEnd(n.parentNode,nodeIndex(n)+1);}
function collapse(ts){if(ts){self[END_CONTAINER]=self[START_CONTAINER];self[END_OFFSET]=self[START_OFFSET];}else{self[START_CONTAINER]=self[END_CONTAINER];self[START_OFFSET]=self[END_OFFSET];}
self.collapsed=TRUE;}
function selectNode(n){setStartBefore(n);setEndAfter(n);}
function selectNodeContents(n){setStart(n,0);setEnd(n,n.nodeType===1?n.childNodes.length:n.nodeValue.length);}
function compareBoundaryPoints(h,r){var sc=self[START_CONTAINER],so=self[START_OFFSET],ec=self[END_CONTAINER],eo=self[END_OFFSET],rsc=r.startContainer,rso=r.startOffset,rec=r.endContainer,reo=r.endOffset;if(h===0){return _compareBoundaryPoints(sc,so,rsc,rso);}
if(h===1){return _compareBoundaryPoints(ec,eo,rsc,rso);}
if(h===2){return _compareBoundaryPoints(ec,eo,rec,reo);}
if(h===3){return _compareBoundaryPoints(sc,so,rec,reo);}}
function deleteContents(){_traverse(DELETE);}
function extractContents(){return _traverse(EXTRACT);}
function cloneContents(){return _traverse(CLONE);}
function insertNode(n){var startContainer=this[START_CONTAINER],startOffset=this[START_OFFSET],nn,o;if((startContainer.nodeType===3||startContainer.nodeType===4)&&startContainer.nodeValue){if(!startOffset){startContainer.parentNode.insertBefore(n,startContainer);}else if(startOffset>=startContainer.nodeValue.length){dom.insertAfter(n,startContainer);}else{nn=startContainer.splitText(startOffset);startContainer.parentNode.insertBefore(n,nn);}}else{if(startContainer.childNodes.length>0){o=startContainer.childNodes[startOffset];}
if(o){startContainer.insertBefore(n,o);}else{if(startContainer.nodeType==3){dom.insertAfter(n,startContainer);}else{startContainer.appendChild(n);}}}}
function surroundContents(n){var f=self.extractContents();self.insertNode(n);n.appendChild(f);self.selectNode(n);}
function cloneRange(){return extend(new Range(dom),{startContainer:self[START_CONTAINER],startOffset:self[START_OFFSET],endContainer:self[END_CONTAINER],endOffset:self[END_OFFSET],collapsed:self.collapsed,commonAncestorContainer:self.commonAncestorContainer});}
function _getSelectedNode(container,offset){var child;if(container.nodeType==3){return container;}
if(offset<0){return container;}
child=container.firstChild;while(child&&offset>0){--offset;child=child.nextSibling;}
if(child){return child;}
return container;}
function _isCollapsed(){return(self[START_CONTAINER]==self[END_CONTAINER]&&self[START_OFFSET]==self[END_OFFSET]);}
function _compareBoundaryPoints(containerA,offsetA,containerB,offsetB){var c,offsetC,n,cmnRoot,childA,childB;if(containerA==containerB){if(offsetA==offsetB){return 0;}
if(offsetA<offsetB){return-1;}
return 1;}
c=containerB;while(c&&c.parentNode!=containerA){c=c.parentNode;}
if(c){offsetC=0;n=containerA.firstChild;while(n!=c&&offsetC<offsetA){offsetC++;n=n.nextSibling;}
if(offsetA<=offsetC){return-1;}
return 1;}
c=containerA;while(c&&c.parentNode!=containerB){c=c.parentNode;}
if(c){offsetC=0;n=containerB.firstChild;while(n!=c&&offsetC<offsetB){offsetC++;n=n.nextSibling;}
if(offsetC<offsetB){return-1;}
return 1;}
cmnRoot=dom.findCommonAncestor(containerA,containerB);childA=containerA;while(childA&&childA.parentNode!=cmnRoot){childA=childA.parentNode;}
if(!childA){childA=cmnRoot;}
childB=containerB;while(childB&&childB.parentNode!=cmnRoot){childB=childB.parentNode;}
if(!childB){childB=cmnRoot;}
if(childA==childB){return 0;}
n=cmnRoot.firstChild;while(n){if(n==childA){return-1;}
if(n==childB){return 1;}
n=n.nextSibling;}}
function _setEndPoint(st,n,o){var ec,sc;if(st){self[START_CONTAINER]=n;self[START_OFFSET]=o;}else{self[END_CONTAINER]=n;self[END_OFFSET]=o;}
ec=self[END_CONTAINER];while(ec.parentNode){ec=ec.parentNode;}
sc=self[START_CONTAINER];while(sc.parentNode){sc=sc.parentNode;}
if(sc==ec){if(_compareBoundaryPoints(self[START_CONTAINER],self[START_OFFSET],self[END_CONTAINER],self[END_OFFSET])>0){self.collapse(st);}}else{self.collapse(st);}
self.collapsed=_isCollapsed();self.commonAncestorContainer=dom.findCommonAncestor(self[START_CONTAINER],self[END_CONTAINER]);}
function _traverse(how){var c,endContainerDepth=0,startContainerDepth=0,p,depthDiff,startNode,endNode,sp,ep;if(self[START_CONTAINER]==self[END_CONTAINER]){return _traverseSameContainer(how);}
for(c=self[END_CONTAINER],p=c.parentNode;p;c=p,p=p.parentNode){if(p==self[START_CONTAINER]){return _traverseCommonStartContainer(c,how);}
++endContainerDepth;}
for(c=self[START_CONTAINER],p=c.parentNode;p;c=p,p=p.parentNode){if(p==self[END_CONTAINER]){return _traverseCommonEndContainer(c,how);}
++startContainerDepth;}
depthDiff=startContainerDepth-endContainerDepth;startNode=self[START_CONTAINER];while(depthDiff>0){startNode=startNode.parentNode;depthDiff--;}
endNode=self[END_CONTAINER];while(depthDiff<0){endNode=endNode.parentNode;depthDiff++;}
for(sp=startNode.parentNode,ep=endNode.parentNode;sp!=ep;sp=sp.parentNode,ep=ep.parentNode){startNode=sp;endNode=ep;}
return _traverseCommonAncestors(startNode,endNode,how);}
function _traverseSameContainer(how){var frag,s,sub,n,cnt,sibling,xferNode,start,len;if(how!=DELETE){frag=createDocumentFragment();}
if(self[START_OFFSET]==self[END_OFFSET]){return frag;}
if(self[START_CONTAINER].nodeType==3){s=self[START_CONTAINER].nodeValue;sub=s.substring(self[START_OFFSET],self[END_OFFSET]);if(how!=CLONE){n=self[START_CONTAINER];start=self[START_OFFSET];len=self[END_OFFSET]-self[START_OFFSET];if(start===0&&len>=n.nodeValue.length-1){n.parentNode.removeChild(n);}else{n.deleteData(start,len);}
self.collapse(TRUE);}
if(how==DELETE){return;}
if(sub.length>0){frag.appendChild(doc.createTextNode(sub));}
return frag;}
n=_getSelectedNode(self[START_CONTAINER],self[START_OFFSET]);cnt=self[END_OFFSET]-self[START_OFFSET];while(n&&cnt>0){sibling=n.nextSibling;xferNode=_traverseFullySelected(n,how);if(frag){frag.appendChild(xferNode);}
--cnt;n=sibling;}
if(how!=CLONE){self.collapse(TRUE);}
return frag;}
function _traverseCommonStartContainer(endAncestor,how){var frag,n,endIdx,cnt,sibling,xferNode;if(how!=DELETE){frag=createDocumentFragment();}
n=_traverseRightBoundary(endAncestor,how);if(frag){frag.appendChild(n);}
endIdx=nodeIndex(endAncestor);cnt=endIdx-self[START_OFFSET];if(cnt<=0){if(how!=CLONE){self.setEndBefore(endAncestor);self.collapse(FALSE);}
return frag;}
n=endAncestor.previousSibling;while(cnt>0){sibling=n.previousSibling;xferNode=_traverseFullySelected(n,how);if(frag){frag.insertBefore(xferNode,frag.firstChild);}
--cnt;n=sibling;}
if(how!=CLONE){self.setEndBefore(endAncestor);self.collapse(FALSE);}
return frag;}
function _traverseCommonEndContainer(startAncestor,how){var frag,startIdx,n,cnt,sibling,xferNode;if(how!=DELETE){frag=createDocumentFragment();}
n=_traverseLeftBoundary(startAncestor,how);if(frag){frag.appendChild(n);}
startIdx=nodeIndex(startAncestor);++startIdx;cnt=self[END_OFFSET]-startIdx;n=startAncestor.nextSibling;while(n&&cnt>0){sibling=n.nextSibling;xferNode=_traverseFullySelected(n,how);if(frag){frag.appendChild(xferNode);}
--cnt;n=sibling;}
if(how!=CLONE){self.setStartAfter(startAncestor);self.collapse(TRUE);}
return frag;}
function _traverseCommonAncestors(startAncestor,endAncestor,how){var n,frag,startOffset,endOffset,cnt,sibling,nextSibling;if(how!=DELETE){frag=createDocumentFragment();}
n=_traverseLeftBoundary(startAncestor,how);if(frag){frag.appendChild(n);}
startOffset=nodeIndex(startAncestor);endOffset=nodeIndex(endAncestor);++startOffset;cnt=endOffset-startOffset;sibling=startAncestor.nextSibling;while(cnt>0){nextSibling=sibling.nextSibling;n=_traverseFullySelected(sibling,how);if(frag){frag.appendChild(n);}
sibling=nextSibling;--cnt;}
n=_traverseRightBoundary(endAncestor,how);if(frag){frag.appendChild(n);}
if(how!=CLONE){self.setStartAfter(startAncestor);self.collapse(TRUE);}
return frag;}
function _traverseRightBoundary(root,how){var next=_getSelectedNode(self[END_CONTAINER],self[END_OFFSET]-1),parent,clonedParent;var prevSibling,clonedChild,clonedGrandParent,isFullySelected=next!=self[END_CONTAINER];if(next==root){return _traverseNode(next,isFullySelected,FALSE,how);}
parent=next.parentNode;clonedParent=_traverseNode(parent,FALSE,FALSE,how);while(parent){while(next){prevSibling=next.previousSibling;clonedChild=_traverseNode(next,isFullySelected,FALSE,how);if(how!=DELETE){clonedParent.insertBefore(clonedChild,clonedParent.firstChild);}
isFullySelected=TRUE;next=prevSibling;}
if(parent==root){return clonedParent;}
next=parent.previousSibling;parent=parent.parentNode;clonedGrandParent=_traverseNode(parent,FALSE,FALSE,how);if(how!=DELETE){clonedGrandParent.appendChild(clonedParent);}
clonedParent=clonedGrandParent;}}
function _traverseLeftBoundary(root,how){var next=_getSelectedNode(self[START_CONTAINER],self[START_OFFSET]),isFullySelected=next!=self[START_CONTAINER];var parent,clonedParent,nextSibling,clonedChild,clonedGrandParent;if(next==root){return _traverseNode(next,isFullySelected,TRUE,how);}
parent=next.parentNode;clonedParent=_traverseNode(parent,FALSE,TRUE,how);while(parent){while(next){nextSibling=next.nextSibling;clonedChild=_traverseNode(next,isFullySelected,TRUE,how);if(how!=DELETE){clonedParent.appendChild(clonedChild);}
isFullySelected=TRUE;next=nextSibling;}
if(parent==root){return clonedParent;}
next=parent.nextSibling;parent=parent.parentNode;clonedGrandParent=_traverseNode(parent,FALSE,TRUE,how);if(how!=DELETE){clonedGrandParent.appendChild(clonedParent);}
clonedParent=clonedGrandParent;}}
function _traverseNode(n,isFullySelected,isLeft,how){var txtValue,newNodeValue,oldNodeValue,offset,newNode;if(isFullySelected){return _traverseFullySelected(n,how);}
if(n.nodeType==3){txtValue=n.nodeValue;if(isLeft){offset=self[START_OFFSET];newNodeValue=txtValue.substring(offset);oldNodeValue=txtValue.substring(0,offset);}else{offset=self[END_OFFSET];newNodeValue=txtValue.substring(0,offset);oldNodeValue=txtValue.substring(offset);}
if(how!=CLONE){n.nodeValue=oldNodeValue;}
if(how==DELETE){return;}
newNode=dom.clone(n,FALSE);newNode.nodeValue=newNodeValue;return newNode;}
if(how==DELETE){return;}
return dom.clone(n,FALSE);}
function _traverseFullySelected(n,how){if(how!=DELETE){return how==CLONE?dom.clone(n,TRUE):n;}
n.parentNode.removeChild(n);}
function toStringIE(){return dom.create('body',null,cloneContents()).outerText;}
extend(self,{startContainer:doc,startOffset:0,endContainer:doc,endOffset:0,collapsed:TRUE,commonAncestorContainer:doc,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:setStart,setEnd:setEnd,setStartBefore:setStartBefore,setStartAfter:setStartAfter,setEndBefore:setEndBefore,setEndAfter:setEndAfter,collapse:collapse,selectNode:selectNode,selectNodeContents:selectNodeContents,compareBoundaryPoints:compareBoundaryPoints,deleteContents:deleteContents,extractContents:extractContents,cloneContents:cloneContents,insertNode:insertNode,surroundContents:surroundContents,cloneRange:cloneRange,toStringIE:toStringIE});return self;}
Range.prototype.toString=function(){return this.toStringIE();};return Range;});define("tinymce/html/Entities",["tinymce/util/Tools"],function(Tools){var makeMap=Tools.makeMap;var namedEntities,baseEntities,reverseEntities,attrsCharsRegExp=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,textCharsRegExp=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,rawCharsRegExp=/[<>&\"\']/g,entityRegExp=/&#([a-z0-9]+);?|&([a-z0-9]+);/gi,asciiMap={128:"\u20AC",130:"\u201A",131:"\u0192",132:"\u201E",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02C6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017D",145:"\u2018",146:"\u2019",147:"\u201C",148:"\u201D",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02DC",153:"\u2122",154:"\u0161",155:"\u203A",156:"\u0153",158:"\u017E",159:"\u0178"};baseEntities={'\"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;','&':'&amp;','\u0060':'&#96;'};reverseEntities={'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"','&apos;':"'"};function nativeDecode(text){var elm;elm=document.createElement("div");elm.innerHTML=text;return elm.textContent||elm.innerText||text;}
function buildEntitiesLookup(items,radix){var i,chr,entity,lookup={};if(items){items=items.split(',');radix=radix||10;for(i=0;i<items.length;i+=2){chr=String.fromCharCode(parseInt(items[i],radix));if(!baseEntities[chr]){entity='&'+items[i+1]+';';lookup[chr]=entity;lookup[entity]=chr;}}
return lookup;}}
namedEntities=buildEntitiesLookup('50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,'+
'5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,'+
'5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,'+
'5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,'+
'68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,'+
'6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,'+
'6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,'+
'75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,'+
'7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,'+
'7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,'+
'sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,'+
'st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,'+
't9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,'+
'tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,'+
'u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,'+
'81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,'+
'8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,'+
'8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,'+
'8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,'+
'8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,'+
'nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,'+
'rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,'+
'Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,'+
'80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,'+
'811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro',32);var Entities={encodeRaw:function(text,attr){return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){return baseEntities[chr]||chr;});},encodeAllRaw:function(text){return(''+text).replace(rawCharsRegExp,function(chr){return baseEntities[chr]||chr;});},encodeNumeric:function(text,attr){return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){if(chr.length>1){return '&#'+(((chr.charCodeAt(0)-0xD800)*0x400)+(chr.charCodeAt(1)-0xDC00)+0x10000)+';';}
return baseEntities[chr]||'&#'+chr.charCodeAt(0)+';';});},encodeNamed:function(text,attr,entities){entities=entities||namedEntities;return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){return baseEntities[chr]||entities[chr]||chr;});},getEncodeFunc:function(name,entities){entities=buildEntitiesLookup(entities)||namedEntities;function encodeNamedAndNumeric(text,attr){return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){return baseEntities[chr]||entities[chr]||'&#'+chr.charCodeAt(0)+';'||chr;});}
function encodeCustomNamed(text,attr){return Entities.encodeNamed(text,attr,entities);}
name=makeMap(name.replace(/\+/g,','));if(name.named&&name.numeric){return encodeNamedAndNumeric;}
if(name.named){if(entities){return encodeCustomNamed;}
return Entities.encodeNamed;}
if(name.numeric){return Entities.encodeNumeric;}
return Entities.encodeRaw;},decode:function(text){return text.replace(entityRegExp,function(all,numeric){if(numeric){if(numeric.charAt(0).toLowerCase()==='x'){numeric=parseInt(numeric.substr(1),16);}else{numeric=parseInt(numeric,10);}
if(numeric>0xFFFF){numeric-=0x10000;return String.fromCharCode(0xD800+(numeric>>10),0xDC00+(numeric&0x3FF));}
return asciiMap[numeric]||String.fromCharCode(numeric);}
return reverseEntities[all]||namedEntities[all]||nativeDecode(all);});}};return Entities;});define("tinymce/dom/StyleSheetLoader",["tinymce/util/Tools","tinymce/util/Delay"],function(Tools,Delay){"use strict";return function(document,settings){var idCount=0,loadedStates={},maxLoadTime;settings=settings||{};maxLoadTime=settings.maxLoadTime||5000;function appendToHead(node){document.getElementsByTagName('head')[0].appendChild(node);}
function load(url,loadedCallback,errorCallback){var link,style,startTime,state;function passed(){var callbacks=state.passed,i=callbacks.length;while(i--){callbacks[i]();}
state.status=2;state.passed=[];state.failed=[];}
function failed(){var callbacks=state.failed,i=callbacks.length;while(i--){callbacks[i]();}
state.status=3;state.passed=[];state.failed=[];}
function isOldWebKit(){var webKitChunks=navigator.userAgent.match(/WebKit\/(\d*)/);return!!(webKitChunks&&webKitChunks[1]<536);}
function wait(testCallback,waitCallback){if(!testCallback()){if((new Date().getTime())-startTime<maxLoadTime){Delay.setTimeout(waitCallback);}else{failed();}}}
function waitForWebKitLinkLoaded(){wait(function(){var styleSheets=document.styleSheets,styleSheet,i=styleSheets.length,owner;while(i--){styleSheet=styleSheets[i];owner=styleSheet.ownerNode?styleSheet.ownerNode:styleSheet.owningElement;if(owner&&owner.id===link.id){passed();return true;}}},waitForWebKitLinkLoaded);}
function waitForGeckoLinkLoaded(){wait(function(){try{var cssRules=style.sheet.cssRules;passed();return!!cssRules;}catch(ex){}},waitForGeckoLinkLoaded);}
url=Tools._addCacheSuffix(url);if(!loadedStates[url]){state={passed:[],failed:[]};loadedStates[url]=state;}else{state=loadedStates[url];}
if(loadedCallback){state.passed.push(loadedCallback);}
if(errorCallback){state.failed.push(errorCallback);}
if(state.status==1){return;}
if(state.status==2){passed();return;}
if(state.status==3){failed();return;}
state.status=1;link=document.createElement('link');link.rel='stylesheet';link.type='text/css';link.id='u'+(idCount++);link.async=false;link.defer=false;startTime=new Date().getTime();if("onload"in link&&!isOldWebKit()){link.onload=waitForWebKitLinkLoaded;link.onerror=failed;}else{if(navigator.userAgent.indexOf("Firefox")>0){style=document.createElement('style');style.textContent='@import "'+url+'"';waitForGeckoLinkLoaded();appendToHead(style);return;}
waitForWebKitLinkLoaded();}
appendToHead(link);link.href=url;}
this.load=load;};});define("tinymce/dom/DOMUtils",["tinymce/dom/Sizzle","tinymce/dom/DomQuery","tinymce/html/Styles","tinymce/dom/EventUtils","tinymce/dom/TreeWalker","tinymce/dom/Range","tinymce/html/Entities","tinymce/Env","tinymce/util/Tools","tinymce/dom/StyleSheetLoader"],function(Sizzle,$,Styles,EventUtils,TreeWalker,Range,Entities,Env,Tools,StyleSheetLoader){var each=Tools.each,is=Tools.is,grep=Tools.grep,trim=Tools.trim;var isIE=Env.ie;var simpleSelectorRe=/^([a-z0-9],?)+$/i;var whiteSpaceRegExp=/^[ \t\r\n]*$/;function setupAttrHooks(domUtils,settings){var attrHooks={},keepValues=settings.keep_values,keepUrlHook;keepUrlHook={set:function($elm,value,name){if(settings.url_converter){value=settings.url_converter.call(settings.url_converter_scope||domUtils,value,name,$elm[0]);}
$elm.attr('data-mce-'+name,value).attr(name,value);},get:function($elm,name){return $elm.attr('data-mce-'+name)||$elm.attr(name);}};attrHooks={style:{set:function($elm,value){if(value!==null&&typeof value==='object'){$elm.css(value);return;}
if(keepValues){$elm.attr('data-mce-style',value);}
$elm.attr('style',value);},get:function($elm){var value=$elm.attr('data-mce-style')||$elm.attr('style');value=domUtils.serializeStyle(domUtils.parseStyle(value),$elm[0].nodeName);return value;}}};if(keepValues){attrHooks.href=attrHooks.src=keepUrlHook;}
return attrHooks;}
function updateInternalStyleAttr(domUtils,$elm){var value=$elm.attr('style');value=domUtils.serializeStyle(domUtils.parseStyle(value),$elm[0].nodeName);if(!value){value=null;}
$elm.attr('data-mce-style',value);}
function nodeIndex(node,normalized){var idx=0,lastNodeType,nodeType;if(node){for(lastNodeType=node.nodeType,node=node.previousSibling;node;node=node.previousSibling){nodeType=node.nodeType;if(normalized&&nodeType==3){if(nodeType==lastNodeType||!node.nodeValue.length){continue;}}
idx++;lastNodeType=nodeType;}}
return idx;}
function DOMUtils(doc,settings){var self=this,blockElementsMap;self.doc=doc;self.win=window;self.files={};self.counter=0;self.stdMode=!isIE||doc.documentMode>=8;self.boxModel=!isIE||doc.compatMode=="CSS1Compat"||self.stdMode;self.styleSheetLoader=new StyleSheetLoader(doc);self.boundEvents=[];self.settings=settings=settings||{};self.schema=settings.schema;self.styles=new Styles({url_converter:settings.url_converter,url_converter_scope:settings.url_converter_scope},settings.schema);self.fixDoc(doc);self.events=settings.ownEvents?new EventUtils(settings.proxy):EventUtils.Event;self.attrHooks=setupAttrHooks(self,settings);blockElementsMap=settings.schema?settings.schema.getBlockElements():{};self.$=$.overrideDefaults(function(){return{context:doc,element:self.getRoot()};});self.isBlock=function(node){if(!node){return false;}
var type=node.nodeType;if(type){return!!(type===1&&blockElementsMap[node.nodeName]);}
return!!blockElementsMap[node];};}
DOMUtils.prototype={$$:function(elm){if(typeof elm=='string'){elm=this.get(elm);}
return this.$(elm);},root:null,fixDoc:function(doc){var settings=this.settings,name;if(isIE&&settings.schema){('abbr article aside audio canvas '+
'details figcaption figure footer '+
'header hgroup mark menu meter nav '+
'output progress section summary '+
'time video').replace(/\w+/g,function(name){doc.createElement(name);});for(name in settings.schema.getCustomElements()){doc.createElement(name);}}},clone:function(node,deep){var self=this,clone,doc;if(!isIE||node.nodeType!==1||deep){return node.cloneNode(deep);}
doc=self.doc;if(!deep){clone=doc.createElement(node.nodeName);each(self.getAttribs(node),function(attr){self.setAttrib(clone,attr.nodeName,self.getAttrib(node,attr.nodeName));});return clone;}
return clone.firstChild;},getRoot:function(){var self=this;return self.settings.root_element||self.doc.body;},getViewPort:function(win){var doc,rootElm;win=!win?this.win:win;doc=win.document;rootElm=this.boxModel?doc.documentElement:doc.body;return{x:win.pageXOffset||rootElm.scrollLeft,y:win.pageYOffset||rootElm.scrollTop,w:win.innerWidth||rootElm.clientWidth,h:win.innerHeight||rootElm.clientHeight};},getRect:function(elm){var self=this,pos,size;elm=self.get(elm);pos=self.getPos(elm);size=self.getSize(elm);return{x:pos.x,y:pos.y,w:size.w,h:size.h};},getSize:function(elm){var self=this,w,h;elm=self.get(elm);w=self.getStyle(elm,'width');h=self.getStyle(elm,'height');if(w.indexOf('px')===-1){w=0;}
if(h.indexOf('px')===-1){h=0;}
return{w:parseInt(w,10)||elm.offsetWidth||elm.clientWidth,h:parseInt(h,10)||elm.offsetHeight||elm.clientHeight};},getParent:function(node,selector,root){return this.getParents(node,selector,root,false);},getParents:function(node,selector,root,collect){var self=this,selectorVal,result=[];node=self.get(node);collect=collect===undefined;root=root||(self.getRoot().nodeName!='BODY'?self.getRoot().parentNode:null);if(is(selector,'string')){selectorVal=selector;if(selector==='*'){selector=function(node){return node.nodeType==1;};}else{selector=function(node){return self.is(node,selectorVal);};}}
while(node){if(node==root||!node.nodeType||node.nodeType===9){break;}
if(!selector||selector(node)){if(collect){result.push(node);}else{return node;}}
node=node.parentNode;}
return collect?result:null;},get:function(elm){var name;if(elm&&this.doc&&typeof elm=='string'){name=elm;elm=this.doc.getElementById(elm);if(elm&&elm.id!==name){return this.doc.getElementsByName(name)[1];}}
return elm;},getNext:function(node,selector){return this._findSib(node,selector,'nextSibling');},getPrev:function(node,selector){return this._findSib(node,selector,'previousSibling');},select:function(selector,scope){var self=this;return Sizzle(selector,self.get(scope)||self.settings.root_element||self.doc,[]);},is:function(elm,selector){var i;if(elm.length===undefined){if(selector==='*'){return elm.nodeType==1;}
if(simpleSelectorRe.test(selector)){selector=selector.toLowerCase().split(/,/);elm=elm.nodeName.toLowerCase();for(i=selector.length-1;i>=0;i--){if(selector[i]==elm){return true;}}
return false;}}
if(elm.nodeType&&elm.nodeType!=1){return false;}
var elms=elm.nodeType?[elm]:elm;return Sizzle(selector,elms[0].ownerDocument||elms[0],null,elms).length>0;},add:function(parentElm,name,attrs,html,create){var self=this;return this.run(parentElm,function(parentElm){var newElm;newElm=is(name,'string')?self.doc.createElement(name):name;self.setAttribs(newElm,attrs);if(html){if(html.nodeType){newElm.appendChild(html);}else{self.setHTML(newElm,html);}}
return!create?parentElm.appendChild(newElm):newElm;});},create:function(name,attrs,html){return this.add(this.doc.createElement(name),name,attrs,html,1);},createHTML:function(name,attrs,html){var outHtml='',key;outHtml+='<'+name;for(key in attrs){if(attrs.hasOwnProperty(key)&&attrs[key]!==null&&typeof attrs[key]!='undefined'){outHtml+=' '+key+'="'+this.encode(attrs[key])+'"';}}
if(typeof html!="undefined"){return outHtml+'>'+html+'</'+name+'>';}
return outHtml+' />';},createFragment:function(html){var frag,node,doc=this.doc,container;container=doc.createElement("div");frag=doc.createDocumentFragment();if(html){container.innerHTML=html;}
while((node=container.firstChild)){frag.appendChild(node);}
return frag;},remove:function(node,keepChildren){node=this.$$(node);if(keepChildren){node.each(function(){var child;while((child=this.firstChild)){if(child.nodeType==3&&child.data.length===0){this.removeChild(child);}else{this.parentNode.insertBefore(child,this);}}}).remove();}else{node.remove();}
return node.length>1?node.toArray():node[0];},setStyle:function(elm,name,value){elm=this.$$(elm).css(name,value);if(this.settings.update_styles){updateInternalStyleAttr(this,elm);}},getStyle:function(elm,name,computed){elm=this.$$(elm);if(computed){return elm.css(name);}
name=name.replace(/-(\D)/g,function(a,b){return b.toUpperCase();});if(name=='float'){name=Env.ie&&Env.ie<12?'styleFloat':'cssFloat';}
return elm[0]&&elm[0].style?elm[0].style[name]:undefined;},setStyles:function(elm,styles){elm=this.$$(elm).css(styles);if(this.settings.update_styles){updateInternalStyleAttr(this,elm);}},removeAllAttribs:function(e){return this.run(e,function(e){var i,attrs=e.attributes;for(i=attrs.length-1;i>=0;i--){e.removeAttributeNode(attrs.item(i));}});},setAttrib:function(elm,name,value){var self=this,originalValue,hook,settings=self.settings;if(value===''){value=null;}
elm=self.$$(elm);originalValue=elm.attr(name);if(!elm.length){return;}
hook=self.attrHooks[name];if(hook&&hook.set){hook.set(elm,value,name);}else{elm.attr(name,value);}
if(originalValue!=value&&settings.onSetAttrib){settings.onSetAttrib({attrElm:elm,attrName:name,attrValue:value});}},setAttribs:function(elm,attrs){var self=this;self.$$(elm).each(function(i,node){each(attrs,function(value,name){self.setAttrib(node,name,value);});});},getAttrib:function(elm,name,defaultVal){var self=this,hook,value;elm=self.$$(elm);if(elm.length){hook=self.attrHooks[name];if(hook&&hook.get){value=hook.get(elm,name);}else{value=elm.attr(name);}}
if(typeof value=='undefined'){value=defaultVal||'';}
return value;},getPos:function(elm,rootElm){var self=this,x=0,y=0,offsetParent,doc=self.doc,body=doc.body,pos;elm=self.get(elm);rootElm=rootElm||body;if(elm){if(rootElm===body&&elm.getBoundingClientRect&&$(body).css('position')==='static'){pos=elm.getBoundingClientRect();rootElm=self.boxModel?doc.documentElement:body;x=pos.left+(doc.documentElement.scrollLeft||body.scrollLeft)-rootElm.clientLeft;y=pos.top+(doc.documentElement.scrollTop||body.scrollTop)-rootElm.clientTop;return{x:x,y:y};}
offsetParent=elm;while(offsetParent&&offsetParent!=rootElm&&offsetParent.nodeType){x+=offsetParent.offsetLeft||0;y+=offsetParent.offsetTop||0;offsetParent=offsetParent.offsetParent;}
offsetParent=elm.parentNode;while(offsetParent&&offsetParent!=rootElm&&offsetParent.nodeType){x-=offsetParent.scrollLeft||0;y-=offsetParent.scrollTop||0;offsetParent=offsetParent.parentNode;}}
return{x:x,y:y};},parseStyle:function(cssText){return this.styles.parse(cssText);},serializeStyle:function(styles,name){return this.styles.serialize(styles,name);},addStyle:function(cssText){var self=this,doc=self.doc,head,styleElm;if(self!==DOMUtils.DOM&&doc===document){var addedStyles=DOMUtils.DOM.addedStyles;addedStyles=addedStyles||[];if(addedStyles[cssText]){return;}
addedStyles[cssText]=true;DOMUtils.DOM.addedStyles=addedStyles;}
styleElm=doc.getElementById('mceDefaultStyles');if(!styleElm){styleElm=doc.createElement('style');styleElm.id='mceDefaultStyles';styleElm.type='text/css';head=doc.getElementsByTagName('head')[0];if(head.firstChild){head.insertBefore(styleElm,head.firstChild);}else{head.appendChild(styleElm);}}
if(styleElm.styleSheet){styleElm.styleSheet.cssText+=cssText;}else{styleElm.appendChild(doc.createTextNode(cssText));}},loadCSS:function(url){var self=this,doc=self.doc,head;if(self!==DOMUtils.DOM&&doc===document){DOMUtils.DOM.loadCSS(url);return;}
if(!url){url='';}
head=doc.getElementsByTagName('head')[0];each(url.split(','),function(url){var link;url=Tools._addCacheSuffix(url);if(self.files[url]){return;}
self.files[url]=true;link=self.create('link',{rel:'stylesheet',href:url});if(isIE&&doc.documentMode&&doc.recalc){link.onload=function(){if(doc.recalc){doc.recalc();}
link.onload=null;};}
head.appendChild(link);});},addClass:function(elm,cls){this.$$(elm).addClass(cls);},removeClass:function(elm,cls){this.toggleClass(elm,cls,false);},hasClass:function(elm,cls){return this.$$(elm).hasClass(cls);},toggleClass:function(elm,cls,state){this.$$(elm).toggleClass(cls,state).each(function(){if(this.className===''){$(this).attr('class',null);}});},show:function(elm){this.$$(elm).show();},hide:function(elm){this.$$(elm).hide();},isHidden:function(elm){return this.$$(elm).css('display')=='none';},uniqueId:function(prefix){return(!prefix?'mce_':prefix)+(this.counter++);},setHTML:function(elm,html){elm=this.$$(elm);if(isIE){elm.each(function(i,target){if(target.canHaveHTML===false){return;}
while(target.firstChild){target.removeChild(target.firstChild);}
try{target.innerHTML='<br>'+html;target.removeChild(target.firstChild);}catch(ex){$('<div>').html('<br>'+html).contents().slice(1).appendTo(target);}
return html;});}else{elm.html(html);}},getOuterHTML:function(elm){elm=this.get(elm);return elm.nodeType==1&&"outerHTML"in elm?elm.outerHTML:$('<div>').append($(elm).clone()).html();},setOuterHTML:function(elm,html){var self=this;self.$$(elm).each(function(){try{if("outerHTML"in this){this.outerHTML=html;return;}}catch(ex){}
self.remove($(this).html(html),true);});},decode:Entities.decode,encode:Entities.encodeAllRaw,insertAfter:function(node,referenceNode){referenceNode=this.get(referenceNode);return this.run(node,function(node){var parent,nextSibling;parent=referenceNode.parentNode;nextSibling=referenceNode.nextSibling;if(nextSibling){parent.insertBefore(node,nextSibling);}else{parent.appendChild(node);}
return node;});},replace:function(newElm,oldElm,keepChildren){var self=this;return self.run(oldElm,function(oldElm){if(is(oldElm,'array')){newElm=newElm.cloneNode(true);}
if(keepChildren){each(grep(oldElm.childNodes),function(node){newElm.appendChild(node);});}
return oldElm.parentNode.replaceChild(newElm,oldElm);});},rename:function(elm,name){var self=this,newElm;if(elm.nodeName!=name.toUpperCase()){newElm=self.create(name);each(self.getAttribs(elm),function(attrNode){self.setAttrib(newElm,attrNode.nodeName,self.getAttrib(elm,attrNode.nodeName));});self.replace(newElm,elm,1);}
return newElm||elm;},findCommonAncestor:function(a,b){var ps=a,pe;while(ps){pe=b;while(pe&&ps!=pe){pe=pe.parentNode;}
if(ps==pe){break;}
ps=ps.parentNode;}
if(!ps&&a.ownerDocument){return a.ownerDocument.documentElement;}
return ps;},toHex:function(rgbVal){return this.styles.toHex(Tools.trim(rgbVal));},run:function(elm,func,scope){var self=this,result;if(typeof elm==='string'){elm=self.get(elm);}
if(!elm){return false;}
scope=scope||this;if(!elm.nodeType&&(elm.length||elm.length===0)){result=[];each(elm,function(elm,i){if(elm){if(typeof elm=='string'){elm=self.get(elm);}
result.push(func.call(scope,elm,i));}});return result;}
return func.call(scope,elm);},getAttribs:function(elm){var attrs;elm=this.get(elm);if(!elm){return[];}
if(isIE){attrs=[];if(elm.nodeName=='OBJECT'){return elm.attributes;}
if(elm.nodeName==='OPTION'&&this.getAttrib(elm,'selected')){attrs.push({specified:1,nodeName:'selected'});}
var attrRegExp=/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;elm.cloneNode(false).outerHTML.replace(attrRegExp,'').replace(/[\w:\-]+/gi,function(a){attrs.push({specified:1,nodeName:a});});return attrs;}
return elm.attributes;},isEmpty:function(node,elements){var self=this,i,attributes,type,walker,name,brCount=0;node=node.firstChild;if(node){walker=new TreeWalker(node,node.parentNode);elements=elements||(self.schema?self.schema.getNonEmptyElements():null);do{type=node.nodeType;if(type===1){if(node.getAttribute('data-mce-bogus')){continue;}
name=node.nodeName.toLowerCase();if(elements&&elements[name]){if(name==='br'){brCount++;continue;}
return false;}
attributes=self.getAttribs(node);i=attributes.length;while(i--){name=attributes[i].nodeName;if(name==="name"||name==='data-mce-bookmark'){return false;}}}
if(type==8){return false;}
if((type===3&&!whiteSpaceRegExp.test(node.nodeValue))){return false;}}while((node=walker.next()));}
return brCount<=1;},createRng:function(){var doc=this.doc;return doc.createRange?doc.createRange():new Range(this);},nodeIndex:nodeIndex,split:function(parentElm,splitElm,replacementElm){var self=this,r=self.createRng(),bef,aft,pa;function trimNode(node){var i,children=node.childNodes,type=node.nodeType;function surroundedBySpans(node){var previousIsSpan=node.previousSibling&&node.previousSibling.nodeName=='SPAN';var nextIsSpan=node.nextSibling&&node.nextSibling.nodeName=='SPAN';return previousIsSpan&&nextIsSpan;}
if(type==1&&node.getAttribute('data-mce-type')=='bookmark'){return;}
for(i=children.length-1;i>=0;i--){trimNode(children[i]);}
if(type!=9){if(type==3&&node.nodeValue.length>0){var trimmedLength=trim(node.nodeValue).length;if(!self.isBlock(node.parentNode)||trimmedLength>0||trimmedLength===0&&surroundedBySpans(node)){return;}}else if(type==1){children=node.childNodes;if(children.length==1&&children[0]&&children[0].nodeType==1&&children[0].getAttribute('data-mce-type')=='bookmark'){node.parentNode.insertBefore(children[0],node);}
if(children.length||/^(br|hr|input|img)$/i.test(node.nodeName)){return;}}
self.remove(node);}
return node;}
if(parentElm&&splitElm){r.setStart(parentElm.parentNode,self.nodeIndex(parentElm));r.setEnd(splitElm.parentNode,self.nodeIndex(splitElm));bef=r.extractContents();r=self.createRng();r.setStart(splitElm.parentNode,self.nodeIndex(splitElm)+1);r.setEnd(parentElm.parentNode,self.nodeIndex(parentElm)+1);aft=r.extractContents();pa=parentElm.parentNode;pa.insertBefore(trimNode(bef),parentElm);if(replacementElm){pa.insertBefore(replacementElm,parentElm);}else{pa.insertBefore(splitElm,parentElm);}
pa.insertBefore(trimNode(aft),parentElm);self.remove(parentElm);return replacementElm||splitElm;}},bind:function(target,name,func,scope){var self=this;if(Tools.isArray(target)){var i=target.length;while(i--){target[i]=self.bind(target[i],name,func,scope);}
return target;}
if(self.settings.collect&&(target===self.doc||target===self.win)){self.boundEvents.push([target,name,func,scope]);}
return self.events.bind(target,name,func,scope||self);},unbind:function(target,name,func){var self=this,i;if(Tools.isArray(target)){i=target.length;while(i--){target[i]=self.unbind(target[i],name,func);}
return target;}
if(self.boundEvents&&(target===self.doc||target===self.win)){i=self.boundEvents.length;while(i--){var item=self.boundEvents[i];if(target==item[0]&&(!name||name==item[1])&&(!func||func==item[2])){this.events.unbind(item[0],item[1],item[2]);}}}
return this.events.unbind(target,name,func);},fire:function(target,name,evt){return this.events.fire(target,name,evt);},getContentEditable:function(node){var contentEditable;if(!node||node.nodeType!=1){return null;}
contentEditable=node.getAttribute("data-mce-contenteditable");if(contentEditable&&contentEditable!=="inherit"){return contentEditable;}
return node.contentEditable!=="inherit"?node.contentEditable:null;},getContentEditableParent:function(node){var root=this.getRoot(),state=null;for(;node&&node!==root;node=node.parentNode){state=this.getContentEditable(node);if(state!==null){break;}}
return state;},destroy:function(){var self=this;if(self.boundEvents){var i=self.boundEvents.length;while(i--){var item=self.boundEvents[i];this.events.unbind(item[0],item[1],item[2]);}
self.boundEvents=null;}
if(Sizzle.setDocument){Sizzle.setDocument();}
self.win=self.doc=self.root=self.events=self.frag=null;},isChildOf:function(node,parent){while(node){if(parent===node){return true;}
node=node.parentNode;}
return false;},dumpRng:function(r){return('startContainer: '+r.startContainer.nodeName+
', startOffset: '+r.startOffset+
', endContainer: '+r.endContainer.nodeName+
', endOffset: '+r.endOffset);},_findSib:function(node,selector,name){var self=this,func=selector;if(node){if(typeof func=='string'){func=function(node){return self.is(node,selector);};}
for(node=node[name];node;node=node[name]){if(func(node)){return node;}}}
return null;}};DOMUtils.DOM=new DOMUtils(document);DOMUtils.nodeIndex=nodeIndex;return DOMUtils;});define("tinymce/dom/ScriptLoader",["tinymce/dom/DOMUtils","tinymce/util/Tools"],function(DOMUtils,Tools){var DOM=DOMUtils.DOM;var each=Tools.each,grep=Tools.grep;function ScriptLoader(){var QUEUED=0,LOADING=1,LOADED=2,states={},queue=[],scriptLoadedCallbacks={},queueLoadedCallbacks=[],loading=0,undef;function loadScript(url,callback){var dom=DOM,elm,id;function done(){dom.remove(id);if(elm){elm.onreadystatechange=elm.onload=elm=null;}
callback();}
function error(){if(typeof console!=="undefined"&&console.log){console.log("Failed to load: "+url);}}
id=dom.uniqueId();elm=document.createElement('script');elm.id=id;elm.type='text/javascript';elm.src=Tools._addCacheSuffix(url);if("onreadystatechange"in elm){elm.onreadystatechange=function(){if(/loaded|complete/.test(elm.readyState)){done();}};}else{elm.onload=done;}
elm.onerror=error;(document.getElementsByTagName('head')[0]||document.body).appendChild(elm);}
this.isDone=function(url){return states[url]==LOADED;};this.markDone=function(url){states[url]=LOADED;};this.add=this.load=function(url,callback,scope){var state=states[url];if(state==undef){queue.push(url);states[url]=QUEUED;}
if(callback){if(!scriptLoadedCallbacks[url]){scriptLoadedCallbacks[url]=[];}
scriptLoadedCallbacks[url].push({func:callback,scope:scope||this});}};this.remove=function(url){delete states[url];delete scriptLoadedCallbacks[url];};this.loadQueue=function(callback,scope){this.loadScripts(queue,callback,scope);};this.loadScripts=function(scripts,callback,scope){var loadScripts;function execScriptLoadedCallbacks(url){each(scriptLoadedCallbacks[url],function(callback){callback.func.call(callback.scope);});scriptLoadedCallbacks[url]=undef;}
queueLoadedCallbacks.push({func:callback,scope:scope||this});loadScripts=function(){var loadingScripts=grep(scripts);scripts.length=0;each(loadingScripts,function(url){if(states[url]==LOADED){execScriptLoadedCallbacks(url);return;}
if(states[url]!=LOADING){states[url]=LOADING;loading++;loadScript(url,function(){states[url]=LOADED;loading--;execScriptLoadedCallbacks(url);loadScripts();});}});if(!loading){each(queueLoadedCallbacks,function(callback){callback.func.call(callback.scope);});queueLoadedCallbacks.length=0;}};loadScripts();};}
ScriptLoader.ScriptLoader=new ScriptLoader();return ScriptLoader;});define("tinymce/AddOnManager",["tinymce/dom/ScriptLoader","tinymce/util/Tools"],function(ScriptLoader,Tools){var each=Tools.each;function AddOnManager(){var self=this;self.items=[];self.urls={};self.lookup={};}
AddOnManager.prototype={get:function(name){if(this.lookup[name]){return this.lookup[name].instance;}
return undefined;},dependencies:function(name){var result;if(this.lookup[name]){result=this.lookup[name].dependencies;}
return result||[];},requireLangPack:function(name,languages){var language=AddOnManager.language;if(language&&AddOnManager.languageLoad!==false){if(languages){languages=','+languages+',';if(languages.indexOf(','+language.substr(0,2)+',')!=-1){language=language.substr(0,2);}else if(languages.indexOf(','+language+',')==-1){return;}}
ScriptLoader.ScriptLoader.add(this.urls[name]+'/langs/'+language+'.js');}},add:function(id,addOn,dependencies){this.items.push(addOn);this.lookup[id]={instance:addOn,dependencies:dependencies};return addOn;},remove:function(name){delete this.urls[name];delete this.lookup[name];},createUrl:function(baseUrl,dep){if(typeof dep==="object"){return dep;}
return{prefix:baseUrl.prefix,resource:dep,suffix:baseUrl.suffix};},addComponents:function(pluginName,scripts){var pluginUrl=this.urls[pluginName];each(scripts,function(script){ScriptLoader.ScriptLoader.add(pluginUrl+"/"+script);});},load:function(name,addOnUrl,callback,scope){var self=this,url=addOnUrl;function loadDependencies(){var dependencies=self.dependencies(name);each(dependencies,function(dep){var newUrl=self.createUrl(addOnUrl,dep);self.load(newUrl.resource,newUrl,undefined,undefined);});if(callback){if(scope){callback.call(scope);}else{callback.call(ScriptLoader);}}}
if(self.urls[name]){return;}
if(typeof addOnUrl==="object"){url=addOnUrl.prefix+addOnUrl.resource+addOnUrl.suffix;}
if(url.indexOf('/')!==0&&url.indexOf('://')==-1){url=AddOnManager.baseURL+'/'+url;}
self.urls[name]=url.substring(0,url.lastIndexOf('/'));if(self.lookup[name]){loadDependencies();}else{ScriptLoader.ScriptLoader.add(url,loadDependencies,scope);}}};AddOnManager.PluginManager=new AddOnManager();AddOnManager.ThemeManager=new AddOnManager();return AddOnManager;});define("tinymce/dom/NodeType",[],function(){function isNodeType(type){return function(node){return!!node&&node.nodeType==type;};}
var isElement=isNodeType(1);function matchNodeNames(names){names=names.toLowerCase().split(' ');return function(node){var i,name;if(node&&node.nodeType){name=node.nodeName.toLowerCase();for(i=0;i<names.length;i++){if(name===names[i]){return true;}}}
return false;};}
function matchStyleValues(name,values){values=values.toLowerCase().split(' ');return function(node){var i,cssValue;if(isElement(node)){for(i=0;i<values.length;i++){cssValue=getComputedStyle(node,null).getPropertyValue(name);if(cssValue===values[i]){return true;}}}
return false;};}
function hasPropValue(propName,propValue){return function(node){return isElement(node)&&node[propName]===propValue;};}
function hasAttributeValue(attrName,attrValue){return function(node){return isElement(node)&&node.getAttribute(attrName)===attrValue;};}
function isBogus(node){return isElement(node)&&node.hasAttribute('data-mce-bogus');}
function hasContentEditableState(value){return function(node){if(isElement(node)){if(node.contentEditable===value){return true;}
if(node.getAttribute('data-mce-contenteditable')===value){return true;}}
return false;};}
return{isText:isNodeType(3),isElement:isElement,isComment:isNodeType(8),isBr:matchNodeNames('br'),isContentEditableTrue:hasContentEditableState('true'),isContentEditableFalse:hasContentEditableState('false'),matchNodeNames:matchNodeNames,hasPropValue:hasPropValue,hasAttributeValue:hasAttributeValue,matchStyleValues:matchStyleValues,isBogus:isBogus};});define("tinymce/text/Zwsp",[],function(){var ZWSP='\u200b';function isZwsp(chr){return chr==ZWSP;}
function trim(str){return str.replace(new RegExp(ZWSP,'g'),'');}
return{isZwsp:isZwsp,ZWSP:ZWSP,trim:trim};});define("tinymce/caret/CaretContainer",["tinymce/dom/NodeType","tinymce/text/Zwsp"],function(NodeType,Zwsp){var isElement=NodeType.isElement,isText=NodeType.isText;function isCaretContainerBlock(node){if(isText(node)){node=node.parentNode;}
return isElement(node)&&node.hasAttribute('data-mce-caret');}
function isCaretContainerInline(node){return isText(node)&&Zwsp.isZwsp(node.data);}
function isCaretContainer(node){return isCaretContainerBlock(node)||isCaretContainerInline(node);}
function insertInline(node,before){var doc,sibling,textNode,parentNode;doc=node.ownerDocument;textNode=doc.createTextNode(Zwsp.ZWSP);parentNode=node.parentNode;if(!before){sibling=node.nextSibling;if(isText(sibling)){if(isCaretContainer(sibling)){return sibling;}
if(startsWithCaretContainer(sibling)){sibling.splitText(1);return sibling;}}
if(node.nextSibling){parentNode.insertBefore(textNode,node.nextSibling);}else{parentNode.appendChild(textNode);}}else{sibling=node.previousSibling;if(isText(sibling)){if(isCaretContainer(sibling)){return sibling;}
if(endsWithCaretContainer(sibling)){return sibling.splitText(sibling.data.length-1);}}
parentNode.insertBefore(textNode,node);}
return textNode;}
function insertBlock(blockName,node,before){var doc,blockNode,parentNode;doc=node.ownerDocument;blockNode=doc.createElement(blockName);blockNode.setAttribute('data-mce-caret',before?'before':'after');blockNode.setAttribute('data-mce-bogus','all');blockNode.appendChild(doc.createTextNode('\u00a0'));parentNode=node.parentNode;if(!before){if(node.nextSibling){parentNode.insertBefore(blockNode,node.nextSibling);}else{parentNode.appendChild(blockNode);}}else{parentNode.insertBefore(blockNode,node);}
return blockNode;}
function remove(caretContainerNode){var text;if(isElement(caretContainerNode)&&isCaretContainer(caretContainerNode)){if(caretContainerNode.innerHTML!='&nbsp;'){caretContainerNode.removeAttribute('data-mce-caret');}else{if(caretContainerNode.parentNode){caretContainerNode.parentNode.removeChild(caretContainerNode);}}}
if(isText(caretContainerNode)){text=Zwsp.trim(caretContainerNode.data);if(text.length===0){if(caretContainerNode.parentNode){caretContainerNode.parentNode.removeChild(caretContainerNode);}}
caretContainerNode.nodeValue=text;}}
function startsWithCaretContainer(node){return isText(node)&&node.data[0]==Zwsp.ZWSP;}
function endsWithCaretContainer(node){return isText(node)&&node.data[node.data.length-1]==Zwsp.ZWSP;}
return{isCaretContainer:isCaretContainer,isCaretContainerBlock:isCaretContainerBlock,isCaretContainerInline:isCaretContainerInline,insertInline:insertInline,insertBlock:insertBlock,remove:remove,startsWithCaretContainer:startsWithCaretContainer,endsWithCaretContainer:endsWithCaretContainer};});define("tinymce/dom/RangeUtils",["tinymce/util/Tools","tinymce/dom/TreeWalker","tinymce/dom/NodeType","tinymce/caret/CaretContainer"],function(Tools,TreeWalker,NodeType,CaretContainer){var each=Tools.each,isContentEditableFalse=NodeType.isContentEditableFalse,isCaretContainer=CaretContainer.isCaretContainer;function getEndChild(container,index){var childNodes=container.childNodes;index--;if(index>childNodes.length-1){index=childNodes.length-1;}else if(index<0){index=0;}
return childNodes[index]||container;}
function RangeUtils(dom){this.walk=function(rng,callback){var startContainer=rng.startContainer,startOffset=rng.startOffset,endContainer=rng.endContainer,endOffset=rng.endOffset,ancestor,startPoint,endPoint,node,parent,siblings,nodes;nodes=dom.select('td[data-mce-selected],th[data-mce-selected]');if(nodes.length>0){each(nodes,function(node){callback([node]);});return;}
function exclude(nodes){var node;node=nodes[0];if(node.nodeType===3&&node===startContainer&&startOffset>=node.nodeValue.length){nodes.splice(0,1);}
node=nodes[nodes.length-1];if(endOffset===0&&nodes.length>0&&node===endContainer&&node.nodeType===3){nodes.splice(nodes.length-1,1);}
return nodes;}
function collectSiblings(node,name,end_node){var siblings=[];for(;node&&node!=end_node;node=node[name]){siblings.push(node);}
return siblings;}
function findEndPoint(node,root){do{if(node.parentNode==root){return node;}
node=node.parentNode;}while(node);}
function walkBoundary(start_node,end_node,next){var siblingName=next?'nextSibling':'previousSibling';for(node=start_node,parent=node.parentNode;node&&node!=end_node;node=parent){parent=node.parentNode;siblings=collectSiblings(node==start_node?node:node[siblingName],siblingName);if(siblings.length){if(!next){siblings.reverse();}
callback(exclude(siblings));}}}
if(startContainer.nodeType==1&&startContainer.hasChildNodes()){startContainer=startContainer.childNodes[startOffset];}
if(endContainer.nodeType==1&&endContainer.hasChildNodes()){endContainer=getEndChild(endContainer,endOffset);}
if(startContainer==endContainer){return callback(exclude([startContainer]));}
ancestor=dom.findCommonAncestor(startContainer,endContainer);for(node=startContainer;node;node=node.parentNode){if(node===endContainer){return walkBoundary(startContainer,ancestor,true);}
if(node===ancestor){break;}}
for(node=endContainer;node;node=node.parentNode){if(node===startContainer){return walkBoundary(endContainer,ancestor);}
if(node===ancestor){break;}}
startPoint=findEndPoint(startContainer,ancestor)||startContainer;endPoint=findEndPoint(endContainer,ancestor)||endContainer;walkBoundary(startContainer,startPoint,true);siblings=collectSiblings(startPoint==startContainer?startPoint:startPoint.nextSibling,'nextSibling',endPoint==endContainer?endPoint.nextSibling:endPoint);if(siblings.length){callback(exclude(siblings));}
walkBoundary(endContainer,endPoint);};this.split=function(rng){var startContainer=rng.startContainer,startOffset=rng.startOffset,endContainer=rng.endContainer,endOffset=rng.endOffset;function splitText(node,offset){return node.splitText(offset);}
if(startContainer==endContainer&&startContainer.nodeType==3){if(startOffset>0&&startOffset<startContainer.nodeValue.length){endContainer=splitText(startContainer,startOffset);startContainer=endContainer.previousSibling;if(endOffset>startOffset){endOffset=endOffset-startOffset;startContainer=endContainer=splitText(endContainer,endOffset).previousSibling;endOffset=endContainer.nodeValue.length;startOffset=0;}else{endOffset=0;}}}else{if(startContainer.nodeType==3&&startOffset>0&&startOffset<startContainer.nodeValue.length){startContainer=splitText(startContainer,startOffset);startOffset=0;}
if(endContainer.nodeType==3&&endOffset>0&&endOffset<endContainer.nodeValue.length){endContainer=splitText(endContainer,endOffset).previousSibling;endOffset=endContainer.nodeValue.length;}}
return{startContainer:startContainer,startOffset:startOffset,endContainer:endContainer,endOffset:endOffset};};this.normalize=function(rng){var normalized,collapsed;function normalizeEndPoint(start){var container,offset,walker,body=dom.getRoot(),node,nonEmptyElementsMap;var directionLeft,isAfterNode;function isTableCell(node){return node&&/^(TD|TH|CAPTION)$/.test(node.nodeName);}
function hasBrBeforeAfter(node,left){var walker=new TreeWalker(node,dom.getParent(node.parentNode,dom.isBlock)||body);while((node=walker[left?'prev':'next']())){if(node.nodeName==="BR"){return true;}}}
function hasContentEditableFalseParent(node){while(node&&node!=body){if(isContentEditableFalse(node)){return true;}
node=node.parentNode;}
return false;}
function isPrevNode(node,name){return node.previousSibling&&node.previousSibling.nodeName==name;}
function findTextNodeRelative(left,startNode){var walker,lastInlineElement,parentBlockContainer;startNode=startNode||container;parentBlockContainer=dom.getParent(startNode.parentNode,dom.isBlock)||body;if(left&&startNode.nodeName=='BR'&&isAfterNode&&dom.isEmpty(parentBlockContainer)){container=startNode.parentNode;offset=dom.nodeIndex(startNode);normalized=true;return;}
walker=new TreeWalker(startNode,parentBlockContainer);while((node=walker[left?'prev':'next']())){if(dom.getContentEditableParent(node)==="false"||isCaretContainer(node)){return;}
if(node.nodeType===3&&node.nodeValue.length>0){container=node;offset=left?node.nodeValue.length:0;normalized=true;return;}
if(dom.isBlock(node)||nonEmptyElementsMap[node.nodeName.toLowerCase()]){return;}
lastInlineElement=node;}
if(collapsed&&lastInlineElement){container=lastInlineElement;normalized=true;offset=0;}}
container=rng[(start?'start':'end')+'Container'];offset=rng[(start?'start':'end')+'Offset'];isAfterNode=container.nodeType==1&&offset===container.childNodes.length;nonEmptyElementsMap=dom.schema.getNonEmptyElements();directionLeft=start;if(isCaretContainer(container)){return;}
if(container.nodeType==1&&offset>container.childNodes.length-1){directionLeft=false;}
if(container.nodeType===9){container=dom.getRoot();offset=0;}
if(container===body){if(directionLeft){node=container.childNodes[offset>0?offset-1:0];if(node){if(isCaretContainer(node)){return;}
if(nonEmptyElementsMap[node.nodeName]||node.nodeName=="TABLE"){return;}}}
if(container.hasChildNodes()){offset=Math.min(!directionLeft&&offset>0?offset-1:offset,container.childNodes.length-1);container=container.childNodes[offset];offset=0;if(hasContentEditableFalseParent(container)||isCaretContainer(container)){return;}
if(container.hasChildNodes()&&!/TABLE/.test(container.nodeName)){node=container;walker=new TreeWalker(container,body);do{if(isContentEditableFalse(node)||isCaretContainer(node)){normalized=false;break;}
if(node.nodeType===3&&node.nodeValue.length>0){offset=directionLeft?0:node.nodeValue.length;container=node;normalized=true;break;}
if(nonEmptyElementsMap[node.nodeName.toLowerCase()]&&!isTableCell(node)){offset=dom.nodeIndex(node);container=node.parentNode;if(node.nodeName=="IMG"&&!directionLeft){offset++;}
normalized=true;break;}}while((node=(directionLeft?walker.next():walker.prev())));}}}
if(collapsed){if(container.nodeType===3&&offset===0){findTextNodeRelative(true);}
if(container.nodeType===1){node=container.childNodes[offset];if(!node){node=container.childNodes[offset-1];}
if(node&&node.nodeName==='BR'&&!isPrevNode(node,'A')&&!hasBrBeforeAfter(node)&&!hasBrBeforeAfter(node,true)){findTextNodeRelative(true,node);}}}
if(directionLeft&&!collapsed&&container.nodeType===3&&offset===container.nodeValue.length){findTextNodeRelative(false);}
if(normalized){rng['set'+(start?'Start':'End')](container,offset);}}
collapsed=rng.collapsed;normalizeEndPoint(true);if(!collapsed){normalizeEndPoint();}
if(normalized&&collapsed){rng.collapse(true);}
return normalized;};}
RangeUtils.compareRanges=function(rng1,rng2){if(rng1&&rng2){if(rng1.item||rng1.duplicate){if(rng1.item&&rng2.item&&rng1.item(0)===rng2.item(0)){return true;}
if(rng1.isEqual&&rng2.isEqual&&rng2.isEqual(rng1)){return true;}}else{return rng1.startContainer==rng2.startContainer&&rng1.startOffset==rng2.startOffset;}}
return false;};function findClosestIeRange(clientX,clientY,doc){var element,rng,rects;element=doc.elementFromPoint(clientX,clientY);rng=doc.body.createTextRange();if(!element||element.tagName=='HTML'){element=doc.body;}
rng.moveToElementText(element);rects=Tools.toArray(rng.getClientRects());rects=rects.sort(function(a,b){a=Math.abs(Math.max(a.top-clientY,a.bottom-clientY));b=Math.abs(Math.max(b.top-clientY,b.bottom-clientY));return a-b;});if(rects.length>0){clientY=(rects[0].bottom+rects[0].top)/2;try{rng.moveToPoint(clientX,clientY);rng.collapse(true);return rng;}catch(ex){}}
return null;}
RangeUtils.getCaretRangeFromPoint=function(clientX,clientY,doc){var rng,point;if(doc.caretPositionFromPoint){point=doc.caretPositionFromPoint(clientX,clientY);rng=doc.createRange();rng.setStart(point.offsetNode,point.offset);rng.collapse(true);}else if(doc.caretRangeFromPoint){rng=doc.caretRangeFromPoint(clientX,clientY);}else if(doc.body.createTextRange){rng=doc.body.createTextRange();try{rng.moveToPoint(clientX,clientY);rng.collapse(true);}catch(ex){rng=findClosestIeRange(clientX,clientY,doc);}}
return rng;};RangeUtils.getSelectedNode=function(range){var startContainer=range.startContainer,startOffset=range.startOffset;if(startContainer.hasChildNodes()&&range.endOffset==startOffset+1){return startContainer.childNodes[startOffset];}
return null;};RangeUtils.getNode=function(container,offset){if(container.nodeType==1&&container.hasChildNodes()){if(offset>=container.childNodes.length){offset=container.childNodes.length-1;}
container=container.childNodes[offset];}
return container;};return RangeUtils;});define("tinymce/NodeChange",["tinymce/dom/RangeUtils","tinymce/Env","tinymce/util/Delay"],function(RangeUtils,Env,Delay){return function(editor){var lastRng,lastPath=[];function isSameElementPath(startElm){var i,currentPath;currentPath=editor.$(startElm).parentsUntil(editor.getBody()).add(startElm);if(currentPath.length===lastPath.length){for(i=currentPath.length;i>=0;i--){if(currentPath[i]!==lastPath[i]){break;}}
if(i===-1){lastPath=currentPath;return true;}}
lastPath=currentPath;return false;}
if(!('onselectionchange'in editor.getDoc())){editor.on('NodeChange Click MouseUp KeyUp Focus',function(e){var nativeRng,fakeRng;nativeRng=editor.selection.getRng();fakeRng={startContainer:nativeRng.startContainer,startOffset:nativeRng.startOffset,endContainer:nativeRng.endContainer,endOffset:nativeRng.endOffset};if(e.type=='nodechange'||!RangeUtils.compareRanges(fakeRng,lastRng)){editor.fire('SelectionChange');}
lastRng=fakeRng;});}
editor.on('contextmenu',function(){editor.fire('SelectionChange');});editor.on('SelectionChange',function(){var startElm=editor.selection.getStart(true);if(!Env.range&&editor.selection.isCollapsed()){return;}
if(!isSameElementPath(startElm)&&editor.dom.isChildOf(startElm,editor.getBody())){editor.nodeChanged({selectionChange:true});}});editor.on('MouseUp',function(e){if(!e.isDefaultPrevented()){if(editor.selection.getNode().nodeName=='IMG'){Delay.setEditorTimeout(editor,function(){editor.nodeChanged();});}else{editor.nodeChanged();}}});this.nodeChanged=function(args){var selection=editor.selection,node,parents,root;if(editor.initialized&&selection&&!editor.settings.disable_nodechange&&!editor.readonly){root=editor.getBody();node=selection.getStart()||root;if(node.ownerDocument!=editor.getDoc()||!editor.dom.isChildOf(node,root)){node=root;}
if(node.nodeName=='IMG'&&selection.isCollapsed()){node=node.parentNode;}
parents=[];editor.dom.getParent(node,function(node){if(node===root){return true;}
parents.push(node);});args=args||{};args.element=node;args.parents=parents;editor.fire('NodeChange',args);}};};});define("tinymce/html/Node",[],function(){var whiteSpaceRegExp=/^[ \t\r\n]*$/,typeLookup={'#text':3,'#comment':8,'#cdata':4,'#pi':7,'#doctype':10,'#document-fragment':11};function walk(node,root_node,prev){var sibling,parent,startName=prev?'lastChild':'firstChild',siblingName=prev?'prev':'next';if(node[startName]){return node[startName];}
if(node!==root_node){sibling=node[siblingName];if(sibling){return sibling;}
for(parent=node.parent;parent&&parent!==root_node;parent=parent.parent){sibling=parent[siblingName];if(sibling){return sibling;}}}}
function Node(name,type){this.name=name;this.type=type;if(type===1){this.attributes=[];this.attributes.map={};}}
Node.prototype={replace:function(node){var self=this;if(node.parent){node.remove();}
self.insert(node,self);self.remove();return self;},attr:function(name,value){var self=this,attrs,i,undef;if(typeof name!=="string"){for(i in name){self.attr(i,name[i]);}
return self;}
if((attrs=self.attributes)){if(value!==undef){if(value===null){if(name in attrs.map){delete attrs.map[name];i=attrs.length;while(i--){if(attrs[i].name===name){attrs=attrs.splice(i,1);return self;}}}
return self;}
if(name in attrs.map){i=attrs.length;while(i--){if(attrs[i].name===name){attrs[i].value=value;break;}}}else{attrs.push({name:name,value:value});}
attrs.map[name]=value;return self;}
return attrs.map[name];}},clone:function(){var self=this,clone=new Node(self.name,self.type),i,l,selfAttrs,selfAttr,cloneAttrs;if((selfAttrs=self.attributes)){cloneAttrs=[];cloneAttrs.map={};for(i=0,l=selfAttrs.length;i<l;i++){selfAttr=selfAttrs[i];if(selfAttr.name!=='id'){cloneAttrs[cloneAttrs.length]={name:selfAttr.name,value:selfAttr.value};cloneAttrs.map[selfAttr.name]=selfAttr.value;}}
clone.attributes=cloneAttrs;}
clone.value=self.value;clone.shortEnded=self.shortEnded;return clone;},wrap:function(wrapper){var self=this;self.parent.insert(wrapper,self);wrapper.append(self);return self;},unwrap:function(){var self=this,node,next;for(node=self.firstChild;node;){next=node.next;self.insert(node,self,true);node=next;}
self.remove();},remove:function(){var self=this,parent=self.parent,next=self.next,prev=self.prev;if(parent){if(parent.firstChild===self){parent.firstChild=next;if(next){next.prev=null;}}else{prev.next=next;}
if(parent.lastChild===self){parent.lastChild=prev;if(prev){prev.next=null;}}else{next.prev=prev;}
self.parent=self.next=self.prev=null;}
return self;},append:function(node){var self=this,last;if(node.parent){node.remove();}
last=self.lastChild;if(last){last.next=node;node.prev=last;self.lastChild=node;}else{self.lastChild=self.firstChild=node;}
node.parent=self;return node;},insert:function(node,ref_node,before){var parent;if(node.parent){node.remove();}
parent=ref_node.parent||this;if(before){if(ref_node===parent.firstChild){parent.firstChild=node;}else{ref_node.prev.next=node;}
node.prev=ref_node.prev;node.next=ref_node;ref_node.prev=node;}else{if(ref_node===parent.lastChild){parent.lastChild=node;}else{ref_node.next.prev=node;}
node.next=ref_node.next;node.prev=ref_node;ref_node.next=node;}
node.parent=parent;return node;},getAll:function(name){var self=this,node,collection=[];for(node=self.firstChild;node;node=walk(node,self)){if(node.name===name){collection.push(node);}}
return collection;},empty:function(){var self=this,nodes,i,node;if(self.firstChild){nodes=[];for(node=self.firstChild;node;node=walk(node,self)){nodes.push(node);}
i=nodes.length;while(i--){node=nodes[i];node.parent=node.firstChild=node.lastChild=node.next=node.prev=null;}}
self.firstChild=self.lastChild=null;return self;},isEmpty:function(elements){var self=this,node=self.firstChild,i,name;if(node){do{if(node.type===1){if(node.attributes.map['data-mce-bogus']){continue;}
if(elements[node.name]){return false;}
i=node.attributes.length;while(i--){name=node.attributes[i].name;if(name==="name"||name.indexOf('data-mce-bookmark')===0){return false;}}}
if(node.type===8){return false;}
if((node.type===3&&!whiteSpaceRegExp.test(node.value))){return false;}}while((node=walk(node,self)));}
return true;},walk:function(prev){return walk(this,null,prev);}};Node.create=function(name,attrs){var node,attrName;node=new Node(name,typeLookup[name]||1);if(attrs){for(attrName in attrs){node.attr(attrName,attrs[attrName]);}}
return node;};return Node;});define("tinymce/html/Schema",["tinymce/util/Tools"],function(Tools){var mapCache={},dummyObj={};var makeMap=Tools.makeMap,each=Tools.each,extend=Tools.extend,explode=Tools.explode,inArray=Tools.inArray;function split(items,delim){return items?items.split(delim||' '):[];}
function compileSchema(type){var schema={},globalAttributes,blockContent;var phrasingContent,flowContent,html4BlockContent,html4PhrasingContent;function add(name,attributes,children){var ni,i,attributesOrder,args=arguments;function arrayToMap(array,obj){var map={},i,l;for(i=0,l=array.length;i<l;i++){map[array[i]]=obj||{};}
return map;}
children=children||[];attributes=attributes||"";if(typeof children==="string"){children=split(children);}
for(i=3;i<args.length;i++){if(typeof args[i]==="string"){args[i]=split(args[i]);}
children.push.apply(children,args[i]);}
name=split(name);ni=name.length;while(ni--){attributesOrder=[].concat(globalAttributes,split(attributes));schema[name[ni]]={attributes:arrayToMap(attributesOrder),attributesOrder:attributesOrder,children:arrayToMap(children,dummyObj)};}}
function addAttrs(name,attributes){var ni,schemaItem,i,l;name=split(name);ni=name.length;attributes=split(attributes);while(ni--){schemaItem=schema[name[ni]];for(i=0,l=attributes.length;i<l;i++){schemaItem.attributes[attributes[i]]={};schemaItem.attributesOrder.push(attributes[i]);}}}
if(mapCache[type]){return mapCache[type];}
globalAttributes=split("id accesskey class dir lang style tabindex title");blockContent=split("address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul");phrasingContent=split("a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd "+
"label map noscript object q s samp script select small span strong sub sup "+
"textarea u var #text #comment");if(type!="html4"){globalAttributes.push.apply(globalAttributes,split("contenteditable contextmenu draggable dropzone "+
"hidden spellcheck translate"));blockContent.push.apply(blockContent,split("article aside details dialog figure header footer hgroup section nav"));phrasingContent.push.apply(phrasingContent,split("audio canvas command datalist mark meter output picture "+
"progress time wbr video ruby bdi keygen"));}
if(type!="html5-strict"){globalAttributes.push("xml:lang");html4PhrasingContent=split("acronym applet basefont big font strike tt");phrasingContent.push.apply(phrasingContent,html4PhrasingContent);each(html4PhrasingContent,function(name){add(name,"",phrasingContent);});html4BlockContent=split("center dir isindex noframes");blockContent.push.apply(blockContent,html4BlockContent);flowContent=[].concat(blockContent,phrasingContent);each(html4BlockContent,function(name){add(name,"",flowContent);});}
flowContent=flowContent||[].concat(blockContent,phrasingContent);add("html","manifest","head body");add("head","","base command link meta noscript script style title");add("title hr noscript br");add("base","href target");add("link","href rel media hreflang type sizes hreflang");add("meta","name http-equiv content charset");add("style","media type scoped");add("script","src async defer type charset");add("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus "+
"onhashchange onload onmessage onoffline ononline onpagehide onpageshow "+
"onpopstate onresize onscroll onstorage onunload",flowContent);add("address dt dd div caption","",flowContent);add("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",phrasingContent);add("blockquote","cite",flowContent);add("ol","reversed start type","li");add("ul","","li");add("li","value",flowContent);add("dl","","dt dd");add("a","href target rel media hreflang type",phrasingContent);add("q","cite",phrasingContent);add("ins del","cite datetime",flowContent);add("img","src sizes srcset alt usemap ismap width height");add("iframe","src name width height",flowContent);add("embed","src type width height");add("object","data type typemustmatch name usemap form width height",flowContent,"param");add("param","name value");add("map","name",flowContent,"area");add("area","alt coords shape href target rel media hreflang type");add("table","border","caption colgroup thead tfoot tbody tr"+(type=="html4"?" col":""));add("colgroup","span","col");add("col","span");add("tbody thead tfoot","","tr");add("tr","","td th");add("td","colspan rowspan headers",flowContent);add("th","colspan rowspan headers scope abbr",flowContent);add("form","accept-charset action autocomplete enctype method name novalidate target",flowContent);add("fieldset","disabled form name",flowContent,"legend");add("label","form for",phrasingContent);add("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate "+
"formtarget height list max maxlength min multiple name pattern readonly required size src step type value width");add("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value",type=="html4"?flowContent:phrasingContent);add("select","disabled form multiple name required size","option optgroup");add("optgroup","disabled label","option");add("option","disabled label selected value");add("textarea","cols dirname disabled form maxlength name readonly required rows wrap");add("menu","type label",flowContent,"li");add("noscript","",flowContent);if(type!="html4"){add("wbr");add("ruby","",phrasingContent,"rt rp");add("figcaption","",flowContent);add("mark rt rp summary bdi","",phrasingContent);add("canvas","width height",flowContent);add("video","src crossorigin poster preload autoplay mediagroup loop "+
"muted controls width height buffered",flowContent,"track source");add("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",flowContent,"track source");add("picture","","img source");add("source","src srcset type media sizes");add("track","kind src srclang label default");add("datalist","",phrasingContent,"option");add("article section nav aside header footer","",flowContent);add("hgroup","","h1 h2 h3 h4 h5 h6");add("figure","",flowContent,"figcaption");add("time","datetime",phrasingContent);add("dialog","open",flowContent);add("command","type label icon disabled checked radiogroup command");add("output","for form name",phrasingContent);add("progress","value max",phrasingContent);add("meter","value min max low high optimum",phrasingContent);add("details","open",flowContent,"summary");add("keygen","autofocus challenge disabled form keytype name");}
if(type!="html5-strict"){addAttrs("script","language xml:space");addAttrs("style","xml:space");addAttrs("object","declare classid code codebase codetype archive standby align border hspace vspace");addAttrs("embed","align name hspace vspace");addAttrs("param","valuetype type");addAttrs("a","charset name rev shape coords");addAttrs("br","clear");addAttrs("applet","codebase archive code object alt name width height align hspace vspace");addAttrs("img","name longdesc align border hspace vspace");addAttrs("iframe","longdesc frameborder marginwidth marginheight scrolling align");addAttrs("font basefont","size color face");addAttrs("input","usemap align");addAttrs("select","onchange");addAttrs("textarea");addAttrs("h1 h2 h3 h4 h5 h6 div p legend caption","align");addAttrs("ul","type compact");addAttrs("li","type");addAttrs("ol dl menu dir","compact");addAttrs("pre","width xml:space");addAttrs("hr","align noshade size width");addAttrs("isindex","prompt");addAttrs("table","summary width frame rules cellspacing cellpadding align bgcolor");addAttrs("col","width align char charoff valign");addAttrs("colgroup","width align char charoff valign");addAttrs("thead","align char charoff valign");addAttrs("tr","align char charoff valign bgcolor");addAttrs("th","axis align char charoff valign nowrap bgcolor width height");addAttrs("form","accept");addAttrs("td","abbr axis scope align char charoff valign nowrap bgcolor width height");addAttrs("tfoot","align char charoff valign");addAttrs("tbody","align char charoff valign");addAttrs("area","nohref");addAttrs("body","background bgcolor text link vlink alink");}
if(type!="html4"){addAttrs("input button select textarea","autofocus");addAttrs("input textarea","placeholder");addAttrs("a","download");addAttrs("link script img","crossorigin");addAttrs("iframe","sandbox seamless allowfullscreen");}
each(split('a form meter progress dfn'),function(name){if(schema[name]){delete schema[name].children[name];}});delete schema.caption.children.table;delete schema.script;mapCache[type]=schema;return schema;}
function compileElementMap(value,mode){var styles;if(value){styles={};if(typeof value=='string'){value={'*':value};}
each(value,function(value,key){styles[key]=styles[key.toUpperCase()]=mode=='map'?makeMap(value,/[, ]/):explode(value,/[, ]/);});}
return styles;}
return function(settings){var self=this,elements={},children={},patternElements=[],validStyles,invalidStyles,schemaItems;var whiteSpaceElementsMap,selfClosingElementsMap,shortEndedElementsMap,boolAttrMap,validClasses;var blockElementsMap,nonEmptyElementsMap,moveCaretBeforeOnEnterElementsMap,textBlockElementsMap,textInlineElementsMap;var customElementsMap={},specialElements={};function createLookupTable(option,default_value,extendWith){var value=settings[option];if(!value){value=mapCache[option];if(!value){value=makeMap(default_value,' ',makeMap(default_value.toUpperCase(),' '));value=extend(value,extendWith);mapCache[option]=value;}}else{value=makeMap(value,/[, ]/,makeMap(value.toUpperCase(),/[, ]/));}
return value;}
settings=settings||{};schemaItems=compileSchema(settings.schema);if(settings.verify_html===false){settings.valid_elements='*[*]';}
validStyles=compileElementMap(settings.valid_styles);invalidStyles=compileElementMap(settings.invalid_styles,'map');validClasses=compileElementMap(settings.valid_classes,'map');whiteSpaceElementsMap=createLookupTable('whitespace_elements','pre script noscript style textarea video audio iframe object');selfClosingElementsMap=createLookupTable('self_closing_elements','colgroup dd dt li option p td tfoot th thead tr');shortEndedElementsMap=createLookupTable('short_ended_elements','area base basefont br col frame hr img input isindex link '+
'meta param embed source wbr track');boolAttrMap=createLookupTable('boolean_attributes','checked compact declare defer disabled ismap multiple nohref noresize '+
'noshade nowrap readonly selected autoplay loop controls');nonEmptyElementsMap=createLookupTable('non_empty_elements','td th iframe video audio object script',shortEndedElementsMap);moveCaretBeforeOnEnterElementsMap=createLookupTable('move_caret_before_on_enter_elements','table',nonEmptyElementsMap);textBlockElementsMap=createLookupTable('text_block_elements','h1 h2 h3 h4 h5 h6 p div address pre form '+
'blockquote center dir fieldset header footer article section hgroup aside nav figure');blockElementsMap=createLookupTable('block_elements','hr table tbody thead tfoot '+
'th tr td li ol ul caption dl dt dd noscript menu isindex option '+
'datalist select optgroup figcaption',textBlockElementsMap);textInlineElementsMap=createLookupTable('text_inline_elements','span strong b em i font strike u var cite '+
'dfn code mark q sup sub samp');each((settings.special||'script noscript style textarea').split(' '),function(name){specialElements[name]=new RegExp('<\/'+name+'[^>]*>','gi');});function patternToRegExp(str){return new RegExp('^'+str.replace(/([?+*])/g,'.$1')+'$');}
function addValidElements(validElements){var ei,el,ai,al,matches,element,attr,attrData,elementName,attrName,attrType,attributes,attributesOrder,prefix,outputName,globalAttributes,globalAttributesOrder,key,value,elementRuleRegExp=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,attrRuleRegExp=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,hasPatternsRegExp=/[*?+]/;if(validElements){validElements=split(validElements,',');if(elements['@']){globalAttributes=elements['@'].attributes;globalAttributesOrder=elements['@'].attributesOrder;}
for(ei=0,el=validElements.length;ei<el;ei++){matches=elementRuleRegExp.exec(validElements[ei]);if(matches){prefix=matches[1];elementName=matches[2];outputName=matches[3];attrData=matches[5];attributes={};attributesOrder=[];element={attributes:attributes,attributesOrder:attributesOrder};if(prefix==='#'){element.paddEmpty=true;}
if(prefix==='-'){element.removeEmpty=true;}
if(matches[4]==='!'){element.removeEmptyAttrs=true;}
if(globalAttributes){for(key in globalAttributes){attributes[key]=globalAttributes[key];}
attributesOrder.push.apply(attributesOrder,globalAttributesOrder);}
if(attrData){attrData=split(attrData,'|');for(ai=0,al=attrData.length;ai<al;ai++){matches=attrRuleRegExp.exec(attrData[ai]);if(matches){attr={};attrType=matches[1];attrName=matches[2].replace(/::/g,':');prefix=matches[3];value=matches[4];if(attrType==='!'){element.attributesRequired=element.attributesRequired||[];element.attributesRequired.push(attrName);attr.required=true;}
if(attrType==='-'){delete attributes[attrName];attributesOrder.splice(inArray(attributesOrder,attrName),1);continue;}
if(prefix){if(prefix==='='){element.attributesDefault=element.attributesDefault||[];element.attributesDefault.push({name:attrName,value:value});attr.defaultValue=value;}
if(prefix===':'){element.attributesForced=element.attributesForced||[];element.attributesForced.push({name:attrName,value:value});attr.forcedValue=value;}
if(prefix==='<'){attr.validValues=makeMap(value,'?');}}
if(hasPatternsRegExp.test(attrName)){element.attributePatterns=element.attributePatterns||[];attr.pattern=patternToRegExp(attrName);element.attributePatterns.push(attr);}else{if(!attributes[attrName]){attributesOrder.push(attrName);}
attributes[attrName]=attr;}}}}
if(!globalAttributes&&elementName=='@'){globalAttributes=attributes;globalAttributesOrder=attributesOrder;}
if(outputName){element.outputName=elementName;elements[outputName]=element;}
if(hasPatternsRegExp.test(elementName)){element.pattern=patternToRegExp(elementName);patternElements.push(element);}else{elements[elementName]=element;}}}}}
function setValidElements(validElements){elements={};patternElements=[];addValidElements(validElements);each(schemaItems,function(element,name){children[name]=element.children;});}
function addCustomElements(customElements){var customElementRegExp=/^(~)?(.+)$/;if(customElements){mapCache.text_block_elements=mapCache.block_elements=null;each(split(customElements,','),function(rule){var matches=customElementRegExp.exec(rule),inline=matches[1]==='~',cloneName=inline?'span':'div',name=matches[2];children[name]=children[cloneName];customElementsMap[name]=cloneName;if(!inline){blockElementsMap[name.toUpperCase()]={};blockElementsMap[name]={};}
if(!elements[name]){var customRule=elements[cloneName];customRule=extend({},customRule);delete customRule.removeEmptyAttrs;delete customRule.removeEmpty;elements[name]=customRule;}
each(children,function(element,elmName){if(element[cloneName]){children[elmName]=element=extend({},children[elmName]);element[name]=element[cloneName];}});});}}
function addValidChildren(validChildren){var childRuleRegExp=/^([+\-]?)(\w+)\[([^\]]+)\]$/;mapCache[settings.schema]=null;if(validChildren){each(split(validChildren,','),function(rule){var matches=childRuleRegExp.exec(rule),parent,prefix;if(matches){prefix=matches[1];if(prefix){parent=children[matches[2]];}else{parent=children[matches[2]]={'#comment':{}};}
parent=children[matches[2]];each(split(matches[3],'|'),function(child){if(prefix==='-'){delete parent[child];}else{parent[child]={};}});}});}}
function getElementRule(name){var element=elements[name],i;if(element){return element;}
i=patternElements.length;while(i--){element=patternElements[i];if(element.pattern.test(name)){return element;}}}
if(!settings.valid_elements){each(schemaItems,function(element,name){elements[name]={attributes:element.attributes,attributesOrder:element.attributesOrder};children[name]=element.children;});if(settings.schema!="html5"){each(split('strong/b em/i'),function(item){item=split(item,'/');elements[item[1]].outputName=item[0];});}
each(split('ol ul sub sup blockquote span font a table tbody tr strong em b i'),function(name){if(elements[name]){elements[name].removeEmpty=true;}});each(split('p h1 h2 h3 h4 h5 h6 th td pre div address caption'),function(name){elements[name].paddEmpty=true;});each(split('span'),function(name){elements[name].removeEmptyAttrs=true;});}else{setValidElements(settings.valid_elements);}
addCustomElements(settings.custom_elements);addValidChildren(settings.valid_children);addValidElements(settings.extended_valid_elements);addValidChildren('+ol[ul|ol],+ul[ul|ol]');if(settings.invalid_elements){each(explode(settings.invalid_elements),function(item){if(elements[item]){delete elements[item];}});}
if(!getElementRule('span')){addValidElements('span[!data-mce-type|*]');}
self.children=children;self.getValidStyles=function(){return validStyles;};self.getInvalidStyles=function(){return invalidStyles;};self.getValidClasses=function(){return validClasses;};self.getBoolAttrs=function(){return boolAttrMap;};self.getBlockElements=function(){return blockElementsMap;};self.getTextBlockElements=function(){return textBlockElementsMap;};self.getTextInlineElements=function(){return textInlineElementsMap;};self.getShortEndedElements=function(){return shortEndedElementsMap;};self.getSelfClosingElements=function(){return selfClosingElementsMap;};self.getNonEmptyElements=function(){return nonEmptyElementsMap;};self.getMoveCaretBeforeOnEnterElements=function(){return moveCaretBeforeOnEnterElementsMap;};self.getWhiteSpaceElements=function(){return whiteSpaceElementsMap;};self.getSpecialElements=function(){return specialElements;};self.isValidChild=function(name,child){var parent=children[name];return!!(parent&&parent[child]);};self.isValid=function(name,attr){var attrPatterns,i,rule=getElementRule(name);if(rule){if(attr){if(rule.attributes[attr]){return true;}
attrPatterns=rule.attributePatterns;if(attrPatterns){i=attrPatterns.length;while(i--){if(attrPatterns[i].pattern.test(name)){return true;}}}}else{return true;}}
return false;};self.getElementRule=getElementRule;self.getCustomElements=function(){return customElementsMap;};self.addValidElements=addValidElements;self.setValidElements=setValidElements;self.addCustomElements=addCustomElements;self.addValidChildren=addValidChildren;self.elements=elements;};});define("tinymce/html/SaxParser",["tinymce/html/Schema","tinymce/html/Entities","tinymce/util/Tools"],function(Schema,Entities,Tools){var each=Tools.each;function findEndTag(schema,html,startIndex){var count=1,index,matches,tokenRegExp,shortEndedElements;shortEndedElements=schema.getShortEndedElements();tokenRegExp=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g;tokenRegExp.lastIndex=index=startIndex;while((matches=tokenRegExp.exec(html))){index=tokenRegExp.lastIndex;if(matches[1]==='/'){count--;}else if(!matches[1]){if(matches[2]in shortEndedElements){continue;}
count++;}
if(count===0){break;}}
return index;}
function SaxParser(settings,schema){var self=this;function noop(){}
settings=settings||{};self.schema=schema=schema||new Schema();if(settings.fix_self_closing!==false){settings.fix_self_closing=true;}
each('comment cdata text start end pi doctype'.split(' '),function(name){if(name){self[name]=settings[name]||noop;}});self.parse=function(html){var self=this,matches,index=0,value,endRegExp,stack=[],attrList,i,text,name;var isInternalElement,removeInternalElements,shortEndedElements,fillAttrsMap,isShortEnded;var validate,elementRule,isValidElement,attr,attribsValue,validAttributesMap,validAttributePatterns;var attributesRequired,attributesDefault,attributesForced;var anyAttributesRequired,selfClosing,tokenRegExp,attrRegExp,specialElements,attrValue,idCount=0;var decode=Entities.decode,fixSelfClosing,filteredUrlAttrs=Tools.makeMap('src,href,data,background,formaction,poster');var scriptUriRegExp=/((java|vb)script|mhtml):/i,dataUriRegExp=/^data:/i;function processEndTag(name){var pos,i;pos=stack.length;while(pos--){if(stack[pos].name===name){break;}}
if(pos>=0){for(i=stack.length-1;i>=pos;i--){name=stack[i];if(name.valid){self.end(name.name);}}
stack.length=pos;}}
function parseAttribute(match,name,value,val2,val3){var attrRule,i,trimRegExp=/[\s\u0000-\u001F]+/g;name=name.toLowerCase();value=name in fillAttrsMap?name:decode(value||val2||val3||'');if(validate&&!isInternalElement&&name.indexOf('data-')!==0){attrRule=validAttributesMap[name];if(!attrRule&&validAttributePatterns){i=validAttributePatterns.length;while(i--){attrRule=validAttributePatterns[i];if(attrRule.pattern.test(name)){break;}}
if(i===-1){attrRule=null;}}
if(!attrRule){return;}
if(attrRule.validValues&&!(value in attrRule.validValues)){return;}}
if(filteredUrlAttrs[name]&&!settings.allow_script_urls){var uri=value.replace(trimRegExp,'');try{uri=decodeURIComponent(uri);}catch(ex){uri=unescape(uri);}
if(scriptUriRegExp.test(uri)){return;}
if(!settings.allow_html_data_urls&&dataUriRegExp.test(uri)&&!/^data:image\//i.test(uri)){return;}}
attrList.map[name]=value;attrList.push({name:name,value:value});}
tokenRegExp=new RegExp('<(?:'+
'(?:!--([\\w\\W]*?)-->)|'+
'(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|'+
'(?:!DOCTYPE([\\w\\W]*?)>)|'+
'(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|'+
'(?:\\/([^>]+)>)|'+
'(?:([A-Za-z0-9\\-_\\:\\.]+)((?:\\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\\/|\\s+)>)'+
')','g');attrRegExp=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g;shortEndedElements=schema.getShortEndedElements();selfClosing=settings.self_closing_elements||schema.getSelfClosingElements();fillAttrsMap=schema.getBoolAttrs();validate=settings.validate;removeInternalElements=settings.remove_internals;fixSelfClosing=settings.fix_self_closing;specialElements=schema.getSpecialElements();while((matches=tokenRegExp.exec(html))){if(index<matches.index){self.text(decode(html.substr(index,matches.index-index)));}
if((value=matches[6])){value=value.toLowerCase();if(value.charAt(0)===':'){value=value.substr(1);}
processEndTag(value);}else if((value=matches[7])){value=value.toLowerCase();if(value.charAt(0)===':'){value=value.substr(1);}
isShortEnded=value in shortEndedElements;if(fixSelfClosing&&selfClosing[value]&&stack.length>0&&stack[stack.length-1].name===value){processEndTag(value);}
if(!validate||(elementRule=schema.getElementRule(value))){isValidElement=true;if(validate){validAttributesMap=elementRule.attributes;validAttributePatterns=elementRule.attributePatterns;}
if((attribsValue=matches[8])){isInternalElement=attribsValue.indexOf('data-mce-type')!==-1;if(isInternalElement&&removeInternalElements){isValidElement=false;}
attrList=[];attrList.map={};attribsValue.replace(attrRegExp,parseAttribute);}else{attrList=[];attrList.map={};}
if(validate&&!isInternalElement){attributesRequired=elementRule.attributesRequired;attributesDefault=elementRule.attributesDefault;attributesForced=elementRule.attributesForced;anyAttributesRequired=elementRule.removeEmptyAttrs;if(anyAttributesRequired&&!attrList.length){isValidElement=false;}
if(attributesForced){i=attributesForced.length;while(i--){attr=attributesForced[i];name=attr.name;attrValue=attr.value;if(attrValue==='{$uid}'){attrValue='mce_'+idCount++;}
attrList.map[name]=attrValue;attrList.push({name:name,value:attrValue});}}
if(attributesDefault){i=attributesDefault.length;while(i--){attr=attributesDefault[i];name=attr.name;if(!(name in attrList.map)){attrValue=attr.value;if(attrValue==='{$uid}'){attrValue='mce_'+idCount++;}
attrList.map[name]=attrValue;attrList.push({name:name,value:attrValue});}}}
if(attributesRequired){i=attributesRequired.length;while(i--){if(attributesRequired[i]in attrList.map){break;}}
if(i===-1){isValidElement=false;}}
if((attr=attrList.map['data-mce-bogus'])){if(attr==='all'){index=findEndTag(schema,html,tokenRegExp.lastIndex);tokenRegExp.lastIndex=index;continue;}
isValidElement=false;}}
if(isValidElement){self.start(value,attrList,isShortEnded);}}else{isValidElement=false;}
if((endRegExp=specialElements[value])){endRegExp.lastIndex=index=matches.index+matches[0].length;if((matches=endRegExp.exec(html))){if(isValidElement){text=html.substr(index,matches.index-index);}
index=matches.index+matches[0].length;}else{text=html.substr(index);index=html.length;}
if(isValidElement){if(text.length>0){self.text(text,true);}
self.end(value);}
tokenRegExp.lastIndex=index;continue;}
if(!isShortEnded){if(!attribsValue||attribsValue.indexOf('/')!=attribsValue.length-1){stack.push({name:value,valid:isValidElement});}else if(isValidElement){self.end(value);}}}else if((value=matches[1])){if(value.charAt(0)==='>'){value=' '+value;}
if(!settings.allow_conditional_comments&&value.substr(0,3)==='[if'){value=' '+value;}
self.comment(value);}else if((value=matches[2])){self.cdata(value);}else if((value=matches[3])){self.doctype(value);}else if((value=matches[4])){self.pi(value,matches[5]);}
index=matches.index+matches[0].length;}
if(index<html.length){self.text(decode(html.substr(index)));}
for(i=stack.length-1;i>=0;i--){value=stack[i];if(value.valid){self.end(value.name);}}};}
SaxParser.findEndTag=findEndTag;return SaxParser;});define("tinymce/html/DomParser",["tinymce/html/Node","tinymce/html/Schema","tinymce/html/SaxParser","tinymce/util/Tools"],function(Node,Schema,SaxParser,Tools){var makeMap=Tools.makeMap,each=Tools.each,explode=Tools.explode,extend=Tools.extend;return function(settings,schema){var self=this,nodeFilters={},attributeFilters=[],matchedNodes={},matchedAttributes={};settings=settings||{};settings.validate="validate"in settings?settings.validate:true;settings.root_name=settings.root_name||'body';self.schema=schema=schema||new Schema();function fixInvalidChildren(nodes){var ni,node,parent,parents,newParent,currentNode,tempNode,childNode,i;var nonEmptyElements,nonSplitableElements,textBlockElements,specialElements,sibling,nextNode;nonSplitableElements=makeMap('tr,td,th,tbody,thead,tfoot,table');nonEmptyElements=schema.getNonEmptyElements();textBlockElements=schema.getTextBlockElements();specialElements=schema.getSpecialElements();for(ni=0;ni<nodes.length;ni++){node=nodes[ni];if(!node.parent||node.fixed){continue;}
if(textBlockElements[node.name]&&node.parent.name=='li'){sibling=node.next;while(sibling){if(textBlockElements[sibling.name]){sibling.name='li';sibling.fixed=true;node.parent.insert(sibling,node.parent);}else{break;}
sibling=sibling.next;}
node.unwrap(node);continue;}
parents=[node];for(parent=node.parent;parent&&!schema.isValidChild(parent.name,node.name)&&!nonSplitableElements[parent.name];parent=parent.parent){parents.push(parent);}
if(parent&&parents.length>1){parents.reverse();newParent=currentNode=self.filterNode(parents[0].clone());for(i=0;i<parents.length-1;i++){if(schema.isValidChild(currentNode.name,parents[i].name)){tempNode=self.filterNode(parents[i].clone());currentNode.append(tempNode);}else{tempNode=currentNode;}
for(childNode=parents[i].firstChild;childNode&&childNode!=parents[i+1];){nextNode=childNode.next;tempNode.append(childNode);childNode=nextNode;}
currentNode=tempNode;}
if(!newParent.isEmpty(nonEmptyElements)){parent.insert(newParent,parents[0],true);parent.insert(node,newParent);}else{parent.insert(node,parents[0],true);}
parent=parents[0];if(parent.isEmpty(nonEmptyElements)||parent.firstChild===parent.lastChild&&parent.firstChild.name==='br'){parent.empty().remove();}}else if(node.parent){if(node.name==='li'){sibling=node.prev;if(sibling&&(sibling.name==='ul'||sibling.name==='ul')){sibling.append(node);continue;}
sibling=node.next;if(sibling&&(sibling.name==='ul'||sibling.name==='ul')){sibling.insert(node,sibling.firstChild,true);continue;}
node.wrap(self.filterNode(new Node('ul',1)));continue;}
if(schema.isValidChild(node.parent.name,'div')&&schema.isValidChild('div',node.name)){node.wrap(self.filterNode(new Node('div',1)));}else{if(specialElements[node.name]){node.empty().remove();}else{node.unwrap();}}}}}
self.filterNode=function(node){var i,name,list;if(name in nodeFilters){list=matchedNodes[name];if(list){list.push(node);}else{matchedNodes[name]=[node];}}
i=attributeFilters.length;while(i--){name=attributeFilters[i].name;if(name in node.attributes.map){list=matchedAttributes[name];if(list){list.push(node);}else{matchedAttributes[name]=[node];}}}
return node;};self.addNodeFilter=function(name,callback){each(explode(name),function(name){var list=nodeFilters[name];if(!list){nodeFilters[name]=list=[];}
list.push(callback);});};self.addAttributeFilter=function(name,callback){each(explode(name),function(name){var i;for(i=0;i<attributeFilters.length;i++){if(attributeFilters[i].name===name){attributeFilters[i].callbacks.push(callback);return;}}
attributeFilters.push({name:name,callbacks:[callback]});});};self.parse=function(html,args){var parser,rootNode,node,nodes,i,l,fi,fl,list,name,validate;var blockElements,startWhiteSpaceRegExp,invalidChildren=[],isInWhiteSpacePreservedElement;var endWhiteSpaceRegExp,allWhiteSpaceRegExp,isAllWhiteSpaceRegExp,whiteSpaceElements;var children,nonEmptyElements,rootBlockName;args=args||{};matchedNodes={};matchedAttributes={};blockElements=extend(makeMap('script,style,head,html,body,title,meta,param'),schema.getBlockElements());nonEmptyElements=schema.getNonEmptyElements();children=schema.children;validate=settings.validate;rootBlockName="forced_root_block"in args?args.forced_root_block:settings.forced_root_block;whiteSpaceElements=schema.getWhiteSpaceElements();startWhiteSpaceRegExp=/^[ \t\r\n]+/;endWhiteSpaceRegExp=/[ \t\r\n]+$/;allWhiteSpaceRegExp=/[ \t\r\n]+/g;isAllWhiteSpaceRegExp=/^[ \t\r\n]+$/;function addRootBlocks(){var node=rootNode.firstChild,next,rootBlockNode;function trim(rootBlockNode){if(rootBlockNode){node=rootBlockNode.firstChild;if(node&&node.type==3){node.value=node.value.replace(startWhiteSpaceRegExp,'');}
node=rootBlockNode.lastChild;if(node&&node.type==3){node.value=node.value.replace(endWhiteSpaceRegExp,'');}}}
if(!schema.isValidChild(rootNode.name,rootBlockName.toLowerCase())){return;}
while(node){next=node.next;if(node.type==3||(node.type==1&&node.name!=='p'&&!blockElements[node.name]&&!node.attr('data-mce-type'))){if(!rootBlockNode){rootBlockNode=createNode(rootBlockName,1);rootBlockNode.attr(settings.forced_root_block_attrs);rootNode.insert(rootBlockNode,node);rootBlockNode.append(node);}else{rootBlockNode.append(node);}}else{trim(rootBlockNode);rootBlockNode=null;}
node=next;}
trim(rootBlockNode);}
function createNode(name,type){var node=new Node(name,type),list;if(name in nodeFilters){list=matchedNodes[name];if(list){list.push(node);}else{matchedNodes[name]=[node];}}
return node;}
function removeWhitespaceBefore(node){var textNode,textNodeNext,textVal,sibling,blockElements=schema.getBlockElements();for(textNode=node.prev;textNode&&textNode.type===3;){textVal=textNode.value.replace(endWhiteSpaceRegExp,'');if(textVal.length>0){textNode.value=textVal;return;}
textNodeNext=textNode.next;if(textNodeNext){if(textNodeNext.type==3&&textNodeNext.value.length){textNode=textNode.prev;continue;}
if(!blockElements[textNodeNext.name]&&textNodeNext.name!='script'&&textNodeNext.name!='style'){textNode=textNode.prev;continue;}}
sibling=textNode.prev;textNode.remove();textNode=sibling;}}
function cloneAndExcludeBlocks(input){var name,output={};for(name in input){if(name!=='li'&&name!='p'){output[name]=input[name];}}
return output;}
parser=new SaxParser({validate:validate,allow_script_urls:settings.allow_script_urls,allow_conditional_comments:settings.allow_conditional_comments,self_closing_elements:cloneAndExcludeBlocks(schema.getSelfClosingElements()),cdata:function(text){node.append(createNode('#cdata',4)).value=text;},text:function(text,raw){var textNode;if(!isInWhiteSpacePreservedElement){text=text.replace(allWhiteSpaceRegExp,' ');if(node.lastChild&&blockElements[node.lastChild.name]){text=text.replace(startWhiteSpaceRegExp,'');}}
if(text.length!==0){textNode=createNode('#text',3);textNode.raw=!!raw;node.append(textNode).value=text;}},comment:function(text){node.append(createNode('#comment',8)).value=text;},pi:function(name,text){node.append(createNode(name,7)).value=text;removeWhitespaceBefore(node);},doctype:function(text){var newNode;newNode=node.append(createNode('#doctype',10));newNode.value=text;removeWhitespaceBefore(node);},start:function(name,attrs,empty){var newNode,attrFiltersLen,elementRule,attrName,parent;elementRule=validate?schema.getElementRule(name):{};if(elementRule){newNode=createNode(elementRule.outputName||name,1);newNode.attributes=attrs;newNode.shortEnded=empty;node.append(newNode);parent=children[node.name];if(parent&&children[newNode.name]&&!parent[newNode.name]){invalidChildren.push(newNode);}
attrFiltersLen=attributeFilters.length;while(attrFiltersLen--){attrName=attributeFilters[attrFiltersLen].name;if(attrName in attrs.map){list=matchedAttributes[attrName];if(list){list.push(newNode);}else{matchedAttributes[attrName]=[newNode];}}}
if(blockElements[name]){removeWhitespaceBefore(newNode);}
if(!empty){node=newNode;}
if(!isInWhiteSpacePreservedElement&&whiteSpaceElements[name]){isInWhiteSpacePreservedElement=true;}}},end:function(name){var textNode,elementRule,text,sibling,tempNode;elementRule=validate?schema.getElementRule(name):{};if(elementRule){if(blockElements[name]){if(!isInWhiteSpacePreservedElement){textNode=node.firstChild;if(textNode&&textNode.type===3){text=textNode.value.replace(startWhiteSpaceRegExp,'');if(text.length>0){textNode.value=text;textNode=textNode.next;}else{sibling=textNode.next;textNode.remove();textNode=sibling;while(textNode&&textNode.type===3){text=textNode.value;sibling=textNode.next;if(text.length===0||isAllWhiteSpaceRegExp.test(text)){textNode.remove();textNode=sibling;}
textNode=sibling;}}}
textNode=node.lastChild;if(textNode&&textNode.type===3){text=textNode.value.replace(endWhiteSpaceRegExp,'');if(text.length>0){textNode.value=text;textNode=textNode.prev;}else{sibling=textNode.prev;textNode.remove();textNode=sibling;while(textNode&&textNode.type===3){text=textNode.value;sibling=textNode.prev;if(text.length===0||isAllWhiteSpaceRegExp.test(text)){textNode.remove();textNode=sibling;}
textNode=sibling;}}}}}
if(isInWhiteSpacePreservedElement&&whiteSpaceElements[name]){isInWhiteSpacePreservedElement=false;}
if(elementRule.removeEmpty||elementRule.paddEmpty){if(node.isEmpty(nonEmptyElements)){if(elementRule.paddEmpty){node.empty().append(new Node('#text','3')).value='\u00a0';}else{if(!node.attributes.map.name&&!node.attributes.map.id){tempNode=node.parent;if(blockElements[node.name]){node.empty().remove();}else{node.unwrap();}
node=tempNode;return;}}}}
node=node.parent;}}},schema);rootNode=node=new Node(args.context||settings.root_name,11);parser.parse(html);if(validate&&invalidChildren.length){if(!args.context){fixInvalidChildren(invalidChildren);}else{args.invalid=true;}}
if(rootBlockName&&(rootNode.name=='body'||args.isRootContent)){addRootBlocks();}
if(!args.invalid){for(name in matchedNodes){list=nodeFilters[name];nodes=matchedNodes[name];fi=nodes.length;while(fi--){if(!nodes[fi].parent){nodes.splice(fi,1);}}
for(i=0,l=list.length;i<l;i++){list[i](nodes,name,args);}}
for(i=0,l=attributeFilters.length;i<l;i++){list=attributeFilters[i];if(list.name in matchedAttributes){nodes=matchedAttributes[list.name];fi=nodes.length;while(fi--){if(!nodes[fi].parent){nodes.splice(fi,1);}}
for(fi=0,fl=list.callbacks.length;fi<fl;fi++){list.callbacks[fi](nodes,list.name,args);}}}}
return rootNode;};if(settings.remove_trailing_brs){self.addNodeFilter('br',function(nodes){var i,l=nodes.length,node,blockElements=extend({},schema.getBlockElements());var nonEmptyElements=schema.getNonEmptyElements(),parent,lastParent,prev,prevName;var elementRule,textNode;blockElements.body=1;for(i=0;i<l;i++){node=nodes[i];parent=node.parent;if(blockElements[node.parent.name]&&node===parent.lastChild){prev=node.prev;while(prev){prevName=prev.name;if(prevName!=="span"||prev.attr('data-mce-type')!=='bookmark'){if(prevName!=="br"){break;}
if(prevName==='br'){node=null;break;}}
prev=prev.prev;}
if(node){node.remove();if(parent.isEmpty(nonEmptyElements)){elementRule=schema.getElementRule(parent.name);if(elementRule){if(elementRule.removeEmpty){parent.remove();}else if(elementRule.paddEmpty){parent.empty().append(new Node('#text',3)).value='\u00a0';}}}}}else{lastParent=node;while(parent&&parent.firstChild===lastParent&&parent.lastChild===lastParent){lastParent=parent;if(blockElements[parent.name]){break;}
parent=parent.parent;}
if(lastParent===parent){textNode=new Node('#text',3);textNode.value='\u00a0';node.replace(textNode);}}}});}
if(!settings.allow_html_in_named_anchor){self.addAttributeFilter('id,name',function(nodes){var i=nodes.length,sibling,prevSibling,parent,node;while(i--){node=nodes[i];if(node.name==='a'&&node.firstChild&&!node.attr('href')){parent=node.parent;sibling=node.lastChild;do{prevSibling=sibling.prev;parent.insert(sibling,node);sibling=prevSibling;}while(sibling);}}});}
if(settings.validate&&schema.getValidClasses()){self.addAttributeFilter('class',function(nodes){var i=nodes.length,node,classList,ci,className,classValue;var validClasses=schema.getValidClasses(),validClassesMap,valid;while(i--){node=nodes[i];classList=node.attr('class').split(' ');classValue='';for(ci=0;ci<classList.length;ci++){className=classList[ci];valid=false;validClassesMap=validClasses['*'];if(validClassesMap&&validClassesMap[className]){valid=true;}
validClassesMap=validClasses[node.name];if(!valid&&validClassesMap&&validClassesMap[className]){valid=true;}
if(valid){if(classValue){classValue+=' ';}
classValue+=className;}}
if(!classValue.length){classValue=null;}
node.attr('class',classValue);}});}};});define("tinymce/html/Writer",["tinymce/html/Entities","tinymce/util/Tools"],function(Entities,Tools){var makeMap=Tools.makeMap;return function(settings){var html=[],indent,indentBefore,indentAfter,encode,htmlOutput;settings=settings||{};indent=settings.indent;indentBefore=makeMap(settings.indent_before||'');indentAfter=makeMap(settings.indent_after||'');encode=Entities.getEncodeFunc(settings.entity_encoding||'raw',settings.entities);htmlOutput=settings.element_format=="html";return{start:function(name,attrs,empty){var i,l,attr,value;if(indent&&indentBefore[name]&&html.length>0){value=html[html.length-1];if(value.length>0&&value!=='\n'){html.push('\n');}}
html.push('<',name);if(attrs){for(i=0,l=attrs.length;i<l;i++){attr=attrs[i];html.push(' ',attr.name,'="',encode(attr.value,true),'"');}}
if(!empty||htmlOutput){html[html.length]='>';}else{html[html.length]=' />';}
if(empty&&indent&&indentAfter[name]&&html.length>0){value=html[html.length-1];if(value.length>0&&value!=='\n'){html.push('\n');}}},end:function(name){var value;html.push('</',name,'>');if(indent&&indentAfter[name]&&html.length>0){value=html[html.length-1];if(value.length>0&&value!=='\n'){html.push('\n');}}},text:function(text,raw){if(text.length>0){html[html.length]=raw?text:encode(text);}},cdata:function(text){html.push('<![CDATA[',text,']]>');},comment:function(text){html.push('<!--',text,'-->');},pi:function(name,text){if(text){html.push('<?',name,' ',encode(text),'?>');}else{html.push('<?',name,'?>');}
if(indent){html.push('\n');}},doctype:function(text){html.push('<!DOCTYPE',text,'>',indent?'\n':'');},reset:function(){html.length=0;},getContent:function(){return html.join('').replace(/\n$/,'');}};};});define("tinymce/html/Serializer",["tinymce/html/Writer","tinymce/html/Schema"],function(Writer,Schema){return function(settings,schema){var self=this,writer=new Writer(settings);settings=settings||{};settings.validate="validate"in settings?settings.validate:true;self.schema=schema=schema||new Schema();self.writer=writer;self.serialize=function(node){var handlers,validate;validate=settings.validate;handlers={3:function(node){writer.text(node.value,node.raw);},8:function(node){writer.comment(node.value);},7:function(node){writer.pi(node.name,node.value);},10:function(node){writer.doctype(node.value);},4:function(node){writer.cdata(node.value);},11:function(node){if((node=node.firstChild)){do{walk(node);}while((node=node.next));}}};writer.reset();function walk(node){var handler=handlers[node.type],name,isEmpty,attrs,attrName,attrValue,sortedAttrs,i,l,elementRule;if(!handler){name=node.name;isEmpty=node.shortEnded;attrs=node.attributes;if(validate&&attrs&&attrs.length>1){sortedAttrs=[];sortedAttrs.map={};elementRule=schema.getElementRule(node.name);if(elementRule){for(i=0,l=elementRule.attributesOrder.length;i<l;i++){attrName=elementRule.attributesOrder[i];if(attrName in attrs.map){attrValue=attrs.map[attrName];sortedAttrs.map[attrName]=attrValue;sortedAttrs.push({name:attrName,value:attrValue});}}
for(i=0,l=attrs.length;i<l;i++){attrName=attrs[i].name;if(!(attrName in sortedAttrs.map)){attrValue=attrs.map[attrName];sortedAttrs.map[attrName]=attrValue;sortedAttrs.push({name:attrName,value:attrValue});}}
attrs=sortedAttrs;}}
writer.start(node.name,attrs,isEmpty);if(!isEmpty){if((node=node.firstChild)){do{walk(node);}while((node=node.next));}
writer.end(name);}}else{handler(node);}}
if(node.type==1&&!settings.inner){walk(node);}else{handlers[11](node);}
return writer.getContent();};};});define("tinymce/dom/Serializer",["tinymce/dom/DOMUtils","tinymce/html/DomParser","tinymce/html/SaxParser","tinymce/html/Entities","tinymce/html/Serializer","tinymce/html/Node","tinymce/html/Schema","tinymce/Env","tinymce/util/Tools","tinymce/text/Zwsp"],function(DOMUtils,DomParser,SaxParser,Entities,Serializer,Node,Schema,Env,Tools,Zwsp){var each=Tools.each,trim=Tools.trim;var DOM=DOMUtils.DOM,tempAttrs=["data-mce-selected"];function trimTrailingBr(rootNode){var brNode1,brNode2;function isBr(node){return node&&node.name==='br';}
brNode1=rootNode.lastChild;if(isBr(brNode1)){brNode2=brNode1.prev;if(isBr(brNode2)){brNode1.remove();brNode2.remove();}}}
return function(settings,editor){var dom,schema,htmlParser;if(editor){dom=editor.dom;schema=editor.schema;}
function trimHtml(html){var trimContentRegExp=new RegExp(['<span[^>]+data-mce-bogus[^>]+>[\u200B\uFEFF]+<\\/span>','\\s?('+tempAttrs.join('|')+')="[^"]+"'].join('|'),'gi');html=Zwsp.trim(html.replace(trimContentRegExp,''));return html;}
function getTrimmedContent(){var content=editor.getBody().innerHTML;var bogusAllRegExp=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g;var endTagIndex,index,matchLength,matches,shortEndedElements,schema=editor.schema;content=trimHtml(content);shortEndedElements=schema.getShortEndedElements();while((matches=bogusAllRegExp.exec(content))){index=bogusAllRegExp.lastIndex;matchLength=matches[0].length;if(shortEndedElements[matches[1]]){endTagIndex=index;}else{endTagIndex=SaxParser.findEndTag(schema,content,index);}
content=content.substring(0,index-matchLength)+content.substring(endTagIndex);bogusAllRegExp.lastIndex=index-matchLength;}
return trim(content);}
function addTempAttr(name){if(Tools.inArray(tempAttrs,name)===-1){htmlParser.addAttributeFilter(name,function(nodes,name){var i=nodes.length;while(i--){nodes[i].attr(name,null);}});tempAttrs.push(name);}}
dom=dom||DOM;schema=schema||new Schema(settings);settings.entity_encoding=settings.entity_encoding||'named';settings.remove_trailing_brs="remove_trailing_brs"in settings?settings.remove_trailing_brs:true;htmlParser=new DomParser(settings,schema);htmlParser.addAttributeFilter('data-mce-tabindex',function(nodes,name){var i=nodes.length,node;while(i--){node=nodes[i];node.attr('tabindex',node.attributes.map['data-mce-tabindex']);node.attr(name,null);}});htmlParser.addAttributeFilter('src,href,style',function(nodes,name){var i=nodes.length,node,value,internalName='data-mce-'+name;var urlConverter=settings.url_converter,urlConverterScope=settings.url_converter_scope,undef;while(i--){node=nodes[i];value=node.attributes.map[internalName];if(value!==undef){node.attr(name,value.length>0?value:null);node.attr(internalName,null);}else{value=node.attributes.map[name];if(name==="style"){value=dom.serializeStyle(dom.parseStyle(value),node.name);}else if(urlConverter){value=urlConverter.call(urlConverterScope,value,name,node.name);}
node.attr(name,value.length>0?value:null);}}});htmlParser.addAttributeFilter('class',function(nodes){var i=nodes.length,node,value;while(i--){node=nodes[i];value=node.attr('class');if(value){value=node.attr('class').replace(/(?:^|\s)mce-item-\w+(?!\S)/g,'');node.attr('class',value.length>0?value:null);}}});htmlParser.addAttributeFilter('data-mce-type',function(nodes,name,args){var i=nodes.length,node;while(i--){node=nodes[i];if(node.attributes.map['data-mce-type']==='bookmark'&&!args.cleanup){node.remove();}}});htmlParser.addNodeFilter('noscript',function(nodes){var i=nodes.length,node;while(i--){node=nodes[i].firstChild;if(node){node.value=Entities.decode(node.value);}}});htmlParser.addNodeFilter('script,style',function(nodes,name){var i=nodes.length,node,value,type;function trim(value){return value.replace(/(<!--\[CDATA\[|\]\]-->)/g,'\n').replace(/^[\r\n]*|[\r\n]*$/g,'').replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,'').replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,'');}
while(i--){node=nodes[i];value=node.firstChild?node.firstChild.value:'';if(name==="script"){type=node.attr('type');if(type){node.attr('type',type=='mce-no/type'?null:type.replace(/^mce\-/,''));}
if(value.length>0){node.firstChild.value='// <![CDATA[\n'+trim(value)+'\n// ]]>';}}else{if(value.length>0){node.firstChild.value='<!--\n'+trim(value)+'\n-->';}}}});htmlParser.addNodeFilter('#comment',function(nodes){var i=nodes.length,node;while(i--){node=nodes[i];if(node.value.indexOf('[CDATA[')===0){node.name='#cdata';node.type=4;node.value=node.value.replace(/^\[CDATA\[|\]\]$/g,'');}else if(node.value.indexOf('mce:protected ')===0){node.name="#text";node.type=3;node.raw=true;node.value=unescape(node.value).substr(14);}}});htmlParser.addNodeFilter('xml:namespace,input',function(nodes,name){var i=nodes.length,node;while(i--){node=nodes[i];if(node.type===7){node.remove();}else if(node.type===1){if(name==="input"&&!("type"in node.attributes.map)){node.attr('type','text');}}}});if(settings.fix_list_elements){htmlParser.addNodeFilter('ul,ol',function(nodes){var i=nodes.length,node,parentNode;while(i--){node=nodes[i];parentNode=node.parent;if(parentNode.name==='ul'||parentNode.name==='ol'){if(node.prev&&node.prev.name==='li'){node.prev.append(node);}}}});}
htmlParser.addAttributeFilter('data-mce-src,data-mce-href,data-mce-style,'+
'data-mce-selected,data-mce-expando,'+
'data-mce-type,data-mce-resize',function(nodes,name){var i=nodes.length;while(i--){nodes[i].attr(name,null);}});return{schema:schema,addNodeFilter:htmlParser.addNodeFilter,addAttributeFilter:htmlParser.addAttributeFilter,serialize:function(node,args){var self=this,impl,doc,oldDoc,htmlSerializer,content,rootNode;if(Env.ie&&dom.select('script,style,select,map').length>0){content=node.innerHTML;node=node.cloneNode(false);dom.setHTML(node,content);}else{node=node.cloneNode(true);}
impl=node.ownerDocument.implementation;if(impl.createHTMLDocument){doc=impl.createHTMLDocument("");each(node.nodeName=='BODY'?node.childNodes:[node],function(node){doc.body.appendChild(doc.importNode(node,true));});if(node.nodeName!='BODY'){node=doc.body.firstChild;}else{node=doc.body;}
oldDoc=dom.doc;dom.doc=doc;}
args=args||{};args.format=args.format||'html';if(args.selection){args.forced_root_block='';}
if(!args.no_events){args.node=node;self.onPreProcess(args);}
rootNode=htmlParser.parse(trim(args.getInner?node.innerHTML:dom.getOuterHTML(node)),args);trimTrailingBr(rootNode);htmlSerializer=new Serializer(settings,schema);args.content=htmlSerializer.serialize(rootNode);if(!args.cleanup){args.content=Zwsp.trim(args.content);args.content=args.content.replace(/\uFEFF/g,'');}
if(!args.no_events){self.onPostProcess(args);}
if(oldDoc){dom.doc=oldDoc;}
args.node=null;return args.content;},addRules:function(rules){schema.addValidElements(rules);},setRules:function(rules){schema.setValidElements(rules);},onPreProcess:function(args){if(editor){editor.fire('PreProcess',args);}},onPostProcess:function(args){if(editor){editor.fire('PostProcess',args);}},addTempAttr:addTempAttr,trimHtml:trimHtml,getTrimmedContent:getTrimmedContent};};});define("tinymce/dom/TridentSelection",[],function(){function Selection(selection){var self=this,dom=selection.dom,FALSE=false;function getPosition(rng,start){var checkRng,startIndex=0,endIndex,inside,children,child,offset,index,position=-1,parent;checkRng=rng.duplicate();checkRng.collapse(start);parent=checkRng.parentElement();if(parent.ownerDocument!==selection.dom.doc){return;}
while(parent.contentEditable==="false"){parent=parent.parentNode;}
if(!parent.hasChildNodes()){return{node:parent,inside:1};}
children=parent.children;endIndex=children.length-1;while(startIndex<=endIndex){index=Math.floor((startIndex+endIndex)/2);child=children[index];checkRng.moveToElementText(child);position=checkRng.compareEndPoints(start?'StartToStart':'EndToEnd',rng);if(position>0){endIndex=index-1;}else if(position<0){startIndex=index+1;}else{return{node:child};}}
if(position<0){if(!child){checkRng.moveToElementText(parent);checkRng.collapse(true);child=parent;inside=true;}else{checkRng.collapse(false);}
offset=0;while(checkRng.compareEndPoints(start?'StartToStart':'StartToEnd',rng)!==0){if(checkRng.move('character',1)===0||parent!=checkRng.parentElement()){break;}
offset++;}}else{checkRng.collapse(true);offset=0;while(checkRng.compareEndPoints(start?'StartToStart':'StartToEnd',rng)!==0){if(checkRng.move('character',-1)===0||parent!=checkRng.parentElement()){break;}
offset++;}}
return{node:child,position:position,offset:offset,inside:inside};}
function getRange(){var ieRange=selection.getRng(),domRange=dom.createRng(),element,collapsed,tmpRange,element2,bookmark;element=ieRange.item?ieRange.item(0):ieRange.parentElement();if(element.ownerDocument!=dom.doc){return domRange;}
collapsed=selection.isCollapsed();if(ieRange.item){domRange.setStart(element.parentNode,dom.nodeIndex(element));domRange.setEnd(domRange.startContainer,domRange.startOffset+1);return domRange;}
function findEndPoint(start){var endPoint=getPosition(ieRange,start),container,offset,textNodeOffset=0,sibling,undef,nodeValue;container=endPoint.node;offset=endPoint.offset;if(endPoint.inside&&!container.hasChildNodes()){domRange[start?'setStart':'setEnd'](container,0);return;}
if(offset===undef){domRange[start?'setStartBefore':'setEndAfter'](container);return;}
if(endPoint.position<0){sibling=endPoint.inside?container.firstChild:container.nextSibling;if(!sibling){domRange[start?'setStartAfter':'setEndAfter'](container);return;}
if(!offset){if(sibling.nodeType==3){domRange[start?'setStart':'setEnd'](sibling,0);}else{domRange[start?'setStartBefore':'setEndBefore'](sibling);}
return;}
while(sibling){if(sibling.nodeType==3){nodeValue=sibling.nodeValue;textNodeOffset+=nodeValue.length;if(textNodeOffset>=offset){container=sibling;textNodeOffset-=offset;textNodeOffset=nodeValue.length-textNodeOffset;break;}}
sibling=sibling.nextSibling;}}else{sibling=container.previousSibling;if(!sibling){return domRange[start?'setStartBefore':'setEndBefore'](container);}
if(!offset){if(container.nodeType==3){domRange[start?'setStart':'setEnd'](sibling,container.nodeValue.length);}else{domRange[start?'setStartAfter':'setEndAfter'](sibling);}
return;}
while(sibling){if(sibling.nodeType==3){textNodeOffset+=sibling.nodeValue.length;if(textNodeOffset>=offset){container=sibling;textNodeOffset-=offset;break;}}
sibling=sibling.previousSibling;}}
domRange[start?'setStart':'setEnd'](container,textNodeOffset);}
try{findEndPoint(true);if(!collapsed){findEndPoint();}}catch(ex){if(ex.number==-2147024809){bookmark=self.getBookmark(2);tmpRange=ieRange.duplicate();tmpRange.collapse(true);element=tmpRange.parentElement();if(!collapsed){tmpRange=ieRange.duplicate();tmpRange.collapse(false);element2=tmpRange.parentElement();element2.innerHTML=element2.innerHTML;}
element.innerHTML=element.innerHTML;self.moveToBookmark(bookmark);ieRange=selection.getRng();findEndPoint(true);if(!collapsed){findEndPoint();}}else{throw ex;}}
return domRange;}
this.getBookmark=function(type){var rng=selection.getRng(),bookmark={};function getIndexes(node){var parent,root,children,i,indexes=[];parent=node.parentNode;root=dom.getRoot().parentNode;while(parent!=root&&parent.nodeType!==9){children=parent.children;i=children.length;while(i--){if(node===children[i]){indexes.push(i);break;}}
node=parent;parent=parent.parentNode;}
return indexes;}
function getBookmarkEndPoint(start){var position;position=getPosition(rng,start);if(position){return{position:position.position,offset:position.offset,indexes:getIndexes(position.node),inside:position.inside};}}
if(type===2){if(!rng.item){bookmark.start=getBookmarkEndPoint(true);if(!selection.isCollapsed()){bookmark.end=getBookmarkEndPoint();}}else{bookmark.start={ctrl:true,indexes:getIndexes(rng.item(0))};}}
return bookmark;};this.moveToBookmark=function(bookmark){var rng,body=dom.doc.body;function resolveIndexes(indexes){var node,i,idx,children;node=dom.getRoot();for(i=indexes.length-1;i>=0;i--){children=node.children;idx=indexes[i];if(idx<=children.length-1){node=children[idx];}}
return node;}
function setBookmarkEndPoint(start){var endPoint=bookmark[start?'start':'end'],moveLeft,moveRng,undef,offset;if(endPoint){moveLeft=endPoint.position>0;moveRng=body.createTextRange();moveRng.moveToElementText(resolveIndexes(endPoint.indexes));offset=endPoint.offset;if(offset!==undef){moveRng.collapse(endPoint.inside||moveLeft);moveRng.moveStart('character',moveLeft?-offset:offset);}else{moveRng.collapse(start);}
rng.setEndPoint(start?'StartToStart':'EndToStart',moveRng);if(start){rng.collapse(true);}}}
if(bookmark.start){if(bookmark.start.ctrl){rng=body.createControlRange();rng.addElement(resolveIndexes(bookmark.start.indexes));rng.select();}else{rng=body.createTextRange();setBookmarkEndPoint(true);setBookmarkEndPoint();rng.select();}}};this.addRange=function(rng){var ieRng,ctrlRng,startContainer,startOffset,endContainer,endOffset,sibling,doc=selection.dom.doc,body=doc.body,nativeRng,ctrlElm;function setEndPoint(start){var container,offset,marker,tmpRng,nodes;marker=dom.create('a');container=start?startContainer:endContainer;offset=start?startOffset:endOffset;tmpRng=ieRng.duplicate();if(container==doc||container==doc.documentElement){container=body;offset=0;}
if(container.nodeType==3){container.parentNode.insertBefore(marker,container);tmpRng.moveToElementText(marker);tmpRng.moveStart('character',offset);dom.remove(marker);ieRng.setEndPoint(start?'StartToStart':'EndToEnd',tmpRng);}else{nodes=container.childNodes;if(nodes.length){if(offset>=nodes.length){dom.insertAfter(marker,nodes[nodes.length-1]);}else{container.insertBefore(marker,nodes[offset]);}
tmpRng.moveToElementText(marker);}else if(container.canHaveHTML){container.innerHTML='<span>&#xFEFF;</span>';marker=container.firstChild;tmpRng.moveToElementText(marker);tmpRng.collapse(FALSE);}
ieRng.setEndPoint(start?'StartToStart':'EndToEnd',tmpRng);dom.remove(marker);}}
startContainer=rng.startContainer;startOffset=rng.startOffset;endContainer=rng.endContainer;endOffset=rng.endOffset;ieRng=body.createTextRange();if(startContainer==endContainer&&startContainer.nodeType==1){if(startOffset==endOffset&&!startContainer.hasChildNodes()){if(startContainer.canHaveHTML){sibling=startContainer.previousSibling;if(sibling&&!sibling.hasChildNodes()&&dom.isBlock(sibling)){sibling.innerHTML='&#xFEFF;';}else{sibling=null;}
startContainer.innerHTML='<span>&#xFEFF;</span><span>&#xFEFF;</span>';ieRng.moveToElementText(startContainer.lastChild);ieRng.select();dom.doc.selection.clear();startContainer.innerHTML='';if(sibling){sibling.innerHTML='';}
return;}
startOffset=dom.nodeIndex(startContainer);startContainer=startContainer.parentNode;}
if(startOffset==endOffset-1){try{ctrlElm=startContainer.childNodes[startOffset];ctrlRng=body.createControlRange();ctrlRng.addElement(ctrlElm);ctrlRng.select();nativeRng=selection.getRng();if(nativeRng.item&&ctrlElm===nativeRng.item(0)){return;}}catch(ex){}}}
setEndPoint(true);setEndPoint();ieRng.select();};this.getRangeAt=getRange;}
return Selection;});define("tinymce/util/VK",["tinymce/Env"],function(Env){return{BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey||this.metaKeyPressed(e);},metaKeyPressed:function(e){return(Env.mac?e.metaKey:e.ctrlKey&&!e.altKey);}};});define("tinymce/dom/ControlSelection",["tinymce/util/VK","tinymce/util/Tools","tinymce/util/Delay","tinymce/Env","tinymce/dom/NodeType"],function(VK,Tools,Delay,Env,NodeType){var isContentEditableFalse=NodeType.isContentEditableFalse;return function(selection,editor){var dom=editor.dom,each=Tools.each;var selectedElm,selectedElmGhost,resizeHelper,resizeHandles,selectedHandle,lastMouseDownEvent;var startX,startY,selectedElmX,selectedElmY,startW,startH,ratio,resizeStarted;var width,height,editableDoc=editor.getDoc(),rootDocument=document,isIE=Env.ie&&Env.ie<11;var abs=Math.abs,round=Math.round,rootElement=editor.getBody(),startScrollWidth,startScrollHeight;resizeHandles={nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var rootClass='.mce-content-body';editor.contentStyles.push(rootClass+' div.mce-resizehandle {'+
'position: absolute;'+
'border: 1px solid black;'+
'box-sizing: box-sizing;'+
'background: #FFF;'+
'width: 7px;'+
'height: 7px;'+
'z-index: 10000'+
'}'+
rootClass+' .mce-resizehandle:hover {'+
'background: #000'+
'}'+
rootClass+' img[data-mce-selected],'+rootClass+' hr[data-mce-selected] {'+
'outline: 1px solid black;'+
'resize: none'+
'}'+
rootClass+' .mce-clonedresizable {'+
'position: absolute;'+
(Env.gecko?'':'outline: 1px dashed black;')+
'opacity: .5;'+
'filter: alpha(opacity=50);'+
'z-index: 10000'+
'}'+
rootClass+' .mce-resize-helper {'+
'background: #555;'+
'background: rgba(0,0,0,0.75);'+
'border-radius: 3px;'+
'border: 1px;'+
'color: white;'+
'display: none;'+
'font-family: sans-serif;'+
'font-size: 12px;'+
'white-space: nowrap;'+
'line-height: 14px;'+
'margin: 5px 10px;'+
'padding: 5px;'+
'position: absolute;'+
'z-index: 10001'+
'}');function isResizable(elm){var selector=editor.settings.object_resizing;if(selector===false||Env.iOS){return false;}
if(typeof selector!='string'){selector='table,img,div';}
if(elm.getAttribute('data-mce-resize')==='false'){return false;}
if(elm==editor.getBody()){return false;}
return editor.dom.is(elm,selector);}
function resizeGhostElement(e){var deltaX,deltaY,proportional;var resizeHelperX,resizeHelperY;deltaX=e.screenX-startX;deltaY=e.screenY-startY;width=deltaX*selectedHandle[2]+startW;height=deltaY*selectedHandle[3]+startH;width=width<5?5:width;height=height<5?5:height;if(selectedElm.nodeName=="IMG"&&editor.settings.resize_img_proportional!==false){proportional=!VK.modifierPressed(e);}else{proportional=VK.modifierPressed(e)||(selectedElm.nodeName=="IMG"&&selectedHandle[2]*selectedHandle[3]!==0);}
if(proportional){if(abs(deltaX)>abs(deltaY)){height=round(width*ratio);width=round(height/ratio);}else{width=round(height/ratio);height=round(width*ratio);}}
dom.setStyles(selectedElmGhost,{width:width,height:height});resizeHelperX=selectedHandle.startPos.x+deltaX;resizeHelperY=selectedHandle.startPos.y+deltaY;resizeHelperX=resizeHelperX>0?resizeHelperX:0;resizeHelperY=resizeHelperY>0?resizeHelperY:0;dom.setStyles(resizeHelper,{left:resizeHelperX,top:resizeHelperY,display:'block'});resizeHelper.innerHTML=width+' &times; '+height;if(selectedHandle[2]<0&&selectedElmGhost.clientWidth<=width){dom.setStyle(selectedElmGhost,'left',selectedElmX+(startW-width));}
if(selectedHandle[3]<0&&selectedElmGhost.clientHeight<=height){dom.setStyle(selectedElmGhost,'top',selectedElmY+(startH-height));}
deltaX=rootElement.scrollWidth-startScrollWidth;deltaY=rootElement.scrollHeight-startScrollHeight;if(deltaX+deltaY!==0){dom.setStyles(resizeHelper,{left:resizeHelperX-deltaX,top:resizeHelperY-deltaY});}
if(!resizeStarted){editor.fire('ObjectResizeStart',{target:selectedElm,width:startW,height:startH});resizeStarted=true;}}
function endGhostResize(){resizeStarted=false;function setSizeProp(name,value){if(value){if(selectedElm.style[name]||!editor.schema.isValid(selectedElm.nodeName.toLowerCase(),name)){dom.setStyle(selectedElm,name,value);}else{dom.setAttrib(selectedElm,name,value);}}}
setSizeProp('width',width);setSizeProp('height',height);dom.unbind(editableDoc,'mousemove',resizeGhostElement);dom.unbind(editableDoc,'mouseup',endGhostResize);if(rootDocument!=editableDoc){dom.unbind(rootDocument,'mousemove',resizeGhostElement);dom.unbind(rootDocument,'mouseup',endGhostResize);}
dom.remove(selectedElmGhost);dom.remove(resizeHelper);if(!isIE||selectedElm.nodeName=="TABLE"){showResizeRect(selectedElm);}
editor.fire('ObjectResized',{target:selectedElm,width:width,height:height});dom.setAttrib(selectedElm,'style',dom.getAttrib(selectedElm,'style'));editor.nodeChanged();}
function showResizeRect(targetElm,mouseDownHandleName,mouseDownEvent){var position,targetWidth,targetHeight,e,rect;hideResizeRect();unbindResizeHandleEvents();position=dom.getPos(targetElm,rootElement);selectedElmX=position.x;selectedElmY=position.y;rect=targetElm.getBoundingClientRect();targetWidth=rect.width||(rect.right-rect.left);targetHeight=rect.height||(rect.bottom-rect.top);if(selectedElm!=targetElm){detachResizeStartListener();selectedElm=targetElm;width=height=0;}
e=editor.fire('ObjectSelected',{target:targetElm});if(isResizable(targetElm)&&!e.isDefaultPrevented()){each(resizeHandles,function(handle,name){var handleElm;function startDrag(e){startX=e.screenX;startY=e.screenY;startW=selectedElm.clientWidth;startH=selectedElm.clientHeight;ratio=startH/startW;selectedHandle=handle;handle.startPos={x:targetWidth*handle[0]+selectedElmX,y:targetHeight*handle[1]+selectedElmY};startScrollWidth=rootElement.scrollWidth;startScrollHeight=rootElement.scrollHeight;selectedElmGhost=selectedElm.cloneNode(true);dom.addClass(selectedElmGhost,'mce-clonedresizable');dom.setAttrib(selectedElmGhost,'data-mce-bogus','all');selectedElmGhost.contentEditable=false;selectedElmGhost.unSelectabe=true;dom.setStyles(selectedElmGhost,{left:selectedElmX,top:selectedElmY,margin:0});selectedElmGhost.removeAttribute('data-mce-selected');rootElement.appendChild(selectedElmGhost);dom.bind(editableDoc,'mousemove',resizeGhostElement);dom.bind(editableDoc,'mouseup',endGhostResize);if(rootDocument!=editableDoc){dom.bind(rootDocument,'mousemove',resizeGhostElement);dom.bind(rootDocument,'mouseup',endGhostResize);}
resizeHelper=dom.add(rootElement,'div',{'class':'mce-resize-helper','data-mce-bogus':'all'},startW+' &times; '+startH);}
if(mouseDownHandleName){if(name==mouseDownHandleName){startDrag(mouseDownEvent);}
return;}
handleElm=dom.get('mceResizeHandle'+name);if(handleElm){dom.remove(handleElm);}
handleElm=dom.add(rootElement,'div',{id:'mceResizeHandle'+name,'data-mce-bogus':'all','class':'mce-resizehandle',unselectable:true,style:'cursor:'+name+'-resize; margin:0; padding:0'});if(Env.ie){handleElm.contentEditable=false;}
dom.bind(handleElm,'mousedown',function(e){e.stopImmediatePropagation();e.preventDefault();startDrag(e);});handle.elm=handleElm;dom.setStyles(handleElm,{left:(targetWidth*handle[0]+selectedElmX)-(handleElm.offsetWidth/2),top:(targetHeight*handle[1]+selectedElmY)-(handleElm.offsetHeight/2)});});}else{hideResizeRect();}
selectedElm.setAttribute('data-mce-selected','1');}
function hideResizeRect(){var name,handleElm;unbindResizeHandleEvents();if(selectedElm){selectedElm.removeAttribute('data-mce-selected');}
for(name in resizeHandles){handleElm=dom.get('mceResizeHandle'+name);if(handleElm){dom.unbind(handleElm);dom.remove(handleElm);}}}
function updateResizeRect(e){var startElm,controlElm;function isChildOrEqual(node,parent){if(node){do{if(node===parent){return true;}}while((node=node.parentNode));}}
if(resizeStarted||editor.removed){return;}
each(dom.select('img[data-mce-selected],hr[data-mce-selected]'),function(img){img.removeAttribute('data-mce-selected');});controlElm=e.type=='mousedown'?e.target:selection.getNode();controlElm=dom.$(controlElm).closest(isIE?'table':'table,img,hr')[0];if(isChildOrEqual(controlElm,rootElement)){disableGeckoResize();startElm=selection.getStart(true);if(isChildOrEqual(startElm,controlElm)&&isChildOrEqual(selection.getEnd(true),controlElm)){if(!isIE||(controlElm!=startElm&&startElm.nodeName!=='IMG')){showResizeRect(controlElm);return;}}}
hideResizeRect();}
function attachEvent(elm,name,func){if(elm&&elm.attachEvent){elm.attachEvent('on'+name,func);}}
function detachEvent(elm,name,func){if(elm&&elm.detachEvent){elm.detachEvent('on'+name,func);}}
function resizeNativeStart(e){var target=e.srcElement,pos,name,corner,cornerX,cornerY,relativeX,relativeY;pos=target.getBoundingClientRect();relativeX=lastMouseDownEvent.clientX-pos.left;relativeY=lastMouseDownEvent.clientY-pos.top;for(name in resizeHandles){corner=resizeHandles[name];cornerX=target.offsetWidth*corner[0];cornerY=target.offsetHeight*corner[1];if(abs(cornerX-relativeX)<8&&abs(cornerY-relativeY)<8){selectedHandle=corner;break;}}
resizeStarted=true;editor.fire('ObjectResizeStart',{target:selectedElm,width:selectedElm.clientWidth,height:selectedElm.clientHeight});editor.getDoc().selection.empty();showResizeRect(target,name,lastMouseDownEvent);}
function preventDefault(e){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}}
function nativeControlSelect(e){var target=e.srcElement;if(isContentEditableFalse(target)){preventDefault(e);return;}
if(target!=selectedElm){editor.fire('ObjectSelected',{target:target});detachResizeStartListener();if(target.id.indexOf('mceResizeHandle')===0){e.returnValue=false;return;}
if(target.nodeName=='IMG'||target.nodeName=='TABLE'){hideResizeRect();selectedElm=target;attachEvent(target,'resizestart',resizeNativeStart);}}}
function detachResizeStartListener(){detachEvent(selectedElm,'resizestart',resizeNativeStart);}
function unbindResizeHandleEvents(){for(var name in resizeHandles){var handle=resizeHandles[name];if(handle.elm){dom.unbind(handle.elm);delete handle.elm;}}}
function disableGeckoResize(){try{editor.getDoc().execCommand('enableObjectResizing',false,false);}catch(ex){}}
function controlSelect(elm){var ctrlRng;if(!isIE){return;}
ctrlRng=editableDoc.body.createControlRange();try{ctrlRng.addElement(elm);ctrlRng.select();return true;}catch(ex){}}
editor.on('init',function(){if(isIE){editor.on('ObjectResized',function(e){if(e.target.nodeName!='TABLE'){hideResizeRect();controlSelect(e.target);}});attachEvent(rootElement,'controlselect',nativeControlSelect);editor.on('mousedown',function(e){lastMouseDownEvent=e;});}else{disableGeckoResize();if(Env.ie>=11){editor.on('mousedown click',function(e){var nodeName=e.target.nodeName;if(!resizeStarted&&/^(TABLE|IMG|HR)$/.test(nodeName)){editor.selection.select(e.target,nodeName=='TABLE');if(e.type=='mousedown'){editor.nodeChanged();}}});editor.dom.bind(rootElement,'mscontrolselect',function(e){function delayedSelect(node){Delay.setEditorTimeout(editor,function(){editor.selection.select(node);});}
if(isContentEditableFalse(e.target)){e.preventDefault();delayedSelect(e.target);return;}
if(/^(TABLE|IMG|HR)$/.test(e.target.nodeName)){e.preventDefault();if(e.target.tagName=='IMG'){delayedSelect(e.target);}}});}}
var throttledUpdateResizeRect=Delay.throttle(function(e){if(!editor.composing){updateResizeRect(e);}});editor.on('nodechange ResizeEditor ResizeWindow drop',throttledUpdateResizeRect);editor.on('keyup compositionend',function(e){if(selectedElm&&selectedElm.nodeName=="TABLE"){throttledUpdateResizeRect(e);}});editor.on('hide blur',hideResizeRect);});editor.on('remove',unbindResizeHandleEvents);function destroy(){selectedElm=selectedElmGhost=null;if(isIE){detachResizeStartListener();detachEvent(rootElement,'controlselect',nativeControlSelect);}}
return{isResizable:isResizable,showResizeRect:showResizeRect,hideResizeRect:hideResizeRect,updateResizeRect:updateResizeRect,controlSelect:controlSelect,destroy:destroy};};});define("tinymce/util/Fun",[],function(){var slice=[].slice;function constant(value){return function(){return value;};}
function negate(predicate){return function(x){return!predicate(x);};}
function compose(f,g){return function(x){return f(g(x));};}
function or(){var args=slice.call(arguments);return function(x){for(var i=0;i<args.length;i++){if(args[i](x)){return true;}}
return false;};}
function and(){var args=slice.call(arguments);return function(x){for(var i=0;i<args.length;i++){if(!args[i](x)){return false;}}
return true;};}
function curry(fn){var args=slice.call(arguments);if(args.length-1>=fn.length){return fn.apply(this,args.slice(1));}
return function(){var tempArgs=args.concat([].slice.call(arguments));return curry.apply(this,tempArgs);};}
return{constant:constant,negate:negate,and:and,or:or,curry:curry,compose:compose};});define("tinymce/caret/CaretCandidate",["tinymce/dom/NodeType","tinymce/util/Arr","tinymce/caret/CaretContainer"],function(NodeType,Arr,CaretContainer){var isContentEditableTrue=NodeType.isContentEditableTrue,isContentEditableFalse=NodeType.isContentEditableFalse,isBr=NodeType.isBr,isText=NodeType.isText,isInvalidTextElement=NodeType.matchNodeNames('script style textarea'),isAtomicInline=NodeType.matchNodeNames('img input textarea hr iframe video audio object'),isTable=NodeType.matchNodeNames('table'),isCaretContainer=CaretContainer.isCaretContainer;function isCaretCandidate(node){if(isCaretContainer(node)){return false;}
if(isText(node)){if(isInvalidTextElement(node.parentNode)){return false;}
return true;}
return isAtomicInline(node)||isBr(node)||isTable(node)||isContentEditableFalse(node);}
function isInEditable(node,rootNode){for(node=node.parentNode;node&&node!=rootNode;node=node.parentNode){if(isContentEditableFalse(node)){return false;}
if(isContentEditableTrue(node)){return true;}}
return true;}
function isAtomicContentEditableFalse(node){if(!isContentEditableFalse(node)){return false;}
return Arr.reduce(node.getElementsByTagName('*'),function(result,elm){return result||isContentEditableTrue(elm);},false)!==true;}
function isAtomic(node){return isAtomicInline(node)||isAtomicContentEditableFalse(node);}
function isEditableCaretCandidate(node,rootNode){return isCaretCandidate(node)&&isInEditable(node,rootNode);}
return{isCaretCandidate:isCaretCandidate,isInEditable:isInEditable,isAtomic:isAtomic,isEditableCaretCandidate:isEditableCaretCandidate};});define("tinymce/geom/ClientRect",[],function(){var round=Math.round;function clone(rect){if(!rect){return{left:0,top:0,bottom:0,right:0,width:0,height:0};}
return{left:round(rect.left),top:round(rect.top),bottom:round(rect.bottom),right:round(rect.right),width:round(rect.width),height:round(rect.height)};}
function collapse(clientRect,toStart){clientRect=clone(clientRect);if(toStart){clientRect.right=clientRect.left;}else{clientRect.left=clientRect.left+clientRect.width;clientRect.right=clientRect.left;}
clientRect.width=0;return clientRect;}
function isEqual(rect1,rect2){return(rect1.left===rect2.left&&rect1.top===rect2.top&&rect1.bottom===rect2.bottom&&rect1.right===rect2.right);}
function isValidOverflow(overflowY,clientRect1,clientRect2){return overflowY>=0&&overflowY<=Math.min(clientRect1.height,clientRect2.height)/2;}
function isAbove(clientRect1,clientRect2){if(clientRect1.bottom<clientRect2.top){return true;}
if(clientRect1.top>clientRect2.bottom){return false;}
return isValidOverflow(clientRect2.top-clientRect1.bottom,clientRect1,clientRect2);}
function isBelow(clientRect1,clientRect2){if(clientRect1.top>clientRect2.bottom){return true;}
if(clientRect1.bottom<clientRect2.top){return false;}
return isValidOverflow(clientRect2.bottom-clientRect1.top,clientRect1,clientRect2);}
function isLeft(clientRect1,clientRect2){return clientRect1.left<clientRect2.left;}
function isRight(clientRect1,clientRect2){return clientRect1.right>clientRect2.right;}
function compare(clientRect1,clientRect2){if(isAbove(clientRect1,clientRect2)){return-1;}
if(isBelow(clientRect1,clientRect2)){return 1;}
if(isLeft(clientRect1,clientRect2)){return-1;}
if(isRight(clientRect1,clientRect2)){return 1;}
return 0;}
function containsXY(clientRect,clientX,clientY){return(clientX>=clientRect.left&&clientX<=clientRect.right&&clientY>=clientRect.top&&clientY<=clientRect.bottom);}
return{clone:clone,collapse:collapse,isEqual:isEqual,isAbove:isAbove,isBelow:isBelow,isLeft:isLeft,isRight:isRight,compare:compare,containsXY:containsXY};});define("tinymce/text/ExtendingChar",[],function(){var extendingChars=new RegExp("[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A"+
"\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0"+
"\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E3-\u0902\u093A\u093C"+
"\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2-\u09E3"+
"\u0A01-\u0A02\u0A3C\u0A41-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A82\u0ABC"+
"\u0AC1-\u0AC5\u0AC7-\u0AC8\u0ACD\u0AE2-\u0AE3\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B57"+
"\u0B62-\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56"+
"\u0C62-\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC-\u0CCD\u0CD5-\u0CD6\u0CE2-\u0CE3\u0D01\u0D3E\u0D41-\u0D44"+
"\u0D4D\u0D57\u0D62-\u0D63\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9"+
"\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97"+
"\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039-\u103A\u103D-\u103E\u1058-\u1059\u105E-\u1060\u1071-\u1074"+
"\u1082\u1085-\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17B5"+
"\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193B\u1A17-\u1A18"+
"\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1ABE\u1B00-\u1B03\u1B34"+
"\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80-\u1B81\u1BA2-\u1BA5\u1BA8-\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8-\u1BE9"+
"\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8-\u1CF9"+
"\u1DC0-\u1DF5\u1DFC-\u1DFF\u200C-\u200D\u20D0-\u20DC\u20DD-\u20E0\u20E1\u20E2-\u20E4\u20E5-\u20F0\u2CEF-\u2CF1"+
"\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u302E-\u302F\u3099-\u309A\uA66F\uA670-\uA672\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1"+
"\uA802\uA806\uA80B\uA825-\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC"+
"\uA9E5\uAA29-\uAA2E\uAA31-\uAA32\uAA35-\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1"+
"\uAAEC-\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E-\uFF9F]");function isExtendingChar(ch){return typeof ch=="string"&&ch.charCodeAt(0)>=768&&extendingChars.test(ch);}
return{isExtendingChar:isExtendingChar};});define("tinymce/caret/CaretPosition",["tinymce/util/Fun","tinymce/dom/NodeType","tinymce/dom/DOMUtils","tinymce/dom/RangeUtils","tinymce/caret/CaretCandidate","tinymce/geom/ClientRect","tinymce/text/ExtendingChar"],function(Fun,NodeType,DOMUtils,RangeUtils,CaretCandidate,ClientRect,ExtendingChar){var isElement=NodeType.isElement,isCaretCandidate=CaretCandidate.isCaretCandidate,isBlock=NodeType.matchStyleValues('display','block table'),isFloated=NodeType.matchStyleValues('float','left right'),isValidElementCaretCandidate=Fun.and(isElement,isCaretCandidate,Fun.negate(isFloated)),isNotPre=Fun.negate(NodeType.matchStyleValues('white-space','pre pre-line pre-wrap')),isText=NodeType.isText,isBr=NodeType.isBr,nodeIndex=DOMUtils.nodeIndex,resolveIndex=RangeUtils.getNode;function isWhiteSpace(chr){return chr&&/[\r\n\t ]/.test(chr);}
function isHiddenWhiteSpaceRange(range){var container=range.startContainer,offset=range.startOffset,text;if(isWhiteSpace(range.toString())&&isNotPre(container.parentNode)){text=container.data;if(isWhiteSpace(text[offset-1])||isWhiteSpace(text[offset+1])){return true;}}
return false;}
function getCaretPositionClientRects(caretPosition){var clientRects=[],beforeNode,node;function getBrClientRect(brNode){var doc=brNode.ownerDocument,rng=doc.createRange(),nbsp=doc.createTextNode('\u00a0'),parentNode=brNode.parentNode,clientRect;parentNode.insertBefore(nbsp,brNode);rng.setStart(nbsp,0);rng.setEnd(nbsp,1);clientRect=ClientRect.clone(rng.getBoundingClientRect());parentNode.removeChild(nbsp);return clientRect;}
function getBoundingClientRect(item){var clientRect,clientRects;clientRects=item.getClientRects();if(clientRects.length>0){clientRect=ClientRect.clone(clientRects[0]);}else{clientRect=ClientRect.clone(item.getBoundingClientRect());}
if(isBr(item)&&clientRect.left===0){return getBrClientRect(item);}
return clientRect;}
function collapseAndInflateWidth(clientRect,toStart){clientRect=ClientRect.collapse(clientRect,toStart);clientRect.width=1;clientRect.right=clientRect.left+1;return clientRect;}
function addUniqueAndValidRect(clientRect){if(clientRect.height===0){return;}
if(clientRects.length>0){if(ClientRect.isEqual(clientRect,clientRects[clientRects.length-1])){return;}}
clientRects.push(clientRect);}
function addCharacterOffset(container,offset){var range=container.ownerDocument.createRange();if(offset<container.data.length){if(ExtendingChar.isExtendingChar(container.data[offset])){return clientRects;}
if(ExtendingChar.isExtendingChar(container.data[offset-1])){range.setStart(container,offset);range.setEnd(container,offset+1);if(!isHiddenWhiteSpaceRange(range)){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(range),false));return clientRects;}}}
if(offset>0){range.setStart(container,offset-1);range.setEnd(container,offset);if(!isHiddenWhiteSpaceRange(range)){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(range),false));}}
if(offset<container.data.length){range.setStart(container,offset);range.setEnd(container,offset+1);if(!isHiddenWhiteSpaceRange(range)){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(range),true));}}}
if(isText(caretPosition.container())){addCharacterOffset(caretPosition.container(),caretPosition.offset());return clientRects;}
if(isElement(caretPosition.container())){if(caretPosition.isAtEnd()){node=resolveIndex(caretPosition.container(),caretPosition.offset());if(isText(node)){addCharacterOffset(node,node.data.length);}
if(isValidElementCaretCandidate(node)&&!isBr(node)){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(node),false));}}else{node=resolveIndex(caretPosition.container(),caretPosition.offset());if(isText(node)){addCharacterOffset(node,0);}
if(isValidElementCaretCandidate(node)&&caretPosition.isAtEnd()){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(node),false));return clientRects;}
beforeNode=resolveIndex(caretPosition.container(),caretPosition.offset()-1);if(isValidElementCaretCandidate(beforeNode)&&!isBr(beforeNode)){if(isBlock(beforeNode)||isBlock(node)||!isValidElementCaretCandidate(node)){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(beforeNode),false));}}
if(isValidElementCaretCandidate(node)){addUniqueAndValidRect(collapseAndInflateWidth(getBoundingClientRect(node),true));}}}
return clientRects;}
function CaretPosition(container,offset,clientRects){function isAtStart(){if(isText(container)){return offset===0;}
return offset===0;}
function isAtEnd(){if(isText(container)){return offset>=container.data.length;}
return offset>=container.childNodes.length;}
function toRange(){var range;range=container.ownerDocument.createRange();range.setStart(container,offset);range.setEnd(container,offset);return range;}
function getClientRects(){if(!clientRects){clientRects=getCaretPositionClientRects(new CaretPosition(container,offset));}
return clientRects;}
function isVisible(){return getClientRects().length>0;}
function isEqual(caretPosition){return caretPosition&&container===caretPosition.container()&&offset===caretPosition.offset();}
function getNode(before){return resolveIndex(container,before?offset-1:offset);}
return{container:Fun.constant(container),offset:Fun.constant(offset),toRange:toRange,getClientRects:getClientRects,isVisible:isVisible,isAtStart:isAtStart,isAtEnd:isAtEnd,isEqual:isEqual,getNode:getNode};}
CaretPosition.fromRangeStart=function(range){return new CaretPosition(range.startContainer,range.startOffset);};CaretPosition.fromRangeEnd=function(range){return new CaretPosition(range.endContainer,range.endOffset);};CaretPosition.after=function(node){return new CaretPosition(node.parentNode,nodeIndex(node)+1);};CaretPosition.before=function(node){return new CaretPosition(node.parentNode,nodeIndex(node));};return CaretPosition;});define('tinymce/caret/CaretBookmark',['tinymce/dom/NodeType','tinymce/dom/DOMUtils','tinymce/util/Fun','tinymce/util/Arr','tinymce/caret/CaretPosition'],function(NodeType,DomUtils,Fun,Arr,CaretPosition){var isText=NodeType.isText,isBogus=NodeType.isBogus,nodeIndex=DomUtils.nodeIndex;function normalizedParent(node){var parentNode=node.parentNode;if(isBogus(parentNode)){return normalizedParent(parentNode);}
return parentNode;}
function getChildNodes(node){if(!node){return[];}
return Arr.reduce(node.childNodes,function(result,node){if(isBogus(node)&&node.nodeName!='BR'){result=result.concat(getChildNodes(node));}else{result.push(node);}
return result;},[]);}
function normalizedTextOffset(textNode,offset){while((textNode=textNode.previousSibling)){if(!isText(textNode)){break;}
offset+=textNode.data.length;}
return offset;}
function equal(targetValue){return function(value){return targetValue===value;};}
function normalizedNodeIndex(node){var nodes,index,numTextFragments;nodes=getChildNodes(normalizedParent(node));index=Arr.findIndex(nodes,equal(node),node);nodes=nodes.slice(0,index+1);numTextFragments=Arr.reduce(nodes,function(result,node,i){if(isText(node)&&isText(nodes[i-1])){result++;}
return result;},0);nodes=Arr.filter(nodes,NodeType.matchNodeNames(node.nodeName));index=Arr.findIndex(nodes,equal(node),node);return index-numTextFragments;}
function createPathItem(node){var name;if(isText(node)){name='text()';}else{name=node.nodeName.toLowerCase();}
return name+'['+normalizedNodeIndex(node)+']';}
function parentsUntil(rootNode,node,predicate){var parents=[];for(node=node.parentNode;node!=rootNode;node=node.parentNode){if(predicate&&predicate(node)){break;}
parents.push(node);}
return parents;}
function create(rootNode,caretPosition){var container,offset,path=[],outputOffset,childNodes,parents;container=caretPosition.container();offset=caretPosition.offset();if(isText(container)){outputOffset=normalizedTextOffset(container,offset);}else{childNodes=container.childNodes;if(offset>=childNodes.length){outputOffset='after';offset=childNodes.length-1;}else{outputOffset='before';}
container=childNodes[offset];}
path.push(createPathItem(container));parents=parentsUntil(rootNode,container);parents=Arr.filter(parents,Fun.negate(NodeType.isBogus));path=path.concat(Arr.map(parents,function(node){return createPathItem(node);}));return path.reverse().join('/')+','+outputOffset;}
function resolvePathItem(node,name,index){var nodes=getChildNodes(node);nodes=Arr.filter(nodes,function(node,index){return!isText(node)||!isText(nodes[index-1]);});nodes=Arr.filter(nodes,NodeType.matchNodeNames(name));return nodes[index];}
function findTextPosition(container,offset){var node=container,targetOffset=0,dataLen;while(isText(node)){dataLen=node.data.length;if(offset>=targetOffset&&offset<=targetOffset+dataLen){container=node;offset=offset-targetOffset;break;}
if(!isText(node.nextSibling)){container=node;offset=dataLen;break;}
targetOffset+=dataLen;node=node.nextSibling;}
if(offset>container.data.length){offset=container.data.length;}
return new CaretPosition(container,offset);}
function resolve(rootNode,path){var parts,container,offset;if(!path){return null;}
parts=path.split(',');path=parts[0].split('/');offset=parts.length>1?parts[1]:'before';container=Arr.reduce(path,function(result,value){value=/([\w\-\(\)]+)\[([0-9]+)\]/.exec(value);if(!value){return null;}
if(value[1]==='text()'){value[1]='#text';}
return resolvePathItem(result,value[1],parseInt(value[2],10));},rootNode);if(!container){return null;}
if(!isText(container)){if(offset==='after'){offset=nodeIndex(container)+1;}else{offset=nodeIndex(container);}
return new CaretPosition(container.parentNode,offset);}
return findTextPosition(container,parseInt(offset,10));}
return{create:create,resolve:resolve};});define("tinymce/dom/BookmarkManager",["tinymce/Env","tinymce/util/Tools","tinymce/caret/CaretContainer","tinymce/caret/CaretBookmark","tinymce/caret/CaretPosition","tinymce/dom/NodeType"],function(Env,Tools,CaretContainer,CaretBookmark,CaretPosition,NodeType){var isContentEditableFalse=NodeType.isContentEditableFalse;function BookmarkManager(selection){var dom=selection.dom;this.getBookmark=function(type,normalized){var rng,rng2,id,collapsed,name,element,chr='&#xFEFF;',styles;function findIndex(name,element){var count=0;Tools.each(dom.select(name),function(node){if(node.getAttribute('data-mce-bogus')==='all'){return;}
if(node==element){return false;}
count++;});return count;}
function normalizeTableCellSelection(rng){function moveEndPoint(start){var container,offset,childNodes,prefix=start?'start':'end';container=rng[prefix+'Container'];offset=rng[prefix+'Offset'];if(container.nodeType==1&&container.nodeName=="TR"){childNodes=container.childNodes;container=childNodes[Math.min(start?offset:offset-1,childNodes.length-1)];if(container){offset=start?0:container.childNodes.length;rng['set'+(start?'Start':'End')](container,offset);}}}
moveEndPoint(true);moveEndPoint();return rng;}
function getLocation(rng){var root=dom.getRoot(),bookmark={};function getPoint(rng,start){var container=rng[start?'startContainer':'endContainer'],offset=rng[start?'startOffset':'endOffset'],point=[],node,childNodes,after=0;if(container.nodeType==3){if(normalized){for(node=container.previousSibling;node&&node.nodeType==3;node=node.previousSibling){offset+=node.nodeValue.length;}}
point.push(offset);}else{childNodes=container.childNodes;if(offset>=childNodes.length&&childNodes.length){after=1;offset=Math.max(0,childNodes.length-1);}
point.push(dom.nodeIndex(childNodes[offset],normalized)+after);}
for(;container&&container!=root;container=container.parentNode){point.push(dom.nodeIndex(container,normalized));}
return point;}
bookmark.start=getPoint(rng,true);if(!selection.isCollapsed()){bookmark.end=getPoint(rng);}
return bookmark;}
function findAdjacentContentEditableFalseElm(rng){function findSibling(node){var sibling;if(CaretContainer.isCaretContainer(node)){if(NodeType.isText(node)&&CaretContainer.isCaretContainerBlock(node)){node=node.parentNode;}
sibling=node.previousSibling;if(isContentEditableFalse(sibling)){return sibling;}
sibling=node.nextSibling;if(isContentEditableFalse(sibling)){return sibling;}}}
return findSibling(rng.startContainer)||findSibling(rng.endContainer);}
if(type==2){element=selection.getNode();name=element?element.nodeName:null;rng=selection.getRng();if(isContentEditableFalse(element)||name=='IMG'){return{name:name,index:findIndex(name,element)};}
if(selection.tridentSel){return selection.tridentSel.getBookmark(type);}
element=findAdjacentContentEditableFalseElm(rng);if(element){name=element.tagName;return{name:name,index:findIndex(name,element)};}
return getLocation(rng);}
if(type==3){rng=selection.getRng();return{start:CaretBookmark.create(dom.getRoot(),CaretPosition.fromRangeStart(rng)),end:CaretBookmark.create(dom.getRoot(),CaretPosition.fromRangeEnd(rng))};}
if(type){return{rng:selection.getRng()};}
rng=selection.getRng();id=dom.uniqueId();collapsed=selection.isCollapsed();styles='overflow:hidden;line-height:0px';if(rng.duplicate||rng.item){if(!rng.item){rng2=rng.duplicate();try{rng.collapse();rng.pasteHTML('<span data-mce-type="bookmark" id="'+id+'_start" style="'+styles+'">'+chr+'</span>');if(!collapsed){rng2.collapse(false);rng.moveToElementText(rng2.parentElement());if(rng.compareEndPoints('StartToEnd',rng2)===0){rng2.move('character',-1);}
rng2.pasteHTML('<span data-mce-type="bookmark" id="'+id+'_end" style="'+styles+'">'+chr+'</span>');}}catch(ex){return null;}}else{element=rng.item(0);name=element.nodeName;return{name:name,index:findIndex(name,element)};}}else{element=selection.getNode();name=element.nodeName;if(name=='IMG'){return{name:name,index:findIndex(name,element)};}
rng2=normalizeTableCellSelection(rng.cloneRange());if(!collapsed){rng2.collapse(false);rng2.insertNode(dom.create('span',{'data-mce-type':"bookmark",id:id+'_end',style:styles},chr));}
rng=normalizeTableCellSelection(rng);rng.collapse(true);rng.insertNode(dom.create('span',{'data-mce-type':"bookmark",id:id+'_start',style:styles},chr));}
selection.moveToBookmark({id:id,keep:1});return{id:id};};this.moveToBookmark=function(bookmark){var rng,root,startContainer,endContainer,startOffset,endOffset;function setEndPoint(start){var point=bookmark[start?'start':'end'],i,node,offset,children;if(point){offset=point[0];for(node=root,i=point.length-1;i>=1;i--){children=node.childNodes;if(point[i]>children.length-1){return;}
node=children[point[i]];}
if(node.nodeType===3){offset=Math.min(point[0],node.nodeValue.length);}
if(node.nodeType===1){offset=Math.min(point[0],node.childNodes.length);}
if(start){rng.setStart(node,offset);}else{rng.setEnd(node,offset);}}
return true;}
function restoreEndPoint(suffix){var marker=dom.get(bookmark.id+'_'+suffix),node,idx,next,prev,keep=bookmark.keep;if(marker){node=marker.parentNode;if(suffix=='start'){if(!keep){idx=dom.nodeIndex(marker);}else{node=marker.firstChild;idx=1;}
startContainer=endContainer=node;startOffset=endOffset=idx;}else{if(!keep){idx=dom.nodeIndex(marker);}else{node=marker.firstChild;idx=1;}
endContainer=node;endOffset=idx;}
if(!keep){prev=marker.previousSibling;next=marker.nextSibling;Tools.each(Tools.grep(marker.childNodes),function(node){if(node.nodeType==3){node.nodeValue=node.nodeValue.replace(/\uFEFF/g,'');}});while((marker=dom.get(bookmark.id+'_'+suffix))){dom.remove(marker,1);}
if(prev&&next&&prev.nodeType==next.nodeType&&prev.nodeType==3&&!Env.opera){idx=prev.nodeValue.length;prev.appendData(next.nodeValue);dom.remove(next);if(suffix=='start'){startContainer=endContainer=prev;startOffset=endOffset=idx;}else{endContainer=prev;endOffset=idx;}}}}}
function addBogus(node){if(dom.isBlock(node)&&!node.innerHTML&&!Env.ie){node.innerHTML='<br data-mce-bogus="1" />';}
return node;}
function resolveCaretPositionBookmark(){var rng,pos;rng=dom.createRng();pos=CaretBookmark.resolve(dom.getRoot(),bookmark.start);rng.setStart(pos.container(),pos.offset());pos=CaretBookmark.resolve(dom.getRoot(),bookmark.end);rng.setEnd(pos.container(),pos.offset());return rng;}
if(bookmark){if(Tools.isArray(bookmark.start)){rng=dom.createRng();root=dom.getRoot();if(selection.tridentSel){return selection.tridentSel.moveToBookmark(bookmark);}
if(setEndPoint(true)&&setEndPoint()){selection.setRng(rng);}}else if(typeof bookmark.start=='string'){selection.setRng(resolveCaretPositionBookmark(bookmark));}else if(bookmark.id){restoreEndPoint('start');restoreEndPoint('end');if(startContainer){rng=dom.createRng();rng.setStart(addBogus(startContainer),startOffset);rng.setEnd(addBogus(endContainer),endOffset);selection.setRng(rng);}}else if(bookmark.name){selection.select(dom.select(bookmark.name)[bookmark.index]);}else if(bookmark.rng){selection.setRng(bookmark.rng);}}};}
BookmarkManager.isBookmarkNode=function(node){return node&&node.tagName==='SPAN'&&node.getAttribute('data-mce-type')==='bookmark';};return BookmarkManager;});define("tinymce/dom/Selection",["tinymce/dom/TreeWalker","tinymce/dom/TridentSelection","tinymce/dom/ControlSelection","tinymce/dom/RangeUtils","tinymce/dom/BookmarkManager","tinymce/dom/NodeType","tinymce/Env","tinymce/util/Tools"],function(TreeWalker,TridentSelection,ControlSelection,RangeUtils,BookmarkManager,NodeType,Env,Tools){var each=Tools.each,trim=Tools.trim;var isIE=Env.ie;function Selection(dom,win,serializer,editor){var self=this;self.dom=dom;self.win=win;self.serializer=serializer;self.editor=editor;self.bookmarkManager=new BookmarkManager(self);self.controlSelection=new ControlSelection(self,editor);if(!self.win.getSelection){self.tridentSel=new TridentSelection(self);}}
Selection.prototype={setCursorLocation:function(node,offset){var self=this,rng=self.dom.createRng();if(!node){self._moveEndPoint(rng,self.editor.getBody(),true);self.setRng(rng);}else{rng.setStart(node,offset);rng.setEnd(node,offset);self.setRng(rng);self.collapse(false);}},getContent:function(args){var self=this,rng=self.getRng(),tmpElm=self.dom.create("body");var se=self.getSel(),whiteSpaceBefore,whiteSpaceAfter,fragment;args=args||{};whiteSpaceBefore=whiteSpaceAfter='';args.get=true;args.format=args.format||'html';args.selection=true;self.editor.fire('BeforeGetContent',args);if(args.format=='text'){return self.isCollapsed()?'':(rng.text||(se.toString?se.toString():''));}
if(rng.cloneContents){fragment=rng.cloneContents();if(fragment){tmpElm.appendChild(fragment);}}else if(rng.item!==undefined||rng.htmlText!==undefined){tmpElm.innerHTML='<br>'+(rng.item?rng.item(0).outerHTML:rng.htmlText);tmpElm.removeChild(tmpElm.firstChild);}else{tmpElm.innerHTML=rng.toString();}
if(/^\s/.test(tmpElm.innerHTML)){whiteSpaceBefore=' ';}
if(/\s+$/.test(tmpElm.innerHTML)){whiteSpaceAfter=' ';}
args.getInner=true;args.content=self.isCollapsed()?'':whiteSpaceBefore+self.serializer.serialize(tmpElm,args)+whiteSpaceAfter;self.editor.fire('GetContent',args);return args.content;},setContent:function(content,args){var self=this,rng=self.getRng(),caretNode,doc=self.win.document,frag,temp;args=args||{format:'html'};args.set=true;args.selection=true;args.content=content;if(!args.no_events){self.editor.fire('BeforeSetContent',args);}
content=args.content;if(rng.insertNode){content+='<span id="__caret">_</span>';if(rng.startContainer==doc&&rng.endContainer==doc){doc.body.innerHTML=content;}else{rng.deleteContents();if(doc.body.childNodes.length===0){doc.body.innerHTML=content;}else{if(rng.createContextualFragment){rng.insertNode(rng.createContextualFragment(content));}else{frag=doc.createDocumentFragment();temp=doc.createElement('div');frag.appendChild(temp);temp.outerHTML=content;rng.insertNode(frag);}}}
caretNode=self.dom.get('__caret');rng=doc.createRange();rng.setStartBefore(caretNode);rng.setEndBefore(caretNode);self.setRng(rng);self.dom.remove('__caret');try{self.setRng(rng);}catch(ex){}}else{if(rng.item){doc.execCommand('Delete',false,null);rng=self.getRng();}
if(/^\s+/.test(content)){rng.pasteHTML('<span id="__mce_tmp">_</span>'+content);self.dom.remove('__mce_tmp');}else{rng.pasteHTML(content);}}
if(!args.no_events){self.editor.fire('SetContent',args);}},getStart:function(real){var self=this,rng=self.getRng(),startElement,parentElement,checkRng,node;if(rng.duplicate||rng.item){if(rng.item){return rng.item(0);}
checkRng=rng.duplicate();checkRng.collapse(1);startElement=checkRng.parentElement();if(startElement.ownerDocument!==self.dom.doc){startElement=self.dom.getRoot();}
parentElement=node=rng.parentElement();while((node=node.parentNode)){if(node==startElement){startElement=parentElement;break;}}
return startElement;}
startElement=rng.startContainer;if(startElement.nodeType==1&&startElement.hasChildNodes()){if(!real||!rng.collapsed){startElement=startElement.childNodes[Math.min(startElement.childNodes.length-1,rng.startOffset)];}}
if(startElement&&startElement.nodeType==3){return startElement.parentNode;}
return startElement;},getEnd:function(real){var self=this,rng=self.getRng(),endElement,endOffset;if(rng.duplicate||rng.item){if(rng.item){return rng.item(0);}
rng=rng.duplicate();rng.collapse(0);endElement=rng.parentElement();if(endElement.ownerDocument!==self.dom.doc){endElement=self.dom.getRoot();}
if(endElement&&endElement.nodeName=='BODY'){return endElement.lastChild||endElement;}
return endElement;}
endElement=rng.endContainer;endOffset=rng.endOffset;if(endElement.nodeType==1&&endElement.hasChildNodes()){if(!real||!rng.collapsed){endElement=endElement.childNodes[endOffset>0?endOffset-1:endOffset];}}
if(endElement&&endElement.nodeType==3){return endElement.parentNode;}
return endElement;},getBookmark:function(type,normalized){return this.bookmarkManager.getBookmark(type,normalized);},moveToBookmark:function(bookmark){return this.bookmarkManager.moveToBookmark(bookmark);},select:function(node,content){var self=this,dom=self.dom,rng=dom.createRng(),idx;self.lastFocusBookmark=null;if(node){if(!content&&self.controlSelection.controlSelect(node)){return;}
idx=dom.nodeIndex(node);rng.setStart(node.parentNode,idx);rng.setEnd(node.parentNode,idx+1);if(content){self._moveEndPoint(rng,node,true);self._moveEndPoint(rng,node);}
self.setRng(rng);}
return node;},isCollapsed:function(){var self=this,rng=self.getRng(),sel=self.getSel();if(!rng||rng.item){return false;}
if(rng.compareEndPoints){return rng.compareEndPoints('StartToEnd',rng)===0;}
return!sel||rng.collapsed;},collapse:function(toStart){var self=this,rng=self.getRng(),node;if(rng.item){node=rng.item(0);rng=self.win.document.body.createTextRange();rng.moveToElementText(node);}
rng.collapse(!!toStart);self.setRng(rng);},getSel:function(){var win=this.win;return win.getSelection?win.getSelection():win.document.selection;},getRng:function(w3c){var self=this,selection,rng,elm,doc,ieRng,evt;function tryCompareBoundaryPoints(how,sourceRange,destinationRange){try{return sourceRange.compareBoundaryPoints(how,destinationRange);}catch(ex){return-1;}}
if(!self.win){return null;}
doc=self.win.document;if(!w3c&&self.lastFocusBookmark){var bookmark=self.lastFocusBookmark;if(bookmark.startContainer){rng=doc.createRange();rng.setStart(bookmark.startContainer,bookmark.startOffset);rng.setEnd(bookmark.endContainer,bookmark.endOffset);}else{rng=bookmark;}
return rng;}
if(w3c&&self.tridentSel){return self.tridentSel.getRangeAt(0);}
try{if((selection=self.getSel())){if(selection.rangeCount>0){rng=selection.getRangeAt(0);}else{rng=selection.createRange?selection.createRange():doc.createRange();}}}catch(ex){}
evt=self.editor.fire('GetSelectionRange',{range:rng});if(evt.range!==rng){return evt.range;}
if(isIE&&rng&&rng.setStart&&doc.selection){try{ieRng=doc.selection.createRange();}catch(ex){}
if(ieRng&&ieRng.item){elm=ieRng.item(0);rng=doc.createRange();rng.setStartBefore(elm);rng.setEndAfter(elm);}}
if(!rng){rng=doc.createRange?doc.createRange():doc.body.createTextRange();}
if(rng.setStart&&rng.startContainer.nodeType===9&&rng.collapsed){elm=self.dom.getRoot();rng.setStart(elm,0);rng.setEnd(elm,0);}
if(self.selectedRange&&self.explicitRange){if(tryCompareBoundaryPoints(rng.START_TO_START,rng,self.selectedRange)===0&&tryCompareBoundaryPoints(rng.END_TO_END,rng,self.selectedRange)===0){rng=self.explicitRange;}else{self.selectedRange=null;self.explicitRange=null;}}
return rng;},setRng:function(rng,forward){var self=this,sel,node,evt;if(!rng){return;}
if(rng.select){self.explicitRange=null;try{rng.select();}catch(ex){}
return;}
if(!self.tridentSel){sel=self.getSel();evt=self.editor.fire('SetSelectionRange',{range:rng});rng=evt.range;if(sel){self.explicitRange=rng;try{sel.removeAllRanges();sel.addRange(rng);}catch(ex){}
if(forward===false&&sel.extend){sel.collapse(rng.endContainer,rng.endOffset);sel.extend(rng.startContainer,rng.startOffset);}
self.selectedRange=sel.rangeCount>0?sel.getRangeAt(0):null;}
if(!rng.collapsed&&rng.startContainer==rng.endContainer&&sel.setBaseAndExtent&&!Env.ie){if(rng.endOffset-rng.startOffset<2){if(rng.startContainer.hasChildNodes()){node=rng.startContainer.childNodes[rng.startOffset];if(node&&node.tagName=='IMG'){self.getSel().setBaseAndExtent(node,0,node,1);}}}}}else{if(rng.cloneRange){try{self.tridentSel.addRange(rng);}catch(ex){}}}},setNode:function(elm){var self=this;self.setContent(self.dom.getOuterHTML(elm));return elm;},getNode:function(){var self=this,rng=self.getRng(),elm;var startContainer,endContainer,startOffset,endOffset,root=self.dom.getRoot();function skipEmptyTextNodes(node,forwards){var orig=node;while(node&&node.nodeType===3&&node.length===0){node=forwards?node.nextSibling:node.previousSibling;}
return node||orig;}
if(!rng){return root;}
startContainer=rng.startContainer;endContainer=rng.endContainer;startOffset=rng.startOffset;endOffset=rng.endOffset;if(rng.setStart){elm=rng.commonAncestorContainer;if(!rng.collapsed){if(startContainer==endContainer){if(endOffset-startOffset<2){if(startContainer.hasChildNodes()){elm=startContainer.childNodes[startOffset];}}}
if(startContainer.nodeType===3&&endContainer.nodeType===3){if(startContainer.length===startOffset){startContainer=skipEmptyTextNodes(startContainer.nextSibling,true);}else{startContainer=startContainer.parentNode;}
if(endOffset===0){endContainer=skipEmptyTextNodes(endContainer.previousSibling,false);}else{endContainer=endContainer.parentNode;}
if(startContainer&&startContainer===endContainer){return startContainer;}}}
if(elm&&elm.nodeType==3){return elm.parentNode;}
return elm;}
elm=rng.item?rng.item(0):rng.parentElement();if(elm.ownerDocument!==self.win.document){elm=root;}
return elm;},getSelectedBlocks:function(startElm,endElm){var self=this,dom=self.dom,node,root,selectedBlocks=[];root=dom.getRoot();startElm=dom.getParent(startElm||self.getStart(),dom.isBlock);endElm=dom.getParent(endElm||self.getEnd(),dom.isBlock);if(startElm&&startElm!=root){selectedBlocks.push(startElm);}
if(startElm&&endElm&&startElm!=endElm){node=startElm;var walker=new TreeWalker(startElm,root);while((node=walker.next())&&node!=endElm){if(dom.isBlock(node)){selectedBlocks.push(node);}}}
if(endElm&&startElm!=endElm&&endElm!=root){selectedBlocks.push(endElm);}
return selectedBlocks;},isForward:function(){var dom=this.dom,sel=this.getSel(),anchorRange,focusRange;if(!sel||!sel.anchorNode||!sel.focusNode){return true;}
anchorRange=dom.createRng();anchorRange.setStart(sel.anchorNode,sel.anchorOffset);anchorRange.collapse(true);focusRange=dom.createRng();focusRange.setStart(sel.focusNode,sel.focusOffset);focusRange.collapse(true);return anchorRange.compareBoundaryPoints(anchorRange.START_TO_START,focusRange)<=0;},normalize:function(){var self=this,rng=self.getRng();if(Env.range&&new RangeUtils(self.dom).normalize(rng)){self.setRng(rng,self.isForward());}
return rng;},selectorChanged:function(selector,callback){var self=this,currentSelectors;if(!self.selectorChangedData){self.selectorChangedData={};currentSelectors={};self.editor.on('NodeChange',function(e){var node=e.element,dom=self.dom,parents=dom.getParents(node,null,dom.getRoot()),matchedSelectors={};each(self.selectorChangedData,function(callbacks,selector){each(parents,function(node){if(dom.is(node,selector)){if(!currentSelectors[selector]){each(callbacks,function(callback){callback(true,{node:node,selector:selector,parents:parents});});currentSelectors[selector]=callbacks;}
matchedSelectors[selector]=callbacks;return false;}});});each(currentSelectors,function(callbacks,selector){if(!matchedSelectors[selector]){delete currentSelectors[selector];each(callbacks,function(callback){callback(false,{node:node,selector:selector,parents:parents});});}});});}
if(!self.selectorChangedData[selector]){self.selectorChangedData[selector]=[];}
self.selectorChangedData[selector].push(callback);return self;},getScrollContainer:function(){var scrollContainer,node=this.dom.getRoot();while(node&&node.nodeName!='BODY'){if(node.scrollHeight>node.clientHeight){scrollContainer=node;break;}
node=node.parentNode;}
return scrollContainer;},scrollIntoView:function(elm,alignToTop){var y,viewPort,self=this,dom=self.dom,root=dom.getRoot(),viewPortY,viewPortH,offsetY=0;function getPos(elm){var x=0,y=0;var offsetParent=elm;while(offsetParent&&offsetParent.nodeType){x+=offsetParent.offsetLeft||0;y+=offsetParent.offsetTop||0;offsetParent=offsetParent.offsetParent;}
return{x:x,y:y};}
if(!NodeType.isElement(elm)){return;}
if(alignToTop===false){offsetY=elm.offsetHeight;}
if(root.nodeName!='BODY'){var scrollContainer=self.getScrollContainer();if(scrollContainer){y=getPos(elm).y-getPos(scrollContainer).y+offsetY;viewPortH=scrollContainer.clientHeight;viewPortY=scrollContainer.scrollTop;if(y<viewPortY||y+25>viewPortY+viewPortH){scrollContainer.scrollTop=y<viewPortY?y:y-viewPortH+25;}
return;}}
viewPort=dom.getViewPort(self.editor.getWin());y=dom.getPos(elm).y+offsetY;viewPortY=viewPort.y;viewPortH=viewPort.h;if(y<viewPort.y||y+25>viewPortY+viewPortH){self.editor.getWin().scrollTo(0,y<viewPortY?y:y-viewPortH+25);}},placeCaretAt:function(clientX,clientY){this.setRng(RangeUtils.getCaretRangeFromPoint(clientX,clientY,this.editor.getDoc()));},_moveEndPoint:function(rng,node,start){var root=node,walker=new TreeWalker(node,root);var nonEmptyElementsMap=this.dom.schema.getNonEmptyElements();do{if(node.nodeType==3&&trim(node.nodeValue).length!==0){if(start){rng.setStart(node,0);}else{rng.setEnd(node,node.nodeValue.length);}
return;}
if(nonEmptyElementsMap[node.nodeName]&&!/^(TD|TH)$/.test(node.nodeName)){if(start){rng.setStartBefore(node);}else{if(node.nodeName=='BR'){rng.setEndBefore(node);}else{rng.setEndAfter(node);}}
return;}
if(Env.ie&&Env.ie<11&&this.dom.isBlock(node)&&this.dom.isEmpty(node)){if(start){rng.setStart(node,0);}else{rng.setEnd(node,0);}
return;}}while((node=(start?walker.next():walker.prev())));if(root.nodeName=='BODY'){if(start){rng.setStart(root,0);}else{rng.setEnd(root,root.childNodes.length);}}},destroy:function(){this.win=null;this.controlSelection.destroy();}};return Selection;});define("tinymce/dom/ElementUtils",["tinymce/dom/BookmarkManager","tinymce/util/Tools"],function(BookmarkManager,Tools){var each=Tools.each;function ElementUtils(dom){this.compare=function(node1,node2){if(node1.nodeName!=node2.nodeName){return false;}
function getAttribs(node){var attribs={};each(dom.getAttribs(node),function(attr){var name=attr.nodeName.toLowerCase();if(name.indexOf('_')!==0&&name!=='style'&&name!=='data-mce-style'&&name!='data-mce-fragment'){attribs[name]=dom.getAttrib(node,name);}});return attribs;}
function compareObjects(obj1,obj2){var value,name;for(name in obj1){if(obj1.hasOwnProperty(name)){value=obj2[name];if(typeof value=="undefined"){return false;}
if(obj1[name]!=value){return false;}
delete obj2[name];}}
for(name in obj2){if(obj2.hasOwnProperty(name)){return false;}}
return true;}
if(!compareObjects(getAttribs(node1),getAttribs(node2))){return false;}
if(!compareObjects(dom.parseStyle(dom.getAttrib(node1,'style')),dom.parseStyle(dom.getAttrib(node2,'style')))){return false;}
return!BookmarkManager.isBookmarkNode(node1)&&!BookmarkManager.isBookmarkNode(node2);};}
return ElementUtils;});define("tinymce/fmt/Preview",["tinymce/util/Tools"],function(Tools){var each=Tools.each;function getCssText(editor,format){var name,previewElm,dom=editor.dom;var previewCss='',parentFontSize,previewStyles;previewStyles=editor.settings.preview_styles;if(previewStyles===false){return '';}
if(!previewStyles){previewStyles='font-family font-size font-weight font-style text-decoration '+
'text-transform color background-color border border-radius outline text-shadow';}
function removeVars(val){return val.replace(/%(\w+)/g,'');}
if(typeof format=="string"){format=editor.formatter.get(format);if(!format){return;}
format=format[0];}
name=format.block||format.inline||'span';previewElm=dom.create(name);each(format.styles,function(value,name){value=removeVars(value);if(value){dom.setStyle(previewElm,name,value);}});each(format.attributes,function(value,name){value=removeVars(value);if(value){dom.setAttrib(previewElm,name,value);}});each(format.classes,function(value){value=removeVars(value);if(!dom.hasClass(previewElm,value)){dom.addClass(previewElm,value);}});editor.fire('PreviewFormats');dom.setStyles(previewElm,{position:'absolute',left:-0xFFFF});editor.getBody().appendChild(previewElm);parentFontSize=dom.getStyle(editor.getBody(),'fontSize',true);parentFontSize=/px$/.test(parentFontSize)?parseInt(parentFontSize,10):0;each(previewStyles.split(' '),function(name){var value=dom.getStyle(previewElm,name,true);if(name=='background-color'&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(value)){value=dom.getStyle(editor.getBody(),name,true);if(dom.toHex(value).toLowerCase()=='#ffffff'){return;}}
if(name=='color'){if(dom.toHex(value).toLowerCase()=='#000000'){return;}}
if(name=='font-size'){if(/em|%$/.test(value)){if(parentFontSize===0){return;}
value=parseFloat(value,10)/(/%$/.test(value)?100:1);value=(value*parentFontSize)+'px';}}
if(name=="border"&&value){previewCss+='padding:0 2px;';}
previewCss+=name+':'+value+';';});editor.fire('AfterPreviewFormats');dom.remove(previewElm);return previewCss;}
return{getCssText:getCssText};});define("tinymce/fmt/Hooks",["tinymce/util/Arr","tinymce/dom/NodeType","tinymce/dom/DomQuery"],function(Arr,NodeType,$){var postProcessHooks=[],filter=Arr.filter,each=Arr.each;function addPostProcessHook(name,hook){var hooks=postProcessHooks[name];if(!hooks){postProcessHooks[name]=hooks=[];}
postProcessHooks[name].push(hook);}
function postProcess(name,editor){each(postProcessHooks[name],function(hook){hook(editor);});}
addPostProcessHook("pre",function(editor){var rng=editor.selection.getRng(),isPre,blocks;function hasPreSibling(pre){return isPre(pre.previousSibling)&&Arr.indexOf(blocks,pre.previousSibling)!=-1;}
function joinPre(pre1,pre2){$(pre2).remove();$(pre1).append('<br><br>').append(pre2.childNodes);}
isPre=NodeType.matchNodeNames('pre');if(!rng.collapsed){blocks=editor.selection.getSelectedBlocks();each(filter(filter(blocks,isPre),hasPreSibling),function(pre){joinPre(pre.previousSibling,pre);});}});return{postProcess:postProcess};});define("tinymce/Formatter",["tinymce/dom/TreeWalker","tinymce/dom/RangeUtils","tinymce/dom/BookmarkManager","tinymce/dom/ElementUtils","tinymce/util/Tools","tinymce/fmt/Preview","tinymce/fmt/Hooks"],function(TreeWalker,RangeUtils,BookmarkManager,ElementUtils,Tools,Preview,Hooks){return function(ed){var formats={},dom=ed.dom,selection=ed.selection,rangeUtils=new RangeUtils(dom),isValid=ed.schema.isValidChild,isBlock=dom.isBlock,forcedRootBlock=ed.settings.forced_root_block,nodeIndex=dom.nodeIndex,INVISIBLE_CHAR='\uFEFF',MCE_ATTR_RE=/^(src|href|style)$/,FALSE=false,TRUE=true,formatChangeData,undef,getContentEditable=dom.getContentEditable,disableCaretContainer,markCaretContainersBogus,isBookmarkNode=BookmarkManager.isBookmarkNode;var each=Tools.each,grep=Tools.grep,walk=Tools.walk,extend=Tools.extend;function isTextBlock(name){if(name.nodeType){name=name.nodeName;}
return!!ed.schema.getTextBlockElements()[name.toLowerCase()];}
function isTableCell(node){return /^(TH|TD)$/.test(node.nodeName);}
function isInlineBlock(node){return node&&/^(IMG)$/.test(node.nodeName);}
function getParents(node,selector){return dom.getParents(node,selector,dom.getRoot());}
function isCaretNode(node){return node.nodeType===1&&node.id==='_mce_caret';}
function defaultFormats(){register({valigntop:[{selector:'td,th',styles:{'verticalAlign':'top'}}],valignmiddle:[{selector:'td,th',styles:{'verticalAlign':'middle'}}],valignbottom:[{selector:'td,th',styles:{'verticalAlign':'bottom'}}],alignleft:[{selector:'figure.image',collapsed:false,classes:'align-left',ceFalseOverride:true},{selector:'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',styles:{textAlign:'left'},inherit:false,defaultBlock:'div'},{selector:'img,table',collapsed:false,styles:{'float':'left'}}],aligncenter:[{selector:'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',styles:{textAlign:'center'},inherit:false,defaultBlock:'div'},{selector:'figure.image',collapsed:false,classes:'align-center',ceFalseOverride:true},{selector:'img',collapsed:false,styles:{display:'block',marginLeft:'auto',marginRight:'auto'}},{selector:'table',collapsed:false,styles:{marginLeft:'auto',marginRight:'auto'}}],alignright:[{selector:'figure.image',collapsed:false,classes:'align-right',ceFalseOverride:true},{selector:'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',styles:{textAlign:'right'},inherit:false,defaultBlock:'div'},{selector:'img,table',collapsed:false,styles:{'float':'right'}}],alignjustify:[{selector:'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',styles:{textAlign:'justify'},inherit:false,defaultBlock:'div'}],bold:[{inline:'strong',remove:'all'},{inline:'span',styles:{fontWeight:'bold'}},{inline:'b',remove:'all'}],italic:[{inline:'em',remove:'all'},{inline:'span',styles:{fontStyle:'italic'}},{inline:'i',remove:'all'}],underline:[{inline:'span',styles:{textDecoration:'underline'},exact:true},{inline:'u',remove:'all'}],strikethrough:[{inline:'span',styles:{textDecoration:'line-through'},exact:true},{inline:'strike',remove:'all'}],forecolor:{inline:'span',styles:{color:'%value'},links:true,remove_similar:true},hilitecolor:{inline:'span',styles:{backgroundColor:'%value'},links:true,remove_similar:true},fontname:{inline:'span',styles:{fontFamily:'%value'}},fontsize:{inline:'span',styles:{fontSize:'%value'}},fontsize_class:{inline:'span',attributes:{'class':'%value'}},blockquote:{block:'blockquote',wrapper:1,remove:'all'},subscript:{inline:'sub'},superscript:{inline:'sup'},code:{inline:'code'},link:{inline:'a',selector:'a',remove:'all',split:true,deep:true,onmatch:function(){return true;},onformat:function(elm,fmt,vars){each(vars,function(value,key){dom.setAttrib(elm,key,value);});}},removeformat:[{selector:'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',remove:'all',split:true,expand:false,block_expand:true,deep:true},{selector:'span',attributes:['style','class'],remove:'empty',split:true,expand:false,deep:true},{selector:'*',attributes:['style','class'],split:false,expand:false,deep:true}]});each('p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp'.split(/\s/),function(name){register(name,{block:name,remove:'all'});});register(ed.settings.formats);}
function addKeyboardShortcuts(){ed.addShortcut('meta+b','bold_desc','Bold');ed.addShortcut('meta+i','italic_desc','Italic');ed.addShortcut('meta+u','underline_desc','Underline');for(var i=1;i<=6;i++){ed.addShortcut('access+'+i,'',['FormatBlock',false,'h'+i]);}
ed.addShortcut('access+7','',['FormatBlock',false,'p']);ed.addShortcut('access+8','',['FormatBlock',false,'div']);ed.addShortcut('access+9','',['FormatBlock',false,'address']);}
function get(name){return name?formats[name]:formats;}
function register(name,format){if(name){if(typeof name!=='string'){each(name,function(format,name){register(name,format);});}else{format=format.length?format:[format];each(format,function(format){if(format.deep===undef){format.deep=!format.selector;}
if(format.split===undef){format.split=!format.selector||format.inline;}
if(format.remove===undef&&format.selector&&!format.inline){format.remove='none';}
if(format.selector&&format.inline){format.mixed=true;format.block_expand=true;}
if(typeof format.classes==='string'){format.classes=format.classes.split(/\s+/);}});formats[name]=format;}}}
function unregister(name){if(name&&formats[name]){delete formats[name];}
return formats;}
function matchesUnInheritedFormatSelector(node,name){var formatList=get(name);if(formatList){for(var i=0;i<formatList.length;i++){if(formatList[i].inherit===false&&dom.is(node,formatList[i].selector)){return true;}}}
return false;}
function getTextDecoration(node){var decoration;ed.dom.getParent(node,function(n){decoration=ed.dom.getStyle(n,'text-decoration');return decoration&&decoration!=='none';});return decoration;}
function processUnderlineAndColor(node){var textDecoration;if(node.nodeType===1&&node.parentNode&&node.parentNode.nodeType===1){textDecoration=getTextDecoration(node.parentNode);if(ed.dom.getStyle(node,'color')&&textDecoration){ed.dom.setStyle(node,'text-decoration',textDecoration);}else if(ed.dom.getStyle(node,'text-decoration')===textDecoration){ed.dom.setStyle(node,'text-decoration',null);}}}
function apply(name,vars,node){var formatList=get(name),format=formatList[0],bookmark,rng,isCollapsed=!node&&selection.isCollapsed();function setElementFormat(elm,fmt){fmt=fmt||format;if(elm){if(fmt.onformat){fmt.onformat(elm,fmt,vars,node);}
each(fmt.styles,function(value,name){dom.setStyle(elm,name,replaceVars(value,vars));});if(fmt.styles){var styleVal=dom.getAttrib(elm,'style');if(styleVal){elm.setAttribute('data-mce-style',styleVal);}}
each(fmt.attributes,function(value,name){dom.setAttrib(elm,name,replaceVars(value,vars));});each(fmt.classes,function(value){value=replaceVars(value,vars);if(!dom.hasClass(elm,value)){dom.addClass(elm,value);}});}}
function adjustSelectionToVisibleSelection(){function findSelectionEnd(start,end){var walker=new TreeWalker(end);for(node=walker.prev2();node;node=walker.prev2()){if(node.nodeType==3&&node.data.length>0){return node;}
if(node.childNodes.length>1||node==start||node.tagName=='BR'){return node;}}}
var rng=ed.selection.getRng();var start=rng.startContainer;var end=rng.endContainer;if(start!=end&&rng.endOffset===0){var newEnd=findSelectionEnd(start,end);var endOffset=newEnd.nodeType==3?newEnd.data.length:newEnd.childNodes.length;rng.setEnd(newEnd,endOffset);}
return rng;}
function applyRngStyle(rng,bookmark,node_specific){var newWrappers=[],wrapName,wrapElm,contentEditable=true;wrapName=format.inline||format.block;wrapElm=dom.create(wrapName);setElementFormat(wrapElm);rangeUtils.walk(rng,function(nodes){var currentWrapElm;function process(node){var nodeName,parentName,found,hasContentEditableState,lastContentEditable;lastContentEditable=contentEditable;nodeName=node.nodeName.toLowerCase();parentName=node.parentNode.nodeName.toLowerCase();if(node.nodeType===1&&getContentEditable(node)){lastContentEditable=contentEditable;contentEditable=getContentEditable(node)==="true";hasContentEditableState=true;}
if(isEq(nodeName,'br')){currentWrapElm=0;if(format.block){dom.remove(node);}
return;}
if(format.wrapper&&matchNode(node,name,vars)){currentWrapElm=0;return;}
if(contentEditable&&!hasContentEditableState&&format.block&&!format.wrapper&&isTextBlock(nodeName)&&isValid(parentName,wrapName)){node=dom.rename(node,wrapName);setElementFormat(node);newWrappers.push(node);currentWrapElm=0;return;}
if(format.selector){each(formatList,function(format){if('collapsed'in format&&format.collapsed!==isCollapsed){return;}
if(dom.is(node,format.selector)&&!isCaretNode(node)){setElementFormat(node,format);found=true;return false;}});if(!format.inline||found){currentWrapElm=0;return;}}
if(contentEditable&&!hasContentEditableState&&isValid(wrapName,nodeName)&&isValid(parentName,wrapName)&&!(!node_specific&&node.nodeType===3&&node.nodeValue.length===1&&node.nodeValue.charCodeAt(0)===65279)&&!isCaretNode(node)&&(!format.inline||!isBlock(node))){if(!currentWrapElm){currentWrapElm=dom.clone(wrapElm,FALSE);node.parentNode.insertBefore(currentWrapElm,node);newWrappers.push(currentWrapElm);}
currentWrapElm.appendChild(node);}else{currentWrapElm=0;each(grep(node.childNodes),process);if(hasContentEditableState){contentEditable=lastContentEditable;}
currentWrapElm=0;}}
each(nodes,process);});if(format.links===true){each(newWrappers,function(node){function process(node){if(node.nodeName==='A'){setElementFormat(node,format);}
each(grep(node.childNodes),process);}
process(node);});}
each(newWrappers,function(node){var childCount;function getChildCount(node){var count=0;each(node.childNodes,function(node){if(!isWhiteSpaceNode(node)&&!isBookmarkNode(node)){count++;}});return count;}
function mergeStyles(node){var child,clone;each(node.childNodes,function(node){if(node.nodeType==1&&!isBookmarkNode(node)&&!isCaretNode(node)){child=node;return FALSE;}});if(child&&!isBookmarkNode(child)&&matchName(child,format)){clone=dom.clone(child,FALSE);setElementFormat(clone);dom.replace(clone,node,TRUE);dom.remove(child,1);}
return clone||node;}
childCount=getChildCount(node);if((newWrappers.length>1||!isBlock(node))&&childCount===0){dom.remove(node,1);return;}
if(format.inline||format.wrapper){if(!format.exact&&childCount===1){node=mergeStyles(node);}
each(formatList,function(format){each(dom.select(format.inline,node),function(child){if(isBookmarkNode(child)){return;}
removeFormat(format,vars,child,format.exact?child:null);});});if(matchNode(node.parentNode,name,vars)){dom.remove(node,1);node=0;return TRUE;}
if(format.merge_with_parents){dom.getParent(node.parentNode,function(parent){if(matchNode(parent,name,vars)){dom.remove(node,1);node=0;return TRUE;}});}
if(node&&format.merge_siblings!==false){node=mergeSiblings(getNonWhiteSpaceSibling(node),node);node=mergeSiblings(node,getNonWhiteSpaceSibling(node,TRUE));}}});}
if(getContentEditable(selection.getNode())==="false"){node=selection.getNode();for(var i=0,l=formatList.length;i<l;i++){if(formatList[i].ceFalseOverride&&dom.is(node,formatList[i].selector)){setElementFormat(node,formatList[i]);return;}}
return;}
if(format){if(node){if(node.nodeType){rng=dom.createRng();rng.setStartBefore(node);rng.setEndAfter(node);applyRngStyle(expandRng(rng,formatList),null,true);}else{applyRngStyle(node,null,true);}}else{if(!isCollapsed||!format.inline||dom.select('td[data-mce-selected],th[data-mce-selected]').length){var curSelNode=ed.selection.getNode();if(!forcedRootBlock&&formatList[0].defaultBlock&&!dom.getParent(curSelNode,dom.isBlock)){apply(formatList[0].defaultBlock);}
ed.selection.setRng(adjustSelectionToVisibleSelection());bookmark=selection.getBookmark();applyRngStyle(expandRng(selection.getRng(TRUE),formatList),bookmark);if(format.styles&&(format.styles.color||format.styles.textDecoration)){walk(curSelNode,processUnderlineAndColor,'childNodes');processUnderlineAndColor(curSelNode);}
selection.moveToBookmark(bookmark);moveStart(selection.getRng(TRUE));ed.nodeChanged();}else{performCaretAction('apply',name,vars);}}
Hooks.postProcess(name,ed);}}
function remove(name,vars,node,similar){var formatList=get(name),format=formatList[0],bookmark,rng,contentEditable=true;function process(node){var children,i,l,lastContentEditable,hasContentEditableState;if(node.nodeType===1&&getContentEditable(node)){lastContentEditable=contentEditable;contentEditable=getContentEditable(node)==="true";hasContentEditableState=true;}
children=grep(node.childNodes);if(contentEditable&&!hasContentEditableState){for(i=0,l=formatList.length;i<l;i++){if(removeFormat(formatList[i],vars,node,node)){break;}}}
if(format.deep){if(children.length){for(i=0,l=children.length;i<l;i++){process(children[i]);}
if(hasContentEditableState){contentEditable=lastContentEditable;}}}}
function findFormatRoot(container){var formatRoot;each(getParents(container.parentNode).reverse(),function(parent){var format;if(!formatRoot&&parent.id!='_start'&&parent.id!='_end'){format=matchNode(parent,name,vars,similar);if(format&&format.split!==false){formatRoot=parent;}}});return formatRoot;}
function wrapAndSplit(formatRoot,container,target,split){var parent,clone,lastClone,firstClone,i,formatRootParent;if(formatRoot){formatRootParent=formatRoot.parentNode;for(parent=container.parentNode;parent&&parent!=formatRootParent;parent=parent.parentNode){clone=dom.clone(parent,FALSE);for(i=0;i<formatList.length;i++){if(removeFormat(formatList[i],vars,clone,clone)){clone=0;break;}}
if(clone){if(lastClone){clone.appendChild(lastClone);}
if(!firstClone){firstClone=clone;}
lastClone=clone;}}
if(split&&(!format.mixed||!isBlock(formatRoot))){container=dom.split(formatRoot,container);}
if(lastClone){target.parentNode.insertBefore(lastClone,target);firstClone.appendChild(target);}}
return container;}
function splitToFormatRoot(container){return wrapAndSplit(findFormatRoot(container),container,container,true);}
function unwrap(start){var node=dom.get(start?'_start':'_end'),out=node[start?'firstChild':'lastChild'];if(isBookmarkNode(out)){out=out[start?'firstChild':'lastChild'];}
if(out.nodeType==3&&out.data.length===0){out=start?node.previousSibling||node.nextSibling:node.nextSibling||node.previousSibling;}
dom.remove(node,true);return out;}
function removeRngStyle(rng){var startContainer,endContainer;var commonAncestorContainer=rng.commonAncestorContainer;rng=expandRng(rng,formatList,TRUE);if(format.split){startContainer=getContainer(rng,TRUE);endContainer=getContainer(rng);if(startContainer!=endContainer){if(/^(TR|TH|TD)$/.test(startContainer.nodeName)&&startContainer.firstChild){if(startContainer.nodeName=="TR"){startContainer=startContainer.firstChild.firstChild||startContainer;}else{startContainer=startContainer.firstChild||startContainer;}}
if(commonAncestorContainer&&/^T(HEAD|BODY|FOOT|R)$/.test(commonAncestorContainer.nodeName)&&isTableCell(endContainer)&&endContainer.firstChild){endContainer=endContainer.firstChild||endContainer;}
if(dom.isChildOf(startContainer,endContainer)&&!isBlock(endContainer)&&!isTableCell(startContainer)&&!isTableCell(endContainer)){startContainer=wrap(startContainer,'span',{id:'_start','data-mce-type':'bookmark'});splitToFormatRoot(startContainer);startContainer=unwrap(TRUE);return;}
startContainer=wrap(startContainer,'span',{id:'_start','data-mce-type':'bookmark'});endContainer=wrap(endContainer,'span',{id:'_end','data-mce-type':'bookmark'});splitToFormatRoot(startContainer);splitToFormatRoot(endContainer);startContainer=unwrap(TRUE);endContainer=unwrap();}else{startContainer=endContainer=splitToFormatRoot(startContainer);}
rng.startContainer=startContainer.parentNode?startContainer.parentNode:startContainer;rng.startOffset=nodeIndex(startContainer);rng.endContainer=endContainer.parentNode?endContainer.parentNode:endContainer;rng.endOffset=nodeIndex(endContainer)+1;}
rangeUtils.walk(rng,function(nodes){each(nodes,function(node){process(node);if(node.nodeType===1&&ed.dom.getStyle(node,'text-decoration')==='underline'&&node.parentNode&&getTextDecoration(node.parentNode)==='underline'){removeFormat({'deep':false,'exact':true,'inline':'span','styles':{'textDecoration':'underline'}},null,node);}});});}
if(node){if(node.nodeType){rng=dom.createRng();rng.setStartBefore(node);rng.setEndAfter(node);removeRngStyle(rng);}else{removeRngStyle(node);}
return;}
if(getContentEditable(selection.getNode())==="false"){node=selection.getNode();for(var i=0,l=formatList.length;i<l;i++){if(formatList[i].ceFalseOverride){if(removeFormat(formatList[i],vars,node,node)){break;}}}
return;}
if(!selection.isCollapsed()||!format.inline||dom.select('td[data-mce-selected],th[data-mce-selected]').length){bookmark=selection.getBookmark();removeRngStyle(selection.getRng(TRUE));selection.moveToBookmark(bookmark);if(format.inline&&match(name,vars,selection.getStart())){moveStart(selection.getRng(true));}
ed.nodeChanged();}else{performCaretAction('remove',name,vars,similar);}}
function toggle(name,vars,node){var fmt=get(name);if(match(name,vars,node)&&(!('toggle'in fmt[0])||fmt[0].toggle)){remove(name,vars,node);}else{apply(name,vars,node);}}
function matchNode(node,name,vars,similar){var formatList=get(name),format,i,classes;function matchItems(node,format,item_name){var key,value,items=format[item_name],i;if(format.onmatch){return format.onmatch(node,format,item_name);}
if(items){if(items.length===undef){for(key in items){if(items.hasOwnProperty(key)){if(item_name==='attributes'){value=dom.getAttrib(node,key);}else{value=getStyle(node,key);}
if(similar&&!value&&!format.exact){return;}
if((!similar||format.exact)&&!isEq(value,normalizeStyleValue(replaceVars(items[key],vars),key))){return;}}}}else{for(i=0;i<items.length;i++){if(item_name==='attributes'?dom.getAttrib(node,items[i]):getStyle(node,items[i])){return format;}}}}
return format;}
if(formatList&&node){for(i=0;i<formatList.length;i++){format=formatList[i];if(matchName(node,format)&&matchItems(node,format,'attributes')&&matchItems(node,format,'styles')){if((classes=format.classes)){for(i=0;i<classes.length;i++){if(!dom.hasClass(node,classes[i])){return;}}}
return format;}}}}
function match(name,vars,node){var startNode;function matchParents(node){var root=dom.getRoot();if(node===root){return false;}
node=dom.getParent(node,function(node){if(matchesUnInheritedFormatSelector(node,name)){return true;}
return node.parentNode===root||!!matchNode(node,name,vars,true);});return matchNode(node,name,vars);}
if(node){return matchParents(node);}
node=selection.getNode();if(matchParents(node)){return TRUE;}
startNode=selection.getStart();if(startNode!=node){if(matchParents(startNode)){return TRUE;}}
return FALSE;}
function matchAll(names,vars){var startElement,matchedFormatNames=[],checkedMap={};startElement=selection.getStart();dom.getParent(startElement,function(node){var i,name;for(i=0;i<names.length;i++){name=names[i];if(!checkedMap[name]&&matchNode(node,name,vars)){checkedMap[name]=true;matchedFormatNames.push(name);}}},dom.getRoot());return matchedFormatNames;}
function canApply(name){var formatList=get(name),startNode,parents,i,x,selector;if(formatList){startNode=selection.getStart();parents=getParents(startNode);for(x=formatList.length-1;x>=0;x--){selector=formatList[x].selector;if(!selector||formatList[x].defaultBlock){return TRUE;}
for(i=parents.length-1;i>=0;i--){if(dom.is(parents[i],selector)){return TRUE;}}}}
return FALSE;}
function formatChanged(formats,callback,similar){var currentFormats;if(!formatChangeData){formatChangeData={};currentFormats={};ed.on('NodeChange',function(e){var parents=getParents(e.element),matchedFormats={};parents=Tools.grep(parents,function(node){return node.nodeType==1&&!node.getAttribute('data-mce-bogus');});each(formatChangeData,function(callbacks,format){each(parents,function(node){if(matchNode(node,format,{},callbacks.similar)){if(!currentFormats[format]){each(callbacks,function(callback){callback(true,{node:node,format:format,parents:parents});});currentFormats[format]=callbacks;}
matchedFormats[format]=callbacks;return false;}
if(matchesUnInheritedFormatSelector(node,format)){return false;}});});each(currentFormats,function(callbacks,format){if(!matchedFormats[format]){delete currentFormats[format];each(callbacks,function(callback){callback(false,{node:e.element,format:format,parents:parents});});}});});}
each(formats.split(','),function(format){if(!formatChangeData[format]){formatChangeData[format]=[];formatChangeData[format].similar=similar;}
formatChangeData[format].push(callback);});return this;}
function getCssText(format){return Preview.getCssText(ed,format);}
extend(this,{get:get,register:register,unregister:unregister,apply:apply,remove:remove,toggle:toggle,match:match,matchAll:matchAll,matchNode:matchNode,canApply:canApply,formatChanged:formatChanged,getCssText:getCssText});defaultFormats();addKeyboardShortcuts();ed.on('BeforeGetContent',function(e){if(markCaretContainersBogus&&e.format!='raw'){markCaretContainersBogus();}});ed.on('mouseup keydown',function(e){if(disableCaretContainer){disableCaretContainer(e);}});function matchName(node,format){if(isEq(node,format.inline)){return TRUE;}
if(isEq(node,format.block)){return TRUE;}
if(format.selector){return node.nodeType==1&&dom.is(node,format.selector);}}
function isEq(str1,str2){str1=str1||'';str2=str2||'';str1=''+(str1.nodeName||str1);str2=''+(str2.nodeName||str2);return str1.toLowerCase()==str2.toLowerCase();}
function getStyle(node,name){return normalizeStyleValue(dom.getStyle(node,name),name);}
function normalizeStyleValue(value,name){if(name=='color'||name=='backgroundColor'){value=dom.toHex(value);}
if(name=='fontWeight'&&value==700){value='bold';}
if(name=='fontFamily'){value=value.replace(/[\'\"]/g,'').replace(/,\s+/g,',');}
return ''+value;}
function replaceVars(value,vars){if(typeof value!="string"){value=value(vars);}else if(vars){value=value.replace(/%(\w+)/g,function(str,name){return vars[name]||str;});}
return value;}
function isWhiteSpaceNode(node){return node&&node.nodeType===3&&/^([\t \r\n]+|)$/.test(node.nodeValue);}
function wrap(node,name,attrs){var wrapper=dom.create(name,attrs);node.parentNode.insertBefore(wrapper,node);wrapper.appendChild(node);return wrapper;}
function expandRng(rng,format,remove){var lastIdx,leaf,endPoint,startContainer=rng.startContainer,startOffset=rng.startOffset,endContainer=rng.endContainer,endOffset=rng.endOffset;function findParentContainer(start){var container,parent,sibling,siblingName,root;container=parent=start?startContainer:endContainer;siblingName=start?'previousSibling':'nextSibling';root=dom.getRoot();function isBogusBr(node){return node.nodeName=="BR"&&node.getAttribute('data-mce-bogus')&&!node.nextSibling;}
if(container.nodeType==3&&!isWhiteSpaceNode(container)){if(start?startOffset>0:endOffset<container.nodeValue.length){return container;}}
while(true){if(!format[0].block_expand&&isBlock(parent)){return parent;}
for(sibling=parent[siblingName];sibling;sibling=sibling[siblingName]){if(!isBookmarkNode(sibling)&&!isWhiteSpaceNode(sibling)&&!isBogusBr(sibling)){return parent;}}
if(parent==root||parent.parentNode==root){container=parent;break;}
parent=parent.parentNode;}
return container;}
function findLeaf(node,offset){if(offset===undef){offset=node.nodeType===3?node.length:node.childNodes.length;}
while(node&&node.hasChildNodes()){node=node.childNodes[offset];if(node){offset=node.nodeType===3?node.length:node.childNodes.length;}}
return{node:node,offset:offset};}
if(startContainer.nodeType==1&&startContainer.hasChildNodes()){lastIdx=startContainer.childNodes.length-1;startContainer=startContainer.childNodes[startOffset>lastIdx?lastIdx:startOffset];if(startContainer.nodeType==3){startOffset=0;}}
if(endContainer.nodeType==1&&endContainer.hasChildNodes()){lastIdx=endContainer.childNodes.length-1;endContainer=endContainer.childNodes[endOffset>lastIdx?lastIdx:endOffset-1];if(endContainer.nodeType==3){endOffset=endContainer.nodeValue.length;}}
function findParentContentEditable(node){var parent=node;while(parent){if(parent.nodeType===1&&getContentEditable(parent)){return getContentEditable(parent)==="false"?parent:node;}
parent=parent.parentNode;}
return node;}
function findWordEndPoint(container,offset,start){var walker,node,pos,lastTextNode;function findSpace(node,offset){var pos,pos2,str=node.nodeValue;if(typeof offset=="undefined"){offset=start?str.length:0;}
if(start){pos=str.lastIndexOf(' ',offset);pos2=str.lastIndexOf('\u00a0',offset);pos=pos>pos2?pos:pos2;if(pos!==-1&&!remove){pos++;}}else{pos=str.indexOf(' ',offset);pos2=str.indexOf('\u00a0',offset);pos=pos!==-1&&(pos2===-1||pos<pos2)?pos:pos2;}
return pos;}
if(container.nodeType===3){pos=findSpace(container,offset);if(pos!==-1){return{container:container,offset:pos};}
lastTextNode=container;}
walker=new TreeWalker(container,dom.getParent(container,isBlock)||ed.getBody());while((node=walker[start?'prev':'next']())){if(node.nodeType===3){lastTextNode=node;pos=findSpace(node);if(pos!==-1){return{container:node,offset:pos};}}else if(isBlock(node)){break;}}
if(lastTextNode){if(start){offset=0;}else{offset=lastTextNode.length;}
return{container:lastTextNode,offset:offset};}}
function findSelectorEndPoint(container,sibling_name){var parents,i,y,curFormat;if(container.nodeType==3&&container.nodeValue.length===0&&container[sibling_name]){container=container[sibling_name];}
parents=getParents(container);for(i=0;i<parents.length;i++){for(y=0;y<format.length;y++){curFormat=format[y];if("collapsed"in curFormat&&curFormat.collapsed!==rng.collapsed){continue;}
if(dom.is(parents[i],curFormat.selector)){return parents[i];}}}
return container;}
function findBlockEndPoint(container,sibling_name){var node,root=dom.getRoot();if(!format[0].wrapper){node=dom.getParent(container,format[0].block,root);}
if(!node){node=dom.getParent(container.nodeType==3?container.parentNode:container,function(node){return node!=root&&isTextBlock(node);});}
if(node&&format[0].wrapper){node=getParents(node,'ul,ol').reverse()[0]||node;}
if(!node){node=container;while(node[sibling_name]&&!isBlock(node[sibling_name])){node=node[sibling_name];if(isEq(node,'br')){break;}}}
return node||container;}
startContainer=findParentContentEditable(startContainer);endContainer=findParentContentEditable(endContainer);if(isBookmarkNode(startContainer.parentNode)||isBookmarkNode(startContainer)){startContainer=isBookmarkNode(startContainer)?startContainer:startContainer.parentNode;startContainer=startContainer.nextSibling||startContainer;if(startContainer.nodeType==3){startOffset=0;}}
if(isBookmarkNode(endContainer.parentNode)||isBookmarkNode(endContainer)){endContainer=isBookmarkNode(endContainer)?endContainer:endContainer.parentNode;endContainer=endContainer.previousSibling||endContainer;if(endContainer.nodeType==3){endOffset=endContainer.length;}}
if(format[0].inline){if(rng.collapsed){endPoint=findWordEndPoint(startContainer,startOffset,true);if(endPoint){startContainer=endPoint.container;startOffset=endPoint.offset;}
endPoint=findWordEndPoint(endContainer,endOffset);if(endPoint){endContainer=endPoint.container;endOffset=endPoint.offset;}}
leaf=findLeaf(endContainer,endOffset);if(leaf.node){while(leaf.node&&leaf.offset===0&&leaf.node.previousSibling){leaf=findLeaf(leaf.node.previousSibling);}
if(leaf.node&&leaf.offset>0&&leaf.node.nodeType===3&&leaf.node.nodeValue.charAt(leaf.offset-1)===' '){if(leaf.offset>1){endContainer=leaf.node;endContainer.splitText(leaf.offset-1);}}}}
if(format[0].inline||format[0].block_expand){if(!format[0].inline||(startContainer.nodeType!=3||startOffset===0)){startContainer=findParentContainer(true);}
if(!format[0].inline||(endContainer.nodeType!=3||endOffset===endContainer.nodeValue.length)){endContainer=findParentContainer();}}
if(format[0].selector&&format[0].expand!==FALSE&&!format[0].inline){startContainer=findSelectorEndPoint(startContainer,'previousSibling');endContainer=findSelectorEndPoint(endContainer,'nextSibling');}
if(format[0].block||format[0].selector){startContainer=findBlockEndPoint(startContainer,'previousSibling');endContainer=findBlockEndPoint(endContainer,'nextSibling');if(format[0].block){if(!isBlock(startContainer)){startContainer=findParentContainer(true);}
if(!isBlock(endContainer)){endContainer=findParentContainer();}}}
if(startContainer.nodeType==1){startOffset=nodeIndex(startContainer);startContainer=startContainer.parentNode;}
if(endContainer.nodeType==1){endOffset=nodeIndex(endContainer)+1;endContainer=endContainer.parentNode;}
return{startContainer:startContainer,startOffset:startOffset,endContainer:endContainer,endOffset:endOffset};}
function isColorFormatAndAnchor(node,format){return format.links&&node.tagName=='A';}
function removeFormat(format,vars,node,compare_node){var i,attrs,stylesModified;if(!matchName(node,format)&&!isColorFormatAndAnchor(node,format)){return FALSE;}
if(format.remove!='all'){each(format.styles,function(value,name){value=normalizeStyleValue(replaceVars(value,vars),name);if(typeof name==='number'){name=value;compare_node=0;}
if(format.remove_similar||(!compare_node||isEq(getStyle(compare_node,name),value))){dom.setStyle(node,name,'');}
stylesModified=1;});if(stylesModified&&dom.getAttrib(node,'style')===''){node.removeAttribute('style');node.removeAttribute('data-mce-style');}
each(format.attributes,function(value,name){var valueOut;value=replaceVars(value,vars);if(typeof name==='number'){name=value;compare_node=0;}
if(!compare_node||isEq(dom.getAttrib(compare_node,name),value)){if(name=='class'){value=dom.getAttrib(node,name);if(value){valueOut='';each(value.split(/\s+/),function(cls){if(/mce\-\w+/.test(cls)){valueOut+=(valueOut?' ':'')+cls;}});if(valueOut){dom.setAttrib(node,name,valueOut);return;}}}
if(name=="class"){node.removeAttribute('className');}
if(MCE_ATTR_RE.test(name)){node.removeAttribute('data-mce-'+name);}
node.removeAttribute(name);}});each(format.classes,function(value){value=replaceVars(value,vars);if(!compare_node||dom.hasClass(compare_node,value)){dom.removeClass(node,value);}});attrs=dom.getAttribs(node);for(i=0;i<attrs.length;i++){if(attrs[i].nodeName.indexOf('_')!==0){return FALSE;}}}
if(format.remove!='none'){removeNode(node,format);return TRUE;}}
function removeNode(node,format){var parentNode=node.parentNode,rootBlockElm;function find(node,next,inc){node=getNonWhiteSpaceSibling(node,next,inc);return!node||(node.nodeName=='BR'||isBlock(node));}
if(format.block){if(!forcedRootBlock){if(isBlock(node)&&!isBlock(parentNode)){if(!find(node,FALSE)&&!find(node.firstChild,TRUE,1)){node.insertBefore(dom.create('br'),node.firstChild);}
if(!find(node,TRUE)&&!find(node.lastChild,FALSE,1)){node.appendChild(dom.create('br'));}}}else{if(parentNode==dom.getRoot()){if(!format.list_block||!isEq(node,format.list_block)){each(grep(node.childNodes),function(node){if(isValid(forcedRootBlock,node.nodeName.toLowerCase())){if(!rootBlockElm){rootBlockElm=wrap(node,forcedRootBlock);dom.setAttribs(rootBlockElm,ed.settings.forced_root_block_attrs);}else{rootBlockElm.appendChild(node);}}else{rootBlockElm=0;}});}}}}
if(format.selector&&format.inline&&!isEq(format.inline,node)){return;}
dom.remove(node,1);}
function getNonWhiteSpaceSibling(node,next,inc){if(node){next=next?'nextSibling':'previousSibling';for(node=inc?node:node[next];node;node=node[next]){if(node.nodeType==1||!isWhiteSpaceNode(node)){return node;}}}}
function mergeSiblings(prev,next){var sibling,tmpSibling,elementUtils=new ElementUtils(dom);function findElementSibling(node,sibling_name){for(sibling=node;sibling;sibling=sibling[sibling_name]){if(sibling.nodeType==3&&sibling.nodeValue.length!==0){return node;}
if(sibling.nodeType==1&&!isBookmarkNode(sibling)){return sibling;}}
return node;}
if(prev&&next){prev=findElementSibling(prev,'previousSibling');next=findElementSibling(next,'nextSibling');if(elementUtils.compare(prev,next)){for(sibling=prev.nextSibling;sibling&&sibling!=next;){tmpSibling=sibling;sibling=sibling.nextSibling;prev.appendChild(tmpSibling);}
dom.remove(next);each(grep(next.childNodes),function(node){prev.appendChild(node);});return prev;}}
return next;}
function getContainer(rng,start){var container,offset,lastIdx;container=rng[start?'startContainer':'endContainer'];offset=rng[start?'startOffset':'endOffset'];if(container.nodeType==1){lastIdx=container.childNodes.length-1;if(!start&&offset){offset--;}
container=container.childNodes[offset>lastIdx?lastIdx:offset];}
if(container.nodeType===3&&start&&offset>=container.nodeValue.length){container=new TreeWalker(container,ed.getBody()).next()||container;}
if(container.nodeType===3&&!start&&offset===0){container=new TreeWalker(container,ed.getBody()).prev()||container;}
return container;}
function performCaretAction(type,name,vars,similar){var caretContainerId='_mce_caret',debug=ed.settings.caret_debug;function createCaretContainer(fill){var caretContainer=dom.create('span',{id:caretContainerId,'data-mce-bogus':true,style:debug?'color:red':''});if(fill){caretContainer.appendChild(ed.getDoc().createTextNode(INVISIBLE_CHAR));}
return caretContainer;}
function isCaretContainerEmpty(node,nodes){while(node){if((node.nodeType===3&&node.nodeValue!==INVISIBLE_CHAR)||node.childNodes.length>1){return false;}
if(nodes&&node.nodeType===1){nodes.push(node);}
node=node.firstChild;}
return true;}
function getParentCaretContainer(node){while(node){if(node.id===caretContainerId){return node;}
node=node.parentNode;}}
function findFirstTextNode(node){var walker;if(node){walker=new TreeWalker(node,node);for(node=walker.current();node;node=walker.next()){if(node.nodeType===3){return node;}}}}
function removeCaretContainer(node,move_caret){var child,rng;if(!node){node=getParentCaretContainer(selection.getStart());if(!node){while((node=dom.get(caretContainerId))){removeCaretContainer(node,false);}}}else{rng=selection.getRng(true);if(isCaretContainerEmpty(node)){if(move_caret!==false){rng.setStartBefore(node);rng.setEndBefore(node);}
dom.remove(node);}else{child=findFirstTextNode(node);if(child.nodeValue.charAt(0)===INVISIBLE_CHAR){child.deleteData(0,1);if(rng.startContainer==child&&rng.startOffset>0){rng.setStart(child,rng.startOffset-1);}
if(rng.endContainer==child&&rng.endOffset>0){rng.setEnd(child,rng.endOffset-1);}}
dom.remove(node,1);}
selection.setRng(rng);}}
function applyCaretFormat(){var rng,caretContainer,textNode,offset,bookmark,container,text;rng=selection.getRng(true);offset=rng.startOffset;container=rng.startContainer;text=container.nodeValue;caretContainer=getParentCaretContainer(selection.getStart());if(caretContainer){textNode=findFirstTextNode(caretContainer);}
if(text&&offset>0&&offset<text.length&&/\w/.test(text.charAt(offset))&&/\w/.test(text.charAt(offset-1))){bookmark=selection.getBookmark();rng.collapse(true);rng=expandRng(rng,get(name));rng=rangeUtils.split(rng);apply(name,vars,rng);selection.moveToBookmark(bookmark);}else{if(!caretContainer||textNode.nodeValue!==INVISIBLE_CHAR){caretContainer=createCaretContainer(true);textNode=caretContainer.firstChild;rng.insertNode(caretContainer);offset=1;apply(name,vars,caretContainer);}else{apply(name,vars,caretContainer);}
selection.setCursorLocation(textNode,offset);}}
function removeCaretFormat(){var rng=selection.getRng(true),container,offset,bookmark,hasContentAfter,node,formatNode,parents=[],i,caretContainer;container=rng.startContainer;offset=rng.startOffset;node=container;if(container.nodeType==3){if(offset!=container.nodeValue.length){hasContentAfter=true;}
node=node.parentNode;}
while(node){if(matchNode(node,name,vars,similar)){formatNode=node;break;}
if(node.nextSibling){hasContentAfter=true;}
parents.push(node);node=node.parentNode;}
if(!formatNode){return;}
if(hasContentAfter){bookmark=selection.getBookmark();rng.collapse(true);rng=expandRng(rng,get(name),true);rng=rangeUtils.split(rng);remove(name,vars,rng);selection.moveToBookmark(bookmark);}else{caretContainer=createCaretContainer();node=caretContainer;for(i=parents.length-1;i>=0;i--){node.appendChild(dom.clone(parents[i],false));node=node.firstChild;}
node.appendChild(dom.doc.createTextNode(INVISIBLE_CHAR));node=node.firstChild;var block=dom.getParent(formatNode,isTextBlock);if(block&&dom.isEmpty(block)){formatNode.parentNode.replaceChild(caretContainer,formatNode);}else{dom.insertAfter(caretContainer,formatNode);}
selection.setCursorLocation(node,1);if(dom.isEmpty(formatNode)){dom.remove(formatNode);}}}
function unmarkBogusCaretParents(){var caretContainer;caretContainer=getParentCaretContainer(selection.getStart());if(caretContainer&&!dom.isEmpty(caretContainer)){walk(caretContainer,function(node){if(node.nodeType==1&&node.id!==caretContainerId&&!dom.isEmpty(node)){dom.setAttrib(node,'data-mce-bogus',null);}},'childNodes');}}
if(!ed._hasCaretEvents){markCaretContainersBogus=function(){var nodes=[],i;if(isCaretContainerEmpty(getParentCaretContainer(selection.getStart()),nodes)){i=nodes.length;while(i--){dom.setAttrib(nodes[i],'data-mce-bogus','1');}}};disableCaretContainer=function(e){var keyCode=e.keyCode;removeCaretContainer();if(keyCode==8&&selection.isCollapsed()&&selection.getStart().innerHTML==INVISIBLE_CHAR){removeCaretContainer(getParentCaretContainer(selection.getStart()));}
if(keyCode==37||keyCode==39){removeCaretContainer(getParentCaretContainer(selection.getStart()));}
unmarkBogusCaretParents();};ed.on('SetContent',function(e){if(e.selection){unmarkBogusCaretParents();}});ed._hasCaretEvents=true;}
if(type=="apply"){applyCaretFormat();}else{removeCaretFormat();}}
function moveStart(rng){var container=rng.startContainer,offset=rng.startOffset,isAtEndOfText,walker,node,nodes,tmpNode;if(rng.startContainer==rng.endContainer){if(isInlineBlock(rng.startContainer.childNodes[rng.startOffset])){return;}}
if(container.nodeType==3&&offset>=container.nodeValue.length){offset=nodeIndex(container);container=container.parentNode;isAtEndOfText=true;}
if(container.nodeType==1){nodes=container.childNodes;container=nodes[Math.min(offset,nodes.length-1)];walker=new TreeWalker(container,dom.getParent(container,dom.isBlock));if(offset>nodes.length-1||isAtEndOfText){walker.next();}
for(node=walker.current();node;node=walker.next()){if(node.nodeType==3&&!isWhiteSpaceNode(node)){tmpNode=dom.create('a',{'data-mce-bogus':'all'},INVISIBLE_CHAR);node.parentNode.insertBefore(tmpNode,node);rng.setStart(node,0);selection.setRng(rng);dom.remove(tmpNode);return;}}}}};});define("tinymce/UndoManager",["tinymce/util/VK","tinymce/Env"],function(VK,Env){return function(editor){var self=this,index=0,data=[],beforeBookmark,isFirstTypedCharacter,locks=0;function getContent(){return editor.serializer.getTrimmedContent();}
function setDirty(state){editor.setDirty(state);}
function addNonTypingUndoLevel(e){self.typing=false;self.add({},e);}
editor.on('init',function(){self.add();});editor.on('BeforeExecCommand',function(e){var cmd=e.command;if(cmd!='Undo'&&cmd!='Redo'&&cmd!='mceRepaint'){self.beforeChange();}});editor.on('ExecCommand',function(e){var cmd=e.command;if(cmd!='Undo'&&cmd!='Redo'&&cmd!='mceRepaint'){addNonTypingUndoLevel(e);}});editor.on('ObjectResizeStart Cut',function(){self.beforeChange();});editor.on('SaveContent ObjectResized blur',addNonTypingUndoLevel);editor.on('DragEnd',addNonTypingUndoLevel);editor.on('KeyUp',function(e){var keyCode=e.keyCode;if(e.isDefaultPrevented()){return;}
if((keyCode>=33&&keyCode<=36)||(keyCode>=37&&keyCode<=40)||keyCode==45||keyCode==13||e.ctrlKey){addNonTypingUndoLevel();editor.nodeChanged();}
if(keyCode==46||keyCode==8||(Env.mac&&(keyCode==91||keyCode==93))){editor.nodeChanged();}
if(isFirstTypedCharacter&&self.typing){if(!editor.isDirty()){setDirty(data[0]&&getContent()!=data[0].content);if(editor.isDirty()){editor.fire('change',{level:data[0],lastLevel:null});}}
editor.fire('TypingUndo');isFirstTypedCharacter=false;editor.nodeChanged();}});editor.on('KeyDown',function(e){var keyCode=e.keyCode;if(e.isDefaultPrevented()){return;}
if((keyCode>=33&&keyCode<=36)||(keyCode>=37&&keyCode<=40)||keyCode==45){if(self.typing){addNonTypingUndoLevel(e);}
return;}
var modKey=(e.ctrlKey&&!e.altKey)||e.metaKey;if((keyCode<16||keyCode>20)&&keyCode!=224&&keyCode!=91&&!self.typing&&!modKey){self.beforeChange();self.typing=true;self.add({},e);isFirstTypedCharacter=true;}});editor.on('MouseDown',function(e){if(self.typing){addNonTypingUndoLevel(e);}});editor.addShortcut('meta+z','','Undo');editor.addShortcut('meta+y,meta+shift+z','','Redo');editor.on('AddUndo Undo Redo ClearUndos',function(e){if(!e.isDefaultPrevented()){editor.nodeChanged();}});self={data:data,typing:false,beforeChange:function(){if(!locks){beforeBookmark=editor.selection.getBookmark(2,true);}},add:function(level,event){var i,settings=editor.settings,lastLevel;level=level||{};level.content=getContent();if(locks||editor.removed){return null;}
lastLevel=data[index];if(editor.fire('BeforeAddUndo',{level:level,lastLevel:lastLevel,originalEvent:event}).isDefaultPrevented()){return null;}
if(lastLevel&&lastLevel.content==level.content){return null;}
if(data[index]){data[index].beforeBookmark=beforeBookmark;}
if(settings.custom_undo_redo_levels){if(data.length>settings.custom_undo_redo_levels){for(i=0;i<data.length-1;i++){data[i]=data[i+1];}
data.length--;index=data.length;}}
level.bookmark=editor.selection.getBookmark(2,true);if(index<data.length-1){data.length=index+1;}
data.push(level);index=data.length-1;var args={level:level,lastLevel:lastLevel,originalEvent:event};editor.fire('AddUndo',args);if(index>0){setDirty(true);editor.fire('change',args);}
return level;},undo:function(){var level;if(self.typing){self.add();self.typing=false;}
if(index>0){level=data[--index];editor.setContent(level.content,{format:'raw'});editor.selection.moveToBookmark(level.beforeBookmark);setDirty(true);editor.fire('undo',{level:level});}
return level;},redo:function(){var level;if(index<data.length-1){level=data[++index];editor.setContent(level.content,{format:'raw'});editor.selection.moveToBookmark(level.bookmark);setDirty(true);editor.fire('redo',{level:level});}
return level;},clear:function(){data=[];index=0;self.typing=false;editor.fire('ClearUndos');},hasUndo:function(){return index>0||(self.typing&&data[0]&&getContent()!=data[0].content);},hasRedo:function(){return index<data.length-1&&!this.typing;},transact:function(callback){self.beforeChange();try{locks++;callback();}finally{locks--;}
self.add();}};return self;};});define("tinymce/EnterKey",["tinymce/dom/TreeWalker","tinymce/dom/RangeUtils","tinymce/Env"],function(TreeWalker,RangeUtils,Env){var isIE=Env.ie&&Env.ie<11;return function(editor){var dom=editor.dom,selection=editor.selection,settings=editor.settings;var undoManager=editor.undoManager,schema=editor.schema,nonEmptyElementsMap=schema.getNonEmptyElements(),moveCaretBeforeOnEnterElementsMap=schema.getMoveCaretBeforeOnEnterElements();function handleEnterKey(evt){var rng,tmpRng,editableRoot,container,offset,parentBlock,documentMode,shiftKey,newBlock,fragment,containerBlock,parentBlockName,containerBlockName,newBlockName,isAfterLastNodeInContainer;function canSplitBlock(node){return node&&dom.isBlock(node)&&!/^(TD|TH|CAPTION|FORM)$/.test(node.nodeName)&&!/^(fixed|absolute)/i.test(node.style.position)&&dom.getContentEditable(node)!=="true";}
function isTableCell(node){return node&&/^(TD|TH|CAPTION)$/.test(node.nodeName);}
function renderBlockOnIE(block){var oldRng;if(dom.isBlock(block)){oldRng=selection.getRng();block.appendChild(dom.create('span',null,'\u00a0'));selection.select(block);block.lastChild.outerHTML='';selection.setRng(oldRng);}}
function trimInlineElementsOnLeftSideOfBlock(block){var node=block,firstChilds=[],i;if(!node){return;}
while((node=node.firstChild)){if(dom.isBlock(node)){return;}
if(node.nodeType==1&&!nonEmptyElementsMap[node.nodeName.toLowerCase()]){firstChilds.push(node);}}
i=firstChilds.length;while(i--){node=firstChilds[i];if(!node.hasChildNodes()||(node.firstChild==node.lastChild&&node.firstChild.nodeValue==='')){dom.remove(node);}else{if(node.nodeName=="A"&&(node.innerText||node.textContent)===' '){dom.remove(node);}}}}
function moveToCaretPosition(root){var walker,node,rng,lastNode=root,tempElm;function firstNonWhiteSpaceNodeSibling(node){while(node){if(node.nodeType==1||(node.nodeType==3&&node.data&&/[\r\n\s]/.test(node.data))){return node;}
node=node.nextSibling;}}
if(!root){return;}
if(Env.ie&&Env.ie<9&&parentBlock&&parentBlock.firstChild){if(parentBlock.firstChild==parentBlock.lastChild&&parentBlock.firstChild.tagName=='BR'){dom.remove(parentBlock.firstChild);}}
if(/^(LI|DT|DD)$/.test(root.nodeName)){var firstChild=firstNonWhiteSpaceNodeSibling(root.firstChild);if(firstChild&&/^(UL|OL|DL)$/.test(firstChild.nodeName)){root.insertBefore(dom.doc.createTextNode('\u00a0'),root.firstChild);}}
rng=dom.createRng();if(!Env.ie){root.normalize();}
if(root.hasChildNodes()){walker=new TreeWalker(root,root);while((node=walker.current())){if(node.nodeType==3){rng.setStart(node,0);rng.setEnd(node,0);break;}
if(moveCaretBeforeOnEnterElementsMap[node.nodeName.toLowerCase()]){rng.setStartBefore(node);rng.setEndBefore(node);break;}
lastNode=node;node=walker.next();}
if(!node){rng.setStart(lastNode,0);rng.setEnd(lastNode,0);}}else{if(root.nodeName=='BR'){if(root.nextSibling&&dom.isBlock(root.nextSibling)){if(!documentMode||documentMode<9){tempElm=dom.create('br');root.parentNode.insertBefore(tempElm,root);}
rng.setStartBefore(root);rng.setEndBefore(root);}else{rng.setStartAfter(root);rng.setEndAfter(root);}}else{rng.setStart(root,0);rng.setEnd(root,0);}}
selection.setRng(rng);dom.remove(tempElm);selection.scrollIntoView(root);}
function setForcedBlockAttrs(node){var forcedRootBlockName=settings.forced_root_block;if(forcedRootBlockName&&forcedRootBlockName.toLowerCase()===node.tagName.toLowerCase()){dom.setAttribs(node,settings.forced_root_block_attrs);}}
function emptyBlock(elm){elm.innerHTML=!isIE?'<br data-mce-bogus="1">':'';}
function createNewBlock(name){var node=container,block,clonedNode,caretNode,textInlineElements=schema.getTextInlineElements();if(name||parentBlockName=="TABLE"){block=dom.create(name||newBlockName);setForcedBlockAttrs(block);}else{block=parentBlock.cloneNode(false);}
caretNode=block;if(settings.keep_styles!==false){do{if(textInlineElements[node.nodeName]){if(node.id=='_mce_caret'){continue;}
clonedNode=node.cloneNode(false);dom.setAttrib(clonedNode,'id','');if(block.hasChildNodes()){clonedNode.appendChild(block.firstChild);block.appendChild(clonedNode);}else{caretNode=clonedNode;block.appendChild(clonedNode);}}}while((node=node.parentNode)&&node!=editableRoot);}
if(!isIE){caretNode.innerHTML='<br data-mce-bogus="1">';}
return block;}
function isCaretAtStartOrEndOfBlock(start){var walker,node,name;if(container.nodeType==3&&(start?offset>0:offset<container.nodeValue.length)){return false;}
if(container.parentNode==parentBlock&&isAfterLastNodeInContainer&&!start){return true;}
if(start&&container.nodeType==1&&container==parentBlock.firstChild){return true;}
if(container.nodeName==="TABLE"||(container.previousSibling&&container.previousSibling.nodeName=="TABLE")){return(isAfterLastNodeInContainer&&!start)||(!isAfterLastNodeInContainer&&start);}
walker=new TreeWalker(container,parentBlock);if(container.nodeType==3){if(start&&offset===0){walker.prev();}else if(!start&&offset==container.nodeValue.length){walker.next();}}
while((node=walker.current())){if(node.nodeType===1){if(!node.getAttribute('data-mce-bogus')){name=node.nodeName.toLowerCase();if(nonEmptyElementsMap[name]&&name!=='br'){return false;}}}else if(node.nodeType===3&&!/^[ \t\r\n]*$/.test(node.nodeValue)){return false;}
if(start){walker.prev();}else{walker.next();}}
return true;}
function wrapSelfAndSiblingsInDefaultBlock(container,offset){var newBlock,parentBlock,startNode,node,next,rootBlockName,blockName=newBlockName||'P';parentBlock=dom.getParent(container,dom.isBlock);if(!parentBlock||!canSplitBlock(parentBlock)){parentBlock=parentBlock||editableRoot;if(parentBlock==editor.getBody()||isTableCell(parentBlock)){rootBlockName=parentBlock.nodeName.toLowerCase();}else{rootBlockName=parentBlock.parentNode.nodeName.toLowerCase();}
if(!parentBlock.hasChildNodes()){newBlock=dom.create(blockName);setForcedBlockAttrs(newBlock);parentBlock.appendChild(newBlock);rng.setStart(newBlock,0);rng.setEnd(newBlock,0);return newBlock;}
node=container;while(node.parentNode!=parentBlock){node=node.parentNode;}
while(node&&!dom.isBlock(node)){startNode=node;node=node.previousSibling;}
if(startNode&&schema.isValidChild(rootBlockName,blockName.toLowerCase())){newBlock=dom.create(blockName);setForcedBlockAttrs(newBlock);startNode.parentNode.insertBefore(newBlock,startNode);node=startNode;while(node&&!dom.isBlock(node)){next=node.nextSibling;newBlock.appendChild(node);node=next;}
rng.setStart(container,offset);rng.setEnd(container,offset);}}
return container;}
function handleEmptyListItem(){function isFirstOrLastLi(first){var node=containerBlock[first?'firstChild':'lastChild'];while(node){if(node.nodeType==1){break;}
node=node[first?'nextSibling':'previousSibling'];}
return node===parentBlock;}
function getContainerBlock(){var containerBlockParent=containerBlock.parentNode;if(/^(LI|DT|DD)$/.test(containerBlockParent.nodeName)){return containerBlockParent;}
return containerBlock;}
if(containerBlock==editor.getBody()){return;}
var containerBlockParentName=containerBlock.parentNode.nodeName;if(/^(OL|UL|LI)$/.test(containerBlockParentName)){newBlockName='LI';}
newBlock=newBlockName?createNewBlock(newBlockName):dom.create('BR');if(isFirstOrLastLi(true)&&isFirstOrLastLi()){if(containerBlockParentName=='LI'){dom.insertAfter(newBlock,getContainerBlock());}else{dom.replace(newBlock,containerBlock);}}else if(isFirstOrLastLi(true)){if(containerBlockParentName=='LI'){dom.insertAfter(newBlock,getContainerBlock());newBlock.appendChild(dom.doc.createTextNode(' '));newBlock.appendChild(containerBlock);}else{containerBlock.parentNode.insertBefore(newBlock,containerBlock);}}else if(isFirstOrLastLi()){dom.insertAfter(newBlock,getContainerBlock());renderBlockOnIE(newBlock);}else{containerBlock=getContainerBlock();tmpRng=rng.cloneRange();tmpRng.setStartAfter(parentBlock);tmpRng.setEndAfter(containerBlock);fragment=tmpRng.extractContents();if(newBlockName=='LI'&&fragment.firstChild.nodeName=='LI'){newBlock=fragment.firstChild;dom.insertAfter(fragment,containerBlock);}else{dom.insertAfter(fragment,containerBlock);dom.insertAfter(newBlock,containerBlock);}}
dom.remove(parentBlock);moveToCaretPosition(newBlock);undoManager.add();}
function insertBr(){editor.execCommand("InsertLineBreak",false,evt);}
function trimLeadingLineBreaks(node){do{if(node.nodeType===3){node.nodeValue=node.nodeValue.replace(/^[\r\n]+/,'');}
node=node.firstChild;}while(node);}
function getEditableRoot(node){var root=dom.getRoot(),parent,editableRoot;parent=node;while(parent!==root&&dom.getContentEditable(parent)!=="false"){if(dom.getContentEditable(parent)==="true"){editableRoot=parent;}
parent=parent.parentNode;}
return parent!==root?editableRoot:root;}
function addBrToBlockIfNeeded(block){var lastChild;if(!isIE){block.normalize();lastChild=block.lastChild;if(!lastChild||(/^(left|right)$/gi.test(dom.getStyle(lastChild,'float',true)))){dom.add(block,'br');}}}
function insertNewBlockAfter(){if(/^(H[1-6]|PRE|FIGURE)$/.test(parentBlockName)&&containerBlockName!='HGROUP'){newBlock=createNewBlock(newBlockName);}else{newBlock=createNewBlock();}
if(settings.end_container_on_empty_block&&canSplitBlock(containerBlock)&&dom.isEmpty(parentBlock)){newBlock=dom.split(containerBlock,parentBlock);}else{dom.insertAfter(newBlock,parentBlock);}
moveToCaretPosition(newBlock);}
rng=selection.getRng(true);if(evt.isDefaultPrevented()){return;}
if(!rng.collapsed){editor.execCommand('Delete');return;}
new RangeUtils(dom).normalize(rng);container=rng.startContainer;offset=rng.startOffset;newBlockName=(settings.force_p_newlines?'p':'')||settings.forced_root_block;newBlockName=newBlockName?newBlockName.toUpperCase():'';documentMode=dom.doc.documentMode;shiftKey=evt.shiftKey;if(container.nodeType==1&&container.hasChildNodes()){isAfterLastNodeInContainer=offset>container.childNodes.length-1;container=container.childNodes[Math.min(offset,container.childNodes.length-1)]||container;if(isAfterLastNodeInContainer&&container.nodeType==3){offset=container.nodeValue.length;}else{offset=0;}}
editableRoot=getEditableRoot(container);if(!editableRoot){return;}
undoManager.beforeChange();if(!dom.isBlock(editableRoot)&&editableRoot!=dom.getRoot()){if(!newBlockName||shiftKey){insertBr();}
return;}
if((newBlockName&&!shiftKey)||(!newBlockName&&shiftKey)){container=wrapSelfAndSiblingsInDefaultBlock(container,offset);}
parentBlock=dom.getParent(container,dom.isBlock);containerBlock=parentBlock?dom.getParent(parentBlock.parentNode,dom.isBlock):null;parentBlockName=parentBlock?parentBlock.nodeName.toUpperCase():'';containerBlockName=containerBlock?containerBlock.nodeName.toUpperCase():'';if(containerBlockName=='LI'&&!evt.ctrlKey){parentBlock=containerBlock;parentBlockName=containerBlockName;}
if(/^(LI|DT|DD)$/.test(parentBlockName)){if(!newBlockName&&shiftKey){insertBr();return;}
if(dom.isEmpty(parentBlock)){handleEmptyListItem();return;}}
if(parentBlockName=='PRE'&&settings.br_in_pre!==false){if(!shiftKey){insertBr();return;}}else{if((!newBlockName&&!shiftKey&&parentBlockName!='LI')||(newBlockName&&shiftKey)){insertBr();return;}}
if(newBlockName&&parentBlock===editor.getBody()){return;}
newBlockName=newBlockName||'P';if(isCaretAtStartOrEndOfBlock()){insertNewBlockAfter();}else if(isCaretAtStartOrEndOfBlock(true)){newBlock=parentBlock.parentNode.insertBefore(createNewBlock(),parentBlock);renderBlockOnIE(newBlock);moveToCaretPosition(parentBlock);}else{tmpRng=rng.cloneRange();tmpRng.setEndAfter(parentBlock);fragment=tmpRng.extractContents();trimLeadingLineBreaks(fragment);newBlock=fragment.firstChild;dom.insertAfter(fragment,parentBlock);trimInlineElementsOnLeftSideOfBlock(newBlock);addBrToBlockIfNeeded(parentBlock);if(dom.isEmpty(parentBlock)){emptyBlock(parentBlock);}
newBlock.normalize();if(dom.isEmpty(newBlock)){dom.remove(newBlock);insertNewBlockAfter();}else{moveToCaretPosition(newBlock);}}
dom.setAttrib(newBlock,'id','');editor.fire('NewBlock',{newBlock:newBlock});undoManager.add();}
editor.on('keydown',function(evt){if(evt.keyCode==13){if(handleEnterKey(evt)!==false){evt.preventDefault();}}});};});define("tinymce/ForceBlocks",[],function(){return function(editor){var settings=editor.settings,dom=editor.dom,selection=editor.selection;var schema=editor.schema,blockElements=schema.getBlockElements();function addRootBlocks(){var node=selection.getStart(),rootNode=editor.getBody(),rng;var startContainer,startOffset,endContainer,endOffset,rootBlockNode;var tempNode,offset=-0xFFFFFF,wrapped,restoreSelection;var tmpRng,rootNodeName,forcedRootBlock;forcedRootBlock=settings.forced_root_block;if(!node||node.nodeType!==1||!forcedRootBlock){return;}
while(node&&node!=rootNode){if(blockElements[node.nodeName]){return;}
node=node.parentNode;}
rng=selection.getRng();if(rng.setStart){startContainer=rng.startContainer;startOffset=rng.startOffset;endContainer=rng.endContainer;endOffset=rng.endOffset;try{restoreSelection=editor.getDoc().activeElement===rootNode;}catch(ex){}}else{if(rng.item){node=rng.item(0);rng=editor.getDoc().body.createTextRange();rng.moveToElementText(node);}
restoreSelection=rng.parentElement().ownerDocument===editor.getDoc();tmpRng=rng.duplicate();tmpRng.collapse(true);startOffset=tmpRng.move('character',offset)*-1;if(!tmpRng.collapsed){tmpRng=rng.duplicate();tmpRng.collapse(false);endOffset=(tmpRng.move('character',offset)*-1)-startOffset;}}
node=rootNode.firstChild;rootNodeName=rootNode.nodeName.toLowerCase();while(node){if(((node.nodeType===3||(node.nodeType==1&&!blockElements[node.nodeName])))&&schema.isValidChild(rootNodeName,forcedRootBlock.toLowerCase())){if(node.nodeType===3&&node.nodeValue.length===0){tempNode=node;node=node.nextSibling;dom.remove(tempNode);continue;}
if(!rootBlockNode){rootBlockNode=dom.create(forcedRootBlock,editor.settings.forced_root_block_attrs);node.parentNode.insertBefore(rootBlockNode,node);wrapped=true;}
tempNode=node;node=node.nextSibling;rootBlockNode.appendChild(tempNode);}else{rootBlockNode=null;node=node.nextSibling;}}
if(wrapped&&restoreSelection){if(rng.setStart){rng.setStart(startContainer,startOffset);rng.setEnd(endContainer,endOffset);selection.setRng(rng);}else{try{rng=editor.getDoc().body.createTextRange();rng.moveToElementText(rootNode);rng.collapse(true);rng.moveStart('character',startOffset);if(endOffset>0){rng.moveEnd('character',endOffset);}
rng.select();}catch(ex){}}
editor.nodeChanged();}}
if(settings.forced_root_block){editor.on('NodeChange',addRootBlocks);}};});define("tinymce/caret/CaretUtils",["tinymce/util/Fun","tinymce/dom/TreeWalker","tinymce/dom/NodeType","tinymce/caret/CaretPosition","tinymce/caret/CaretContainer","tinymce/caret/CaretCandidate"],function(Fun,TreeWalker,NodeType,CaretPosition,CaretContainer,CaretCandidate){var isContentEditableTrue=NodeType.isContentEditableTrue,isContentEditableFalse=NodeType.isContentEditableFalse,isBlockLike=NodeType.matchStyleValues('display','block table table-cell table-caption'),isCaretContainer=CaretContainer.isCaretContainer,curry=Fun.curry,isElement=NodeType.isElement,isCaretCandidate=CaretCandidate.isCaretCandidate;function isForwards(direction){return direction>0;}
function isBackwards(direction){return direction<0;}
function findNode(node,direction,predicateFn,rootNode,shallow){var walker=new TreeWalker(node,rootNode);if(isBackwards(direction)){if(isContentEditableFalse(node)){node=walker.prev(true);if(predicateFn(node)){return node;}}
while((node=walker.prev(shallow))){if(predicateFn(node)){return node;}}}
if(isForwards(direction)){if(isContentEditableFalse(node)){node=walker.next(true);if(predicateFn(node)){return node;}}
while((node=walker.next(shallow))){if(predicateFn(node)){return node;}}}
return null;}
function getEditingHost(node,rootNode){for(node=node.parentNode;node&&node!=rootNode;node=node.parentNode){if(isContentEditableTrue(node)){return node;}}
return rootNode;}
function getParentBlock(node,rootNode){while(node&&node!=rootNode){if(isBlockLike(node)){return node;}
node=node.parentNode;}
return null;}
function isInSameBlock(caretPosition1,caretPosition2,rootNode){return getParentBlock(caretPosition1.container(),rootNode)==getParentBlock(caretPosition2.container(),rootNode);}
function isInSameEditingHost(caretPosition1,caretPosition2,rootNode){return getEditingHost(caretPosition1.container(),rootNode)==getEditingHost(caretPosition2.container(),rootNode);}
function getChildNodeAtRelativeOffset(relativeOffset,caretPosition){var container,offset;if(!caretPosition){return null;}
container=caretPosition.container();offset=caretPosition.offset();if(!isElement(container)){return null;}
return container.childNodes[offset+relativeOffset];}
function beforeAfter(before,node){var range=node.ownerDocument.createRange();if(before){range.setStartBefore(node);range.setEndBefore(node);}else{range.setStartAfter(node);range.setEndAfter(node);}
return range;}
function isNodesInSameBlock(rootNode,node1,node2){return getParentBlock(node1,rootNode)==getParentBlock(node2,rootNode);}
function lean(left,rootNode,node){var sibling,siblingName;if(left){siblingName='previousSibling';}else{siblingName='nextSibling';}
while(node&&node!=rootNode){sibling=node[siblingName];if(isCaretContainer(sibling)){sibling=sibling[siblingName];}
if(isContentEditableFalse(sibling)){if(isNodesInSameBlock(rootNode,sibling,node)){return sibling;}
break;}
if(isCaretCandidate(sibling)){break;}
node=node.parentNode;}
return null;}
var before=curry(beforeAfter,true);var after=curry(beforeAfter,false);function normalizeRange(direction,rootNode,range){var node,container,offset,location;var leanLeft=curry(lean,true,rootNode);var leanRight=curry(lean,false,rootNode);container=range.startContainer;offset=range.startOffset;if(CaretContainer.isCaretContainerBlock(container)){if(!isElement(container)){container=container.parentNode;}
location=container.getAttribute('data-mce-caret');if(location=='before'){node=container.nextSibling;if(isContentEditableFalse(node)){return before(node);}}
if(location=='after'){node=container.previousSibling;if(isContentEditableFalse(node)){return after(node);}}}
if(!range.collapsed){return range;}
if(NodeType.isText(container)){if(isCaretContainer(container)){if(direction===1){node=leanRight(container);if(node){return before(node);}
node=leanLeft(container);if(node){return after(node);}}
if(direction===-1){node=leanLeft(container);if(node){return after(node);}
node=leanRight(container);if(node){return before(node);}}
return range;}
if(CaretContainer.endsWithCaretContainer(container)&&offset>=container.data.length-1){if(direction===1){node=leanRight(container);if(node){return before(node);}}
return range;}
if(CaretContainer.startsWithCaretContainer(container)&&offset<=1){if(direction===-1){node=leanLeft(container);if(node){return after(node);}}
return range;}
if(offset===container.data.length){node=leanRight(container);if(node){return before(node);}
return range;}
if(offset===0){node=leanLeft(container);if(node){return after(node);}
return range;}}
return range;}
function isNextToContentEditableFalse(relativeOffset,caretPosition){return isContentEditableFalse(getChildNodeAtRelativeOffset(relativeOffset,caretPosition));}
return{isForwards:isForwards,isBackwards:isBackwards,findNode:findNode,getEditingHost:getEditingHost,getParentBlock:getParentBlock,isInSameBlock:isInSameBlock,isInSameEditingHost:isInSameEditingHost,isBeforeContentEditableFalse:curry(isNextToContentEditableFalse,0),isAfterContentEditableFalse:curry(isNextToContentEditableFalse,-1),normalizeRange:normalizeRange};});define("tinymce/caret/CaretWalker",["tinymce/dom/NodeType","tinymce/caret/CaretCandidate","tinymce/caret/CaretPosition","tinymce/caret/CaretUtils","tinymce/util/Arr","tinymce/util/Fun"],function(NodeType,CaretCandidate,CaretPosition,CaretUtils,Arr,Fun){var isContentEditableFalse=NodeType.isContentEditableFalse,isText=NodeType.isText,isElement=NodeType.isElement,isBr=NodeType.isBr,isForwards=CaretUtils.isForwards,isBackwards=CaretUtils.isBackwards,isCaretCandidate=CaretCandidate.isCaretCandidate,isAtomic=CaretCandidate.isAtomic,isEditableCaretCandidate=CaretCandidate.isEditableCaretCandidate;function getParents(node,rootNode){var parents=[];while(node&&node!=rootNode){parents.push(node);node=node.parentNode;}
return parents;}
function nodeAtIndex(container,offset){if(container.hasChildNodes()&&offset<container.childNodes.length){return container.childNodes[offset];}
return null;}
function getCaretCandidatePosition(direction,node){if(isForwards(direction)){if(isCaretCandidate(node.previousSibling)&&!isText(node.previousSibling)){return CaretPosition.before(node);}
if(isText(node)){return CaretPosition(node,0);}}
if(isBackwards(direction)){if(isCaretCandidate(node.nextSibling)&&!isText(node.nextSibling)){return CaretPosition.after(node);}
if(isText(node)){return CaretPosition(node,node.data.length);}}
if(isBackwards(direction)){if(isBr(node)){return CaretPosition.before(node);}
return CaretPosition.after(node);}
return CaretPosition.before(node);}
function isBrBeforeBlock(node,rootNode){var next;if(!NodeType.isBr(node)){return false;}
next=findCaretPosition(1,CaretPosition.after(node),rootNode);if(!next){return false;}
return!CaretUtils.isInSameBlock(CaretPosition.before(node),CaretPosition.before(next),rootNode);}
function findCaretPosition(direction,startCaretPosition,rootNode){var container,offset,node,nextNode,innerNode,rootContentEditableFalseElm,caretPosition;if(!isElement(rootNode)||!startCaretPosition){return null;}
caretPosition=startCaretPosition;container=caretPosition.container();offset=caretPosition.offset();if(isText(container)){if(isBackwards(direction)&&offset>0){return CaretPosition(container,--offset);}
if(isForwards(direction)&&offset<container.length){return CaretPosition(container,++offset);}
node=container;}else{if(isBackwards(direction)&&offset>0){nextNode=nodeAtIndex(container,offset-1);if(isCaretCandidate(nextNode)){if(!isAtomic(nextNode)){innerNode=CaretUtils.findNode(nextNode,direction,isEditableCaretCandidate,nextNode);if(innerNode){if(isText(innerNode)){return CaretPosition(innerNode,innerNode.data.length);}
return CaretPosition.after(innerNode);}}
if(isText(nextNode)){return CaretPosition(nextNode,nextNode.data.length);}
return CaretPosition.before(nextNode);}}
if(isForwards(direction)&&offset<container.childNodes.length){nextNode=nodeAtIndex(container,offset);if(isCaretCandidate(nextNode)){if(isBrBeforeBlock(nextNode,rootNode)){return findCaretPosition(direction,CaretPosition.after(nextNode),rootNode);}
if(!isAtomic(nextNode)){innerNode=CaretUtils.findNode(nextNode,direction,isEditableCaretCandidate,nextNode);if(innerNode){if(isText(innerNode)){return CaretPosition(innerNode,0);}
return CaretPosition.before(innerNode);}}
if(isText(nextNode)){return CaretPosition(nextNode,0);}
return CaretPosition.after(nextNode);}}
node=caretPosition.getNode();}
if((isForwards(direction)&&caretPosition.isAtEnd())||(isBackwards(direction)&&caretPosition.isAtStart())){node=CaretUtils.findNode(node,direction,Fun.constant(true),rootNode,true);if(isEditableCaretCandidate(node)){return getCaretCandidatePosition(direction,node);}}
nextNode=CaretUtils.findNode(node,direction,isEditableCaretCandidate,rootNode);rootContentEditableFalseElm=Arr.last(Arr.filter(getParents(container,rootNode),isContentEditableFalse));if(rootContentEditableFalseElm&&(!nextNode||!rootContentEditableFalseElm.contains(nextNode))){if(isForwards(direction)){caretPosition=CaretPosition.after(rootContentEditableFalseElm);}else{caretPosition=CaretPosition.before(rootContentEditableFalseElm);}
return caretPosition;}
if(nextNode){return getCaretCandidatePosition(direction,nextNode);}
return null;}
return function(rootNode){return{next:function(caretPosition){return findCaretPosition(1,caretPosition,rootNode);},prev:function(caretPosition){return findCaretPosition(-1,caretPosition,rootNode);}};};});define("tinymce/InsertList",["tinymce/util/Tools","tinymce/caret/CaretWalker","tinymce/caret/CaretPosition"],function(Tools,CaretWalker,CaretPosition){var isListFragment=function(fragment){var firstChild=fragment.firstChild;var lastChild=fragment.lastChild;if(firstChild&&firstChild.name==='meta'){firstChild=firstChild.next;}
if(lastChild&&lastChild.attr('id')==='mce_marker'){lastChild=lastChild.prev;}
if(!firstChild||firstChild!==lastChild){return false;}
return firstChild.name==='ul'||firstChild.name==='ol';};var cleanupDomFragment=function(domFragment){var firstChild=domFragment.firstChild;var lastChild=domFragment.lastChild;if(firstChild&&firstChild.nodeName==='META'){firstChild.parentNode.removeChild(firstChild);}
if(lastChild&&lastChild.id==='mce_marker'){lastChild.parentNode.removeChild(lastChild);}
return domFragment;};var toDomFragment=function(dom,serializer,fragment){var html=serializer.serialize(fragment);var domFragment=dom.createFragment(html);return cleanupDomFragment(domFragment);};var listItems=function(elm){return Tools.grep(elm.childNodes,function(child){return child.nodeName==='LI';});};var isEmpty=function(elm){return!elm.firstChild;};var trimListItems=function(elms){return elms.length>0&&isEmpty(elms[elms.length-1])?elms.slice(0,-1):elms;};var getParentLi=function(dom,node){var parentBlock=dom.getParent(node,dom.isBlock);return parentBlock&&parentBlock.nodeName==='LI'?parentBlock:null;};var isParentBlockLi=function(dom,node){return!!getParentLi(dom,node);};var getSplit=function(parentNode,rng){var beforeRng=rng.cloneRange();var afterRng=rng.cloneRange();beforeRng.setStartBefore(parentNode);afterRng.setEndAfter(parentNode);return[beforeRng.cloneContents(),afterRng.cloneContents()];};var findFirstIn=function(node,rootNode){var caretPos=CaretPosition.before(node);var caretWalker=new CaretWalker(rootNode);var newCaretPos=caretWalker.next(caretPos);return newCaretPos?newCaretPos.toRange():null;};var findLastOf=function(node,rootNode){var caretPos=CaretPosition.after(node);var caretWalker=new CaretWalker(rootNode);var newCaretPos=caretWalker.prev(caretPos);return newCaretPos?newCaretPos.toRange():null;};var insertMiddle=function(target,elms,rootNode,rng){var parts=getSplit(target,rng);var parentElm=target.parentNode;parentElm.insertBefore(parts[0],target);Tools.each(elms,function(li){parentElm.insertBefore(li,target);});parentElm.insertBefore(parts[1],target);parentElm.removeChild(target);return findLastOf(elms[elms.length-1],rootNode);};var insertBefore=function(target,elms,rootNode){var parentElm=target.parentNode;Tools.each(elms,function(elm){parentElm.insertBefore(elm,target);});return findFirstIn(target,rootNode);};var insertAfter=function(target,elms,rootNode,dom){dom.insertAfter(elms.reverse(),target);return findLastOf(elms[0],rootNode);};var insertAtCaret=function(serializer,dom,rng,fragment){var domFragment=toDomFragment(dom,serializer,fragment);var liTarget=getParentLi(dom,rng.startContainer);var liElms=trimListItems(listItems(domFragment.firstChild));var BEGINNING=1,END=2;var rootNode=dom.getRoot();var isAt=function(location){var caretPos=CaretPosition.fromRangeStart(rng);var caretWalker=new CaretWalker(dom.getRoot());var newPos=location===BEGINNING?caretWalker.prev(caretPos):caretWalker.next(caretPos);return newPos?getParentLi(dom,newPos.getNode())!==liTarget:true;};if(isAt(BEGINNING)){return insertBefore(liTarget,liElms,rootNode);}else if(isAt(END)){return insertAfter(liTarget,liElms,rootNode,dom);}
return insertMiddle(liTarget,liElms,rootNode,rng);};return{isListFragment:isListFragment,insertAtCaret:insertAtCaret,isParentBlockLi:isParentBlockLi,trimListItems:trimListItems,listItems:listItems};});define("tinymce/InsertContent",["tinymce/Env","tinymce/util/Tools","tinymce/html/Serializer","tinymce/caret/CaretWalker","tinymce/caret/CaretPosition","tinymce/dom/ElementUtils","tinymce/dom/NodeType","tinymce/InsertList"],function(Env,Tools,Serializer,CaretWalker,CaretPosition,ElementUtils,NodeType,InsertList){var isTableCell=NodeType.matchNodeNames('td th');var insertAtCaret=function(editor,value){var parser,serializer,parentNode,rootNode,fragment,args;var marker,rng,node,node2,bookmarkHtml,merge,data;var textInlineElements=editor.schema.getTextInlineElements();var selection=editor.selection,dom=editor.dom;function trimOrPaddLeftRight(html){var rng,container,offset;rng=selection.getRng(true);container=rng.startContainer;offset=rng.startOffset;function hasSiblingText(siblingName){return container[siblingName]&&container[siblingName].nodeType==3;}
if(container.nodeType==3){if(offset>0){html=html.replace(/^&nbsp;/,' ');}else if(!hasSiblingText('previousSibling')){html=html.replace(/^ /,'&nbsp;');}
if(offset<container.length){html=html.replace(/&nbsp;(<br>|)$/,' ');}else if(!hasSiblingText('nextSibling')){html=html.replace(/(&nbsp;| )(<br>|)$/,'&nbsp;');}}
return html;}
function trimNbspAfterDeleteAndPaddValue(){var rng,container,offset;rng=selection.getRng(true);container=rng.startContainer;offset=rng.startOffset;if(container.nodeType==3&&rng.collapsed){if(container.data[offset]==='\u00a0'){container.deleteData(offset,1);if(!/[\u00a0| ]$/.test(value)){value+=' ';}}else if(container.data[offset-1]==='\u00a0'){container.deleteData(offset-1,1);if(!/[\u00a0| ]$/.test(value)){value=' '+value;}}}}
function markInlineFormatElements(fragment){if(merge){for(node=fragment.firstChild;node;node=node.walk(true)){if(textInlineElements[node.name]){node.attr('data-mce-new',"true");}}}}
function reduceInlineTextElements(){if(merge){var root=editor.getBody(),elementUtils=new ElementUtils(dom);Tools.each(dom.select('*[data-mce-new]'),function(node){node.removeAttribute('data-mce-new');for(var testNode=node.parentNode;testNode&&testNode!=root;testNode=testNode.parentNode){if(elementUtils.compare(testNode,node)){dom.remove(node,true);}}});}}
function markFragmentElements(fragment){var node=fragment;while((node=node.walk())){if(node.type===1){node.attr('data-mce-fragment','1');}}}
function umarkFragmentElements(elm){Tools.each(elm.getElementsByTagName('*'),function(elm){elm.removeAttribute('data-mce-fragment');});}
function isPartOfFragment(node){return!!node.getAttribute('data-mce-fragment');}
function canHaveChildren(node){return node&&!editor.schema.getShortEndedElements()[node.nodeName];}
function moveSelectionToMarker(marker){var parentEditableFalseElm,parentBlock,nextRng;function getContentEditableFalseParent(node){var root=editor.getBody();for(;node&&node!==root;node=node.parentNode){if(editor.dom.getContentEditable(node)==='false'){return node;}}
return null;}
if(!marker){return;}
selection.scrollIntoView(marker);parentEditableFalseElm=getContentEditableFalseParent(marker);if(parentEditableFalseElm){dom.remove(marker);selection.select(parentEditableFalseElm);return;}
rng=dom.createRng();node=marker.previousSibling;if(node&&node.nodeType==3){rng.setStart(node,node.nodeValue.length);if(!Env.ie){node2=marker.nextSibling;if(node2&&node2.nodeType==3){node.appendData(node2.data);node2.parentNode.removeChild(node2);}}}else{rng.setStartBefore(marker);rng.setEndBefore(marker);}
function findNextCaretRng(rng){var caretPos=CaretPosition.fromRangeStart(rng);var caretWalker=new CaretWalker(editor.getBody());caretPos=caretWalker.next(caretPos);if(caretPos){return caretPos.toRange();}}
parentBlock=dom.getParent(marker,dom.isBlock);dom.remove(marker);if(parentBlock&&dom.isEmpty(parentBlock)){editor.$(parentBlock).empty();rng.setStart(parentBlock,0);rng.setEnd(parentBlock,0);if(!isTableCell(parentBlock)&&!isPartOfFragment(parentBlock)&&(nextRng=findNextCaretRng(rng))){rng=nextRng;dom.remove(parentBlock);}else{dom.add(parentBlock,dom.create('br',{'data-mce-bogus':'1'}));}}
selection.setRng(rng);}
if(typeof value!='string'){merge=value.merge;data=value.data;value=value.content;}
if(/^ | $/.test(value)){value=trimOrPaddLeftRight(value);}
parser=editor.parser;serializer=new Serializer({validate:editor.settings.validate},editor.schema);bookmarkHtml='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>';args={content:value,format:'html',selection:true};editor.fire('BeforeSetContent',args);value=args.content;if(value.indexOf('{$caret}')==-1){value+='{$caret}';}
value=value.replace(/\{\$caret\}/,bookmarkHtml);rng=selection.getRng();var caretElement=rng.startContainer||(rng.parentElement?rng.parentElement():null);var body=editor.getBody();if(caretElement===body&&selection.isCollapsed()){if(dom.isBlock(body.firstChild)&&canHaveChildren(body.firstChild)&&dom.isEmpty(body.firstChild)){rng=dom.createRng();rng.setStart(body.firstChild,0);rng.setEnd(body.firstChild,0);selection.setRng(rng);}}
if(!selection.isCollapsed()){editor.selection.setRng(editor.selection.getRng());editor.getDoc().execCommand('Delete',false,null);trimNbspAfterDeleteAndPaddValue();}
parentNode=selection.getNode();var parserArgs={context:parentNode.nodeName.toLowerCase(),data:data};fragment=parser.parse(value,parserArgs);if(InsertList.isListFragment(fragment)&&InsertList.isParentBlockLi(dom,parentNode)){rng=InsertList.insertAtCaret(serializer,dom,editor.selection.getRng(),fragment);editor.selection.setRng(rng);editor.fire('SetContent',args);return;}
markFragmentElements(fragment);markInlineFormatElements(fragment);node=fragment.lastChild;if(node.attr('id')=='mce_marker'){marker=node;for(node=node.prev;node;node=node.walk(true)){if(node.type==3||!dom.isBlock(node.name)){if(editor.schema.isValidChild(node.parent.name,'span')){node.parent.insert(marker,node,node.name==='br');}
break;}}}
editor._selectionOverrides.showBlockCaretContainer(parentNode);if(!parserArgs.invalid){value=serializer.serialize(fragment);node=parentNode.firstChild;node2=parentNode.lastChild;if(!node||(node===node2&&node.nodeName==='BR')){dom.setHTML(parentNode,value);}else{selection.setContent(value);}}else{selection.setContent(bookmarkHtml);parentNode=selection.getNode();rootNode=editor.getBody();if(parentNode.nodeType==9){parentNode=node=rootNode;}else{node=parentNode;}
while(node!==rootNode){parentNode=node;node=node.parentNode;}
value=parentNode==rootNode?rootNode.innerHTML:dom.getOuterHTML(parentNode);value=serializer.serialize(parser.parse(value.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return serializer.serialize(fragment);})));if(parentNode==rootNode){dom.setHTML(rootNode,value);}else{dom.setOuterHTML(parentNode,value);}}
reduceInlineTextElements();moveSelectionToMarker(dom.get('mce_marker'));umarkFragmentElements(editor.getBody());editor.fire('SetContent',args);editor.addVisual();};return{insertAtCaret:insertAtCaret};});define("tinymce/EditorCommands",["tinymce/Env","tinymce/util/Tools","tinymce/dom/RangeUtils","tinymce/dom/TreeWalker","tinymce/InsertContent"],function(Env,Tools,RangeUtils,TreeWalker,InsertContent){var each=Tools.each,extend=Tools.extend;var map=Tools.map,inArray=Tools.inArray,explode=Tools.explode;var isOldIE=Env.ie&&Env.ie<11;var TRUE=true,FALSE=false;return function(editor){var dom,selection,formatter,commands={state:{},exec:{},value:{}},settings=editor.settings,bookmark;editor.on('PreInit',function(){dom=editor.dom;selection=editor.selection;settings=editor.settings;formatter=editor.formatter;});function execCommand(command,ui,value,args){var func,customCommand,state=0;if(!/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(command)&&(!args||!args.skip_focus)){editor.focus();}
args=editor.fire('BeforeExecCommand',{command:command,ui:ui,value:value});if(args.isDefaultPrevented()){return false;}
customCommand=command.toLowerCase();if((func=commands.exec[customCommand])){func(customCommand,ui,value);editor.fire('ExecCommand',{command:command,ui:ui,value:value});return true;}
each(editor.plugins,function(p){if(p.execCommand&&p.execCommand(command,ui,value)){editor.fire('ExecCommand',{command:command,ui:ui,value:value});state=true;return false;}});if(state){return state;}
if(editor.theme&&editor.theme.execCommand&&editor.theme.execCommand(command,ui,value)){editor.fire('ExecCommand',{command:command,ui:ui,value:value});return true;}
try{state=editor.getDoc().execCommand(command,ui,value);}catch(ex){}
if(state){editor.fire('ExecCommand',{command:command,ui:ui,value:value});return true;}
return false;}
function queryCommandState(command){var func;if(editor.quirks.isHidden()){return;}
command=command.toLowerCase();if((func=commands.state[command])){return func(command);}
try{return editor.getDoc().queryCommandState(command);}catch(ex){}
return false;}
function queryCommandValue(command){var func;if(editor.quirks.isHidden()){return;}
command=command.toLowerCase();if((func=commands.value[command])){return func(command);}
try{return editor.getDoc().queryCommandValue(command);}catch(ex){}}
function addCommands(command_list,type){type=type||'exec';each(command_list,function(callback,command){each(command.toLowerCase().split(','),function(command){commands[type][command]=callback;});});}
function addCommand(command,callback,scope){command=command.toLowerCase();commands.exec[command]=function(command,ui,value,args){return callback.call(scope||editor,ui,value,args);};}
function queryCommandSupported(command){command=command.toLowerCase();if(commands.exec[command]){return true;}
try{return editor.getDoc().queryCommandSupported(command);}catch(ex){}
return false;}
function addQueryStateHandler(command,callback,scope){command=command.toLowerCase();commands.state[command]=function(){return callback.call(scope||editor);};}
function addQueryValueHandler(command,callback,scope){command=command.toLowerCase();commands.value[command]=function(){return callback.call(scope||editor);};}
function hasCustomCommand(command){command=command.toLowerCase();return!!commands.exec[command];}
extend(this,{execCommand:execCommand,queryCommandState:queryCommandState,queryCommandValue:queryCommandValue,queryCommandSupported:queryCommandSupported,addCommands:addCommands,addCommand:addCommand,addQueryStateHandler:addQueryStateHandler,addQueryValueHandler:addQueryValueHandler,hasCustomCommand:hasCustomCommand});function execNativeCommand(command,ui,value){if(ui===undefined){ui=FALSE;}
if(value===undefined){value=null;}
return editor.getDoc().execCommand(command,ui,value);}
function isFormatMatch(name){return formatter.match(name);}
function toggleFormat(name,value){formatter.toggle(name,value?{value:value}:undefined);editor.nodeChanged();}
function storeSelection(type){bookmark=selection.getBookmark(type);}
function restoreSelection(){selection.moveToBookmark(bookmark);}
addCommands({'mceResetDesignMode,mceBeginUndoLevel':function(){},'mceEndUndoLevel,mceAddUndoLevel':function(){editor.undoManager.add();},'Cut,Copy,Paste':function(command){var doc=editor.getDoc(),failed;try{execNativeCommand(command);}catch(ex){failed=TRUE;}
if(command==='paste'&&!doc.queryCommandEnabled(command)){failed=true;}
if(failed||!doc.queryCommandSupported(command)){var msg=editor.translate("Your browser doesn't support direct access to the clipboard. "+
"Please use the Ctrl+X/C/V keyboard shortcuts instead.");if(Env.mac){msg=msg.replace(/Ctrl\+/g,'\u2318+');}
editor.notificationManager.open({text:msg,type:'error'});}},unlink:function(){if(selection.isCollapsed()){var elm=selection.getNode();if(elm.tagName=='A'){editor.dom.remove(elm,true);}
return;}
formatter.remove("link");},'JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone':function(command){var align=command.substring(7);if(align=='full'){align='justify';}
each('left,center,right,justify'.split(','),function(name){if(align!=name){formatter.remove('align'+name);}});if(align!='none'){toggleFormat('align'+align);}},'InsertUnorderedList,InsertOrderedList':function(command){var listElm,listParent;execNativeCommand(command);listElm=dom.getParent(selection.getNode(),'ol,ul');if(listElm){listParent=listElm.parentNode;if(/^(H[1-6]|P|ADDRESS|PRE)$/.test(listParent.nodeName)){storeSelection();dom.split(listParent,listElm);restoreSelection();}}},'Bold,Italic,Underline,Strikethrough,Superscript,Subscript':function(command){toggleFormat(command);},'ForeColor,HiliteColor,FontName':function(command,ui,value){toggleFormat(command,value);},FontSize:function(command,ui,value){var fontClasses,fontSizes;if(value>=1&&value<=7){fontSizes=explode(settings.font_size_style_values);fontClasses=explode(settings.font_size_classes);if(fontClasses){value=fontClasses[value-1]||value;}else{value=fontSizes[value-1]||value;}}
toggleFormat(command,value);},RemoveFormat:function(command){formatter.remove(command);},mceBlockQuote:function(){toggleFormat('blockquote');},FormatBlock:function(command,ui,value){return toggleFormat(value||'p');},mceCleanup:function(){var bookmark=selection.getBookmark();editor.setContent(editor.getContent({cleanup:TRUE}),{cleanup:TRUE});selection.moveToBookmark(bookmark);},mceRemoveNode:function(command,ui,value){var node=value||selection.getNode();if(node!=editor.getBody()){storeSelection();editor.dom.remove(node,TRUE);restoreSelection();}},mceSelectNodeDepth:function(command,ui,value){var counter=0;dom.getParent(selection.getNode(),function(node){if(node.nodeType==1&&counter++==value){selection.select(node);return FALSE;}},editor.getBody());},mceSelectNode:function(command,ui,value){selection.select(value);},mceInsertContent:function(command,ui,value){InsertContent.insertAtCaret(editor,value);},mceInsertRawHTML:function(command,ui,value){selection.setContent('tiny_mce_marker');editor.setContent(editor.getContent().replace(/tiny_mce_marker/g,function(){return value;}));},mceToggleFormat:function(command,ui,value){toggleFormat(value);},mceSetContent:function(command,ui,value){editor.setContent(value);},'Indent,Outdent':function(command){var intentValue,indentUnit,value;intentValue=settings.indentation;indentUnit=/[a-z%]+$/i.exec(intentValue);intentValue=parseInt(intentValue,10);if(!queryCommandState('InsertUnorderedList')&&!queryCommandState('InsertOrderedList')){if(!settings.forced_root_block&&!dom.getParent(selection.getNode(),dom.isBlock)){formatter.apply('div');}
each(selection.getSelectedBlocks(),function(element){if(dom.getContentEditable(element)==="false"){return;}
if(element.nodeName!="LI"){var indentStyleName=editor.getParam('indent_use_margin',false)?'margin':'padding';indentStyleName+=dom.getStyle(element,'direction',true)=='rtl'?'Right':'Left';if(command=='outdent'){value=Math.max(0,parseInt(element.style[indentStyleName]||0,10)-intentValue);dom.setStyle(element,indentStyleName,value?value+indentUnit:'');}else{value=(parseInt(element.style[indentStyleName]||0,10)+intentValue)+indentUnit;dom.setStyle(element,indentStyleName,value);}}});}else{execNativeCommand(command);}},mceRepaint:function(){},InsertHorizontalRule:function(){editor.execCommand('mceInsertContent',false,'<hr />');},mceToggleVisualAid:function(){editor.hasVisual=!editor.hasVisual;editor.addVisual();},mceReplaceContent:function(command,ui,value){editor.execCommand('mceInsertContent',false,value.replace(/\{\$selection\}/g,selection.getContent({format:'text'})));},mceInsertLink:function(command,ui,value){var anchor;if(typeof value=='string'){value={href:value};}
anchor=dom.getParent(selection.getNode(),'a');value.href=value.href.replace(' ','%20');if(!anchor||!value.href){formatter.remove('link');}
if(value.href){formatter.apply('link',value,anchor);}},selectAll:function(){var root=dom.getRoot(),rng;if(selection.getRng().setStart){rng=dom.createRng();rng.setStart(root,0);rng.setEnd(root,root.childNodes.length);selection.setRng(rng);}else{rng=selection.getRng();if(!rng.item){rng.moveToElementText(root);rng.select();}}},"delete":function(){execNativeCommand("Delete");var body=editor.getBody();if(dom.isEmpty(body)){editor.setContent('');if(body.firstChild&&dom.isBlock(body.firstChild)){editor.selection.setCursorLocation(body.firstChild,0);}else{editor.selection.setCursorLocation(body,0);}}},mceNewDocument:function(){editor.setContent('');},InsertLineBreak:function(command,ui,value){var evt=value;var brElm,extraBr,marker;var rng=selection.getRng(true);new RangeUtils(dom).normalize(rng);var offset=rng.startOffset;var container=rng.startContainer;if(container.nodeType==1&&container.hasChildNodes()){var isAfterLastNodeInContainer=offset>container.childNodes.length-1;container=container.childNodes[Math.min(offset,container.childNodes.length-1)]||container;if(isAfterLastNodeInContainer&&container.nodeType==3){offset=container.nodeValue.length;}else{offset=0;}}
var parentBlock=dom.getParent(container,dom.isBlock);var parentBlockName=parentBlock?parentBlock.nodeName.toUpperCase():'';var containerBlock=parentBlock?dom.getParent(parentBlock.parentNode,dom.isBlock):null;var containerBlockName=containerBlock?containerBlock.nodeName.toUpperCase():'';var isControlKey=evt&&evt.ctrlKey;if(containerBlockName=='LI'&&!isControlKey){parentBlock=containerBlock;parentBlockName=containerBlockName;}
function hasRightSideContent(){var walker=new TreeWalker(container,parentBlock),node;var nonEmptyElementsMap=editor.schema.getNonEmptyElements();while((node=walker.next())){if(nonEmptyElementsMap[node.nodeName.toLowerCase()]||node.length>0){return true;}}}
if(container&&container.nodeType==3&&offset>=container.nodeValue.length){if(!isOldIE&&!hasRightSideContent()){brElm=dom.create('br');rng.insertNode(brElm);rng.setStartAfter(brElm);rng.setEndAfter(brElm);extraBr=true;}}
brElm=dom.create('br');rng.insertNode(brElm);var documentMode=dom.doc.documentMode;if(isOldIE&&parentBlockName=='PRE'&&(!documentMode||documentMode<8)){brElm.parentNode.insertBefore(dom.doc.createTextNode('\r'),brElm);}
marker=dom.create('span',{},'&nbsp;');brElm.parentNode.insertBefore(marker,brElm);selection.scrollIntoView(marker);dom.remove(marker);if(!extraBr){rng.setStartAfter(brElm);rng.setEndAfter(brElm);}else{rng.setStartBefore(brElm);rng.setEndBefore(brElm);}
selection.setRng(rng);editor.undoManager.add();return TRUE;}});addCommands({'JustifyLeft,JustifyCenter,JustifyRight,JustifyFull':function(command){var name='align'+command.substring(7);var nodes=selection.isCollapsed()?[dom.getParent(selection.getNode(),dom.isBlock)]:selection.getSelectedBlocks();var matches=map(nodes,function(node){return!!formatter.matchNode(node,name);});return inArray(matches,TRUE)!==-1;},'Bold,Italic,Underline,Strikethrough,Superscript,Subscript':function(command){return isFormatMatch(command);},mceBlockQuote:function(){return isFormatMatch('blockquote');},Outdent:function(){var node;if(settings.inline_styles){if((node=dom.getParent(selection.getStart(),dom.isBlock))&&parseInt(node.style.paddingLeft,10)>0){return TRUE;}
if((node=dom.getParent(selection.getEnd(),dom.isBlock))&&parseInt(node.style.paddingLeft,10)>0){return TRUE;}}
return(queryCommandState('InsertUnorderedList')||queryCommandState('InsertOrderedList')||(!settings.inline_styles&&!!dom.getParent(selection.getNode(),'BLOCKQUOTE')));},'InsertUnorderedList,InsertOrderedList':function(command){var list=dom.getParent(selection.getNode(),'ul,ol');return list&&(command==='insertunorderedlist'&&list.tagName==='UL'||command==='insertorderedlist'&&list.tagName==='OL');}},'state');addCommands({'FontSize,FontName':function(command){var value=0,parent;if((parent=dom.getParent(selection.getNode(),'span'))){if(command=='fontsize'){value=parent.style.fontSize;}else{value=parent.style.fontFamily.replace(/, /g,',').replace(/[\'\"]/g,'').toLowerCase();}}
return value;}},'value');addCommands({Undo:function(){editor.undoManager.undo();},Redo:function(){editor.undoManager.redo();}});};});define("tinymce/util/URI",["tinymce/util/Tools"],function(Tools){var each=Tools.each,trim=Tools.trim;var queryParts="source protocol authority userInfo user password host port relative path directory file query anchor".split(' ');var DEFAULT_PORTS={'ftp':21,'http':80,'https':443,'mailto':25};function URI(url,settings){var self=this,baseUri,base_url;url=trim(url);settings=self.settings=settings||{};baseUri=settings.base_uri;if(/^([\w\-]+):([^\/]{2})/i.test(url)||/^\s*#/.test(url)){self.source=url;return;}
var isProtocolRelative=url.indexOf('//')===0;if(url.indexOf('/')===0&&!isProtocolRelative){url=(baseUri?baseUri.protocol||'http':'http')+'://mce_host'+url;}
if(!/^[\w\-]*:?\/\//.test(url)){base_url=settings.base_uri?settings.base_uri.path:new URI(location.href).directory;if(settings.base_uri.protocol===""){url='//mce_host'+self.toAbsPath(base_url,url);}else{url=/([^#?]*)([#?]?.*)/.exec(url);url=((baseUri&&baseUri.protocol)||'http')+'://mce_host'+self.toAbsPath(base_url,url[1])+url[2];}}
url=url.replace(/@@/g,'(mce_at)');url=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(url);each(queryParts,function(v,i){var part=url[i];if(part){part=part.replace(/\(mce_at\)/g,'@@');}
self[v]=part;});if(baseUri){if(!self.protocol){self.protocol=baseUri.protocol;}
if(!self.userInfo){self.userInfo=baseUri.userInfo;}
if(!self.port&&self.host==='mce_host'){self.port=baseUri.port;}
if(!self.host||self.host==='mce_host'){self.host=baseUri.host;}
self.source='';}
if(isProtocolRelative){self.protocol='';}}
URI.prototype={setPath:function(path){var self=this;path=/^(.*?)\/?(\w+)?$/.exec(path);self.path=path[0];self.directory=path[1];self.file=path[2];self.source='';self.getURI();},toRelative:function(uri){var self=this,output;if(uri==="./"){return uri;}
uri=new URI(uri,{base_uri:self});if((uri.host!='mce_host'&&self.host!=uri.host&&uri.host)||self.port!=uri.port||(self.protocol!=uri.protocol&&uri.protocol!=="")){return uri.getURI();}
var tu=self.getURI(),uu=uri.getURI();if(tu==uu||(tu.charAt(tu.length-1)=="/"&&tu.substr(0,tu.length-1)==uu)){return tu;}
output=self.toRelPath(self.path,uri.path);if(uri.query){output+='?'+uri.query;}
if(uri.anchor){output+='#'+uri.anchor;}
return output;},toAbsolute:function(uri,noHost){uri=new URI(uri,{base_uri:this});return uri.getURI(noHost&&this.isSameOrigin(uri));},isSameOrigin:function(uri){if(this.host==uri.host&&this.protocol==uri.protocol){if(this.port==uri.port){return true;}
var defaultPort=DEFAULT_PORTS[this.protocol];if(defaultPort&&((this.port||defaultPort)==(uri.port||defaultPort))){return true;}}
return false;},toRelPath:function(base,path){var items,breakPoint=0,out='',i,l;base=base.substring(0,base.lastIndexOf('/'));base=base.split('/');items=path.split('/');if(base.length>=items.length){for(i=0,l=base.length;i<l;i++){if(i>=items.length||base[i]!=items[i]){breakPoint=i+1;break;}}}
if(base.length<items.length){for(i=0,l=items.length;i<l;i++){if(i>=base.length||base[i]!=items[i]){breakPoint=i+1;break;}}}
if(breakPoint===1){return path;}
for(i=0,l=base.length-(breakPoint-1);i<l;i++){out+="../";}
for(i=breakPoint-1,l=items.length;i<l;i++){if(i!=breakPoint-1){out+="/"+items[i];}else{out+=items[i];}}
return out;},toAbsPath:function(base,path){var i,nb=0,o=[],tr,outPath;tr=/\/$/.test(path)?'/':'';base=base.split('/');path=path.split('/');each(base,function(k){if(k){o.push(k);}});base=o;for(i=path.length-1,o=[];i>=0;i--){if(path[i].length===0||path[i]==="."){continue;}
if(path[i]==='..'){nb++;continue;}
if(nb>0){nb--;continue;}
o.push(path[i]);}
i=base.length-nb;if(i<=0){outPath=o.reverse().join('/');}else{outPath=base.slice(0,i).join('/')+'/'+o.reverse().join('/');}
if(outPath.indexOf('/')!==0){outPath='/'+outPath;}
if(tr&&outPath.lastIndexOf('/')!==outPath.length-1){outPath+=tr;}
return outPath;},getURI:function(noProtoHost){var s,self=this;if(!self.source||noProtoHost){s='';if(!noProtoHost){if(self.protocol){s+=self.protocol+'://';}else{s+='//';}
if(self.userInfo){s+=self.userInfo+'@';}
if(self.host){s+=self.host;}
if(self.port){s+=':'+self.port;}}
if(self.path){s+=self.path;}
if(self.query){s+='?'+self.query;}
if(self.anchor){s+='#'+self.anchor;}
self.source=s;}
return self.source;}};URI.parseDataUri=function(uri){var type,matches;uri=decodeURIComponent(uri).split(',');matches=/data:([^;]+)/.exec(uri[0]);if(matches){type=matches[1];}
return{type:type,data:uri[1]};};URI.getDocumentBaseUrl=function(loc){var baseUrl;if(loc.protocol.indexOf('http')!==0&&loc.protocol!=='file:'){baseUrl=loc.href;}else{baseUrl=loc.protocol+'//'+loc.host+loc.pathname;}
if(/^[^:]+:\/\/\/?[^\/]+\//.test(baseUrl)){baseUrl=baseUrl.replace(/[\?#].*$/,'').replace(/[\/\\][^\/]+$/,'');if(!/[\/\\]$/.test(baseUrl)){baseUrl+='/';}}
return baseUrl;};return URI;});define("tinymce/util/Class",["tinymce/util/Tools"],function(Tools){var each=Tools.each,extend=Tools.extend;var extendClass,initializing;function Class(){}
Class.extend=extendClass=function(prop){var self=this,_super=self.prototype,prototype,name,member;function Class(){var i,mixins,mixin,self=this;if(!initializing){if(self.init){self.init.apply(self,arguments);}
mixins=self.Mixins;if(mixins){i=mixins.length;while(i--){mixin=mixins[i];if(mixin.init){mixin.init.apply(self,arguments);}}}}}
function dummy(){return this;}
function createMethod(name,fn){return function(){var self=this,tmp=self._super,ret;self._super=_super[name];ret=fn.apply(self,arguments);self._super=tmp;return ret;};}
initializing=true;prototype=new self();initializing=false;if(prop.Mixins){each(prop.Mixins,function(mixin){for(var name in mixin){if(name!=="init"){prop[name]=mixin[name];}}});if(_super.Mixins){prop.Mixins=_super.Mixins.concat(prop.Mixins);}}
if(prop.Methods){each(prop.Methods.split(','),function(name){prop[name]=dummy;});}
if(prop.Properties){each(prop.Properties.split(','),function(name){var fieldName='_'+name;prop[name]=function(value){var self=this,undef;if(value!==undef){self[fieldName]=value;return self;}
return self[fieldName];};});}
if(prop.Statics){each(prop.Statics,function(func,name){Class[name]=func;});}
if(prop.Defaults&&_super.Defaults){prop.Defaults=extend({},_super.Defaults,prop.Defaults);}
for(name in prop){member=prop[name];if(typeof member=="function"&&_super[name]){prototype[name]=createMethod(name,member);}else{prototype[name]=member;}}
Class.prototype=prototype;Class.constructor=Class;Class.extend=extendClass;return Class;};return Class;});define("tinymce/util/EventDispatcher",["tinymce/util/Tools"],function(Tools){var nativeEvents=Tools.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange "+
"mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover "+
"draggesture dragdrop drop drag submit "+
"compositionstart compositionend compositionupdate touchstart touchend",' ');function Dispatcher(settings){var self=this,scope,bindings={},toggleEvent;function returnFalse(){return false;}
function returnTrue(){return true;}
settings=settings||{};scope=settings.scope||self;toggleEvent=settings.toggleEvent||returnFalse;function fire(name,args){var handlers,i,l,callback;name=name.toLowerCase();args=args||{};args.type=name;if(!args.target){args.target=scope;}
if(!args.preventDefault){args.preventDefault=function(){args.isDefaultPrevented=returnTrue;};args.stopPropagation=function(){args.isPropagationStopped=returnTrue;};args.stopImmediatePropagation=function(){args.isImmediatePropagationStopped=returnTrue;};args.isDefaultPrevented=returnFalse;args.isPropagationStopped=returnFalse;args.isImmediatePropagationStopped=returnFalse;}
if(settings.beforeFire){settings.beforeFire(args);}
handlers=bindings[name];if(handlers){for(i=0,l=handlers.length;i<l;i++){callback=handlers[i];if(callback.once){off(name,callback.func);}
if(args.isImmediatePropagationStopped()){args.stopPropagation();return args;}
if(callback.func.call(scope,args)===false){args.preventDefault();return args;}}}
return args;}
function on(name,callback,prepend,extra){var handlers,names,i;if(callback===false){callback=returnFalse;}
if(callback){callback={func:callback};if(extra){Tools.extend(callback,extra);}
names=name.toLowerCase().split(' ');i=names.length;while(i--){name=names[i];handlers=bindings[name];if(!handlers){handlers=bindings[name]=[];toggleEvent(name,true);}
if(prepend){handlers.unshift(callback);}else{handlers.push(callback);}}}
return self;}
function off(name,callback){var i,handlers,bindingName,names,hi;if(name){names=name.toLowerCase().split(' ');i=names.length;while(i--){name=names[i];handlers=bindings[name];if(!name){for(bindingName in bindings){toggleEvent(bindingName,false);delete bindings[bindingName];}
return self;}
if(handlers){if(!callback){handlers.length=0;}else{hi=handlers.length;while(hi--){if(handlers[hi].func===callback){handlers=handlers.slice(0,hi).concat(handlers.slice(hi+1));bindings[name]=handlers;}}}
if(!handlers.length){toggleEvent(name,false);delete bindings[name];}}}}else{for(name in bindings){toggleEvent(name,false);}
bindings={};}
return self;}
function once(name,callback,prepend){return on(name,callback,prepend,{once:true});}
function has(name){name=name.toLowerCase();return!(!bindings[name]||bindings[name].length===0);}
self.fire=fire;self.on=on;self.off=off;self.once=once;self.has=has;}
Dispatcher.isNative=function(name){return!!nativeEvents[name.toLowerCase()];};return Dispatcher;});define("tinymce/data/Binding",[],function(){function Binding(settings){this.create=settings.create;}
Binding.create=function(model,name){return new Binding({create:function(otherModel,otherName){var bindings;function fromSelfToOther(e){otherModel.set(otherName,e.value);}
function fromOtherToSelf(e){model.set(name,e.value);}
otherModel.on('change:'+otherName,fromOtherToSelf);model.on('change:'+name,fromSelfToOther);bindings=otherModel._bindings;if(!bindings){bindings=otherModel._bindings=[];otherModel.on('destroy',function(){var i=bindings.length;while(i--){bindings[i]();}});}
bindings.push(function(){model.off('change:'+name,fromSelfToOther);});return model.get(name);}});};return Binding;});define("tinymce/util/Observable",["tinymce/util/EventDispatcher"],function(EventDispatcher){function getEventDispatcher(obj){if(!obj._eventDispatcher){obj._eventDispatcher=new EventDispatcher({scope:obj,toggleEvent:function(name,state){if(EventDispatcher.isNative(name)&&obj.toggleNativeEvent){obj.toggleNativeEvent(name,state);}}});}
return obj._eventDispatcher;}
return{fire:function(name,args,bubble){var self=this;if(self.removed&&name!=="remove"){return args;}
args=getEventDispatcher(self).fire(name,args,bubble);if(bubble!==false&&self.parent){var parent=self.parent();while(parent&&!args.isPropagationStopped()){parent.fire(name,args,false);parent=parent.parent();}}
return args;},on:function(name,callback,prepend){return getEventDispatcher(this).on(name,callback,prepend);},off:function(name,callback){return getEventDispatcher(this).off(name,callback);},once:function(name,callback){return getEventDispatcher(this).once(name,callback);},hasEventListeners:function(name){return getEventDispatcher(this).has(name);}};});define("tinymce/data/ObservableObject",["tinymce/data/Binding","tinymce/util/Observable","tinymce/util/Class","tinymce/util/Tools"],function(Binding,Observable,Class,Tools){function isNode(node){return node.nodeType>0;}
function isEqual(a,b){var k,checked;if(a===b){return true;}
if(a===null||b===null){return a===b;}
if(typeof a!=="object"||typeof b!=="object"){return a===b;}
if(Tools.isArray(b)){if(a.length!==b.length){return false;}
k=a.length;while(k--){if(!isEqual(a[k],b[k])){return false;}}}
if(isNode(a)||isNode(b)){return a===b;}
checked={};for(k in b){if(!isEqual(a[k],b[k])){return false;}
checked[k]=true;}
for(k in a){if(!checked[k]&&!isEqual(a[k],b[k])){return false;}}
return true;}
return Class.extend({Mixins:[Observable],init:function(data){var name,value;data=data||{};for(name in data){value=data[name];if(value instanceof Binding){data[name]=value.create(this,name);}}
this.data=data;},set:function(name,value){var key,args,oldValue=this.data[name];if(value instanceof Binding){value=value.create(this,name);}
if(typeof name==="object"){for(key in name){this.set(key,name[key]);}
return this;}
if(!isEqual(oldValue,value)){this.data[name]=value;args={target:this,name:name,value:value,oldValue:oldValue};this.fire('change:'+name,args);this.fire('change',args);}
return this;},get:function(name){return this.data[name];},has:function(name){return name in this.data;},bind:function(name){return Binding.create(this,name);},destroy:function(){this.fire('destroy');}});});define("tinymce/ui/Selector",["tinymce/util/Class"],function(Class){"use strict";function unique(array){var uniqueItems=[],i=array.length,item;while(i--){item=array[i];if(!item.__checked){uniqueItems.push(item);item.__checked=1;}}
i=uniqueItems.length;while(i--){delete uniqueItems[i].__checked;}
return uniqueItems;}
var expression=/^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i;var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,whiteSpace=/^\s*|\s*$/g,Collection;var Selector=Class.extend({init:function(selector){var match=this.match;function compileNameFilter(name){if(name){name=name.toLowerCase();return function(item){return name==='*'||item.type===name;};}}
function compileIdFilter(id){if(id){return function(item){return item._name===id;};}}
function compileClassesFilter(classes){if(classes){classes=classes.split('.');return function(item){var i=classes.length;while(i--){if(!item.classes.contains(classes[i])){return false;}}
return true;};}}
function compileAttrFilter(name,cmp,check){if(name){return function(item){var value=item[name]?item[name]():'';return!cmp?!!check:cmp==="="?value===check:cmp==="*="?value.indexOf(check)>=0:cmp==="~="?(" "+value+" ").indexOf(" "+check+" ")>=0:cmp==="!="?value!=check:cmp==="^="?value.indexOf(check)===0:cmp==="$="?value.substr(value.length-check.length)===check:false;};}}
function compilePsuedoFilter(name){var notSelectors;if(name){name=/(?:not\((.+)\))|(.+)/i.exec(name);if(!name[1]){name=name[2];return function(item,index,length){return name==='first'?index===0:name==='last'?index===length-1:name==='even'?index%2===0:name==='odd'?index%2===1:item[name]?item[name]():false;};}
notSelectors=parseChunks(name[1],[]);return function(item){return!match(item,notSelectors);};}}
function compile(selector,filters,direct){var parts;function add(filter){if(filter){filters.push(filter);}}
parts=expression.exec(selector.replace(whiteSpace,''));add(compileNameFilter(parts[1]));add(compileIdFilter(parts[2]));add(compileClassesFilter(parts[3]));add(compileAttrFilter(parts[4],parts[5],parts[6]));add(compilePsuedoFilter(parts[7]));filters.pseudo=!!parts[7];filters.direct=direct;return filters;}
function parseChunks(selector,selectors){var parts=[],extra,matches,i;do{chunker.exec("");matches=chunker.exec(selector);if(matches){selector=matches[3];parts.push(matches[1]);if(matches[2]){extra=matches[3];break;}}}while(matches);if(extra){parseChunks(extra,selectors);}
selector=[];for(i=0;i<parts.length;i++){if(parts[i]!='>'){selector.push(compile(parts[i],[],parts[i-1]==='>'));}}
selectors.push(selector);return selectors;}
this._selectors=parseChunks(selector,[]);},match:function(control,selectors){var i,l,si,sl,selector,fi,fl,filters,index,length,siblings,count,item;selectors=selectors||this._selectors;for(i=0,l=selectors.length;i<l;i++){selector=selectors[i];sl=selector.length;item=control;count=0;for(si=sl-1;si>=0;si--){filters=selector[si];while(item){if(filters.pseudo){siblings=item.parent().items();index=length=siblings.length;while(index--){if(siblings[index]===item){break;}}}
for(fi=0,fl=filters.length;fi<fl;fi++){if(!filters[fi](item,index,length)){fi=fl+1;break;}}
if(fi===fl){count++;break;}else{if(si===sl-1){break;}}
item=item.parent();}}
if(count===sl){return true;}}
return false;},find:function(container){var matches=[],i,l,selectors=this._selectors;function collect(items,selector,index){var i,l,fi,fl,item,filters=selector[index];for(i=0,l=items.length;i<l;i++){item=items[i];for(fi=0,fl=filters.length;fi<fl;fi++){if(!filters[fi](item,i,l)){fi=fl+1;break;}}
if(fi===fl){if(index==selector.length-1){matches.push(item);}else{if(item.items){collect(item.items(),selector,index+1);}}}else if(filters.direct){return;}
if(item.items){collect(item.items(),selector,index);}}}
if(container.items){for(i=0,l=selectors.length;i<l;i++){collect(container.items(),selectors[i],0);}
if(l>1){matches=unique(matches);}}
if(!Collection){Collection=Selector.Collection;}
return new Collection(matches);}});return Selector;});define("tinymce/ui/Collection",["tinymce/util/Tools","tinymce/ui/Selector","tinymce/util/Class"],function(Tools,Selector,Class){"use strict";var Collection,proto,push=Array.prototype.push,slice=Array.prototype.slice;proto={length:0,init:function(items){if(items){this.add(items);}},add:function(items){var self=this;if(!Tools.isArray(items)){if(items instanceof Collection){self.add(items.toArray());}else{push.call(self,items);}}else{push.apply(self,items);}
return self;},set:function(items){var self=this,len=self.length,i;self.length=0;self.add(items);for(i=self.length;i<len;i++){delete self[i];}
return self;},filter:function(selector){var self=this,i,l,matches=[],item,match;if(typeof selector==="string"){selector=new Selector(selector);match=function(item){return selector.match(item);};}else{match=selector;}
for(i=0,l=self.length;i<l;i++){item=self[i];if(match(item)){matches.push(item);}}
return new Collection(matches);},slice:function(){return new Collection(slice.apply(this,arguments));},eq:function(index){return index===-1?this.slice(index):this.slice(index,+index+1);},each:function(callback){Tools.each(this,callback);return this;},toArray:function(){return Tools.toArray(this);},indexOf:function(ctrl){var self=this,i=self.length;while(i--){if(self[i]===ctrl){break;}}
return i;},reverse:function(){return new Collection(Tools.toArray(this).reverse());},hasClass:function(cls){return this[0]?this[0].classes.contains(cls):false;},prop:function(name,value){var self=this,undef,item;if(value!==undef){self.each(function(item){if(item[name]){item[name](value);}});return self;}
item=self[0];if(item&&item[name]){return item[name]();}},exec:function(name){var self=this,args=Tools.toArray(arguments).slice(1);self.each(function(item){if(item[name]){item[name].apply(item,args);}});return self;},remove:function(){var i=this.length;while(i--){this[i].remove();}
return this;},addClass:function(cls){return this.each(function(item){item.classes.add(cls);});},removeClass:function(cls){return this.each(function(item){item.classes.remove(cls);});}};Tools.each('fire on off show hide append prepend before after reflow'.split(' '),function(name){proto[name]=function(){var args=Tools.toArray(arguments);this.each(function(ctrl){if(name in ctrl){ctrl[name].apply(ctrl,args);}});return this;};});Tools.each('text name disabled active selected checked visible parent value data'.split(' '),function(name){proto[name]=function(value){return this.prop(name,value);};});Collection=Class.extend(proto);Selector.Collection=Collection;return Collection;});define("tinymce/ui/DomUtils",["tinymce/util/Tools","tinymce/dom/DOMUtils"],function(Tools,DOMUtils){"use strict";var count=0;return{id:function(){return 'mceu_'+(count++);},create:function(name,attrs,children){var elm=document.createElement(name);DOMUtils.DOM.setAttribs(elm,attrs);if(typeof children==='string'){elm.innerHTML=children;}else{Tools.each(children,function(child){if(child.nodeType){elm.appendChild(child);}});}
return elm;},createFragment:function(html){return DOMUtils.DOM.createFragment(html);},getWindowSize:function(){return DOMUtils.DOM.getViewPort();},getSize:function(elm){var width,height;if(elm.getBoundingClientRect){var rect=elm.getBoundingClientRect();width=Math.max(rect.width||(rect.right-rect.left),elm.offsetWidth);height=Math.max(rect.height||(rect.bottom-rect.bottom),elm.offsetHeight);}else{width=elm.offsetWidth;height=elm.offsetHeight;}
return{width:width,height:height};},getPos:function(elm,root){return DOMUtils.DOM.getPos(elm,root);},getViewPort:function(win){return DOMUtils.DOM.getViewPort(win);},get:function(id){return document.getElementById(id);},addClass:function(elm,cls){return DOMUtils.DOM.addClass(elm,cls);},removeClass:function(elm,cls){return DOMUtils.DOM.removeClass(elm,cls);},hasClass:function(elm,cls){return DOMUtils.DOM.hasClass(elm,cls);},toggleClass:function(elm,cls,state){return DOMUtils.DOM.toggleClass(elm,cls,state);},css:function(elm,name,value){return DOMUtils.DOM.setStyle(elm,name,value);},getRuntimeStyle:function(elm,name){return DOMUtils.DOM.getStyle(elm,name,true);},on:function(target,name,callback,scope){return DOMUtils.DOM.bind(target,name,callback,scope);},off:function(target,name,callback){return DOMUtils.DOM.unbind(target,name,callback);},fire:function(target,name,args){return DOMUtils.DOM.fire(target,name,args);},innerHtml:function(elm,html){DOMUtils.DOM.setHTML(elm,html);}};});define("tinymce/ui/BoxUtils",[],function(){"use strict";return{parseBox:function(value){var len,radix=10;if(!value){return;}
if(typeof value==="number"){value=value||0;return{top:value,left:value,bottom:value,right:value};}
value=value.split(' ');len=value.length;if(len===1){value[1]=value[2]=value[3]=value[0];}else if(len===2){value[2]=value[0];value[3]=value[1];}else if(len===3){value[3]=value[1];}
return{top:parseInt(value[0],radix)||0,right:parseInt(value[1],radix)||0,bottom:parseInt(value[2],radix)||0,left:parseInt(value[3],radix)||0};},measureBox:function(elm,prefix){function getStyle(name){var defaultView=document.defaultView;if(defaultView){name=name.replace(/[A-Z]/g,function(a){return '-'+a;});return defaultView.getComputedStyle(elm,null).getPropertyValue(name);}
return elm.currentStyle[name];}
function getSide(name){var val=parseFloat(getStyle(name),10);return isNaN(val)?0:val;}
return{top:getSide(prefix+"TopWidth"),right:getSide(prefix+"RightWidth"),bottom:getSide(prefix+"BottomWidth"),left:getSide(prefix+"LeftWidth")};}};});define("tinymce/ui/ClassList",["tinymce/util/Tools"],function(Tools){"use strict";function noop(){}
function ClassList(onchange){this.cls=[];this.cls._map={};this.onchange=onchange||noop;this.prefix='';}
Tools.extend(ClassList.prototype,{add:function(cls){if(cls&&!this.contains(cls)){this.cls._map[cls]=true;this.cls.push(cls);this._change();}
return this;},remove:function(cls){if(this.contains(cls)){for(var i=0;i<this.cls.length;i++){if(this.cls[i]===cls){break;}}
this.cls.splice(i,1);delete this.cls._map[cls];this._change();}
return this;},toggle:function(cls,state){var curState=this.contains(cls);if(curState!==state){if(curState){this.remove(cls);}else{this.add(cls);}
this._change();}
return this;},contains:function(cls){return!!this.cls._map[cls];},_change:function(){delete this.clsValue;this.onchange.call(this);}});ClassList.prototype.toString=function(){var value;if(this.clsValue){return this.clsValue;}
value='';for(var i=0;i<this.cls.length;i++){if(i>0){value+=' ';}
value+=this.prefix+this.cls[i];}
return value;};return ClassList;});define("tinymce/ui/ReflowQueue",["tinymce/util/Delay"],function(Delay){var dirtyCtrls={},animationFrameRequested;return{add:function(ctrl){var parent=ctrl.parent();if(parent){if(!parent._layout||parent._layout.isNative()){return;}
if(!dirtyCtrls[parent._id]){dirtyCtrls[parent._id]=parent;}
if(!animationFrameRequested){animationFrameRequested=true;Delay.requestAnimationFrame(function(){var id,ctrl;animationFrameRequested=false;for(id in dirtyCtrls){ctrl=dirtyCtrls[id];if(ctrl.state.get('rendered')){ctrl.reflow();}}
dirtyCtrls={};},document.body);}}},remove:function(ctrl){if(dirtyCtrls[ctrl._id]){delete dirtyCtrls[ctrl._id];}}};});define("tinymce/ui/Control",["tinymce/util/Class","tinymce/util/Tools","tinymce/util/EventDispatcher","tinymce/data/ObservableObject","tinymce/ui/Collection","tinymce/ui/DomUtils","tinymce/dom/DomQuery","tinymce/ui/BoxUtils","tinymce/ui/ClassList","tinymce/ui/ReflowQueue"],function(Class,Tools,EventDispatcher,ObservableObject,Collection,DomUtils,$,BoxUtils,ClassList,ReflowQueue){"use strict";var hasMouseWheelEventSupport="onmousewheel"in document;var hasWheelEventSupport=false;var classPrefix="mce-";var Control,idCounter=0;var proto={Statics:{classPrefix:classPrefix},isRtl:function(){return Control.rtl;},classPrefix:classPrefix,init:function(settings){var self=this,classes,defaultClasses;function applyClasses(classes){var i;classes=classes.split(' ');for(i=0;i<classes.length;i++){self.classes.add(classes[i]);}}
self.settings=settings=Tools.extend({},self.Defaults,settings);self._id=settings.id||('mceu_'+(idCounter++));self._aria={role:settings.role};self._elmCache={};self.$=$;self.state=new ObservableObject({visible:true,active:false,disabled:false,value:''});self.data=new ObservableObject(settings.data);self.classes=new ClassList(function(){if(self.state.get('rendered')){self.getEl().className=this.toString();}});self.classes.prefix=self.classPrefix;classes=settings.classes;if(classes){if(self.Defaults){defaultClasses=self.Defaults.classes;if(defaultClasses&&classes!=defaultClasses){applyClasses(defaultClasses);}}
applyClasses(classes);}
Tools.each('title text name visible disabled active value'.split(' '),function(name){if(name in settings){self[name](settings[name]);}});self.on('click',function(){if(self.disabled()){return false;}});self.settings=settings;self.borderBox=BoxUtils.parseBox(settings.border);self.paddingBox=BoxUtils.parseBox(settings.padding);self.marginBox=BoxUtils.parseBox(settings.margin);if(settings.hidden){self.hide();}},Properties:'parent,name',getContainerElm:function(){return document.body;},getParentCtrl:function(elm){var ctrl,lookup=this.getRoot().controlIdLookup;while(elm&&lookup){ctrl=lookup[elm.id];if(ctrl){break;}
elm=elm.parentNode;}
return ctrl;},initLayoutRect:function(){var self=this,settings=self.settings,borderBox,layoutRect;var elm=self.getEl(),width,height,minWidth,minHeight,autoResize;var startMinWidth,startMinHeight,initialSize;borderBox=self.borderBox=self.borderBox||BoxUtils.measureBox(elm,'border');self.paddingBox=self.paddingBox||BoxUtils.measureBox(elm,'padding');self.marginBox=self.marginBox||BoxUtils.measureBox(elm,'margin');initialSize=DomUtils.getSize(elm);startMinWidth=settings.minWidth;startMinHeight=settings.minHeight;minWidth=startMinWidth||initialSize.width;minHeight=startMinHeight||initialSize.height;width=settings.width;height=settings.height;autoResize=settings.autoResize;autoResize=typeof autoResize!="undefined"?autoResize:!width&&!height;width=width||minWidth;height=height||minHeight;var deltaW=borderBox.left+borderBox.right;var deltaH=borderBox.top+borderBox.bottom;var maxW=settings.maxWidth||0xFFFF;var maxH=settings.maxHeight||0xFFFF;self._layoutRect=layoutRect={x:settings.x||0,y:settings.y||0,w:width,h:height,deltaW:deltaW,deltaH:deltaH,contentW:width-deltaW,contentH:height-deltaH,innerW:width-deltaW,innerH:height-deltaH,startMinWidth:startMinWidth||0,startMinHeight:startMinHeight||0,minW:Math.min(minWidth,maxW),minH:Math.min(minHeight,maxH),maxW:maxW,maxH:maxH,autoResize:autoResize,scrollW:0};self._lastLayoutRect={};return layoutRect;},layoutRect:function(newRect){var self=this,curRect=self._layoutRect,lastLayoutRect,size,deltaWidth,deltaHeight,undef,repaintControls;if(!curRect){curRect=self.initLayoutRect();}
if(newRect){deltaWidth=curRect.deltaW;deltaHeight=curRect.deltaH;if(newRect.x!==undef){curRect.x=newRect.x;}
if(newRect.y!==undef){curRect.y=newRect.y;}
if(newRect.minW!==undef){curRect.minW=newRect.minW;}
if(newRect.minH!==undef){curRect.minH=newRect.minH;}
size=newRect.w;if(size!==undef){size=size<curRect.minW?curRect.minW:size;size=size>curRect.maxW?curRect.maxW:size;curRect.w=size;curRect.innerW=size-deltaWidth;}
size=newRect.h;if(size!==undef){size=size<curRect.minH?curRect.minH:size;size=size>curRect.maxH?curRect.maxH:size;curRect.h=size;curRect.innerH=size-deltaHeight;}
size=newRect.innerW;if(size!==undef){size=size<curRect.minW-deltaWidth?curRect.minW-deltaWidth:size;size=size>curRect.maxW-deltaWidth?curRect.maxW-deltaWidth:size;curRect.innerW=size;curRect.w=size+deltaWidth;}
size=newRect.innerH;if(size!==undef){size=size<curRect.minH-deltaHeight?curRect.minH-deltaHeight:size;size=size>curRect.maxH-deltaHeight?curRect.maxH-deltaHeight:size;curRect.innerH=size;curRect.h=size+deltaHeight;}
if(newRect.contentW!==undef){curRect.contentW=newRect.contentW;}
if(newRect.contentH!==undef){curRect.contentH=newRect.contentH;}
lastLayoutRect=self._lastLayoutRect;if(lastLayoutRect.x!==curRect.x||lastLayoutRect.y!==curRect.y||lastLayoutRect.w!==curRect.w||lastLayoutRect.h!==curRect.h){repaintControls=Control.repaintControls;if(repaintControls){if(repaintControls.map&&!repaintControls.map[self._id]){repaintControls.push(self);repaintControls.map[self._id]=true;}}
lastLayoutRect.x=curRect.x;lastLayoutRect.y=curRect.y;lastLayoutRect.w=curRect.w;lastLayoutRect.h=curRect.h;}
return self;}
return curRect;},repaint:function(){var self=this,style,bodyStyle,bodyElm,rect,borderBox;var borderW,borderH,lastRepaintRect,round,value;round=!document.createRange?Math.round:function(value){return value;};style=self.getEl().style;rect=self._layoutRect;lastRepaintRect=self._lastRepaintRect||{};borderBox=self.borderBox;borderW=borderBox.left+borderBox.right;borderH=borderBox.top+borderBox.bottom;if(rect.x!==lastRepaintRect.x){style.left=round(rect.x)+'px';lastRepaintRect.x=rect.x;}
if(rect.y!==lastRepaintRect.y){style.top=round(rect.y)+'px';lastRepaintRect.y=rect.y;}
if(rect.w!==lastRepaintRect.w){value=round(rect.w-borderW);style.width=(value>=0?value:0)+'px';lastRepaintRect.w=rect.w;}
if(rect.h!==lastRepaintRect.h){value=round(rect.h-borderH);style.height=(value>=0?value:0)+'px';lastRepaintRect.h=rect.h;}
if(self._hasBody&&rect.innerW!==lastRepaintRect.innerW){value=round(rect.innerW);bodyElm=self.getEl('body');if(bodyElm){bodyStyle=bodyElm.style;bodyStyle.width=(value>=0?value:0)+'px';}
lastRepaintRect.innerW=rect.innerW;}
if(self._hasBody&&rect.innerH!==lastRepaintRect.innerH){value=round(rect.innerH);bodyElm=bodyElm||self.getEl('body');if(bodyElm){bodyStyle=bodyStyle||bodyElm.style;bodyStyle.height=(value>=0?value:0)+'px';}
lastRepaintRect.innerH=rect.innerH;}
self._lastRepaintRect=lastRepaintRect;self.fire('repaint',{},false);},updateLayoutRect:function(){var self=this;self.parent()._lastRect=null;DomUtils.css(self.getEl(),{width:'',height:''});self._layoutRect=self._lastRepaintRect=self._lastLayoutRect=null;self.initLayoutRect();},on:function(name,callback){var self=this;function resolveCallbackName(name){var callback,scope;if(typeof name!='string'){return name;}
return function(e){if(!callback){self.parentsAndSelf().each(function(ctrl){var callbacks=ctrl.settings.callbacks;if(callbacks&&(callback=callbacks[name])){scope=ctrl;return false;}});}
if(!callback){e.action=name;this.fire('execute',e);return;}
return callback.call(scope,e);};}
getEventDispatcher(self).on(name,resolveCallbackName(callback));return self;},off:function(name,callback){getEventDispatcher(this).off(name,callback);return this;},fire:function(name,args,bubble){var self=this;args=args||{};if(!args.control){args.control=self;}
args=getEventDispatcher(self).fire(name,args);if(bubble!==false&&self.parent){var parent=self.parent();while(parent&&!args.isPropagationStopped()){parent.fire(name,args,false);parent=parent.parent();}}
return args;},hasEventListeners:function(name){return getEventDispatcher(this).has(name);},parents:function(selector){var self=this,ctrl,parents=new Collection();for(ctrl=self.parent();ctrl;ctrl=ctrl.parent()){parents.add(ctrl);}
if(selector){parents=parents.filter(selector);}
return parents;},parentsAndSelf:function(selector){return new Collection(this).add(this.parents(selector));},next:function(){var parentControls=this.parent().items();return parentControls[parentControls.indexOf(this)+1];},prev:function(){var parentControls=this.parent().items();return parentControls[parentControls.indexOf(this)-1];},innerHtml:function(html){this.$el.html(html);return this;},getEl:function(suffix){var id=suffix?this._id+'-'+suffix:this._id;if(!this._elmCache[id]){this._elmCache[id]=$('#'+id)[0];}
return this._elmCache[id];},show:function(){return this.visible(true);},hide:function(){return this.visible(false);},focus:function(){try{this.getEl().focus();}catch(ex){}
return this;},blur:function(){this.getEl().blur();return this;},aria:function(name,value){var self=this,elm=self.getEl(self.ariaTarget);if(typeof value==="undefined"){return self._aria[name];}
self._aria[name]=value;if(self.state.get('rendered')){elm.setAttribute(name=='role'?name:'aria-'+name,value);}
return self;},encode:function(text,translate){if(translate!==false){text=this.translate(text);}
return(text||'').replace(/[&<>"]/g,function(match){return '&#'+match.charCodeAt(0)+';';});},translate:function(text){return Control.translate?Control.translate(text):text;},before:function(items){var self=this,parent=self.parent();if(parent){parent.insert(items,parent.items().indexOf(self),true);}
return self;},after:function(items){var self=this,parent=self.parent();if(parent){parent.insert(items,parent.items().indexOf(self));}
return self;},remove:function(){var self=this,elm=self.getEl(),parent=self.parent(),newItems,i;if(self.items){var controls=self.items().toArray();i=controls.length;while(i--){controls[i].remove();}}
if(parent&&parent.items){newItems=[];parent.items().each(function(item){if(item!==self){newItems.push(item);}});parent.items().set(newItems);parent._lastRect=null;}
if(self._eventsRoot&&self._eventsRoot==self){$(elm).off();}
var lookup=self.getRoot().controlIdLookup;if(lookup){delete lookup[self._id];}
if(elm&&elm.parentNode){elm.parentNode.removeChild(elm);}
self.state.set('rendered',false);self.state.destroy();self.fire('remove');return self;},renderBefore:function(elm){$(elm).before(this.renderHtml());this.postRender();return this;},renderTo:function(elm){$(elm||this.getContainerElm()).append(this.renderHtml());this.postRender();return this;},preRender:function(){},render:function(){},renderHtml:function(){return '<div id="'+this._id+'" class="'+this.classes+'"></div>';},postRender:function(){var self=this,settings=self.settings,elm,box,parent,name,parentEventsRoot;self.$el=$(self.getEl());self.state.set('rendered',true);for(name in settings){if(name.indexOf("on")===0){self.on(name.substr(2),settings[name]);}}
if(self._eventsRoot){for(parent=self.parent();!parentEventsRoot&&parent;parent=parent.parent()){parentEventsRoot=parent._eventsRoot;}
if(parentEventsRoot){for(name in parentEventsRoot._nativeEvents){self._nativeEvents[name]=true;}}}
bindPendingEvents(self);if(settings.style){elm=self.getEl();if(elm){elm.setAttribute('style',settings.style);elm.style.cssText=settings.style;}}
if(self.settings.border){box=self.borderBox;self.$el.css({'border-top-width':box.top,'border-right-width':box.right,'border-bottom-width':box.bottom,'border-left-width':box.left});}
var root=self.getRoot();if(!root.controlIdLookup){root.controlIdLookup={};}
root.controlIdLookup[self._id]=self;for(var key in self._aria){self.aria(key,self._aria[key]);}
if(self.state.get('visible')===false){self.getEl().style.display='none';}
self.bindStates();self.state.on('change:visible',function(e){var state=e.value,parentCtrl;if(self.state.get('rendered')){self.getEl().style.display=state===false?'none':'';self.getEl().getBoundingClientRect();}
parentCtrl=self.parent();if(parentCtrl){parentCtrl._lastRect=null;}
self.fire(state?'show':'hide');ReflowQueue.add(self);});self.fire('postrender',{},false);},bindStates:function(){},scrollIntoView:function(align){function getOffset(elm,rootElm){var x,y,parent=elm;x=y=0;while(parent&&parent!=rootElm&&parent.nodeType){x+=parent.offsetLeft||0;y+=parent.offsetTop||0;parent=parent.offsetParent;}
return{x:x,y:y};}
var elm=this.getEl(),parentElm=elm.parentNode;var x,y,width,height,parentWidth,parentHeight;var pos=getOffset(elm,parentElm);x=pos.x;y=pos.y;width=elm.offsetWidth;height=elm.offsetHeight;parentWidth=parentElm.clientWidth;parentHeight=parentElm.clientHeight;if(align=="end"){x-=parentWidth-width;y-=parentHeight-height;}else if(align=="center"){x-=(parentWidth/2)-(width/2);y-=(parentHeight/2)-(height/2);}
parentElm.scrollLeft=x;parentElm.scrollTop=y;return this;},getRoot:function(){var ctrl=this,rootControl,parents=[];while(ctrl){if(ctrl.rootControl){rootControl=ctrl.rootControl;break;}
parents.push(ctrl);rootControl=ctrl;ctrl=ctrl.parent();}
if(!rootControl){rootControl=this;}
var i=parents.length;while(i--){parents[i].rootControl=rootControl;}
return rootControl;},reflow:function(){ReflowQueue.remove(this);var parent=this.parent();if(parent._layout&&!parent._layout.isNative()){parent.reflow();}
return this;}};Tools.each('text title visible disabled active value'.split(' '),function(name){proto[name]=function(value){if(arguments.length===0){return this.state.get(name);}
if(typeof value!="undefined"){this.state.set(name,value);}
return this;};});Control=Class.extend(proto);function getEventDispatcher(obj){if(!obj._eventDispatcher){obj._eventDispatcher=new EventDispatcher({scope:obj,toggleEvent:function(name,state){if(state&&EventDispatcher.isNative(name)){if(!obj._nativeEvents){obj._nativeEvents={};}
obj._nativeEvents[name]=true;if(obj.state.get('rendered')){bindPendingEvents(obj);}}}});}
return obj._eventDispatcher;}
function bindPendingEvents(eventCtrl){var i,l,parents,eventRootCtrl,nativeEvents,name;function delegate(e){var control=eventCtrl.getParentCtrl(e.target);if(control){control.fire(e.type,e);}}
function mouseLeaveHandler(){var ctrl=eventRootCtrl._lastHoverCtrl;if(ctrl){ctrl.fire("mouseleave",{target:ctrl.getEl()});ctrl.parents().each(function(ctrl){ctrl.fire("mouseleave",{target:ctrl.getEl()});});eventRootCtrl._lastHoverCtrl=null;}}
function mouseEnterHandler(e){var ctrl=eventCtrl.getParentCtrl(e.target),lastCtrl=eventRootCtrl._lastHoverCtrl,idx=0,i,parents,lastParents;if(ctrl!==lastCtrl){eventRootCtrl._lastHoverCtrl=ctrl;parents=ctrl.parents().toArray().reverse();parents.push(ctrl);if(lastCtrl){lastParents=lastCtrl.parents().toArray().reverse();lastParents.push(lastCtrl);for(idx=0;idx<lastParents.length;idx++){if(parents[idx]!==lastParents[idx]){break;}}
for(i=lastParents.length-1;i>=idx;i--){lastCtrl=lastParents[i];lastCtrl.fire("mouseleave",{target:lastCtrl.getEl()});}}
for(i=idx;i<parents.length;i++){ctrl=parents[i];ctrl.fire("mouseenter",{target:ctrl.getEl()});}}}
function fixWheelEvent(e){e.preventDefault();if(e.type=="mousewheel"){e.deltaY=-1/40*e.wheelDelta;if(e.wheelDeltaX){e.deltaX=-1/40*e.wheelDeltaX;}}else{e.deltaX=0;e.deltaY=e.detail;}
e=eventCtrl.fire("wheel",e);}
nativeEvents=eventCtrl._nativeEvents;if(nativeEvents){parents=eventCtrl.parents().toArray();parents.unshift(eventCtrl);for(i=0,l=parents.length;!eventRootCtrl&&i<l;i++){eventRootCtrl=parents[i]._eventsRoot;}
if(!eventRootCtrl){eventRootCtrl=parents[parents.length-1]||eventCtrl;}
eventCtrl._eventsRoot=eventRootCtrl;for(l=i,i=0;i<l;i++){parents[i]._eventsRoot=eventRootCtrl;}
var eventRootDelegates=eventRootCtrl._delegates;if(!eventRootDelegates){eventRootDelegates=eventRootCtrl._delegates={};}
for(name in nativeEvents){if(!nativeEvents){return false;}
if(name==="wheel"&&!hasWheelEventSupport){if(hasMouseWheelEventSupport){$(eventCtrl.getEl()).on("mousewheel",fixWheelEvent);}else{$(eventCtrl.getEl()).on("DOMMouseScroll",fixWheelEvent);}
continue;}
if(name==="mouseenter"||name==="mouseleave"){if(!eventRootCtrl._hasMouseEnter){$(eventRootCtrl.getEl()).on("mouseleave",mouseLeaveHandler).on("mouseover",mouseEnterHandler);eventRootCtrl._hasMouseEnter=1;}}else if(!eventRootDelegates[name]){$(eventRootCtrl.getEl()).on(name,delegate);eventRootDelegates[name]=true;}
nativeEvents[name]=false;}}}
return Control;});define("tinymce/ui/Factory",[],function(){"use strict";var types={},namespaceInit;return{add:function(type,typeClass){types[type.toLowerCase()]=typeClass;},has:function(type){return!!types[type.toLowerCase()];},create:function(type,settings){var ControlType,name,namespace;if(!namespaceInit){namespace=tinymce.ui;for(name in namespace){types[name.toLowerCase()]=namespace[name];}
namespaceInit=true;}
if(typeof type=='string'){settings=settings||{};settings.type=type;}else{settings=type;type=settings.type;}
type=type.toLowerCase();ControlType=types[type];if(!ControlType){throw new Error("Could not find control by type: "+type);}
ControlType=new ControlType(settings);ControlType.type=type;return ControlType;}};});define("tinymce/ui/KeyboardNavigation",[],function(){"use strict";return function(settings){var root=settings.root,focusedElement,focusedControl;function isElement(node){return node&&node.nodeType===1;}
try{focusedElement=document.activeElement;}catch(ex){focusedElement=document.body;}
focusedControl=root.getParentCtrl(focusedElement);function getRole(elm){elm=elm||focusedElement;if(isElement(elm)){return elm.getAttribute('role');}
return null;}
function getParentRole(elm){var role,parent=elm||focusedElement;while((parent=parent.parentNode)){if((role=getRole(parent))){return role;}}}
function getAriaProp(name){var elm=focusedElement;if(isElement(elm)){return elm.getAttribute('aria-'+name);}}
function isTextInputElement(elm){var tagName=elm.tagName.toUpperCase();return tagName=="INPUT"||tagName=="TEXTAREA"||tagName=="SELECT";}
function canFocus(elm){if(isTextInputElement(elm)&&!elm.hidden){return true;}
if(/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell|slider)$/.test(getRole(elm))){return true;}
return false;}
function getFocusElements(elm){var elements=[];function collect(elm){if(elm.nodeType!=1||elm.style.display=='none'){return;}
if(canFocus(elm)){elements.push(elm);}
for(var i=0;i<elm.childNodes.length;i++){collect(elm.childNodes[i]);}}
collect(elm||root.getEl());return elements;}
function getNavigationRoot(targetControl){var navigationRoot,controls;targetControl=targetControl||focusedControl;controls=targetControl.parents().toArray();controls.unshift(targetControl);for(var i=0;i<controls.length;i++){navigationRoot=controls[i];if(navigationRoot.settings.ariaRoot){break;}}
return navigationRoot;}
function focusFirst(targetControl){var navigationRoot=getNavigationRoot(targetControl);var focusElements=getFocusElements(navigationRoot.getEl());if(navigationRoot.settings.ariaRemember&&"lastAriaIndex"in navigationRoot){moveFocusToIndex(navigationRoot.lastAriaIndex,focusElements);}else{moveFocusToIndex(0,focusElements);}}
function moveFocusToIndex(idx,elements){if(idx<0){idx=elements.length-1;}else if(idx>=elements.length){idx=0;}
if(elements[idx]){elements[idx].focus();}
return idx;}
function moveFocus(dir,elements){var idx=-1,navigationRoot=getNavigationRoot();elements=elements||getFocusElements(navigationRoot.getEl());for(var i=0;i<elements.length;i++){if(elements[i]===focusedElement){idx=i;}}
idx+=dir;navigationRoot.lastAriaIndex=moveFocusToIndex(idx,elements);}
function left(){var parentRole=getParentRole();if(parentRole=="tablist"){moveFocus(-1,getFocusElements(focusedElement.parentNode));}else if(focusedControl.parent().submenu){cancel();}else{moveFocus(-1);}}
function right(){var role=getRole(),parentRole=getParentRole();if(parentRole=="tablist"){moveFocus(1,getFocusElements(focusedElement.parentNode));}else if(role=="menuitem"&&parentRole=="menu"&&getAriaProp('haspopup')){enter();}else{moveFocus(1);}}
function up(){moveFocus(-1);}
function down(){var role=getRole(),parentRole=getParentRole();if(role=="menuitem"&&parentRole=="menubar"){enter();}else if(role=="button"&&getAriaProp('haspopup')){enter({key:'down'});}else{moveFocus(1);}}
function tab(e){var parentRole=getParentRole();if(parentRole=="tablist"){var elm=getFocusElements(focusedControl.getEl('body'))[0];if(elm){elm.focus();}}else{moveFocus(e.shiftKey?-1:1);}}
function cancel(){focusedControl.fire('cancel');}
function enter(aria){aria=aria||{};focusedControl.fire('click',{target:focusedElement,aria:aria});}
root.on('keydown',function(e){function handleNonTabOrEscEvent(e,handler){if(isTextInputElement(focusedElement)){return;}
if(getRole(focusedElement)==='slider'){return;}
if(handler(e)!==false){e.preventDefault();}}
if(e.isDefaultPrevented()){return;}
switch(e.keyCode){case 37:handleNonTabOrEscEvent(e,left);break;case 39:handleNonTabOrEscEvent(e,right);break;case 38:handleNonTabOrEscEvent(e,up);break;case 40:handleNonTabOrEscEvent(e,down);break;case 27:cancel();break;case 14:case 13:case 32:handleNonTabOrEscEvent(e,enter);break;case 9:if(tab(e)!==false){e.preventDefault();}
break;}});root.on('focusin',function(e){focusedElement=e.target;focusedControl=e.control;});return{focusFirst:focusFirst};};});define("tinymce/ui/Container",["tinymce/ui/Control","tinymce/ui/Collection","tinymce/ui/Selector","tinymce/ui/Factory","tinymce/ui/KeyboardNavigation","tinymce/util/Tools","tinymce/dom/DomQuery","tinymce/ui/ClassList","tinymce/ui/ReflowQueue"],function(Control,Collection,Selector,Factory,KeyboardNavigation,Tools,$,ClassList,ReflowQueue){"use strict";var selectorCache={};return Control.extend({init:function(settings){var self=this;self._super(settings);settings=self.settings;if(settings.fixed){self.state.set('fixed',true);}
self._items=new Collection();if(self.isRtl()){self.classes.add('rtl');}
self.bodyClasses=new ClassList(function(){if(self.state.get('rendered')){self.getEl('body').className=this.toString();}});self.bodyClasses.prefix=self.classPrefix;self.classes.add('container');self.bodyClasses.add('container-body');if(settings.containerCls){self.classes.add(settings.containerCls);}
self._layout=Factory.create((settings.layout||'')+'layout');if(self.settings.items){self.add(self.settings.items);}else{self.add(self.render());}
self._hasBody=true;},items:function(){return this._items;},find:function(selector){selector=selectorCache[selector]=selectorCache[selector]||new Selector(selector);return selector.find(this);},add:function(items){var self=this;self.items().add(self.create(items)).parent(self);return self;},focus:function(keyboard){var self=this,focusCtrl,keyboardNav,items;if(keyboard){keyboardNav=self.keyboardNav||self.parents().eq(-1)[0].keyboardNav;if(keyboardNav){keyboardNav.focusFirst(self);return;}}
items=self.find('*');if(self.statusbar){items.add(self.statusbar.items());}
items.each(function(ctrl){if(ctrl.settings.autofocus){focusCtrl=null;return false;}
if(ctrl.canFocus){focusCtrl=focusCtrl||ctrl;}});if(focusCtrl){focusCtrl.focus();}
return self;},replace:function(oldItem,newItem){var ctrlElm,items=this.items(),i=items.length;while(i--){if(items[i]===oldItem){items[i]=newItem;break;}}
if(i>=0){ctrlElm=newItem.getEl();if(ctrlElm){ctrlElm.parentNode.removeChild(ctrlElm);}
ctrlElm=oldItem.getEl();if(ctrlElm){ctrlElm.parentNode.removeChild(ctrlElm);}}
newItem.parent(this);},create:function(items){var self=this,settings,ctrlItems=[];if(!Tools.isArray(items)){items=[items];}
Tools.each(items,function(item){if(item){if(!(item instanceof Control)){if(typeof item=="string"){item={type:item};}
settings=Tools.extend({},self.settings.defaults,item);item.type=settings.type=settings.type||item.type||self.settings.defaultType||(settings.defaults?settings.defaults.type:null);item=Factory.create(settings);}
ctrlItems.push(item);}});return ctrlItems;},renderNew:function(){var self=this;self.items().each(function(ctrl,index){var containerElm;ctrl.parent(self);if(!ctrl.state.get('rendered')){containerElm=self.getEl('body');if(containerElm.hasChildNodes()&&index<=containerElm.childNodes.length-1){$(containerElm.childNodes[index]).before(ctrl.renderHtml());}else{$(containerElm).append(ctrl.renderHtml());}
ctrl.postRender();ReflowQueue.add(ctrl);}});self._layout.applyClasses(self.items().filter(':visible'));self._lastRect=null;return self;},append:function(items){return this.add(items).renderNew();},prepend:function(items){var self=this;self.items().set(self.create(items).concat(self.items().toArray()));return self.renderNew();},insert:function(items,index,before){var self=this,curItems,beforeItems,afterItems;items=self.create(items);curItems=self.items();if(!before&&index<curItems.length-1){index+=1;}
if(index>=0&&index<curItems.length){beforeItems=curItems.slice(0,index).toArray();afterItems=curItems.slice(index).toArray();curItems.set(beforeItems.concat(items,afterItems));}
return self.renderNew();},fromJSON:function(data){var self=this;for(var name in data){self.find('#'+name).value(data[name]);}
return self;},toJSON:function(){var self=this,data={};self.find('*').each(function(ctrl){var name=ctrl.name(),value=ctrl.value();if(name&&typeof value!="undefined"){data[name]=value;}});return data;},renderHtml:function(){var self=this,layout=self._layout,role=this.settings.role;self.preRender();layout.preRender(self);return('<div id="'+self._id+'" class="'+self.classes+'"'+(role?' role="'+this.settings.role+'"':'')+'>'+
'<div id="'+self._id+'-body" class="'+self.bodyClasses+'">'+
(self.settings.html||'')+layout.renderHtml(self)+
'</div>'+
'</div>');},postRender:function(){var self=this,box;self.items().exec('postRender');self._super();self._layout.postRender(self);self.state.set('rendered',true);if(self.settings.style){self.$el.css(self.settings.style);}
if(self.settings.border){box=self.borderBox;self.$el.css({'border-top-width':box.top,'border-right-width':box.right,'border-bottom-width':box.bottom,'border-left-width':box.left});}
if(!self.parent()){self.keyboardNav=new KeyboardNavigation({root:self});}
return self;},initLayoutRect:function(){var self=this,layoutRect=self._super();self._layout.recalc(self);return layoutRect;},recalc:function(){var self=this,rect=self._layoutRect,lastRect=self._lastRect;if(!lastRect||lastRect.w!=rect.w||lastRect.h!=rect.h){self._layout.recalc(self);rect=self.layoutRect();self._lastRect={x:rect.x,y:rect.y,w:rect.w,h:rect.h};return true;}},reflow:function(){var i;ReflowQueue.remove(this);if(this.visible()){Control.repaintControls=[];Control.repaintControls.map={};this.recalc();i=Control.repaintControls.length;while(i--){Control.repaintControls[i].repaint();}
if(this.settings.layout!=="flow"&&this.settings.layout!=="stack"){this.repaint();}
Control.repaintControls=[];}
return this;}});});define("tinymce/ui/DragHelper",["tinymce/dom/DomQuery"],function($){"use strict";function getDocumentSize(doc){var documentElement,body,scrollWidth,clientWidth;var offsetWidth,scrollHeight,clientHeight,offsetHeight,max=Math.max;documentElement=doc.documentElement;body=doc.body;scrollWidth=max(documentElement.scrollWidth,body.scrollWidth);clientWidth=max(documentElement.clientWidth,body.clientWidth);offsetWidth=max(documentElement.offsetWidth,body.offsetWidth);scrollHeight=max(documentElement.scrollHeight,body.scrollHeight);clientHeight=max(documentElement.clientHeight,body.clientHeight);offsetHeight=max(documentElement.offsetHeight,body.offsetHeight);return{width:scrollWidth<offsetWidth?clientWidth:scrollWidth,height:scrollHeight<offsetHeight?clientHeight:scrollHeight};}
function updateWithTouchData(e){var keys,i;if(e.changedTouches){keys="screenX screenY pageX pageY clientX clientY".split(' ');for(i=0;i<keys.length;i++){e[keys[i]]=e.changedTouches[0][keys[i]];}}}
return function(id,settings){var $eventOverlay,doc=settings.document||document,downButton,start,stop,drag,startX,startY;settings=settings||{};function getHandleElm(){return doc.getElementById(settings.handle||id);}
start=function(e){var docSize=getDocumentSize(doc),handleElm,cursor;updateWithTouchData(e);e.preventDefault();downButton=e.button;handleElm=getHandleElm();startX=e.screenX;startY=e.screenY;if(window.getComputedStyle){cursor=window.getComputedStyle(handleElm,null).getPropertyValue("cursor");}else{cursor=handleElm.runtimeStyle.cursor;}
$eventOverlay=$('<div>').css({position:"absolute",top:0,left:0,width:docSize.width,height:docSize.height,zIndex:0x7FFFFFFF,opacity:0.0001,cursor:cursor}).appendTo(doc.body);$(doc).on('mousemove touchmove',drag).on('mouseup touchend',stop);settings.start(e);};drag=function(e){updateWithTouchData(e);if(e.button!==downButton){return stop(e);}
e.deltaX=e.screenX-startX;e.deltaY=e.screenY-startY;e.preventDefault();settings.drag(e);};stop=function(e){updateWithTouchData(e);$(doc).off('mousemove touchmove',drag).off('mouseup touchend',stop);$eventOverlay.remove();if(settings.stop){settings.stop(e);}};this.destroy=function(){$(getHandleElm()).off();};$(getHandleElm()).on('mousedown touchstart',start);};});define("tinymce/ui/Scrollable",["tinymce/dom/DomQuery","tinymce/ui/DragHelper"],function($,DragHelper){"use strict";return{init:function(){var self=this;self.on('repaint',self.renderScroll);},renderScroll:function(){var self=this,margin=2;function repaintScroll(){var hasScrollH,hasScrollV,bodyElm;function repaintAxis(axisName,posName,sizeName,contentSizeName,hasScroll,ax){var containerElm,scrollBarElm,scrollThumbElm;var containerSize,scrollSize,ratio,rect;var posNameLower,sizeNameLower;scrollBarElm=self.getEl('scroll'+axisName);if(scrollBarElm){posNameLower=posName.toLowerCase();sizeNameLower=sizeName.toLowerCase();$(self.getEl('absend')).css(posNameLower,self.layoutRect()[contentSizeName]-1);if(!hasScroll){$(scrollBarElm).css('display','none');return;}
$(scrollBarElm).css('display','block');containerElm=self.getEl('body');scrollThumbElm=self.getEl('scroll'+axisName+"t");containerSize=containerElm["client"+sizeName]-(margin*2);containerSize-=hasScrollH&&hasScrollV?scrollBarElm["client"+ax]:0;scrollSize=containerElm["scroll"+sizeName];ratio=containerSize/scrollSize;rect={};rect[posNameLower]=containerElm["offset"+posName]+margin;rect[sizeNameLower]=containerSize;$(scrollBarElm).css(rect);rect={};rect[posNameLower]=containerElm["scroll"+posName]*ratio;rect[sizeNameLower]=containerSize*ratio;$(scrollThumbElm).css(rect);}}
bodyElm=self.getEl('body');hasScrollH=bodyElm.scrollWidth>bodyElm.clientWidth;hasScrollV=bodyElm.scrollHeight>bodyElm.clientHeight;repaintAxis("h","Left","Width","contentW",hasScrollH,"Height");repaintAxis("v","Top","Height","contentH",hasScrollV,"Width");}
function addScroll(){function addScrollAxis(axisName,posName,sizeName,deltaPosName,ax){var scrollStart,axisId=self._id+'-scroll'+axisName,prefix=self.classPrefix;$(self.getEl()).append('<div id="'+axisId+'" class="'+prefix+'scrollbar '+prefix+'scrollbar-'+axisName+'">'+
'<div id="'+axisId+'t" class="'+prefix+'scrollbar-thumb"></div>'+
'</div>');self.draghelper=new DragHelper(axisId+'t',{start:function(){scrollStart=self.getEl('body')["scroll"+posName];$('#'+axisId).addClass(prefix+'active');},drag:function(e){var ratio,hasScrollH,hasScrollV,containerSize,layoutRect=self.layoutRect();hasScrollH=layoutRect.contentW>layoutRect.innerW;hasScrollV=layoutRect.contentH>layoutRect.innerH;containerSize=self.getEl('body')["client"+sizeName]-(margin*2);containerSize-=hasScrollH&&hasScrollV?self.getEl('scroll'+axisName)["client"+ax]:0;ratio=containerSize/self.getEl('body')["scroll"+sizeName];self.getEl('body')["scroll"+posName]=scrollStart+(e["delta"+deltaPosName]/ratio);},stop:function(){$('#'+axisId).removeClass(prefix+'active');}});}
self.classes.add('scroll');addScrollAxis("v","Top","Height","Y","Width");addScrollAxis("h","Left","Width","X","Height");}
if(self.settings.autoScroll){if(!self._hasScroll){self._hasScroll=true;addScroll();self.on('wheel',function(e){var bodyEl=self.getEl('body');bodyEl.scrollLeft+=(e.deltaX||0)*10;bodyEl.scrollTop+=e.deltaY*10;repaintScroll();});$(self.getEl('body')).on("scroll",repaintScroll);}
repaintScroll();}}};});define("tinymce/ui/Panel",["tinymce/ui/Container","tinymce/ui/Scrollable"],function(Container,Scrollable){"use strict";return Container.extend({Defaults:{layout:'fit',containerCls:'panel'},Mixins:[Scrollable],renderHtml:function(){var self=this,layout=self._layout,innerHtml=self.settings.html;self.preRender();layout.preRender(self);if(typeof innerHtml=="undefined"){innerHtml=('<div id="'+self._id+'-body" class="'+self.bodyClasses+'">'+
layout.renderHtml(self)+
'</div>');}else{if(typeof innerHtml=='function'){innerHtml=innerHtml.call(self);}
self._hasBody=false;}
return('<div id="'+self._id+'" class="'+self.classes+'" hidefocus="1" tabindex="-1" role="group">'+
(self._preBodyHtml||'')+
innerHtml+
'</div>');}});});define("tinymce/ui/Movable",["tinymce/ui/DomUtils"],function(DomUtils){"use strict";function calculateRelativePosition(ctrl,targetElm,rel){var ctrlElm,pos,x,y,selfW,selfH,targetW,targetH,viewport,size;viewport=DomUtils.getViewPort();pos=DomUtils.getPos(targetElm);x=pos.x;y=pos.y;if(ctrl.state.get('fixed')&&DomUtils.getRuntimeStyle(document.body,'position')=='static'){x-=viewport.x;y-=viewport.y;}
ctrlElm=ctrl.getEl();size=DomUtils.getSize(ctrlElm);selfW=size.width;selfH=size.height;size=DomUtils.getSize(targetElm);targetW=size.width;targetH=size.height;rel=(rel||'').split('');if(rel[0]==='b'){y+=targetH;}
if(rel[1]==='r'){x+=targetW;}
if(rel[0]==='c'){y+=Math.round(targetH/2);}
if(rel[1]==='c'){x+=Math.round(targetW/2);}
if(rel[3]==='b'){y-=selfH;}
if(rel[4]==='r'){x-=selfW;}
if(rel[3]==='c'){y-=Math.round(selfH/2);}
if(rel[4]==='c'){x-=Math.round(selfW/2);}
return{x:x,y:y,w:selfW,h:selfH};}
return{testMoveRel:function(elm,rels){var viewPortRect=DomUtils.getViewPort();for(var i=0;i<rels.length;i++){var pos=calculateRelativePosition(this,elm,rels[i]);if(this.state.get('fixed')){if(pos.x>0&&pos.x+pos.w<viewPortRect.w&&pos.y>0&&pos.y+pos.h<viewPortRect.h){return rels[i];}}else{if(pos.x>viewPortRect.x&&pos.x+pos.w<viewPortRect.w+viewPortRect.x&&pos.y>viewPortRect.y&&pos.y+pos.h<viewPortRect.h+viewPortRect.y){return rels[i];}}}
return rels[0];},moveRel:function(elm,rel){if(typeof rel!='string'){rel=this.testMoveRel(elm,rel);}
var pos=calculateRelativePosition(this,elm,rel);return this.moveTo(pos.x,pos.y);},moveBy:function(dx,dy){var self=this,rect=self.layoutRect();self.moveTo(rect.x+dx,rect.y+dy);return self;},moveTo:function(x,y){var self=this;function constrain(value,max,size){if(value<0){return 0;}
if(value+size>max){value=max-size;return value<0?0:value;}
return value;}
if(self.settings.constrainToViewport){var viewPortRect=DomUtils.getViewPort(window);var layoutRect=self.layoutRect();x=constrain(x,viewPortRect.w+viewPortRect.x,layoutRect.w);y=constrain(y,viewPortRect.h+viewPortRect.y,layoutRect.h);}
if(self.state.get('rendered')){self.layoutRect({x:x,y:y}).repaint();}else{self.settings.x=x;self.settings.y=y;}
self.fire('move',{x:x,y:y});return self;}};});define("tinymce/ui/Resizable",["tinymce/ui/DomUtils"],function(DomUtils){"use strict";return{resizeToContent:function(){this._layoutRect.autoResize=true;this._lastRect=null;this.reflow();},resizeTo:function(w,h){if(w<=1||h<=1){var rect=DomUtils.getWindowSize();w=w<=1?w*rect.w:w;h=h<=1?h*rect.h:h;}
this._layoutRect.autoResize=false;return this.layoutRect({minW:w,minH:h,w:w,h:h}).reflow();},resizeBy:function(dw,dh){var self=this,rect=self.layoutRect();return self.resizeTo(rect.w+dw,rect.h+dh);}};});define("tinymce/ui/FloatPanel",["tinymce/ui/Panel","tinymce/ui/Movable","tinymce/ui/Resizable","tinymce/ui/DomUtils","tinymce/dom/DomQuery","tinymce/util/Delay"],function(Panel,Movable,Resizable,DomUtils,$,Delay){"use strict";var documentClickHandler,documentScrollHandler,windowResizeHandler,visiblePanels=[];var zOrder=[],hasModal;function isChildOf(ctrl,parent){while(ctrl){if(ctrl==parent){return true;}
ctrl=ctrl.parent();}}
function skipOrHidePanels(e){var i=visiblePanels.length;while(i--){var panel=visiblePanels[i],clickCtrl=panel.getParentCtrl(e.target);if(panel.settings.autohide){if(clickCtrl){if(isChildOf(clickCtrl,panel)||panel.parent()===clickCtrl){continue;}}
e=panel.fire('autohide',{target:e.target});if(!e.isDefaultPrevented()){panel.hide();}}}}
function bindDocumentClickHandler(){if(!documentClickHandler){documentClickHandler=function(e){if(e.button==2){return;}
skipOrHidePanels(e);};$(document).on('click touchstart',documentClickHandler);}}
function bindDocumentScrollHandler(){if(!documentScrollHandler){documentScrollHandler=function(){var i;i=visiblePanels.length;while(i--){repositionPanel(visiblePanels[i]);}};$(window).on('scroll',documentScrollHandler);}}
function bindWindowResizeHandler(){if(!windowResizeHandler){var docElm=document.documentElement,clientWidth=docElm.clientWidth,clientHeight=docElm.clientHeight;windowResizeHandler=function(){if(!document.all||clientWidth!=docElm.clientWidth||clientHeight!=docElm.clientHeight){clientWidth=docElm.clientWidth;clientHeight=docElm.clientHeight;FloatPanel.hideAll();}};$(window).on('resize',windowResizeHandler);}}
function repositionPanel(panel){var scrollY=DomUtils.getViewPort().y;function toggleFixedChildPanels(fixed,deltaY){var parent;for(var i=0;i<visiblePanels.length;i++){if(visiblePanels[i]!=panel){parent=visiblePanels[i].parent();while(parent&&(parent=parent.parent())){if(parent==panel){visiblePanels[i].fixed(fixed).moveBy(0,deltaY).repaint();}}}}}
if(panel.settings.autofix){if(!panel.state.get('fixed')){panel._autoFixY=panel.layoutRect().y;if(panel._autoFixY<scrollY){panel.fixed(true).layoutRect({y:0}).repaint();toggleFixedChildPanels(true,scrollY-panel._autoFixY);}}else{if(panel._autoFixY>scrollY){panel.fixed(false).layoutRect({y:panel._autoFixY}).repaint();toggleFixedChildPanels(false,panel._autoFixY-scrollY);}}}}
function addRemove(add,ctrl){var i,zIndex=FloatPanel.zIndex||0xFFFF,topModal;if(add){zOrder.push(ctrl);}else{i=zOrder.length;while(i--){if(zOrder[i]===ctrl){zOrder.splice(i,1);}}}
if(zOrder.length){for(i=0;i<zOrder.length;i++){if(zOrder[i].modal){zIndex++;topModal=zOrder[i];}
zOrder[i].getEl().style.zIndex=zIndex;zOrder[i].zIndex=zIndex;zIndex++;}}
var modalBlockEl=$('#'+ctrl.classPrefix+'modal-block',ctrl.getContainerElm())[0];if(topModal){$(modalBlockEl).css('z-index',topModal.zIndex-1);}else if(modalBlockEl){modalBlockEl.parentNode.removeChild(modalBlockEl);hasModal=false;}
FloatPanel.currentZIndex=zIndex;}
var FloatPanel=Panel.extend({Mixins:[Movable,Resizable],init:function(settings){var self=this;self._super(settings);self._eventsRoot=self;self.classes.add('floatpanel');if(settings.autohide){bindDocumentClickHandler();bindWindowResizeHandler();visiblePanels.push(self);}
if(settings.autofix){bindDocumentScrollHandler();self.on('move',function(){repositionPanel(this);});}
self.on('postrender show',function(e){if(e.control==self){var $modalBlockEl,prefix=self.classPrefix;if(self.modal&&!hasModal){$modalBlockEl=$('#'+prefix+'modal-block',self.getContainerElm());if(!$modalBlockEl[0]){$modalBlockEl=$('<div id="'+prefix+'modal-block" class="'+prefix+'reset '+prefix+'fade"></div>').appendTo(self.getContainerElm());}
Delay.setTimeout(function(){$modalBlockEl.addClass(prefix+'in');$(self.getEl()).addClass(prefix+'in');});hasModal=true;}
addRemove(true,self);}});self.on('show',function(){self.parents().each(function(ctrl){if(ctrl.state.get('fixed')){self.fixed(true);return false;}});});if(settings.popover){self._preBodyHtml='<div class="'+self.classPrefix+'arrow"></div>';self.classes.add('popover').add('bottom').add(self.isRtl()?'end':'start');}
self.aria('label',settings.ariaLabel);self.aria('labelledby',self._id);self.aria('describedby',self.describedBy||self._id+'-none');},fixed:function(state){var self=this;if(self.state.get('fixed')!=state){if(self.state.get('rendered')){var viewport=DomUtils.getViewPort();if(state){self.layoutRect().y-=viewport.y;}else{self.layoutRect().y+=viewport.y;}}
self.classes.toggle('fixed',state);self.state.set('fixed',state);}
return self;},show:function(){var self=this,i,state=self._super();i=visiblePanels.length;while(i--){if(visiblePanels[i]===self){break;}}
if(i===-1){visiblePanels.push(self);}
return state;},hide:function(){removeVisiblePanel(this);addRemove(false,this);return this._super();},hideAll:function(){FloatPanel.hideAll();},close:function(){var self=this;if(!self.fire('close').isDefaultPrevented()){self.remove();addRemove(false,self);}
return self;},remove:function(){removeVisiblePanel(this);this._super();},postRender:function(){var self=this;if(self.settings.bodyRole){this.getEl('body').setAttribute('role',self.settings.bodyRole);}
return self._super();}});FloatPanel.hideAll=function(){var i=visiblePanels.length;while(i--){var panel=visiblePanels[i];if(panel&&panel.settings.autohide){panel.hide();visiblePanels.splice(i,1);}}};function removeVisiblePanel(panel){var i;i=visiblePanels.length;while(i--){if(visiblePanels[i]===panel){visiblePanels.splice(i,1);}}
i=zOrder.length;while(i--){if(zOrder[i]===panel){zOrder.splice(i,1);}}}
return FloatPanel;});define("tinymce/ui/Window",["tinymce/ui/FloatPanel","tinymce/ui/Panel","tinymce/ui/DomUtils","tinymce/dom/DomQuery","tinymce/ui/DragHelper","tinymce/ui/BoxUtils","tinymce/Env","tinymce/util/Delay"],function(FloatPanel,Panel,DomUtils,$,DragHelper,BoxUtils,Env,Delay){"use strict";var windows=[],oldMetaValue='';function toggleFullScreenState(state){var noScaleMetaValue='width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0',viewport=$("meta[name=viewport]")[0],contentValue;if(Env.overrideViewPort===false){return;}
if(!viewport){viewport=document.createElement('meta');viewport.setAttribute('name','viewport');document.getElementsByTagName('head')[0].appendChild(viewport);}
contentValue=viewport.getAttribute('content');if(contentValue&&typeof oldMetaValue!='undefined'){oldMetaValue=contentValue;}
viewport.setAttribute('content',state?noScaleMetaValue:oldMetaValue);}
function toggleBodyFullScreenClasses(classPrefix){for(var i=0;i<windows.length;i++){if(windows[i]._fullscreen){return;}}
$([document.documentElement,document.body]).removeClass(classPrefix+'fullscreen');}
function handleWindowResize(){if(!Env.desktop){var lastSize={w:window.innerWidth,h:window.innerHeight};Delay.setInterval(function(){var w=window.innerWidth,h=window.innerHeight;if(lastSize.w!=w||lastSize.h!=h){lastSize={w:w,h:h};$(window).trigger('resize');}},100);}
function reposition(){var i,rect=DomUtils.getWindowSize(),layoutRect;for(i=0;i<windows.length;i++){layoutRect=windows[i].layoutRect();windows[i].moveTo(windows[i].settings.x||Math.max(0,rect.w/2-layoutRect.w/2),windows[i].settings.y||Math.max(0,rect.h/2-layoutRect.h/2));}}
$(window).on('resize',reposition);}
var Window=FloatPanel.extend({modal:true,Defaults:{border:1,layout:'flex',containerCls:'panel',role:'dialog',callbacks:{submit:function(){this.fire('submit',{data:this.toJSON()});},close:function(){this.close();}}},init:function(settings){var self=this;self._super(settings);if(self.isRtl()){self.classes.add('rtl');}
self.classes.add('window');self.bodyClasses.add('window-body');self.state.set('fixed',true);if(settings.buttons){self.statusbar=new Panel({layout:'flex',border:'1 0 0 0',spacing:3,padding:10,align:'center',pack:self.isRtl()?'start':'end',defaults:{type:'button'},items:settings.buttons});self.statusbar.classes.add('foot');self.statusbar.parent(self);}
self.on('click',function(e){var closeClass=self.classPrefix+'close';if(DomUtils.hasClass(e.target,closeClass)||DomUtils.hasClass(e.target.parentNode,closeClass)){self.close();}});self.on('cancel',function(){self.close();});self.aria('describedby',self.describedBy||self._id+'-none');self.aria('label',settings.title);self._fullscreen=false;},recalc:function(){var self=this,statusbar=self.statusbar,layoutRect,width,x,needsRecalc;if(self._fullscreen){self.layoutRect(DomUtils.getWindowSize());self.layoutRect().contentH=self.layoutRect().innerH;}
self._super();layoutRect=self.layoutRect();if(self.settings.title&&!self._fullscreen){width=layoutRect.headerW;if(width>layoutRect.w){x=layoutRect.x-Math.max(0,width/2);self.layoutRect({w:width,x:x});needsRecalc=true;}}
if(statusbar){statusbar.layoutRect({w:self.layoutRect().innerW}).recalc();width=statusbar.layoutRect().minW+layoutRect.deltaW;if(width>layoutRect.w){x=layoutRect.x-Math.max(0,width-layoutRect.w);self.layoutRect({w:width,x:x});needsRecalc=true;}}
if(needsRecalc){self.recalc();}},initLayoutRect:function(){var self=this,layoutRect=self._super(),deltaH=0,headEl;if(self.settings.title&&!self._fullscreen){headEl=self.getEl('head');var size=DomUtils.getSize(headEl);layoutRect.headerW=size.width;layoutRect.headerH=size.height;deltaH+=layoutRect.headerH;}
if(self.statusbar){deltaH+=self.statusbar.layoutRect().h;}
layoutRect.deltaH+=deltaH;layoutRect.minH+=deltaH;layoutRect.h+=deltaH;var rect=DomUtils.getWindowSize();layoutRect.x=self.settings.x||Math.max(0,rect.w/2-layoutRect.w/2);layoutRect.y=self.settings.y||Math.max(0,rect.h/2-layoutRect.h/2);return layoutRect;},renderHtml:function(){var self=this,layout=self._layout,id=self._id,prefix=self.classPrefix;var settings=self.settings,headerHtml='',footerHtml='',html=settings.html;self.preRender();layout.preRender(self);if(settings.title){headerHtml=('<div id="'+id+'-head" class="'+prefix+'window-head">'+
'<div id="'+id+'-title" class="'+prefix+'title">'+self.encode(settings.title)+'</div>'+
'<div id="'+id+'-dragh" class="'+prefix+'dragh"></div>'+
'<button type="button" class="'+prefix+'close" aria-hidden="true">'+
'<i class="mce-ico mce-i-remove"></i>'+
'</button>'+
'</div>');}
if(settings.url){html='<iframe src="'+settings.url+'" tabindex="-1"></iframe>';}
if(typeof html=="undefined"){html=layout.renderHtml(self);}
if(self.statusbar){footerHtml=self.statusbar.renderHtml();}
return('<div id="'+id+'" class="'+self.classes+'" hidefocus="1">'+
'<div class="'+self.classPrefix+'reset" role="application">'+
headerHtml+
'<div id="'+id+'-body" class="'+self.bodyClasses+'">'+
html+
'</div>'+
footerHtml+
'</div>'+
'</div>');},fullscreen:function(state){var self=this,documentElement=document.documentElement,slowRendering,prefix=self.classPrefix,layoutRect;if(state!=self._fullscreen){$(window).on('resize',function(){var time;if(self._fullscreen){if(!slowRendering){time=new Date().getTime();var rect=DomUtils.getWindowSize();self.moveTo(0,0).resizeTo(rect.w,rect.h);if((new Date().getTime())-time>50){slowRendering=true;}}else{if(!self._timer){self._timer=Delay.setTimeout(function(){var rect=DomUtils.getWindowSize();self.moveTo(0,0).resizeTo(rect.w,rect.h);self._timer=0;},50);}}}});layoutRect=self.layoutRect();self._fullscreen=state;if(!state){self.borderBox=BoxUtils.parseBox(self.settings.border);self.getEl('head').style.display='';layoutRect.deltaH+=layoutRect.headerH;$([documentElement,document.body]).removeClass(prefix+'fullscreen');self.classes.remove('fullscreen');self.moveTo(self._initial.x,self._initial.y).resizeTo(self._initial.w,self._initial.h);}else{self._initial={x:layoutRect.x,y:layoutRect.y,w:layoutRect.w,h:layoutRect.h};self.borderBox=BoxUtils.parseBox('0');self.getEl('head').style.display='none';layoutRect.deltaH-=layoutRect.headerH+2;$([documentElement,document.body]).addClass(prefix+'fullscreen');self.classes.add('fullscreen');var rect=DomUtils.getWindowSize();self.moveTo(0,0).resizeTo(rect.w,rect.h);}}
return self.reflow();},postRender:function(){var self=this,startPos;setTimeout(function(){self.classes.add('in');self.fire('open');},0);self._super();if(self.statusbar){self.statusbar.postRender();}
self.focus();this.dragHelper=new DragHelper(self._id+'-dragh',{start:function(){startPos={x:self.layoutRect().x,y:self.layoutRect().y};},drag:function(e){self.moveTo(startPos.x+e.deltaX,startPos.y+e.deltaY);}});self.on('submit',function(e){if(!e.isDefaultPrevented()){self.close();}});windows.push(self);toggleFullScreenState(true);},submit:function(){return this.fire('submit',{data:this.toJSON()});},remove:function(){var self=this,i;self.dragHelper.destroy();self._super();if(self.statusbar){this.statusbar.remove();}
i=windows.length;while(i--){if(windows[i]===self){windows.splice(i,1);}}
toggleFullScreenState(windows.length>0);toggleBodyFullScreenClasses(self.classPrefix);},getContentWindow:function(){var ifr=this.getEl().getElementsByTagName('iframe')[0];return ifr?ifr.contentWindow:null;}});handleWindowResize();return Window;});define("tinymce/ui/MessageBox",["tinymce/ui/Window"],function(Window){"use strict";var MessageBox=Window.extend({init:function(settings){settings={border:1,padding:20,layout:'flex',pack:"center",align:"center",containerCls:'panel',autoScroll:true,buttons:{type:"button",text:"Ok",action:"ok"},items:{type:"label",multiline:true,maxWidth:500,maxHeight:200}};this._super(settings);},Statics:{OK:1,OK_CANCEL:2,YES_NO:3,YES_NO_CANCEL:4,msgBox:function(settings){var buttons,callback=settings.callback||function(){};function createButton(text,status,primary){return{type:"button",text:text,subtype:primary?'primary':'',onClick:function(e){e.control.parents()[1].close();callback(status);}};}
switch(settings.buttons){case MessageBox.OK_CANCEL:buttons=[createButton('Ok',true,true),createButton('Cancel',false)];break;case MessageBox.YES_NO:case MessageBox.YES_NO_CANCEL:buttons=[createButton('Yes',1,true),createButton('No',0)];if(settings.buttons==MessageBox.YES_NO_CANCEL){buttons.push(createButton('Cancel',-1));}
break;default:buttons=[createButton('Ok',true,true)];break;}
return new Window({padding:20,x:settings.x,y:settings.y,minWidth:300,minHeight:100,layout:"flex",pack:"center",align:"center",buttons:buttons,title:settings.title,role:'alertdialog',items:{type:"label",multiline:true,maxWidth:500,maxHeight:200,text:settings.text},onPostRender:function(){this.aria('describedby',this.items()[0]._id);},onClose:settings.onClose,onCancel:function(){callback(false);}}).renderTo(document.body).reflow();},alert:function(settings,callback){if(typeof settings=="string"){settings={text:settings};}
settings.callback=callback;return MessageBox.msgBox(settings);},confirm:function(settings,callback){if(typeof settings=="string"){settings={text:settings};}
settings.callback=callback;settings.buttons=MessageBox.OK_CANCEL;return MessageBox.msgBox(settings);}}});return MessageBox;});define("tinymce/WindowManager",["tinymce/ui/Window","tinymce/ui/MessageBox"],function(Window,MessageBox){return function(editor){var self=this,windows=[];function getTopMostWindow(){if(windows.length){return windows[windows.length-1];}}
function fireOpenEvent(win){editor.fire('OpenWindow',{win:win});}
function fireCloseEvent(win){editor.fire('CloseWindow',{win:win});}
self.windows=windows;editor.on('remove',function(){var i=windows.length;while(i--){windows[i].close();}});self.open=function(args,params){var win;editor.editorManager.setActive(editor);args.title=args.title||' ';args.url=args.url||args.file;if(args.url){args.width=parseInt(args.width||320,10);args.height=parseInt(args.height||240,10);}
if(args.body){args.items={defaults:args.defaults,type:args.bodyType||'form',items:args.body,data:args.data,callbacks:args.commands};}
if(!args.url&&!args.buttons){args.buttons=[{text:'Ok',subtype:'primary',onclick:function(){win.find('form')[0].submit();}},{text:'Cancel',onclick:function(){win.close();}}];}
win=new Window(args);windows.push(win);win.on('close',function(){var i=windows.length;while(i--){if(windows[i]===win){windows.splice(i,1);}}
if(!windows.length){editor.focus();}
fireCloseEvent(win);});if(args.data){win.on('postRender',function(){this.find('*').each(function(ctrl){var name=ctrl.name();if(name in args.data){ctrl.value(args.data[name]);}});});}
win.features=args||{};win.params=params||{};if(windows.length===1){editor.nodeChanged();}
win=win.renderTo().reflow();fireOpenEvent(win);return win;};self.alert=function(message,callback,scope){var win;win=MessageBox.alert(message,function(){if(callback){callback.call(scope||this);}else{editor.focus();}});win.on('close',function(){fireCloseEvent(win);});fireOpenEvent(win);};self.confirm=function(message,callback,scope){var win;win=MessageBox.confirm(message,function(state){callback.call(scope||this,state);});win.on('close',function(){fireCloseEvent(win);});fireOpenEvent(win);};self.close=function(){if(getTopMostWindow()){getTopMostWindow().close();}};self.getParams=function(){return getTopMostWindow()?getTopMostWindow().params:null;};self.setParams=function(params){if(getTopMostWindow()){getTopMostWindow().params=params;}};self.getWindows=function(){return windows;};};});define("tinymce/ui/Tooltip",["tinymce/ui/Control","tinymce/ui/Movable"],function(Control,Movable){return Control.extend({Mixins:[Movable],Defaults:{classes:'widget tooltip tooltip-n'},renderHtml:function(){var self=this,prefix=self.classPrefix;return('<div id="'+self._id+'" class="'+self.classes+'" role="presentation">'+
'<div class="'+prefix+'tooltip-arrow"></div>'+
'<div class="'+prefix+'tooltip-inner">'+self.encode(self.state.get('text'))+'</div>'+
'</div>');},bindStates:function(){var self=this;self.state.on('change:text',function(e){self.getEl().lastChild.innerHTML=self.encode(e.value);});return self._super();},repaint:function(){var self=this,style,rect;style=self.getEl().style;rect=self._layoutRect;style.left=rect.x+'px';style.top=rect.y+'px';style.zIndex=0xFFFF+0xFFFF;}});});define("tinymce/ui/Widget",["tinymce/ui/Control","tinymce/ui/Tooltip"],function(Control,Tooltip){"use strict";var tooltip;var Widget=Control.extend({init:function(settings){var self=this;self._super(settings);settings=self.settings;self.canFocus=true;if(settings.tooltip&&Widget.tooltips!==false){self.on('mouseenter',function(e){var tooltip=self.tooltip().moveTo(-0xFFFF);if(e.control==self){var rel=tooltip.text(settings.tooltip).show().testMoveRel(self.getEl(),['bc-tc','bc-tl','bc-tr']);tooltip.classes.toggle('tooltip-n',rel=='bc-tc');tooltip.classes.toggle('tooltip-nw',rel=='bc-tl');tooltip.classes.toggle('tooltip-ne',rel=='bc-tr');tooltip.moveRel(self.getEl(),rel);}else{tooltip.hide();}});self.on('mouseleave mousedown click',function(){self.tooltip().hide();});}
self.aria('label',settings.ariaLabel||settings.tooltip);},tooltip:function(){if(!tooltip){tooltip=new Tooltip({type:'tooltip'});tooltip.renderTo();}
return tooltip;},postRender:function(){var self=this,settings=self.settings;self._super();if(!self.parent()&&(settings.width||settings.height)){self.initLayoutRect();self.repaint();}
if(settings.autofocus){self.focus();}},bindStates:function(){var self=this;function disable(state){self.aria('disabled',state);self.classes.toggle('disabled',state);}
function active(state){self.aria('pressed',state);self.classes.toggle('active',state);}
self.state.on('change:disabled',function(e){disable(e.value);});self.state.on('change:active',function(e){active(e.value);});if(self.state.get('disabled')){disable(true);}
if(self.state.get('active')){active(true);}
return self._super();},remove:function(){this._super();if(tooltip){tooltip.remove();tooltip=null;}}});return Widget;});define("tinymce/ui/Progress",["tinymce/ui/Widget"],function(Widget){"use strict";return Widget.extend({Defaults:{value:0},init:function(settings){var self=this;self._super(settings);self.classes.add('progress');if(!self.settings.filter){self.settings.filter=function(value){return Math.round(value);};}},renderHtml:function(){var self=this,id=self._id,prefix=this.classPrefix;return('<div id="'+id+'" class="'+self.classes+'">'+
'<div class="'+prefix+'bar-container">'+
'<div class="'+prefix+'bar"></div>'+
'</div>'+
'<div class="'+prefix+'text">0%</div>'+
'</div>');},postRender:function(){var self=this;self._super();self.value(self.settings.value);return self;},bindStates:function(){var self=this;function setValue(value){value=self.settings.filter(value);self.getEl().lastChild.innerHTML=value+'%';self.getEl().firstChild.firstChild.style.width=value+'%';}
self.state.on('change:value',function(e){setValue(e.value);});setValue(self.state.get('value'));return self._super();}});});define("tinymce/ui/Notification",["tinymce/ui/Control","tinymce/ui/Movable","tinymce/ui/Progress","tinymce/util/Delay"],function(Control,Movable,Progress,Delay){return Control.extend({Mixins:[Movable],Defaults:{classes:'widget notification'},init:function(settings){var self=this;self._super(settings);if(settings.text){self.text(settings.text);}
if(settings.icon){self.icon=settings.icon;}
if(settings.color){self.color=settings.color;}
if(settings.type){self.classes.add('notification-'+settings.type);}
if(settings.timeout&&(settings.timeout<0||settings.timeout>0)&&!settings.closeButton){self.closeButton=false;}else{self.classes.add('has-close');self.closeButton=true;}
if(settings.progressBar){self.progressBar=new Progress();}
self.on('click',function(e){if(e.target.className.indexOf(self.classPrefix+'close')!=-1){self.close();}});},renderHtml:function(){var self=this,prefix=self.classPrefix,icon='',closeButton='',progressBar='',notificationStyle='';if(self.icon){icon='<i class="'+prefix+'ico'+' '+prefix+'i-'+self.icon+'"></i>';}
if(self.color){notificationStyle=' style="background-color: '+self.color+'"';}
if(self.closeButton){closeButton='<button type="button" class="'+prefix+'close" aria-hidden="true">\u00d7</button>';}
if(self.progressBar){progressBar=self.progressBar.renderHtml();}
return('<div id="'+self._id+'" class="'+self.classes+'"'+notificationStyle+' role="presentation">'+
icon+
'<div class="'+prefix+'notification-inner">'+self.state.get('text')+'</div>'+
progressBar+
closeButton+
'</div>');},postRender:function(){var self=this;Delay.setTimeout(function(){self.$el.addClass(self.classPrefix+'in');});return self._super();},bindStates:function(){var self=this;self.state.on('change:text',function(e){self.getEl().childNodes[1].innerHTML=e.value;});if(self.progressBar){self.progressBar.bindStates();}
return self._super();},close:function(){var self=this;if(!self.fire('close').isDefaultPrevented()){self.remove();}
return self;},repaint:function(){var self=this,style,rect;style=self.getEl().style;rect=self._layoutRect;style.left=rect.x+'px';style.top=rect.y+'px';style.zIndex=0xFFFF+0xFFFF;}});});define("tinymce/NotificationManager",["tinymce/ui/Notification","tinymce/util/Delay"],function(Notification,Delay){return function(editor){var self=this,notifications=[];function getLastNotification(){if(notifications.length){return notifications[notifications.length-1];}}
self.notifications=notifications;function resizeWindowEvent(){Delay.requestAnimationFrame(function(){prePositionNotifications();positionNotifications();});}
function prePositionNotifications(){for(var i=0;i<notifications.length;i++){notifications[i].moveTo(0,0);}}
function positionNotifications(){if(notifications.length>0){var firstItem=notifications.slice(0,1)[0];var container=editor.inline?editor.getElement():editor.getContentAreaContainer();firstItem.moveRel(container,'tc-tc');if(notifications.length>1){for(var i=1;i<notifications.length;i++){notifications[i].moveRel(notifications[i-1].getEl(),'bc-tc');}}}}
editor.on('remove',function(){var i=notifications.length;while(i--){notifications[i].close();}});editor.on('ResizeEditor',positionNotifications);editor.on('ResizeWindow',resizeWindowEvent);self.open=function(args){var notif;editor.editorManager.setActive(editor);notif=new Notification(args);notifications.push(notif);if(args.timeout>0){notif.timer=setTimeout(function(){notif.close();},args.timeout);}
notif.on('close',function(){var i=notifications.length;if(notif.timer){editor.getWin().clearTimeout(notif.timer);}
while(i--){if(notifications[i]===notif){notifications.splice(i,1);}}
positionNotifications();});notif.renderTo();positionNotifications();return notif;};self.close=function(){if(getLastNotification()){getLastNotification().close();}};self.getNotifications=function(){return notifications;};editor.on('SkinLoaded',function(){var serviceMessage=editor.settings.service_message;if(serviceMessage){editor.notificationManager.open({text:serviceMessage,type:'warning',timeout:0,icon:''});}});};});define("tinymce/dom/NodePath",["tinymce/dom/DOMUtils"],function(DOMUtils){function create(rootNode,targetNode,normalized){var path=[];for(;targetNode&&targetNode!=rootNode;targetNode=targetNode.parentNode){path.push(DOMUtils.nodeIndex(targetNode,normalized));}
return path;}
function resolve(rootNode,path){var i,node,children;for(node=rootNode,i=path.length-1;i>=0;i--){children=node.childNodes;if(path[i]>children.length-1){return null;}
node=children[path[i]];}
return node;}
return{create:create,resolve:resolve};});define("tinymce/util/Quirks",["tinymce/util/VK","tinymce/dom/RangeUtils","tinymce/dom/TreeWalker","tinymce/dom/NodePath","tinymce/html/Node","tinymce/html/Entities","tinymce/Env","tinymce/util/Tools","tinymce/util/Delay","tinymce/caret/CaretContainer"],function(VK,RangeUtils,TreeWalker,NodePath,Node,Entities,Env,Tools,Delay,CaretContainer){return function(editor){var each=Tools.each,$=editor.$;var BACKSPACE=VK.BACKSPACE,DELETE=VK.DELETE,dom=editor.dom,selection=editor.selection,settings=editor.settings,parser=editor.parser,serializer=editor.serializer;var isGecko=Env.gecko,isIE=Env.ie,isWebKit=Env.webkit;var mceInternalUrlPrefix='data:text/mce-internal,';var mceInternalDataType=isIE?'Text':'URL';function setEditorCommandState(cmd,state){try{editor.getDoc().execCommand(cmd,false,state);}catch(ex){}}
function getDocumentMode(){var documentMode=editor.getDoc().documentMode;return documentMode?documentMode:6;}
function isDefaultPrevented(e){return e.isDefaultPrevented();}
function setMceInternalContent(e){var selectionHtml,internalContent;if(e.dataTransfer){if(editor.selection.isCollapsed()&&e.target.tagName=='IMG'){selection.select(e.target);}
selectionHtml=editor.selection.getContent();if(selectionHtml.length>0){internalContent=mceInternalUrlPrefix+escape(editor.id)+','+escape(selectionHtml);e.dataTransfer.setData(mceInternalDataType,internalContent);}}}
function getMceInternalContent(e){var internalContent;if(e.dataTransfer){internalContent=e.dataTransfer.getData(mceInternalDataType);if(internalContent&&internalContent.indexOf(mceInternalUrlPrefix)>=0){internalContent=internalContent.substr(mceInternalUrlPrefix.length).split(',');return{id:unescape(internalContent[0]),html:unescape(internalContent[1])};}}
return null;}
function insertClipboardContents(content){if(editor.queryCommandSupported('mceInsertClipboardContent')){editor.execCommand('mceInsertClipboardContent',false,{content:content});}else{editor.execCommand('mceInsertContent',false,content);}}
function cleanupStylesWhenDeleting(){var doc=editor.getDoc(),dom=editor.dom,selection=editor.selection;var MutationObserver=window.MutationObserver,olderWebKit,dragStartRng;if(!MutationObserver){olderWebKit=true;MutationObserver=function(){var records=[],target;function nodeInsert(e){var target=e.relatedNode||e.target;records.push({target:target,addedNodes:[target]});}
function attrModified(e){var target=e.relatedNode||e.target;records.push({target:target,attributeName:e.attrName});}
this.observe=function(node){target=node;target.addEventListener('DOMSubtreeModified',nodeInsert,false);target.addEventListener('DOMNodeInsertedIntoDocument',nodeInsert,false);target.addEventListener('DOMNodeInserted',nodeInsert,false);target.addEventListener('DOMAttrModified',attrModified,false);};this.disconnect=function(){target.removeEventListener('DOMSubtreeModified',nodeInsert,false);target.removeEventListener('DOMNodeInsertedIntoDocument',nodeInsert,false);target.removeEventListener('DOMNodeInserted',nodeInsert,false);target.removeEventListener('DOMAttrModified',attrModified,false);};this.takeRecords=function(){return records;};};}
function isTrailingBr(node){var blockElements=dom.schema.getBlockElements(),rootNode=editor.getBody();if(node.nodeName!='BR'){return false;}
for(;node!=rootNode&&!blockElements[node.nodeName];node=node.parentNode){if(node.nextSibling){return false;}}
return true;}
function isSiblingsIgnoreWhiteSpace(node1,node2){var node;for(node=node1.nextSibling;node&&node!=node2;node=node.nextSibling){if(node.nodeType==3&&$.trim(node.data).length===0){continue;}
if(node!==node2){return false;}}
return node===node2;}
function findCaretNode(node,forward,startNode){var walker,current,nonEmptyElements;nonEmptyElements=dom.schema.getNonEmptyElements();walker=new TreeWalker(startNode||node,node);while((current=walker[forward?'next':'prev']())){if(nonEmptyElements[current.nodeName]&&!isTrailingBr(current)){return current;}
if(current.nodeType==3&&current.data.length>0){return current;}}}
function deleteRangeBetweenTextBlocks(rng){var startBlock,endBlock,caretNodeBefore,caretNodeAfter,textBlockElements;if(rng.collapsed){return;}
startBlock=dom.getParent(RangeUtils.getNode(rng.startContainer,rng.startOffset),dom.isBlock);endBlock=dom.getParent(RangeUtils.getNode(rng.endContainer,rng.endOffset),dom.isBlock);textBlockElements=editor.schema.getTextBlockElements();if(startBlock==endBlock){return;}
if(!textBlockElements[startBlock.nodeName]||!textBlockElements[endBlock.nodeName]){return;}
if(dom.getContentEditable(startBlock)==="false"||dom.getContentEditable(endBlock)==="false"){return;}
rng.deleteContents();caretNodeBefore=findCaretNode(startBlock,false);caretNodeAfter=findCaretNode(endBlock,true);if(!dom.isEmpty(endBlock)){$(startBlock).append(endBlock.childNodes);}
$(endBlock).remove();if(caretNodeBefore){if(caretNodeBefore.nodeType==1){if(caretNodeBefore.nodeName=="BR"){rng.setStartBefore(caretNodeBefore);rng.setEndBefore(caretNodeBefore);}else{rng.setStartAfter(caretNodeBefore);rng.setEndAfter(caretNodeBefore);}}else{rng.setStart(caretNodeBefore,caretNodeBefore.data.length);rng.setEnd(caretNodeBefore,caretNodeBefore.data.length);}}else if(caretNodeAfter){if(caretNodeAfter.nodeType==1){rng.setStartBefore(caretNodeAfter);rng.setEndBefore(caretNodeAfter);}else{rng.setStart(caretNodeAfter,0);rng.setEnd(caretNodeAfter,0);}}
selection.setRng(rng);return true;}
function expandBetweenBlocks(rng,isForward){var caretNode,targetCaretNode,textBlock,targetTextBlock,container,offset;if(!rng.collapsed){return rng;}
container=rng.startContainer;offset=rng.startOffset;if(container.nodeType==3){if(isForward){if(offset<container.data.length){return rng;}}else{if(offset>0){return rng;}}}
caretNode=RangeUtils.getNode(rng.startContainer,rng.startOffset);textBlock=dom.getParent(caretNode,dom.isBlock);targetCaretNode=findCaretNode(editor.getBody(),isForward,caretNode);targetTextBlock=dom.getParent(targetCaretNode,dom.isBlock);if(!caretNode||!targetCaretNode){return rng;}
if(targetTextBlock&&textBlock!=targetTextBlock){if(!isForward){if(!isSiblingsIgnoreWhiteSpace(targetTextBlock,textBlock)){return rng;}
if(targetCaretNode.nodeType==1){if(targetCaretNode.nodeName=="BR"){rng.setStartBefore(targetCaretNode);}else{rng.setStartAfter(targetCaretNode);}}else{rng.setStart(targetCaretNode,targetCaretNode.data.length);}
if(caretNode.nodeType==1){rng.setEnd(caretNode,0);}else{rng.setEndBefore(caretNode);}}else{if(!isSiblingsIgnoreWhiteSpace(textBlock,targetTextBlock)){return rng;}
if(caretNode.nodeType==1){if(caretNode.nodeName=="BR"){rng.setStartBefore(caretNode);}else{rng.setStartAfter(caretNode);}}else{rng.setStart(caretNode,caretNode.data.length);}
if(targetCaretNode.nodeType==1){rng.setEnd(targetCaretNode,0);}else{rng.setEndBefore(targetCaretNode);}}}
return rng;}
function handleTextBlockMergeDelete(isForward){var rng=selection.getRng();rng=expandBetweenBlocks(rng,isForward);if(deleteRangeBetweenTextBlocks(rng)){return true;}}
function handleLastBlockCharacterDelete(isForward,rng){var path,blockElm,newBlockElm,clonedBlockElm,sibling,container,offset,br,currentFormatNodes;function cloneTextBlockWithFormats(blockElm,node){currentFormatNodes=$(node).parents().filter(function(idx,node){return!!editor.schema.getTextInlineElements()[node.nodeName];});newBlockElm=blockElm.cloneNode(false);currentFormatNodes=Tools.map(currentFormatNodes,function(formatNode){formatNode=formatNode.cloneNode(false);if(newBlockElm.hasChildNodes()){formatNode.appendChild(newBlockElm.firstChild);newBlockElm.appendChild(formatNode);}else{newBlockElm.appendChild(formatNode);}
newBlockElm.appendChild(formatNode);return formatNode;});if(currentFormatNodes.length){br=dom.create('br');currentFormatNodes[0].appendChild(br);dom.replace(newBlockElm,blockElm);rng.setStartBefore(br);rng.setEndBefore(br);editor.selection.setRng(rng);return br;}
return null;}
function isTextBlock(node){return node&&editor.schema.getTextBlockElements()[node.tagName];}
if(!rng.collapsed){return;}
container=rng.startContainer;offset=rng.startOffset;blockElm=dom.getParent(container,dom.isBlock);if(!isTextBlock(blockElm)){return;}
if(container.nodeType==1){container=container.childNodes[offset];if(container&&container.tagName!='BR'){return;}
if(isForward){sibling=blockElm.nextSibling;}else{sibling=blockElm.previousSibling;}
if(dom.isEmpty(blockElm)&&isTextBlock(sibling)&&dom.isEmpty(sibling)){if(cloneTextBlockWithFormats(blockElm,container)){dom.remove(sibling);return true;}}}else if(container.nodeType==3){path=NodePath.create(blockElm,container);clonedBlockElm=blockElm.cloneNode(true);container=NodePath.resolve(clonedBlockElm,path);if(isForward){if(offset>=container.data.length){return;}
container.deleteData(offset,1);}else{if(offset<=0){return;}
container.deleteData(offset-1,1);}
if(dom.isEmpty(clonedBlockElm)){return cloneTextBlockWithFormats(blockElm,container);}}}
function customDelete(isForward){var mutationObserver,rng,caretElement;if(handleTextBlockMergeDelete(isForward)){return;}
Tools.each(editor.getBody().getElementsByTagName('*'),function(elm){if(elm.tagName=='SPAN'){elm.setAttribute('mce-data-marked',1);}
if(!elm.hasAttribute('data-mce-style')&&elm.hasAttribute('style')){editor.dom.setAttrib(elm,'style',editor.dom.getAttrib(elm,'style'));}});mutationObserver=new MutationObserver(function(){});mutationObserver.observe(editor.getDoc(),{childList:true,attributes:true,subtree:true,attributeFilter:['style']});editor.getDoc().execCommand(isForward?'ForwardDelete':'Delete',false,null);rng=editor.selection.getRng();caretElement=rng.startContainer.parentNode;Tools.each(mutationObserver.takeRecords(),function(record){if(!dom.isChildOf(record.target,editor.getBody())){return;}
if(record.attributeName=="style"){var oldValue=record.target.getAttribute('data-mce-style');if(oldValue){record.target.setAttribute("style",oldValue);}else{record.target.removeAttribute("style");}}
Tools.each(record.addedNodes,function(node){if(node.nodeName=="SPAN"&&!node.getAttribute('mce-data-marked')){var offset,container;if(node==caretElement){offset=rng.startOffset;container=node.firstChild;}
dom.remove(node,true);if(container){rng.setStart(container,offset);rng.setEnd(container,offset);editor.selection.setRng(rng);}}});});mutationObserver.disconnect();Tools.each(editor.dom.select('span[mce-data-marked]'),function(span){span.removeAttribute('mce-data-marked');});}
editor.on('keydown',function(e){var isForward=e.keyCode==DELETE,isMetaOrCtrl=e.ctrlKey||e.metaKey;if(!isDefaultPrevented(e)&&(isForward||e.keyCode==BACKSPACE)){var rng=editor.selection.getRng(),container=rng.startContainer,offset=rng.startOffset;if(isForward&&e.shiftKey){return;}
if(handleLastBlockCharacterDelete(isForward,rng)){e.preventDefault();return;}
if(!isMetaOrCtrl&&rng.collapsed&&container.nodeType==3){if(isForward?offset<container.data.length:offset>0){return;}}
e.preventDefault();if(isMetaOrCtrl){editor.selection.getSel().modify("extend",isForward?"forward":"backward",e.metaKey?"lineboundary":"word");}
customDelete(isForward);}});editor.on('keypress',function(e){if(!isDefaultPrevented(e)&&!selection.isCollapsed()&&e.charCode>31&&!VK.metaKeyPressed(e)){var rng,currentFormatNodes,fragmentNode,blockParent,caretNode,charText;rng=editor.selection.getRng();charText=String.fromCharCode(e.charCode);e.preventDefault();currentFormatNodes=$(rng.startContainer).parents().filter(function(idx,node){return!!editor.schema.getTextInlineElements()[node.nodeName];});customDelete(true);currentFormatNodes=currentFormatNodes.filter(function(idx,node){return!$.contains(editor.getBody(),node);});if(currentFormatNodes.length){fragmentNode=dom.createFragment();currentFormatNodes.each(function(idx,formatNode){formatNode=formatNode.cloneNode(false);if(fragmentNode.hasChildNodes()){formatNode.appendChild(fragmentNode.firstChild);fragmentNode.appendChild(formatNode);}else{caretNode=formatNode;fragmentNode.appendChild(formatNode);}
fragmentNode.appendChild(formatNode);});caretNode.appendChild(editor.getDoc().createTextNode(charText));blockParent=dom.getParent(rng.startContainer,dom.isBlock);if(dom.isEmpty(blockParent)){$(blockParent).empty().append(fragmentNode);}else{rng.insertNode(fragmentNode);}
rng.setStart(caretNode.firstChild,1);rng.setEnd(caretNode.firstChild,1);editor.selection.setRng(rng);}else{editor.selection.setContent(charText);}}});editor.addCommand('Delete',function(){customDelete();});editor.addCommand('ForwardDelete',function(){customDelete(true);});if(olderWebKit){return;}
editor.on('dragstart',function(e){dragStartRng=selection.getRng();setMceInternalContent(e);});editor.on('drop',function(e){if(!isDefaultPrevented(e)){var internalContent=getMceInternalContent(e);if(internalContent){e.preventDefault();Delay.setEditorTimeout(editor,function(){var pointRng=RangeUtils.getCaretRangeFromPoint(e.x,e.y,doc);if(dragStartRng){selection.setRng(dragStartRng);dragStartRng=null;}
customDelete();selection.setRng(pointRng);insertClipboardContents(internalContent.html);});}}});editor.on('cut',function(e){if(!isDefaultPrevented(e)&&e.clipboardData&&!editor.selection.isCollapsed()){e.preventDefault();e.clipboardData.clearData();e.clipboardData.setData('text/html',editor.selection.getContent());e.clipboardData.setData('text/plain',editor.selection.getContent({format:'text'}));Delay.setEditorTimeout(editor,function(){customDelete(true);});}});}
function emptyEditorWhenDeleting(){function serializeRng(rng){var body=dom.create("body");var contents=rng.cloneContents();body.appendChild(contents);return selection.serializer.serialize(body,{format:'html'});}
function allContentsSelected(rng){if(!rng.setStart){if(rng.item){return false;}
var bodyRng=rng.duplicate();bodyRng.moveToElementText(editor.getBody());return RangeUtils.compareRanges(rng,bodyRng);}
var selection=serializeRng(rng);var allRng=dom.createRng();allRng.selectNode(editor.getBody());var allSelection=serializeRng(allRng);return selection===allSelection;}
editor.on('keydown',function(e){var keyCode=e.keyCode,isCollapsed,body;if(!isDefaultPrevented(e)&&(keyCode==DELETE||keyCode==BACKSPACE)){isCollapsed=editor.selection.isCollapsed();body=editor.getBody();if(isCollapsed&&!dom.isEmpty(body)){return;}
if(!isCollapsed&&!allContentsSelected(editor.selection.getRng())){return;}
e.preventDefault();editor.setContent('');if(body.firstChild&&dom.isBlock(body.firstChild)){editor.selection.setCursorLocation(body.firstChild,0);}else{editor.selection.setCursorLocation(body,0);}
editor.nodeChanged();}});}
function selectAll(){editor.shortcuts.add('meta+a',null,'SelectAll');}
function inputMethodFocus(){if(!editor.settings.content_editable){dom.bind(editor.getDoc(),'mousedown mouseup',function(e){var rng;if(e.target==editor.getDoc().documentElement){rng=selection.getRng();editor.getBody().focus();if(e.type=='mousedown'){if(CaretContainer.isCaretContainer(rng.startContainer)){return;}
selection.placeCaretAt(e.clientX,e.clientY);}else{selection.setRng(rng);}}});}}
function removeHrOnBackspace(){editor.on('keydown',function(e){if(!isDefaultPrevented(e)&&e.keyCode===BACKSPACE){if(!editor.getBody().getElementsByTagName('hr').length){return;}
if(selection.isCollapsed()&&selection.getRng(true).startOffset===0){var node=selection.getNode();var previousSibling=node.previousSibling;if(node.nodeName=='HR'){dom.remove(node);e.preventDefault();return;}
if(previousSibling&&previousSibling.nodeName&&previousSibling.nodeName.toLowerCase()==="hr"){dom.remove(previousSibling);e.preventDefault();}}}});}
function focusBody(){if(!window.Range.prototype.getClientRects){editor.on('mousedown',function(e){if(!isDefaultPrevented(e)&&e.target.nodeName==="HTML"){var body=editor.getBody();body.blur();Delay.setEditorTimeout(editor,function(){body.focus();});}});}}
function selectControlElements(){editor.on('click',function(e){var target=e.target;if(/^(IMG|HR)$/.test(target.nodeName)&&dom.getContentEditableParent(target)!=="false"){e.preventDefault();selection.getSel().setBaseAndExtent(target,0,target,1);editor.nodeChanged();}
if(target.nodeName=='A'&&dom.hasClass(target,'mce-item-anchor')){e.preventDefault();selection.select(target);}});}
function removeStylesWhenDeletingAcrossBlockElements(){function getAttributeApplyFunction(){var template=dom.getAttribs(selection.getStart().cloneNode(false));return function(){var target=selection.getStart();if(target!==editor.getBody()){dom.setAttrib(target,"style",null);each(template,function(attr){target.setAttributeNode(attr.cloneNode(true));});}};}
function isSelectionAcrossElements(){return!selection.isCollapsed()&&dom.getParent(selection.getStart(),dom.isBlock)!=dom.getParent(selection.getEnd(),dom.isBlock);}
editor.on('keypress',function(e){var applyAttributes;if(!isDefaultPrevented(e)&&(e.keyCode==8||e.keyCode==46)&&isSelectionAcrossElements()){applyAttributes=getAttributeApplyFunction();editor.getDoc().execCommand('delete',false,null);applyAttributes();e.preventDefault();return false;}});dom.bind(editor.getDoc(),'cut',function(e){var applyAttributes;if(!isDefaultPrevented(e)&&isSelectionAcrossElements()){applyAttributes=getAttributeApplyFunction();Delay.setEditorTimeout(editor,function(){applyAttributes();});}});}
function ensureBodyHasRoleApplication(){document.body.setAttribute("role","application");}
function disableBackspaceIntoATable(){editor.on('keydown',function(e){if(!isDefaultPrevented(e)&&e.keyCode===BACKSPACE){if(selection.isCollapsed()&&selection.getRng(true).startOffset===0){var previousSibling=selection.getNode().previousSibling;if(previousSibling&&previousSibling.nodeName&&previousSibling.nodeName.toLowerCase()==="table"){e.preventDefault();return false;}}}});}
function addNewLinesBeforeBrInPre(){if(getDocumentMode()>7){return;}
setEditorCommandState('RespectVisibilityInDesign',true);editor.contentStyles.push('.mceHideBrInPre pre br {display: none}');dom.addClass(editor.getBody(),'mceHideBrInPre');parser.addNodeFilter('pre',function(nodes){var i=nodes.length,brNodes,j,brElm,sibling;while(i--){brNodes=nodes[i].getAll('br');j=brNodes.length;while(j--){brElm=brNodes[j];sibling=brElm.prev;if(sibling&&sibling.type===3&&sibling.value.charAt(sibling.value-1)!='\n'){sibling.value+='\n';}else{brElm.parent.insert(new Node('#text',3),brElm,true).value='\n';}}}});serializer.addNodeFilter('pre',function(nodes){var i=nodes.length,brNodes,j,brElm,sibling;while(i--){brNodes=nodes[i].getAll('br');j=brNodes.length;while(j--){brElm=brNodes[j];sibling=brElm.prev;if(sibling&&sibling.type==3){sibling.value=sibling.value.replace(/\r?\n$/,'');}}}});}
function removePreSerializedStylesWhenSelectingControls(){dom.bind(editor.getBody(),'mouseup',function(){var value,node=selection.getNode();if(node.nodeName=='IMG'){if((value=dom.getStyle(node,'width'))){dom.setAttrib(node,'width',value.replace(/[^0-9%]+/g,''));dom.setStyle(node,'width','');}
if((value=dom.getStyle(node,'height'))){dom.setAttrib(node,'height',value.replace(/[^0-9%]+/g,''));dom.setStyle(node,'height','');}}});}
function removeBlockQuoteOnBackSpace(){editor.on('keydown',function(e){var rng,container,offset,root,parent;if(isDefaultPrevented(e)||e.keyCode!=VK.BACKSPACE){return;}
rng=selection.getRng();container=rng.startContainer;offset=rng.startOffset;root=dom.getRoot();parent=container;if(!rng.collapsed||offset!==0){return;}
while(parent&&parent.parentNode&&parent.parentNode.firstChild==parent&&parent.parentNode!=root){parent=parent.parentNode;}
if(parent.tagName==='BLOCKQUOTE'){editor.formatter.toggle('blockquote',null,parent);rng=dom.createRng();rng.setStart(container,0);rng.setEnd(container,0);selection.setRng(rng);}});}
function setGeckoEditingOptions(){function setOpts(){refreshContentEditable();setEditorCommandState("StyleWithCSS",false);setEditorCommandState("enableInlineTableEditing",false);if(!settings.object_resizing){setEditorCommandState("enableObjectResizing",false);}}
if(!settings.readonly){editor.on('BeforeExecCommand MouseDown',setOpts);}}
function addBrAfterLastLinks(){function fixLinks(){each(dom.select('a'),function(node){var parentNode=node.parentNode,root=dom.getRoot();if(parentNode.lastChild===node){while(parentNode&&!dom.isBlock(parentNode)){if(parentNode.parentNode.lastChild!==parentNode||parentNode===root){return;}
parentNode=parentNode.parentNode;}
dom.add(parentNode,'br',{'data-mce-bogus':1});}});}
editor.on('SetContent ExecCommand',function(e){if(e.type=="setcontent"||e.command==='mceInsertLink'){fixLinks();}});}
function setDefaultBlockType(){if(settings.forced_root_block){editor.on('init',function(){setEditorCommandState('DefaultParagraphSeparator',settings.forced_root_block);});}}
function deleteControlItemOnBackSpace(){editor.on('keydown',function(e){var rng;if(!isDefaultPrevented(e)&&e.keyCode==BACKSPACE){rng=editor.getDoc().selection.createRange();if(rng&&rng.item){e.preventDefault();editor.undoManager.beforeChange();dom.remove(rng.item(0));editor.undoManager.add();}}});}
function renderEmptyBlocksFix(){var emptyBlocksCSS;if(getDocumentMode()>=10){emptyBlocksCSS='';each('p div h1 h2 h3 h4 h5 h6'.split(' '),function(name,i){emptyBlocksCSS+=(i>0?',':'')+name+':empty';});editor.contentStyles.push(emptyBlocksCSS+'{padding-right: 1px !important}');}}
function keepNoScriptContents(){if(getDocumentMode()<9){parser.addNodeFilter('noscript',function(nodes){var i=nodes.length,node,textNode;while(i--){node=nodes[i];textNode=node.firstChild;if(textNode){node.attr('data-mce-innertext',textNode.value);}}});serializer.addNodeFilter('noscript',function(nodes){var i=nodes.length,node,textNode,value;while(i--){node=nodes[i];textNode=nodes[i].firstChild;if(textNode){textNode.value=Entities.decode(textNode.value);}else{value=node.attributes.map['data-mce-innertext'];if(value){node.attr('data-mce-innertext',null);textNode=new Node('#text',3);textNode.value=value;textNode.raw=true;node.append(textNode);}}}});}}
function fixCaretSelectionOfDocumentElementOnIe(){var doc=dom.doc,body=doc.body,started,startRng,htmlElm;function rngFromPoint(x,y){var rng=body.createTextRange();try{rng.moveToPoint(x,y);}catch(ex){rng=null;}
return rng;}
function selectionChange(e){var pointRng;if(e.button){pointRng=rngFromPoint(e.x,e.y);if(pointRng){if(pointRng.compareEndPoints('StartToStart',startRng)>0){pointRng.setEndPoint('StartToStart',startRng);}else{pointRng.setEndPoint('EndToEnd',startRng);}
pointRng.select();}}else{endSelection();}}
function endSelection(){var rng=doc.selection.createRange();if(startRng&&!rng.item&&rng.compareEndPoints('StartToEnd',rng)===0){startRng.select();}
dom.unbind(doc,'mouseup',endSelection);dom.unbind(doc,'mousemove',selectionChange);startRng=started=0;}
doc.documentElement.unselectable=true;dom.bind(doc,'mousedown contextmenu',function(e){if(e.target.nodeName==='HTML'){if(started){endSelection();}
htmlElm=doc.documentElement;if(htmlElm.scrollHeight>htmlElm.clientHeight){return;}
started=1;startRng=rngFromPoint(e.x,e.y);if(startRng){dom.bind(doc,'mouseup',endSelection);dom.bind(doc,'mousemove',selectionChange);dom.getRoot().focus();startRng.select();}}});}
function normalizeSelection(){editor.on('keyup focusin mouseup',function(e){if(e.keyCode!=65||!VK.metaKeyPressed(e)){selection.normalize();}},true);}
function showBrokenImageIcon(){editor.contentStyles.push('img:-moz-broken {'+
'-moz-force-broken-image-icon:1;'+
'min-width:24px;'+
'min-height:24px'+
'}');}
function restoreFocusOnKeyDown(){if(!editor.inline){editor.on('keydown',function(){if(document.activeElement==document.body){editor.getWin().focus();}});}}
function bodyHeight(){if(!editor.inline){editor.contentStyles.push('body {min-height: 150px}');editor.on('click',function(e){var rng;if(e.target.nodeName=='HTML'){if(Env.ie>11){editor.getBody().focus();return;}
rng=editor.selection.getRng();editor.getBody().focus();editor.selection.setRng(rng);editor.selection.normalize();editor.nodeChanged();}});}}
function blockCmdArrowNavigation(){if(Env.mac){editor.on('keydown',function(e){if(VK.metaKeyPressed(e)&&!e.shiftKey&&(e.keyCode==37||e.keyCode==39)){e.preventDefault();editor.selection.getSel().modify('move',e.keyCode==37?'backward':'forward','lineboundary');}});}}
function disableAutoUrlDetect(){setEditorCommandState("AutoUrlDetect",false);}
function tapLinksAndImages(){editor.on('click',function(e){var elm=e.target;do{if(elm.tagName==='A'){e.preventDefault();return;}}while((elm=elm.parentNode));});editor.contentStyles.push('.mce-content-body {-webkit-touch-callout: none}');}
function blockFormSubmitInsideEditor(){editor.on('init',function(){editor.dom.bind(editor.getBody(),'submit',function(e){e.preventDefault();});});}
function removeAppleInterchangeBrs(){parser.addNodeFilter('br',function(nodes){var i=nodes.length;while(i--){if(nodes[i].attr('class')=='Apple-interchange-newline'){nodes[i].remove();}}});}
function ieInternalDragAndDrop(){editor.on('dragstart',function(e){setMceInternalContent(e);});editor.on('drop',function(e){if(!isDefaultPrevented(e)){var internalContent=getMceInternalContent(e);if(internalContent&&internalContent.id!=editor.id){e.preventDefault();var rng=RangeUtils.getCaretRangeFromPoint(e.x,e.y,editor.getDoc());selection.setRng(rng);insertClipboardContents(internalContent.html);}}});}
function refreshContentEditable(){var body,parent;if(isHidden()){body=editor.getBody();parent=body.parentNode;parent.removeChild(body);parent.appendChild(body);body.focus();}}
function isHidden(){var sel;if(!isGecko){return 0;}
sel=editor.selection.getSel();return(!sel||!sel.rangeCount||sel.rangeCount===0);}
removeBlockQuoteOnBackSpace();emptyEditorWhenDeleting();if(!Env.windowsPhone){normalizeSelection();}
if(isWebKit){cleanupStylesWhenDeleting();inputMethodFocus();selectControlElements();setDefaultBlockType();blockFormSubmitInsideEditor();disableBackspaceIntoATable();removeAppleInterchangeBrs();if(Env.iOS){restoreFocusOnKeyDown();bodyHeight();tapLinksAndImages();}else{selectAll();}}
if(isIE&&Env.ie<11){removeHrOnBackspace();ensureBodyHasRoleApplication();addNewLinesBeforeBrInPre();removePreSerializedStylesWhenSelectingControls();deleteControlItemOnBackSpace();renderEmptyBlocksFix();keepNoScriptContents();fixCaretSelectionOfDocumentElementOnIe();}
if(Env.ie>=11){bodyHeight();disableBackspaceIntoATable();}
if(Env.ie){selectAll();disableAutoUrlDetect();ieInternalDragAndDrop();}
if(isGecko){removeHrOnBackspace();focusBody();removeStylesWhenDeletingAcrossBlockElements();setGeckoEditingOptions();addBrAfterLastLinks();showBrokenImageIcon();blockCmdArrowNavigation();disableBackspaceIntoATable();}
return{refreshContentEditable:refreshContentEditable,isHidden:isHidden};};});define("tinymce/EditorObservable",["tinymce/util/Observable","tinymce/dom/DOMUtils","tinymce/util/Tools"],function(Observable,DOMUtils,Tools){var DOM=DOMUtils.DOM,customEventRootDelegates;function getEventTarget(editor,eventName){if(eventName=='selectionchange'){return editor.getDoc();}
if(!editor.inline&&/^mouse|click|contextmenu|drop|dragover|dragend/.test(eventName)){return editor.getDoc().documentElement;}
if(editor.settings.event_root){if(!editor.eventRoot){editor.eventRoot=DOM.select(editor.settings.event_root)[0];}
return editor.eventRoot;}
return editor.getBody();}
function bindEventDelegate(editor,eventName){var eventRootElm=getEventTarget(editor,eventName),delegate;function isListening(editor){return!editor.hidden&&!editor.readonly;}
if(!editor.delegates){editor.delegates={};}
if(editor.delegates[eventName]){return;}
if(editor.settings.event_root){if(!customEventRootDelegates){customEventRootDelegates={};editor.editorManager.on('removeEditor',function(){var name;if(!editor.editorManager.activeEditor){if(customEventRootDelegates){for(name in customEventRootDelegates){editor.dom.unbind(getEventTarget(editor,name));}
customEventRootDelegates=null;}}});}
if(customEventRootDelegates[eventName]){return;}
delegate=function(e){var target=e.target,editors=editor.editorManager.editors,i=editors.length;while(i--){var body=editors[i].getBody();if(body===target||DOM.isChildOf(target,body)){if(isListening(editors[i])){editors[i].fire(eventName,e);}}}};customEventRootDelegates[eventName]=delegate;DOM.bind(eventRootElm,eventName,delegate);}else{delegate=function(e){if(isListening(editor)){editor.fire(eventName,e);}};DOM.bind(eventRootElm,eventName,delegate);editor.delegates[eventName]=delegate;}}
var EditorObservable={bindPendingEventDelegates:function(){var self=this;Tools.each(self._pendingNativeEvents,function(name){bindEventDelegate(self,name);});},toggleNativeEvent:function(name,state){var self=this;if(name=="focus"||name=="blur"){return;}
if(state){if(self.initialized){bindEventDelegate(self,name);}else{if(!self._pendingNativeEvents){self._pendingNativeEvents=[name];}else{self._pendingNativeEvents.push(name);}}}else if(self.initialized){self.dom.unbind(getEventTarget(self,name),name,self.delegates[name]);delete self.delegates[name];}},unbindAllNativeEvents:function(){var self=this,name;if(self.delegates){for(name in self.delegates){self.dom.unbind(getEventTarget(self,name),name,self.delegates[name]);}
delete self.delegates;}
if(!self.inline){self.getBody().onload=null;self.dom.unbind(self.getWin());self.dom.unbind(self.getDoc());}
self.dom.unbind(self.getBody());self.dom.unbind(self.getContainer());}};EditorObservable=Tools.extend({},Observable,EditorObservable);return EditorObservable;});define("tinymce/Mode",[],function(){function setEditorCommandState(editor,cmd,state){try{editor.getDoc().execCommand(cmd,false,state);}catch(ex){}}
function clickBlocker(editor){var target,handler;target=editor.getBody();handler=function(e){if(editor.dom.getParents(e.target,'a').length>0){e.preventDefault();}};editor.dom.bind(target,'click',handler);return{unbind:function(){editor.dom.unbind(target,'click',handler);}};}
function toggleReadOnly(editor,state){if(editor._clickBlocker){editor._clickBlocker.unbind();editor._clickBlocker=null;}
if(state){editor._clickBlocker=clickBlocker(editor);editor.selection.controlSelection.hideResizeRect();editor.readonly=true;editor.getBody().contentEditable=false;}else{editor.readonly=false;editor.getBody().contentEditable=true;setEditorCommandState(editor,"StyleWithCSS",false);setEditorCommandState(editor,"enableInlineTableEditing",false);setEditorCommandState(editor,"enableObjectResizing",false);editor.focus();editor.nodeChanged();}}
function setMode(editor,mode){var currentMode=editor.readonly?'readonly':'design';if(mode==currentMode){return;}
if(editor.initialized){toggleReadOnly(editor,mode=='readonly');}else{editor.on('init',function(){toggleReadOnly(editor,mode=='readonly');});}
editor.fire('SwitchMode',{mode:mode});}
return{setMode:setMode};});define("tinymce/Shortcuts",["tinymce/util/Tools","tinymce/Env"],function(Tools,Env){var each=Tools.each,explode=Tools.explode;var keyCodeLookup={"f9":120,"f10":121,"f11":122};var modifierNames=Tools.makeMap('alt,ctrl,shift,meta,access');return function(editor){var self=this,shortcuts={},pendingPatterns=[];function parseShortcut(pattern){var id,key,shortcut={};each(explode(pattern,'+'),function(value){if(value in modifierNames){shortcut[value]=true;}else{if(/^[0-9]{2,}$/.test(value)){shortcut.keyCode=parseInt(value,10);}else{shortcut.charCode=value.charCodeAt(0);shortcut.keyCode=keyCodeLookup[value]||value.toUpperCase().charCodeAt(0);}}});id=[shortcut.keyCode];for(key in modifierNames){if(shortcut[key]){id.push(key);}else{shortcut[key]=false;}}
shortcut.id=id.join(',');if(shortcut.access){shortcut.alt=true;if(Env.mac){shortcut.ctrl=true;}else{shortcut.shift=true;}}
if(shortcut.meta){if(Env.mac){shortcut.meta=true;}else{shortcut.ctrl=true;shortcut.meta=false;}}
return shortcut;}
function createShortcut(pattern,desc,cmdFunc,scope){var shortcuts;shortcuts=Tools.map(explode(pattern,'>'),parseShortcut);shortcuts[shortcuts.length-1]=Tools.extend(shortcuts[shortcuts.length-1],{func:cmdFunc,scope:scope||editor});return Tools.extend(shortcuts[0],{desc:editor.translate(desc),subpatterns:shortcuts.slice(1)});}
function hasModifier(e){return e.altKey||e.ctrlKey||e.metaKey;}
function isFunctionKey(e){return e.keyCode>=112&&e.keyCode<=123;}
function matchShortcut(e,shortcut){if(!shortcut){return false;}
if(shortcut.ctrl!=e.ctrlKey||shortcut.meta!=e.metaKey){return false;}
if(shortcut.alt!=e.altKey||shortcut.shift!=e.shiftKey){return false;}
if(e.keyCode==shortcut.keyCode||(e.charCode&&e.charCode==shortcut.charCode)){e.preventDefault();return true;}
return false;}
function executeShortcutAction(shortcut){return shortcut.func?shortcut.func.call(shortcut.scope):null;}
editor.on('keyup keypress keydown',function(e){if((hasModifier(e)||isFunctionKey(e))&&!e.isDefaultPrevented()){each(shortcuts,function(shortcut){if(matchShortcut(e,shortcut)){pendingPatterns=shortcut.subpatterns.slice(0);if(e.type=="keydown"){executeShortcutAction(shortcut);}
return true;}});if(matchShortcut(e,pendingPatterns[0])){if(pendingPatterns.length===1){if(e.type=="keydown"){executeShortcutAction(pendingPatterns[0]);}}
pendingPatterns.shift();}}});self.add=function(pattern,desc,cmdFunc,scope){var cmd;cmd=cmdFunc;if(typeof cmdFunc==='string'){cmdFunc=function(){editor.execCommand(cmd,false,null);};}else if(Tools.isArray(cmd)){cmdFunc=function(){editor.execCommand(cmd[0],cmd[1],cmd[2]);};}
each(explode(Tools.trim(pattern.toLowerCase())),function(pattern){var shortcut=createShortcut(pattern,desc,cmdFunc,scope);shortcuts[shortcut.id]=shortcut;});return true;};self.remove=function(pattern){var shortcut=createShortcut(pattern);if(shortcuts[shortcut.id]){delete shortcuts[shortcut.id];return true;}
return false;};};});define("tinymce/file/Uploader",["tinymce/util/Promise","tinymce/util/Tools","tinymce/util/Fun"],function(Promise,Tools,Fun){return function(uploadStatus,settings){var pendingPromises={};function fileName(blobInfo){var ext,extensions;extensions={'image/jpeg':'jpg','image/jpg':'jpg','image/gif':'gif','image/png':'png'};ext=extensions[blobInfo.blob().type.toLowerCase()]||'dat';return blobInfo.id()+'.'+ext;}
function pathJoin(path1,path2){if(path1){return path1.replace(/\/$/,'')+'/'+path2.replace(/^\//,'');}
return path2;}
function blobInfoToData(blobInfo){return{id:blobInfo.id,blob:blobInfo.blob,base64:blobInfo.base64,filename:Fun.constant(fileName(blobInfo))};}
function defaultHandler(blobInfo,success,failure,progress){var xhr,formData;xhr=new XMLHttpRequest();xhr.open('POST',settings.url);xhr.withCredentials=settings.credentials;xhr.upload.onprogress=function(e){progress(e.loaded/e.total*100);};xhr.onerror=function(){failure("Image upload failed due to a XHR Transport error. Code: "+xhr.status);};xhr.onload=function(){var json;if(xhr.status!=200){failure("HTTP Error: "+xhr.status);return;}
json=JSON.parse(xhr.responseText);if(!json||typeof json.location!="string"){failure("Invalid JSON: "+xhr.responseText);return;}
success(pathJoin(settings.basePath,json.location));};formData=new FormData();formData.append('file',blobInfo.blob(),fileName(blobInfo));xhr.send(formData);}
function noUpload(){return new Promise(function(resolve){resolve([]);});}
function handlerSuccess(blobInfo,url){return{url:url,blobInfo:blobInfo,status:true};}
function handlerFailure(blobInfo,error){return{url:'',blobInfo:blobInfo,status:false,error:error};}
function resolvePending(blobUri,result){Tools.each(pendingPromises[blobUri],function(resolve){resolve(result);});delete pendingPromises[blobUri];}
function uploadBlobInfo(blobInfo,handler,openNotification){uploadStatus.markPending(blobInfo.blobUri());return new Promise(function(resolve){var notification,progress;var noop=function(){};try{var closeNotification=function(){if(notification){notification.close();progress=noop;}};var success=function(url){closeNotification();uploadStatus.markUploaded(blobInfo.blobUri(),url);resolvePending(blobInfo.blobUri(),handlerSuccess(blobInfo,url));resolve(handlerSuccess(blobInfo,url));};var failure=function(){closeNotification();uploadStatus.removeFailed(blobInfo.blobUri());resolvePending(blobInfo.blobUri(),handlerFailure(blobInfo,failure));resolve(handlerFailure(blobInfo,failure));};progress=function(percent){if(percent<0||percent>100){return;}
if(!notification){notification=openNotification();}
notification.progressBar.value(percent);};handler(blobInfoToData(blobInfo),success,failure,progress);}catch(ex){resolve(handlerFailure(blobInfo,ex.message));}});}
function isDefaultHandler(handler){return handler===defaultHandler;}
function pendingUploadBlobInfo(blobInfo){var blobUri=blobInfo.blobUri();return new Promise(function(resolve){pendingPromises[blobUri]=pendingPromises[blobUri]||[];pendingPromises[blobUri].push(resolve);});}
function uploadBlobs(blobInfos,openNotification){blobInfos=Tools.grep(blobInfos,function(blobInfo){return!uploadStatus.isUploaded(blobInfo.blobUri());});return Promise.all(Tools.map(blobInfos,function(blobInfo){return uploadStatus.isPending(blobInfo.blobUri())?pendingUploadBlobInfo(blobInfo):uploadBlobInfo(blobInfo,settings.handler,openNotification);}));}
function upload(blobInfos,openNotification){return(!settings.url&&isDefaultHandler(settings.handler))?noUpload():uploadBlobs(blobInfos,openNotification);}
settings=Tools.extend({credentials:false,handler:defaultHandler},settings);return{upload:upload};};});define("tinymce/file/Conversions",["tinymce/util/Promise"],function(Promise){function blobUriToBlob(url){return new Promise(function(resolve){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.responseType='blob';xhr.onload=function(){if(this.status==200){resolve(this.response);}};xhr.send();});}
function parseDataUri(uri){var type,matches;uri=decodeURIComponent(uri).split(',');matches=/data:([^;]+)/.exec(uri[0]);if(matches){type=matches[1];}
return{type:type,data:uri[1]};}
function dataUriToBlob(uri){return new Promise(function(resolve){var str,arr,i;uri=parseDataUri(uri);try{str=atob(uri.data);}catch(e){resolve(new Blob([]));return;}
arr=new Uint8Array(str.length);for(i=0;i<arr.length;i++){arr[i]=str.charCodeAt(i);}
resolve(new Blob([arr],{type:uri.type}));});}
function uriToBlob(url){if(url.indexOf('blob:')===0){return blobUriToBlob(url);}
if(url.indexOf('data:')===0){return dataUriToBlob(url);}
return null;}
function blobToDataUri(blob){return new Promise(function(resolve){var reader=new FileReader();reader.onloadend=function(){resolve(reader.result);};reader.readAsDataURL(blob);});}
return{uriToBlob:uriToBlob,blobToDataUri:blobToDataUri,parseDataUri:parseDataUri};});define("tinymce/file/ImageScanner",["tinymce/util/Promise","tinymce/util/Arr","tinymce/util/Fun","tinymce/file/Conversions","tinymce/Env"],function(Promise,Arr,Fun,Conversions,Env){var count=0;return function(uploadStatus,blobCache){var cachedPromises={};function findAll(elm,predicate){var images,promises;function imageToBlobInfo(img,resolve){var base64,blobInfo;if(img.src.indexOf('blob:')===0){blobInfo=blobCache.getByUri(img.src);if(blobInfo){resolve({image:img,blobInfo:blobInfo});}
return;}
base64=Conversions.parseDataUri(img.src).data;blobInfo=blobCache.findFirst(function(cachedBlobInfo){return cachedBlobInfo.base64()===base64;});if(blobInfo){resolve({image:img,blobInfo:blobInfo});}else{Conversions.uriToBlob(img.src).then(function(blob){var blobInfoId='blobid'+(count++),blobInfo=blobCache.create(blobInfoId,blob,base64);blobCache.add(blobInfo);resolve({image:img,blobInfo:blobInfo});});}}
if(!predicate){predicate=Fun.constant(true);}
images=Arr.filter(elm.getElementsByTagName('img'),function(img){var src=img.src;if(!Env.fileApi){return false;}
if(img.hasAttribute('data-mce-bogus')){return false;}
if(img.hasAttribute('data-mce-placeholder')){return false;}
if(!src||src==Env.transparentSrc){return false;}
if(src.indexOf('blob:')===0){return!uploadStatus.isUploaded(src);}
if(src.indexOf('data:')===0){return predicate(img);}
return false;});promises=Arr.map(images,function(img){var newPromise;if(cachedPromises[img.src]){return new Promise(function(resolve){cachedPromises[img.src].then(function(imageInfo){resolve({image:img,blobInfo:imageInfo.blobInfo});});});}
newPromise=new Promise(function(resolve){imageToBlobInfo(img,resolve);}).then(function(result){delete cachedPromises[result.image.src];return result;})['catch'](function(error){delete cachedPromises[img.src];return error;});cachedPromises[img.src]=newPromise;return newPromise;});return Promise.all(promises);}
return{findAll:findAll};};});define("tinymce/file/BlobCache",["tinymce/util/Arr","tinymce/util/Fun"],function(Arr,Fun){return function(){var cache=[],constant=Fun.constant;function create(id,blob,base64){return{id:constant(id),blob:constant(blob),base64:constant(base64),blobUri:constant(URL.createObjectURL(blob))};}
function add(blobInfo){if(!get(blobInfo.id())){cache.push(blobInfo);}}
function get(id){return findFirst(function(cachedBlobInfo){return cachedBlobInfo.id()===id;});}
function findFirst(predicate){return Arr.filter(cache,predicate)[0];}
function getByUri(blobUri){return findFirst(function(blobInfo){return blobInfo.blobUri()==blobUri;});}
function removeByUri(blobUri){cache=Arr.filter(cache,function(blobInfo){if(blobInfo.blobUri()===blobUri){URL.revokeObjectURL(blobInfo.blobUri());return false;}
return true;});}
function destroy(){Arr.each(cache,function(cachedBlobInfo){URL.revokeObjectURL(cachedBlobInfo.blobUri());});cache=[];}
return{create:create,add:add,get:get,getByUri:getByUri,findFirst:findFirst,removeByUri:removeByUri,destroy:destroy};};});define("tinymce/file/UploadStatus",[],function(){return function(){var PENDING=1,UPLOADED=2;var blobUriStatuses={};function createStatus(status,resultUri){return{status:status,resultUri:resultUri};}
function hasBlobUri(blobUri){return blobUri in blobUriStatuses;}
function getResultUri(blobUri){var result=blobUriStatuses[blobUri];return result?result.resultUri:null;}
function isPending(blobUri){return hasBlobUri(blobUri)?blobUriStatuses[blobUri].status===PENDING:false;}
function isUploaded(blobUri){return hasBlobUri(blobUri)?blobUriStatuses[blobUri].status===UPLOADED:false;}
function markPending(blobUri){blobUriStatuses[blobUri]=createStatus(PENDING,null);}
function markUploaded(blobUri,resultUri){blobUriStatuses[blobUri]=createStatus(UPLOADED,resultUri);}
function removeFailed(blobUri){delete blobUriStatuses[blobUri];}
function destroy(){blobUriStatuses={};}
return{hasBlobUri:hasBlobUri,getResultUri:getResultUri,isPending:isPending,isUploaded:isUploaded,markPending:markPending,markUploaded:markUploaded,removeFailed:removeFailed,destroy:destroy};};});define("tinymce/EditorUpload",["tinymce/util/Arr","tinymce/file/Uploader","tinymce/file/ImageScanner","tinymce/file/BlobCache","tinymce/file/UploadStatus"],function(Arr,Uploader,ImageScanner,BlobCache,UploadStatus){return function(editor){var blobCache=new BlobCache(),uploader,imageScanner,settings=editor.settings;var uploadStatus=new UploadStatus();function aliveGuard(callback){return function(result){if(editor.selection){return callback(result);}
return[];};}
function replaceString(content,search,replace){var index=0;do{index=content.indexOf(search,index);if(index!==-1){content=content.substring(0,index)+replace+content.substr(index+search.length);index+=replace.length-search.length+1;}}while(index!==-1);return content;}
function replaceImageUrl(content,targetUrl,replacementUrl){content=replaceString(content,'src="'+targetUrl+'"','src="'+replacementUrl+'"');content=replaceString(content,'data-mce-src="'+targetUrl+'"','data-mce-src="'+replacementUrl+'"');return content;}
function replaceUrlInUndoStack(targetUrl,replacementUrl){Arr.each(editor.undoManager.data,function(level){level.content=replaceImageUrl(level.content,targetUrl,replacementUrl);});}
function openNotification(){return editor.notificationManager.open({text:editor.translate('Image uploading...'),type:'info',timeout:-1,progressBar:true});}
function replaceImageUri(image,resultUri){blobCache.removeByUri(image.src);replaceUrlInUndoStack(image.src,resultUri);editor.$(image).attr({src:resultUri,'data-mce-src':editor.convertURL(resultUri,'src')});}
function uploadImages(callback){if(!uploader){uploader=new Uploader(uploadStatus,{url:settings.images_upload_url,basePath:settings.images_upload_base_path,credentials:settings.images_upload_credentials,handler:settings.images_upload_handler});}
return scanForImages().then(aliveGuard(function(imageInfos){var blobInfos;blobInfos=Arr.map(imageInfos,function(imageInfo){return imageInfo.blobInfo;});return uploader.upload(blobInfos,openNotification).then(aliveGuard(function(result){result=Arr.map(result,function(uploadInfo,index){var image=imageInfos[index].image;if(uploadInfo.status&&editor.settings.images_replace_blob_uris!==false){replaceImageUri(image,uploadInfo.url);}
return{element:image,status:uploadInfo.status};});if(callback){callback(result);}
return result;}));}));}
function uploadImagesAuto(callback){if(settings.automatic_uploads!==false){return uploadImages(callback);}}
function isValidDataUriImage(imgElm){return settings.images_dataimg_filter?settings.images_dataimg_filter(imgElm):true;}
function scanForImages(){if(!imageScanner){imageScanner=new ImageScanner(uploadStatus,blobCache);}
return imageScanner.findAll(editor.getBody(),isValidDataUriImage).then(aliveGuard(function(result){Arr.each(result,function(resultItem){replaceUrlInUndoStack(resultItem.image.src,resultItem.blobInfo.blobUri());resultItem.image.src=resultItem.blobInfo.blobUri();resultItem.image.removeAttribute('data-mce-src');});return result;}));}
function destroy(){blobCache.destroy();uploadStatus.destroy();imageScanner=uploader=null;}
function replaceBlobUris(content){return content.replace(/src="(blob:[^"]+)"/g,function(match,blobUri){var resultUri=uploadStatus.getResultUri(blobUri);if(resultUri){return 'src="'+resultUri+'"';}
var blobInfo=blobCache.getByUri(blobUri);if(!blobInfo){blobInfo=Arr.reduce(editor.editorManager.editors,function(result,editor){return result||editor.editorUpload.blobCache.getByUri(blobUri);},null);}
if(blobInfo){return 'src="data:'+blobInfo.blob().type+';base64,'+blobInfo.base64()+'"';}
return match;});}
editor.on('setContent',function(){if(editor.settings.automatic_uploads!==false){uploadImagesAuto();}else{scanForImages();}});editor.on('RawSaveContent',function(e){e.content=replaceBlobUris(e.content);});editor.on('getContent',function(e){if(e.source_view||e.format=='raw'){return;}
e.content=replaceBlobUris(e.content);});editor.on('PostRender',function(){editor.parser.addNodeFilter('img',function(images){Arr.each(images,function(img){var src=img.attr('src');if(blobCache.getByUri(src)){return;}
var resultUri=uploadStatus.getResultUri(src);if(resultUri){img.attr('src',resultUri);}});});});return{blobCache:blobCache,uploadImages:uploadImages,uploadImagesAuto:uploadImagesAuto,scanForImages:scanForImages,destroy:destroy};};});define("tinymce/caret/FakeCaret",["tinymce/caret/CaretContainer","tinymce/caret/CaretPosition","tinymce/dom/NodeType","tinymce/dom/RangeUtils","tinymce/dom/DomQuery","tinymce/geom/ClientRect","tinymce/util/Delay"],function(CaretContainer,CaretPosition,NodeType,RangeUtils,$,ClientRect,Delay){var isContentEditableFalse=NodeType.isContentEditableFalse;return function(rootNode,isBlock){var cursorInterval,$lastVisualCaret,caretContainerNode;function getAbsoluteClientRect(node,before){var clientRect=ClientRect.collapse(node.getBoundingClientRect(),before),docElm,scrollX,scrollY,margin,rootRect;if(rootNode.tagName=='BODY'){docElm=rootNode.ownerDocument.documentElement;scrollX=rootNode.scrollLeft||docElm.scrollLeft;scrollY=rootNode.scrollTop||docElm.scrollTop;}else{rootRect=rootNode.getBoundingClientRect();scrollX=rootNode.scrollLeft-rootRect.left;scrollY=rootNode.scrollTop-rootRect.top;}
clientRect.left+=scrollX;clientRect.right+=scrollX;clientRect.top+=scrollY;clientRect.bottom+=scrollY;clientRect.width=1;margin=node.offsetWidth-node.clientWidth;if(margin>0){if(before){margin*=-1;}
clientRect.left+=margin;clientRect.right+=margin;}
return clientRect;}
function trimInlineCaretContainers(){var contentEditableFalseNodes,node,sibling,i,data;contentEditableFalseNodes=$('*[contentEditable=false]',rootNode);for(i=0;i<contentEditableFalseNodes.length;i++){node=contentEditableFalseNodes[i];sibling=node.previousSibling;if(CaretContainer.endsWithCaretContainer(sibling)){data=sibling.data;if(data.length==1){sibling.parentNode.removeChild(sibling);}else{sibling.deleteData(data.length-1,1);}}
sibling=node.nextSibling;if(CaretContainer.startsWithCaretContainer(sibling)){data=sibling.data;if(data.length==1){sibling.parentNode.removeChild(sibling);}else{sibling.deleteData(0,1);}}}
return null;}
function show(before,node){var clientRect,rng,container;hide();if(isBlock(node)){caretContainerNode=CaretContainer.insertBlock('p',node,before);clientRect=getAbsoluteClientRect(node,before);$(caretContainerNode).css('top',clientRect.top);$lastVisualCaret=$('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(clientRect).appendTo(rootNode);if(before){$lastVisualCaret.addClass('mce-visual-caret-before');}
startBlink();rng=node.ownerDocument.createRange();container=caretContainerNode.firstChild;rng.setStart(container,0);rng.setEnd(container,1);}else{caretContainerNode=CaretContainer.insertInline(node,before);rng=node.ownerDocument.createRange();if(isContentEditableFalse(caretContainerNode.nextSibling)){rng.setStart(caretContainerNode,0);rng.setEnd(caretContainerNode,0);}else{rng.setStart(caretContainerNode,1);rng.setEnd(caretContainerNode,1);}
return rng;}
return rng;}
function hide(){trimInlineCaretContainers();if(caretContainerNode){CaretContainer.remove(caretContainerNode);caretContainerNode=null;}
if($lastVisualCaret){$lastVisualCaret.remove();$lastVisualCaret=null;}
clearInterval(cursorInterval);}
function startBlink(){cursorInterval=Delay.setInterval(function(){$('div.mce-visual-caret',rootNode).toggleClass('mce-visual-caret-hidden');},500);}
function destroy(){Delay.clearInterval(cursorInterval);}
function getCss(){return('.mce-visual-caret {'+
'position: absolute;'+
'background-color: black;'+
'background-color: currentcolor;'+
'}'+
'.mce-visual-caret-hidden {'+
'display: none;'+
'}'+
'*[data-mce-caret] {'+
'position: absolute;'+
'left: -1000px;'+
'right: auto;'+
'top: 0;'+
'margin: 0;'+
'padding: 0;'+
'}');}
return{show:show,hide:hide,getCss:getCss,destroy:destroy};};});define("tinymce/dom/Dimensions",["tinymce/util/Arr","tinymce/dom/NodeType","tinymce/geom/ClientRect"],function(Arr,NodeType,ClientRect){function getClientRects(node){function toArrayWithNode(clientRects){return Arr.map(clientRects,function(clientRect){clientRect=ClientRect.clone(clientRect);clientRect.node=node;return clientRect;});}
if(Arr.isArray(node)){return Arr.reduce(node,function(result,node){return result.concat(getClientRects(node));},[]);}
if(NodeType.isElement(node)){return toArrayWithNode(node.getClientRects());}
if(NodeType.isText(node)){var rng=node.ownerDocument.createRange();rng.setStart(node,0);rng.setEnd(node,node.data.length);return toArrayWithNode(rng.getClientRects());}}
return{getClientRects:getClientRects};});define("tinymce/caret/LineWalker",["tinymce/util/Fun","tinymce/util/Arr","tinymce/dom/Dimensions","tinymce/caret/CaretCandidate","tinymce/caret/CaretUtils","tinymce/caret/CaretWalker","tinymce/caret/CaretPosition","tinymce/geom/ClientRect"],function(Fun,Arr,Dimensions,CaretCandidate,CaretUtils,CaretWalker,CaretPosition,ClientRect){var curry=Fun.curry;function findUntil(direction,rootNode,predicateFn,node){while((node=CaretUtils.findNode(node,direction,CaretCandidate.isEditableCaretCandidate,rootNode))){if(predicateFn(node)){return;}}}
function walkUntil(direction,isAboveFn,isBeflowFn,rootNode,predicateFn,caretPosition){var line=0,node,result=[],targetClientRect;function add(node){var i,clientRect,clientRects;clientRects=Dimensions.getClientRects(node);if(direction==-1){clientRects=clientRects.reverse();}
for(i=0;i<clientRects.length;i++){clientRect=clientRects[i];if(isBeflowFn(clientRect,targetClientRect)){continue;}
if(result.length>0&&isAboveFn(clientRect,Arr.last(result))){line++;}
clientRect.line=line;if(predicateFn(clientRect)){return true;}
result.push(clientRect);}}
targetClientRect=Arr.last(caretPosition.getClientRects());if(!targetClientRect){return result;}
node=caretPosition.getNode();add(node);findUntil(direction,rootNode,add,node);return result;}
function aboveLineNumber(lineNumber,clientRect){return clientRect.line>lineNumber;}
function isLine(lineNumber,clientRect){return clientRect.line===lineNumber;}
var upUntil=curry(walkUntil,-1,ClientRect.isAbove,ClientRect.isBelow);var downUntil=curry(walkUntil,1,ClientRect.isBelow,ClientRect.isAbove);function positionsUntil(direction,rootNode,predicateFn,node){var caretWalker=new CaretWalker(rootNode),walkFn,isBelowFn,isAboveFn,caretPosition,result=[],line=0,clientRect,targetClientRect;function getClientRect(caretPosition){if(direction==1){return Arr.last(caretPosition.getClientRects());}
return Arr.last(caretPosition.getClientRects());}
if(direction==1){walkFn=caretWalker.next;isBelowFn=ClientRect.isBelow;isAboveFn=ClientRect.isAbove;caretPosition=CaretPosition.after(node);}else{walkFn=caretWalker.prev;isBelowFn=ClientRect.isAbove;isAboveFn=ClientRect.isBelow;caretPosition=CaretPosition.before(node);}
targetClientRect=getClientRect(caretPosition);do{if(!caretPosition.isVisible()){continue;}
clientRect=getClientRect(caretPosition);if(isAboveFn(clientRect,targetClientRect)){continue;}
if(result.length>0&&isBelowFn(clientRect,Arr.last(result))){line++;}
clientRect=ClientRect.clone(clientRect);clientRect.position=caretPosition;clientRect.line=line;if(predicateFn(clientRect)){return result;}
result.push(clientRect);}while((caretPosition=walkFn(caretPosition)));return result;}
return{upUntil:upUntil,downUntil:downUntil,positionsUntil:positionsUntil,isAboveLine:curry(aboveLineNumber),isLine:curry(isLine)};});define("tinymce/caret/LineUtils",["tinymce/util/Fun","tinymce/util/Arr","tinymce/dom/NodeType","tinymce/dom/Dimensions","tinymce/geom/ClientRect","tinymce/caret/CaretUtils","tinymce/caret/CaretCandidate"],function(Fun,Arr,NodeType,Dimensions,ClientRect,CaretUtils,CaretCandidate){var isContentEditableFalse=NodeType.isContentEditableFalse,findNode=CaretUtils.findNode,curry=Fun.curry;function distanceToRectLeft(clientRect,clientX){return Math.abs(clientRect.left-clientX);}
function distanceToRectRight(clientRect,clientX){return Math.abs(clientRect.right-clientX);}
function findClosestClientRect(clientRects,clientX){function isInside(clientX,clientRect){return clientX>=clientRect.left&&clientX<=clientRect.right;}
return Arr.reduce(clientRects,function(oldClientRect,clientRect){var oldDistance,newDistance;oldDistance=Math.min(distanceToRectLeft(oldClientRect,clientX),distanceToRectRight(oldClientRect,clientX));newDistance=Math.min(distanceToRectLeft(clientRect,clientX),distanceToRectRight(clientRect,clientX));if(isInside(clientX,clientRect)){return clientRect;}
if(isInside(clientX,oldClientRect)){return oldClientRect;}
if(newDistance==oldDistance&&isContentEditableFalse(clientRect.node)){return clientRect;}
if(newDistance<oldDistance){return clientRect;}
return oldClientRect;});}
function walkUntil(direction,rootNode,predicateFn,node){while((node=findNode(node,direction,CaretCandidate.isEditableCaretCandidate,rootNode))){if(predicateFn(node)){return;}}}
function findLineNodeRects(rootNode,targetNodeRect){var clientRects=[];function collect(checkPosFn,node){var lineRects;lineRects=Arr.filter(Dimensions.getClientRects(node),function(clientRect){return!checkPosFn(clientRect,targetNodeRect);});clientRects=clientRects.concat(lineRects);return lineRects.length===0;}
clientRects.push(targetNodeRect);walkUntil(-1,rootNode,curry(collect,ClientRect.isAbove),targetNodeRect.node);walkUntil(1,rootNode,curry(collect,ClientRect.isBelow),targetNodeRect.node);return clientRects;}
function getContentEditableFalseChildren(rootNode){return Arr.filter(Arr.toArray(rootNode.getElementsByTagName('*')),isContentEditableFalse);}
function caretInfo(clientRect,clientX){return{node:clientRect.node,before:distanceToRectLeft(clientRect,clientX)<distanceToRectRight(clientRect,clientX)};}
function closestCaret(rootNode,clientX,clientY){var contentEditableFalseNodeRects,closestNodeRect;contentEditableFalseNodeRects=Dimensions.getClientRects(getContentEditableFalseChildren(rootNode));contentEditableFalseNodeRects=Arr.filter(contentEditableFalseNodeRects,function(clientRect){return clientY>=clientRect.top&&clientY<=clientRect.bottom;});closestNodeRect=findClosestClientRect(contentEditableFalseNodeRects,clientX);if(closestNodeRect){closestNodeRect=findClosestClientRect(findLineNodeRects(rootNode,closestNodeRect),clientX);if(closestNodeRect&&isContentEditableFalse(closestNodeRect.node)){return caretInfo(closestNodeRect,clientX);}}
return null;}
return{findClosestClientRect:findClosestClientRect,findLineNodeRects:findLineNodeRects,closestCaret:closestCaret};});define("tinymce/DragDropOverrides",["tinymce/dom/NodeType","tinymce/util/Arr","tinymce/util/Fun"],function(NodeType,Arr,Fun){var isContentEditableFalse=NodeType.isContentEditableFalse,isContentEditableTrue=NodeType.isContentEditableTrue;function init(editor){var $=editor.$,rootDocument=document,editableDoc=editor.getDoc(),dom=editor.dom,state={};function isDraggable(elm){return isContentEditableFalse(elm);}
function setBodyCursor(cursor){$(editor.getBody()).css('cursor',cursor);}
function isValidDropTarget(elm){if(elm==state.element||editor.dom.isChildOf(elm,state.element)){return false;}
if(isContentEditableFalse(elm)){return false;}
return true;}
function move(e){var deltaX,deltaY,pos,viewPort,overflowX=0,overflowY=0,movement,clientX,clientY,rootClientRect;if(e.button!==0){return;}
deltaX=e.screenX-state.screenX;deltaY=e.screenY-state.screenY;movement=Math.max(Math.abs(deltaX),Math.abs(deltaY));if(!state.dragging&&movement>10){state.dragging=true;setBodyCursor('default');state.clone=state.element.cloneNode(true);pos=dom.getPos(state.element);state.relX=state.clientX-pos.x;state.relY=state.clientY-pos.y;state.width=state.element.offsetWidth;state.height=state.element.offsetHeight;$(state.clone).css({width:state.width,height:state.height}).removeAttr('data-mce-selected');state.ghost=$('<div>').css({position:'absolute',opacity:0.5,overflow:'hidden',width:state.width,height:state.height}).attr({'data-mce-bogus':'all',unselectable:'on',contenteditable:'false'}).addClass('mce-drag-container mce-reset').append(state.clone).appendTo(editor.getBody())[0];viewPort=editor.dom.getViewPort(editor.getWin());state.maxX=viewPort.w;state.maxY=viewPort.h;}
if(state.dragging){editor.selection.placeCaretAt(e.clientX,e.clientY);clientX=state.clientX+deltaX-state.relX;clientY=state.clientY+deltaY+5;if(clientX+state.width>state.maxX){overflowX=(clientX+state.width)-state.maxX;}
if(clientY+state.height>state.maxY){overflowY=(clientY+state.height)-state.maxY;}
if(editor.getBody().nodeName!='BODY'){rootClientRect=editor.getBody().getBoundingClientRect();}else{rootClientRect={left:0,top:0};}
$(state.ghost).css({left:clientX-rootClientRect.left,top:clientY-rootClientRect.top,width:state.width-overflowX,height:state.height-overflowY});}}
function drop(){var evt;if(state.dragging){editor.selection.setRng(editor.selection.getSel().getRangeAt(0));if(isValidDropTarget(editor.selection.getNode())){var targetClone=state.element;evt=editor.fire('drop',{targetClone:targetClone});if(evt.isDefaultPrevented()){return;}
targetClone=evt.targetClone;editor.undoManager.transact(function(){editor.insertContent(dom.getOuterHTML(targetClone));$(state.element).remove();});}}
stop();}
function start(e){var ceElm,evt;stop();if(e.button!==0){return;}
ceElm=Arr.find(editor.dom.getParents(e.target),Fun.or(isContentEditableFalse,isContentEditableTrue));if(isDraggable(ceElm)){evt=editor.fire('dragstart',{target:ceElm});if(evt.isDefaultPrevented()){return;}
editor.on('mousemove',move);editor.on('mouseup',drop);if(rootDocument!=editableDoc){dom.bind(rootDocument,'mousemove',move);dom.bind(rootDocument,'mouseup',drop);}
state={screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY,element:ceElm};}}
function stop(){$(state.ghost).remove();setBodyCursor(null);editor.off('mousemove',move);editor.off('mouseup',stop);if(rootDocument!=editableDoc){dom.unbind(rootDocument,'mousemove',move);dom.unbind(rootDocument,'mouseup',stop);}
state={};}
editor.on('mousedown',start);editor.on('drop',function(e){var realTarget=editor.getDoc().elementFromPoint(e.clientX,e.clientY);if(isContentEditableFalse(realTarget)||isContentEditableFalse(editor.dom.getContentEditableParent(realTarget))){e.preventDefault();}});}
return{init:init};});define("tinymce/SelectionOverrides",["tinymce/Env","tinymce/caret/CaretWalker","tinymce/caret/CaretPosition","tinymce/caret/CaretContainer","tinymce/caret/CaretUtils","tinymce/caret/FakeCaret","tinymce/caret/LineWalker","tinymce/caret/LineUtils","tinymce/dom/NodeType","tinymce/dom/RangeUtils","tinymce/geom/ClientRect","tinymce/util/VK","tinymce/util/Fun","tinymce/util/Arr","tinymce/util/Delay","tinymce/DragDropOverrides","tinymce/text/Zwsp"],function(Env,CaretWalker,CaretPosition,CaretContainer,CaretUtils,FakeCaret,LineWalker,LineUtils,NodeType,RangeUtils,ClientRect,VK,Fun,Arr,Delay,DragDropOverrides,Zwsp){var curry=Fun.curry,isContentEditableTrue=NodeType.isContentEditableTrue,isContentEditableFalse=NodeType.isContentEditableFalse,isElement=NodeType.isElement,isAfterContentEditableFalse=CaretUtils.isAfterContentEditableFalse,isBeforeContentEditableFalse=CaretUtils.isBeforeContentEditableFalse,getSelectedNode=RangeUtils.getSelectedNode;function getVisualCaretPosition(walkFn,caretPosition){while((caretPosition=walkFn(caretPosition))){if(caretPosition.isVisible()){return caretPosition;}}
return caretPosition;}
function SelectionOverrides(editor){var rootNode=editor.getBody(),caretWalker=new CaretWalker(rootNode);var getNextVisualCaretPosition=curry(getVisualCaretPosition,caretWalker.next);var getPrevVisualCaretPosition=curry(getVisualCaretPosition,caretWalker.prev),fakeCaret=new FakeCaret(editor.getBody(),isBlock),realSelectionId='sel-'+editor.dom.uniqueId(),selectedContentEditableNode,$=editor.$;function isBlock(node){return editor.dom.isBlock(node);}
function setRange(range){if(range){editor.selection.setRng(range);}}
function getRange(){return editor.selection.getRng();}
function scrollIntoView(node,alignToTop){editor.selection.scrollIntoView(node,alignToTop);}
function showCaret(direction,node,before){var e;e=editor.fire('ShowCaret',{target:node,direction:direction,before:before});if(e.isDefaultPrevented()){return null;}
scrollIntoView(node,direction===-1);return fakeCaret.show(before,node);}
function selectNode(node){var e;fakeCaret.hide();e=editor.fire('BeforeObjectSelected',{target:node});if(e.isDefaultPrevented()){return null;}
return getNodeRange(node);}
function getNodeRange(node){var rng=node.ownerDocument.createRange();rng.selectNode(node);return rng;}
function isMoveInsideSameBlock(fromCaretPosition,toCaretPosition){var inSameBlock=CaretUtils.isInSameBlock(fromCaretPosition,toCaretPosition);if(!inSameBlock&&NodeType.isBr(fromCaretPosition.getNode())){return true;}
return inSameBlock;}
function getNormalizedRangeEndPoint(direction,range){range=CaretUtils.normalizeRange(direction,rootNode,range);if(direction==-1){return CaretPosition.fromRangeStart(range);}
return CaretPosition.fromRangeEnd(range);}
function isRangeInCaretContainerBlock(range){return CaretContainer.isCaretContainerBlock(range.startContainer);}
function moveToCeFalseHorizontally(direction,getNextPosFn,isBeforeContentEditableFalseFn,range){var node,caretPosition,peekCaretPosition,rangeIsInContainerBlock;if(!range.collapsed){node=getSelectedNode(range);if(isContentEditableFalse(node)){return showCaret(direction,node,direction==-1);}}
rangeIsInContainerBlock=isRangeInCaretContainerBlock(range);caretPosition=getNormalizedRangeEndPoint(direction,range);if(isBeforeContentEditableFalseFn(caretPosition)){return selectNode(caretPosition.getNode(direction==-1));}
caretPosition=getNextPosFn(caretPosition);if(!caretPosition){if(rangeIsInContainerBlock){return range;}
return null;}
if(isBeforeContentEditableFalseFn(caretPosition)){return showCaret(direction,caretPosition.getNode(direction==-1),direction==1);}
peekCaretPosition=getNextPosFn(caretPosition);if(isBeforeContentEditableFalseFn(peekCaretPosition)){if(isMoveInsideSameBlock(caretPosition,peekCaretPosition)){return showCaret(direction,peekCaretPosition.getNode(direction==-1),direction==1);}}
if(rangeIsInContainerBlock){return renderRangeCaret(caretPosition.toRange());}
return null;}
function moveToCeFalseVertically(direction,walkerFn,range){var caretPosition,linePositions,nextLinePositions,closestNextLineRect,caretClientRect,clientX,dist1,dist2,contentEditableFalseNode;contentEditableFalseNode=getSelectedNode(range);caretPosition=getNormalizedRangeEndPoint(direction,range);linePositions=walkerFn(rootNode,LineWalker.isAboveLine(1),caretPosition);nextLinePositions=Arr.filter(linePositions,LineWalker.isLine(1));caretClientRect=Arr.last(caretPosition.getClientRects());if(isBeforeContentEditableFalse(caretPosition)){contentEditableFalseNode=caretPosition.getNode();}
if(isAfterContentEditableFalse(caretPosition)){contentEditableFalseNode=caretPosition.getNode(true);}
if(!caretClientRect){return null;}
clientX=caretClientRect.left;closestNextLineRect=LineUtils.findClosestClientRect(nextLinePositions,clientX);if(closestNextLineRect){if(isContentEditableFalse(closestNextLineRect.node)){dist1=Math.abs(clientX-closestNextLineRect.left);dist2=Math.abs(clientX-closestNextLineRect.right);return showCaret(direction,closestNextLineRect.node,dist1<dist2);}}
if(contentEditableFalseNode){var caretPositions=LineWalker.positionsUntil(direction,rootNode,LineWalker.isAboveLine(1),contentEditableFalseNode);closestNextLineRect=LineUtils.findClosestClientRect(Arr.filter(caretPositions,LineWalker.isLine(1)),clientX);if(closestNextLineRect){return renderRangeCaret(closestNextLineRect.position.toRange());}
closestNextLineRect=Arr.last(Arr.filter(caretPositions,LineWalker.isLine(0)));if(closestNextLineRect){return renderRangeCaret(closestNextLineRect.position.toRange());}}}
function exitPreBlock(direction,range){var pre,caretPos,newBlock;function createTextBlock(){var textBlock=editor.dom.create(editor.settings.forced_root_block);if(!Env.ie||Env.ie>=11){textBlock.innerHTML='<br data-mce-bogus="1">';}
return textBlock;}
if(range.collapsed&&editor.settings.forced_root_block){pre=editor.dom.getParent(range.startContainer,'PRE');if(!pre){return;}
if(direction==1){caretPos=getNextVisualCaretPosition(CaretPosition.fromRangeStart(range));}else{caretPos=getPrevVisualCaretPosition(CaretPosition.fromRangeStart(range));}
if(!caretPos){newBlock=createTextBlock();if(direction==1){editor.$(pre).after(newBlock);}else{editor.$(pre).before(newBlock);}
editor.selection.select(newBlock,true);editor.selection.collapse();}}}
function moveH(direction,getNextPosFn,isBeforeContentEditableFalseFn,range){var newRange;newRange=moveToCeFalseHorizontally(direction,getNextPosFn,isBeforeContentEditableFalseFn,range);if(newRange){return newRange;}
newRange=exitPreBlock(direction,range);if(newRange){return newRange;}
return null;}
function moveV(direction,walkerFn,range){var newRange;newRange=moveToCeFalseVertically(direction,walkerFn,range);if(newRange){return newRange;}
newRange=exitPreBlock(direction,range);if(newRange){return newRange;}
return null;}
function getBlockCaretContainer(){return $('*[data-mce-caret]')[0];}
function showBlockCaretContainer(blockCaretContainer){blockCaretContainer=$(blockCaretContainer);if(blockCaretContainer.attr('data-mce-caret')){fakeCaret.hide();blockCaretContainer.removeAttr('data-mce-caret');blockCaretContainer.removeAttr('data-mce-bogus');blockCaretContainer.removeAttr('style');setRange(getRange());scrollIntoView(blockCaretContainer[0]);}}
function renderCaretAtRange(range){var caretPosition,ceRoot;range=CaretUtils.normalizeRange(1,rootNode,range);caretPosition=CaretPosition.fromRangeStart(range);if(isContentEditableFalse(caretPosition.getNode())){return showCaret(1,caretPosition.getNode(),!caretPosition.isAtEnd());}
if(isContentEditableFalse(caretPosition.getNode(true))){return showCaret(1,caretPosition.getNode(true),false);}
ceRoot=editor.dom.getParent(caretPosition.getNode(),Fun.or(isContentEditableFalse,isContentEditableTrue));if(isContentEditableFalse(ceRoot)){return showCaret(1,ceRoot,false);}
fakeCaret.hide();return null;}
function renderRangeCaret(range){var caretRange;if(!range||!range.collapsed){return range;}
caretRange=renderCaretAtRange(range);if(caretRange){return caretRange;}
return range;}
function deleteContentEditableNode(node){var nextCaretPosition,prevCaretPosition,prevCeFalseElm,nextElement;if(!isContentEditableFalse(node)){return null;}
if(isContentEditableFalse(node.previousSibling)){prevCeFalseElm=node.previousSibling;}
prevCaretPosition=getPrevVisualCaretPosition(CaretPosition.before(node));if(!prevCaretPosition){nextCaretPosition=getNextVisualCaretPosition(CaretPosition.after(node));}
if(nextCaretPosition&&isElement(nextCaretPosition.getNode())){nextElement=nextCaretPosition.getNode();}
CaretContainer.remove(node.previousSibling);CaretContainer.remove(node.nextSibling);editor.dom.remove(node);clearContentEditableSelection();if(editor.dom.isEmpty(editor.getBody())){editor.setContent('');editor.focus();return;}
if(prevCeFalseElm){return CaretPosition.after(prevCeFalseElm).toRange();}
if(nextElement){return CaretPosition.before(nextElement).toRange();}
if(prevCaretPosition){return prevCaretPosition.toRange();}
if(nextCaretPosition){return nextCaretPosition.toRange();}
return null;}
function mergeTextBlocks(direction,fromCaretPosition,toCaretPosition){var dom=editor.dom,fromBlock,toBlock,node,textBlocks;if(direction===-1){if(isAfterContentEditableFalse(toCaretPosition)&&isBlock(toCaretPosition.getNode(true))){return deleteContentEditableNode(toCaretPosition.getNode(true));}}else{if(isBeforeContentEditableFalse(fromCaretPosition)&&isBlock(fromCaretPosition.getNode())){return deleteContentEditableNode(fromCaretPosition.getNode());}}
textBlocks=editor.schema.getTextBlockElements();fromBlock=dom.getParent(fromCaretPosition.getNode(),dom.isBlock);toBlock=dom.getParent(toCaretPosition.getNode(),dom.isBlock);if(fromBlock===toBlock||!textBlocks[fromBlock.nodeName]||!textBlocks[toBlock.nodeName]){return null;}
while((node=fromBlock.firstChild)){toBlock.appendChild(node);}
editor.dom.remove(fromBlock);return toCaretPosition.toRange();}
function backspaceDelete(direction,beforeFn,range){var node,caretPosition,peekCaretPosition;if(!range.collapsed){node=getSelectedNode(range);if(isContentEditableFalse(node)){return renderRangeCaret(deleteContentEditableNode(node));}}
caretPosition=getNormalizedRangeEndPoint(direction,range);if(beforeFn(caretPosition)){return renderRangeCaret(deleteContentEditableNode(caretPosition.getNode(direction==-1)));}
peekCaretPosition=direction==-1?caretWalker.prev(caretPosition):caretWalker.next(caretPosition);if(beforeFn(peekCaretPosition)){if(direction===-1){return mergeTextBlocks(direction,caretPosition,peekCaretPosition);}
return mergeTextBlocks(direction,peekCaretPosition,caretPosition);}}
function registerEvents(){var right=curry(moveH,1,getNextVisualCaretPosition,isBeforeContentEditableFalse);var left=curry(moveH,-1,getPrevVisualCaretPosition,isAfterContentEditableFalse);var deleteForward=curry(backspaceDelete,1,isBeforeContentEditableFalse);var backspace=curry(backspaceDelete,-1,isAfterContentEditableFalse);var up=curry(moveV,-1,LineWalker.upUntil);var down=curry(moveV,1,LineWalker.downUntil);function override(evt,moveFn){var range=moveFn(getRange());if(range&&!evt.isDefaultPrevented()){evt.preventDefault();setRange(range);}}
function getContentEditableRoot(node){var root=editor.getBody();while(node&&node!=root){if(isContentEditableTrue(node)||isContentEditableFalse(node)){return node;}
node=node.parentNode;}
return null;}
function isXYWithinRange(clientX,clientY,range){if(range.collapsed){return false;}
return Arr.reduce(range.getClientRects(),function(state,rect){return state||ClientRect.containsXY(rect,clientX,clientY);},false);}
editor.on('mouseup',function(){var range=getRange();if(range.collapsed){setRange(renderCaretAtRange(range));}});editor.on('click',function(e){var contentEditableRoot;contentEditableRoot=getContentEditableRoot(e.target);if(contentEditableRoot){if(isContentEditableFalse(contentEditableRoot)){e.preventDefault();}}});var hasNormalCaretPosition=function(elm){var caretWalker=new CaretWalker(elm);if(!elm.firstChild){return false;}
var startPos=CaretPosition.before(elm.firstChild);var newPos=caretWalker.next(startPos);return newPos&&!isBeforeContentEditableFalse(newPos)&&!isAfterContentEditableFalse(newPos);};var isInSameBlock=function(node1,node2){var block1=editor.dom.getParent(node1,editor.dom.isBlock);var block2=editor.dom.getParent(node2,editor.dom.isBlock);return block1===block2;};var hasBetterMouseTarget=function(targetNode,caretNode){var targetBlock=editor.dom.getParent(targetNode,editor.dom.isBlock);var caretBlock=editor.dom.getParent(caretNode,editor.dom.isBlock);return targetBlock&&!isInSameBlock(targetBlock,caretBlock)&&hasNormalCaretPosition(targetBlock);};editor.on('mousedown',function(e){var contentEditableRoot;contentEditableRoot=getContentEditableRoot(e.target);if(contentEditableRoot){if(isContentEditableFalse(contentEditableRoot)){e.preventDefault();setContentEditableSelection(selectNode(contentEditableRoot));}else{clearContentEditableSelection();if(!isXYWithinRange(e.clientX,e.clientY,editor.selection.getRng())){editor.selection.placeCaretAt(e.clientX,e.clientY);}}}else{clearContentEditableSelection();fakeCaret.hide();var caretInfo=LineUtils.closestCaret(rootNode,e.clientX,e.clientY);if(caretInfo){if(!hasBetterMouseTarget(e.target,caretInfo.node)){e.preventDefault();editor.getBody().focus();setRange(showCaret(1,caretInfo.node,caretInfo.before));}}}});editor.on('keydown',function(e){if(VK.modifierPressed(e)){return;}
switch(e.keyCode){case VK.RIGHT:override(e,right);break;case VK.DOWN:override(e,down);break;case VK.LEFT:override(e,left);break;case VK.UP:override(e,up);break;case VK.DELETE:override(e,deleteForward);break;case VK.BACKSPACE:override(e,backspace);break;default:if(isContentEditableFalse(editor.selection.getNode())){e.preventDefault();}
break;}});function paddEmptyContentEditableArea(){var br,ceRoot=getContentEditableRoot(editor.selection.getNode());if(isContentEditableTrue(ceRoot)&&isBlock(ceRoot)&&editor.dom.isEmpty(ceRoot)){br=editor.dom.create('br',{"data-mce-bogus":"1"});editor.$(ceRoot).empty().append(br);editor.selection.setRng(CaretPosition.before(br).toRange());}}
function handleBlockContainer(e){var blockCaretContainer=getBlockCaretContainer();if(!blockCaretContainer){return;}
if(e.type=='compositionstart'){e.preventDefault();e.stopPropagation();showBlockCaretContainer(blockCaretContainer);return;}
if(blockCaretContainer.innerHTML!='&nbsp;'){showBlockCaretContainer(blockCaretContainer);}}
function handleEmptyBackspaceDelete(e){var prevent;switch(e.keyCode){case VK.DELETE:prevent=paddEmptyContentEditableArea();break;case VK.BACKSPACE:prevent=paddEmptyContentEditableArea();break;}
if(prevent){e.preventDefault();}}
editor.on('keyup compositionstart',function(e){handleBlockContainer(e);handleEmptyBackspaceDelete(e);},true);editor.on('cut',function(){var node=editor.selection.getNode();if(isContentEditableFalse(node)){Delay.setEditorTimeout(editor,function(){setRange(renderRangeCaret(deleteContentEditableNode(node)));});}});editor.on('getSelectionRange',function(e){var rng=e.range;if(selectedContentEditableNode){if(!selectedContentEditableNode.parentNode){selectedContentEditableNode=null;return;}
rng=rng.cloneRange();rng.selectNode(selectedContentEditableNode);e.range=rng;}});editor.on('setSelectionRange',function(e){var rng;rng=setContentEditableSelection(e.range);if(rng){e.range=rng;}});editor.on('focus',function(){Delay.setEditorTimeout(editor,function(){editor.selection.setRng(renderRangeCaret(editor.selection.getRng()));},0);});DragDropOverrides.init(editor);}
function addCss(){var styles=editor.contentStyles,rootClass='.mce-content-body';styles.push(fakeCaret.getCss());styles.push(rootClass+' .mce-offscreen-selection {'+
'position: absolute;'+
'left: -9999999999px;'+
'width: 100px;'+
'height: 100px;'+
'}'+
rootClass+' *[contentEditable=false] {'+
'cursor: default;'+
'}'+
rootClass+' *[contentEditable=true] {'+
'cursor: text;'+
'}');}
function isRangeInCaretContainer(rng){return CaretContainer.isCaretContainer(rng.startContainer)||CaretContainer.isCaretContainer(rng.endContainer);}
function setContentEditableSelection(range){var node,$=editor.$,dom=editor.dom,$realSelectionContainer,sel,startContainer,startOffset,endOffset,e,caretPosition,targetClone,origTargetClone;if(!range){clearContentEditableSelection();return null;}
if(range.collapsed){clearContentEditableSelection();if(!isRangeInCaretContainer(range)){caretPosition=getNormalizedRangeEndPoint(1,range);if(isContentEditableFalse(caretPosition.getNode())){return showCaret(1,caretPosition.getNode(),!caretPosition.isAtEnd());}
if(isContentEditableFalse(caretPosition.getNode(true))){return showCaret(1,caretPosition.getNode(true),false);}}
return null;}
startContainer=range.startContainer;startOffset=range.startOffset;endOffset=range.endOffset;if(startContainer.nodeType==3&&startOffset==0&&isContentEditableFalse(startContainer.parentNode)){startContainer=startContainer.parentNode;startOffset=dom.nodeIndex(startContainer);startContainer=startContainer.parentNode;}
if(startContainer.nodeType!=1){clearContentEditableSelection();return null;}
if(endOffset==startOffset+1){node=startContainer.childNodes[startOffset];}
if(!isContentEditableFalse(node)){clearContentEditableSelection();return null;}
targetClone=origTargetClone=node.cloneNode(true);e=editor.fire('ObjectSelected',{target:node,targetClone:targetClone});if(e.isDefaultPrevented()){clearContentEditableSelection();return null;}
targetClone=e.targetClone;$realSelectionContainer=$('#'+realSelectionId);if($realSelectionContainer.length===0){$realSelectionContainer=$('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr('id',realSelectionId);$realSelectionContainer.appendTo(editor.getBody());}
range=editor.dom.createRng();if(targetClone===origTargetClone&&Env.ie){$realSelectionContainer.empty().append(Zwsp.ZWSP).append(targetClone).append(Zwsp.ZWSP);range.setStart($realSelectionContainer[0].firstChild,0);range.setEnd($realSelectionContainer[0].lastChild,1);}else{$realSelectionContainer.empty().append('\u00a0').append(targetClone).append('\u00a0');range.setStart($realSelectionContainer[0].firstChild,1);range.setEnd($realSelectionContainer[0].lastChild,0);}
$realSelectionContainer.css({top:dom.getPos(node,editor.getBody()).y});editor.getBody().focus();$realSelectionContainer[0].focus();sel=editor.selection.getSel();sel.removeAllRanges();sel.addRange(range);editor.$('*[data-mce-selected]').removeAttr('data-mce-selected');node.setAttribute('data-mce-selected',1);selectedContentEditableNode=node;return range;}
function clearContentEditableSelection(){if(selectedContentEditableNode){selectedContentEditableNode.removeAttribute('data-mce-selected');editor.$('#'+realSelectionId).remove();selectedContentEditableNode=null;}}
function destroy(){fakeCaret.destroy();selectedContentEditableNode=null;}
if(Env.ceFalse){registerEvents();addCss();}
return{showBlockCaretContainer:showBlockCaretContainer,destroy:destroy};}
return SelectionOverrides;});define("tinymce/Editor",["tinymce/dom/DOMUtils","tinymce/dom/DomQuery","tinymce/AddOnManager","tinymce/NodeChange","tinymce/html/Node","tinymce/dom/Serializer","tinymce/html/Serializer","tinymce/dom/Selection","tinymce/Formatter","tinymce/UndoManager","tinymce/EnterKey","tinymce/ForceBlocks","tinymce/EditorCommands","tinymce/util/URI","tinymce/dom/ScriptLoader","tinymce/dom/EventUtils","tinymce/WindowManager","tinymce/NotificationManager","tinymce/html/Schema","tinymce/html/DomParser","tinymce/util/Quirks","tinymce/Env","tinymce/util/Tools","tinymce/util/Delay","tinymce/EditorObservable","tinymce/Mode","tinymce/Shortcuts","tinymce/EditorUpload","tinymce/SelectionOverrides"],function(DOMUtils,DomQuery,AddOnManager,NodeChange,Node,DomSerializer,Serializer,Selection,Formatter,UndoManager,EnterKey,ForceBlocks,EditorCommands,URI,ScriptLoader,EventUtils,WindowManager,NotificationManager,Schema,DomParser,Quirks,Env,Tools,Delay,EditorObservable,Mode,Shortcuts,EditorUpload,SelectionOverrides){var DOM=DOMUtils.DOM,ThemeManager=AddOnManager.ThemeManager,PluginManager=AddOnManager.PluginManager;var extend=Tools.extend,each=Tools.each,explode=Tools.explode;var inArray=Tools.inArray,trim=Tools.trim,resolve=Tools.resolve;var Event=EventUtils.Event;var isGecko=Env.gecko,ie=Env.ie;function Editor(id,settings,editorManager){var self=this,documentBaseUrl,baseUri,defaultSettings;documentBaseUrl=self.documentBaseUrl=editorManager.documentBaseURL;baseUri=editorManager.baseURI;defaultSettings=editorManager.defaultSettings;settings=extend({id:id,theme:'modern',delta_width:0,delta_height:0,popup_css:'',plugins:'',document_base_url:documentBaseUrl,add_form_submit_trigger:true,submit_patch:true,add_unload_trigger:true,convert_urls:true,relative_urls:true,remove_script_host:true,object_resizing:true,doctype:'<!DOCTYPE html>',visual:true,font_size_style_values:'xx-small,x-small,small,medium,large,x-large,xx-large',font_size_legacy_values:'xx-small,small,medium,large,x-large,xx-large,300%',forced_root_block:'p',hidden_input:true,padd_empty_editor:true,render_ui:true,indentation:'30px',inline_styles:true,convert_fonts_to_spans:true,indent:'simple',indent_before:'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,'+
'tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist',indent_after:'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,'+
'tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist',validate:true,entity_encoding:'named',url_converter:self.convertURL,url_converter_scope:self,ie7_compat:true},defaultSettings,settings);if(defaultSettings&&defaultSettings.external_plugins&&settings.external_plugins){settings.external_plugins=extend({},defaultSettings.external_plugins,settings.external_plugins);}
self.settings=settings;AddOnManager.language=settings.language||'en';AddOnManager.languageLoad=settings.language_load;AddOnManager.baseURL=editorManager.baseURL;self.id=settings.id=id;self.setDirty(false);self.plugins={};self.documentBaseURI=new URI(settings.document_base_url||documentBaseUrl,{base_uri:baseUri});self.baseURI=baseUri;self.contentCSS=[];self.contentStyles=[];self.shortcuts=new Shortcuts(self);self.loadedCSS={};self.editorCommands=new EditorCommands(self);if(settings.target){self.targetElm=settings.target;}
self.suffix=editorManager.suffix;self.editorManager=editorManager;self.inline=settings.inline;if(settings.cache_suffix){Env.cacheSuffix=settings.cache_suffix.replace(/^[\?\&]+/,'');}
if(settings.override_viewport===false){Env.overrideViewPort=false;}
editorManager.fire('SetupEditor',self);self.execCallback('setup',self);self.$=DomQuery.overrideDefaults(function(){return{context:self.inline?self.getBody():self.getDoc(),element:self.getBody()};});}
Editor.prototype={render:function(){var self=this,settings=self.settings,id=self.id,suffix=self.suffix;function readyHandler(){DOM.unbind(window,'ready',readyHandler);self.render();}
if(!Event.domLoaded){DOM.bind(window,'ready',readyHandler);return;}
if(!self.getElement()){return;}
if(!Env.contentEditable){return;}
if(!settings.inline){self.orgVisibility=self.getElement().style.visibility;self.getElement().style.visibility='hidden';}else{self.inline=true;}
var form=self.getElement().form||DOM.getParent(id,'form');if(form){self.formElement=form;if(settings.hidden_input&&!/TEXTAREA|INPUT/i.test(self.getElement().nodeName)){DOM.insertAfter(DOM.create('input',{type:'hidden',name:id}),id);self.hasHiddenInput=true;}
self.formEventDelegate=function(e){self.fire(e.type,e);};DOM.bind(form,'submit reset',self.formEventDelegate);self.on('reset',function(){self.setContent(self.startContent,{format:'raw'});});if(settings.submit_patch&&!form.submit.nodeType&&!form.submit.length&&!form._mceOldSubmit){form._mceOldSubmit=form.submit;form.submit=function(){self.editorManager.triggerSave();self.setDirty(false);return form._mceOldSubmit(form);};}}
self.windowManager=new WindowManager(self);self.notificationManager=new NotificationManager(self);if(settings.encoding=='xml'){self.on('GetContent',function(e){if(e.save){e.content=DOM.encode(e.content);}});}
if(settings.add_form_submit_trigger){self.on('submit',function(){if(self.initialized){self.save();}});}
if(settings.add_unload_trigger){self._beforeUnload=function(){if(self.initialized&&!self.destroyed&&!self.isHidden()){self.save({format:'raw',no_events:true,set_dirty:false});}};self.editorManager.on('BeforeUnload',self._beforeUnload);}
function loadScripts(){var scriptLoader=ScriptLoader.ScriptLoader;if(settings.language&&settings.language!='en'&&!settings.language_url){settings.language_url=self.editorManager.baseURL+'/langs/'+settings.language+'.js';}
if(settings.language_url){scriptLoader.add(settings.language_url);}
if(settings.theme&&typeof settings.theme!="function"&&settings.theme.charAt(0)!='-'&&!ThemeManager.urls[settings.theme]){var themeUrl=settings.theme_url;if(themeUrl){themeUrl=self.documentBaseURI.toAbsolute(themeUrl);}else{themeUrl='themes/'+settings.theme+'/theme'+suffix+'.js';}
ThemeManager.load(settings.theme,themeUrl);}
if(Tools.isArray(settings.plugins)){settings.plugins=settings.plugins.join(' ');}
each(settings.external_plugins,function(url,name){PluginManager.load(name,url);settings.plugins+=' '+name;});each(settings.plugins.split(/[ ,]/),function(plugin){plugin=trim(plugin);if(plugin&&!PluginManager.urls[plugin]){if(plugin.charAt(0)=='-'){plugin=plugin.substr(1,plugin.length);var dependencies=PluginManager.dependencies(plugin);each(dependencies,function(dep){var defaultSettings={prefix:'plugins/',resource:dep,suffix:'/plugin'+suffix+'.js'};dep=PluginManager.createUrl(defaultSettings,dep);PluginManager.load(dep.resource,dep);});}else{PluginManager.load(plugin,{prefix:'plugins/',resource:plugin,suffix:'/plugin'+suffix+'.js'});}}});scriptLoader.loadQueue(function(){if(!self.removed){self.init();}});}
self.editorManager.add(self);loadScripts();},init:function(){var self=this,settings=self.settings,elm=self.getElement();var w,h,minHeight,n,o,Theme,url,bodyId,bodyClass,re,i,initializedPlugins=[];this.editorManager.i18n.setCode(settings.language);self.rtl=settings.rtl_ui||this.editorManager.i18n.rtl;settings.aria_label=settings.aria_label||DOM.getAttrib(elm,'aria-label',self.getLang('aria.rich_text_area'));if(settings.theme){if(typeof settings.theme!="function"){settings.theme=settings.theme.replace(/-/,'');Theme=ThemeManager.get(settings.theme);self.theme=new Theme(self,ThemeManager.urls[settings.theme]);if(self.theme.init){self.theme.init(self,ThemeManager.urls[settings.theme]||self.documentBaseUrl.replace(/\/$/,''),self.$);}}else{self.theme=settings.theme;}}
function initPlugin(plugin){var Plugin=PluginManager.get(plugin),pluginUrl,pluginInstance;pluginUrl=PluginManager.urls[plugin]||self.documentBaseUrl.replace(/\/$/,'');plugin=trim(plugin);if(Plugin&&inArray(initializedPlugins,plugin)===-1){each(PluginManager.dependencies(plugin),function(dep){initPlugin(dep);});if(self.plugins[plugin]){return;}
pluginInstance=new Plugin(self,pluginUrl,self.$);self.plugins[plugin]=pluginInstance;if(pluginInstance.init){pluginInstance.init(self,pluginUrl);initializedPlugins.push(plugin);}}}
each(settings.plugins.replace(/\-/g,'').split(/[ ,]/),initPlugin);if(settings.render_ui&&self.theme){self.orgDisplay=elm.style.display;if(typeof settings.theme!="function"){w=settings.width||elm.style.width||elm.offsetWidth;h=settings.height||elm.style.height||elm.offsetHeight;minHeight=settings.min_height||100;re=/^[0-9\.]+(|px)$/i;if(re.test(''+w)){w=Math.max(parseInt(w,10),100);}
if(re.test(''+h)){h=Math.max(parseInt(h,10),minHeight);}
o=self.theme.renderUI({targetNode:elm,width:w,height:h,deltaWidth:settings.delta_width,deltaHeight:settings.delta_height});if(!settings.content_editable){h=(o.iframeHeight||h)+(typeof h=='number'?(o.deltaHeight||0):'');if(h<minHeight){h=minHeight;}}}else{o=settings.theme(self,elm);if(o.editorContainer.nodeType){o.editorContainer=o.editorContainer.id=o.editorContainer.id||self.id+"_parent";}
if(o.iframeContainer.nodeType){o.iframeContainer=o.iframeContainer.id=o.iframeContainer.id||self.id+"_iframecontainer";}
h=o.iframeHeight||elm.offsetHeight;}
self.editorContainer=o.editorContainer;}
if(settings.content_css){each(explode(settings.content_css),function(u){self.contentCSS.push(self.documentBaseURI.toAbsolute(u));});}
if(settings.content_style){self.contentStyles.push(settings.content_style);}
if(settings.content_editable){elm=n=o=null;return self.initContentBody();}
self.iframeHTML=settings.doctype+'<html><head>';if(settings.document_base_url!=self.documentBaseUrl){self.iframeHTML+='<base href="'+self.documentBaseURI.getURI()+'" />';}
if(!Env.caretAfter&&settings.ie7_compat){self.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />';}
self.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';if(!/#$/.test(document.location.href)){for(i=0;i<self.contentCSS.length;i++){var cssUrl=self.contentCSS[i];self.iframeHTML+=('<link type="text/css" '+
'rel="stylesheet" '+
'href="'+Tools._addCacheSuffix(cssUrl)+'" />');self.loadedCSS[cssUrl]=true;}}
bodyId=settings.body_id||'tinymce';if(bodyId.indexOf('=')!=-1){bodyId=self.getParam('body_id','','hash');bodyId=bodyId[self.id]||bodyId;}
bodyClass=settings.body_class||'';if(bodyClass.indexOf('=')!=-1){bodyClass=self.getParam('body_class','','hash');bodyClass=bodyClass[self.id]||'';}
if(settings.content_security_policy){self.iframeHTML+='<meta http-equiv="Content-Security-Policy" content="'+settings.content_security_policy+'" />';}
self.iframeHTML+='</head><body id="'+bodyId+
'" class="mce-content-body '+bodyClass+
'" data-id="'+self.id+'"><br></body></html>';var domainRelaxUrl='javascript:(function(){'+
'document.open();document.domain="'+document.domain+'";'+
'var ed = window.parent.tinymce.get("'+self.id+'");document.write(ed.iframeHTML);'+
'document.close();ed.initContentBody(true);})()';if(document.domain!=location.hostname){if(Env.ie&&Env.ie<12){url=domainRelaxUrl;}}
var ifr=DOM.create('iframe',{id:self.id+"_ifr",frameBorder:'0',allowTransparency:"true",title:self.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. "+
"Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:'100%',height:h,display:'block'}});ifr.onload=function(){ifr.onload=null;self.fire("load");};DOM.setAttrib(ifr,"src",url||'javascript:""');self.contentAreaContainer=o.iframeContainer;self.iframeElement=ifr;n=DOM.add(o.iframeContainer,ifr);if(ie){try{self.getDoc();}catch(e){n.src=url=domainRelaxUrl;}}
if(o.editorContainer){DOM.get(o.editorContainer).style.display=self.orgDisplay;self.hidden=DOM.isHidden(o.editorContainer);}
self.getElement().style.display='none';DOM.setAttrib(self.id,'aria-hidden',true);if(!url){self.initContentBody();}
elm=n=o=null;},initContentBody:function(skipWrite){var self=this,settings=self.settings,targetElm=self.getElement(),doc=self.getDoc(),body,contentCssText;if(!settings.inline){self.getElement().style.visibility=self.orgVisibility;}
if(!skipWrite&&!settings.content_editable){doc.open();doc.write(self.iframeHTML);doc.close();}
if(settings.content_editable){self.on('remove',function(){var bodyEl=this.getBody();DOM.removeClass(bodyEl,'mce-content-body');DOM.removeClass(bodyEl,'mce-edit-focus');DOM.setAttrib(bodyEl,'contentEditable',null);});DOM.addClass(targetElm,'mce-content-body');self.contentDocument=doc=settings.content_document||document;self.contentWindow=settings.content_window||window;self.bodyElement=targetElm;settings.content_document=settings.content_window=null;settings.root_name=targetElm.nodeName.toLowerCase();}
body=self.getBody();body.disabled=true;self.readonly=settings.readonly;if(!self.readonly){if(self.inline&&DOM.getStyle(body,'position',true)=='static'){body.style.position='relative';}
body.contentEditable=self.getParam('content_editable_state',true);}
body.disabled=false;self.editorUpload=new EditorUpload(self);self.schema=new Schema(settings);self.dom=new DOMUtils(doc,{keep_values:true,url_converter:self.convertURL,url_converter_scope:self,hex_colors:settings.force_hex_style_colors,class_filter:settings.class_filter,update_styles:true,root_element:self.inline?self.getBody():null,collect:settings.content_editable,schema:self.schema,onSetAttrib:function(e){self.fire('SetAttrib',e);}});self.parser=new DomParser(settings,self.schema);self.parser.addAttributeFilter('src,href,style,tabindex',function(nodes,name){var i=nodes.length,node,dom=self.dom,value,internalName;while(i--){node=nodes[i];value=node.attr(name);internalName='data-mce-'+name;if(!node.attributes.map[internalName]){if(value.indexOf('data:')===0||value.indexOf('blob:')===0){continue;}
if(name==="style"){value=dom.serializeStyle(dom.parseStyle(value),node.name);if(!value.length){value=null;}
node.attr(internalName,value);node.attr(name,value);}else if(name==="tabindex"){node.attr(internalName,value);node.attr(name,null);}else{node.attr(internalName,self.convertURL(value,name,node.name));}}}});self.parser.addNodeFilter('script',function(nodes){var i=nodes.length,node,type;while(i--){node=nodes[i];type=node.attr('type')||'no/type';if(type.indexOf('mce-')!==0){node.attr('type','mce-'+type);}}});self.parser.addNodeFilter('#cdata',function(nodes){var i=nodes.length,node;while(i--){node=nodes[i];node.type=8;node.name='#comment';node.value='[CDATA['+node.value+']]';}});self.parser.addNodeFilter('p,h1,h2,h3,h4,h5,h6,div',function(nodes){var i=nodes.length,node,nonEmptyElements=self.schema.getNonEmptyElements();while(i--){node=nodes[i];if(node.isEmpty(nonEmptyElements)){node.append(new Node('br',1)).shortEnded=true;}}});self.serializer=new DomSerializer(settings,self);self.selection=new Selection(self.dom,self.getWin(),self.serializer,self);self.formatter=new Formatter(self);self.undoManager=new UndoManager(self);self.forceBlocks=new ForceBlocks(self);self.enterKey=new EnterKey(self);self._nodeChangeDispatcher=new NodeChange(self);self._selectionOverrides=new SelectionOverrides(self);self.fire('PreInit');if(!settings.browser_spellcheck&&!settings.gecko_spellcheck){doc.body.spellcheck=false;DOM.setAttrib(body,"spellcheck","false");}
self.quirks=new Quirks(self);self.fire('PostRender');if(settings.directionality){body.dir=settings.directionality;}
if(settings.nowrap){body.style.whiteSpace="nowrap";}
if(settings.protect){self.on('BeforeSetContent',function(e){each(settings.protect,function(pattern){e.content=e.content.replace(pattern,function(str){return '<!--mce:protected '+escape(str)+'-->';});});});}
self.on('SetContent',function(){self.addVisual(self.getBody());});if(settings.padd_empty_editor){self.on('PostProcess',function(e){e.content=e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,'');});}
self.load({initial:true,format:'html'});self.startContent=self.getContent({format:'raw'});self.initialized=true;self.bindPendingEventDelegates();self.fire('init');self.focus(true);self.nodeChanged({initial:true});self.execCallback('init_instance_callback',self);self.on('compositionstart compositionend',function(e){self.composing=e.type==='compositionstart';});if(self.contentStyles.length>0){contentCssText='';each(self.contentStyles,function(style){contentCssText+=style+"\r\n";});self.dom.addStyle(contentCssText);}
each(self.contentCSS,function(cssUrl){if(!self.loadedCSS[cssUrl]){self.dom.loadCSS(cssUrl);self.loadedCSS[cssUrl]=true;}});if(settings.auto_focus){Delay.setEditorTimeout(self,function(){var editor;if(settings.auto_focus===true){editor=self;}else{editor=self.editorManager.get(settings.auto_focus);}
if(!editor.destroyed){editor.focus();}},100);}
targetElm=doc=body=null;},focus:function(skipFocus){var self=this,selection=self.selection,contentEditable=self.settings.content_editable,rng;var controlElm,doc=self.getDoc(),body=self.getBody(),contentEditableHost;function getContentEditableHost(node){return self.dom.getParent(node,function(node){return self.dom.getContentEditable(node)==="true";});}
if(!skipFocus){rng=selection.getRng();if(rng.item){controlElm=rng.item(0);}
self.quirks.refreshContentEditable();contentEditableHost=getContentEditableHost(selection.getNode());if(self.$.contains(body,contentEditableHost)){contentEditableHost.focus();selection.normalize();self.editorManager.setActive(self);return;}
if(!contentEditable){if(!Env.opera){self.getBody().focus();}
self.getWin().focus();}
if(isGecko||contentEditable){if(body.setActive){try{body.setActive();}catch(ex){body.focus();}}else{body.focus();}
if(contentEditable){selection.normalize();}}
if(controlElm&&controlElm.ownerDocument==doc){rng=doc.body.createControlRange();rng.addElement(controlElm);rng.select();}}
self.editorManager.setActive(self);},execCallback:function(name){var self=this,callback=self.settings[name],scope;if(!callback){return;}
if(self.callbackLookup&&(scope=self.callbackLookup[name])){callback=scope.func;scope=scope.scope;}
if(typeof callback==='string'){scope=callback.replace(/\.\w+$/,'');scope=scope?resolve(scope):0;callback=resolve(callback);self.callbackLookup=self.callbackLookup||{};self.callbackLookup[name]={func:callback,scope:scope};}
return callback.apply(scope||self,Array.prototype.slice.call(arguments,1));},translate:function(text){var lang=this.settings.language||'en',i18n=this.editorManager.i18n;if(!text){return '';}
text=i18n.data[lang+'.'+text]||text.replace(/\{\#([^\}]+)\}/g,function(a,b){return i18n.data[lang+'.'+b]||'{#'+b+'}';});return this.editorManager.translate(text);},getLang:function(name,defaultVal){return(this.editorManager.i18n.data[(this.settings.language||'en')+'.'+name]||(defaultVal!==undefined?defaultVal:'{#'+name+'}'));},getParam:function(name,defaultVal,type){var value=name in this.settings?this.settings[name]:defaultVal,output;if(type==='hash'){output={};if(typeof value==='string'){each(value.indexOf('=')>0?value.split(/[;,](?![^=;,]*(?:[;,]|$))/):value.split(','),function(value){value=value.split('=');if(value.length>1){output[trim(value[0])]=trim(value[1]);}else{output[trim(value[0])]=trim(value);}});}else{output=value;}
return output;}
return value;},nodeChanged:function(args){this._nodeChangeDispatcher.nodeChanged(args);},addButton:function(name,settings){var self=this;if(settings.cmd){settings.onclick=function(){self.execCommand(settings.cmd);};}
if(!settings.text&&!settings.icon){settings.icon=name;}
self.buttons=self.buttons||{};settings.tooltip=settings.tooltip||settings.title;self.buttons[name]=settings;},addMenuItem:function(name,settings){var self=this;if(settings.cmd){settings.onclick=function(){self.execCommand(settings.cmd);};}
self.menuItems=self.menuItems||{};self.menuItems[name]=settings;},addContextToolbar:function(predicate,items){var self=this,selector;self.contextToolbars=self.contextToolbars||[];if(typeof predicate=="string"){selector=predicate;predicate=function(elm){return self.dom.is(elm,selector);};}
self.contextToolbars.push({predicate:predicate,items:items});},addCommand:function(name,callback,scope){this.editorCommands.addCommand(name,callback,scope);},addQueryStateHandler:function(name,callback,scope){this.editorCommands.addQueryStateHandler(name,callback,scope);},addQueryValueHandler:function(name,callback,scope){this.editorCommands.addQueryValueHandler(name,callback,scope);},addShortcut:function(pattern,desc,cmdFunc,scope){this.shortcuts.add(pattern,desc,cmdFunc,scope);},execCommand:function(cmd,ui,value,args){return this.editorCommands.execCommand(cmd,ui,value,args);},queryCommandState:function(cmd){return this.editorCommands.queryCommandState(cmd);},queryCommandValue:function(cmd){return this.editorCommands.queryCommandValue(cmd);},queryCommandSupported:function(cmd){return this.editorCommands.queryCommandSupported(cmd);},show:function(){var self=this;if(self.hidden){self.hidden=false;if(self.inline){self.getBody().contentEditable=true;}else{DOM.show(self.getContainer());DOM.hide(self.id);}
self.load();self.fire('show');}},hide:function(){var self=this,doc=self.getDoc();if(!self.hidden){if(ie&&doc&&!self.inline){doc.execCommand('SelectAll');}
self.save();if(self.inline){self.getBody().contentEditable=false;if(self==self.editorManager.focusedEditor){self.editorManager.focusedEditor=null;}}else{DOM.hide(self.getContainer());DOM.setStyle(self.id,'display',self.orgDisplay);}
self.hidden=true;self.fire('hide');}},isHidden:function(){return!!this.hidden;},setProgressState:function(state,time){this.fire('ProgressState',{state:state,time:time});},load:function(args){var self=this,elm=self.getElement(),html;if(elm){args=args||{};args.load=true;html=self.setContent(elm.value!==undefined?elm.value:elm.innerHTML,args);args.element=elm;if(!args.no_events){self.fire('LoadContent',args);}
args.element=elm=null;return html;}},save:function(args){var self=this,elm=self.getElement(),html,form;if(!elm||!self.initialized){return;}
args=args||{};args.save=true;args.element=elm;html=args.content=self.getContent(args);if(!args.no_events){self.fire('SaveContent',args);}
if(args.format=='raw'){self.fire('RawSaveContent',args);}
html=args.content;if(!/TEXTAREA|INPUT/i.test(elm.nodeName)){if(!self.inline){elm.innerHTML=html;}
if((form=DOM.getParent(self.id,'form'))){each(form.elements,function(elm){if(elm.name==self.id){elm.value=html;return false;}});}}else{elm.value=html;}
args.element=elm=null;if(args.set_dirty!==false){self.setDirty(false);}
return html;},setContent:function(content,args){var self=this,body=self.getBody(),forcedRootBlockName,padd;args=args||{};args.format=args.format||'html';args.set=true;args.content=content;if(!args.no_events){self.fire('BeforeSetContent',args);}
content=args.content;if(content.length===0||/^\s+$/.test(content)){padd=ie&&ie<11?'':'<br data-mce-bogus="1">';if(body.nodeName=='TABLE'){content='<tr><td>'+padd+'</td></tr>';}else if(/^(UL|OL)$/.test(body.nodeName)){content='<li>'+padd+'</li>';}
forcedRootBlockName=self.settings.forced_root_block;if(forcedRootBlockName&&self.schema.isValidChild(body.nodeName.toLowerCase(),forcedRootBlockName.toLowerCase())){content=padd;content=self.dom.createHTML(forcedRootBlockName,self.settings.forced_root_block_attrs,content);}else if(!ie&&!content){content='<br data-mce-bogus="1">';}
self.dom.setHTML(body,content);self.fire('SetContent',args);}else{if(args.format!=='raw'){content=new Serializer({validate:self.validate},self.schema).serialize(self.parser.parse(content,{isRootContent:true}));}
args.content=trim(content);self.dom.setHTML(body,args.content);if(!args.no_events){self.fire('SetContent',args);}}
return args.content;},getContent:function(args){var self=this,content,body=self.getBody();args=args||{};args.format=args.format||'html';args.get=true;args.getInner=true;if(!args.no_events){self.fire('BeforeGetContent',args);}
if(args.format=='raw'){content=self.serializer.getTrimmedContent();}else if(args.format=='text'){content=body.innerText||body.textContent;}else{content=self.serializer.serialize(body,args);}
if(args.format!='text'){args.content=trim(content);}else{args.content=content;}
if(!args.no_events){self.fire('GetContent',args);}
return args.content;},insertContent:function(content,args){if(args){content=extend({content:content},args);}
this.execCommand('mceInsertContent',false,content);},isDirty:function(){return!this.isNotDirty;},setDirty:function(state){var oldState=!this.isNotDirty;this.isNotDirty=!state;if(state&&state!=oldState){this.fire('dirty');}},setMode:function(mode){Mode.setMode(this,mode);},getContainer:function(){var self=this;if(!self.container){self.container=DOM.get(self.editorContainer||self.id+'_parent');}
return self.container;},getContentAreaContainer:function(){return this.contentAreaContainer;},getElement:function(){if(!this.targetElm){this.targetElm=DOM.get(this.id);}
return this.targetElm;},getWin:function(){var self=this,elm;if(!self.contentWindow){elm=self.iframeElement;if(elm){self.contentWindow=elm.contentWindow;}}
return self.contentWindow;},getDoc:function(){var self=this,win;if(!self.contentDocument){win=self.getWin();if(win){self.contentDocument=win.document;}}
return self.contentDocument;},getBody:function(){return this.bodyElement||this.getDoc().body;},convertURL:function(url,name,elm){var self=this,settings=self.settings;if(settings.urlconverter_callback){return self.execCallback('urlconverter_callback',url,elm,true,name);}
if(!settings.convert_urls||(elm&&elm.nodeName=='LINK')||url.indexOf('file:')===0||url.length===0){return url;}
if(settings.relative_urls){return self.documentBaseURI.toRelative(url);}
url=self.documentBaseURI.toAbsolute(url,settings.remove_script_host);return url;},addVisual:function(elm){var self=this,settings=self.settings,dom=self.dom,cls;elm=elm||self.getBody();if(self.hasVisual===undefined){self.hasVisual=settings.visual;}
each(dom.select('table,a',elm),function(elm){var value;switch(elm.nodeName){case 'TABLE':cls=settings.visual_table_class||'mce-item-table';value=dom.getAttrib(elm,'border');if((!value||value=='0')&&self.hasVisual){dom.addClass(elm,cls);}else{dom.removeClass(elm,cls);}
return;case 'A':if(!dom.getAttrib(elm,'href',false)){value=dom.getAttrib(elm,'name')||elm.id;cls=settings.visual_anchor_class||'mce-item-anchor';if(value&&self.hasVisual){dom.addClass(elm,cls);}else{dom.removeClass(elm,cls);}}
return;}});self.fire('VisualAid',{element:elm,hasVisual:self.hasVisual});},remove:function(){var self=this;if(!self.removed){self.save();self.removed=1;self.unbindAllNativeEvents();if(self.hasHiddenInput){DOM.remove(self.getElement().nextSibling);}
if(!self.inline){if(ie&&ie<10){self.getDoc().execCommand('SelectAll',false,null);}
DOM.setStyle(self.id,'display',self.orgDisplay);self.getBody().onload=null;}
self.fire('remove');self.editorManager.remove(self);DOM.remove(self.getContainer());self._selectionOverrides.destroy();self.editorUpload.destroy();self.destroy();}},destroy:function(automatic){var self=this,form;if(self.destroyed){return;}
if(!automatic&&!self.removed){self.remove();return;}
if(!automatic){self.editorManager.off('beforeunload',self._beforeUnload);if(self.theme&&self.theme.destroy){self.theme.destroy();}
self.selection.destroy();self.dom.destroy();}
form=self.formElement;if(form){if(form._mceOldSubmit){form.submit=form._mceOldSubmit;form._mceOldSubmit=null;}
DOM.unbind(form,'submit reset',self.formEventDelegate);}
self.contentAreaContainer=self.formElement=self.container=self.editorContainer=null;self.bodyElement=self.contentDocument=self.contentWindow=null;self.iframeElement=self.targetElm=null;if(self.selection){self.selection=self.selection.win=self.selection.dom=self.selection.dom.doc=null;}
self.destroyed=1;},uploadImages:function(callback){return this.editorUpload.uploadImages(callback);},_scanForImages:function(){return this.editorUpload.scanForImages();}};extend(Editor.prototype,EditorObservable);return Editor;});define("tinymce/util/I18n",[],function(){"use strict";var data={},code="en";return{setCode:function(newCode){if(newCode){code=newCode;this.rtl=this.data[newCode]?this.data[newCode]._dir==='rtl':false;}},getCode:function(){return code;},rtl:false,add:function(code,items){var langData=data[code];if(!langData){data[code]=langData={};}
for(var name in items){langData[name]=items[name];}
this.setCode(code);},translate:function(text){var langData;langData=data[code];if(!langData){langData={};}
if(typeof text=="undefined"){return text;}
if(typeof text!="string"&&text.raw){return text.raw;}
if(text.push){var values=text.slice(1);text=(langData[text[0]]||text[0]).replace(/\{([0-9]+)\}/g,function(match1,match2){return values[match2];});}
return(langData[text]||text).replace(/{context:\w+}$/,'');},data:data};});define("tinymce/FocusManager",["tinymce/dom/DOMUtils","tinymce/util/Delay","tinymce/Env"],function(DOMUtils,Delay,Env){var selectionChangeHandler,documentFocusInHandler,documentMouseUpHandler,DOM=DOMUtils.DOM;function FocusManager(editorManager){function getActiveElement(){try{return document.activeElement;}catch(ex){return document.body;}}
function createBookmark(dom,rng){if(rng&&rng.startContainer){if(!dom.isChildOf(rng.startContainer,dom.getRoot())||!dom.isChildOf(rng.endContainer,dom.getRoot())){return;}
return{startContainer:rng.startContainer,startOffset:rng.startOffset,endContainer:rng.endContainer,endOffset:rng.endOffset};}
return rng;}
function bookmarkToRng(editor,bookmark){var rng;if(bookmark.startContainer){rng=editor.getDoc().createRange();rng.setStart(bookmark.startContainer,bookmark.startOffset);rng.setEnd(bookmark.endContainer,bookmark.endOffset);}else{rng=bookmark;}
return rng;}
function isUIElement(elm){return!!DOM.getParent(elm,FocusManager.isEditorUIElement);}
function registerEvents(e){var editor=e.editor;editor.on('init',function(){if(editor.inline||Env.ie){if("onbeforedeactivate"in document&&Env.ie<9){editor.dom.bind(editor.getBody(),'beforedeactivate',function(e){if(e.target!=editor.getBody()){return;}
try{editor.lastRng=editor.selection.getRng();}catch(ex){}});}else{editor.on('nodechange mouseup keyup',function(e){var node=getActiveElement();if(e.type=='nodechange'&&e.selectionChange){return;}
if(node&&node.id==editor.id+'_ifr'){node=editor.getBody();}
if(editor.dom.isChildOf(node,editor.getBody())){editor.lastRng=editor.selection.getRng();}});}
if(Env.webkit&&!selectionChangeHandler){selectionChangeHandler=function(){var activeEditor=editorManager.activeEditor;if(activeEditor&&activeEditor.selection){var rng=activeEditor.selection.getRng();if(rng&&!rng.collapsed){editor.lastRng=rng;}}};DOM.bind(document,'selectionchange',selectionChangeHandler);}}});editor.on('setcontent',function(){editor.lastRng=null;});editor.on('mousedown',function(){editor.selection.lastFocusBookmark=null;});editor.on('focusin',function(){var focusedEditor=editorManager.focusedEditor,lastRng;if(editor.selection.lastFocusBookmark){lastRng=bookmarkToRng(editor,editor.selection.lastFocusBookmark);editor.selection.lastFocusBookmark=null;editor.selection.setRng(lastRng);}
if(focusedEditor!=editor){if(focusedEditor){focusedEditor.fire('blur',{focusedEditor:editor});}
editorManager.setActive(editor);editorManager.focusedEditor=editor;editor.fire('focus',{blurredEditor:focusedEditor});editor.focus(true);}
editor.lastRng=null;});editor.on('focusout',function(){Delay.setEditorTimeout(editor,function(){var focusedEditor=editorManager.focusedEditor;if(!isUIElement(getActiveElement())&&focusedEditor==editor){editor.fire('blur',{focusedEditor:null});editorManager.focusedEditor=null;if(editor.selection){editor.selection.lastFocusBookmark=null;}}});});if(!documentFocusInHandler){documentFocusInHandler=function(e){var activeEditor=editorManager.activeEditor,target;target=e.target;if(activeEditor&&target.ownerDocument==document){if(activeEditor.selection&&target!=activeEditor.getBody()){activeEditor.selection.lastFocusBookmark=createBookmark(activeEditor.dom,activeEditor.lastRng);}
if(target!=document.body&&!isUIElement(target)&&editorManager.focusedEditor==activeEditor){activeEditor.fire('blur',{focusedEditor:null});editorManager.focusedEditor=null;}}};DOM.bind(document,'focusin',documentFocusInHandler);}
if(editor.inline&&!documentMouseUpHandler){documentMouseUpHandler=function(e){var activeEditor=editorManager.activeEditor;if(activeEditor.inline&&!activeEditor.dom.isChildOf(e.target,activeEditor.getBody())){var rng=activeEditor.selection.getRng();if(!rng.collapsed){activeEditor.lastRng=rng;}}};DOM.bind(document,'mouseup',documentMouseUpHandler);}}
function unregisterDocumentEvents(e){if(editorManager.focusedEditor==e.editor){editorManager.focusedEditor=null;}
if(!editorManager.activeEditor){DOM.unbind(document,'selectionchange',selectionChangeHandler);DOM.unbind(document,'focusin',documentFocusInHandler);DOM.unbind(document,'mouseup',documentMouseUpHandler);selectionChangeHandler=documentFocusInHandler=documentMouseUpHandler=null;}}
editorManager.on('AddEditor',registerEvents);editorManager.on('RemoveEditor',unregisterDocumentEvents);}
FocusManager.isEditorUIElement=function(elm){return elm.className.toString().indexOf('mce-')!==-1;};return FocusManager;});define("tinymce/EditorManager",["tinymce/Editor","tinymce/dom/DomQuery","tinymce/dom/DOMUtils","tinymce/util/URI","tinymce/Env","tinymce/util/Tools","tinymce/util/Promise","tinymce/util/Observable","tinymce/util/I18n","tinymce/FocusManager"],function(Editor,$,DOMUtils,URI,Env,Tools,Promise,Observable,I18n,FocusManager){var DOM=DOMUtils.DOM;var explode=Tools.explode,each=Tools.each,extend=Tools.extend;var instanceCounter=0,beforeUnloadDelegate,EditorManager,boundGlobalEvents=false;function globalEventDelegate(e){each(EditorManager.editors,function(editor){if(e.type==='scroll'){editor.fire('ScrollWindow',e);}else{editor.fire('ResizeWindow',e);}});}
function toggleGlobalEvents(editors,state){if(state!==boundGlobalEvents){if(state){$(window).on('resize scroll',globalEventDelegate);}else{$(window).off('resize scroll',globalEventDelegate);}
boundGlobalEvents=state;}}
function removeEditorFromList(editor){var editors=EditorManager.editors,removedFromList;delete editors[editor.id];for(var i=0;i<editors.length;i++){if(editors[i]==editor){editors.splice(i,1);removedFromList=true;break;}}
if(EditorManager.activeEditor==editor){EditorManager.activeEditor=editors[0];}
if(EditorManager.focusedEditor==editor){EditorManager.focusedEditor=null;}
return removedFromList;}
function purgeDestroyedEditor(editor){if(editor&&editor.initialized&&!(editor.getContainer()||editor.getBody()).parentNode){removeEditorFromList(editor);editor.unbindAllNativeEvents();editor.destroy(true);editor.removed=true;editor=null;}
return editor;}
EditorManager={$:$,majorVersion:'4',minorVersion:'3.13',releaseDate:'2016-06-08',editors:[],i18n:I18n,activeEditor:null,setup:function(){var self=this,baseURL,documentBaseURL,suffix="",preInit,src;documentBaseURL=URI.getDocumentBaseUrl(document.location);if(/^[^:]+:\/\/\/?[^\/]+\//.test(documentBaseURL)){documentBaseURL=documentBaseURL.replace(/[\?#].*$/,'').replace(/[\/\\][^\/]+$/,'');if(!/[\/\\]$/.test(documentBaseURL)){documentBaseURL+='/';}}
preInit=window.tinymce||window.tinyMCEPreInit;if(preInit){baseURL=preInit.base||preInit.baseURL;suffix=preInit.suffix;}else{var scripts=document.getElementsByTagName('script');for(var i=0;i<scripts.length;i++){src=scripts[i].src;var srcScript=src.substring(src.lastIndexOf('/'));if(/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(src)){if(srcScript.indexOf('.min')!=-1){suffix='.min';}
baseURL=src.substring(0,src.lastIndexOf('/'));break;}}
if(!baseURL&&document.currentScript){src=document.currentScript.src;if(src.indexOf('.min')!=-1){suffix='.min';}
baseURL=src.substring(0,src.lastIndexOf('/'));}}
self.baseURL=new URI(documentBaseURL).toAbsolute(baseURL);self.documentBaseURL=documentBaseURL;self.baseURI=new URI(self.baseURL);self.suffix=suffix;self.focusManager=new FocusManager(self);},overrideDefaults:function(defaultSettings){var baseUrl,suffix;baseUrl=defaultSettings.base_url;if(baseUrl){this.baseURL=new URI(this.documentBaseURL).toAbsolute(baseUrl.replace(/\/+$/,''));this.baseURI=new URI(this.baseURL);}
suffix=defaultSettings.suffix;if(defaultSettings.suffix){this.suffix=suffix;}
this.defaultSettings=defaultSettings;},init:function(settings){var self=this,result;function createId(elm){var id=elm.id;if(!id){id=elm.name;if(id&&!DOM.get(id)){id=elm.name;}else{id=DOM.uniqueId();}
elm.setAttribute('id',id);}
return id;}
function execCallback(name){var callback=settings[name];if(!callback){return;}
return callback.apply(self,Array.prototype.slice.call(arguments,2));}
function hasClass(elm,className){return className.constructor===RegExp?className.test(elm.className):DOM.hasClass(elm,className);}
function findTargets(settings){var l,targets=[];if(settings.types){each(settings.types,function(type){targets=targets.concat(DOM.select(type.selector));});return targets;}else if(settings.selector){return DOM.select(settings.selector);}else if(settings.target){return[settings.target];}
switch(settings.mode){case "exact":l=settings.elements||'';if(l.length>0){each(explode(l),function(id){var elm;if((elm=DOM.get(id))){targets.push(elm);}else{each(document.forms,function(f){each(f.elements,function(e){if(e.name===id){id='mce_editor_'+instanceCounter++;DOM.setAttrib(e,'id',id);targets.push(e);}});});}});}
break;case "textareas":case "specific_textareas":each(DOM.select('textarea'),function(elm){if(settings.editor_deselector&&hasClass(elm,settings.editor_deselector)){return;}
if(!settings.editor_selector||hasClass(elm,settings.editor_selector)){targets.push(elm);}});break;}
return targets;}
var provideResults=function(editors){result=editors;};function initEditors(){var initCount=0,editors=[],targets;function createEditor(id,settings,targetElm){var editor=new Editor(id,settings,self);editors.push(editor);editor.on('init',function(){if(++initCount===targets.length){provideResults(editors);}});editor.targetElm=editor.targetElm||targetElm;editor.render();}
DOM.unbind(window,'ready',initEditors);execCallback('onpageload');targets=$.unique(findTargets(settings));if(settings.types){each(settings.types,function(type){Tools.each(targets,function(elm){if(DOM.is(elm,type.selector)){createEditor(createId(elm),extend({},settings,type),elm);return false;}
return true;});});return;}
Tools.each(targets,function(elm){purgeDestroyedEditor(self.get(elm.id));});targets=Tools.grep(targets,function(elm){return!self.get(elm.id);});each(targets,function(elm){createEditor(createId(elm),settings,elm);});}
self.settings=settings;DOM.bind(window,'ready',initEditors);return new Promise(function(resolve){if(result){resolve(result);}else{provideResults=function(editors){resolve(editors);};}});},get:function(id){if(!arguments.length){return this.editors;}
return id in this.editors?this.editors[id]:null;},add:function(editor){var self=this,editors=self.editors;editors[editor.id]=editor;editors.push(editor);toggleGlobalEvents(editors,true);self.activeEditor=editor;self.fire('AddEditor',{editor:editor});if(!beforeUnloadDelegate){beforeUnloadDelegate=function(){self.fire('BeforeUnload');};DOM.bind(window,'beforeunload',beforeUnloadDelegate);}
return editor;},createEditor:function(id,settings){return this.add(new Editor(id,settings,this));},remove:function(selector){var self=this,i,editors=self.editors,editor;if(!selector){for(i=editors.length-1;i>=0;i--){self.remove(editors[i]);}
return;}
if(typeof selector=="string"){selector=selector.selector||selector;each(DOM.select(selector),function(elm){editor=editors[elm.id];if(editor){self.remove(editor);}});return;}
editor=selector;if(!editors[editor.id]){return null;}
if(removeEditorFromList(editor)){self.fire('RemoveEditor',{editor:editor});}
if(!editors.length){DOM.unbind(window,'beforeunload',beforeUnloadDelegate);}
editor.remove();toggleGlobalEvents(editors,editors.length>0);return editor;},execCommand:function(cmd,ui,value){var self=this,editor=self.get(value);switch(cmd){case "mceAddEditor":if(!self.get(value)){new Editor(value,self.settings,self).render();}
return true;case "mceRemoveEditor":if(editor){editor.remove();}
return true;case 'mceToggleEditor':if(!editor){self.execCommand('mceAddEditor',0,value);return true;}
if(editor.isHidden()){editor.show();}else{editor.hide();}
return true;}
if(self.activeEditor){return self.activeEditor.execCommand(cmd,ui,value);}
return false;},triggerSave:function(){each(this.editors,function(editor){editor.save();});},addI18n:function(code,items){I18n.add(code,items);},translate:function(text){return I18n.translate(text);},setActive:function(editor){var activeEditor=this.activeEditor;if(this.activeEditor!=editor){if(activeEditor){activeEditor.fire('deactivate',{relatedTarget:editor});}
editor.fire('activate',{relatedTarget:activeEditor});}
this.activeEditor=editor;}};extend(EditorManager,Observable);EditorManager.setup();window.tinymce=window.tinyMCE=EditorManager;return EditorManager;});define("tinymce/LegacyInput",["tinymce/EditorManager","tinymce/util/Tools"],function(EditorManager,Tools){var each=Tools.each,explode=Tools.explode;EditorManager.on('AddEditor',function(e){var editor=e.editor;editor.on('preInit',function(){var filters,fontSizes,dom,settings=editor.settings;function replaceWithSpan(node,styles){each(styles,function(value,name){if(value){dom.setStyle(node,name,value);}});dom.rename(node,'span');}
function convert(e){dom=editor.dom;if(settings.convert_fonts_to_spans){each(dom.select('font,u,strike',e.node),function(node){filters[node.nodeName.toLowerCase()](dom,node);});}}
if(settings.inline_styles){fontSizes=explode(settings.font_size_legacy_values);filters={font:function(dom,node){replaceWithSpan(node,{backgroundColor:node.style.backgroundColor,color:node.color,fontFamily:node.face,fontSize:fontSizes[parseInt(node.size,10)-1]});},u:function(dom,node){if(editor.settings.schema==="html4"){replaceWithSpan(node,{textDecoration:'underline'});}},strike:function(dom,node){replaceWithSpan(node,{textDecoration:'line-through'});}};editor.on('PreProcess SetContent',convert);}});});});define("tinymce/util/XHR",["tinymce/util/Observable","tinymce/util/Tools"],function(Observable,Tools){var XHR={send:function(settings){var xhr,count=0;function ready(){if(!settings.async||xhr.readyState==4||count++>10000){if(settings.success&&count<10000&&xhr.status==200){settings.success.call(settings.success_scope,''+xhr.responseText,xhr,settings);}else if(settings.error){settings.error.call(settings.error_scope,count>10000?'TIMED_OUT':'GENERAL',xhr,settings);}
xhr=null;}else{setTimeout(ready,10);}}
settings.scope=settings.scope||this;settings.success_scope=settings.success_scope||settings.scope;settings.error_scope=settings.error_scope||settings.scope;settings.async=settings.async===false?false:true;settings.data=settings.data||'';XHR.fire('beforeInitialize',{settings:settings});xhr=new XMLHttpRequest();if(xhr){if(xhr.overrideMimeType){xhr.overrideMimeType(settings.content_type);}
xhr.open(settings.type||(settings.data?'POST':'GET'),settings.url,settings.async);if(settings.crossDomain){xhr.withCredentials=true;}
if(settings.content_type){xhr.setRequestHeader('Content-Type',settings.content_type);}
if(settings.requestheaders){Tools.each(settings.requestheaders,function(header){xhr.setRequestHeader(header.key,header.value);});}
xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');xhr=XHR.fire('beforeSend',{xhr:xhr,settings:settings}).xhr;xhr.send(settings.data);if(!settings.async){return ready();}
setTimeout(ready,10);}}};Tools.extend(XHR,Observable);return XHR;});define("tinymce/util/JSON",[],function(){function serialize(o,quote){var i,v,t,name;quote=quote||'"';if(o===null){return 'null';}
t=typeof o;if(t=='string'){v='\bb\tt\nn\ff\rr\""\'\'\\\\';return quote+o.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(a,b){if(quote==='"'&&a==="'"){return a;}
i=v.indexOf(b);if(i+1){return '\\'+v.charAt(i+1);}
a=b.charCodeAt().toString(16);return '\\u'+'0000'.substring(a.length)+a;})+quote;}
if(t=='object'){if(o.hasOwnProperty&&Object.prototype.toString.call(o)==='[object Array]'){for(i=0,v='[';i<o.length;i++){v+=(i>0?',':'')+serialize(o[i],quote);}
return v+']';}
v='{';for(name in o){if(o.hasOwnProperty(name)){v+=typeof o[name]!='function'?(v.length>1?','+quote:quote)+name+
quote+':'+serialize(o[name],quote):'';}}
return v+'}';}
return ''+o;}
return{serialize:serialize,parse:function(text){try{return window[String.fromCharCode(101)+'val']('('+text+')');}catch(ex){}}};});define("tinymce/util/JSONRequest",["tinymce/util/JSON","tinymce/util/XHR","tinymce/util/Tools"],function(JSON,XHR,Tools){var extend=Tools.extend;function JSONRequest(settings){this.settings=extend({},settings);this.count=0;}
JSONRequest.sendRPC=function(o){return new JSONRequest().send(o);};JSONRequest.prototype={send:function(args){var ecb=args.error,scb=args.success;args=extend(this.settings,args);args.success=function(c,x){c=JSON.parse(c);if(typeof c=='undefined'){c={error:'JSON Parse error.'};}
if(c.error){ecb.call(args.error_scope||args.scope,c.error,x);}else{scb.call(args.success_scope||args.scope,c.result);}};args.error=function(ty,x){if(ecb){ecb.call(args.error_scope||args.scope,ty,x);}};args.data=JSON.serialize({id:args.id||'c'+(this.count++),method:args.method,params:args.params});args.content_type='application/json';XHR.send(args);}};return JSONRequest;});define("tinymce/util/JSONP",["tinymce/dom/DOMUtils"],function(DOMUtils){return{callbacks:{},count:0,send:function(settings){var self=this,dom=DOMUtils.DOM,count=settings.count!==undefined?settings.count:self.count;var id='tinymce_jsonp_'+count;self.callbacks[count]=function(json){dom.remove(id);delete self.callbacks[count];settings.callback(json);};dom.add(dom.doc.body,'script',{id:id,src:settings.url,type:'text/javascript'});self.count++;}};});define("tinymce/util/LocalStorage",[],function(){var LocalStorage,storageElm,items,keys,userDataKey,hasOldIEDataSupport;try{if(window.localStorage){return localStorage;}}catch(ex){}
userDataKey="tinymce";storageElm=document.documentElement;hasOldIEDataSupport=!!storageElm.addBehavior;if(hasOldIEDataSupport){storageElm.addBehavior('#default#userData');}
function updateKeys(){keys=[];for(var key in items){keys.push(key);}
LocalStorage.length=keys.length;}
function load(){var key,data,value,pos=0;items={};if(!hasOldIEDataSupport){return;}
function next(end){var value,nextPos;nextPos=end!==undefined?pos+end:data.indexOf(',',pos);if(nextPos===-1||nextPos>data.length){return null;}
value=data.substring(pos,nextPos);pos=nextPos+1;return value;}
storageElm.load(userDataKey);data=storageElm.getAttribute(userDataKey)||'';do{var offset=next();if(offset===null){break;}
key=next(parseInt(offset,32)||0);if(key!==null){offset=next();if(offset===null){break;}
value=next(parseInt(offset,32)||0);if(key){items[key]=value;}}}while(key!==null);updateKeys();}
function save(){var value,data='';if(!hasOldIEDataSupport){return;}
for(var key in items){value=items[key];data+=(data?',':'')+key.length.toString(32)+','+key+','+value.length.toString(32)+','+value;}
storageElm.setAttribute(userDataKey,data);try{storageElm.save(userDataKey);}catch(ex){}
updateKeys();}
LocalStorage={key:function(index){return keys[index];},getItem:function(key){return key in items?items[key]:null;},setItem:function(key,value){items[key]=""+value;save();},removeItem:function(key){delete items[key];save();},clear:function(){items={};save();}};load();return LocalStorage;});define("tinymce/Compat",["tinymce/dom/DOMUtils","tinymce/dom/EventUtils","tinymce/dom/ScriptLoader","tinymce/AddOnManager","tinymce/util/Tools","tinymce/Env"],function(DOMUtils,EventUtils,ScriptLoader,AddOnManager,Tools,Env){var tinymce=window.tinymce;tinymce.DOM=DOMUtils.DOM;tinymce.ScriptLoader=ScriptLoader.ScriptLoader;tinymce.PluginManager=AddOnManager.PluginManager;tinymce.ThemeManager=AddOnManager.ThemeManager;tinymce.dom=tinymce.dom||{};tinymce.dom.Event=EventUtils.Event;Tools.each(Tools,function(func,key){tinymce[key]=func;});Tools.each('isOpera isWebKit isIE isGecko isMac'.split(' '),function(name){tinymce[name]=Env[name.substr(2).toLowerCase()];});return{};});define("tinymce/ui/Layout",["tinymce/util/Class","tinymce/util/Tools"],function(Class,Tools){"use strict";return Class.extend({Defaults:{firstControlClass:'first',lastControlClass:'last'},init:function(settings){this.settings=Tools.extend({},this.Defaults,settings);},preRender:function(container){container.bodyClasses.add(this.settings.containerClass);},applyClasses:function(items){var self=this,settings=self.settings,firstClass,lastClass,firstItem,lastItem;firstClass=settings.firstControlClass;lastClass=settings.lastControlClass;items.each(function(item){item.classes.remove(firstClass).remove(lastClass).add(settings.controlClass);if(item.visible()){if(!firstItem){firstItem=item;}
lastItem=item;}});if(firstItem){firstItem.classes.add(firstClass);}
if(lastItem){lastItem.classes.add(lastClass);}},renderHtml:function(container){var self=this,html='';self.applyClasses(container.items());container.items().each(function(item){html+=item.renderHtml();});return html;},recalc:function(){},postRender:function(){},isNative:function(){return false;}});});define("tinymce/ui/AbsoluteLayout",["tinymce/ui/Layout"],function(Layout){"use strict";return Layout.extend({Defaults:{containerClass:'abs-layout',controlClass:'abs-layout-item'},recalc:function(container){container.items().filter(':visible').each(function(ctrl){var settings=ctrl.settings;ctrl.layoutRect({x:settings.x,y:settings.y,w:settings.w,h:settings.h});if(ctrl.recalc){ctrl.recalc();}});},renderHtml:function(container){return '<div id="'+container._id+'-absend" class="'+container.classPrefix+'abs-end"></div>'+this._super(container);}});});define("tinymce/ui/Button",["tinymce/ui/Widget"],function(Widget){"use strict";return Widget.extend({Defaults:{classes:"widget btn",role:"button"},init:function(settings){var self=this,size;self._super(settings);settings=self.settings;size=self.settings.size;self.on('click mousedown',function(e){e.preventDefault();});self.on('touchstart',function(e){self.fire('click',e);e.preventDefault();});if(settings.subtype){self.classes.add(settings.subtype);}
if(size){self.classes.add('btn-'+size);}
if(settings.icon){self.icon(settings.icon);}},icon:function(icon){if(!arguments.length){return this.state.get('icon');}
this.state.set('icon',icon);return this;},repaint:function(){var btnElm=this.getEl().firstChild,btnStyle;if(btnElm){btnStyle=btnElm.style;btnStyle.width=btnStyle.height="100%";}
this._super();},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix;var icon=self.state.get('icon'),image,text=self.state.get('text'),textHtml='';image=self.settings.image;if(image){icon='none';if(typeof image!="string"){image=window.getSelection?image[0]:image[1];}
image=' style="background-image: url(\''+image+'\')"';}else{image='';}
if(text){self.classes.add('btn-has-text');textHtml='<span class="'+prefix+'txt">'+self.encode(text)+'</span>';}
icon=self.settings.icon?prefix+'ico '+prefix+'i-'+icon:'';return('<div id="'+id+'" class="'+self.classes+'" tabindex="-1" aria-labelledby="'+id+'">'+
'<button role="presentation" type="button" tabindex="-1">'+
(icon?'<i class="'+icon+'"'+image+'></i>':'')+
textHtml+
'</button>'+
'</div>');},bindStates:function(){var self=this,$=self.$,textCls=self.classPrefix+'txt';function setButtonText(text){var $span=$('span.'+textCls,self.getEl());if(text){if(!$span[0]){$('button:first',self.getEl()).append('<span class="'+textCls+'"></span>');$span=$('span.'+textCls,self.getEl());}
$span.html(self.encode(text));}else{$span.remove();}
self.classes.toggle('btn-has-text',!!text);}
self.state.on('change:text',function(e){setButtonText(e.value);});self.state.on('change:icon',function(e){var icon=e.value,prefix=self.classPrefix;self.settings.icon=icon;icon=icon?prefix+'ico '+prefix+'i-'+self.settings.icon:'';var btnElm=self.getEl().firstChild,iconElm=btnElm.getElementsByTagName('i')[0];if(icon){if(!iconElm||iconElm!=btnElm.firstChild){iconElm=document.createElement('i');btnElm.insertBefore(iconElm,btnElm.firstChild);}
iconElm.className=icon;}else if(iconElm){btnElm.removeChild(iconElm);}
setButtonText(self.state.get('text'));});return self._super();}});});define("tinymce/ui/ButtonGroup",["tinymce/ui/Container"],function(Container){"use strict";return Container.extend({Defaults:{defaultType:'button',role:'group'},renderHtml:function(){var self=this,layout=self._layout;self.classes.add('btn-group');self.preRender();layout.preRender(self);return('<div id="'+self._id+'" class="'+self.classes+'">'+
'<div id="'+self._id+'-body">'+
(self.settings.html||'')+layout.renderHtml(self)+
'</div>'+
'</div>');}});});define("tinymce/ui/Checkbox",["tinymce/ui/Widget"],function(Widget){"use strict";return Widget.extend({Defaults:{classes:"checkbox",role:"checkbox",checked:false},init:function(settings){var self=this;self._super(settings);self.on('click mousedown',function(e){e.preventDefault();});self.on('click',function(e){e.preventDefault();if(!self.disabled()){self.checked(!self.checked());}});self.checked(self.settings.checked);},checked:function(state){if(!arguments.length){return this.state.get('checked');}
this.state.set('checked',state);return this;},value:function(state){if(!arguments.length){return this.checked();}
return this.checked(state);},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix;return('<div id="'+id+'" class="'+self.classes+'" unselectable="on" aria-labelledby="'+id+'-al" tabindex="-1">'+
'<i class="'+prefix+'ico '+prefix+'i-checkbox"></i>'+
'<span id="'+id+'-al" class="'+prefix+'label">'+self.encode(self.state.get('text'))+'</span>'+
'</div>');},bindStates:function(){var self=this;function checked(state){self.classes.toggle("checked",state);self.aria('checked',state);}
self.state.on('change:text',function(e){self.getEl('al').firstChild.data=self.translate(e.value);});self.state.on('change:checked change:value',function(e){self.fire('change');checked(e.value);});self.state.on('change:icon',function(e){var icon=e.value,prefix=self.classPrefix;if(typeof icon=='undefined'){return self.settings.icon;}
self.settings.icon=icon;icon=icon?prefix+'ico '+prefix+'i-'+self.settings.icon:'';var btnElm=self.getEl().firstChild,iconElm=btnElm.getElementsByTagName('i')[0];if(icon){if(!iconElm||iconElm!=btnElm.firstChild){iconElm=document.createElement('i');btnElm.insertBefore(iconElm,btnElm.firstChild);}
iconElm.className=icon;}else if(iconElm){btnElm.removeChild(iconElm);}});if(self.state.get('checked')){checked(true);}
return self._super();}});});define("tinymce/ui/ComboBox",["tinymce/ui/Widget","tinymce/ui/Factory","tinymce/ui/DomUtils","tinymce/dom/DomQuery"],function(Widget,Factory,DomUtils,$){"use strict";return Widget.extend({init:function(settings){var self=this;self._super(settings);settings=self.settings;self.classes.add('combobox');self.subinput=true;self.ariaTarget='inp';settings.menu=settings.menu||settings.values;if(settings.menu){settings.icon='caret';}
self.on('click',function(e){var elm=e.target,root=self.getEl();if(!$.contains(root,elm)&&elm!=root){return;}
while(elm&&elm!=root){if(elm.id&&elm.id.indexOf('-open')!=-1){self.fire('action');if(settings.menu){self.showMenu();if(e.aria){self.menu.items()[0].focus();}}}
elm=elm.parentNode;}});self.on('keydown',function(e){if(e.target.nodeName=="INPUT"&&e.keyCode==13){self.parents().reverse().each(function(ctrl){var stateValue=self.state.get('value'),inputValue=self.getEl('inp').value;e.preventDefault();self.state.set('value',inputValue);if(stateValue!=inputValue){self.fire('change');}
if(ctrl.hasEventListeners('submit')&&ctrl.toJSON){ctrl.fire('submit',{data:ctrl.toJSON()});return false;}});}});self.on('keyup',function(e){if(e.target.nodeName=="INPUT"){self.state.set('value',e.target.value);}});},showMenu:function(){var self=this,settings=self.settings,menu;if(!self.menu){menu=settings.menu||[];if(menu.length){menu={type:'menu',items:menu};}else{menu.type=menu.type||'menu';}
self.menu=Factory.create(menu).parent(self).renderTo(self.getContainerElm());self.fire('createmenu');self.menu.reflow();self.menu.on('cancel',function(e){if(e.control===self.menu){self.focus();}});self.menu.on('show hide',function(e){e.control.items().each(function(ctrl){ctrl.active(ctrl.value()==self.value());});}).fire('show');self.menu.on('select',function(e){self.value(e.control.value());});self.on('focusin',function(e){if(e.target.tagName.toUpperCase()=='INPUT'){self.menu.hide();}});self.aria('expanded',true);}
self.menu.show();self.menu.layoutRect({w:self.layoutRect().w});self.menu.moveRel(self.getEl(),self.isRtl()?['br-tr','tr-br']:['bl-tl','tl-bl']);},focus:function(){this.getEl('inp').focus();},repaint:function(){var self=this,elm=self.getEl(),openElm=self.getEl('open'),rect=self.layoutRect();var width,lineHeight;if(openElm){width=rect.w-DomUtils.getSize(openElm).width-10;}else{width=rect.w-10;}
var doc=document;if(doc.all&&(!doc.documentMode||doc.documentMode<=8)){lineHeight=(self.layoutRect().h-2)+'px';}
$(elm.firstChild).css({width:width,lineHeight:lineHeight});self._super();return self;},postRender:function(){var self=this;$(this.getEl('inp')).on('change',function(e){self.state.set('value',e.target.value);self.fire('change',e);});return self._super();},renderHtml:function(){var self=this,id=self._id,settings=self.settings,prefix=self.classPrefix;var value=self.state.get('value')||'';var icon,text,openBtnHtml='',extraAttrs='';if("spellcheck"in settings){extraAttrs+=' spellcheck="'+settings.spellcheck+'"';}
if(settings.maxLength){extraAttrs+=' maxlength="'+settings.maxLength+'"';}
if(settings.size){extraAttrs+=' size="'+settings.size+'"';}
if(settings.subtype){extraAttrs+=' type="'+settings.subtype+'"';}
if(self.disabled()){extraAttrs+=' disabled="disabled"';}
icon=settings.icon;if(icon&&icon!='caret'){icon=prefix+'ico '+prefix+'i-'+settings.icon;}
text=self.state.get('text');if(icon||text){openBtnHtml=('<div id="'+id+'-open" class="'+prefix+'btn '+prefix+'open" tabIndex="-1" role="button">'+
'<button id="'+id+'-action" type="button" hidefocus="1" tabindex="-1">'+
(icon!='caret'?'<i class="'+icon+'"></i>':'<i class="'+prefix+'caret"></i>')+
(text?(icon?' ':'')+text:'')+
'</button>'+
'</div>');self.classes.add('has-open');}
return('<div id="'+id+'" class="'+self.classes+'">'+
'<input id="'+id+'-inp" class="'+prefix+'textbox" value="'+
self.encode(value,false)+'" hidefocus="1"'+extraAttrs+' placeholder="'+
self.encode(settings.placeholder)+'" />'+
openBtnHtml+
'</div>');},value:function(value){if(arguments.length){this.state.set('value',value);return this;}
if(this.state.get('rendered')){this.state.set('value',this.getEl('inp').value);}
return this.state.get('value');},bindStates:function(){var self=this;self.state.on('change:value',function(e){if(self.getEl('inp').value!=e.value){self.getEl('inp').value=e.value;}});self.state.on('change:disabled',function(e){self.getEl('inp').disabled=e.value;});return self._super();},remove:function(){$(this.getEl('inp')).off();this._super();}});});define("tinymce/ui/ColorBox",["tinymce/ui/ComboBox"],function(ComboBox){"use strict";return ComboBox.extend({init:function(settings){var self=this;settings.spellcheck=false;if(settings.onaction){settings.icon='none';}
self._super(settings);self.classes.add('colorbox');self.on('change keyup postrender',function(){self.repaintColor(self.value());});},repaintColor:function(value){var elm=this.getEl().getElementsByTagName('i')[0];if(elm){try{elm.style.background=value;}catch(ex){}}},bindStates:function(){var self=this;self.state.on('change:value',function(e){if(self.state.get('rendered')){self.repaintColor(e.value);}});return self._super();}});});define("tinymce/ui/PanelButton",["tinymce/ui/Button","tinymce/ui/FloatPanel"],function(Button,FloatPanel){"use strict";return Button.extend({showPanel:function(){var self=this,settings=self.settings;self.active(true);if(!self.panel){var panelSettings=settings.panel;if(panelSettings.type){panelSettings={layout:'grid',items:panelSettings};}
panelSettings.role=panelSettings.role||'dialog';panelSettings.popover=true;panelSettings.autohide=true;panelSettings.ariaRoot=true;self.panel=new FloatPanel(panelSettings).on('hide',function(){self.active(false);}).on('cancel',function(e){e.stopPropagation();self.focus();self.hidePanel();}).parent(self).renderTo(self.getContainerElm());self.panel.fire('show');self.panel.reflow();}else{self.panel.show();}
self.panel.moveRel(self.getEl(),settings.popoverAlign||(self.isRtl()?['bc-tr','bc-tc']:['bc-tl','bc-tc']));},hidePanel:function(){var self=this;if(self.panel){self.panel.hide();}},postRender:function(){var self=this;self.aria('haspopup',true);self.on('click',function(e){if(e.control===self){if(self.panel&&self.panel.visible()){self.hidePanel();}else{self.showPanel();self.panel.focus(!!e.aria);}}});return self._super();},remove:function(){if(this.panel){this.panel.remove();this.panel=null;}
return this._super();}});});define("tinymce/ui/ColorButton",["tinymce/ui/PanelButton","tinymce/dom/DOMUtils"],function(PanelButton,DomUtils){"use strict";var DOM=DomUtils.DOM;return PanelButton.extend({init:function(settings){this._super(settings);this.classes.add('colorbutton');},color:function(color){if(color){this._color=color;this.getEl('preview').style.backgroundColor=color;return this;}
return this._color;},resetColor:function(){this._color=null;this.getEl('preview').style.backgroundColor=null;return this;},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix,text=self.state.get('text');var icon=self.settings.icon?prefix+'ico '+prefix+'i-'+self.settings.icon:'';var image=self.settings.image?' style="background-image: url(\''+self.settings.image+'\')"':'',textHtml='';if(text){self.classes.add('btn-has-text');textHtml='<span class="'+prefix+'txt">'+self.encode(text)+'</span>';}
return('<div id="'+id+'" class="'+self.classes+'" role="button" tabindex="-1" aria-haspopup="true">'+
'<button role="presentation" hidefocus="1" type="button" tabindex="-1">'+
(icon?'<i class="'+icon+'"'+image+'></i>':'')+
'<span id="'+id+'-preview" class="'+prefix+'preview"></span>'+
textHtml+
'</button>'+
'<button type="button" class="'+prefix+'open" hidefocus="1" tabindex="-1">'+
' <i class="'+prefix+'caret"></i>'+
'</button>'+
'</div>');},postRender:function(){var self=this,onClickHandler=self.settings.onclick;self.on('click',function(e){if(e.aria&&e.aria.key=='down'){return;}
if(e.control==self&&!DOM.getParent(e.target,'.'+self.classPrefix+'open')){e.stopImmediatePropagation();onClickHandler.call(self,e);}});delete self.settings.onclick;return self._super();}});});define("tinymce/util/Color",[],function(){var min=Math.min,max=Math.max,round=Math.round;function Color(value){var self=this,r=0,g=0,b=0;function rgb2hsv(r,g,b){var h,s,v,d,minRGB,maxRGB;h=0;s=0;v=0;r=r/255;g=g/255;b=b/255;minRGB=min(r,min(g,b));maxRGB=max(r,max(g,b));if(minRGB==maxRGB){v=minRGB;return{h:0,s:0,v:v*100};}
d=(r==minRGB)?g-b:((b==minRGB)?r-g:b-r);h=(r==minRGB)?3:((b==minRGB)?1:5);h=60*(h-d/(maxRGB-minRGB));s=(maxRGB-minRGB)/maxRGB;v=maxRGB;return{h:round(h),s:round(s*100),v:round(v*100)};}
function hsvToRgb(hue,saturation,brightness){var side,chroma,x,match;hue=(parseInt(hue,10)||0)%360;saturation=parseInt(saturation,10)/100;brightness=parseInt(brightness,10)/100;saturation=max(0,min(saturation,1));brightness=max(0,min(brightness,1));if(saturation===0){r=g=b=round(255*brightness);return;}
side=hue/60;chroma=brightness*saturation;x=chroma*(1-Math.abs(side%2-1));match=brightness-chroma;switch(Math.floor(side)){case 0:r=chroma;g=x;b=0;break;case 1:r=x;g=chroma;b=0;break;case 2:r=0;g=chroma;b=x;break;case 3:r=0;g=x;b=chroma;break;case 4:r=x;g=0;b=chroma;break;case 5:r=chroma;g=0;b=x;break;default:r=g=b=0;}
r=round(255*(r+match));g=round(255*(g+match));b=round(255*(b+match));}
function toHex(){function hex(val){val=parseInt(val,10).toString(16);return val.length>1?val:'0'+val;}
return '#'+hex(r)+hex(g)+hex(b);}
function toRgb(){return{r:r,g:g,b:b};}
function toHsv(){return rgb2hsv(r,g,b);}
function parse(value){var matches;if(typeof value=='object'){if("r"in value){r=value.r;g=value.g;b=value.b;}else if("v"in value){hsvToRgb(value.h,value.s,value.v);}}else{if((matches=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(value))){r=parseInt(matches[1],10);g=parseInt(matches[2],10);b=parseInt(matches[3],10);}else if((matches=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(value))){r=parseInt(matches[1],16);g=parseInt(matches[2],16);b=parseInt(matches[3],16);}else if((matches=/#([0-F])([0-F])([0-F])/gi.exec(value))){r=parseInt(matches[1]+matches[1],16);g=parseInt(matches[2]+matches[2],16);b=parseInt(matches[3]+matches[3],16);}}
r=r<0?0:(r>255?255:r);g=g<0?0:(g>255?255:g);b=b<0?0:(b>255?255:b);return self;}
if(value){parse(value);}
self.toRgb=toRgb;self.toHsv=toHsv;self.toHex=toHex;self.parse=parse;}
return Color;});define("tinymce/ui/ColorPicker",["tinymce/ui/Widget","tinymce/ui/DragHelper","tinymce/ui/DomUtils","tinymce/util/Color"],function(Widget,DragHelper,DomUtils,Color){"use strict";return Widget.extend({Defaults:{classes:"widget colorpicker"},init:function(settings){this._super(settings);},postRender:function(){var self=this,color=self.color(),hsv,hueRootElm,huePointElm,svRootElm,svPointElm;hueRootElm=self.getEl('h');huePointElm=self.getEl('hp');svRootElm=self.getEl('sv');svPointElm=self.getEl('svp');function getPos(elm,event){var pos=DomUtils.getPos(elm),x,y;x=event.pageX-pos.x;y=event.pageY-pos.y;x=Math.max(0,Math.min(x/elm.clientWidth,1));y=Math.max(0,Math.min(y/elm.clientHeight,1));return{x:x,y:y};}
function updateColor(hsv,hueUpdate){var hue=(360-hsv.h)/360;DomUtils.css(huePointElm,{top:(hue*100)+'%'});if(!hueUpdate){DomUtils.css(svPointElm,{left:hsv.s+'%',top:(100-hsv.v)+'%'});}
svRootElm.style.background=new Color({s:100,v:100,h:hsv.h}).toHex();self.color().parse({s:hsv.s,v:hsv.v,h:hsv.h});}
function updateSaturationAndValue(e){var pos;pos=getPos(svRootElm,e);hsv.s=pos.x*100;hsv.v=(1-pos.y)*100;updateColor(hsv);self.fire('change');}
function updateHue(e){var pos;pos=getPos(hueRootElm,e);hsv=color.toHsv();hsv.h=(1-pos.y)*360;updateColor(hsv,true);self.fire('change');}
self._repaint=function(){hsv=color.toHsv();updateColor(hsv);};self._super();self._svdraghelper=new DragHelper(self._id+'-sv',{start:updateSaturationAndValue,drag:updateSaturationAndValue});self._hdraghelper=new DragHelper(self._id+'-h',{start:updateHue,drag:updateHue});self._repaint();},rgb:function(){return this.color().toRgb();},value:function(value){var self=this;if(arguments.length){self.color().parse(value);if(self._rendered){self._repaint();}}else{return self.color().toHex();}},color:function(){if(!this._color){this._color=new Color();}
return this._color;},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix,hueHtml;var stops='#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000';function getOldIeFallbackHtml(){var i,l,html='',gradientPrefix,stopsList;gradientPrefix='filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=';stopsList=stops.split(',');for(i=0,l=stopsList.length-1;i<l;i++){html+=('<div class="'+prefix+'colorpicker-h-chunk" style="'+
'height:'+(100/l)+'%;'+
gradientPrefix+stopsList[i]+',endColorstr='+stopsList[i+1]+');'+
'-ms-'+gradientPrefix+stopsList[i]+',endColorstr='+stopsList[i+1]+')'+
'"></div>');}
return html;}
var gradientCssText=('background: -ms-linear-gradient(top,'+stops+');'+
'background: linear-gradient(to bottom,'+stops+');');hueHtml=('<div id="'+id+'-h" class="'+prefix+'colorpicker-h" style="'+gradientCssText+'">'+
getOldIeFallbackHtml()+
'<div id="'+id+'-hp" class="'+prefix+'colorpicker-h-marker"></div>'+
'</div>');return('<div id="'+id+'" class="'+self.classes+'">'+
'<div id="'+id+'-sv" class="'+prefix+'colorpicker-sv">'+
'<div class="'+prefix+'colorpicker-overlay1">'+
'<div class="'+prefix+'colorpicker-overlay2">'+
'<div id="'+id+'-svp" class="'+prefix+'colorpicker-selector1">'+
'<div class="'+prefix+'colorpicker-selector2"></div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
hueHtml+
'</div>');}});});define("tinymce/ui/Path",["tinymce/ui/Widget"],function(Widget){"use strict";return Widget.extend({init:function(settings){var self=this;if(!settings.delimiter){settings.delimiter='\u00BB';}
self._super(settings);self.classes.add('path');self.canFocus=true;self.on('click',function(e){var index,target=e.target;if((index=target.getAttribute('data-index'))){self.fire('select',{value:self.row()[index],index:index});}});self.row(self.settings.row);},focus:function(){var self=this;self.getEl().firstChild.focus();return self;},row:function(row){if(!arguments.length){return this.state.get('row');}
this.state.set('row',row);return this;},renderHtml:function(){var self=this;return('<div id="'+self._id+'" class="'+self.classes+'">'+
self._getDataPathHtml(self.state.get('row'))+
'</div>');},bindStates:function(){var self=this;self.state.on('change:row',function(e){self.innerHtml(self._getDataPathHtml(e.value));});return self._super();},_getDataPathHtml:function(data){var self=this,parts=data||[],i,l,html='',prefix=self.classPrefix;for(i=0,l=parts.length;i<l;i++){html+=((i>0?'<div class="'+prefix+'divider" aria-hidden="true"> '+self.settings.delimiter+' </div>':'')+
'<div role="button" class="'+prefix+'path-item'+(i==l-1?' '+prefix+'last':'')+'" data-index="'+
i+'" tabindex="-1" id="'+self._id+'-'+i+'" aria-level="'+i+'">'+parts[i].name+'</div>');}
if(!html){html='<div class="'+prefix+'path-item">\u00a0</div>';}
return html;}});});define("tinymce/ui/ElementPath",["tinymce/ui/Path","tinymce/EditorManager"],function(Path,EditorManager){return Path.extend({postRender:function(){var self=this,editor=EditorManager.activeEditor;function isHidden(elm){if(elm.nodeType===1){if(elm.nodeName=="BR"||!!elm.getAttribute('data-mce-bogus')){return true;}
if(elm.getAttribute('data-mce-type')==='bookmark'){return true;}}
return false;}
if(editor.settings.elementpath!==false){self.on('select',function(e){editor.focus();editor.selection.select(this.row()[e.index].element);editor.nodeChanged();});editor.on('nodeChange',function(e){var outParents=[],parents=e.parents,i=parents.length;while(i--){if(parents[i].nodeType==1&&!isHidden(parents[i])){var args=editor.fire('ResolveName',{name:parents[i].nodeName.toLowerCase(),target:parents[i]});if(!args.isDefaultPrevented()){outParents.push({name:args.name,element:parents[i]});}
if(args.isPropagationStopped()){break;}}}
self.row(outParents);});}
return self._super();}});});define("tinymce/ui/FormItem",["tinymce/ui/Container"],function(Container){"use strict";return Container.extend({Defaults:{layout:'flex',align:'center',defaults:{flex:1}},renderHtml:function(){var self=this,layout=self._layout,prefix=self.classPrefix;self.classes.add('formitem');layout.preRender(self);return('<div id="'+self._id+'" class="'+self.classes+'" hidefocus="1" tabindex="-1">'+
(self.settings.title?('<div id="'+self._id+'-title" class="'+prefix+'title">'+
self.settings.title+'</div>'):'')+
'<div id="'+self._id+'-body" class="'+self.bodyClasses+'">'+
(self.settings.html||'')+layout.renderHtml(self)+
'</div>'+
'</div>');}});});define("tinymce/ui/Form",["tinymce/ui/Container","tinymce/ui/FormItem","tinymce/util/Tools"],function(Container,FormItem,Tools){"use strict";return Container.extend({Defaults:{containerCls:'form',layout:'flex',direction:'column',align:'stretch',flex:1,padding:20,labelGap:30,spacing:10,callbacks:{submit:function(){this.submit();}}},preRender:function(){var self=this,items=self.items();if(!self.settings.formItemDefaults){self.settings.formItemDefaults={layout:'flex',autoResize:"overflow",defaults:{flex:1}};}
items.each(function(ctrl){var formItem,label=ctrl.settings.label;if(label){formItem=new FormItem(Tools.extend({items:{type:'label',id:ctrl._id+'-l',text:label,flex:0,forId:ctrl._id,disabled:ctrl.disabled()}},self.settings.formItemDefaults));formItem.type='formitem';ctrl.aria('labelledby',ctrl._id+'-l');if(typeof ctrl.settings.flex=="undefined"){ctrl.settings.flex=1;}
self.replace(ctrl,formItem);formItem.add(ctrl);}});},submit:function(){return this.fire('submit',{data:this.toJSON()});},postRender:function(){var self=this;self._super();self.fromJSON(self.settings.data);},bindStates:function(){var self=this;self._super();function recalcLabels(){var maxLabelWidth=0,labels=[],i,labelGap,items;if(self.settings.labelGapCalc===false){return;}
if(self.settings.labelGapCalc=="children"){items=self.find('formitem');}else{items=self.items();}
items.filter('formitem').each(function(item){var labelCtrl=item.items()[0],labelWidth=labelCtrl.getEl().clientWidth;maxLabelWidth=labelWidth>maxLabelWidth?labelWidth:maxLabelWidth;labels.push(labelCtrl);});labelGap=self.settings.labelGap||0;i=labels.length;while(i--){labels[i].settings.minWidth=maxLabelWidth+labelGap;}}
self.on('show',recalcLabels);recalcLabels();}});});define("tinymce/ui/FieldSet",["tinymce/ui/Form"],function(Form){"use strict";return Form.extend({Defaults:{containerCls:'fieldset',layout:'flex',direction:'column',align:'stretch',flex:1,padding:"25 15 5 15",labelGap:30,spacing:10,border:1},renderHtml:function(){var self=this,layout=self._layout,prefix=self.classPrefix;self.preRender();layout.preRender(self);return('<fieldset id="'+self._id+'" class="'+self.classes+'" hidefocus="1" tabindex="-1">'+
(self.settings.title?('<legend id="'+self._id+'-title" class="'+prefix+'fieldset-title">'+
self.settings.title+'</legend>'):'')+
'<div id="'+self._id+'-body" class="'+self.bodyClasses+'">'+
(self.settings.html||'')+layout.renderHtml(self)+
'</div>'+
'</fieldset>');}});});define("tinymce/ui/FilePicker",["tinymce/ui/ComboBox","tinymce/util/Tools"],function(ComboBox,Tools){"use strict";return ComboBox.extend({init:function(settings){var self=this,editor=tinymce.activeEditor,editorSettings=editor.settings;var actionCallback,fileBrowserCallback,fileBrowserCallbackTypes;settings.spellcheck=false;fileBrowserCallbackTypes=editorSettings.file_picker_types||editorSettings.file_browser_callback_types;if(fileBrowserCallbackTypes){fileBrowserCallbackTypes=Tools.makeMap(fileBrowserCallbackTypes,/[, ]/);}
if(!fileBrowserCallbackTypes||fileBrowserCallbackTypes[settings.filetype]){fileBrowserCallback=editorSettings.file_picker_callback;if(fileBrowserCallback&&(!fileBrowserCallbackTypes||fileBrowserCallbackTypes[settings.filetype])){actionCallback=function(){var meta=self.fire('beforecall').meta;meta=Tools.extend({filetype:settings.filetype},meta);fileBrowserCallback.call(editor,function(value,meta){self.value(value).fire('change',{meta:meta});},self.value(),meta);};}else{fileBrowserCallback=editorSettings.file_browser_callback;if(fileBrowserCallback&&(!fileBrowserCallbackTypes||fileBrowserCallbackTypes[settings.filetype])){actionCallback=function(){fileBrowserCallback(self.getEl('inp').id,self.value(),settings.filetype,window);};}}}
if(actionCallback){settings.icon='browse';settings.onaction=actionCallback;}
self._super(settings);}});});define("tinymce/ui/FitLayout",["tinymce/ui/AbsoluteLayout"],function(AbsoluteLayout){"use strict";return AbsoluteLayout.extend({recalc:function(container){var contLayoutRect=container.layoutRect(),paddingBox=container.paddingBox;container.items().filter(':visible').each(function(ctrl){ctrl.layoutRect({x:paddingBox.left,y:paddingBox.top,w:contLayoutRect.innerW-paddingBox.right-paddingBox.left,h:contLayoutRect.innerH-paddingBox.top-paddingBox.bottom});if(ctrl.recalc){ctrl.recalc();}});}});});define("tinymce/ui/FlexLayout",["tinymce/ui/AbsoluteLayout"],function(AbsoluteLayout){"use strict";return AbsoluteLayout.extend({recalc:function(container){var i,l,items,contLayoutRect,contPaddingBox,contSettings,align,pack,spacing,totalFlex,availableSpace,direction;var ctrl,ctrlLayoutRect,ctrlSettings,flex,maxSizeItems=[],size,maxSize,ratio,rect,pos,maxAlignEndPos;var sizeName,minSizeName,posName,maxSizeName,beforeName,innerSizeName,deltaSizeName,contentSizeName;var alignAxisName,alignInnerSizeName,alignSizeName,alignMinSizeName,alignBeforeName,alignAfterName;var alignDeltaSizeName,alignContentSizeName;var max=Math.max,min=Math.min;items=container.items().filter(':visible');contLayoutRect=container.layoutRect();contPaddingBox=container.paddingBox;contSettings=container.settings;direction=container.isRtl()?(contSettings.direction||'row-reversed'):contSettings.direction;align=contSettings.align;pack=container.isRtl()?(contSettings.pack||'end'):contSettings.pack;spacing=contSettings.spacing||0;if(direction=="row-reversed"||direction=="column-reverse"){items=items.set(items.toArray().reverse());direction=direction.split('-')[0];}
if(direction=="column"){posName="y";sizeName="h";minSizeName="minH";maxSizeName="maxH";innerSizeName="innerH";beforeName='top';deltaSizeName="deltaH";contentSizeName="contentH";alignBeforeName="left";alignSizeName="w";alignAxisName="x";alignInnerSizeName="innerW";alignMinSizeName="minW";alignAfterName="right";alignDeltaSizeName="deltaW";alignContentSizeName="contentW";}else{posName="x";sizeName="w";minSizeName="minW";maxSizeName="maxW";innerSizeName="innerW";beforeName='left';deltaSizeName="deltaW";contentSizeName="contentW";alignBeforeName="top";alignSizeName="h";alignAxisName="y";alignInnerSizeName="innerH";alignMinSizeName="minH";alignAfterName="bottom";alignDeltaSizeName="deltaH";alignContentSizeName="contentH";}
availableSpace=contLayoutRect[innerSizeName]-contPaddingBox[beforeName]-contPaddingBox[beforeName];maxAlignEndPos=totalFlex=0;for(i=0,l=items.length;i<l;i++){ctrl=items[i];ctrlLayoutRect=ctrl.layoutRect();ctrlSettings=ctrl.settings;flex=ctrlSettings.flex;availableSpace-=(i<l-1?spacing:0);if(flex>0){totalFlex+=flex;if(ctrlLayoutRect[maxSizeName]){maxSizeItems.push(ctrl);}
ctrlLayoutRect.flex=flex;}
availableSpace-=ctrlLayoutRect[minSizeName];size=contPaddingBox[alignBeforeName]+ctrlLayoutRect[alignMinSizeName]+contPaddingBox[alignAfterName];if(size>maxAlignEndPos){maxAlignEndPos=size;}}
rect={};if(availableSpace<0){rect[minSizeName]=contLayoutRect[minSizeName]-availableSpace+contLayoutRect[deltaSizeName];}else{rect[minSizeName]=contLayoutRect[innerSizeName]-availableSpace+contLayoutRect[deltaSizeName];}
rect[alignMinSizeName]=maxAlignEndPos+contLayoutRect[alignDeltaSizeName];rect[contentSizeName]=contLayoutRect[innerSizeName]-availableSpace;rect[alignContentSizeName]=maxAlignEndPos;rect.minW=min(rect.minW,contLayoutRect.maxW);rect.minH=min(rect.minH,contLayoutRect.maxH);rect.minW=max(rect.minW,contLayoutRect.startMinWidth);rect.minH=max(rect.minH,contLayoutRect.startMinHeight);if(contLayoutRect.autoResize&&(rect.minW!=contLayoutRect.minW||rect.minH!=contLayoutRect.minH)){rect.w=rect.minW;rect.h=rect.minH;container.layoutRect(rect);this.recalc(container);if(container._lastRect===null){var parentCtrl=container.parent();if(parentCtrl){parentCtrl._lastRect=null;parentCtrl.recalc();}}
return;}
ratio=availableSpace/totalFlex;for(i=0,l=maxSizeItems.length;i<l;i++){ctrl=maxSizeItems[i];ctrlLayoutRect=ctrl.layoutRect();maxSize=ctrlLayoutRect[maxSizeName];size=ctrlLayoutRect[minSizeName]+ctrlLayoutRect.flex*ratio;if(size>maxSize){availableSpace-=(ctrlLayoutRect[maxSizeName]-ctrlLayoutRect[minSizeName]);totalFlex-=ctrlLayoutRect.flex;ctrlLayoutRect.flex=0;ctrlLayoutRect.maxFlexSize=maxSize;}else{ctrlLayoutRect.maxFlexSize=0;}}
ratio=availableSpace/totalFlex;pos=contPaddingBox[beforeName];rect={};if(totalFlex===0){if(pack=="end"){pos=availableSpace+contPaddingBox[beforeName];}else if(pack=="center"){pos=Math.round((contLayoutRect[innerSizeName]/2)-((contLayoutRect[innerSizeName]-availableSpace)/2))+contPaddingBox[beforeName];if(pos<0){pos=contPaddingBox[beforeName];}}else if(pack=="justify"){pos=contPaddingBox[beforeName];spacing=Math.floor(availableSpace/(items.length-1));}}
rect[alignAxisName]=contPaddingBox[alignBeforeName];for(i=0,l=items.length;i<l;i++){ctrl=items[i];ctrlLayoutRect=ctrl.layoutRect();size=ctrlLayoutRect.maxFlexSize||ctrlLayoutRect[minSizeName];if(align==="center"){rect[alignAxisName]=Math.round((contLayoutRect[alignInnerSizeName]/2)-(ctrlLayoutRect[alignSizeName]/2));}else if(align==="stretch"){rect[alignSizeName]=max(ctrlLayoutRect[alignMinSizeName]||0,contLayoutRect[alignInnerSizeName]-contPaddingBox[alignBeforeName]-contPaddingBox[alignAfterName]);rect[alignAxisName]=contPaddingBox[alignBeforeName];}else if(align==="end"){rect[alignAxisName]=contLayoutRect[alignInnerSizeName]-ctrlLayoutRect[alignSizeName]-contPaddingBox.top;}
if(ctrlLayoutRect.flex>0){size+=ctrlLayoutRect.flex*ratio;}
rect[sizeName]=size;rect[posName]=pos;ctrl.layoutRect(rect);if(ctrl.recalc){ctrl.recalc();}
pos+=size+spacing;}}});});define("tinymce/ui/FlowLayout",["tinymce/ui/Layout"],function(Layout){return Layout.extend({Defaults:{containerClass:'flow-layout',controlClass:'flow-layout-item',endClass:'break'},recalc:function(container){container.items().filter(':visible').each(function(ctrl){if(ctrl.recalc){ctrl.recalc();}});},isNative:function(){return true;}});});define("tinymce/ui/FormatControls",["tinymce/ui/Control","tinymce/ui/Widget","tinymce/ui/FloatPanel","tinymce/util/Tools","tinymce/EditorManager","tinymce/Env"],function(Control,Widget,FloatPanel,Tools,EditorManager,Env){var each=Tools.each;EditorManager.on('AddEditor',function(e){if(e.editor.rtl){Control.rtl=true;}
registerControls(e.editor);});Control.translate=function(text){return EditorManager.translate(text);};Widget.tooltips=!Env.iOS;function registerControls(editor){var formatMenu;function createListBoxChangeHandler(items,formatName){return function(){var self=this;editor.on('nodeChange',function(e){var formatter=editor.formatter;var value=null;each(e.parents,function(node){each(items,function(item){if(formatName){if(formatter.matchNode(node,formatName,{value:item.value})){value=item.value;}}else{if(formatter.matchNode(node,item.value)){value=item.value;}}
if(value){return false;}});if(value){return false;}});self.value(value);});};}
function createFormats(formats){formats=formats.replace(/;$/,'').split(';');var i=formats.length;while(i--){formats[i]=formats[i].split('=');}
return formats;}
function createFormatMenu(){var count=0,newFormats=[];var defaultStyleFormats=[{title:'Headings',items:[{title:'Heading 1',format:'h1'},{title:'Heading 2',format:'h2'},{title:'Heading 3',format:'h3'},{title:'Heading 4',format:'h4'},{title:'Heading 5',format:'h5'},{title:'Heading 6',format:'h6'}]},{title:'Inline',items:[{title:'Bold',icon:'bold',format:'bold'},{title:'Italic',icon:'italic',format:'italic'},{title:'Underline',icon:'underline',format:'underline'},{title:'Strikethrough',icon:'strikethrough',format:'strikethrough'},{title:'Superscript',icon:'superscript',format:'superscript'},{title:'Subscript',icon:'subscript',format:'subscript'},{title:'Code',icon:'code',format:'code'}]},{title:'Blocks',items:[{title:'Paragraph',format:'p'},{title:'Blockquote',format:'blockquote'},{title:'Div',format:'div'},{title:'Pre',format:'pre'}]},{title:'Alignment',items:[{title:'Left',icon:'alignleft',format:'alignleft'},{title:'Center',icon:'aligncenter',format:'aligncenter'},{title:'Right',icon:'alignright',format:'alignright'},{title:'Justify',icon:'alignjustify',format:'alignjustify'}]}];function createMenu(formats){var menu=[];if(!formats){return;}
each(formats,function(format){var menuItem={text:format.title,icon:format.icon};if(format.items){menuItem.menu=createMenu(format.items);}else{var formatName=format.format||"custom"+count++;if(!format.format){format.name=formatName;newFormats.push(format);}
menuItem.format=formatName;menuItem.cmd=format.cmd;}
menu.push(menuItem);});return menu;}
function createStylesMenu(){var menu;if(editor.settings.style_formats_merge){if(editor.settings.style_formats){menu=createMenu(defaultStyleFormats.concat(editor.settings.style_formats));}else{menu=createMenu(defaultStyleFormats);}}else{menu=createMenu(editor.settings.style_formats||defaultStyleFormats);}
return menu;}
editor.on('init',function(){each(newFormats,function(format){editor.formatter.register(format.name,format);});});return{type:'menu',items:createStylesMenu(),onPostRender:function(e){editor.fire('renderFormatsMenu',{control:e.control});},itemDefaults:{preview:true,textStyle:function(){if(this.settings.format){return editor.formatter.getCssText(this.settings.format);}},onPostRender:function(){var self=this;self.parent().on('show',function(){var formatName,command;formatName=self.settings.format;if(formatName){self.disabled(!editor.formatter.canApply(formatName));self.active(editor.formatter.match(formatName));}
command=self.settings.cmd;if(command){self.active(editor.queryCommandState(command));}});},onclick:function(){if(this.settings.format){toggleFormat(this.settings.format);}
if(this.settings.cmd){editor.execCommand(this.settings.cmd);}}}};}
formatMenu=createFormatMenu();function initOnPostRender(name){return function(){var self=this;if(editor.formatter){editor.formatter.formatChanged(name,function(state){self.active(state);});}else{editor.on('init',function(){editor.formatter.formatChanged(name,function(state){self.active(state);});});}};}
each({bold:'Bold',italic:'Italic',underline:'Underline',strikethrough:'Strikethrough',subscript:'Subscript',superscript:'Superscript'},function(text,name){editor.addButton(name,{tooltip:text,onPostRender:initOnPostRender(name),onclick:function(){toggleFormat(name);}});});each({outdent:['Decrease indent','Outdent'],indent:['Increase indent','Indent'],cut:['Cut','Cut'],copy:['Copy','Copy'],paste:['Paste','Paste'],help:['Help','mceHelp'],selectall:['Select all','SelectAll'],removeformat:['Clear formatting','RemoveFormat'],visualaid:['Visual aids','mceToggleVisualAid'],newdocument:['New document','mceNewDocument']},function(item,name){editor.addButton(name,{tooltip:item[0],cmd:item[1]});});each({blockquote:['Blockquote','mceBlockQuote'],numlist:['Numbered list','InsertOrderedList'],bullist:['Bullet list','InsertUnorderedList'],subscript:['Subscript','Subscript'],superscript:['Superscript','Superscript'],alignleft:['Align left','JustifyLeft'],aligncenter:['Align center','JustifyCenter'],alignright:['Align right','JustifyRight'],alignjustify:['Justify','JustifyFull'],alignnone:['No alignment','JustifyNone']},function(item,name){editor.addButton(name,{tooltip:item[0],cmd:item[1],onPostRender:initOnPostRender(name)});});function toggleUndoRedoState(type){return function(){var self=this;type=type=='redo'?'hasRedo':'hasUndo';function checkState(){return editor.undoManager?editor.undoManager[type]():false;}
self.disabled(!checkState());editor.on('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode',function(){self.disabled(editor.readonly||!checkState());});};}
function toggleVisualAidState(){var self=this;editor.on('VisualAid',function(e){self.active(e.hasVisual);});self.active(editor.hasVisual);}
editor.addButton('undo',{tooltip:'Undo',onPostRender:toggleUndoRedoState('undo'),cmd:'undo'});editor.addButton('redo',{tooltip:'Redo',onPostRender:toggleUndoRedoState('redo'),cmd:'redo'});editor.addMenuItem('newdocument',{text:'New document',icon:'newdocument',cmd:'mceNewDocument'});editor.addMenuItem('undo',{text:'Undo',icon:'undo',shortcut:'Meta+Z',onPostRender:toggleUndoRedoState('undo'),cmd:'undo'});editor.addMenuItem('redo',{text:'Redo',icon:'redo',shortcut:'Meta+Y',onPostRender:toggleUndoRedoState('redo'),cmd:'redo'});editor.addMenuItem('visualaid',{text:'Visual aids',selectable:true,onPostRender:toggleVisualAidState,cmd:'mceToggleVisualAid'});editor.addButton('remove',{tooltip:'Remove',icon:'remove',cmd:'Delete'});each({cut:['Cut','Cut','Meta+X'],copy:['Copy','Copy','Meta+C'],paste:['Paste','Paste','Meta+V'],selectall:['Select all','SelectAll','Meta+A'],bold:['Bold','Bold','Meta+B'],italic:['Italic','Italic','Meta+I'],underline:['Underline','Underline'],strikethrough:['Strikethrough','Strikethrough'],subscript:['Subscript','Subscript'],superscript:['Superscript','Superscript'],removeformat:['Clear formatting','RemoveFormat']},function(item,name){editor.addMenuItem(name,{text:item[0],icon:name,shortcut:item[2],cmd:item[1]});});editor.on('mousedown',function(){FloatPanel.hideAll();});function toggleFormat(fmt){if(fmt.control){fmt=fmt.control.value();}
if(fmt){editor.execCommand('mceToggleFormat',false,fmt);}}
editor.addButton('styleselect',{type:'menubutton',text:'Formats',menu:formatMenu});editor.addButton('formatselect',function(){var items=[],blocks=createFormats(editor.settings.block_formats||'Paragraph=p;'+
'Heading 1=h1;'+
'Heading 2=h2;'+
'Heading 3=h3;'+
'Heading 4=h4;'+
'Heading 5=h5;'+
'Heading 6=h6;'+
'Preformatted=pre');each(blocks,function(block){items.push({text:block[0],value:block[1],textStyle:function(){return editor.formatter.getCssText(block[1]);}});});return{type:'listbox',text:blocks[0][0],values:items,fixedWidth:true,onselect:toggleFormat,onPostRender:createListBoxChangeHandler(items)};});editor.addButton('fontselect',function(){var defaultFontsFormats='Andale Mono=andale mono,monospace;'+
'Arial=arial,helvetica,sans-serif;'+
'Arial Black=arial black,sans-serif;'+
'Book Antiqua=book antiqua,palatino,serif;'+
'Comic Sans MS=comic sans ms,sans-serif;'+
'Courier New=courier new,courier,monospace;'+
'Georgia=georgia,palatino,serif;'+
'Helvetica=helvetica,arial,sans-serif;'+
'Impact=impact,sans-serif;'+
'Symbol=symbol;'+
'Tahoma=tahoma,arial,helvetica,sans-serif;'+
'Terminal=terminal,monaco,monospace;'+
'Times New Roman=times new roman,times,serif;'+
'Trebuchet MS=trebuchet ms,geneva,sans-serif;'+
'Verdana=verdana,geneva,sans-serif;'+
'Webdings=webdings;'+
'Wingdings=wingdings,zapf dingbats';var items=[],fonts=createFormats(editor.settings.font_formats||defaultFontsFormats);each(fonts,function(font){items.push({text:{raw:font[0]},value:font[1],textStyle:font[1].indexOf('dings')==-1?'font-family:'+font[1]:''});});return{type:'listbox',text:'Font Family',tooltip:'Font Family',values:items,fixedWidth:true,onPostRender:createListBoxChangeHandler(items,'fontname'),onselect:function(e){if(e.control.settings.value){editor.execCommand('FontName',false,e.control.settings.value);}}};});editor.addButton('fontsizeselect',function(){var items=[],defaultFontsizeFormats='8pt 10pt 12pt 14pt 18pt 24pt 36pt';var fontsize_formats=editor.settings.fontsize_formats||defaultFontsizeFormats;each(fontsize_formats.split(' '),function(item){var text=item,value=item;var values=item.split('=');if(values.length>1){text=values[0];value=values[1];}
items.push({text:text,value:value});});return{type:'listbox',text:'Font Sizes',tooltip:'Font Sizes',values:items,fixedWidth:true,onPostRender:createListBoxChangeHandler(items,'fontsize'),onclick:function(e){if(e.control.settings.value){editor.execCommand('FontSize',false,e.control.settings.value);}}};});editor.addMenuItem('formats',{text:'Formats',menu:formatMenu});}});define("tinymce/ui/GridLayout",["tinymce/ui/AbsoluteLayout"],function(AbsoluteLayout){"use strict";return AbsoluteLayout.extend({recalc:function(container){var settings,rows,cols,items,contLayoutRect,width,height,rect,ctrlLayoutRect,ctrl,x,y,posX,posY,ctrlSettings,contPaddingBox,align,spacingH,spacingV,alignH,alignV,maxX,maxY,colWidths=[],rowHeights=[],ctrlMinWidth,ctrlMinHeight,availableWidth,availableHeight,reverseRows,idx;settings=container.settings;items=container.items().filter(':visible');contLayoutRect=container.layoutRect();cols=settings.columns||Math.ceil(Math.sqrt(items.length));rows=Math.ceil(items.length/cols);spacingH=settings.spacingH||settings.spacing||0;spacingV=settings.spacingV||settings.spacing||0;alignH=settings.alignH||settings.align;alignV=settings.alignV||settings.align;contPaddingBox=container.paddingBox;reverseRows='reverseRows'in settings?settings.reverseRows:container.isRtl();if(alignH&&typeof alignH=="string"){alignH=[alignH];}
if(alignV&&typeof alignV=="string"){alignV=[alignV];}
for(x=0;x<cols;x++){colWidths.push(0);}
for(y=0;y<rows;y++){rowHeights.push(0);}
for(y=0;y<rows;y++){for(x=0;x<cols;x++){ctrl=items[y*cols+x];if(!ctrl){break;}
ctrlLayoutRect=ctrl.layoutRect();ctrlMinWidth=ctrlLayoutRect.minW;ctrlMinHeight=ctrlLayoutRect.minH;colWidths[x]=ctrlMinWidth>colWidths[x]?ctrlMinWidth:colWidths[x];rowHeights[y]=ctrlMinHeight>rowHeights[y]?ctrlMinHeight:rowHeights[y];}}
availableWidth=contLayoutRect.innerW-contPaddingBox.left-contPaddingBox.right;for(maxX=0,x=0;x<cols;x++){maxX+=colWidths[x]+(x>0?spacingH:0);availableWidth-=(x>0?spacingH:0)+colWidths[x];}
availableHeight=contLayoutRect.innerH-contPaddingBox.top-contPaddingBox.bottom;for(maxY=0,y=0;y<rows;y++){maxY+=rowHeights[y]+(y>0?spacingV:0);availableHeight-=(y>0?spacingV:0)+rowHeights[y];}
maxX+=contPaddingBox.left+contPaddingBox.right;maxY+=contPaddingBox.top+contPaddingBox.bottom;rect={};rect.minW=maxX+(contLayoutRect.w-contLayoutRect.innerW);rect.minH=maxY+(contLayoutRect.h-contLayoutRect.innerH);rect.contentW=rect.minW-contLayoutRect.deltaW;rect.contentH=rect.minH-contLayoutRect.deltaH;rect.minW=Math.min(rect.minW,contLayoutRect.maxW);rect.minH=Math.min(rect.minH,contLayoutRect.maxH);rect.minW=Math.max(rect.minW,contLayoutRect.startMinWidth);rect.minH=Math.max(rect.minH,contLayoutRect.startMinHeight);if(contLayoutRect.autoResize&&(rect.minW!=contLayoutRect.minW||rect.minH!=contLayoutRect.minH)){rect.w=rect.minW;rect.h=rect.minH;container.layoutRect(rect);this.recalc(container);if(container._lastRect===null){var parentCtrl=container.parent();if(parentCtrl){parentCtrl._lastRect=null;parentCtrl.recalc();}}
return;}
if(contLayoutRect.autoResize){rect=container.layoutRect(rect);rect.contentW=rect.minW-contLayoutRect.deltaW;rect.contentH=rect.minH-contLayoutRect.deltaH;}
var flexV;if(settings.packV=='start'){flexV=0;}else{flexV=availableHeight>0?Math.floor(availableHeight/rows):0;}
var totalFlex=0;var flexWidths=settings.flexWidths;if(flexWidths){for(x=0;x<flexWidths.length;x++){totalFlex+=flexWidths[x];}}else{totalFlex=cols;}
var ratio=availableWidth/totalFlex;for(x=0;x<cols;x++){colWidths[x]+=flexWidths?flexWidths[x]*ratio:ratio;}
posY=contPaddingBox.top;for(y=0;y<rows;y++){posX=contPaddingBox.left;height=rowHeights[y]+flexV;for(x=0;x<cols;x++){if(reverseRows){idx=y*cols+cols-1-x;}else{idx=y*cols+x;}
ctrl=items[idx];if(!ctrl){break;}
ctrlSettings=ctrl.settings;ctrlLayoutRect=ctrl.layoutRect();width=Math.max(colWidths[x],ctrlLayoutRect.startMinWidth);ctrlLayoutRect.x=posX;ctrlLayoutRect.y=posY;align=ctrlSettings.alignH||(alignH?(alignH[x]||alignH[0]):null);if(align=="center"){ctrlLayoutRect.x=posX+(width/2)-(ctrlLayoutRect.w/2);}else if(align=="right"){ctrlLayoutRect.x=posX+width-ctrlLayoutRect.w;}else if(align=="stretch"){ctrlLayoutRect.w=width;}
align=ctrlSettings.alignV||(alignV?(alignV[x]||alignV[0]):null);if(align=="center"){ctrlLayoutRect.y=posY+(height/2)-(ctrlLayoutRect.h/2);}else if(align=="bottom"){ctrlLayoutRect.y=posY+height-ctrlLayoutRect.h;}else if(align=="stretch"){ctrlLayoutRect.h=height;}
ctrl.layoutRect(ctrlLayoutRect);posX+=width+spacingH;if(ctrl.recalc){ctrl.recalc();}}
posY+=height+spacingV;}}});});define("tinymce/ui/Iframe",["tinymce/ui/Widget","tinymce/util/Delay"],function(Widget,Delay){"use strict";return Widget.extend({renderHtml:function(){var self=this;self.classes.add('iframe');self.canFocus=false;return('<iframe id="'+self._id+'" class="'+self.classes+'" tabindex="-1" src="'+
(self.settings.url||"javascript:''")+'" frameborder="0"></iframe>');},src:function(src){this.getEl().src=src;},html:function(html,callback){var self=this,body=this.getEl().contentWindow.document.body;if(!body){Delay.setTimeout(function(){self.html(html);});}else{body.innerHTML=html;if(callback){callback();}}
return this;}});});define("tinymce/ui/InfoBox",["tinymce/ui/Widget"],function(Widget){"use strict";return Widget.extend({init:function(settings){var self=this;self._super(settings);self.classes.add('widget').add('infobox');self.canFocus=false;},severity:function(level){this.classes.remove('error');this.classes.remove('warning');this.classes.remove('success');this.classes.add(level);},help:function(state){this.state.set('help',state);},renderHtml:function(){var self=this,prefix=self.classPrefix;return('<div id="'+self._id+'" class="'+self.classes+'">'+
'<div id="'+self._id+'-body">'+
self.encode(self.state.get('text'))+
'<button role="button" tabindex="-1">'+
'<i class="'+prefix+'ico '+prefix+'i-help"></i>'+
'</button>'+
'</div>'+
'</div>');},bindStates:function(){var self=this;self.state.on('change:text',function(e){self.getEl('body').firstChild.data=self.encode(e.value);if(self.state.get('rendered')){self.updateLayoutRect();}});self.state.on('change:help',function(e){self.classes.toggle('has-help',e.value);if(self.state.get('rendered')){self.updateLayoutRect();}});return self._super();}});});define("tinymce/ui/Label",["tinymce/ui/Widget","tinymce/ui/DomUtils"],function(Widget,DomUtils){"use strict";return Widget.extend({init:function(settings){var self=this;self._super(settings);self.classes.add('widget').add('label');self.canFocus=false;if(settings.multiline){self.classes.add('autoscroll');}
if(settings.strong){self.classes.add('strong');}},initLayoutRect:function(){var self=this,layoutRect=self._super();if(self.settings.multiline){var size=DomUtils.getSize(self.getEl());if(size.width>layoutRect.maxW){layoutRect.minW=layoutRect.maxW;self.classes.add('multiline');}
self.getEl().style.width=layoutRect.minW+'px';layoutRect.startMinH=layoutRect.h=layoutRect.minH=Math.min(layoutRect.maxH,DomUtils.getSize(self.getEl()).height);}
return layoutRect;},repaint:function(){var self=this;if(!self.settings.multiline){self.getEl().style.lineHeight=self.layoutRect().h+'px';}
return self._super();},severity:function(level){this.classes.remove('error');this.classes.remove('warning');this.classes.remove('success');this.classes.add(level);},renderHtml:function(){var self=this,targetCtrl,forName,forId=self.settings.forId;if(!forId&&(forName=self.settings.forName)){targetCtrl=self.getRoot().find('#'+forName)[0];if(targetCtrl){forId=targetCtrl._id;}}
if(forId){return('<label id="'+self._id+'" class="'+self.classes+'"'+(forId?' for="'+forId+'"':'')+'>'+
self.encode(self.state.get('text'))+
'</label>');}
return('<span id="'+self._id+'" class="'+self.classes+'">'+
self.encode(self.state.get('text'))+
'</span>');},bindStates:function(){var self=this;self.state.on('change:text',function(e){self.innerHtml(self.encode(e.value));if(self.state.get('rendered')){self.updateLayoutRect();}});return self._super();}});});define("tinymce/ui/Toolbar",["tinymce/ui/Container"],function(Container){"use strict";return Container.extend({Defaults:{role:'toolbar',layout:'flow'},init:function(settings){var self=this;self._super(settings);self.classes.add('toolbar');},postRender:function(){var self=this;self.items().each(function(ctrl){ctrl.classes.add('toolbar-item');});return self._super();}});});define("tinymce/ui/MenuBar",["tinymce/ui/Toolbar"],function(Toolbar){"use strict";return Toolbar.extend({Defaults:{role:'menubar',containerCls:'menubar',ariaRoot:true,defaults:{type:'menubutton'}}});});define("tinymce/ui/MenuButton",["tinymce/ui/Button","tinymce/ui/Factory","tinymce/ui/MenuBar"],function(Button,Factory,MenuBar){"use strict";function isChildOf(node,parent){while(node){if(parent===node){return true;}
node=node.parentNode;}
return false;}
var MenuButton=Button.extend({init:function(settings){var self=this;self._renderOpen=true;self._super(settings);settings=self.settings;self.classes.add('menubtn');if(settings.fixedWidth){self.classes.add('fixed-width');}
self.aria('haspopup',true);self.state.set('menu',settings.menu||self.render());},showMenu:function(){var self=this,menu;if(self.menu&&self.menu.visible()){return self.hideMenu();}
if(!self.menu){menu=self.state.get('menu')||[];if(menu.length){menu={type:'menu',items:menu};}else{menu.type=menu.type||'menu';}
if(!menu.renderTo){self.menu=Factory.create(menu).parent(self).renderTo();}else{self.menu=menu.parent(self).show().renderTo();}
self.fire('createmenu');self.menu.reflow();self.menu.on('cancel',function(e){if(e.control.parent()===self.menu){e.stopPropagation();self.focus();self.hideMenu();}});self.menu.on('select',function(){self.focus();});self.menu.on('show hide',function(e){if(e.control==self.menu){self.activeMenu(e.type=='show');}
self.aria('expanded',e.type=='show');}).fire('show');}
self.menu.show();self.menu.layoutRect({w:self.layoutRect().w});self.menu.moveRel(self.getEl(),self.isRtl()?['br-tr','tr-br']:['bl-tl','tl-bl']);},hideMenu:function(){var self=this;if(self.menu){self.menu.items().each(function(item){if(item.hideMenu){item.hideMenu();}});self.menu.hide();}},activeMenu:function(state){this.classes.toggle('active',state);},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix;var icon=self.settings.icon,image,text=self.state.get('text'),textHtml='';image=self.settings.image;if(image){icon='none';if(typeof image!="string"){image=window.getSelection?image[0]:image[1];}
image=' style="background-image: url(\''+image+'\')"';}else{image='';}
if(text){self.classes.add('btn-has-text');textHtml='<span class="'+prefix+'txt">'+self.encode(text)+'</span>';}
icon=self.settings.icon?prefix+'ico '+prefix+'i-'+icon:'';self.aria('role',self.parent()instanceof MenuBar?'menuitem':'button');return('<div id="'+id+'" class="'+self.classes+'" tabindex="-1" aria-labelledby="'+id+'">'+
'<button id="'+id+'-open" role="presentation" type="button" tabindex="-1">'+
(icon?'<i class="'+icon+'"'+image+'></i>':'')+
textHtml+
' <i class="'+prefix+'caret"></i>'+
'</button>'+
'</div>');},postRender:function(){var self=this;self.on('click',function(e){if(e.control===self&&isChildOf(e.target,self.getEl())){self.showMenu();if(e.aria){self.menu.items()[0].focus();}}});self.on('mouseenter',function(e){var overCtrl=e.control,parent=self.parent(),hasVisibleSiblingMenu;if(overCtrl&&parent&&overCtrl instanceof MenuButton&&overCtrl.parent()==parent){parent.items().filter('MenuButton').each(function(ctrl){if(ctrl.hideMenu&&ctrl!=overCtrl){if(ctrl.menu&&ctrl.menu.visible()){hasVisibleSiblingMenu=true;}
ctrl.hideMenu();}});if(hasVisibleSiblingMenu){overCtrl.focus();overCtrl.showMenu();}}});return self._super();},bindStates:function(){var self=this;self.state.on('change:menu',function(){if(self.menu){self.menu.remove();}
self.menu=null;});return self._super();},remove:function(){this._super();if(this.menu){this.menu.remove();}}});return MenuButton;});define("tinymce/ui/MenuItem",["tinymce/ui/Widget","tinymce/ui/Factory","tinymce/Env","tinymce/util/Delay"],function(Widget,Factory,Env,Delay){"use strict";return Widget.extend({Defaults:{border:0,role:'menuitem'},init:function(settings){var self=this,text;self._super(settings);settings=self.settings;self.classes.add('menu-item');if(settings.menu){self.classes.add('menu-item-expand');}
if(settings.preview){self.classes.add('menu-item-preview');}
text=self.state.get('text');if(text==='-'||text==='|'){self.classes.add('menu-item-sep');self.aria('role','separator');self.state.set('text','-');}
if(settings.selectable){self.aria('role','menuitemcheckbox');self.classes.add('menu-item-checkbox');settings.icon='selected';}
if(!settings.preview&&!settings.selectable){self.classes.add('menu-item-normal');}
self.on('mousedown',function(e){e.preventDefault();});if(settings.menu&&!settings.ariaHideMenu){self.aria('haspopup',true);}},hasMenus:function(){return!!this.settings.menu;},showMenu:function(){var self=this,settings=self.settings,menu,parent=self.parent();parent.items().each(function(ctrl){if(ctrl!==self){ctrl.hideMenu();}});if(settings.menu){menu=self.menu;if(!menu){menu=settings.menu;if(menu.length){menu={type:'menu',items:menu};}else{menu.type=menu.type||'menu';}
if(parent.settings.itemDefaults){menu.itemDefaults=parent.settings.itemDefaults;}
menu=self.menu=Factory.create(menu).parent(self).renderTo();menu.reflow();menu.on('cancel',function(e){e.stopPropagation();self.focus();menu.hide();});menu.on('show hide',function(e){e.control.items().each(function(ctrl){ctrl.active(ctrl.settings.selected);});}).fire('show');menu.on('hide',function(e){if(e.control===menu){self.classes.remove('selected');}});menu.submenu=true;}else{menu.show();}
menu._parentMenu=parent;menu.classes.add('menu-sub');var rel=menu.testMoveRel(self.getEl(),self.isRtl()?['tl-tr','bl-br','tr-tl','br-bl']:['tr-tl','br-bl','tl-tr','bl-br']);menu.moveRel(self.getEl(),rel);menu.rel=rel;rel='menu-sub-'+rel;menu.classes.remove(menu._lastRel).add(rel);menu._lastRel=rel;self.classes.add('selected');self.aria('expanded',true);}},hideMenu:function(){var self=this;if(self.menu){self.menu.items().each(function(item){if(item.hideMenu){item.hideMenu();}});self.menu.hide();self.aria('expanded',false);}
return self;},renderHtml:function(){var self=this,id=self._id,settings=self.settings,prefix=self.classPrefix,text=self.encode(self.state.get('text'));var icon=self.settings.icon,image='',shortcut=settings.shortcut;function convertShortcut(shortcut){var i,value,replace={};if(Env.mac){replace={alt:'&#x2325;',ctrl:'&#x2318;',shift:'&#x21E7;',meta:'&#x2318;'};}else{replace={meta:'Ctrl'};}
shortcut=shortcut.split('+');for(i=0;i<shortcut.length;i++){value=replace[shortcut[i].toLowerCase()];if(value){shortcut[i]=value;}}
return shortcut.join('+');}
if(icon){self.parent().classes.add('menu-has-icons');}
if(settings.image){image=' style="background-image: url(\''+settings.image+'\')"';}
if(shortcut){shortcut=convertShortcut(shortcut);}
icon=prefix+'ico '+prefix+'i-'+(self.settings.icon||'none');return('<div id="'+id+'" class="'+self.classes+'" tabindex="-1">'+
(text!=='-'?'<i class="'+icon+'"'+image+'></i>\u00a0':'')+
(text!=='-'?'<span id="'+id+'-text" class="'+prefix+'text">'+text+'</span>':'')+
(shortcut?'<div id="'+id+'-shortcut" class="'+prefix+'menu-shortcut">'+shortcut+'</div>':'')+
(settings.menu?'<div class="'+prefix+'caret"></div>':'')+
'</div>');},postRender:function(){var self=this,settings=self.settings;var textStyle=settings.textStyle;if(typeof textStyle=="function"){textStyle=textStyle.call(this);}
if(textStyle){var textElm=self.getEl('text');if(textElm){textElm.setAttribute('style',textStyle);}}
self.on('mouseenter click',function(e){if(e.control===self){if(!settings.menu&&e.type==='click'){self.fire('select');Delay.requestAnimationFrame(function(){self.parent().hideAll();});}else{self.showMenu();if(e.aria){self.menu.focus(true);}}}});self._super();return self;},hover:function(){var self=this;self.parent().items().each(function(ctrl){ctrl.classes.remove('selected');});self.classes.toggle('selected',true);return self;},active:function(state){if(typeof state!="undefined"){this.aria('checked',state);}
return this._super(state);},remove:function(){this._super();if(this.menu){this.menu.remove();}}});});define("tinymce/ui/Throbber",["tinymce/dom/DomQuery","tinymce/ui/Control","tinymce/util/Delay"],function($,Control,Delay){"use strict";return function(elm,inline){var self=this,state,classPrefix=Control.classPrefix,timer;self.show=function(time,callback){function render(){if(state){$(elm).append('<div class="'+classPrefix+'throbber'+(inline?' '+classPrefix+'throbber-inline':'')+'"></div>');if(callback){callback();}}}
self.hide();state=true;if(time){timer=Delay.setTimeout(render,time);}else{render();}
return self;};self.hide=function(){var child=elm.lastChild;Delay.clearTimeout(timer);if(child&&child.className.indexOf('throbber')!=-1){child.parentNode.removeChild(child);}
state=false;return self;};};});define("tinymce/ui/Menu",["tinymce/ui/FloatPanel","tinymce/ui/MenuItem","tinymce/ui/Throbber","tinymce/util/Tools"],function(FloatPanel,MenuItem,Throbber,Tools){"use strict";return FloatPanel.extend({Defaults:{defaultType:'menuitem',border:1,layout:'stack',role:'application',bodyRole:'menu',ariaRoot:true},init:function(settings){var self=this;settings.autohide=true;settings.constrainToViewport=true;if(typeof settings.items==='function'){settings.itemsFactory=settings.items;settings.items=[];}
if(settings.itemDefaults){var items=settings.items,i=items.length;while(i--){items[i]=Tools.extend({},settings.itemDefaults,items[i]);}}
self._super(settings);self.classes.add('menu');},repaint:function(){this.classes.toggle('menu-align',true);this._super();this.getEl().style.height='';this.getEl('body').style.height='';return this;},cancel:function(){var self=this;self.hideAll();self.fire('select');},load:function(){var self=this,time,factory;function hideThrobber(){if(self.throbber){self.throbber.hide();self.throbber=null;}}
factory=self.settings.itemsFactory;if(!factory){return;}
if(!self.throbber){self.throbber=new Throbber(self.getEl('body'),true);if(self.items().length===0){self.throbber.show();self.fire('loading');}else{self.throbber.show(100,function(){self.items().remove();self.fire('loading');});}
self.on('hide close',hideThrobber);}
self.requestTime=time=new Date().getTime();self.settings.itemsFactory(function(items){if(items.length===0){self.hide();return;}
if(self.requestTime!==time){return;}
self.getEl().style.width='';self.getEl('body').style.width='';hideThrobber();self.items().remove();self.getEl('body').innerHTML='';self.add(items);self.renderNew();self.fire('loaded');});},hideAll:function(){var self=this;this.find('menuitem').exec('hideMenu');return self._super();},preRender:function(){var self=this;self.items().each(function(ctrl){var settings=ctrl.settings;if(settings.icon||settings.image||settings.selectable){self._hasIcons=true;return false;}});if(self.settings.itemsFactory){self.on('postrender',function(){if(self.settings.itemsFactory){self.load();}});}
return self._super();}});});define("tinymce/ui/ListBox",["tinymce/ui/MenuButton","tinymce/ui/Menu"],function(MenuButton,Menu){"use strict";return MenuButton.extend({init:function(settings){var self=this,values,selected,selectedText,lastItemCtrl;function setSelected(menuValues){for(var i=0;i<menuValues.length;i++){selected=menuValues[i].selected||settings.value===menuValues[i].value;if(selected){selectedText=selectedText||menuValues[i].text;self.state.set('value',menuValues[i].value);return true;}
if(menuValues[i].menu){if(setSelected(menuValues[i].menu)){return true;}}}}
self._super(settings);settings=self.settings;self._values=values=settings.values;if(values){if(typeof settings.value!="undefined"){setSelected(values);}
if(!selected&&values.length>0){selectedText=values[0].text;self.state.set('value',values[0].value);}
self.state.set('menu',values);}
self.state.set('text',settings.text||selectedText);self.classes.add('listbox');self.on('select',function(e){var ctrl=e.control;if(lastItemCtrl){e.lastControl=lastItemCtrl;}
if(settings.multiple){ctrl.active(!ctrl.active());}else{self.value(e.control.value());}
lastItemCtrl=ctrl;});},bindStates:function(){var self=this;function activateMenuItemsByValue(menu,value){if(menu instanceof Menu){menu.items().each(function(ctrl){if(!ctrl.hasMenus()){ctrl.active(ctrl.value()===value);}});}}
function getSelectedItem(menuValues,value){var selectedItem;if(!menuValues){return;}
for(var i=0;i<menuValues.length;i++){if(menuValues[i].value===value){return menuValues[i];}
if(menuValues[i].menu){selectedItem=getSelectedItem(menuValues[i].menu,value);if(selectedItem){return selectedItem;}}}}
self.on('show',function(e){activateMenuItemsByValue(e.control,self.value());});self.state.on('change:value',function(e){var selectedItem=getSelectedItem(self.state.get('menu'),e.value);if(selectedItem){self.text(selectedItem.text);}else{self.text(self.settings.text);}});return self._super();}});});define("tinymce/ui/Radio",["tinymce/ui/Checkbox"],function(Checkbox){"use strict";return Checkbox.extend({Defaults:{classes:"radio",role:"radio"}});});define("tinymce/ui/ResizeHandle",["tinymce/ui/Widget","tinymce/ui/DragHelper"],function(Widget,DragHelper){"use strict";return Widget.extend({renderHtml:function(){var self=this,prefix=self.classPrefix;self.classes.add('resizehandle');if(self.settings.direction=="both"){self.classes.add('resizehandle-both');}
self.canFocus=false;return('<div id="'+self._id+'" class="'+self.classes+'">'+
'<i class="'+prefix+'ico '+prefix+'i-resize"></i>'+
'</div>');},postRender:function(){var self=this;self._super();self.resizeDragHelper=new DragHelper(this._id,{start:function(){self.fire('ResizeStart');},drag:function(e){if(self.settings.direction!="both"){e.deltaX=0;}
self.fire('Resize',e);},stop:function(){self.fire('ResizeEnd');}});},remove:function(){if(this.resizeDragHelper){this.resizeDragHelper.destroy();}
return this._super();}});});define("tinymce/ui/SelectBox",["tinymce/ui/Widget"],function(Widget){"use strict";function createOptions(options){var strOptions='';if(options){for(var i=0;i<options.length;i++){strOptions+='<option value="'+options[i]+'">'+options[i]+'</option>';}}
return strOptions;}
return Widget.extend({Defaults:{classes:"selectbox",role:"selectbox",options:[]},init:function(settings){var self=this;self._super(settings);if(self.settings.size){self.size=self.settings.size;}
if(self.settings.options){self._options=self.settings.options;}
self.on('keydown',function(e){var rootControl;if(e.keyCode==13){e.preventDefault();self.parents().reverse().each(function(ctrl){if(ctrl.toJSON){rootControl=ctrl;return false;}});self.fire('submit',{data:rootControl.toJSON()});}});},options:function(state){if(!arguments.length){return this.state.get('options');}
this.state.set('options',state);return this;},renderHtml:function(){var self=this,options,size='';options=createOptions(self._options);if(self.size){size=' size = "'+self.size+'"';}
return('<select id="'+self._id+'" class="'+self.classes+'"'+size+'>'+
options+
'</select>');},bindStates:function(){var self=this;self.state.on('change:options',function(e){self.getEl().innerHTML=createOptions(e.value);});return self._super();}});});define("tinymce/ui/Slider",["tinymce/ui/Widget","tinymce/ui/DragHelper","tinymce/ui/DomUtils"],function(Widget,DragHelper,DomUtils){"use strict";function constrain(value,minVal,maxVal){if(value<minVal){value=minVal;}
if(value>maxVal){value=maxVal;}
return value;}
function setAriaProp(el,name,value){el.setAttribute('aria-'+name,value);}
function updateSliderHandle(ctrl,value){var maxHandlePos,shortSizeName,sizeName,stylePosName,styleValue,handleEl;if(ctrl.settings.orientation=="v"){stylePosName="top";sizeName="height";shortSizeName="h";}else{stylePosName="left";sizeName="width";shortSizeName="w";}
handleEl=ctrl.getEl('handle');maxHandlePos=(ctrl.layoutRect()[shortSizeName]||100)-DomUtils.getSize(handleEl)[sizeName];styleValue=(maxHandlePos*((value-ctrl._minValue)/(ctrl._maxValue-ctrl._minValue)))+'px';handleEl.style[stylePosName]=styleValue;handleEl.style.height=ctrl.layoutRect().h+'px';setAriaProp(handleEl,'valuenow',value);setAriaProp(handleEl,'valuetext',''+ctrl.settings.previewFilter(value));setAriaProp(handleEl,'valuemin',ctrl._minValue);setAriaProp(handleEl,'valuemax',ctrl._maxValue);}
return Widget.extend({init:function(settings){var self=this;if(!settings.previewFilter){settings.previewFilter=function(value){return Math.round(value*100)/100.0;};}
self._super(settings);self.classes.add('slider');if(settings.orientation=="v"){self.classes.add('vertical');}
self._minValue=settings.minValue||0;self._maxValue=settings.maxValue||100;self._initValue=self.state.get('value');},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix;return('<div id="'+id+'" class="'+self.classes+'">'+
'<div id="'+id+'-handle" class="'+prefix+'slider-handle" role="slider" tabindex="-1"></div>'+
'</div>');},reset:function(){this.value(this._initValue).repaint();},postRender:function(){var self=this,minValue,maxValue,screenCordName,stylePosName,sizeName,shortSizeName;function toFraction(min,max,val){return(val+min)/(max-min);}
function fromFraction(min,max,val){return(val*(max-min))-min;}
function handleKeyboard(minValue,maxValue){function alter(delta){var value;value=self.value();value=fromFraction(minValue,maxValue,toFraction(minValue,maxValue,value)+(delta*0.05));value=constrain(value,minValue,maxValue);self.value(value);self.fire('dragstart',{value:value});self.fire('drag',{value:value});self.fire('dragend',{value:value});}
self.on('keydown',function(e){switch(e.keyCode){case 37:case 38:alter(-1);break;case 39:case 40:alter(1);break;}});}
function handleDrag(minValue,maxValue,handleEl){var startPos,startHandlePos,maxHandlePos,handlePos,value;self._dragHelper=new DragHelper(self._id,{handle:self._id+"-handle",start:function(e){startPos=e[screenCordName];startHandlePos=parseInt(self.getEl('handle').style[stylePosName],10);maxHandlePos=(self.layoutRect()[shortSizeName]||100)-DomUtils.getSize(handleEl)[sizeName];self.fire('dragstart',{value:value});},drag:function(e){var delta=e[screenCordName]-startPos;handlePos=constrain(startHandlePos+delta,0,maxHandlePos);handleEl.style[stylePosName]=handlePos+'px';value=minValue+(handlePos/maxHandlePos)*(maxValue-minValue);self.value(value);self.tooltip().text(''+self.settings.previewFilter(value)).show().moveRel(handleEl,'bc tc');self.fire('drag',{value:value});},stop:function(){self.tooltip().hide();self.fire('dragend',{value:value});}});}
minValue=self._minValue;maxValue=self._maxValue;if(self.settings.orientation=="v"){screenCordName="screenY";stylePosName="top";sizeName="height";shortSizeName="h";}else{screenCordName="screenX";stylePosName="left";sizeName="width";shortSizeName="w";}
self._super();handleKeyboard(minValue,maxValue,self.getEl('handle'));handleDrag(minValue,maxValue,self.getEl('handle'));},repaint:function(){this._super();updateSliderHandle(this,this.value());},bindStates:function(){var self=this;self.state.on('change:value',function(e){updateSliderHandle(self,e.value);});return self._super();}});});define("tinymce/ui/Spacer",["tinymce/ui/Widget"],function(Widget){"use strict";return Widget.extend({renderHtml:function(){var self=this;self.classes.add('spacer');self.canFocus=false;return '<div id="'+self._id+'" class="'+self.classes+'"></div>';}});});define("tinymce/ui/SplitButton",["tinymce/ui/MenuButton","tinymce/ui/DomUtils","tinymce/dom/DomQuery"],function(MenuButton,DomUtils,$){return MenuButton.extend({Defaults:{classes:"widget btn splitbtn",role:"button"},repaint:function(){var self=this,elm=self.getEl(),rect=self.layoutRect(),mainButtonElm,menuButtonElm;self._super();mainButtonElm=elm.firstChild;menuButtonElm=elm.lastChild;$(mainButtonElm).css({width:rect.w-DomUtils.getSize(menuButtonElm).width,height:rect.h-2});$(menuButtonElm).css({height:rect.h-2});return self;},activeMenu:function(state){var self=this;$(self.getEl().lastChild).toggleClass(self.classPrefix+'active',state);},renderHtml:function(){var self=this,id=self._id,prefix=self.classPrefix,image;var icon=self.state.get('icon'),text=self.state.get('text'),textHtml='';image=self.settings.image;if(image){icon='none';if(typeof image!="string"){image=window.getSelection?image[0]:image[1];}
image=' style="background-image: url(\''+image+'\')"';}else{image='';}
icon=self.settings.icon?prefix+'ico '+prefix+'i-'+icon:'';if(text){self.classes.add('btn-has-text');textHtml='<span class="'+prefix+'txt">'+self.encode(text)+'</span>';}
return('<div id="'+id+'" class="'+self.classes+'" role="button" tabindex="-1">'+
'<button type="button" hidefocus="1" tabindex="-1">'+
(icon?'<i class="'+icon+'"'+image+'></i>':'')+
textHtml+
'</button>'+
'<button type="button" class="'+prefix+'open" hidefocus="1" tabindex="-1">'+
(self._menuBtnText?(icon?'\u00a0':'')+self._menuBtnText:'')+
' <i class="'+prefix+'caret"></i>'+
'</button>'+
'</div>');},postRender:function(){var self=this,onClickHandler=self.settings.onclick;self.on('click',function(e){var node=e.target;if(e.control==this){while(node){if((e.aria&&e.aria.key!='down')||(node.nodeName=='BUTTON'&&node.className.indexOf('open')==-1)){e.stopImmediatePropagation();if(onClickHandler){onClickHandler.call(this,e);}
return;}
node=node.parentNode;}}});delete self.settings.onclick;return self._super();}});});define("tinymce/ui/StackLayout",["tinymce/ui/FlowLayout"],function(FlowLayout){"use strict";return FlowLayout.extend({Defaults:{containerClass:'stack-layout',controlClass:'stack-layout-item',endClass:'break'},isNative:function(){return true;}});});define("tinymce/ui/TabPanel",["tinymce/ui/Panel","tinymce/dom/DomQuery","tinymce/ui/DomUtils"],function(Panel,$,DomUtils){"use strict";return Panel.extend({Defaults:{layout:'absolute',defaults:{type:'panel'}},activateTab:function(idx){var activeTabElm;if(this.activeTabId){activeTabElm=this.getEl(this.activeTabId);$(activeTabElm).removeClass(this.classPrefix+'active');activeTabElm.setAttribute('aria-selected',"false");}
this.activeTabId='t'+idx;activeTabElm=this.getEl('t'+idx);activeTabElm.setAttribute('aria-selected',"true");$(activeTabElm).addClass(this.classPrefix+'active');this.items()[idx].show().fire('showtab');this.reflow();this.items().each(function(item,i){if(idx!=i){item.hide();}});},renderHtml:function(){var self=this,layout=self._layout,tabsHtml='',prefix=self.classPrefix;self.preRender();layout.preRender(self);self.items().each(function(ctrl,i){var id=self._id+'-t'+i;ctrl.aria('role','tabpanel');ctrl.aria('labelledby',id);tabsHtml+=('<div id="'+id+'" class="'+prefix+'tab" '+
'unselectable="on" role="tab" aria-controls="'+ctrl._id+'" aria-selected="false" tabIndex="-1">'+
self.encode(ctrl.settings.title)+
'</div>');});return('<div id="'+self._id+'" class="'+self.classes+'" hidefocus="1" tabindex="-1">'+
'<div id="'+self._id+'-head" class="'+prefix+'tabs" role="tablist">'+
tabsHtml+
'</div>'+
'<div id="'+self._id+'-body" class="'+self.bodyClasses+'">'+
layout.renderHtml(self)+
'</div>'+
'</div>');},postRender:function(){var self=this;self._super();self.settings.activeTab=self.settings.activeTab||0;self.activateTab(self.settings.activeTab);this.on('click',function(e){var targetParent=e.target.parentNode;if(e.target.parentNode.id==self._id+'-head'){var i=targetParent.childNodes.length;while(i--){if(targetParent.childNodes[i]==e.target){self.activateTab(i);}}}});},initLayoutRect:function(){var self=this,rect,minW,minH;minW=DomUtils.getSize(self.getEl('head')).width;minW=minW<0?0:minW;minH=0;self.items().each(function(item){minW=Math.max(minW,item.layoutRect().minW);minH=Math.max(minH,item.layoutRect().minH);});self.items().each(function(ctrl){ctrl.settings.x=0;ctrl.settings.y=0;ctrl.settings.w=minW;ctrl.settings.h=minH;ctrl.layoutRect({x:0,y:0,w:minW,h:minH});});var headH=DomUtils.getSize(self.getEl('head')).height;self.settings.minWidth=minW;self.settings.minHeight=minH+headH;rect=self._super();rect.deltaH+=headH;rect.innerH=rect.h-rect.deltaH;return rect;}});});define("tinymce/ui/TextBox",["tinymce/ui/Widget","tinymce/util/Tools","tinymce/ui/DomUtils"],function(Widget,Tools,DomUtils){return Widget.extend({init:function(settings){var self=this;self._super(settings);self.classes.add('textbox');if(settings.multiline){self.classes.add('multiline');}else{self.on('keydown',function(e){var rootControl;if(e.keyCode==13){e.preventDefault();self.parents().reverse().each(function(ctrl){if(ctrl.toJSON){rootControl=ctrl;return false;}});self.fire('submit',{data:rootControl.toJSON()});}});self.on('keyup',function(e){self.state.set('value',e.target.value);});}},repaint:function(){var self=this,style,rect,borderBox,borderW,borderH=0,lastRepaintRect;style=self.getEl().style;rect=self._layoutRect;lastRepaintRect=self._lastRepaintRect||{};var doc=document;if(!self.settings.multiline&&doc.all&&(!doc.documentMode||doc.documentMode<=8)){style.lineHeight=(rect.h-borderH)+'px';}
borderBox=self.borderBox;borderW=borderBox.left+borderBox.right+8;borderH=borderBox.top+borderBox.bottom+(self.settings.multiline?8:0);if(rect.x!==lastRepaintRect.x){style.left=rect.x+'px';lastRepaintRect.x=rect.x;}
if(rect.y!==lastRepaintRect.y){style.top=rect.y+'px';lastRepaintRect.y=rect.y;}
if(rect.w!==lastRepaintRect.w){style.width=(rect.w-borderW)+'px';lastRepaintRect.w=rect.w;}
if(rect.h!==lastRepaintRect.h){style.height=(rect.h-borderH)+'px';lastRepaintRect.h=rect.h;}
self._lastRepaintRect=lastRepaintRect;self.fire('repaint',{},false);return self;},renderHtml:function(){var self=this,settings=self.settings,attrs,elm;attrs={id:self._id,hidefocus:'1'};Tools.each(['rows','spellcheck','maxLength','size','readonly','min','max','step','list','pattern','placeholder','required','multiple'],function(name){attrs[name]=settings[name];});if(self.disabled()){attrs.disabled='disabled';}
if(settings.subtype){attrs.type=settings.subtype;}
elm=DomUtils.create(settings.multiline?'textarea':'input',attrs);elm.value=self.state.get('value');elm.className=self.classes;return elm.outerHTML;},value:function(value){if(arguments.length){this.state.set('value',value);return this;}
if(this.state.get('rendered')){this.state.set('value',this.getEl().value);}
return this.state.get('value');},postRender:function(){var self=this;self.getEl().value=self.state.get('value');self._super();self.$el.on('change',function(e){self.state.set('value',e.target.value);self.fire('change',e);});},bindStates:function(){var self=this;self.state.on('change:value',function(e){if(self.getEl().value!=e.value){self.getEl().value=e.value;}});self.state.on('change:disabled',function(e){self.getEl().disabled=e.value;});return self._super();},remove:function(){this.$el.off();this._super();}});});define("tinymce/Register",[],function(){var context=this||window;var tinymce=function(){return context.tinymce;};if(typeof context.define==="function"){if(!context.define.amd){context.define("ephox/tinymce",[],tinymce);}}
return{};});expose(["tinymce/geom/Rect","tinymce/util/Promise","tinymce/util/Delay","tinymce/Env","tinymce/dom/EventUtils","tinymce/dom/Sizzle","tinymce/util/Tools","tinymce/dom/DomQuery","tinymce/html/Styles","tinymce/dom/TreeWalker","tinymce/html/Entities","tinymce/dom/DOMUtils","tinymce/dom/ScriptLoader","tinymce/AddOnManager","tinymce/dom/RangeUtils","tinymce/html/Node","tinymce/html/Schema","tinymce/html/SaxParser","tinymce/html/DomParser","tinymce/html/Writer","tinymce/html/Serializer","tinymce/dom/Serializer","tinymce/util/VK","tinymce/dom/ControlSelection","tinymce/dom/BookmarkManager","tinymce/dom/Selection","tinymce/Formatter","tinymce/UndoManager","tinymce/EditorCommands","tinymce/util/URI","tinymce/util/Class","tinymce/util/EventDispatcher","tinymce/util/Observable","tinymce/ui/Selector","tinymce/ui/Collection","tinymce/ui/ReflowQueue","tinymce/ui/Control","tinymce/ui/Factory","tinymce/ui/KeyboardNavigation","tinymce/ui/Container","tinymce/ui/DragHelper","tinymce/ui/Scrollable","tinymce/ui/Panel","tinymce/ui/Movable","tinymce/ui/Resizable","tinymce/ui/FloatPanel","tinymce/ui/Window","tinymce/ui/MessageBox","tinymce/WindowManager","tinymce/ui/Tooltip","tinymce/ui/Widget","tinymce/ui/Progress","tinymce/ui/Notification","tinymce/NotificationManager","tinymce/EditorObservable","tinymce/Shortcuts","tinymce/Editor","tinymce/util/I18n","tinymce/FocusManager","tinymce/EditorManager","tinymce/util/XHR","tinymce/util/JSON","tinymce/util/JSONRequest","tinymce/util/JSONP","tinymce/util/LocalStorage","tinymce/Compat","tinymce/ui/Layout","tinymce/ui/AbsoluteLayout","tinymce/ui/Button","tinymce/ui/ButtonGroup","tinymce/ui/Checkbox","tinymce/ui/ComboBox","tinymce/ui/ColorBox","tinymce/ui/PanelButton","tinymce/ui/ColorButton","tinymce/util/Color","tinymce/ui/ColorPicker","tinymce/ui/Path","tinymce/ui/ElementPath","tinymce/ui/FormItem","tinymce/ui/Form","tinymce/ui/FieldSet","tinymce/ui/FilePicker","tinymce/ui/FitLayout","tinymce/ui/FlexLayout","tinymce/ui/FlowLayout","tinymce/ui/FormatControls","tinymce/ui/GridLayout","tinymce/ui/Iframe","tinymce/ui/InfoBox","tinymce/ui/Label","tinymce/ui/Toolbar","tinymce/ui/MenuBar","tinymce/ui/MenuButton","tinymce/ui/MenuItem","tinymce/ui/Throbber","tinymce/ui/Menu","tinymce/ui/ListBox","tinymce/ui/Radio","tinymce/ui/ResizeHandle","tinymce/ui/SelectBox","tinymce/ui/Slider","tinymce/ui/Spacer","tinymce/ui/SplitButton","tinymce/ui/StackLayout","tinymce/ui/TabPanel","tinymce/ui/TextBox"]);})(this);