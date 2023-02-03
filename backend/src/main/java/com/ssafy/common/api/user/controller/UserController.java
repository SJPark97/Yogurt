package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserLoginForm;
import com.ssafy.common.api.user.domain.UserResponseForm;
import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.api.user.service.UserService;
import com.ssafy.common.config.JwtProvider;
import com.ssafy.common.config.auth.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.common.filter.JwtProperties.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @GetMapping("/home")
    public String goHome() {
        return "<h1>home</h1>";
    }

    @ApiOperation(value = "accessToken 재발급")
    @GetMapping("/refresh")
    public Map<String, String> refresh(String refreshToken){

        HashMap<String, String> map = new HashMap<>();

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(refreshToken)
                .getBody();
        String userId = (String)claims.get("userId");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principal = (PrincipalDetails)authentication.getPrincipal();
        User user = principal.getUser();
        if(!user.getRefreshToken().equals(refreshToken)){
            throw new JwtException("유효하지 않은 Refresh Token 입니다.");
        }
        String jwt = jwtProvider.createAccessToken(userId,user.getRole());
        map.put("access-token",jwt);

        Date expiration = claims.getExpiration();
        Date currentTime = new Date();
        if(expiration.getTime()<= currentTime.getTime()+1000*60L*5L){
            jwt = jwtProvider.createRefreshToken(userId,user.getRole());
            map.put("refresh-token",jwt);
        }
        return map;
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
    @PostMapping("/login")
    @ApiOperation(value="로그인")
    public String login(HttpServletResponse response, @RequestBody @ApiParam(value = "회원",required = true)UserLoginForm form){
        return response.getHeader("Authorization");
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

    @GetMapping("/seller/search")
    @ApiOperation(value = "판매자 검색")
    @Parameter(name = "keyword", description = "판매자 키워드", in = ParameterIn.QUERY)
    public ResponseEntity<?> findSellers(@RequestParam String keyword){
        try{
            List<UserResponseForm> formList = userService.findALLByRoleAndNickNameContains("ROLE_SELLER", keyword);
            return new ResponseEntity<>(formList, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }
}
