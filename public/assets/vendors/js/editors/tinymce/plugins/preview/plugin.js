tinymce.PluginManager.add('preview',function(editor){var settings=editor.settings,sandbox=!tinymce.Env.ie;editor.addCommand('mcePreview',function(){editor.windowManager.open({title:'Preview',width:parseInt(editor.getParam("plugin_preview_width","650"),10),height:parseInt(editor.getParam("plugin_preview_height","500"),10),html:'<iframe src="javascript:\'\'" frameborder="0"'+(sandbox?' sandbox="allow-scripts"':'')+'></iframe>',buttons:{text:'Close',onclick:function(){this.parent().parent().close();}},onPostRender:function(){var previewHtml,headHtml='';headHtml+='<base href="'+editor.documentBaseURI.getURI()+'">';tinymce.each(editor.contentCSS,function(url){headHtml+='<link type="text/css" rel="stylesheet" href="'+editor.documentBaseURI.toAbsolute(url)+'">';});var bodyId=settings.body_id||'tinymce';if(bodyId.indexOf('=')!=-1){bodyId=editor.getParam('body_id','','hash');bodyId=bodyId[editor.id]||bodyId;}
var bodyClass=settings.body_class||'';if(bodyClass.indexOf('=')!=-1){bodyClass=editor.getParam('body_class','','hash');bodyClass=bodyClass[editor.id]||'';}
var preventClicksOnLinksScript=('<script>'+
'document.addEventListener && document.addEventListener("click", function(e) {'+
'for (var elm = e.target; elm; elm = elm.parentNode) {'+
'if (elm.nodeName === "A") {'+
'e.preventDefault();'+
'}'+
'}'+
'}, false);'+
'</script> ');var dirAttr=editor.settings.directionality?' dir="'+editor.settings.directionality+'"':'';previewHtml=('<!DOCTYPE html>'+
'<html>'+
'<head>'+
headHtml+
'</head>'+
'<body id="'+bodyId+'" class="mce-content-body '+bodyClass+'"'+dirAttr+'>'+
editor.getContent()+
preventClicksOnLinksScript+
'</body>'+
'</html>');if(!sandbox){var doc=this.getEl('body').firstChild.contentWindow.document;doc.open();doc.write(previewHtml);doc.close();}else{this.getEl('body').firstChild.src='data:text/html;charset=utf-8,'+encodeURIComponent(previewHtml);}}});});editor.addButton('preview',{title:'Preview',cmd:'mcePreview'});editor.addMenuItem('preview',{text:'Preview',cmd:'mcePreview',context:'view'});});