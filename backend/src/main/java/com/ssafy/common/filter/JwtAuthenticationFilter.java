package com.ssafy.common.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.request.UserLoginRequest;
import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.config.JwtProvider;
import com.ssafy.common.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.ssafy.common.filter.JwtProperties.*;

//스프링시큐리티에서 UsernamePasswordAuthenticationFilter가 있음
// login 요청해서 username,password 전송하면
// usernamePasswordAuthenticationFilter 동작을 함.
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    //login 요청을 하면 로그인 시도를 위해 실행
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인 시도중");
        // 1.username,password 받아서
        // 2.정상인지 로그인 시도
        // 3. authenticationManager로 로그인 시도를 하면 PrincipalDetatilsService가 호출
        // 4. loadUserByUserId()함수 실행됨.
        // 5. PrincipalDetails를 세션에 담고 (만약에 안담으면 권한 관리가 안됨)
        // 6. JWT토큰을 만들어서 응답해주면 됨.
        try {
            ObjectMapper om = new ObjectMapper();   //json Parsing 해줌
            UserLoginRequest user = om.readValue(request.getInputStream(), UserLoginRequest.class);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getUserId(),user.getPassword());

            System.out.println("토큰 정보 : " + authenticationToken);

            //PrincipalDetailService의 loadUserByUserId() 함수가 실행됨
            //실행 후 정상이면 authentication이 리턴됨.
            //authentication에 로그인한 정보가 담김
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            //authentication 객체가 session영역에 저장됨 => 로그인이 됨.
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료됨 : " + principalDetails);

            //authentication 객체가 session에 저장됨
            //return하는 이유는 권한 관리를 security가 대신 해주기 때문에 편해짐.
            //굳이 JWT토큰을 사용하면서 세션을 만들 이유는 없지만 권한 처리 때문에 session에 넣음
            return authentication;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // attemptAuthentication 실행 후 인증이 정상 처리되면 successfulAuthentication 함수가 실행됨.
    // jwt 토큰을 만들어 request 요청한 사용자에게 jwt토큰 응답하면 됨.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨 : 인증완료");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String userId = principalDetails.getUser().getUserId();

        Map<String, Object> headers = new HashMap<>();

        //Header부분 설정
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        //payload부분 설정
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("userId", principalDetails.getUser().getUserId());
        payloads.put("role", principalDetails.getUser().getRole());

        long atExpiredTime = AT_EXPIRATION_TIME; //토큰 유효 시간 30분
        long rtExpiredTime = RT_EXPIRATION_TIME; //토큰 유효 시간 72시간

        Date atExt =new Date(); // 토큰 만료 시간
        atExt.setTime(atExt.getTime() + atExpiredTime);

        Date rtExt =new Date(); // 토큰 만료 시간
        rtExt.setTime(rtExt.getTime() + rtExpiredTime);


        //HS256 방식으로 암호화
        String jwt = jwtProvider.createAccessToken(principalDetails.getUser().getUserId(),principalDetails.getUser().getRole());

        String rft = jwtProvider.createRefreshToken(principalDetails.getUser().getUserId(),principalDetails.getUser().getRole());

        User user = userRepository.findByUserId(userId);
        user.setRefreshToken(rft);
        userRepository.save(user);

        //리스폰스 해더에 Authorization : "", Refresh : ""로 전달
        response.addHeader(HEADER_STRING, TOKEN_PREFIX+jwt);
        response.addHeader(RT_HEADER_STRING, TOKEN_PREFIX+rft);
    }
}
