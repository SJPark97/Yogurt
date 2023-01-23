package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserLoginForm;
import com.ssafy.common.api.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @ApiOperation("home으로 보내기")
    public ResponseEntity<?> doLogin(@RequestBody UserLoginForm userLoginForm, HttpSession session) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
    }
}
