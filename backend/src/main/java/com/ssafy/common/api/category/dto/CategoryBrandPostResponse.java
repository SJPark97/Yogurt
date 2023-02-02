package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CategoryBrandPostResponse {
    private final Long id;
    private final List<PostAllResponse> postCateList;

    public CategoryBrandPostResponse(Brandcategory brandcategory){
        id = brandcategory.getId();
        postCateList = brandcategory.getPostList()
                .stream().map(post -> new PostAllResponse(post))
                .collect(Collectors.toList());
    }
}
