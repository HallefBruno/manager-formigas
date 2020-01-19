
$(document).ready(function () {

    initCheck();
    evetCheck();

});

function evetCheck() {
    
    $("#checkcn").change(function () {
        var prop = $("#checkcn").prop("checked");
        if(prop) {
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            $("#href-profile").css("pointer-events", "");
        } else {
            $("#href-profile").css("pointer-events", "none");
        }
    });
    
    $("#checkcqdlt").change(function () {
        var prop = $("#checkcqdlt").prop("checked");
        if(prop) {
            $("#checkcn").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            $("#href-profile").css("pointer-events", "");
        } else {
            $("#href-profile").css("pointer-events", "none");
        }
    });
    
    $("#checkceb").change(function () {
        var prop = $("#checkceb").prop("checked");
        if(prop) {
            $("#checkcn").prop("checked", false).change();
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            $("#href-profile").css("pointer-events", "");
        } else {
            $("#href-profile").css("pointer-events", "none");
        }
    });
    
    $("#checkmeb").change(function () {
        var prop = $("#checkmeb").prop("checked");
        if(prop) {
            $("#checkcn").prop("checked", false).change();
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            $("#href-profile").css("pointer-events", "");
        } else {
            $("#href-profile").css("pointer-events", "none");
        }
    });

}


function initCheck() {
    
    $('a[title]').tooltip();
    
    $("#checkcn").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkcqdlt").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkceb").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkmeb").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
}