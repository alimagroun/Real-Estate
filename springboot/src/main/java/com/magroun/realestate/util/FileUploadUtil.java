package com.magroun.realestate.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {
    
    public static void saveFile(String uploadDir, String fileName,
            MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        try {
            File file = new File(uploadDir + "/" + fileName);
            multipartFile.transferTo(file);
        } catch (IOException ex) {
            throw new IOException("Could not save file: " + fileName, ex);
        }
    }
}

