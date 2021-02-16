var fileExportTable = $('.file-export').DataTable({
    dom: 'Bfrtip',
    columnDefs: [{
        className: "dt-center",
        targets: "_all"
    }],
    buttons: ['excel', 'print'],
    oLanguage: {
        oAria: {
            sSortAscending: ": قمت بالتفعيل للترتيب تصاعدياً",
            sSortDescending: ": قمت بالتفعيل للترتيب تنازلياً"
        },
        sUrl: "",
        oPaginate: {
            sFirst: "الأول",
            sPrevious: "السابق",
            sNext: "التالي",
            sLast: "الأخير"
        },
        sEmptyTable: "لا توجد بيانات لعرضها",
        sInfo: "إظهار _START_ إلى _END_ من أصل _TOTAL_ بيان",
        sInfoEmpty: "عذراً، لا توجد نتائج لعرضها!",
        sInfoFiltered: "(منتقاة من مجموع _MAX_ بيان)",
        sInfoPostFix: "",
        sSearch: "بحث : ",
        sDecimal: "",
        sThousands: ",",
        sLengthMenu: "أظهر _MENU_ بيان",
        sLoadingRecords: "تحميل ...",
        sProcessing: "جارٍ التحميل...",
        sSearchPlaceholder: "",
        sZeroRecords: "لم يعثر على أية بيانات",
    },
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
