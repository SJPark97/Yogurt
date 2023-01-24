package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @GetMapping("home")
    public String goHome(){
        return "<h1>home</h1>";
    }

//    @PostMapping("/login")
//    @ApiOperation("home으로 보내기")
//    public ResponseEntity<?> doLogin(@RequestBody UserLoginForm userLoginForm, HttpSession session) {
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
//
//    }
}
