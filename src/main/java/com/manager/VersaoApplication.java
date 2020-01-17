package com.manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VersaoApplication {//implements CommandLineRunner
    
//    @Autowired
//    private EmailService emailService;
    
    public static void main(String[] args) {
        SpringApplication.run(VersaoApplication.class, args);
    }

//    @Override
//    public void run(String... args) {
//        emailService.sendMailWithInlineResources("brunohallef@gmail.com", "Formigas Online");
//    }

}
