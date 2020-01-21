"<div class='container-fluid'>"+
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
                            "<label for='numercao' class='control-label'>Código de verificação</label>"+
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
