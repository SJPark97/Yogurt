package com.ssafy.common.api.post.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;


@Getter
@Builder
public class PostInsertRequest {
    private String title;
    private String content;
    private Long price;
    private Long sale_price;
    private String size;
    private List<String> postImages;
    private Long brandcategoryId;
    private Long typecategoryId;
    private Long typeDetailId;
}
