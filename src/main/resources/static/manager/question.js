
var context;
var qtdCasas;
var numInicial;
var selectNumeracao;

$(document).ready(function () {
    
    context = $("input[name='context-app']").val();
    qtdCasas = $("input[name='qtdcasas']");
    numInicial = $("input[name='numinicial']");
    selectNumeracao = $("select[name='numeracao']");
    
    initCheck();
    evetCheck();
    
    clearSelectNumCasas();
    numeracaoCondominioCasa();
    
});

function numeracaoCondominioCasa() {
    
    qtdCasas = $("input[name='qtdcasas']");
    numInicial = $("input[name='numinicial']");
    selectNumeracao = $("select[name='numeracao']");

    numInicial.on("keyup", function () {
        var options;
        selectNumeracao.html("");
        selectNumeracao.html("<option value='' label='Sequência das casas'></option>");
        for (var i = 0; i < Number(qtdCasas.val()); i++) {
            var numeracaoCasas = Number(numInicial.val()) + i;
            options += "<option value='" + numeracaoCasas + "' label='Casa " + numeracaoCasas + "'></option>";
        }
        selectNumeracao.append(options);
    });
}

function clearSelectNumCasas() {

    qtdCasas.on("keyup", function () {
        selectNumeracao.html("");
        selectNumeracao.html("<option value='' label='Sequência das casas'></option>");
        numInicial.val("");
        if(Number(qtdCasas.val()) > 0) {
            var options;
            for (var i = 0; i < Number(qtdCasas.val()); i++) {
                var numeracaoCasas = Number(numInicial.val()) + i;
                options += "<option value='" + numeracaoCasas + "' label='Casa " + numeracaoCasas + "'></option>";
            }
            selectNumeracao.append(options);
        }
    });
    
}

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