CKEDITOR.dialog.add('sourcedialog',function(editor){var size=CKEDITOR.document.getWindow().getViewPaneSize();var width=Math.min(size.width-70,800);var height=size.height/1.5;var oldData;return{title:editor.lang.sourcedialog.title,minWidth:100,minHeight:100,onShow:function(){this.setValueOf('main','data',oldData=editor.getData());},onOk:(function(){function setData(dialog,newData){editor.focus();editor.setData(newData,function(){dialog.hide();var range=editor.createRange();range.moveToElementEditStart(editor.editable());range.select();});}
return function(){var newData=this.getValueOf('main','data').replace(/\r/g,''),that=this;if(newData===oldData)
return true;setTimeout(function(){setData(that,newData);});return false;};})(),contents:[{id:'main',label:editor.lang.sourcedialog.title,elements:[{type:'textarea',id:'data',dir:'ltr',inputStyle:'cursor:auto;'+
'width:'+width+'px;'+
'height:'+height+'px;'+
'tab-size:4;'+
'text-align:left;','class':'cke_source'}]}]};});