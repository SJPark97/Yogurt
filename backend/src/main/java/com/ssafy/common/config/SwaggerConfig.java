package com.ssafy.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.PathProvider;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.data.rest.BasePathAwareServicesProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
        @Bean
        public Docket api() {

            //api 정보 설정
            final ApiInfo apiInfo = new ApiInfoBuilder()
                    .title("Yogurt 관리 API")
                    .description("<h3>유저 관리에서 사용되는 RestApi에 대한 문서를 제공한다.</h3>")
                    .version("1.0")
                    .build();

            return new Docket(DocumentationType.SWAGGER_2)    //스웨거 타입으로 문서화
                    .apiInfo(apiInfo)//위에서 설정한 정보를 통해 문서화
                    .securityContexts(Arrays.asList(securityContext()))
                    .securitySchemes(Arrays.asList(apiKey()))
                    .select()
                    .apis(RequestHandlerSelectors.basePackage("com.ssafy.common.api"))    //문서화할 컨트롤러가 있는 패키지
                    .paths(PathSelectors.any())    //위 패키지의 컨트롤러에 매핑된 것중 해당 url의 요청만 문서화
                    .build();
    }
    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }

    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }
}
