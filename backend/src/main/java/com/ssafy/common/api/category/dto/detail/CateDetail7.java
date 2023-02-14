package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail7 {
    private final Long detail7;
    private final String detail7_image;
    public CateDetail7(Typecategory typecategory){
        detail7 = typecategory.getDetail7();
        detail7_image = typecategory.getDetail7_image();
    }
}
