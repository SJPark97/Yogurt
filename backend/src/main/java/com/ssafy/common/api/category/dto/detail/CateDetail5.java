package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail5 {
    private final Long detail5;
    private final String detail5_image;
    public CateDetail5(Typecategory typecategory){
        detail5 = typecategory.getDetail5();
        detail5_image = typecategory.getDetail5_image();
    }
}
