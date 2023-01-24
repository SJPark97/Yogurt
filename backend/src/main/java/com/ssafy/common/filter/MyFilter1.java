package com.ssafy.common.filter;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MyFilter1 implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        //토큰 : ssafy
        /*
            id,pw가 정상적으로 들어와 로그인이 완료 되면 토큰을 만들어주고 응답
            요청할 때마다 header에 Authorization에 value 값으로 토큰을 가지고옴
            그 때 토큰이 내가 만든 토큰인지 검증만 하면 됨.(RSA or HS256)
         */
        if(req.getMethod().equals("POST")) {
            String headerAuth = req.getHeader("Authorization");
            System.out.println("headerAuth : "+ headerAuth);

            if(headerAuth.equals("ssafy")){
                chain.doFilter(req,res);
            }else{
                PrintWriter outPrintWriter = res.getWriter();
                outPrintWriter.println("인증안됨");
            }
        }
        System.out.println("필터1");
        chain.doFilter(req, res);
    }
}
