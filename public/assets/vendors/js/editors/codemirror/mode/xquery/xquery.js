(function(mod){if(typeof exports=="object"&&typeof module=="object")
mod(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)
define(["../../lib/codemirror"],mod);else
mod(CodeMirror);})(function(CodeMirror){"use strict";CodeMirror.defineMode("xquery",function(){var keywords=function(){function kw(type){return{type:type,style:"keyword"};}
var A=kw("keyword a"),B=kw("keyword b"),C=kw("keyword c"),operator=kw("operator"),atom={type:"atom",style:"atom"},punctuation={type:"punctuation",style:null},qualifier={type:"axis_specifier",style:"qualifier"};var kwObj={'if':A,'switch':A,'while':A,'for':A,'else':B,'then':B,'try':B,'finally':B,'catch':B,'element':C,'attribute':C,'let':C,'implements':C,'import':C,'module':C,'namespace':C,'return':C,'super':C,'this':C,'throws':C,'where':C,'private':C,',':punctuation,'null':atom,'fn:false()':atom,'fn:true()':atom};var basic=['after','ancestor','ancestor-or-self','and','as','ascending','assert','attribute','before','by','case','cast','child','comment','declare','default','define','descendant','descendant-or-self','descending','document','document-node','element','else','eq','every','except','external','following','following-sibling','follows','for','function','if','import','in','instance','intersect','item','let','module','namespace','node','node','of','only','or','order','parent','precedes','preceding','preceding-sibling','processing-instruction','ref','return','returns','satisfies','schema','schema-element','self','some','sortby','stable','text','then','to','treat','typeswitch','union','variable','version','where','xquery','empty-sequence'];for(var i=0,l=basic.length;i<l;i++){kwObj[basic[i]]=kw(basic[i]);};var types=['xs:string','xs:float','xs:decimal','xs:double','xs:integer','xs:boolean','xs:date','xs:dateTime','xs:time','xs:duration','xs:dayTimeDuration','xs:time','xs:yearMonthDuration','numeric','xs:hexBinary','xs:base64Binary','xs:anyURI','xs:QName','xs:byte','xs:boolean','xs:anyURI','xf:yearMonthDuration'];for(var i=0,l=types.length;i<l;i++){kwObj[types[i]]=atom;};var operators=['eq','ne','lt','le','gt','ge',':=','=','>','>=','<','<=','.','|','?','and','or','div','idiv','mod','*','/','+','-'];for(var i=0,l=operators.length;i<l;i++){kwObj[operators[i]]=operator;};var axis_specifiers=["self::","attribute::","child::","descendant::","descendant-or-self::","parent::","ancestor::","ancestor-or-self::","following::","preceding::","following-sibling::","preceding-sibling::"];for(var i=0,l=axis_specifiers.length;i<l;i++){kwObj[axis_specifiers[i]]=qualifier;};return kwObj;}();function chain(stream,state,f){state.tokenize=f;return f(stream,state);}
function tokenBase(stream,state){var ch=stream.next(),mightBeFunction=false,isEQName=isEQNameAhead(stream);if(ch=="<"){if(stream.match("!--",true))
return chain(stream,state,tokenXMLComment);if(stream.match("![CDATA",false)){state.tokenize=tokenCDATA;return "tag";}
if(stream.match("?",false)){return chain(stream,state,tokenPreProcessing);}
var isclose=stream.eat("/");stream.eatSpace();var tagName="",c;while((c=stream.eat(/[^\s\u00a0=<>\"\'\/?]/)))tagName+=c;return chain(stream,state,tokenTag(tagName,isclose));}
else if(ch=="{"){pushStateStack(state,{type:"codeblock"});return null;}
else if(ch=="}"){popStateStack(state);return null;}
else if(isInXmlBlock(state)){if(ch==">")
return "tag";else if(ch=="/"&&stream.eat(">")){popStateStack(state);return "tag";}
else
return "variable";}
else if(/\d/.test(ch)){stream.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/);return "atom";}
else if(ch==="("&&stream.eat(":")){pushStateStack(state,{type:"comment"});return chain(stream,state,tokenComment);}
else if(!isEQName&&(ch==='"'||ch==="'"))
return chain(stream,state,tokenString(ch));else if(ch==="$"){return chain(stream,state,tokenVariable);}
else if(ch===":"&&stream.eat("=")){return "keyword";}
else if(ch==="("){pushStateStack(state,{type:"paren"});return null;}
else if(ch===")"){popStateStack(state);return null;}
else if(ch==="["){pushStateStack(state,{type:"bracket"});return null;}
else if(ch==="]"){popStateStack(state);return null;}
else{var known=keywords.propertyIsEnumerable(ch)&&keywords[ch];if(isEQName&&ch==='\"')while(stream.next()!=='"'){}
if(isEQName&&ch==='\'')while(stream.next()!=='\''){}
if(!known)stream.eatWhile(/[\w\$_-]/);var foundColon=stream.eat(":");if(!stream.eat(":")&&foundColon){stream.eatWhile(/[\w\$_-]/);}
if(stream.match(/^[ \t]*\(/,false)){mightBeFunction=true;}
var word=stream.current();known=keywords.propertyIsEnumerable(word)&&keywords[word];if(mightBeFunction&&!known)known={type:"function_call",style:"variable def"};if(isInXmlConstructor(state)){popStateStack(state);return "variable";}
if(word=="element"||word=="attribute"||known.type=="axis_specifier")pushStateStack(state,{type:"xmlconstructor"});return known?known.style:"variable";}}
function tokenComment(stream,state){var maybeEnd=false,maybeNested=false,nestedCount=0,ch;while(ch=stream.next()){if(ch==")"&&maybeEnd){if(nestedCount>0)
nestedCount--;else{popStateStack(state);break;}}
else if(ch==":"&&maybeNested){nestedCount++;}
maybeEnd=(ch==":");maybeNested=(ch=="(");}
return "comment";}
function tokenString(quote,f){return function(stream,state){var ch;if(isInString(state)&&stream.current()==quote){popStateStack(state);if(f)state.tokenize=f;return "string";}
pushStateStack(state,{type:"string",name:quote,tokenize:tokenString(quote,f)});if(stream.match("{",false)&&isInXmlAttributeBlock(state)){state.tokenize=tokenBase;return "string";}
while(ch=stream.next()){if(ch==quote){popStateStack(state);if(f)state.tokenize=f;break;}
else{if(stream.match("{",false)&&isInXmlAttributeBlock(state)){state.tokenize=tokenBase;return "string";}}}
return "string";};}
function tokenVariable(stream,state){var isVariableChar=/[\w\$_-]/;if(stream.eat("\"")){while(stream.next()!=='\"'){};stream.eat(":");}else{stream.eatWhile(isVariableChar);if(!stream.match(":=",false))stream.eat(":");}
stream.eatWhile(isVariableChar);state.tokenize=tokenBase;return "variable";}
function tokenTag(name,isclose){return function(stream,state){stream.eatSpace();if(isclose&&stream.eat(">")){popStateStack(state);state.tokenize=tokenBase;return "tag";}
if(!stream.eat("/"))
pushStateStack(state,{type:"tag",name:name,tokenize:tokenBase});if(!stream.eat(">")){state.tokenize=tokenAttribute;return "tag";}
else{state.tokenize=tokenBase;}
return "tag";};}
function tokenAttribute(stream,state){var ch=stream.next();if(ch=="/"&&stream.eat(">")){if(isInXmlAttributeBlock(state))popStateStack(state);if(isInXmlBlock(state))popStateStack(state);return "tag";}
if(ch==">"){if(isInXmlAttributeBlock(state))popStateStack(state);return "tag";}
if(ch=="=")
return null;if(ch=='"'||ch=="'")
return chain(stream,state,tokenString(ch,tokenAttribute));if(!isInXmlAttributeBlock(state))
pushStateStack(state,{type:"attribute",tokenize:tokenAttribute});stream.eat(/[a-zA-Z_:]/);stream.eatWhile(/[-a-zA-Z0-9_:.]/);stream.eatSpace();if(stream.match(">",false)||stream.match("/",false)){popStateStack(state);state.tokenize=tokenBase;}
return "attribute";}
function tokenXMLComment(stream,state){var ch;while(ch=stream.next()){if(ch=="-"&&stream.match("->",true)){state.tokenize=tokenBase;return "comment";}}}
function tokenCDATA(stream,state){var ch;while(ch=stream.next()){if(ch=="]"&&stream.match("]",true)){state.tokenize=tokenBase;return "comment";}}}
function tokenPreProcessing(stream,state){var ch;while(ch=stream.next()){if(ch=="?"&&stream.match(">",true)){state.tokenize=tokenBase;return "comment meta";}}}
function isInXmlBlock(state){return isIn(state,"tag");}
function isInXmlAttributeBlock(state){return isIn(state,"attribute");}
function isInXmlConstructor(state){return isIn(state,"xmlconstructor");}
function isInString(state){return isIn(state,"string");}
function isEQNameAhead(stream){if(stream.current()==='"')
return stream.match(/^[^\"]+\"\:/,false);else if(stream.current()==='\'')
return stream.match(/^[^\"]+\'\:/,false);else
return false;}
function isIn(state,type){return(state.stack.length&&state.stack[state.stack.length-1].type==type);}
function pushStateStack(state,newState){state.stack.push(newState);}
function popStateStack(state){state.stack.pop();var reinstateTokenize=state.stack.length&&state.stack[state.stack.length-1].tokenize;state.tokenize=reinstateTokenize||tokenBase;}
return{startState:function(){return{tokenize:tokenBase,cc:[],stack:[]};},token:function(stream,state){if(stream.eatSpace())return null;var style=state.tokenize(stream,state);return style;},blockCommentStart:"(:",blockCommentEnd:":)"};});CodeMirror.defineMIME("application/xquery","xquery");});