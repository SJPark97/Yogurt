package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

@Getter
public class UserBuyerResponse {
    private final Long id;
    public UserBuyerResponse(User user){
        id = user.getId();
    }
}
