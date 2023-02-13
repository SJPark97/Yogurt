package com.ssafy.common.api.user.dto.request;


import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequest {

    @ApiParam(value = "사용자 ID", required = true)
    @ApiModelProperty(example = "ABCD1234")
    String userId;

    @ApiParam(value = "사용자 password", required = true)
    @ApiModelProperty(example = "1234")
    String password;
}
