package com.ssafy.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Component
public class LoginInterceptor implements HandlerInterceptor {
	final static String SECRET_KEY = "ssafy";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler)
			throws Exception {


		log.debug("요청 메소드 종류 : {}",request.getMethod());
		//OPTIONS 메소드로 넘어오는 preflight 요청은 true로 넘겨줌.
		if(HttpMethod.OPTIONS.matches(request.getMethod()))return true;


		final String token = request.getHeader("access-token");

		//토큰 존재여부 체크
		if(token==null) {
			log.debug("access-token 정보가 없음");
			response.getWriter().append("not Login");
			return false;
		}

		//토큰의 유효성 체크
		try {
			Jwts.parser()
					.setSigningKey(SECRET_KEY.getBytes("UTF-8"))
					.parseClaimsJws(token);
			log.debug("토큰 존재하고 유효하므로 요청 정상 처리");
			return true;

		} catch (Exception e) {
			log.debug("토큰은 존재하나 유효하지 않음.\n 에러내용 : {}",e.getMessage());
			response.getWriter().append("not Login");
			return false;
		}
	}
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
							  @Nullable ModelAndView modelAndView) throws Exception{

	}
}
