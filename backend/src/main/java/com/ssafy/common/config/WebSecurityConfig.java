package com.ssafy.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 됨.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //보안을 위해 비밀번호를 인코딩 한 후에 저장할 수 있게 도와줌
    //비밀번호 encode시 bCryptPasswordEncoder.encode(password) 메소드 사용
    @Bean
    public BCryptPasswordEncoder encodePwd(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                //seller는 seller의 Role이 있어야 인증허가됨
                //buyer는 buyer의 Role이 있어야 인증허가됨
                //만약 해당 권한이 없다면 login이 매핑된 곳으로 이동
                .antMatchers("/user/seller/**").access("hasRole('ROLE_SELLER')")
                .antMatchers("/user/buyer/**").access("hasRole('ROLE_BUYER')")
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage(("/login"))
                .loginProcessingUrl("/login")   //login주소가 호출되면 시큐리티가 로그인 대신 진행해줌
                .defaultSuccessUrl("/");
    }
}
