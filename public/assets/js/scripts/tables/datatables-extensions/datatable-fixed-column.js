$(document).ready(function(){$('.dataex-basic-initialisation').DataTable({scrollY:300,scrollX:true,scrollCollapse:true,paging:false,fixedColumns:true});var tableLeftRight=$('.dataex-lr-fixedcolumns').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,fixedColumns:{leftColumns:1,rightColumns:1}});var tableMultipleFixed=$('.dataex-multiple-fixed').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,fixedColumns:{leftColumns:2}});var tableRightColumn=$('.dataex-right-column').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,fixedColumns:{leftColumns:0,rightColumns:1}});var tableVisibility=$('.dataex-column-visibility').DataTable({dom:"Bfrtip",scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,buttons:['colvis'],fixedColumns:{leftColumns:2}});var tableCssRow=$('.dataex-css-row').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,fixedColumns:{heightMatch:'none'}});var tableColumnWidth=$('.dataex-column-width').removeAttr('width').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,columnDefs:[{width:200,targets:0}],fixedColumns:true});var tableTndex=$('.dataex-index-column').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,columnDefs:[{sortable:false,"class":"index",targets:0}],order:[[1,'asc']],fixedColumns:true});tableTndex.on('order.dt search.dt',function(){tableTndex.column(0,{search:'applied',order:'applied'}).nodes().each(function(cell,i){cell.innerHTML=i+1;});}).draw();$('.dataex-Select-row').DataTable({scrollY:300,scrollX:true,scrollCollapse:true,paging:false,fixedColumns:true,select:true});$('.dataex-checkboxes').DataTable({scrollY:300,scrollX:true,scrollCollapse:true,paging:false,fixedColumns:true,columnDefs:[{orderable:false,className:'select-checkbox',targets:0}],select:{style:'os',selector:'td:first-child'},order:[[1,'asc']]});var tableComplexHeaders=$('.dataex-complex-headers').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,fixedColumns:true});$('.dataex-individual-filtering tfoot th').each(function(i){var title=$('.dataex-individual-filtering thead th').eq($(this).index()).text();$(this).html('<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />');});var tableIndividualFiltering=$('.dataex-individual-filtering').DataTable({scrollY:"300px",scrollX:true,scrollCollapse:true,paging:false,fixedColumns:true});$(tableIndividualFiltering.table().container()).on('keyup','tfoot input',function(){tableIndividualFiltering.column($(this).data('index')).search(this.value).draw();});$('.DTFC_RightBodyLiner').css('overflow-y','hidden');});