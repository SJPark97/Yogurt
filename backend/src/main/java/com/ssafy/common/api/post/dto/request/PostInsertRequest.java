package com.ssafy.common.api.post.dto.request;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.post.postimage.domain.Postimage;
import com.ssafy.common.api.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PostInsertRequest {
    private String title;
    private String content;
    private Long price;
    private Long sale_price;
    private String size;
    private Long status;
    private List<Postimage> postImages;
    private Long brandcategoryId;
    private Long typecategoryId;
}
