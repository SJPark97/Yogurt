package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.request.BuyerUpdateRequest;
import com.ssafy.common.api.user.dto.request.SellerUpdateRequest;
import com.ssafy.common.api.user.dto.response.UserLoginResponse;
import com.ssafy.common.api.user.dto.request.UserJoinRequest;
import com.ssafy.common.api.user.dto.response.UserResponseForm;
import com.ssafy.common.api.user.dto.response.UserSellerResponse;
import com.ssafy.common.api.user.service.UserService;
import com.ssafy.common.config.JwtProvider;
import com.ssafy.common.config.auth.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static com.ssafy.common.api.user.domain.UserRole.ROLE_SELLER;
import static com.ssafy.common.filter.JwtProperties.SECRET_KEY;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtProvider jwtProvider;

//    @GetMapping("/home")
//    public String goHome() {
//        return "<h1>home</h1>";
//    }


    @GetMapping("/refresh")
    @ApiOperation(value = "accessToken 재발급")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "refresh 토큰 생성 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> refresh(String refreshToken){

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
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/join")
    @ApiOperation(value= "회원가입")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "refresh 토큰 생성 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> join(@Valid @RequestBody UserJoinRequest form, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        User user = User.builder()
                        .userId(form.getUserId())
                        .role(form.getRole())
                        .userStatus(form.getUserStatus())
                        .email(form.getEmail())
                        .phoneNumber(form.getPhoneNumber())
                        .password(form.getPassword())
                        .name(form.getName())
                        .nickName(form.getNickName())
                        .build();
        System.out.println(form.getUserId() + " " + form.getRole() + " " +form.getUserStatus() + " " +form.getEmail() + " "
        + form.getPhoneNumber()+ " " + form.getPassword() + " "+form.getName() + " " + form.getNickName()
        );
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        userService.join(user);

        return new ResponseEntity<>(null,HttpStatus.OK);
    }

    @GetMapping("/seller")
    @ApiOperation(value = "판매자 전체 조회")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "판매자 전체 조회 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 401, message = "인증이 되지 않음"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> getAllSeller(){
        try {
            // active 인 것만 조회
            List<UserSellerResponse> formList = userService.findByRole(ROLE_SELLER);
            return new ResponseEntity<>(formList, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/seller/{id}")
    @ApiOperation(value = "판매자 1명 조회")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "판매자 전체 조회 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 401, message = "인증이 되지 않음"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> getSeller(@PathVariable("id")Long id){
        try {
            UserSellerResponse userResponse = userService.findBySellerId(id);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }



    @GetMapping("/seller/search")
    @ApiOperation(value = "판매자 검색")
    @Parameter(name = "keyword", description = "판매자 키워드", in = ParameterIn.QUERY)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "판매자 검색 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 401, message = "인증이 되지 않음"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> findSellers(@RequestParam String keyword){
        try{
            // active 인것만 조회
            List<UserResponseForm> formList = userService.findALLByRoleAndNickNameContains(ROLE_SELLER, keyword);
            return new ResponseEntity<>(formList, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    //사진 설명 닉네임
    @PutMapping("/seller/{id}")
    @ApiOperation(value = "판매자 수정")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "판매자 수정 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody SellerUpdateRequest request){
        try{
            User user = userService.findById(id);
            user.setNickName(request.getNickName());
            user.setDescription(request.getDescription());
            user.setProfileImage(request.getProfileImage());
            userService.join(user);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }catch (NullPointerException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e);
        }
    }

    @PutMapping("/buyer/{id}")
    @ApiOperation(value = "구매자 수정")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "구매자 수정 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody BuyerUpdateRequest request){
        try{
            User user = userService.findById(id);
            user.setNickName(request.getNickName());
            user.setProfileImage(request.getProfileImage());
            userService.join(user);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }catch (NullPointerException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e);
        }
    }

    @PatchMapping("/user/{id}")
    @ApiOperation(value = "탈퇴")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "판매자 검색 완료"),
            @ApiResponse(code = 400, message = "입력 오류"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body("유저가 정상적으로 삭제되었습니다");
        }catch (NullPointerException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e);
        }
    }
    @GetMapping("")
    @ApiOperation(value = "유저 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "유저 정보 조회"),
            @ApiResponse(code = 400, message = "오류"),
            @ApiResponse(code = 500, message = "서버에러")
    })
    public ResponseEntity<?> getUser(@RequestParam String userId){
        try{
            UserLoginResponse res = userService.findByUserId(userId);
            System.out.println("ABC");
            return new ResponseEntity<>(res,HttpStatus.OK);
        }catch (NullPointerException e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e);
        }
    }
}
