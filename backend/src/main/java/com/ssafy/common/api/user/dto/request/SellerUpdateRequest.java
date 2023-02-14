package com.ssafy.common.api.user.dto.request;

import lombok.Getter;

@Getter
public class SellerUpdateRequest {
    private String profileImage;
    private String description;
    private String nickName;
}
