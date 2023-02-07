package com.ssafy.common.api.endpost.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class EndPostRequest {
    private String address;
    private List<Map<String,Long>> postIdList;
}
