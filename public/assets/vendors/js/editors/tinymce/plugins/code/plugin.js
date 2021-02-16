tinymce.PluginManager.add('code',function(editor){function showDialog(){var win=editor.windowManager.open({title:"Source code",body:{type:'textbox',name:'code',multiline:true,minWidth:editor.getParam("code_dialog_width",600),minHeight:editor.getParam("code_dialog_height",Math.min(tinymce.DOM.getViewPort().h-200,500)),spellcheck:false,style:'direction: ltr; text-align: left'},onSubmit:function(e){editor.focus();editor.undoManager.transact(function(){editor.setContent(e.data.code);});editor.selection.setCursorLocation();editor.nodeChanged();}});win.find('#code').value(editor.getContent({source_view:true}));}
editor.addCommand("mceCodeEditor",showDialog);editor.addButton('code',{icon:'code',tooltip:'Source code',onclick:showDialog});editor.addMenuItem('code',{icon:'code',text:'Source code',context:'tools',onclick:showDialog});});