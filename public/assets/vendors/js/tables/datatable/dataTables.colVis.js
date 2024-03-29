/*!ColVis 1.1.1
* Â©2010-2014 SpryMedia Ltd - datatables.net/license*/(function(window,document,undefined){var factory=function($,DataTable){"use strict";var ColVis=function(oDTSettings,oInit)
{if(!this.CLASS||this.CLASS!="ColVis")
{alert("Warning: ColVis must be initialised with the keyword 'new'");}
if(typeof oInit=='undefined')
{oInit={};}
if($.fn.dataTable.camelToHungarian){$.fn.dataTable.camelToHungarian(ColVis.defaults,oInit);}
this.s={"dt":null,"oInit":oInit,"hidden":true,"abOriginal":[]};this.dom={"wrapper":null,"button":null,"collection":null,"background":null,"catcher":null,"buttons":[],"groupButtons":[],"restore":null};ColVis.aInstances.push(this);this.s.dt=$.fn.dataTable.Api?new $.fn.dataTable.Api(oDTSettings).settings()[0]:oDTSettings;this._fnConstruct(oInit);return this;};ColVis.prototype={button:function()
{return this.dom.wrapper;},"fnRebuild":function()
{this.rebuild();},rebuild:function()
{for(var i=this.dom.buttons.length-1;i>=0;i--){this.dom.collection.removeChild(this.dom.buttons[i]);}
this.dom.buttons.splice(0,this.dom.buttons.length);if(this.dom.restore){this.dom.restore.parentNode(this.dom.restore);}
this._fnAddGroups();this._fnAddButtons();this._fnDrawCallback();},"_fnConstruct":function(init)
{this._fnApplyCustomisation(init);var that=this;var i,iLen;this.dom.wrapper=document.createElement('div');this.dom.wrapper.className="ColVis";this.dom.button=$('<button />',{'class':!this.s.dt.bJUI?"ColVis_Button ColVis_MasterButton":"ColVis_Button ColVis_MasterButton ui-button ui-state-default"}).append('<span>'+this.s.buttonText+'</span>').bind(this.s.activate=="mouseover"?"mouseover":"click",function(e){e.preventDefault();that._fnCollectionShow();}).appendTo(this.dom.wrapper)[0];this.dom.catcher=this._fnDomCatcher();this.dom.collection=this._fnDomCollection();this.dom.background=this._fnDomBackground();this._fnAddGroups();this._fnAddButtons();for(i=0,iLen=this.s.dt.aoColumns.length;i<iLen;i++)
{this.s.abOriginal.push(this.s.dt.aoColumns[i].bVisible);}
this.s.dt.aoDrawCallback.push({"fn":function(){that._fnDrawCallback.call(that);},"sName":"ColVis"});$(this.s.dt.oInstance).bind('column-reorder',function(e,oSettings,oReorder){for(i=0,iLen=that.s.aiExclude.length;i<iLen;i++){that.s.aiExclude[i]=oReorder.aiInvertMapping[that.s.aiExclude[i]];}
var mStore=that.s.abOriginal.splice(oReorder.iFrom,1)[0];that.s.abOriginal.splice(oReorder.iTo,0,mStore);that.fnRebuild();});this._fnDrawCallback();},"_fnApplyCustomisation":function(init)
{$.extend(true,this.s,ColVis.defaults,init);if(!this.s.showAll&&this.s.bShowAll){this.s.showAll=this.s.sShowAll;}
if(!this.s.restore&&this.s.bRestore){this.s.restore=this.s.sRestore;}
var groups=this.s.groups;var hungarianGroups=this.s.aoGroups;if(groups){for(var i=0,ien=groups.length;i<ien;i++){if(groups[i].title){hungarianGroups[i].sTitle=groups[i].title;}
if(groups[i].columns){hungarianGroups[i].aiColumns=groups[i].columns;}}}},"_fnDrawCallback":function()
{var columns=this.s.dt.aoColumns;var buttons=this.dom.buttons;var groups=this.s.aoGroups;var button;for(var i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if(button.__columnIdx!==undefined){$('input',button).prop('checked',columns[button.__columnIdx].bVisible);}}
var allVisible=function(columnIndeces){for(var k=0,kLen=columnIndeces.length;k<kLen;k++)
{if(columns[columnIndeces[k]].bVisible===false){return false;}}
return true;};var allHidden=function(columnIndeces){for(var m=0,mLen=columnIndeces.length;m<mLen;m++)
{if(columns[columnIndeces[m]].bVisible===true){return false;}}
return true;};for(var j=0,jLen=groups.length;j<jLen;j++)
{if(allVisible(groups[j].aiColumns))
{$('input',this.dom.groupButtons[j]).prop('checked',true);$('input',this.dom.groupButtons[j]).prop('indeterminate',false);}
else if(allHidden(groups[j].aiColumns))
{$('input',this.dom.groupButtons[j]).prop('checked',false);$('input',this.dom.groupButtons[j]).prop('indeterminate',false);}
else
{$('input',this.dom.groupButtons[j]).prop('indeterminate',true);}}},"_fnAddGroups":function()
{var nButton;if(typeof this.s.aoGroups!='undefined')
{for(var i=0,iLen=this.s.aoGroups.length;i<iLen;i++)
{nButton=this._fnDomGroupButton(i);this.dom.groupButtons.push(nButton);this.dom.buttons.push(nButton);this.dom.collection.appendChild(nButton);}}},"_fnAddButtons":function()
{var
nButton,columns=this.s.dt.aoColumns;if($.inArray('all',this.s.aiExclude)===-1){for(var i=0,iLen=columns.length;i<iLen;i++)
{if($.inArray(i,this.s.aiExclude)===-1)
{nButton=this._fnDomColumnButton(i);nButton.__columnIdx=i;this.dom.buttons.push(nButton);}}}
if(this.s.order==='alpha'){this.dom.buttons.sort(function(a,b){var titleA=columns[a.__columnIdx].sTitle;var titleB=columns[b.__columnIdx].sTitle;return titleA===titleB?0:titleA<titleB?-1:1;});}
if(this.s.restore)
{nButton=this._fnDomRestoreButton();nButton.className+=" ColVis_Restore";this.dom.buttons.push(nButton);}
if(this.s.showAll)
{nButton=this._fnDomShowXButton(this.s.showAll,true);nButton.className+=" ColVis_ShowAll";this.dom.buttons.push(nButton);}
if(this.s.showNone)
{nButton=this._fnDomShowXButton(this.s.showNone,false);nButton.className+=" ColVis_ShowNone";this.dom.buttons.push(nButton);}
$(this.dom.collection).append(this.dom.buttons);},"_fnDomRestoreButton":function()
{var
that=this,dt=this.s.dt;return $('<li class="ColVis_Special '+(dt.bJUI?'ui-button ui-state-default':'')+'">'+
this.s.restore+
'</li>').click(function(e){for(var i=0,iLen=that.s.abOriginal.length;i<iLen;i++)
{that.s.dt.oInstance.fnSetColumnVis(i,that.s.abOriginal[i],false);}
that._fnAdjustOpenRows();that.s.dt.oInstance.fnAdjustColumnSizing(false);that.s.dt.oInstance.fnDraw(false);})[0];},"_fnDomShowXButton":function(str,action)
{var
that=this,dt=this.s.dt;return $('<li class="ColVis_Special '+(dt.bJUI?'ui-button ui-state-default':'')+'">'+
str+
'</li>').click(function(e){for(var i=0,iLen=that.s.abOriginal.length;i<iLen;i++)
{if(that.s.aiExclude.indexOf(i)===-1)
{that.s.dt.oInstance.fnSetColumnVis(i,action,false);}}
that._fnAdjustOpenRows();that.s.dt.oInstance.fnAdjustColumnSizing(false);that.s.dt.oInstance.fnDraw(false);})[0];},"_fnDomGroupButton":function(i)
{var
that=this,dt=this.s.dt,oGroup=this.s.aoGroups[i];return $('<li class="ColVis_Special '+(dt.bJUI?'ui-button ui-state-default':'')+'">'+
'<label>'+
'<input type="checkbox" />'+
'<span>'+oGroup.sTitle+'</span>'+
'</label>'+
'</li>').click(function(e){var showHide=!$('input',this).is(":checked");if(e.target.nodeName.toLowerCase()!=="li")
{showHide=!showHide;}
for(var j=0;j<oGroup.aiColumns.length;j++)
{that.s.dt.oInstance.fnSetColumnVis(oGroup.aiColumns[j],showHide);}})[0];},"_fnDomColumnButton":function(i)
{var
that=this,column=this.s.dt.aoColumns[i],dt=this.s.dt;var title=this.s.fnLabel===null?column.sTitle:this.s.fnLabel(i,column.sTitle,column.nTh);return $('<li '+(dt.bJUI?'class="ui-button ui-state-default"':'')+'>'+
'<label>'+
'<input type="checkbox" />'+
'<span>'+title+'</span>'+
'</label>'+
'</li>').click(function(e){var showHide=!$('input',this).is(":checked");if(e.target.nodeName.toLowerCase()!=="li")
{showHide=!showHide;}
var oldIndex=$.fn.dataTableExt.iApiIndex;$.fn.dataTableExt.iApiIndex=that._fnDataTablesApiIndex.call(that);if(dt.oFeatures.bServerSide)
{that.s.dt.oInstance.fnSetColumnVis(i,showHide,false);that.s.dt.oInstance.fnAdjustColumnSizing(false);if(dt.oScroll.sX!==""||dt.oScroll.sY!=="")
{that.s.dt.oInstance.oApi._fnScrollDraw(that.s.dt);}
that._fnDrawCallback();}
else
{that.s.dt.oInstance.fnSetColumnVis(i,showHide);}
$.fn.dataTableExt.iApiIndex=oldIndex;if(e.target.nodeName.toLowerCase()==='input'&&that.s.fnStateChange!==null)
{that.s.fnStateChange.call(that,i,showHide);}})[0];},"_fnDataTablesApiIndex":function()
{for(var i=0,iLen=this.s.dt.oInstance.length;i<iLen;i++)
{if(this.s.dt.oInstance[i]==this.s.dt.nTable)
{return i;}}
return 0;},"_fnDomCollection":function()
{return $('<ul />',{'class':!this.s.dt.bJUI?"ColVis_collection":"ColVis_collection ui-buttonset ui-buttonset-multi"}).css({'display':'none','opacity':0,'position':!this.s.bCssPosition?'absolute':''})[0];},"_fnDomCatcher":function()
{var
that=this,nCatcher=document.createElement('div');nCatcher.className="ColVis_catcher";$(nCatcher).click(function(){that._fnCollectionHide.call(that,null,null);});return nCatcher;},"_fnDomBackground":function()
{var that=this;var background=$('<div></div>').addClass('ColVis_collectionBackground').css('opacity',0).click(function(){that._fnCollectionHide.call(that,null,null);});if(this.s.activate=="mouseover")
{background.mouseover(function(){that.s.overcollection=false;that._fnCollectionHide.call(that,null,null);});}
return background[0];},"_fnCollectionShow":function()
{var that=this,i,iLen,iLeft;var oPos=$(this.dom.button).offset();var nHidden=this.dom.collection;var nBackground=this.dom.background;var iDivX=parseInt(oPos.left,10);var iDivY=parseInt(oPos.top+$(this.dom.button).outerHeight(),10);if(!this.s.bCssPosition)
{nHidden.style.top=iDivY+"px";nHidden.style.left=iDivX+"px";}
$(nHidden).css({'display':'block','opacity':0});nBackground.style.bottom='0px';nBackground.style.right='0px';var oStyle=this.dom.catcher.style;oStyle.height=$(this.dom.button).outerHeight()+"px";oStyle.width=$(this.dom.button).outerWidth()+"px";oStyle.top=oPos.top+"px";oStyle.left=iDivX+"px";document.body.appendChild(nBackground);document.body.appendChild(nHidden);document.body.appendChild(this.dom.catcher);$(nHidden).animate({"opacity":1},that.s.iOverlayFade);$(nBackground).animate({"opacity":0.1},that.s.iOverlayFade,'linear',function(){if($.browser&&$.browser.msie&&$.browser.version=="6.0")
{that._fnDrawCallback();}});if(!this.s.bCssPosition)
{iLeft=(this.s.sAlign=="left")?iDivX:iDivX-$(nHidden).outerWidth()+$(this.dom.button).outerWidth();nHidden.style.left=iLeft+"px";var iDivWidth=$(nHidden).outerWidth();var iDivHeight=$(nHidden).outerHeight();var iDocWidth=$(document).width();if(iLeft+iDivWidth>iDocWidth)
{nHidden.style.left=(iDocWidth-iDivWidth)+"px";}}
this.s.hidden=false;},"_fnCollectionHide":function()
{var that=this;if(!this.s.hidden&&this.dom.collection!==null)
{this.s.hidden=true;$(this.dom.collection).animate({"opacity":0},that.s.iOverlayFade,function(e){this.style.display="none";});$(this.dom.background).animate({"opacity":0},that.s.iOverlayFade,function(e){document.body.removeChild(that.dom.background);document.body.removeChild(that.dom.catcher);});}},"_fnAdjustOpenRows":function()
{var aoOpen=this.s.dt.aoOpenRows;var iVisible=this.s.dt.oApi._fnVisbleColumns(this.s.dt);for(var i=0,iLen=aoOpen.length;i<iLen;i++){aoOpen[i].nTr.getElementsByTagName('td')[0].colSpan=iVisible;}}};ColVis.fnRebuild=function(oTable)
{var nTable=null;if(typeof oTable!='undefined')
{nTable=oTable.fnSettings().nTable;}
for(var i=0,iLen=ColVis.aInstances.length;i<iLen;i++)
{if(typeof oTable=='undefined'||nTable==ColVis.aInstances[i].s.dt.nTable)
{ColVis.aInstances[i].fnRebuild();}}};ColVis.defaults={active:'click',buttonText:'Show / hide columns',aiExclude:[],bRestore:false,sRestore:'Restore original',bShowAll:false,sShowAll:'Show All',sAlign:'left',fnStateChange:null,iOverlayFade:500,fnLabel:null,bCssPosition:false,aoGroups:[],order:'column'};ColVis.aInstances=[];ColVis.prototype.CLASS="ColVis";ColVis.VERSION="1.1.1";ColVis.prototype.VERSION=ColVis.VERSION;if(typeof $.fn.dataTable=="function"&&typeof $.fn.dataTableExt.fnVersionCheck=="function"&&$.fn.dataTableExt.fnVersionCheck('1.7.0'))
{$.fn.dataTableExt.aoFeatures.push({"fnInit":function(oDTSettings){var init=oDTSettings.oInit;var colvis=new ColVis(oDTSettings,init.colVis||init.oColVis||{});return colvis.button();},"cFeature":"C","sFeature":"ColVis"});}
else
{alert("Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download");}
$.fn.dataTable.ColVis=ColVis;$.fn.DataTable.ColVis=ColVis;return ColVis;};if(typeof define==='function'&&define.amd){define(['jquery','datatables'],factory);}
else if(typeof exports==='object'){factory(require('jquery'),require('datatables'));}
else if(jQuery&&!jQuery.fn.dataTable.ColVis){factory(jQuery,jQuery.fn.dataTable);}})(window,document);