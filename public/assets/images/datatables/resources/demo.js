SyntaxHighlighter.config.tagName='code';if(window.$){$(document).ready(function(){if(!$.fn.dataTable){return;}
var dt110=$.fn.dataTable.Api?true:false;var info=$('div.info');if(info.height()<115){info.css('min-height','8em');}
var escapeHtml=function(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};var cssContainer=$('div.tabs div.css');if($.trim(cssContainer.find('code').text())===''){cssContainer.find('code, p:eq(0), div').css('display','none');}
var table=$('<p/>').append($('table').clone()).html();var demoHtml=$.trim($('div.demo-html').html());if(demoHtml){demoHtml=demoHtml+'\n\n';}
$('div.tabs div.table').append('<code class="multiline language-html">\t\t\t'+
escapeHtml(demoHtml+table)+
'</code>');if(dt110){var ajaxTab=$('ul.tabs li').eq(3).css('display','none');$(document).on('init.dt',function(e,settings){if(e.namespace!=='dt'){return;}
var api=new $.fn.dataTable.Api(settings);var show=function(str){ajaxTab.css('display','block');$('div.tabs div.ajax code').remove();$('div.tabs div.ajax div.syntaxhighlighter').remove();try{str=JSON.stringify(str,null,2);}catch(e){}
$('div.tabs div.ajax').append($('<code class="multiline language-js"/>').text(str));setTimeout(function(){SyntaxHighlighter.highlight({},$('div.tabs div.ajax code')[0]);},500);};var json=api.ajax.json();if(json){show(json);}
api.on('xhr.dt',function(e,settings,json){show(json);});});var phpTab=$('ul.tabs li').eq(4).css('display','none');$(document).on('init.dt.demoSSP',function(e,settings){if(e.namespace!=='dt'){return;}
if(settings.oFeatures.bServerSide){if($.isFunction(settings.ajax)){return;}
$.ajax({url:'../resources/examples.php',data:{src:settings.sAjaxSource||settings.ajax.url||settings.ajax},dataType:'text',type:'post',success:function(txt){phpTab.css('display','block');$('div.tabs div.php').append('<code class="multiline language-php">'+txt+'</code>');SyntaxHighlighter.highlight({},$('div.tabs div.php code')[0]);}});}});}
else{$('ul.tabs li').eq(3).css('display','none');$('ul.tabs li').eq(4).css('display','none');}
$('ul.tabs').on('click','li',function(){$('ul.tabs li.active').removeClass('active');$(this).addClass('active');$('div.tabs>div').css('display','none').eq($(this).index()).css('display','block');});$('ul.tabs li.active').click();});}