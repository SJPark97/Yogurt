package com.ssafy.common.filter;

public interface JwtProperties {
    String SECRET_KEY="soerhnvoltlshnamerolivmhctsoeirnhmvlotsherloimsehorvtnyhmsertbysretbystreysrtby"; //비밀키
    long AT_EXPIRATION_TIME = 1000 * 60L *60L * 72L; // 만료시간 72시간
    long RT_EXPIRATION_TIME = 1000 * 60L *60L * 72L;    //만료시간 72시간
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    String RT_HEADER_STRING = "Refresh";
}
