package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail8 {
    private final Long detail8;
    private final String detail8_image;
    public CateDetail8(Typecategory typecategory){
        detail8 = typecategory.getDetail8();
        detail8_image = typecategory.getDetail8_image();
    }
}
