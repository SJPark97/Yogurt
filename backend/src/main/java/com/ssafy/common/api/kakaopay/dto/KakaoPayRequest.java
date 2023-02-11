package com.ssafy.common.api.kakaopay.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class  KakaoPayRequest {
    private String totalAmount;
    private String address;
    private List<Map<String,Long>> postIdList;
}
