tinymce.PluginManager.add('contextmenu',function(editor){var menu,contextmenuNeverUseNative=editor.settings.contextmenu_never_use_native;editor.on('contextmenu',function(e){var contextmenu,doc=editor.getDoc();if(e.ctrlKey&&!contextmenuNeverUseNative){return;}
e.preventDefault();if(tinymce.Env.mac&&tinymce.Env.webkit){if(e.button==2&&doc.caretRangeFromPoint){editor.selection.setRng(doc.caretRangeFromPoint(e.x,e.y));}}
contextmenu=editor.settings.contextmenu||'link image inserttable | cell row column deletetable';if(!menu){var items=[];tinymce.each(contextmenu.split(/[ ,]/),function(name){var item=editor.menuItems[name];if(name=='|'){item={text:name};}
if(item){item.shortcut='';items.push(item);}});for(var i=0;i<items.length;i++){if(items[i].text=='|'){if(i===0||i==items.length-1){items.splice(i,1);}}}
menu=new tinymce.ui.Menu({items:items,context:'contextmenu',classes:'contextmenu'}).renderTo();editor.on('remove',function(){menu.remove();menu=null;});}else{menu.show();}
var pos={x:e.pageX,y:e.pageY};if(!editor.inline){pos=tinymce.DOM.getPos(editor.getContentAreaContainer());pos.x+=e.clientX;pos.y+=e.clientY;}
menu.moveTo(pos.x,pos.y);});});