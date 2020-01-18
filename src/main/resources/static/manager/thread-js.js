var i=0;

$(document).ready(function () {
    
    var consulta = setInterval(function () {
    
        $.ajax({

            type: "GET",
            url: "/manager/startThread/sleep/"+i,

            success: function (data, textStatus, jqXHR) {
                $("#stopWatch").html(data);
                i++;
            },

            error: function (jqXHR, textStatus, errorThrown) {
                clearInterval(consulta);
                alert("Servidor parado...");
            }

        });
        
    },2000);
    
});