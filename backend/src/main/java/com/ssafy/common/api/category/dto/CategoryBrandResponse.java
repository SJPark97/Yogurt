package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import lombok.Getter;

@Getter
public class CategoryBrandResponse {
    private final Long id;
    private final String name;
    private final String img;

    public CategoryBrandResponse(Brandcategory brandcategory){
        id = brandcategory.getId();
        name = brandcategory.getName();
        img = brandcategory.getImg();
    }
}
