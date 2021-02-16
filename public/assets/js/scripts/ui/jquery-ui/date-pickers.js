$(document).ready(function(){$(".datepicker-default").datepicker();$(".datepicker-animation").datepicker();$(".dp-animation").on("change",function(){$(".datepicker-animation").datepicker("option","showAnim",$(this).val());});$(".dp-other-month").datepicker({showOtherMonths:true,selectOtherMonths:true});$(".dp-button-bar").datepicker({showButtonPanel:true});$(".dp-inline").datepicker();$(".dp-month-year").datepicker({changeMonth:true,changeYear:true});$(".dp-multiple-months").datepicker({numberOfMonths:3,showButtonPanel:true});$(".dp-constrain-input").datepicker({constrainInput:true,});$(".dp-year-range").datepicker({yearRange:"2015:2016"});$(".dp-step-months").datepicker({stepMonths:3});$(".dp-format-date").datepicker();$(".date-formats").on("change",function(){$(".dp-format-date").datepicker("option","dateFormat",$(this).val());});$(".dp-icon-trigger").datepicker({showOn:"button",buttonImage:"../../../app-assets/images/jqueryui/calendar.png",buttonImageOnly:true,buttonText:"Select date"});$(".dp-for-alternate").datepicker({altField:".dp-alternate",altFormat:"DD, d MM, yy"});$(".dp-date-range").datepicker({minDate:-20,maxDate:"+1M +10D"});$(".dp-week-year").datepicker({showWeek:true,firstDay:1});var dateFormat="mm/dd/yy",from=$(".dp-date-range-from").datepicker({defaultDate:"+1w",changeMonth:true,}).on("change",function(){to.datepicker("option","minDate",getDate(this));}),to=$(".dp-date-range-to").datepicker({defaultDate:"+1w",changeMonth:true,}).on("change",function(){from.datepicker("option","maxDate",getDate(this));});function getDate(element){var date;try{date=$.datepicker.parseDate(dateFormat,element.value);}catch(error){date=null;}
return date;}
$('.ui-datepicker').wrap('<div class="dp-skin"/>');});