(function(window, undefined) {
    'use strict';
})(window);
$(function() {
    'use strict';
    $('#onshowbtn').on('click', function() {
        $('#onshow').on('show.bs.modal', function() {
            alert('onShow event fired.');
        });
    });
    $('#onshownbtn').on('click', function() {
        $('#onshown').on('shown.bs.modal', function() {
            alert('onShown event fired.');
        });
    });
    $('#onhidebtn').on('click', function() {
        $('#onhide').on('hide.bs.modal', function() {
            alert('onHide event fired.');
        });
    });
    $('#onhiddenbtn').on('click', function() {
        $('#onhidden').on('hidden.bs.modal', function() {
            alert('onHidden event fired.');
        });
    });
    $(document).tooltip();
    $('.tool-item').on('click', function() {
        window.location = $(this).attr('href');
    });
    $('#loading').hide();
    $('#icon_error').hide();
    var fitties = [];
    setTimeout(function() {
        fitties = fitty('.data_to_fit', {
            minSize: 12,
            maxSize: 50
        });
    }, 1000);
});
$('.delete_record').on('click', function(e) {
    e.preventDefault();
    var item = $(this),
        page = item.attr('data-url'),
        item_parent = 'tr#' + item.attr('id'),
        confirmMessage = item.attr('data-confirm-message'),
        errorMessage = item.attr('data-error-message'),
        successMessage = item.attr('data-success-message'),
        confirm = item.attr('data-ok'),
        cancel = item.attr('data-cancel'),
        token = item.attr('data-token'),
        redirectUrl = item.attr('data-redirect');
    swal({
        title: confirmMessage,
        icon: "warning",
        buttons: {
            cancel: {
                text: cancel,
                value: null,
                visible: true,
                className: "",
                closeModal: false,
            },
            confirm: {
                text: confirm,
                value: true,
                visible: true,
                className: "",
                closeModal: false
            }
        }
    }).then(isConfirm => {
        if (isConfirm) {
            jQuery.ajax({
                async: true,
                type: "POST",
                dataType: "JSON",
                url: page,
                data: {
                    "_method": "DELETE",
                    "_token": token,
                },
                success: function(data) {
                    if (data === "success") {
                        $(item_parent).fadeTo(400, 0, function() {
                            $(item_parent).slideUp(400);
                        });
                        // fileExportTable.row($(item_parent)).remove().draw(false);
                        if (redirectUrl) {
                            setTimeout(function() {
                                window.location = redirectUrl;
                            }, 1000);
                        }
                        swal(successMessage, "", "success");
                    } else {
                        swal(errorMessage, "", "error");
                    }
                },
                error: function() {
                    return true;
                }
            });
        } else {
            $('.swal-overlay').removeClass('swal-overlay--show-modal');
        }
    });
});
$('.ban_user').on('click', function(e) {
    e.preventDefault();
    var item = $(this),
        page = item.attr('data-url'),
        item_parent = 'tr#' + item.attr('id'),
        confirmMessage = item.attr('data-confirm-message'),
        errorMessage = item.attr('data-error-message'),
        successMessage = item.attr('data-success-message'),
        confirm = item.attr('data-ok'),
        cancel = item.attr('data-cancel'),
        token = item.attr('data-token');
    swal({
        title: confirmMessage,
        icon: "warning",
        buttons: {
            cancel: {
                text: cancel,
                value: null,
                visible: true,
                className: "",
                closeModal: false,
            },
            confirm: {
                text: confirm,
                value: true,
                visible: true,
                className: "",
                closeModal: false
            }
        }
    }).then(isConfirm => {
        if (isConfirm) {
            jQuery.ajax({
                async: true,
                type: "POST",
                dataType: "JSON",
                url: page,
                data: {
                    "_method": "PUT",
                    "_token": token,
                },
                success: function(data) {
                    if (data === "success") {
                        swal(successMessage, "", "success");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    } else {
                        swal(errorMessage, "", "error");
                    }
                },
                error: function() {
                    return true;
                }
            });
        } else {
            $('.swal-overlay').removeClass('swal-overlay--show-modal');
        }
    });
});
$('.verify_user').on('click', function(e) {
    e.preventDefault();
    var item = $(this),
        page = item.attr('data-url'),
        item_parent = 'tr#' + item.attr('id'),
        confirmMessage = item.attr('data-confirm-message'),
        errorMessage = item.attr('data-error-message'),
        successMessage = item.attr('data-success-message'),
        confirm = item.attr('data-ok'),
        cancel = item.attr('data-cancel'),
        token = item.attr('data-token');
    swal({
        title: confirmMessage,
        icon: "warning",
        buttons: {
            cancel: {
                text: cancel,
                value: null,
                visible: true,
                className: "",
                closeModal: false,
            },
            confirm: {
                text: confirm,
                value: true,
                visible: true,
                className: "",
                closeModal: false
            }
        }
    }).then(isConfirm => {
        if (isConfirm) {
            jQuery.ajax({
                async: true,
                type: "POST",
                dataType: "JSON",
                url: page,
                data: {
                    "_method": "PUT",
                    "_token": token,
                },
                success: function(data) {
                    if (data === "success") {
                        swal(successMessage, "", "success");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    } else {
                        swal(errorMessage, "", "error");
                    }
                },
                error: function() {
                    return true;
                }
            });
        } else {
            $('.swal-overlay').removeClass('swal-overlay--show-modal');
        }
    });
});

