
/* global Swal */

var context;
var qtdCasas;
var numInicial;
var selectNumeracao;
var nextprofile;
var nextmessage;
var nextdoner;
var nextdoacao;
var codverificacao;
var email;
var pw;
var createprofile;

$(document).ready(function () {
    
    context = $("input[name='context-app']").val();
    qtdCasas = $("input[name='qtdcasas']");
    numInicial = $("input[name='numinicial']");
    selectNumeracao = $("select[name='numeracao']");
    nextprofile = $("#nextprofile");
    nextmessage = $("#nextmessage");
    nextdoner = $("#nextdoner");
    nextdoacao = $("#nextdoacao");
    codverificacao = $("input[name='codigo']");
    pw = $("input[name='senha']");
    email = $("input[name='email']");
    createprofile = $(".btn-new-profile");
    
    initCheck();
    evetCheck();
    clearSelectNumCasas();
    numeracaoCondominioCasa();
    next();
    newProfile();
    
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
        if(qtdCasas.val().trim().length <= 3) {
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
        } else {
            qtdCasas.val(qtdCasas.val().substring(0,qtdCasas.val().length-1));
            Swal.fire("Atenção!","Quantidade de casas deve estar entre 1 e 999","warning");
        }
    });
    
}

function newProfile() {
    createprofile.click(function () {
        
        if(qtdCasas.val().trim() === "") {
            $(".feed-quantidade").addClass("has-error has-feedback");
            qtdCasas.focus();
        } else {
            $(".feed-quantidade").removeClass("has-error has-feedback");
        }
        
        if(email.val().trim() === "") {
            $(".feed-email").addClass("has-error has-feedback");
            email.focus();
        } else {
            $(".feed-email").removeClass("has-error has-feedback");
        }
        
        if(codverificacao.val().trim() === "") {
            $(".feed-codigo-validacao").addClass("has-error has-feedback");
            codverificacao.focus();
        } else {
            $(".feed-codigo-validacao").removeClass("has-error has-feedback");
        }
        
        if(pw.val().trim() === "") {
            $(".feed-senha").addClass("has-error has-feedback");
            pw.focus();
        } else {
            $(".feed-senha").removeClass("has-error has-feedback");
        }
        
    });
}

function next() {
    
    nextprofile.on("click", function () {
        $("#href-home").removeClass("active");
        $("#href-profile").addClass("active");
        nextmessage.html("");
        nextmessage.append("<li class='next'><a href='#message' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
    });
    
    nextmessage.click(function () {
        nextdoner.html("");
        nextdoner.append("<li class='next'><a href='#doner' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
    });
    
    nextdoner.click(function () {
        nextdoacao.html("");
        nextdoacao.append("<li class='next'><a href='#doacao' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
    });
}

function evetCheck() {
    
    $("#checkcn").change(function () {
        var prop = $("#checkcn").prop("checked");
        if(prop) {
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            nextprofile.append("<li class='next'><a href='#profile' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        } else {
            nextprofile.html("");
        }
    });
    
    $("#checkcqdlt").change(function () {
        var prop = $("#checkcqdlt").prop("checked");
        if(prop) {
            $("#checkcn").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            nextprofile.append("<li class='next'><a href='#profile' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        } else {
            nextprofile.html("");
        }
    });
    
    $("#checkceb").change(function () {
        var prop = $("#checkceb").prop("checked");
        if(prop) {
            $("#checkcn").prop("checked", false).change();
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            nextprofile.append("<li class='next'><a href='#profile' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        } else {
            nextprofile.html("");
        }
    });
    
    $("#checkmeb").change(function () {
        var prop = $("#checkmeb").prop("checked");
        if(prop) {
            $("#checkcn").prop("checked", false).change();
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            nextprofile.append("<li class='next'><a href='#profile' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        } else {
            nextprofile.html("");
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