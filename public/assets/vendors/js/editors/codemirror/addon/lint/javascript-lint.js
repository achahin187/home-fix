(function(mod){if(typeof exports=="object"&&typeof module=="object")
mod(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)
define(["../../lib/codemirror"],mod);else
mod(CodeMirror);})(function(CodeMirror){"use strict";var bogus=["Dangerous comment"];var warnings=[["Expected '{'","Statement body should be inside '{ }' braces."]];var errors=["Missing semicolon","Extra comma","Missing property name","Unmatched "," and instead saw"," is not defined","Unclosed string","Stopping, unable to continue"];function validator(text,options){if(!window.JSHINT)return[];JSHINT(text,options,options.globals);var errors=JSHINT.data().errors,result=[];if(errors)parseErrors(errors,result);return result;}
CodeMirror.registerHelper("lint","javascript",validator);function cleanup(error){fixWith(error,warnings,"warning",true);fixWith(error,errors,"error");return isBogus(error)?null:error;}
function fixWith(error,fixes,severity,force){var description,fix,find,replace,found;description=error.description;for(var i=0;i<fixes.length;i++){fix=fixes[i];find=(typeof fix==="string"?fix:fix[0]);replace=(typeof fix==="string"?null:fix[1]);found=description.indexOf(find)!==-1;if(force||found){error.severity=severity;}
if(found&&replace){error.description=replace;}}}
function isBogus(error){var description=error.description;for(var i=0;i<bogus.length;i++){if(description.indexOf(bogus[i])!==-1){return true;}}
return false;}
function parseErrors(errors,output){for(var i=0;i<errors.length;i++){var error=errors[i];if(error){var linetabpositions,index;linetabpositions=[];if(error.evidence){var tabpositions=linetabpositions[error.line];if(!tabpositions){var evidence=error.evidence;tabpositions=[];Array.prototype.forEach.call(evidence,function(item,index){if(item==='\t'){tabpositions.push(index+1);}});linetabpositions[error.line]=tabpositions;}
if(tabpositions.length>0){var pos=error.character;tabpositions.forEach(function(tabposition){if(pos>tabposition)pos-=1;});error.character=pos;}}
var start=error.character-1,end=start+1;if(error.evidence){index=error.evidence.substring(start).search(/.\b/);if(index>-1){end+=index;}}
error.description=error.reason;error.start=error.character;error.end=end;error=cleanup(error);if(error)
output.push({message:error.description,severity:error.severity,from:CodeMirror.Pos(error.line-1,start),to:CodeMirror.Pos(error.line-1,end)});}}}});