$('.sendMessage').on('click', function(e) {
    e.preventDefault();
    var item = $(this),
        page = item.attr('data-url'),
        item_parent = 'tr#' + item.attr('id'),
        confirmMessage = item.attr('data-confirm-message'),
        errorMessage = item.attr('data-error-message'),
        successMessage = item.attr('data-success-message'),
        confirm = item.attr('data-ok'),
        cancel = item.attr('data-cancel'),
        token = item.attr('data-token');
    swal({
        title: confirmMessage,
        icon: "warning",
        buttons: {
            cancel: {
                text: cancel,
                value: null,
                visible: true,
                className: "",
                closeModal: false,
            },
            confirm: {
                text: confirm,
                value: true,
                visible: true,
                className: "",
                closeModal: false
            }
        }
    }).then(isConfirm => {
        if (isConfirm) {
            jQuery.ajax({
                async: true,
                type: "GET",
                dataType: "JSON",
                url: page,
                data: {
                    "_method": "GET",
                    "_token": token,
                },
                success: function(data) {
                    if (data === "success") {
                        swal(successMessage, "", "success");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    } else {
                        swal(errorMessage, "", "error");
                    }
                },
                error: function() {
                    return true;
                }
            });
        } else {
            $('.swal-overlay').removeClass('swal-overlay--show-modal');
        }
    });
});

$("#parent_cat_selector").on('change', function(e) {
    if ($(this).val() > 0) {
        $("#quick_price").addClass('hidden');
        $("#checkup_price").removeClass('hidden');
        $("#checkup_price_input").attr('required', 'required');
        $("#quick_price_input").removeAttr('required');
    } else {
        $("#quick_price").removeClass('hidden');
        $("#checkup_price").addClass('hidden');
        $("#checkup_price_input").removeAttr('required');
        $("#quick_price_input").attr('required', 'required');
    }
});
$("#icon-finder").on('keypress', function(e) {
    if (e.which === 13) {
        e.preventDefault();
        $('#icon_error').hide();
        $('#finder-content').removeClass('hidden');
        $('#loading').show();
        var searchQuery = $(this).val(),
            app_url = $(this).attr('data-url');
        $.ajax({
            url: app_url + '/icons',
            type: 'GET',
            data: {
                'q': searchQuery
            },
            success: function(data) {
                $("#finder-content").html("");
                $('#loading').hide();
                data = JSON.parse(data).data;
                data.forEach(function(icon) {
                    $("#finder-content").append("" +
                        "<label class=\"col-md-2\">\n" +
                        "   <input type=\"radio\" name=\"icon\" value=\"" + icon.images.png[512] + "\" class=\"hidden\">\n" +
                        "   <img src=\"" + icon.images.png[512] + "\" class=\"img-thumbnail\">\n" +
                        "</label>\n");
                });
            },
            error: function() {
                $('#loading').hide();
                $('#icon_error').show();
            }
        });
    }
});

