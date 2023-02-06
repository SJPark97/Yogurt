package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserResponseForm;
import com.ssafy.common.api.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;

    @GetMapping("/home")
    public String goHome() {
        return "<h1>home</h1>";
    }

    @PostMapping("/join")
    @ApiOperation(value= "회원가입")
    public ResponseEntity<?> join(@Valid User user, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.join(user);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/seller")
    @ApiOperation(value = "판매자 전체 조회")
    public ResponseEntity<?> getAllSeller(){
        try {
            List<UserResponseForm> formList = userService.findByRole("ROLE_SELLER");
            return new ResponseEntity<>(formList, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

//    @GetMapping("/seller")
//    @ApiOperation(value = "판매자 검색")
//    public ResponseEntity<?> findSellers(@RequestParam String keyword){
//        try{
//            List<UserResponseForm> formList = userService.findALLByRoleAndNickNameContains("ROLE_SELLER", keyword);
//            return new ResponseEntity<>(formList, HttpStatus.OK);
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
//        }
//    }

}
