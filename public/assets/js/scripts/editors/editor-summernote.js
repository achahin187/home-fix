(function(window,document,$){'use strict';var edit=function(){$('.summernote-edit').summernote({focus:true});};var save=function(){var makrup=$('.summernote-edit').summernote('code');$('.summernote-edit').summernote('destroy');};document.getElementById('edit').onclick=function(){edit();};document.getElementById('save').onclick=function(){save();};$('.summernote').summernote();$('.summernote-air').summernote({airMode:true});$('.summernote-code').summernote({height:350,codemirror:{theme:'monokai'}});})(window,document,jQuery);