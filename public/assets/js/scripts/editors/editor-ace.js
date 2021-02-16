(function(window,document,$){'use strict';var basic=ace.edit("editor_basic");basic.getSession().setMode("ace/mode/javascript");var basicTheme=ace.edit("editor_basic_theme");basicTheme.getSession().setMode("ace/mode/html");basicTheme.setTheme("ace/theme/twilight");basicTheme.setShowPrintMargin(false);basicTheme.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:false});var autoresize=ace.edit("editor_autoresize");autoresize.setTheme("ace/theme/tomorrow_night_eighties");autoresize.session.setMode("ace/mode/html");autoresize.setAutoScrollEditorIntoView(true);autoresize.setOption("maxLines",100);var keyboard=ace.edit("editor_keyboard");keyboard.setTheme("ace/theme/chaos");keyboard.session.setMode("ace/mode/html");keyboard.commands.addCommand({name:"showKeyboardShortcuts",bindKey:{win:"Ctrl-Alt-h",mac:"Command-Alt-h"},exec:function(keyboard){ace.config.loadModule("ace/ext/keybinding_menu",function(module){module.init(keyboard);});}});keyboard.execCommand("showKeyboardShortcuts");var css=ace.edit("editor_css");css.setTheme("ace/theme/clouds_midnight");css.getSession().setMode("ace/mode/css");var sass=ace.edit("editor_sass");sass.setTheme("ace/theme/github");sass.getSession().setMode("ace/mode/sass");var json=ace.edit("editor_json");json.setTheme("ace/theme/iplastic");json.getSession().setMode("ace/mode/json");var php=ace.edit("editor_php");php.setTheme("ace/theme/merbivore");php.getSession().setMode("ace/mode/php");})(window,document,jQuery);