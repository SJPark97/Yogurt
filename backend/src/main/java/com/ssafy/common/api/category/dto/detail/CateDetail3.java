package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail3 {
    private final Long detail3;
    private final String detail3_image;
    public CateDetail3(Typecategory typecategory){
        detail3 = typecategory.getDetail3();
        detail3_image = typecategory.getDetail3_image();
    }
}
