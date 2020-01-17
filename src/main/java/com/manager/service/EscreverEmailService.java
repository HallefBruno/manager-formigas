
package com.manager.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

@Service
public class EscreverEmailService {
    
    public File saveEmailInFile(String email) {
        Path curretPath = Paths.get(".");
        Path absolutPath = curretPath.toAbsolutePath();
        int removePonto = absolutPath.toString().indexOf(".");
        String caminhoFormatado = absolutPath.toString().substring(0, (removePonto - 1));
        File file = new File(caminhoFormatado + "/src/main/resources/static/file/emails.txt");

        try {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
                bw.append(email);
                bw.flush();
                bw.newLine();
            }
        } catch (IOException ex) {
            Logger.getLogger(EscreverEmailService.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return file;
    }
}
