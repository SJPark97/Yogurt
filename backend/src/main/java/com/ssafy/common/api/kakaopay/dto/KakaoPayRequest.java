package com.ssafy.common.api.kakaopay.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoPayRequest {
    private String totalAmount;
}
