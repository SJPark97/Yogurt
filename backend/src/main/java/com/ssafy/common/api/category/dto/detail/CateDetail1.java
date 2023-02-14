package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail1 {
    private final Long detail1;
    private final String detail1_image;
    public CateDetail1(Typecategory typecategory){
        detail1 = typecategory.getDetail1();
        detail1_image = typecategory.getDetail1_image();
    }
}
