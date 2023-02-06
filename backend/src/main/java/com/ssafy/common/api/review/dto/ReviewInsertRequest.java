package com.ssafy.common.api.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewInsertRequest {
    private String title;
    private String content;
    private Long rate;
}
