package com.manager.service;

import com.manager.entity.CodigoVerificacao;
import com.manager.entity.Email;
import com.manager.entity.exception.MessageException;
import com.manager.repository.IEmailRepository;
import java.util.Optional;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import com.manager.repository.ICodigoVerificacaoRepository;
import java.util.Random;

@Service("emailService")
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SimpleMailMessage preConfiguredMessage;
    
    @Autowired
    private IEmailRepository emailRepository;

    @Autowired
    private ICodigoVerificacaoRepository codigoVerificacaoRepository;

    private Long codigoVe;
    
    //Este método enviará composição e enviará a mensagem
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);//para
        message.setCc("sudtecnologia@gmail.com");//cópia
        message.setSubject(subject);//define o assunto
        message.setText(body);
        mailSender.send(message);
    }

    //Este método enviará uma mensagem pré-configurada
    public void sendPreConfiguredMail(String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage(preConfiguredMessage);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }

    public void sendMailWithInlineResources(String to, String subject, String body) {
        MimeMessagePreparator preparator = (MimeMessage mimeMessage) -> {
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setFrom(new InternetAddress("sudtecnologia@gmail.com"));
            mimeMessage.setSubject(subject);
            
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            
            StringBuilder html = new StringBuilder();
            
            codigoVe = getRandomNumberUsingInts(0, 100000);
            
            html.append("<html>");
            html.append("<body>");
            html.append("<img src='https://res.cloudinary.com/deurqqlk6/image/upload/c_scale,w_116/v1579011864/mascote/mascote-formiga.jpg'/>");
            html.append("<h2>");
            html.append(body).append(codigoVe);
            html.append("</h2>");
            html.append("</body>");
            html.append("</html>");
            //cloudinary.url().transformation(new Transformation().height(200).quality(100).width(180).crop("scale")).imageTag("mascote/mascote-formiga_rvitia.png");
            helper.setText(html.toString(), true);
            //cloudinary.url().transformation(new Transformation().height(200).quality(100).width(180).crop("scale")).imageTag("mascote/mascote-formiga_rvitia.png");
        };

        try {
            mailSender.send(preparator);
        } catch (MailException ex) {
            throw ex;
        }
    }
    
    @Transactional
    public Email save(Email emailDigitado) {
        
        if(codigoVe!=null) {
            
            Optional<Email> emailCadastrado = emailRepository.findByEmail(emailDigitado.getEmail());

            Email email;
            CodigoVerificacao codigoVerificacao;

            if(emailCadastrado != null && emailCadastrado.isPresent()) {
                email = emailCadastrado.get();
                CodigoVerificacao cv = new CodigoVerificacao();
                cv.setEmail(email);
                cv.setNumeroGerado(codigoVe.toString());
                codigoVerificacao = codigoVerificacaoRepository.save(cv);
                if(codigoVerificacao == null) {
                    throw new MessageException("Não foi possível salvar codigo verificação");
                }
            } else if(emailDigitado.getStatus() == false) {
                email = emailRepository.save(emailDigitado);
                CodigoVerificacao cv = new CodigoVerificacao();
                cv.setEmail(email);
                cv.setNumeroGerado(codigoVe.toString());
                codigoVerificacao = codigoVerificacaoRepository.save(cv);
                if(codigoVerificacao == null) {
                    throw new MessageException("Não foi possível salvar codigo verificação");
                }
            } else {
                email = emailRepository.save(emailDigitado);
            }
            return email;
        }
        throw new MessageException("Não foi possível salvar o Email !");
    }
    
    public Long getRandomNumberUsingInts(int min, int max) {
        Random random = new Random();
        return random.longs(min, max).findFirst().getAsLong();
    }
}
