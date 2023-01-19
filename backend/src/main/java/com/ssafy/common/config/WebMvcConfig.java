package com.ssafy.common.config;

import com.ssafy.common.interceptor.LoginInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableAspectJAutoProxy	//aop autoproxy 설정
//@ComponentScan(basePackages = {"com.ssafy.common.*.model.*"})	//매퍼 인터페이스 스캔
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer{
    //인터셉터 등록
    private final LoginInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //해당 요청 인터셉트
        registry.addInterceptor(interceptor).addPathPatterns("/books/**");
        //해당 요청을 제외한 나머지 요청들 인터셉트
//		registry.addInterceptor(interceptor).excludePathPatterns("/user/**");
    }

}
