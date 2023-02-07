package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

@Getter
public class CategoryTypeResponse {
    private final Long id;
    private final String name;
    private final String img;
    private final Long detail1;
    private final String detail1_image;
    private final Long detail2;
    private final String detail2_image;
    private final Long detail3;
    private final String detail3_image;
    private final Long detail4;
    private final String detail4_image;
    private final Long detail5;
    private final String detail5_image;
    private final Long detail6;
    private final String detail6_image;
    private final Long detail7;
    private final String detail7_image;
    private final Long detail8;
    private final String detail8_image;

    public CategoryTypeResponse(Typecategory typecategory){
        id = typecategory.getId();
        name = typecategory.getName();
        img = typecategory.getImg();
        detail1 = typecategory.getDetail1();
        detail1_image = typecategory.getDetail1_image();
        detail2 = typecategory.getDetail2();
        detail2_image= typecategory.getDetail2_image();
        detail3 = typecategory.getDetail3();
        detail3_image = typecategory.getDetail3_image();
        detail4 = typecategory.getDetail4();
        detail4_image = typecategory.getDetail4_image();
        detail5 = typecategory.getDetail5();
        detail5_image = typecategory.getDetail5_image();
        detail6 = typecategory.getDetail6();
        detail6_image = typecategory.getDetail6_image();
        detail7 = typecategory.getDetail7();
        detail7_image = typecategory.getDetail7_image();
        detail8 = typecategory.getDetail8();
        detail8_image = typecategory.getDetail8_image();
    }
}
