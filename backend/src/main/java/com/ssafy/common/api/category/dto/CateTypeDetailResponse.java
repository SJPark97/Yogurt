package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CateTypeDetailResponse {
    private final Long detail;
    private final String detail_image;

    public CateTypeDetailResponse(Typecategory typecategory, int method_num){
        switch (method_num) {
            case 1:
                detail = typecategory.getDetail1();
                detail_image = typecategory.getDetail1_image();
                break;
            case 2:
                detail = typecategory.getDetail2();
                detail_image = typecategory.getDetail2_image();
                break;
            case 3:
                detail = typecategory.getDetail3();
                detail_image = typecategory.getDetail3_image();
                break;
            case 4:
                detail = typecategory.getDetail4();
                detail_image = typecategory.getDetail4_image();
                break;
            case 5:
                detail = typecategory.getDetail5();
                detail_image = typecategory.getDetail5_image();
                break;
            case 6:
                detail = typecategory.getDetail6();
                detail_image = typecategory.getDetail6_image();
                break;
            case 7:
                detail = typecategory.getDetail7();
                detail_image = typecategory.getDetail7_image();
                break;
            case 8:
                detail = typecategory.getDetail8();
                detail_image = typecategory.getDetail8_image();
                break;
            default:
                detail = null;
                detail_image = null;
                break;
        }
    }
}
