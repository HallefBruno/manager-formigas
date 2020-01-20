/* global Swal */

var context;
var operacao;
var emailDigitado;
var qtdVezesCodErrado;

$(document).ready(function () {
    
    context = $("input[name='context-app']").val();
    inputEmailButtonEnviarEmail();
    qtdVezesCodErrado = 0;

});

function inputEmailButtonEnviarEmail() {
    var components = "<input autocomplete required placeholder='Digite seu e-mail aqui' type='email' id='email' name='email' class='form-control'  /><div style='margin: 0 0 0 10px' > <button onclick='sendEmail();' type='button' title='Enviar e-mail' class='btn btn-primary btn-send'><span class='glyphicon glyphicon-send' ></span></button> </div>";
    $("#divInputButtonEnviarEmail").append(components);
}

function sendEmail() {

    emailDigitado = $("input[name='email']").val().trim();;
    
    var email = {
        "email":emailDigitado,
        "status":false
    };

    if (email && (email.email.indexOf("@") !== -1) && (email.email.indexOf(".") !== -1)) {

        $(".campo-vazio").removeClass("has-error has-feedback");
        operacao = "email";
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: context + "credenciais/send",
            data: JSON.stringify(email),

            statusCode: {
                409: function (data, textStatus, jqXHR) {
                    var msgErro = data.responseText;
                    if (msgErro) {
                        if (msgErro.indexOf("connect to host")) {
                            Swal.fire('Erro!', 'Falha de conexão com a internet', 'error');
                        } else {
                            Swal.fire('Erro!', data.responseText, 'error');
                        }
                    }
                },
                
                403: function (data, textStatus, jqXHR) {
                    window.location.href=data.responseText;
                    $(".jumbotron").prop("style","display:none;");
                    $(".loader").fadeIn(1000, function(){
                        window.setTimeout(function(){
                            $('.loader').fadeOut();
                        }, 5000);
                    });
                    window.location.replace(data.responseText);
                },
                
                200: function (data, textStatus, jqXHR) {
                    Swal.fire('Pronto!', data.responseText, 'success');
                    $("#divInputButtonEnviarEmail").html("");
                    visibleInputButtonValidaCod();
                }
            },

            beforeSend: startRequest,
            complete: finalizeRequest

        });

    } else {
        $(".campo-vazio").addClass("has-error has-feedback");
        $("input[name='email']").focus();
        Swal.fire('Atenção!', 'Email inválido!', 'warning');
    }
}

function visibleInputButtonValidaCod() {
    $("#divInputButtonVerificaCod").html("");
    var components = "<input autocomplete required placeholder='Digite o código aqui...' type='text' id='cod' name='cod' class='form-control'  /><div style='margin: 0 0 0 10px'><button title='Validar código' onclick='verificarCod();' type='button' name='btn-verifica-codigo' class='btn btn-info'><span class='glyphicon glyphicon-user'></span></button></div>";
    $("#divInputButtonVerificaCod").append(components);
}

function verificarCod() {
    
    var cod = $("input[name='cod']").val();
    operacao = "codigo";
    
    var codEmail = {
        "cod":cod,
        "emailDigitado":emailDigitado.toString().trim()
    };
    
    if(codEmail.cod && codEmail.emailDigitado) {
        
        $(".cod-vazio").removeClass("has-error has-feedback");
        
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: context + "credenciais/validarcod/"+codEmail.cod+"/"+codEmail.emailDigitado,
            data: codEmail,

            statusCode: {
                404: function (data, textStatus, jqXHR) {
                    Swal.fire("Atenção!",data.responseText,'warning');
                    qtdVezesCodErrado++;
                    if(qtdVezesCodErrado === 3) {
                        inputEmailButtonEnviarEmail();
                        $("#divInputButtonVerificaCod").html("");
                        qtdVezesCodErrado = 0;
                    }
                },

                200: function (data, textStatus, jqXHR) {
                    window.location.href=data.responseText;
                    $(".jumbotron").prop("style","display:none;");
                    $(".loader").fadeIn(1000, function(){
                        window.setTimeout(function(){
                            $('.loader').fadeOut();
                        }, 5000);
                    });
                    window.location.replace(data.responseText);
                }
            },

            beforeSend: startRequest,
            complete: finalizeRequest

        });
    } else {
        $(".cod-vazio").addClass("has-error has-feedback");
        $("input[name='cod']").focus();
        Swal.fire("Atenção!","Campo vazio! ",'warning');
        qtdVezesCodErrado++;
        if (qtdVezesCodErrado === 3) {
            inputEmailButtonEnviarEmail();
            $("#divInputButtonVerificaCod").html("");
            qtdVezesCodErrado = 0;
        }
    }
}

function startRequest() {
    if(operacao === "email") {
        $(".btn-send").prop("title","Enviando e-mail...");
        $(".glyphicon-send").prop("style","display:none");
        $(".btn-send").append("<img src='"+context+"imagens/mini-loading.gif' />");
        $("input[name='email']").prop("disabled", true);
        $(".btn-send").prop("disabled", true);
    } else {
        $(".glyphicon-user").prop("style","display:none");
        $("button[name='btn-verifica-codigo']").append("<img src='"+context+"imagens/mini-loading.gif' />");
        $("input[name='cod']").prop("disabled",true);
        $("button[name='btn-verifica-codigo']").prop("title","Validando...");
        $("button[name='btn-verifica-codigo']").prop("disabled",true);
    }
    
}

function finalizeRequest() {
    if(operacao === "email") {
        $(".btn-send").html("");
        $(".btn-send").prop("title","Enviar email");
        $(".btn-send").append("<span class='glyphicon glyphicon-send' ></span>");
        $("input[name='email']").prop("disabled", false);
        $(".btn-send").prop("disabled", false);
    } else {
        $("button[name='btn-verifica-codigo']").html("");
        $("button[name='btn-verifica-codigo']").append("<span class='glyphicon glyphicon-user' ></span>");
        $("input[name='cod']").prop("disabled",false);
        $("button[name='btn-verifica-codigo']").prop("title","Validar código");
        $("button[name='btn-verifica-codigo']").prop("disabled",false);
    }
}