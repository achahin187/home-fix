(function(window,document,$){'use strict';$('[data-toggle="popover"]').popover();$('#show-popover').popover({title:'Popover Show Event',content:'Bonbon chocolate cake. Pudding halvah pie apple pie topping marzipan pastry marzipan cupcake.',trigger:'click',placement:'right'}).on('show.bs.popover',function(){alert('Show event fired.');});$('#shown-popover').popover({title:'Popover Shown Event',content:'Bonbon chocolate cake. Pudding halvah pie apple pie topping marzipan pastry marzipan cupcake.',trigger:'click',placement:'bottom'}).on('shown.bs.popover',function(){alert('Shown event fired.');});$('#hide-popover').popover({title:'Popover Hide Event',content:'Bonbon chocolate cake. Pudding halvah pie apple pie topping marzipan pastry marzipan cupcake.',trigger:'click',placement:'bottom'}).on('hide.bs.popover',function(){alert('Hide event fired.');});$('#hidden-popover').popover({title:'Popover Hidden Event',content:'Bonbon chocolate cake. Pudding halvah pie apple pie topping marzipan pastry marzipan cupcake.',trigger:'click',placement:'left'}).on('hidden.bs.popover',function(){alert('Hidden event fired.');});$('#show-method').on('click',function(){$(this).popover('show');});$('#hide-method').on('mouseenter',function(){$(this).popover('show');});$('#hide-method').on('click',function(){$(this).popover('hide');});$('#toggle-method').on('click',function(){$(this).popover('toggle');});$('#dispose').on('click',function(){$('#dispose-method').popover('dispose');});$('.manual').on('click',function(){$(this).popover('show');});$('.manual').on('mouseout',function(){$(this).popover('hide');});$('[data-popup=popover-color]').popover({template:'<div class="popover"><div class="bg-teal"><div class="popover-arrow"></div><div class="popover-inner"></div></div></div>'});$('[data-popup=popover-border]').popover({template:'<div class="popover"><div class="border-orange"><div class="popover-arrow"></div><div class="popover-inner"></div></div></div>'});})(window,document,jQuery);