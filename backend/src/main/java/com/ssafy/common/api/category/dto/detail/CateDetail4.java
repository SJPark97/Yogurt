package com.ssafy.common.api.category.dto.detail;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateDetail4 {
    private final Long detail4;
    private final String detail4_image;
    public CateDetail4(Typecategory typecategory){
        detail4 = typecategory.getDetail4();
        detail4_image = typecategory.getDetail4_image();
    }
}
