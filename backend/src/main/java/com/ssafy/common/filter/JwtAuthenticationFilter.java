package com.ssafy.common.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.config.auth.PrincipalDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//스프링시큐리티에서 UsernamePasswordAuthenticationFilter가 있음
// login 요청해서 username,password 전송하면
// usernamePasswordAuthenticationFilter 동작을 함.
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final String key = "ssafy";//인증 키

    //login 요청을 하면 로그인 시도를 위해 실행
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인 시도중");

        // 1.username,password 받아서
        // 2.정상인지 로그인 시도
        // 3. authenticationManager로 로그인 시도를 하면 PrincipalDetatilsService가 호출
        // 4. loadUserByUsername()함수 실행됨.
        // 5. PrincipalDetails를 세션에 담고 (만약에 안담으면 권한 관리가 안됨)
        // 6. JWT토큰을 만들어서 응답해주면 됨.
        try {
//            BufferedReader br =request.getReader();
//
//            String input = null;
//            while((input = br.readLine())!=null){
//                System.out.println(input);
//            }
            ObjectMapper om = new ObjectMapper();   //json Parsing 해줌
            User user = om.readValue(request.getInputStream(), User.class);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getUserId(),user.getPassword());
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

        Map<String, Object> headers = new HashMap<>();

        //Header부분 설정
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        //payload부분 설정
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("userId", principalDetails.getUser().getUserId());
        payloads.put("role", principalDetails.getUser().getRole());

        Long expiredTime = 1000 * 60L *30L; //토큰 유효 시간 30분

        Date ext =new Date(); // 토큰 만료 시간
        ext.setTime(ext.getTime() + expiredTime);

        //HS256 방식으로 암호화
        String jwt = Jwts.builder()
                .setSubject("access-token") //토큰 용도
                .setHeader(headers) // header 설정
                .setClaims(payloads) // claims 설정
                .setExpiration(ext) //토큰 만료시간 설정
                .signWith(SignatureAlgorithm.HS256,key.getBytes())  //HS256과 key로 sign
                .compact(); //토큰생성

        response.addHeader("Authorization", "Bearer "+jwt);

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
