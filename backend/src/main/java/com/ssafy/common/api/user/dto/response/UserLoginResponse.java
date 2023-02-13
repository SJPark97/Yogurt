package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.user.domain.UserRole;
import lombok.Getter;

@Getter
public class UserLoginResponse {
    private final Long id;
    private final String userId;
    private final UserRole role;
    private final String nickName;

    public UserLoginResponse(Long id, String userId, UserRole role, String nickname) {
        this.id = id;
        this.userId = userId;
        this.role = role;
        this.nickName = nickname;
    }
}
