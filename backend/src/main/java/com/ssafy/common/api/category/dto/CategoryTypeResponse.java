package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CategoryTypeResponse {
    private final Long id;
    private final String name;
    private final String img;
    private final CateTypeDetailResponse detail;

    public CategoryTypeResponse(Typecategory typecategory){
        id = typecategory.getId();
        name = typecategory.getName();
        img = typecategory.getImg();
        detail = new CateTypeDetailResponse(typecategory);
    }
}
