
package com.manager.endpoint;

import com.manager.entity.CodigoVerificacao;
import com.manager.entity.Email;
import com.manager.repository.ICodigoVerificacaoRepository;
import com.manager.repository.IEmailRepository;
import com.manager.service.EmailService;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
@RequestMapping("/credenciais")
public class CredenciaisController {
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private ICodigoVerificacaoRepository codigoVerificacaoRepository;
    
    @Autowired
    private IEmailRepository emailRepository;
    
    @RequestMapping
    public ModelAndView viewQuestion() {
        ModelAndView mv = new ModelAndView("Credenciais");
        return mv;
    }
    
    @PostMapping("send")
    public ResponseEntity<?> enviarEmail(@RequestBody Email email) {
        try {
            Optional<Email> emailVerificado = emailRepository.findByEmail(email.getEmail());
            
            if(emailVerificado.isPresent()) {
                if(emailVerificado.get().getStatus() == true) {
                    return new ResponseEntity<>("http://formigas.herokuapp.com/formiga/",HttpStatus.FORBIDDEN);
                }
            }
            
            emailService.sendMailWithInlineResources(email.getEmail(), "Formigas online","Código de verificação é: ");
            emailService.save(email);
        } catch(MailException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok("E-mail enviado com sucesso! ");
    }
    
    @PostMapping("validarcod/{cod}/{emailDigitado}")
    public ResponseEntity<?> verificarCodigoDigitado(@PathVariable String cod, @PathVariable String emailDigitado) {
        CodigoVerificacao cv = codigoVerificacaoRepository.findTopByOrderByIdDesc();
        if(cv.getEmail().getEmail().equals(emailDigitado)) {
            if(cv.getNumeroGerado().equals(cod)) {
                Email email = cv.getEmail();
                email.setStatus(Boolean.TRUE);
                emailService.save(email);
                return ResponseEntity.ok("http://formigas.herokuapp.com/formiga/");
            }
        } else {
            return new ResponseEntity<>("Email digitado não é válido para o codigo! ",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Código inválido! ",HttpStatus.NOT_FOUND);
    }
    
}
