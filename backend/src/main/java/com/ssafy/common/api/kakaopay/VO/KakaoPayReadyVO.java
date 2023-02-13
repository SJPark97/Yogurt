package com.ssafy.common.api.kakaopay.VO;

import lombok.Data;

import java.util.Date;

@Data
public class KakaoPayReadyVO {
    //response
    private String tid, next_redirect_pc_url,next_redirect_web_url, next_redirect_app_url;
    private Date created_at;
}
