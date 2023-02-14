package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.dto.detail.*;
import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateTypeDetailResponse {
    public final CateDetail1 cateDetail1;
    public final CateDetail2 cateDetail2;
    public final CateDetail3 cateDetail3;
    public final CateDetail4 cateDetail4;
    public final CateDetail5 cateDetail5;
    public final CateDetail6 cateDetail6;
    public final CateDetail7 cateDetail7;
    public final CateDetail8 cateDetail8;

    public CateTypeDetailResponse(Typecategory typecategory){
        cateDetail1 = new CateDetail1(typecategory);
        cateDetail2 = new CateDetail2(typecategory);
        cateDetail3 = new CateDetail3(typecategory);
        cateDetail4 = new CateDetail4(typecategory);
        cateDetail5 = new CateDetail5(typecategory);
        cateDetail6 = new CateDetail6(typecategory);
        cateDetail7 = new CateDetail7(typecategory);
        cateDetail8 = new CateDetail8(typecategory);
    }
}
