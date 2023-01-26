package com.ssafy.common.api.post.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostUpdateRequest {
    private String title;
    private String content;
    private Long price;
    private Long sale_price;
    private String size;
    private Long status;
}
