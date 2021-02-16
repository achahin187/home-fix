'use strict';(function(){CKEDITOR.dialog.add('codeSnippet',function(editor){var snippetLangs=editor._.codesnippet.langs,lang=editor.lang.codesnippet,clientHeight=document.documentElement.clientHeight,langSelectItems=[],snippetLangId;langSelectItems.push([editor.lang.common.notSet,'']);for(snippetLangId in snippetLangs)
langSelectItems.push([snippetLangs[snippetLangId],snippetLangId]);var size=CKEDITOR.document.getWindow().getViewPaneSize(),width=Math.min(size.width-70,800),height=size.height/1.5;if(clientHeight<650){height=clientHeight-220;}
return{title:lang.title,minHeight:200,resizable:CKEDITOR.DIALOG_RESIZE_NONE,contents:[{id:'info',elements:[{id:'lang',type:'select',label:lang.language,items:langSelectItems,setup:function(widget){if(widget.ready&&widget.data.lang)
this.setValue(widget.data.lang);if(CKEDITOR.env.gecko&&(!widget.data.lang||!widget.ready))
this.getInputElement().$.selectedIndex=-1;},commit:function(widget){widget.setData('lang',this.getValue());}},{id:'code',type:'textarea',label:lang.codeContents,setup:function(widget){this.setValue(widget.data.code);},commit:function(widget){widget.setData('code',this.getValue());},required:true,validate:CKEDITOR.dialog.validate.notEmpty(lang.emptySnippetError),inputStyle:'cursor:auto;'+
'width:'+width+'px;'+
'height:'+height+'px;'+
'tab-size:4;'+
'text-align:left;','class':'cke_source'}]}]};});}());