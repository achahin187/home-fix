$(document).ready(function(){$('.vertical-scroll').perfectScrollbar({suppressScrollX:true,theme:'dark',wheelPropagation:true});$('.horizontal-scroll').perfectScrollbar({suppressScrollY:true,theme:'dark',wheelPropagation:true});$('.both-side-scroll').perfectScrollbar({theme:'dark',wheelPropagation:true});$('.visible-scroll').perfectScrollbar({theme:'dark',wheelPropagation:true});$('.min-scroll-length').perfectScrollbar({minScrollbarLength:200,wheelPropagation:true});$('.scrollbar-margins').perfectScrollbar({wheelPropagation:true});$('.default-handlers').perfectScrollbar({wheelPropagation:true});$('.no-keyboard').perfectScrollbar({handlers:['click-rail','drag-scrollbar','wheel','touch'],wheelPropagation:true});$('.click-drag-handler').perfectScrollbar({handlers:['click-rail','drag-scrollbar'],wheelPropagation:true});$('.default-wheel-speed').perfectScrollbar({wheelPropagation:true});$('.higher-wheel-speed').perfectScrollbar({wheelSpeed:10,wheelPropagation:true});$('.lower-wheel-speed').perfectScrollbar({wheelSpeed:0.1,wheelPropagation:true});});