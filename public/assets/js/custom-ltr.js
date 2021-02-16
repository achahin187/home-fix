var fileExportTable = $('.file-export').DataTable({
    dom: 'Bfrtip',
    columnDefs: [{
        className: "dt-center",
        targets: "_all"
    }],
    buttons: ['excel', 'print'],
    fixedHeader: {
        header: true,
        headerOffset: $('.header-navbar').outerHeight()
    },
    scrollX: true,
    bFilter: true,
    fnDrawCallback: function () {
        if (Math.ceil((this.fnSettings().fnRecordsDisplay()) / this.fnSettings()._iDisplayLength) > 1) {
            $('.dataTables_paginate').css("display", "block");
        } else {
            $('.dataTables_paginate').css("display", "none");
        }
    }
});
$('.buttons-excel, .buttons-print').addClass('btn btn-info mr-1');
// A $( document ).ready() block.
$(document).ready(function () {
    fileExportTable.fixedHeader.enable();
    fileExportTable.columns.adjust().draw();
});
