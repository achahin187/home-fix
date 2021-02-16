/*!* XRegExp 2.0.0 <xregexp.com> MIT License*/var XRegExp;XRegExp=XRegExp||function(n){"use strict";function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":"")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError("type RegExp expected");var f=i.replace.call(g(n)+(r||""),h,"");return u&&(f=i.replace.call(f,new RegExp("["+u+"]+","g"),"")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()==="[object "+t+"]"}function d(n){return n=n||{},n==="all"||n.all?n={natives:!0,extensibility:!0}:s(n,"string")&&(n=t.forEach(n,/[^\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope==="all"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?"on":"off"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e="default",rt="class",it={"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,"class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/},et=/\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,h=/([\s\S])(?=[\s\S]*\1)/g,nt=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,ft=i.exec.call(/()??/,"")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w="gim"+(l?"y":"");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError("can't supply flags when constructing one RegExp from another");return o(r)}if(y)throw new Error("can't call the XRegExp constructor within token definition functions");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?"":String(r),u=u===n?"":String(u),i.match.call(u,h))throw new SyntaxError("invalid duplicate regular expression flag");for(r=i.replace.call(r,/^\(\?([\w$]+)\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError("can't use flag g or y in mode modifier");return u=i.replace.call(u+t,h,""),""}),t.forEach(u,/[\s\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError("invalid regular expression flag "+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p==="["?a=rt:p==="]"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(""),i.replace.call(u,/[^gimy]+/g,"")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,"g"+(l?"y":"")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,""))},off:function(){throw new Error("extensibility must be installed before using addToken");}},t.addToken=c.off,t.cache=function(n,i){var r=n+"/"+(i||"");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},t.exec=function(n,t,i,u){var e=o(t,"g"+(u&&l?"y":""),u===!1?"y":""),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,"g")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,"regexp")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||"":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e="all"),s=o(u,e==="all"?"g":"",e==="all"?"":"g")):e==="all"&&(s=new RegExp(t.escape(String(u)),"g")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return"(?<"+r+">"}else if(i)return"\\"+(+i+f);return n},e=[],r,u;if(!(s(n,"array")&&n.length))throw new TypeError("patterns must be a nonempty array");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join("|"),i)},t.version="2.0.0",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,"")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),"g","")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+="",s(r,"function")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||"";if(f=u?a(u,i):-1,f<0)throw new SyntaxError("backreference to undefined group "+t);return n[f+1]||""}if(r==="$")return"$";if(r==="&"||+r==0)return n[0];if(r==="`")return n[n.length-1].slice(0,n[n.length-2]);if(r==="'")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError("backreference to undefined group "+t);return n[r]||""}throw new SyntaxError("invalid token "+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,"")||s)&&f.push(""):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,function(n,t){if(n[1]==="B"&&t===e)return n[0];throw new SyntaxError("invalid escape "+n[0]);},{scope:"all"}),u(/\[(\^?)]/,function(n){return n[1]?"[\\s\\S]":"\\b\\B"}),u(/(?:\(\?#[^)]*\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"}),u(/\\k<([\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError("backreference to undefined group "+n[0]);return"\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?"":"(?:)")}),u(/(?:\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"},{trigger:function(){return this.hasFlag("x")},customFlags:"x"}),u(/\./,function(){return"[\\s\\S]"},{trigger:function(){return this.hasFlag("s")},customFlags:"s"}),u(/\(\?P?<([\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError("can't use integer as capture name "+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,"("}),u(/\\(\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!=="0")throw new SyntaxError("can't use octal escape or backreference to undefined group "+n[0]);return n[0]},{scope:"all"}),u(/\((?!\?)/,function(){return this.hasFlag("n")?"(?:":(this.captureNames.push(null),"(")},{customFlags:"n"}),typeof exports!="undefined"&&(exports.XRegExp=t),t}()/*!* SyntaxHighlighter by Alex Gorbatchev
* https://github.com/alexgorbatchev/SyntaxHighlighter - MIT license*/
if(typeof(SyntaxHighlighter)=='undefined')var SyntaxHighlighter=function(){if(typeof(require)!='undefined'&&typeof(XRegExp)=='undefined')
{XRegExp=require('xregexp').XRegExp;}
var sh={defaults:{'class-name':'','first-line':1,'pad-line-numbers':false,'highlight':null,'title':null,'smart-tabs':true,'tab-size':4,'gutter':true,'toolbar':true,'quick-code':true,'collapse':false,'auto-links':true,'light':false,'unindent':true,'html-script':false},config:{space:'&nbsp;',useScriptTags:true,bloggerMode:false,stripBrs:false,tagName:'pre',strings:{expandSource:'expand source',help:'?',alert:'SyntaxHighlighter\n\n',noBrush:'Can\'t find brush for: ',brushNotHtmlScript:'Brush wasn\'t configured for html-script option: ',aboutDialog:''}},vars:{discoveredBrushes:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:XRegExp('/\\*.*?\\*/','gs'),singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:XRegExp('"([^\\\\"]|\\\\.)*"','gs'),multiLineSingleQuotedString:XRegExp("'([^\\\\']|\\\\.)*'",'gs'),xmlComments:XRegExp('(&lt;|<)!--.*?--(&gt;|>)','gs'),url:/\w+:\/\/[\w-.\/?%&=:@;#,]*/g,phpScriptTags:{left:/(&lt;|<)\?(?:=|php)?/g,right:/\?(&gt;|>)/g,'eof':true},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{getHtml:function(highlighter)
{var html='<div class="toolbar">',items=sh.toolbar.items,list=items.list;function defaultGetHtml(highlighter,name)
{return sh.toolbar.getButtonHtml(highlighter,name,sh.config.strings[name]);}
for(var i=0,l=list.length;i<l;i++)
{html+=(items[list[i]].getHtml||defaultGetHtml)(highlighter,list[i]);}
html+='</div>';return html;},getButtonHtml:function(highlighter,commandName,label)
{return '<span><a href="#" class="toolbar_item'
+' command_'+commandName
+' '+commandName
+'">'+label+'</a></span>';},handler:function(e)
{var target=e.target,className=target.className||'';function getValue(name)
{var r=new RegExp(name+'_(\\w+)'),match=r.exec(className);return match?match[1]:null;}
var highlighter=getHighlighterById(findParentElement(target,'.syntaxhighlighter').id),commandName=getValue('command');if(highlighter&&commandName&&sh.toolbar.items[commandName]&&sh.toolbar.items[commandName].execute){sh.toolbar.items[commandName].execute(highlighter);}
e.preventDefault();},items:{list:['expandSource','language'],expandSource:{getHtml:function(highlighter)
{if(highlighter.getParam('collapse')!=true)
return '';var title=highlighter.getParam('title');return sh.toolbar.getButtonHtml(highlighter,'expandSource',title?title:sh.config.strings.expandSource);},execute:function(highlighter)
{var div=getHighlighterDivById(highlighter.id);removeClass(div,'collapsed');}},help:{execute:function(highlighter)
{var wnd=popup('','_blank',500,250,'scrollbars=0'),doc=wnd.document;doc.write(sh.config.strings.aboutDialog);doc.close();wnd.focus();}},language:{getHtml:function(highlighter){return highlighter.langLabel?sh.toolbar.getButtonHtml(highlighter,'lang',highlighter.langLabel):'';}}}},findElements:function(globalParams,element)
{var elements=element?[element]:toArray(document.getElementsByTagName(sh.config.tagName)),conf=sh.config,result=[];if(conf.useScriptTags)
elements=elements.concat(getSyntaxHighlighterScriptTags());if(elements.length===0)
return result;for(var i=0,l=elements.length;i<l;i++)
{var item={target:elements[i],params:merge(globalParams,parseParams(elements[i].className))};if(item.params['brush']==null)
continue;result.push(item);}
return result;},highlight:function(globalParams,element)
{var userAgent=navigator.appVersion;if(userAgent.indexOf("MSIE 8.")!==-1||userAgent.indexOf("MSIE 7.")!==-1||userAgent.indexOf("MSIE 6.")!==-1){return;}
var elements=this.findElements(globalParams,element),propertyName='innerHTML',highlighter=null,conf=sh.config;if(elements.length===0)
return;for(var i=0,l=elements.length;i<l;i++)
{var element=elements[i],target=element.target,params=element.params,brushName=params.brush,code;if(brushName==null)
continue;if(params['html-script']=='true'||sh.defaults['html-script']==true)
{highlighter=new sh.HtmlScript(brushName);brushName='htmlscript';}
else
{var brush=findBrush(brushName);if(brush)
highlighter=new brush();else
continue;}
code=target[propertyName];if(conf.useScriptTags)
code=stripCData(code);if((target.title||'')!='')
params.title=target.title;params['brush']=brushName;highlighter.init(params);element=highlighter.getDiv(code);if((target.id||'')!='')
element.id=target.id;target.parentNode.replaceChild(element,target);}},all:function(params)
{attachEvent(window,'load',function(){sh.highlight(params);});}};function hasClass(target,className)
{return target.className.indexOf(className)!=-1;};function addClass(target,className)
{if(!hasClass(target,className))
target.className+=' '+className;};function removeClass(target,className)
{target.className=target.className.replace(className,'');};function toArray(source)
{var result=[];for(var i=0,l=source.length;i<l;i++)
result.push(source[i]);return result;};function splitLines(block)
{return block.split(/\r?\n/);}
function getHighlighterId(id)
{var prefix='highlighter_';return id.indexOf(prefix)==0?id:prefix+id;};function getHighlighterById(id)
{return sh.vars.highlighters[getHighlighterId(id)];};function getHighlighterDivById(id)
{return document.getElementById(getHighlighterId(id));};function storeHighlighter(highlighter)
{sh.vars.highlighters[getHighlighterId(highlighter.id)]=highlighter;};function findElement(target,search,reverse)
{if(target==null)
return null;var nodes=reverse!=true?target.childNodes:[target.parentNode],propertyToFind={'#':'id','.':'className'}[search.substr(0,1)]||'nodeName',expectedValue,found;expectedValue=propertyToFind!='nodeName'?search.substr(1):search.toUpperCase();if((target[propertyToFind]||'').indexOf(expectedValue)!=-1)
return target;for(var i=0,l=nodes.length;nodes&&i<l&&found==null;i++)
found=findElement(nodes[i],search,reverse);return found;};function findParentElement(target,className)
{return findElement(target,className,true);};function indexOf(array,searchElement,fromIndex)
{fromIndex=Math.max(fromIndex||0,0);for(var i=fromIndex,l=array.length;i<l;i++)
if(array[i]==searchElement)
return i;return-1;};function guid(prefix)
{return(prefix||'')+Math.round(Math.random()*1000000).toString();};function merge(obj1,obj2)
{var result={},name;for(name in obj1)
result[name]=obj1[name];for(name in obj2)
result[name]=obj2[name];return result;};function toBoolean(value)
{var result={"true":true,"false":false}[value];return result==null?value:result;};function popup(url,name,width,height,options)
{var x=(screen.width-width)/2,y=(screen.height-height)/2;options+=', left='+x+
', top='+y+
', width='+width+
', height='+height;options=options.replace(/^,/,'');var win=window.open(url,name,options);win.focus();return win;};function attachEvent(obj,type,func,scope)
{function handler(e)
{e=e||window.event;if(!e.target)
{e.target=e.srcElement;e.preventDefault=function()
{this.returnValue=false;};}
func.call(scope||window,e);};if(obj.attachEvent)
{obj.attachEvent('on'+type,handler);}
else
{obj.addEventListener(type,handler,false);}};function alert(str)
{window.alert(sh.config.strings.alert+str);};function findBrush(alias,showAlert)
{var brushes=sh.vars.discoveredBrushes,result=null;if(brushes==null)
{brushes={};for(var brush in sh.brushes)
{var info=sh.brushes[brush],aliases=info.aliases;if(aliases==null)
continue;info.brushName=brush.toLowerCase();for(var i=0,l=aliases.length;i<l;i++)
brushes[aliases[i]]=brush;}
sh.vars.discoveredBrushes=brushes;}
result=sh.brushes[brushes[alias]];if(result==null&&showAlert)
alert(sh.config.strings.noBrush+alias);return result;};function eachLine(str,callback)
{var lines=splitLines(str);for(var i=0,l=lines.length;i<l;i++)
lines[i]=callback(lines[i],i);return lines.join('\r\n');};function trimFirstAndLastLines(str)
{return str.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g,'');};function parseParams(str)
{var match,result={},arrayRegex=XRegExp("^\\[(?<values>(.*?))\\]$"),pos=0,regex=XRegExp("(?<name>[\\w-]+)"+
"\\s*:\\s*"+
"(?<value>"+
"[\\w%#-]+|"+
"\\[.*?\\]|"+
'".*?"|'+
"'.*?'"+
")\\s*;?","g");while((match=XRegExp.exec(str,regex,pos))!=null)
{var value=match.value.replace(/^['"]|['"]$/g,'');if(value!=null&&arrayRegex.test(value))
{var m=XRegExp.exec(value,arrayRegex);value=m.values.length>0?m.values.split(/\s*,\s*/):[];}
result[match.name]=value;pos=match.index+match[0].length;}
var a=str.match(/language-(.*)/);if(a){result['brush']=a[1];}
else if(str&&str.indexOf('multiline')!==-1){result['brush']='text';}
return result;};function wrapLinesWithCode(str,css)
{if(str==null||str.length==0||str=='\n')
return str;str=str.replace(/</g,'&lt;');str=str.replace(/ {2,}/g,function(m)
{var spaces='';for(var i=0,l=m.length;i<l-1;i++)
spaces+=sh.config.space;return spaces+' ';});if(css!=null)
str=eachLine(str,function(line)
{if(line.length==0)
return '';var spaces='';line=line.replace(/^(&nbsp;| )+/,function(s)
{spaces=s;return '';});if(line.length==0)
return spaces;return spaces+'<code class="'+css+'">'+line+'</code>';});return str;};function padNumber(number,length)
{var result=number.toString();while(result.length<length)
result='0'+result;return result;};function processTabs(code,tabSize)
{var tab='';for(var i=0;i<tabSize;i++)
tab+=' ';return code.replace(/\t/g,tab);};function processSmartTabs(code,tabSize)
{var lines=splitLines(code),tab='\t',spaces='';for(var i=0;i<50;i++)
spaces+='                    ';function insertSpaces(line,pos,count)
{return line.substr(0,pos)
+spaces.substr(0,count)
+line.substr(pos+1,line.length);};code=eachLine(code,function(line)
{if(line.indexOf(tab)==-1)
return line;var pos=0;while((pos=line.indexOf(tab))!=-1)
{var spaces=tabSize-pos%tabSize;line=insertSpaces(line,pos,spaces);}
return line;});return code;};function fixInputString(str)
{var br=/<br\s*\/?>|&lt;br\s*\/?&gt;/gi;if(sh.config.bloggerMode==true)
str=str.replace(br,'\n');if(sh.config.stripBrs==true)
str=str.replace(br,'');return str;};function trim(str)
{return str.replace(/^\s+|\s+$/g,'');};function unindent(str)
{var lines=splitLines(fixInputString(str)),indents=new Array(),regex=/^\s*/,min=1000;for(var i=0,l=lines.length;i<l&&min>0;i++)
{var line=lines[i];if(trim(line).length==0)
continue;var matches=regex.exec(line);if(matches==null)
return str;min=Math.min(matches[0].length,min);}
if(min>0)
for(var i=0,l=lines.length;i<l;i++)
lines[i]=lines[i].substr(min);return lines.join('\n');};function matchesSortCallback(m1,m2)
{if(m1.index<m2.index)
return-1;else if(m1.index>m2.index)
return 1;else
{if(m1.length<m2.length)
return-1;else if(m1.length>m2.length)
return 1;}
return 0;};function getMatches(code,regexInfo)
{function defaultAdd(match,regexInfo)
{return match[0];};var index=0,match=null,matches=[],func=regexInfo.func?regexInfo.func:defaultAdd
pos=0;while((match=XRegExp.exec(code,regexInfo.regex,pos))!=null)
{var resultMatch=func(match,regexInfo);if(typeof(resultMatch)=='string')
resultMatch=[new sh.Match(resultMatch,match.index,regexInfo.css)];matches=matches.concat(resultMatch);pos=match.index+match[0].length;}
return matches;};function processUrls(code)
{var gt=/(.*)((&gt;|&lt;).*)/;return code.replace(sh.regexLib.url,function(m)
{var suffix='',match=null;if(match=gt.exec(m))
{m=match[1];suffix=match[2];}
return '<a href="'+m+'">'+m+'</a>'+suffix;});};function getSyntaxHighlighterScriptTags()
{var tags=document.getElementsByTagName('script'),result=[];for(var i=0,l=tags.length;i<l;i++)
if(tags[i].type=='syntaxhighlighter')
result.push(tags[i]);return result;};function stripCData(original)
{var left='<![CDATA[',right=']]>',copy=trim(original),changed=false,leftLength=left.length,rightLength=right.length;if(copy.indexOf(left)==0)
{copy=copy.substring(leftLength);changed=true;}
var copyLength=copy.length;if(copy.indexOf(right)==copyLength-rightLength)
{copy=copy.substring(0,copyLength-rightLength);changed=true;}
return changed?copy:original;};function quickCodeHandler(e)
{var target=e.target,highlighterDiv=findParentElement(target,'.syntaxhighlighter'),container=findParentElement(target,'.container'),textarea=document.createElement('textarea'),highlighter;if(!container||!highlighterDiv||findElement(container,'textarea'))
return;highlighter=getHighlighterById(highlighterDiv.id);addClass(highlighterDiv,'source');var lines=container.childNodes,code=[];for(var i=0,l=lines.length;i<l;i++)
code.push(lines[i].innerText||lines[i].textContent);code=code.join('\r');code=code.replace(/\u00a0/g," ");textarea.appendChild(document.createTextNode(code));container.appendChild(textarea);textarea.focus();textarea.select();attachEvent(textarea,'blur',function(e)
{textarea.parentNode.removeChild(textarea);removeClass(highlighterDiv,'source');});};sh.Match=function(value,index,css)
{this.value=value;this.index=index;this.length=value.length;this.css=css;this.brushName=null;};sh.Match.prototype.toString=function()
{return this.value;};sh.HtmlScript=function(scriptBrushName)
{var brushClass=findBrush(scriptBrushName),scriptBrush,xmlBrush=new sh.brushes.Xml(),bracketsRegex=null,ref=this,methodsToExpose='getDiv getHtml init'.split(' ');if(brushClass==null)
return;scriptBrush=new brushClass();for(var i=0,l=methodsToExpose.length;i<l;i++)
(function(){var name=methodsToExpose[i];ref[name]=function()
{return xmlBrush[name].apply(xmlBrush,arguments);};})();if(scriptBrush.htmlScript==null)
{alert(sh.config.strings.brushNotHtmlScript+scriptBrushName);return;}
xmlBrush.regexList.push({regex:scriptBrush.htmlScript.code,func:process});function offsetMatches(matches,offset)
{for(var j=0,l=matches.length;j<l;j++)
matches[j].index+=offset;}
function process(match,info)
{var code=match.code,matches=[],regexList=scriptBrush.regexList,offset=match.index+match.left.length,htmlScript=scriptBrush.htmlScript,result;for(var i=0,l=regexList.length;i<l;i++)
{result=getMatches(code,regexList[i]);offsetMatches(result,offset);matches=matches.concat(result);}
if(htmlScript.left!=null&&match.left!=null)
{result=getMatches(match.left,htmlScript.left);offsetMatches(result,match.index);matches=matches.concat(result);}
if(htmlScript.right!=null&&match.right!=null)
{result=getMatches(match.right,htmlScript.right);offsetMatches(result,match.index+match[0].lastIndexOf(match.right));matches=matches.concat(result);}
for(var j=0,l=matches.length;j<l;j++)
matches[j].brushName=brushClass.brushName;return matches;}};sh.Highlighter=function()
{};sh.Highlighter.prototype={getParam:function(name,defaultValue)
{var result=this.params[name];return toBoolean(result==null?defaultValue:result);},create:function(name)
{return document.createElement(name);},findMatches:function(regexList,code)
{var result=[];if(regexList!=null)
for(var i=0,l=regexList.length;i<l;i++)
if(typeof(regexList[i])=="object")
result=result.concat(getMatches(code,regexList[i]));return this.removeNestedMatches(result.sort(matchesSortCallback));},removeNestedMatches:function(matches)
{for(var i=0,l=matches.length;i<l;i++)
{if(matches[i]===null)
continue;var itemI=matches[i],itemIEndPos=itemI.index+itemI.length;for(var j=i+1,l=matches.length;j<l&&matches[i]!==null;j++)
{var itemJ=matches[j];if(itemJ===null)
continue;else if(itemJ.index>itemIEndPos)
break;else if(itemJ.index==itemI.index&&itemJ.length>itemI.length)
matches[i]=null;else if(itemJ.index>=itemI.index&&itemJ.index<itemIEndPos)
matches[j]=null;}}
return matches;},figureOutLineNumbers:function(code)
{var lines=[],firstLine=parseInt(this.getParam('first-line'));eachLine(code,function(line,index)
{lines.push(index+firstLine);});return lines;},isLineHighlighted:function(lineNumber)
{var list=this.getParam('highlight',[]);if(typeof(list)!='object'&&list.push==null)
list=[list];return indexOf(list,lineNumber.toString())!=-1;},getLineHtml:function(lineIndex,lineNumber,code)
{var classes=['line','number'+lineNumber,'index'+lineIndex,'alt'+(lineNumber%2==0?1:2).toString()];if(this.isLineHighlighted(lineNumber))
classes.push('highlighted');if(lineNumber==0)
classes.push('break');return '<div class="'+classes.join(' ')+'">'+code+'</div>';},getLineNumbersHtml:function(code,lineNumbers)
{var html='',count=splitLines(code).length,firstLine=parseInt(this.getParam('first-line')),pad=this.getParam('pad-line-numbers');if(pad==true)
pad=(firstLine+count-1).toString().length;else if(isNaN(pad)==true)
pad=0;for(var i=0;i<count;i++)
{var lineNumber=lineNumbers?lineNumbers[i]:firstLine+i,code=lineNumber==0?sh.config.space:padNumber(lineNumber,pad);html+=this.getLineHtml(i,lineNumber,code);}
return html;},getCodeLinesHtml:function(html,lineNumbers)
{html=trim(html);var lines=splitLines(html),padLength=this.getParam('pad-line-numbers'),firstLine=parseInt(this.getParam('first-line')),html='',brushName=this.getParam('brush');for(var i=0,l=lines.length;i<l;i++)
{var line=lines[i],indent=/^(&nbsp;|\s)+/.exec(line),spaces=null,lineNumber=lineNumbers?lineNumbers[i]:firstLine+i;;if(indent!=null)
{spaces=indent[0].toString();line=line.substr(spaces.length);spaces=spaces.replace(' ',sh.config.space);}
line=trim(line);if(line.length==0)
line=sh.config.space;html+=this.getLineHtml(i,lineNumber,(spaces!=null?'<code class="'+brushName+' spaces">'+spaces+'</code>':'')+line);}
return html;},getTitleHtml:function(title)
{return title?'<caption>'+title+'</caption>':'';},getMatchesHtml:function(code,matches)
{var pos=0,result='',brushName=this.getParam('brush','');function getBrushNameCss(match)
{var result=match?(match.brushName||brushName):brushName;return result?result+' ':'';};for(var i=0,l=matches.length;i<l;i++)
{var match=matches[i],matchBrushName;if(match===null||match.length===0)
continue;matchBrushName=getBrushNameCss(match);result+=wrapLinesWithCode(code.substr(pos,match.index-pos),matchBrushName+'plain')
+wrapLinesWithCode(match.value,matchBrushName+match.css);pos=match.index+match.length+(match.offset||0);}
result+=wrapLinesWithCode(code.substr(pos),getBrushNameCss()+'plain');return result;},getHtml:function(code)
{var html='',classes=['syntaxhighlighter'],tabSize,matches,lineNumbers;if(this.getParam('light')==true)
this.params.toolbar=this.params.gutter=false;className='syntaxhighlighter';if(this.getParam('collapse')==true)
classes.push('collapsed');if((gutter=this.getParam('gutter'))==false)
classes.push('nogutter');classes.push(this.getParam('class-name'));classes.push(this.getParam('brush'));code=trimFirstAndLastLines(code).replace(/\r/g,' ');tabSize=this.getParam('tab-size');code=this.getParam('smart-tabs')==true?processSmartTabs(code,tabSize):processTabs(code,tabSize);if(this.getParam('unindent'))
code=unindent(code);if(gutter)
lineNumbers=this.figureOutLineNumbers(code);matches=this.findMatches(this.regexList,code);html=this.getMatchesHtml(code,matches);html=this.getCodeLinesHtml(html,lineNumbers);if(this.getParam('auto-links'))
html=processUrls(html);if(typeof(navigator)!='undefined'&&navigator.userAgent&&navigator.userAgent.match(/MSIE/))
classes.push('ie');html='<div id="'+getHighlighterId(this.id)+'" class="'+classes.join(' ')+'">'
+(this.getParam('toolbar')?sh.toolbar.getHtml(this):'')
+'<table border="0" cellpadding="0" cellspacing="0">'
+this.getTitleHtml(this.getParam('title'))
+'<tbody>'
+'<tr>'
+(gutter?'<td class="gutter">'+this.getLineNumbersHtml(code)+'</td>':'')
+'<td class="code">'
+'<div class="container">'
+html
+'</div>'
+'</td>'
+'</tr>'
+'</tbody>'
+'</table>'
+'</div>';return html;},getDiv:function(code)
{if(code===null)
code='';this.code=code;var div=this.create('div');div.innerHTML=this.getHtml(code);if(this.getParam('toolbar'))
attachEvent(findElement(div,'.toolbar'),'click',sh.toolbar.handler);if(this.getParam('quick-code'))
attachEvent(findElement(div,'.code'),'dblclick',quickCodeHandler);return div;},init:function(params)
{this.id=guid();storeHighlighter(this);this.params=merge(sh.defaults,params||{})
if(this.getParam('light')==true)
this.params.toolbar=this.params.gutter=false;},getKeywords:function(str)
{str=str.replace(/^\s+|\s+$/g,'').replace(/\s+/g,'|');return '\\b(?:'+str+')\\b';},forHtmlScript:function(regexGroup)
{var regex={'end':regexGroup.right.source};if(regexGroup.eof)
regex.end="(?:(?:"+regex.end+")|$)";this.htmlScript={left:{regex:regexGroup.left,css:'script'},right:{regex:regexGroup.right,css:'script'},code:XRegExp("(?<left>"+regexGroup.left.source+")"+
"(?<code>.*?)"+
"(?<right>"+regex.end+")","sgi")};}};return sh;}();typeof(exports)!='undefined'?exports.SyntaxHighlighter=SyntaxHighlighter:null;;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var keywords='break case catch class continue '+
'default delete do else enum export extends false  '+
'for function if implements import in instanceof '+
'interface let new null package private protected '+
'static return super switch '+
'this throw true try typeof var while with yield';var r=SyntaxHighlighter.regexLib;this.regexList=[{regex:r.multiLineDoubleQuotedString,css:'string'},{regex:r.multiLineSingleQuotedString,css:'string'},{regex:r.singleLineCComments,css:'comments'},{regex:r.multiLineCComments,css:'comments'},{regex:/\s*#.*/gm,css:'preprocessor'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword'}];this.forHtmlScript(r.scriptScriptTags);this.langLabel="Javascript";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['js','jscript','javascript','json'];SyntaxHighlighter.brushes.JScript=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{function process(match,regexInfo)
{var constructor=SyntaxHighlighter.Match,code=match[0],tag=XRegExp.exec(code,XRegExp('(&lt;|<)[\\s\\/\\?!]*(?<name>[:\\w-\\.]+)','xg')),result=[];if(match.attributes!=null)
{var attributes,pos=0,regex=XRegExp('(?<name> [\\w:.-]+)'+
'\\s*=\\s*'+
'(?<value> ".*?"|\'.*?\'|\\w+)','xg');while((attributes=XRegExp.exec(code,regex,pos))!=null)
{result.push(new constructor(attributes.name,match.index+attributes.index,'color1'));result.push(new constructor(attributes.value,match.index+attributes.index+attributes[0].indexOf(attributes.value),'string'));pos=attributes.index+attributes[0].length;}}
if(tag!=null)
result.push(new constructor(tag.name,match.index+tag[0].indexOf(tag.name),'keyword'));return result;}
this.regexList=[{regex:XRegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)','gm'),css:'color2'},{regex:SyntaxHighlighter.regexLib.xmlComments,css:'comments'},{regex:XRegExp('(&lt;|<)[\\s\\/\\?!]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)','sg'),func:process}];this.langLabel="HTML";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['xml','xhtml','xslt','html','plist'];SyntaxHighlighter.brushes.Xml=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{function getKeywordsCSS(str)
{return '\\b([a-z_]|)'+str.replace(/ /g,'(?=:)\\b|\\b([a-z_\\*]|\\*|)')+'(?=:)\\b';};function getValuesCSS(str)
{return '\\b'+str.replace(/ /g,'(?!-)(?!:)\\b|\\b()')+'\:\\b';};var keywords='ascent azimuth background-attachment background-color background-image background-position '+
'background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top '+
'border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color '+
'border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width '+
'border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color '+
'content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display '+
'elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font '+
'height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top '+
'margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans '+
'outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page '+
'page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position '+
'quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress '+
'table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em '+
'vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index';var values='above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder '+
'both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed '+
'continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double '+
'embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia '+
'gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic '+
'justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha '+
'lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower '+
'navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset '+
'outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side '+
'rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow '+
'small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize '+
'table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal '+
'text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin '+
'upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';var fonts='[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif';this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/\#[a-fA-F0-9]{3,6}/g,css:'value'},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:'value'},{regex:/!important/g,css:'color3'},{regex:new RegExp(getKeywordsCSS(keywords),'gm'),css:'keyword'},{regex:new RegExp(getValuesCSS(values),'g'),css:'value'},{regex:new RegExp(this.getKeywords(fonts),'g'),css:'color1'}];this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});this.langLabel="CSS";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['css'];SyntaxHighlighter.brushes.CSS=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var funcs='abs acos acosh addcslashes addslashes '+
'array_change_key_case array_chunk array_combine array_count_values array_diff '+
'array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill '+
'array_filter array_flip array_intersect array_intersect_assoc array_intersect_key '+
'array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map '+
'array_merge array_merge_recursive array_multisort array_pad array_pop array_product '+
'array_push array_rand array_reduce array_reverse array_search array_shift '+
'array_slice array_splice array_sum array_udiff array_udiff_assoc '+
'array_udiff_uassoc array_uintersect array_uintersect_assoc '+
'array_uintersect_uassoc array_unique array_unshift array_values array_walk '+
'array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert '+
'basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress '+
'bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir '+
'checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists '+
'closedir closelog copy cos cosh count count_chars date decbin dechex decoct '+
'deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log '+
'error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded '+
'feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents '+
'fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype '+
'floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf '+
'fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname '+
'gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt '+
'getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext '+
'gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set '+
'interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double '+
'is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long '+
'is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault '+
'is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br '+
'parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir '+
'round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split '+
'str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes '+
'stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk '+
'strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime '+
'strtoupper strtr strval substr substr_compare';var keywords='abstract and array as break case catch cfunction class clone const continue declare default die do '+
'else elseif enddeclare endfor endforeach endif endswitch endwhile extends final finally for foreach '+
'function global goto if implements include include_once interface instanceof insteadof namespace new '+
'old_function or private protected public return require require_once static switch '+
'trait throw try use var while xor yield ';var constants='__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__';this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/\$\w+/g,css:'variable'},{regex:new RegExp(this.getKeywords(funcs),'gmi'),css:'functions'},{regex:new RegExp(this.getKeywords(constants),'gmi'),css:'constants'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword'}];this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);this.langLabel="PHP";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['php'];SyntaxHighlighter.brushes.Php=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var funcs='abs avg case cast coalesce convert count current_timestamp '+
'current_user day isnull left lower month nullif replace right '+
'session_user space substring sum system_user upper user year';var keywords='absolute action add after alter as asc at authorization begin bigint '+
'binary bit by cascade char character check checkpoint close collate '+
'column commit committed connect connection constraint contains continue '+
'create cube current current_date current_time cursor database date '+
'deallocate dec decimal declare default delete desc distinct double drop '+
'dynamic else end end-exec escape except exec execute false fetch first '+
'float for force foreign forward free from full function global goto grant '+
'group grouping having hour ignore index inner insensitive insert instead '+
'int integer intersect into is isolation key last level load local max min '+
'minute modify move name national nchar next no numeric of off on only '+
'open option order out output partial password precision prepare primary '+
'prior privileges procedure public read real references relative repeatable '+
'restrict return returns revoke rollback rollup rows rule schema scroll '+
'second section select sequence serializable set size smallint static '+
'statistics table temp temporary then time timestamp to top transaction '+
'translation trigger true truncate uncommitted union unique update values '+
'varchar varying view when where with work';var operators='all and any between cross in join like not null or outer some';this.regexList=[{regex:/--(.*)$/gm,css:'comments'},{regex:/\/\*([^\*][\s\S]*?)?\*\//gm,css:'comments'},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:'string'},{regex:new RegExp(this.getKeywords(funcs),'gmi'),css:'color2'},{regex:new RegExp(this.getKeywords(operators),'gmi'),css:'color1'},{regex:new RegExp(this.getKeywords(keywords),'gmi'),css:'keyword'}];this.langLabel="SQL";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['sql'];SyntaxHighlighter.brushes.Sql=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{this.langLabel="Plain text";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['text','plain'];SyntaxHighlighter.brushes.Plain=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var keywords='abstract as async await base bool break byte case catch char checked class const '+
'continue decimal default delegate do double else enum event explicit volatile '+
'extern false finally fixed float for foreach get goto if implicit in int '+
'interface internal is lock long namespace new null object operator out '+
'override params private protected public readonly ref return sbyte sealed set '+
'short sizeof stackalloc static string struct switch this throw true try '+
'typeof uint ulong unchecked unsafe ushort using virtual void while var '+
'from group by into select let where orderby join on equals ascending descending';function fixComments(match,regexInfo)
{var css=(match[0].indexOf("///")==0)?'color1':'comments';return[new SyntaxHighlighter.Match(match[0],match.index,css)];}
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:fixComments},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:'comments'},{regex:/@"(?:[^"]|"")*"/g,css:'string'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/^\s*#.*/gm,css:'preprocessor'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword'},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:'keyword'},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:'keyword'}];this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);this.langLabel="C#";};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['c#','cs','c-sharp','csharp'];SyntaxHighlighter.brushes.CSharp=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();SyntaxHighlighter.all();