function view_review(comment, title, review) {
    var el = document.createElement('span');
    el.innerHTML = comment +
        "<div class=\"rateit\" data-rateit-value=\"" +
        review +
        "\" data-rateit-ispreset=\"true\" data-rateit-readonly=\"true\"></div>";
    swal({
        title: title,
        content: {
            element: el,
        }
    });
}

$('.notifications-clear').on('click', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/notifications/clear',
        type: 'GET',
    });
    $('.notifications-count').html('0');
    $('.notifications-container').html('' +
        '<a href="#">\n' +
        '<div class="media">\n' +
        '<div class="media-left align-self-center">\n' +
        '<i class="ft-alert-triangle icon-bg-circle bg-red"></i></div>\n' +
        '<div class="media-body">\n' +
        '<h6 class="media-heading text-center font-medium-2 mr-0">\n' +
        $('.no-notifications').text() + '</h6>\n' +
        '<p class="notification-text font-small-3 text-muted"></p>\n' +
        '</div>\n' +
        '</div>\n' +
        '</a>');
});

function changeNotificationStatus() {
    $.ajax({
        url: '/notifications/read',
        type: 'GET',
    });
    $('.notifications-count').html('0');
    setTimeout(function() {
        $('.notification-item').removeClass('skyblue')
    }, 5000);
}

$('input[type=checkbox]').on('click', function(e) {
    if ($(this).attr('checked')) {
        $(this).removeAttr('checked')
    } else {
        $(this).attr('checked', 'checked');
    }
});

$('#select_all').on('click', function(e) {
    e.preventDefault();
    $("[id*=\"checkbox_\"]").attr('checked', 'checked');
});

$('#deselect_all').on('click', function(e) {
    e.preventDefault();
    $("[id*=\"checkbox_\"]").removeAttr('checked');
});

$('#delete_all').on('click', function(e) {
    e.preventDefault();
    var items = $("[checked=\"checked\"]"),
        confirmMessage = $(this).attr("data-confirm-message"),
        token = $(this).attr("data-token"),
        page = $(this).attr("data-page");

    if (items.length <= 0) {
        return false;
    }

    swal({
        title: confirmMessage,
        icon: "warning",
        buttons: {
            cancel: {
                text: 'Cancel',
                value: null,
                visible: true,
                className: "",
                closeModal: false,
            },
            confirm: {
                text: 'Confirm',
                value: true,
                visible: true,
                className: "",
                closeModal: false
            }
        }
    }).then(isConfirm => {
        if (isConfirm) {
            items.each(function(item) {
                var id = $(this).attr('id').replace('checkbox_', ''),
                    item_parent = 'tr_' + id;
                jQuery.ajax({
                    async: true,
                    type: "POST",
                    dataType: "JSON",
                    url: page + id,
                    data: {
                        "_method": "DELETE",
                        "_token": token,
                    },
                    success: function(data) {
                        if (data === "success") {
                            $("tr#" + item_parent).fadeTo(400, 0, function() {
                                $("tr#" + item_parent).slideUp(400);
                            });
                            fileExportTable.row($("tr#" + item_parent)).remove().draw();
                            swal("Success", "", "success");
                        } else {
                            swal('Error', "", "error");
                        }
                    },
                    error: function() {
                        return true;
                    }
                });
            });
        } else {
            $('.swal-overlay').removeClass('swal-overlay--show-modal');
        }
    });
});
$('.show_prices_form').on('click', function(e) {
    e.preventDefault();
});
$('#country_selector').on('click', function(e) {
    e.preventDefault();
    var id = $(this).val();
    jQuery.ajax({
        async: true,
        type: "GET",
        dataType: "JSON",
        url: '/countries/cities/' + id,
        success: function(data) {
            if (data) {
                $('#city_selector').html('');
                data.forEach(function(city) {
                    $('#city_selector').append(new Option(city.name, city.id));
                });
            }
        }
    });
});