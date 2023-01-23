package com.ssafy.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 됨.
@EnableGlobalMethodSecurity(securedEnabled = true)  //secure 어노테이션 활성화
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //보안을 위해 비밀번호를 인코딩 한 후에 저장할 수 있게 도와줌
    //비밀번호 encode시 bCryptPasswordEncoder.encode(password) 메소드 사용
    @Bean
    public BCryptPasswordEncoder encodePwd(){
        return new BCryptPasswordEncoder();
    }

    private final CorsFilter corsFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//session을 사용하지 않겠다 설정
                .and()
                .addFilter(corsFilter)  //@CrossOrigin(인증X), 시큐리티 필터에 등록인증(O)
                .formLogin().disable()  //기본 Http 폼으로 로그인 막음
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/user/seller/**").access("hasRole('ROLE_SELLER')")
                .antMatchers("/user/buyer/**").access("hasRole('ROLE_BUYER')")
                .anyRequest().permitAll();
    }
}
