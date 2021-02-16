(function(factory){if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{window.wNumb=factory();}}(function(){'use strict';var
FormatOptions=['decimals','thousand','mark','prefix','postfix','encoder','decoder','negativeBefore','negative','edit','undo'];function strReverse(a){return a.split('').reverse().join('');}
function strStartsWith(input,match){return input.substring(0,match.length)===match;}
function strEndsWith(input,match){return input.slice(-1*match.length)===match;}
function throwEqualError(F,a,b){if((F[a]||F[b])&&(F[a]===F[b])){throw new Error(a);}}
function isValidNumber(input){return typeof input==='number'&&isFinite(input);}
function toFixed(value,decimals){var scale=Math.pow(10,decimals);return(Math.round(value*scale)/scale).toFixed(decimals);}
function formatTo(decimals,thousand,mark,prefix,postfix,encoder,decoder,negativeBefore,negative,edit,undo,input){var originalInput=input,inputIsNegative,inputPieces,inputBase,inputDecimals='',output='';if(encoder){input=encoder(input);}
if(!isValidNumber(input)){return false;}
if(decimals!==false&&parseFloat(input.toFixed(decimals))===0){input=0;}
if(input<0){inputIsNegative=true;input=Math.abs(input);}
if(decimals!==false){input=toFixed(input,decimals);}
input=input.toString();if(input.indexOf('.')!==-1){inputPieces=input.split('.');inputBase=inputPieces[0];if(mark){inputDecimals=mark+inputPieces[1];}}else{inputBase=input;}
if(thousand){inputBase=strReverse(inputBase).match(/.{1,3}/g);inputBase=strReverse(inputBase.join(strReverse(thousand)));}
if(inputIsNegative&&negativeBefore){output+=negativeBefore;}
if(prefix){output+=prefix;}
if(inputIsNegative&&negative){output+=negative;}
output+=inputBase;output+=inputDecimals;if(postfix){output+=postfix;}
if(edit){output=edit(output,originalInput);}
return output;}
function formatFrom(decimals,thousand,mark,prefix,postfix,encoder,decoder,negativeBefore,negative,edit,undo,input){var originalInput=input,inputIsNegative,output='';if(undo){input=undo(input);}
if(!input||typeof input!=='string'){return false;}
if(negativeBefore&&strStartsWith(input,negativeBefore)){input=input.replace(negativeBefore,'');inputIsNegative=true;}
if(prefix&&strStartsWith(input,prefix)){input=input.replace(prefix,'');}
if(negative&&strStartsWith(input,negative)){input=input.replace(negative,'');inputIsNegative=true;}
if(postfix&&strEndsWith(input,postfix)){input=input.slice(0,-1*postfix.length);}
if(thousand){input=input.split(thousand).join('');}
if(mark){input=input.replace(mark,'.');}
if(inputIsNegative){output+='-';}
output+=input;output=output.replace(/[^0-9\.\-.]/g,'');if(output===''){return false;}
output=Number(output);if(decoder){output=decoder(output);}
if(!isValidNumber(output)){return false;}
return output;}
function validate(inputOptions){var i,optionName,optionValue,filteredOptions={};for(i=0;i<FormatOptions.length;i+=1){optionName=FormatOptions[i];optionValue=inputOptions[optionName];if(optionValue===undefined){if(optionName==='negative'&&!filteredOptions.negativeBefore){filteredOptions[optionName]='-';}else if(optionName==='mark'&&filteredOptions.thousand!=='.'){filteredOptions[optionName]='.';}else{filteredOptions[optionName]=false;}}else if(optionName==='decimals'){if(optionValue>=0&&optionValue<8){filteredOptions[optionName]=optionValue;}else{throw new Error(optionName);}}else if(optionName==='encoder'||optionName==='decoder'||optionName==='edit'||optionName==='undo'){if(typeof optionValue==='function'){filteredOptions[optionName]=optionValue;}else{throw new Error(optionName);}}else{if(typeof optionValue==='string'){filteredOptions[optionName]=optionValue;}else{throw new Error(optionName);}}}
throwEqualError(filteredOptions,'mark','thousand');throwEqualError(filteredOptions,'prefix','negative');throwEqualError(filteredOptions,'prefix','negativeBefore');return filteredOptions;}
function passAll(options,method,input){var i,args=[];for(i=0;i<FormatOptions.length;i+=1){args.push(options[FormatOptions[i]]);}
args.push(input);return method.apply('',args);}
function wNumb(options){if(!(this instanceof wNumb)){return new wNumb(options);}
if(typeof options!=="object"){return;}
options=validate(options);this.to=function(input){return passAll(options,formatTo,input);};this.from=function(input){return passAll(options,formatFrom,input);};}
return wNumb;}));