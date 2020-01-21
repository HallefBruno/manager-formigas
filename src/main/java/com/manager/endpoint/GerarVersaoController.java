
package com.manager.endpoint;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manager.entity.VersaoCasaNumerada;
import com.manager.service.VersaoCasaNumeradaService;
import java.util.Iterator;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("versions")
public class GerarVersaoController {
    
    @Autowired
    private VersaoCasaNumeradaService versaoCasaNumeradaService;
    
    @PostMapping("save/{qual}")
    public ResponseEntity<?> versionCasaNumerada(@RequestBody VersaoCasaNumerada versaoCasaNumerada ,@PathVariable(value = "") String qual, @RequestHeader HttpHeaders headers) {
        String password = "dXNlcjo5MTY5";
        
        if(headers.get("Authorization") != null) {
            if(password.equals(headers.get("Authorization").get(0))) {
                if(qual.equals("casanumerada")) {
                    versaoCasaNumeradaService.save(versaoCasaNumerada);
                }
            }
        }

        return null;
    }
    
}
