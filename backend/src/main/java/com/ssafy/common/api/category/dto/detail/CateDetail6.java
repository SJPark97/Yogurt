package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail6 {
    private final Long detail6;
    private final String detail6_image;
    public CateDetail6(Typecategory typecategory){
        detail6 = typecategory.getDetail6();
        detail6_image = typecategory.getDetail6_image();
    }
}
