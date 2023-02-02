package com.ssafy.common.filter;

public interface JwtProperties {
    String SECRET_KEY="soerhnvoltlshnamerolivmhctsoeirnhmvlotsherloimsehorvtnyhmsertbysretbystreysrtby"; //비밀키
    long EXPIRATION_TIME = 1000 * 60L *30L; // 만료시간 30분
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
