(function(mod){if(typeof exports=="object"&&typeof module=="object")
mod(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)
define(["../../lib/codemirror"],mod);else
mod(CodeMirror);})(function(CodeMirror){CodeMirror.defineOption("showTrailingSpace",false,function(cm,val,prev){if(prev==CodeMirror.Init)prev=false;if(prev&&!val)
cm.removeOverlay("trailingspace");else if(!prev&&val)
cm.addOverlay({token:function(stream){for(var l=stream.string.length,i=l;i&&/\s/.test(stream.string.charAt(i-1));--i){}
if(i>stream.pos){stream.pos=i;return null;}
stream.pos=l;return "trailingspace";},name:"trailingspace"});});});