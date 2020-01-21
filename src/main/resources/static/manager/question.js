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
var pw;
var createprofile;

$(document).ready(function () {
    
    context = $("input[name='context-app']").val();
    selectNumeracao = $("select[name='numeracao']");
    nextprofile = $("#nextprofile");
    nextmessage = $("#nextmessage");
    nextdoner = $("#nextdoner");
    nextdoacao = $("#nextdoacao");

    initCheck();
    evetCheck();
    next();

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
                for (var i = 1; i <= Number(qtdCasas.val()); i++) {
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

//visibilityState: "visible"
function next() {
    
    nextprofile.on("click", function () {
        $("#href-home").removeClass("active");
        $("#href-profile").addClass("active");
        nextmessage.html("");
        nextmessage.append("<li class='next'><a href='#message' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        verificaAltenticidadeHtml(nextprofile, "#profile");
    });
    
    nextmessage.click(function () {
        nextdoner.html("");
        nextdoner.append("<li class='next'><a href='#doner' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        verificaAltenticidadeHtml(nextmessage, "#message");
    });
    
    nextdoner.click(function () {
        nextdoacao.html("");
        nextdoacao.append("<li class='next'><a href='#doacao' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        verificaAltenticidadeHtml(nextdoner, "#doner");
    });
    
    nextdoacao.click(function () {
        verificaAltenticidadeHtml(nextdoacao, "#doacao");
    });
    
}

function evetCheck() {

    $("#checkcn").change(function () {
        var prop = $("#checkcn").prop("checked");
        if(prop) {
            $("#checkcqdlt").prop("checked", false).change();
            $("#checkceb").prop("checked", false).change();
            $("#checkmeb").prop("checked", false).change();
            $("#div-somente-casas").html(htmlsomentecasas());
            
            qtdCasas = $("input[name='qtdcasas']");
            numInicial = $("input[name='numinicial']");
            createprofile = $(".btn-new-profile");
            codverificacao = $("input[name='codigo']");
            pw = $("input[name='senha']");
            
            numeracaoCondominioCasa();
            clearSelectNumCasas();
            newProfile();
            
            nextprofile.append("<li class='next'><a href='#profile' data-toggle='tab'>Próximo <span aria-hidden='true'>&rarr;</span></a></li>");
        } else {
            $("#div-somente-casas").html("");
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


function newProfile() {
    
    var arraysequencia = ["11111111","22222222","33333333","44444444","55555555","66666666","77777777","88888888","99999999","00000000"];
    
    createprofile.click(function () {
        
        var versaocasanumerada = {
            "quantidadeCasas":qtdCasas.val().trim(),
            "iniciaNumero":numInicial.val().trim(),
            "codigoVerificacao": {
                "numeroGerado":codverificacao.val().trim()
            },
            "senhaProvisoria":pw.val().trim()
        };
        
        if(isEmpaty()) {
            Swal.fire("Atenção!","Preencha todos os campos obrigatórios","warning");
        } else if(pw.val().trim().length < 8 || arraysequencia.indexOf(pw.val().trim()) !== -1) {
            Swal.fire("Atenção!","Senha inválida","warning");
        } else {
            var username="user";
            var password="9169";
            
            $.ajax({
                
                type: "POST",
                headers: {
                    "Authorization":btoa(username+":"+password)
                },
                contentType: "application/json",
                dataType: "json",
                url: context + "versions/save/"+"casanumerada",
                data: JSON.stringify(versaocasanumerada),
                
                statusCode: {
                    200: function (data, textStatus, jqXHR) {
                        
                    }
                },
                
                error: function (data, textStatus, jqXHR) {
                    
                }

            });
            
        }
    });
}

function isEmpaty() {
    
    var retorno = false;
    
    if (qtdCasas.val().trim() === "") {
        $(".feed-quantidade").addClass("has-error has-feedback");
        retorno = true;
    } else {
        $(".feed-quantidade").removeClass("has-error has-feedback");
    }

    if (codverificacao.val().trim() === "") {
        $(".feed-codigo-validacao").addClass("has-error has-feedback");
        retorno = true;
    } else {
        $(".feed-codigo-validacao").removeClass("has-error has-feedback");
    }

    if (pw.val().trim() === "") {
        $(".feed-senha").addClass("has-error has-feedback");
        retorno = true;
    } else {
        $(".feed-senha").removeClass("has-error has-feedback");
    }
    
    return retorno;
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

function htmlsomentecasas() {
    return "<div class='container-fluid'>"+
    "<div class='row'>"+
        "<div class='form-group col-sm-12'>"+
            "<div style='background-color: #f9f9f9' class='panel panel-info'>"+
                "<div class='panel-heading'>"+
                    "<h3 class='panel-title'>"+
                        "<i class='glyphicon glyphicon-exclamation-sign'></i>"+
                        "<strong>Importante!</strong>"+
                    "</h3>"+
                "</div>"+
                "<div class='panel-body'>"+
                    "<ul>"+
                        "<li>Esse perfil podera ser editado depois.</li>"+
                        "<li>Não digita sua senha de e-mail, digite outra.</li>"+
                        "<li>Os campos: <strong>quantidade de casa, email e senha são obrigatórios.</strong></li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
        "</div>"+
    "</div>"+
"</div>"+

"<div class='container-fluid'>"+
    "<div class='row '>"+
        "<div class='col-sm-12'>"+
            "<div class='panel panel-primary'>"+
                "<div style='background-color: #563d7c;' class='panel-heading text-center'>Casa numerada</div>"+
                "<div class='panel-body'>"+

                    "<div class='feed-quantidade'>"+
                        "<div class='form-group col-sm-6'>"+
                            "<label for='qtdcasas' class='control-label'>Quantidade de casas</label>"+
                            "<input type='number' name='qtdcasas' id='qtdcasas' placeholder='Ex: 70' maxlength='3' class='form-control' />"+
                        "</div>"+
                    "</div>"+

                    "<div class='form-group col-sm-6'>"+
                        "<label for='numinicial' class='control-label'>Inicia em que número</label>"+
                        "<input type='number' name='numinicial' id='numinicial' placeholder='Ex: 101' maxlength='4' class='form-control' />"+
                    "</div>"+

                    "<div class='form-group col-sm-12'>"+
                        "<label for='numercao' class='control-label'>Como ficou a numeração</label>"+
                        "<select name='numeracao' id='numercao' class='form-control' title='Sequência das casas'></select>"+
                    "</div>"+

                    "<div class='feed-codigo-validacao'>"+
                        "<div class='form-group col-sm-6'>"+
                            "<label for='codigo' class='control-label'>Código de verificação</label>"+
                            "<input type='number' name='codigo' id='codigo' placeholder='Código que enviamos por e-mail' maxlength='8' class='form-control' />"+
                        "</div>"+
                    "</div>"+

                    "<div class='feed-senha'>"+
                        "<div class='form-group col-sm-6'>"+
                            "<label for='senha' class='control-label'>Senha provisoria</label>"+
                            "<input type='password' name='senha' id='senha' placeholder='Não coloque sua senha de email' class='form-control' maxlength='8' minlength='8'/>"+
                        "</div>"+
                    "</div>"+

                "</div>"+
            "</div>"+
        "</div>"+
    "</div>"+

"</div>"+
"<p class='text-center'>"+
    "<button type='button' class='btn btn-default btn-outline-rounded green btn-new-profile'> Criar perfil <span style='margin-left:10px;' class='glyphicon glyphicon-user'></span></button>"+
"</p>";
}


function verificaAltenticidadeHtml(Object, string) {
    if (Object[0].innerHTML.indexOf(string) === -1) {
        Swal.fire("Atenção", "Alteração inválida", "warning");
        window.location.href = "question";
    }
}