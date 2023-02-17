package com.ssafy.common.api.category.dto;

import com.ssafy.common.api.category.typecategory.Typecategory;
import lombok.Getter;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Getter
public class CategoryTypeResponse {
    private final Long id;
    private final String name;
    private final String img;
    private final List<CateTypeDetailResponse> detail;

    public CategoryTypeResponse(Typecategory typecategory){
        id = typecategory.getId();
        name = typecategory.getName();
        img = typecategory.getImg();
        List<CateTypeDetailResponse> list = new ArrayList<>();
        for (int x=1 ; x<= 8; x++){
            list.add(new CateTypeDetailResponse(typecategory, x));
        }
        detail = list;
    }
}
