
package com.manager.endpoint;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/startThread")
public class ThreadController {
    
    @RequestMapping
    public ModelAndView viewTeste() {
        ModelAndView mv = new ModelAndView("StartTrhead");
        return mv;
    }
    
    @GetMapping("sleep/{val}")
    public ResponseEntity<?> sleep(@PathVariable String val) {
        int retorno = Integer.valueOf(val);
        retorno++;
        return ResponseEntity.ok(retorno+"0");
    }
    
}