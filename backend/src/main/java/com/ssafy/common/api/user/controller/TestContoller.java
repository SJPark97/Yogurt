package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@Slf4j
public class TestContoller {

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;

    @PostMapping("/join")
    public void join() {
        long now = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(now);
        User user = User.builder()
                .userId("ssafy")
                .account("1")
                .bank("1")
                .email("1")
                .create_date(timestamp)
                .description("1")
                .email("1")
                .name("1")
                .nickName("1")
                .password(passwordEncoder.encode("1234"))
                .phoneNumber("1")
                .profileImage("1")
                .role("ROLE_BUYER")
                .update_date(timestamp)
                .build();
        userService.join(user);
    }
    @PostMapping("/login")
    public String Login(){
        return "Login";
    }
}