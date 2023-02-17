package com.ssafy.common.filter;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.config.JwtProvider;
import com.ssafy.common.config.auth.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.ssafy.common.filter.JwtProperties.*;

// 시큐리티가 filter 가지고 있는데 그 필터중에 BasicAuthenticationFilter라는 것이 있음.
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 거침
// 만약에 권한이 인증이 필요한 주소가 아니라면 위 필터를 안거침
@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, JwtProvider jwtProvider) {
        super(authenticationManager);
        this.userRepository=userRepository;
        this.jwtProvider=jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증이나 권한이 필요한 주소 요청이 됨.");

        String jwtHeader = request.getHeader(HEADER_STRING);
        System.out.println("jwtHeader : " + jwtHeader);
        if(request.getServletPath().equals("/user/login") || request.getServletPath().equals("/user/refresh")) {
            chain.doFilter(request, response);
            return;
        }
        //header가 있는지 확인
        if(jwtHeader == null || !jwtHeader.startsWith(TOKEN_PREFIX)){
            System.out.println("jwtHeader가 제대로 들어오지 않았습니다.");
            chain.doFilter(request,response);
            return;
        }
        try {
            //JWT 토큰을 검증해 정상적인 사용자인지 확인
            //정상이지 않으면 해당 Method /error페이지 반환
            String jwtToken = request.getHeader(HEADER_STRING).replace(TOKEN_PREFIX, "");
            Claims claims = jwtProvider.getClaim(jwtToken);
            String userId = (String) claims.get("userId");

            // 서명이 정상적으로 됨
            if (userId != null) {
                User userInfo = userRepository.findByUserId(userId);

                PrincipalDetails principalDetails = new PrincipalDetails(userInfo);

                //JWT 토큰 서명을 통해 서명이 정상이면 Authentication 객체를 만들어줌
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

                //강제로 시큐리티 세션에 접근해 Authentication 객체를 저장.
                SecurityContextHolder.getContext().setAuthentication(authentication);

                chain.doFilter(request, response);
            }
        }catch(ExpiredJwtException e){
            log.info("Access Token이 만료되었습니다.");
            throw new JwtException("Access Token이 만료되었습니다.");
        }catch (SignatureException e){
            log.info("인증이 실패되었습니다.");
            throw new JwtException("사용자 인증 실패");
        }
    }

}
