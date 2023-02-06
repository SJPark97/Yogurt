package com.ssafy.common.api.category.dto;


import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CategoryTypePostResponse {
    private final Long id;
    private final List<PostAllResponse> postCateList;
    public CategoryTypePostResponse(Typecategory typecategory){
        id = typecategory.getId();
        postCateList = typecategory.getPostList()
                .stream().map(postCateList -> new PostAllResponse(postCateList))
                .collect(Collectors.toList());
    }
}
