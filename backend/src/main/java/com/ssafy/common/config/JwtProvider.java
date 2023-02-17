package com.ssafy.common.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.ssafy.common.filter.JwtProperties.*;

@Configuration
public class JwtProvider {
    public String createAccessToken(String userId, Enum role) {
        Map<String, Object> headers = new HashMap<>();

        //Header부분 설정
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        //payload부분 설정
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("userId", userId);
        payloads.put("role", role);

        long atExpiredTime = AT_EXPIRATION_TIME; //토큰 유효 시간 30분

        Date atExt = new Date(); // 토큰 만료 시간
        atExt.setTime(atExt.getTime() + atExpiredTime);

        String jwt = Jwts.builder()
                .setSubject("access-token") //토큰 용도
                .setHeader(headers) // header 설정
                .setClaims(payloads) // claims 설정
                .setExpiration(atExt) //토큰 만료시간 설정
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())  //HS256과 key로 sign
                .compact(); //토큰생성
        return jwt;
    }


    public String createRefreshToken(String userId, Enum role) {
        Map<String, Object> headers = new HashMap<>();

        //Header부분 설정
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        //payload부분 설정
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("userId", userId);
        payloads.put("role", role);

        long rtExpiredTime = RT_EXPIRATION_TIME; //토큰 유효 시간 30분

        Date atExt = new Date(); // 토큰 만료 시간
        atExt.setTime(atExt.getTime() + rtExpiredTime);

        String jwt = Jwts.builder()
                .setSubject("refresh-token") //토큰 용도
                .setHeader(headers) // header 설정
                .setClaims(payloads) // claims 설정
                .setExpiration(atExt) //토큰 만료시간 설정
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())  //HS256과 key로 sign
                .compact(); //토큰생성
        return jwt;
    }

    public Claims getClaim(String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
