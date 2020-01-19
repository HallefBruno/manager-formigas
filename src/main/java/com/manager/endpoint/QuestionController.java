
package com.manager.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/question")
public class QuestionController {
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("Question");
        return mv;
    }
    
    
    
}
