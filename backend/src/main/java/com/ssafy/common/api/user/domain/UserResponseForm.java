package com.ssafy.common.api.user.domain;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class UserResponseForm {
    @ApiModelProperty(example="1")
    @ApiParam(value = "Id")
    Long id;
    @ApiModelProperty(example="abcd1234")
    @ApiParam(value = "사용자 id")
    String userId;
    @ApiModelProperty(example="1234")
    @ApiParam(value = "사용자 password")
    String password;
    @ApiModelProperty(example="유저 닉네임")
    @ApiParam(value = "사용자 nickname", type = "String")
    String nickName;
}
