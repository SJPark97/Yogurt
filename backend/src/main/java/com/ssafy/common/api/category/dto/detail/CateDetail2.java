package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail2 {
    private final Long detail2;
    private final String detail2_image;
    public CateDetail2(Typecategory typecategory){
        detail2 = typecategory.getDetail2();
        detail2_image = typecategory.getDetail2_image();
    }
}
