tinymce.ThemeManager.add('modern',function(editor){var self=this,settings=editor.settings,Factory=tinymce.ui.Factory,each=tinymce.each,DOM=tinymce.DOM,Rect=tinymce.geom.Rect,FloatPanel=tinymce.ui.FloatPanel;var defaultMenus={file:{title:'File',items:'newdocument'},edit:{title:'Edit',items:'undo redo | cut copy paste pastetext | selectall'},insert:{title:'Insert',items:'|'},view:{title:'View',items:'visualaid |'},format:{title:'Format',items:'bold italic underline strikethrough superscript subscript | formats | removeformat'},table:{title:'Table'},tools:{title:'Tools'}};var defaultToolbar="undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | "+
"bullist numlist outdent indent | link image";function createToolbar(items,size){var toolbarItems=[],buttonGroup;if(!items){return;}
each(items.split(/[ ,]/),function(item){var itemName;function bindSelectorChanged(){var selection=editor.selection;function setActiveItem(name){return function(state,args){var nodeName,i=args.parents.length;while(i--){nodeName=args.parents[i].nodeName;if(nodeName=="OL"||nodeName=="UL"){break;}}
item.active(state&&nodeName==name);};}
if(itemName=="bullist"){selection.selectorChanged('ul > li',setActiveItem("UL"));}
if(itemName=="numlist"){selection.selectorChanged('ol > li',setActiveItem("OL"));}
if(item.settings.stateSelector){selection.selectorChanged(item.settings.stateSelector,function(state){item.active(state);},true);}
if(item.settings.disabledStateSelector){selection.selectorChanged(item.settings.disabledStateSelector,function(state){item.disabled(state);});}}
if(item=="|"){buttonGroup=null;}else{if(Factory.has(item)){item={type:item,size:size};toolbarItems.push(item);buttonGroup=null;}else{if(!buttonGroup){buttonGroup={type:'buttongroup',items:[]};toolbarItems.push(buttonGroup);}
if(editor.buttons[item]){itemName=item;item=editor.buttons[itemName];if(typeof item=="function"){item=item();}
item.type=item.type||'button';item.size=size;item=Factory.create(item);buttonGroup.items.push(item);if(editor.initialized){bindSelectorChanged();}else{editor.on('init',bindSelectorChanged);}}}}});return{type:'toolbar',layout:'flow',items:toolbarItems};}
function createToolbars(size){var toolbars=[];function addToolbar(items){if(items){toolbars.push(createToolbar(items,size));return true;}}
if(tinymce.isArray(settings.toolbar)){if(settings.toolbar.length===0){return;}
tinymce.each(settings.toolbar,function(toolbar,i){settings["toolbar"+(i+1)]=toolbar;});delete settings.toolbar;}
for(var i=1;i<10;i++){if(!addToolbar(settings["toolbar"+i])){break;}}
if(!toolbars.length&&settings.toolbar!==false){addToolbar(settings.toolbar||defaultToolbar);}
if(toolbars.length){return{type:'panel',layout:'stack',classes:"toolbar-grp",ariaRoot:true,ariaRemember:true,items:toolbars};}}
function createMenuButtons(){var name,menuButtons=[];function createMenuItem(name){var menuItem;if(name=='|'){return{text:'|'};}
menuItem=editor.menuItems[name];return menuItem;}
function createMenu(context){var menuButton,menu,menuItems,isUserDefined,removedMenuItems;removedMenuItems=tinymce.makeMap((settings.removed_menuitems||'').split(/[ ,]/));if(settings.menu){menu=settings.menu[context];isUserDefined=true;}else{menu=defaultMenus[context];}
if(menu){menuButton={text:menu.title};menuItems=[];each((menu.items||'').split(/[ ,]/),function(item){var menuItem=createMenuItem(item);if(menuItem&&!removedMenuItems[item]){menuItems.push(createMenuItem(item));}});if(!isUserDefined){each(editor.menuItems,function(menuItem){if(menuItem.context==context){if(menuItem.separator=='before'){menuItems.push({text:'|'});}
if(menuItem.prependToContext){menuItems.unshift(menuItem);}else{menuItems.push(menuItem);}
if(menuItem.separator=='after'){menuItems.push({text:'|'});}}});}
for(var i=0;i<menuItems.length;i++){if(menuItems[i].text=='|'){if(i===0||i==menuItems.length-1){menuItems.splice(i,1);}}}
menuButton.menu=menuItems;if(!menuButton.menu.length){return null;}}
return menuButton;}
var defaultMenuBar=[];if(settings.menu){for(name in settings.menu){defaultMenuBar.push(name);}}else{for(name in defaultMenus){defaultMenuBar.push(name);}}
var enabledMenuNames=typeof settings.menubar=="string"?settings.menubar.split(/[ ,]/):defaultMenuBar;for(var i=0;i<enabledMenuNames.length;i++){var menu=enabledMenuNames[i];menu=createMenu(menu);if(menu){menuButtons.push(menu);}}
return menuButtons;}
function addAccessibilityKeys(panel){function focus(type){var item=panel.find(type)[0];if(item){item.focus(true);}}
editor.shortcuts.add('Alt+F9','',function(){focus('menubar');});editor.shortcuts.add('Alt+F10','',function(){focus('toolbar');});editor.shortcuts.add('Alt+F11','',function(){focus('elementpath');});panel.on('cancel',function(){editor.focus();});}
function resizeTo(width,height){var containerElm,iframeElm,containerSize,iframeSize;function getSize(elm){return{width:elm.clientWidth,height:elm.clientHeight};}
containerElm=editor.getContainer();iframeElm=editor.getContentAreaContainer().firstChild;containerSize=getSize(containerElm);iframeSize=getSize(iframeElm);if(width!==null){width=Math.max(settings.min_width||100,width);width=Math.min(settings.max_width||0xFFFF,width);DOM.setStyle(containerElm,'width',width+(containerSize.width-iframeSize.width));DOM.setStyle(iframeElm,'width',width);}
height=Math.max(settings.min_height||100,height);height=Math.min(settings.max_height||0xFFFF,height);DOM.setStyle(iframeElm,'height',height);editor.fire('ResizeEditor');}
function resizeBy(dw,dh){var elm=editor.getContentAreaContainer();self.resizeTo(elm.clientWidth+dw,elm.clientHeight+dh);}
function addContextualToolbars(){var scrollContainer;function getContextToolbars(){return editor.contextToolbars||[];}
function getElementRect(elm){var pos,targetRect,root;pos=tinymce.DOM.getPos(editor.getContentAreaContainer());targetRect=editor.dom.getRect(elm);root=editor.dom.getRoot();if(root.nodeName=='BODY'){targetRect.x-=root.ownerDocument.documentElement.scrollLeft||root.scrollLeft;targetRect.y-=root.ownerDocument.documentElement.scrollTop||root.scrollTop;}
targetRect.x+=pos.x;targetRect.y+=pos.y;return targetRect;}
function hideAllFloatingPanels(){each(editor.contextToolbars,function(toolbar){if(toolbar.panel){toolbar.panel.hide();}});}
function togglePositionClass(panel,relPos,predicate){relPos=relPos?relPos.substr(0,2):'';each({t:'down',b:'up'},function(cls,pos){panel.classes.toggle('arrow-'+cls,predicate(pos,relPos.substr(0,1)));});each({l:'left',r:'right'},function(cls,pos){panel.classes.toggle('arrow-'+cls,predicate(pos,relPos.substr(1,1)));});}
function toClientRect(geomRect){return{left:geomRect.x,top:geomRect.y,width:geomRect.w,height:geomRect.h,right:geomRect.x+geomRect.w,bottom:geomRect.y+geomRect.h};}
function userConstrain(x,y,elementRect,contentAreaRect,panelRect){panelRect=toClientRect({x:x,y:y,w:panelRect.w,h:panelRect.h});if(settings.inline_toolbar_position_handler){panelRect=settings.inline_toolbar_position_handler({elementRect:toClientRect(elementRect),contentAreaRect:toClientRect(contentAreaRect),panelRect:panelRect});}
return panelRect;}
function movePanelTo(panel,pos){panel.moveTo(pos.left,pos.top);}
function reposition(match){var relPos,panelRect,elementRect,contentAreaRect,panel,relRect,testPositions;if(editor.removed){return;}
if(!match||!match.toolbar.panel){hideAllFloatingPanels();return;}
testPositions=['bc-tc','tc-bc','tl-bl','bl-tl','tr-br','br-tr'];panel=match.toolbar.panel;panel.show();elementRect=getElementRect(match.element);panelRect=tinymce.DOM.getRect(panel.getEl());contentAreaRect=tinymce.DOM.getRect(editor.getContentAreaContainer()||editor.getBody());elementRect.w=match.element.clientWidth;elementRect.h=match.element.clientHeight;if(!editor.inline){contentAreaRect.w=editor.getDoc().documentElement.offsetWidth;}
if(editor.selection.controlSelection.isResizable(match.element)){elementRect=Rect.inflate(elementRect,0,8);}
relPos=Rect.findBestRelativePosition(panelRect,elementRect,contentAreaRect,testPositions);elementRect=Rect.clamp(elementRect,contentAreaRect);if(relPos){relRect=Rect.relativePosition(panelRect,elementRect,relPos);movePanelTo(panel,userConstrain(relRect.x,relRect.y,elementRect,contentAreaRect,panelRect));}else{contentAreaRect.h+=40;elementRect=Rect.intersect(contentAreaRect,elementRect);if(elementRect){relPos=Rect.findBestRelativePosition(panelRect,elementRect,contentAreaRect,['bc-tc','bl-tl','br-tr']);if(relPos){relRect=Rect.relativePosition(panelRect,elementRect,relPos);movePanelTo(panel,userConstrain(relRect.x,relRect.y,elementRect,contentAreaRect,panelRect));}else{movePanelTo(panel,userConstrain(elementRect.x,elementRect.y,elementRect,contentAreaRect,panelRect));}}else{panel.hide();}}
togglePositionClass(panel,relPos,function(pos1,pos2){return(!elementRect||elementRect.w>40)&&pos1===pos2;});}
function repositionHandler(){function execute(){if(editor.selection){reposition(findFrontMostMatch(editor.selection.getNode()));}}
tinymce.util.Delay.requestAnimationFrame(execute);}
function bindScrollEvent(){if(!scrollContainer){scrollContainer=editor.selection.getScrollContainer()||editor.getWin();tinymce.$(scrollContainer).on('scroll',repositionHandler);editor.on('remove',function(){tinymce.$(scrollContainer).off('scroll');});}}
function showContextToolbar(match){var panel;if(match.toolbar.panel){match.toolbar.panel.show();reposition(match);return;}
bindScrollEvent();panel=Factory.create({type:'floatpanel',role:'dialog',classes:'tinymce tinymce-inline arrow',ariaLabel:'Inline toolbar',layout:'flex',direction:'column',align:'stretch',autohide:false,autofix:true,fixed:true,border:1,items:createToolbar(match.toolbar.items),oncancel:function(){editor.focus();}});match.toolbar.panel=panel;panel.renderTo(document.body).reflow();reposition(match);}
function hideAllContextToolbars(){tinymce.each(getContextToolbars(),function(toolbar){if(toolbar.panel){toolbar.panel.hide();}});}
function findFrontMostMatch(targetElm){var i,y,parentsAndSelf,toolbars=getContextToolbars();parentsAndSelf=editor.$(targetElm).parents().add(targetElm);for(i=parentsAndSelf.length-1;i>=0;i--){for(y=toolbars.length-1;y>=0;y--){if(toolbars[y].predicate(parentsAndSelf[i])){return{toolbar:toolbars[y],element:parentsAndSelf[i]};}}}
return null;}
editor.on('click keyup setContent',function(e){if(e.type=='setcontent'&&!e.selection){return;}
tinymce.util.Delay.setEditorTimeout(editor,function(){var match;match=findFrontMostMatch(editor.selection.getNode());if(match){hideAllContextToolbars();showContextToolbar(match);}else{hideAllContextToolbars();}});});editor.on('blur hide',hideAllContextToolbars);editor.on('ObjectResizeStart',function(){var match=findFrontMostMatch(editor.selection.getNode());if(match&&match.toolbar.panel){match.toolbar.panel.hide();}});editor.on('nodeChange ResizeEditor ResizeWindow',repositionHandler);editor.on('remove',function(){tinymce.each(getContextToolbars(),function(toolbar){if(toolbar.panel){toolbar.panel.remove();}});editor.contextToolbars={};});editor.shortcuts.add('ctrl+shift+e > ctrl+shift+p','',function(){var match=findFrontMostMatch(editor.selection.getNode());if(match&&match.toolbar.panel){match.toolbar.panel.items()[0].focus();}});}
function fireSkinLoaded(editor){return function(){if(editor.initialized){editor.fire('SkinLoaded');}else{editor.on('init',function(){editor.fire('SkinLoaded');});}};}
function renderInlineUI(args){var panel,inlineToolbarContainer;if(settings.fixed_toolbar_container){inlineToolbarContainer=DOM.select(settings.fixed_toolbar_container)[0];}
function reposition(){if(panel&&panel.moveRel&&panel.visible()&&!panel._fixed){var scrollContainer=editor.selection.getScrollContainer(),body=editor.getBody();var deltaX=0,deltaY=0;if(scrollContainer){var bodyPos=DOM.getPos(body),scrollContainerPos=DOM.getPos(scrollContainer);deltaX=Math.max(0,scrollContainerPos.x-bodyPos.x);deltaY=Math.max(0,scrollContainerPos.y-bodyPos.y);}
panel.fixed(false).moveRel(body,editor.rtl?['tr-br','br-tr']:['tl-bl','bl-tl','tr-br']).moveBy(deltaX,deltaY);}}
function show(){if(panel){panel.show();reposition();DOM.addClass(editor.getBody(),'mce-edit-focus');}}
function hide(){if(panel){panel.hide();FloatPanel.hideAll();DOM.removeClass(editor.getBody(),'mce-edit-focus');}}
function render(){if(panel){if(!panel.visible()){show();}
return;}
panel=self.panel=Factory.create({type:inlineToolbarContainer?'panel':'floatpanel',role:'application',classes:'tinymce tinymce-inline',layout:'flex',direction:'column',align:'stretch',autohide:false,autofix:true,fixed:!!inlineToolbarContainer,border:1,items:[settings.menubar===false?null:{type:'menubar',border:'0 0 1 0',items:createMenuButtons()},createToolbars(settings.toolbar_items_size)]});editor.fire('BeforeRenderUI');panel.renderTo(inlineToolbarContainer||document.body).reflow();addAccessibilityKeys(panel);show();addContextualToolbars();editor.on('nodeChange',reposition);editor.on('activate',show);editor.on('deactivate',hide);editor.nodeChanged();}
settings.content_editable=true;editor.on('focus',function(){if(args.skinUiCss){tinymce.DOM.styleSheetLoader.load(args.skinUiCss,render,render);}else{render();}});editor.on('blur hide',hide);editor.on('remove',function(){if(panel){panel.remove();panel=null;}});if(args.skinUiCss){tinymce.DOM.styleSheetLoader.load(args.skinUiCss,fireSkinLoaded(editor));}
return{};}
function renderIframeUI(args){var panel,resizeHandleCtrl,startSize;function switchMode(){return function(e){if(e.mode=='readonly'){panel.find('*').disabled(true);}else{panel.find('*').disabled(false);}};}
if(args.skinUiCss){tinymce.DOM.styleSheetLoader.load(args.skinUiCss,fireSkinLoaded(editor));}
panel=self.panel=Factory.create({type:'panel',role:'application',classes:'tinymce',style:'visibility: hidden',layout:'stack',border:1,items:[settings.menubar===false?null:{type:'menubar',border:'0 0 1 0',items:createMenuButtons()},createToolbars(settings.toolbar_items_size),{type:'panel',name:'iframe',layout:'stack',classes:'edit-area',html:'',border:'1 0 0 0'}]});if(settings.resize!==false){resizeHandleCtrl={type:'resizehandle',direction:settings.resize,onResizeStart:function(){var elm=editor.getContentAreaContainer().firstChild;startSize={width:elm.clientWidth,height:elm.clientHeight};},onResize:function(e){if(settings.resize=='both'){resizeTo(startSize.width+e.deltaX,startSize.height+e.deltaY);}else{resizeTo(null,startSize.height+e.deltaY);}}};}
if(settings.statusbar!==false){panel.add({type:'panel',name:'statusbar',classes:'statusbar',layout:'flow',border:'1 0 0 0',ariaRoot:true,items:[{type:'elementpath'},resizeHandleCtrl]});}
editor.fire('BeforeRenderUI');editor.on('SwitchMode',switchMode());panel.renderBefore(args.targetNode).reflow();if(settings.readonly){editor.setMode('readonly');}
if(settings.width){tinymce.DOM.setStyle(panel.getEl(),'width',settings.width);}
editor.on('remove',function(){panel.remove();panel=null;});addAccessibilityKeys(panel);addContextualToolbars();return{iframeContainer:panel.find('#iframe')[0].getEl(),editorContainer:panel.getEl()};}
self.renderUI=function(args){var skin=settings.skin!==false?settings.skin||'lightgray':false;if(skin){var skinUrl=settings.skin_url;if(skinUrl){skinUrl=editor.documentBaseURI.toAbsolute(skinUrl);}else{skinUrl=tinymce.baseURL+'/skins/'+skin;}
if(tinymce.Env.documentMode<=7){args.skinUiCss=skinUrl+'/skin.ie7.min.css';}else{args.skinUiCss=skinUrl+'/skin.min.css';}
editor.contentCSS.push(skinUrl+'/content'+(editor.inline?'.inline':'')+'.min.css');}
editor.on('ProgressState',function(e){self.throbber=self.throbber||new tinymce.ui.Throbber(self.panel.getEl('body'));if(e.state){self.throbber.show(e.time);}else{self.throbber.hide();}});if(settings.inline){return renderInlineUI(args);}
return renderIframeUI(args);};self.resizeTo=resizeTo;self.resizeBy=resizeBy;});