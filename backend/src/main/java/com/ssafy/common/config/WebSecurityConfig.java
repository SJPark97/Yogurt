package com.ssafy.common.config;

import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.filter.JwtAuthenticationFilter;
import com.ssafy.common.filter.JwtAuthorizationFilter;
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

    private final CorsConfig corsConfig;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    /*
        스프링 시큐리티 처리 configure
        Cors정책을 피하기 위한 corsFilter 사용
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter authenticationFilter = new JwtAuthenticationFilter(authenticationManager(),userRepository,jwtProvider);
        authenticationFilter.setFilterProcessesUrl("/user/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//session을 사용하지 않겠다 설정
                .and()
                .addFilter(corsConfig.corsFilter())  //@CrossOrigin(인증X), 시큐리티 필터에 등록인증(O)
                .formLogin().disable()  //기본 Http 폼으로 로그인 막음
                .httpBasic().disable()
                .addFilter(authenticationFilter)   //AuthenticationManager를 매개변수로 넘겨야함
                .addFilter(new JwtAuthorizationFilter(authenticationManager(),userRepository,jwtProvider))   //AuthenticationManager를 매개변수로 넘겨야함
                .authorizeRequests()
                //.antMatchers("/user/seller/**").access("hasRole('ROLE_SELLER') or hasRole('ROLE_BUYER')")
                .anyRequest().permitAll();
    }
}
