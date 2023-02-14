package com.ssafy.common.api.image;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class FileUploadController {
    private final S3Upload s3Upload;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@ModelAttribute MultipartFile[] images) throws IOException {
        for(MultipartFile image : images){
            System.out.println("image : " + image);
        }
        return new ResponseEntity<>(s3Upload.upload1(images),HttpStatus.CREATED);
    }

    @PostMapping("/upload1")
    public ResponseEntity<?> uploadFile1(@RequestParam("images") MultipartFile[] images) throws IOException {
        for(MultipartFile image : images){
            System.out.println("image : " + image);
        }
        return new ResponseEntity<>(s3Upload.upload1(images),HttpStatus.CREATED);
    }
}
