package com.ssafy.common.api.user.domain;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseForm {
    @ApiModelProperty(example="1")
    @ApiParam(value = "Id")
    Long id;
    @ApiModelProperty(example="27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰")
    @ApiParam(value = "판매자 설명")
    String description;
    @ApiModelProperty(example="1234")
    @ApiParam(value = "사용자 password")
    String profileImage;

//    @ApiModelProperty(example = "1500")
//    @ApiParam(value = "사용자 즐겨찾기수")
//    int likesSize;

    @ApiModelProperty(example="유저 닉네임")
    @ApiParam(value = "사용자 nickname", type = "String")
    String nickName;
}
