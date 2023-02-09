package com.ssafy.common.api.user.dto;

import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

@Getter
public class UserBuyerResponse {
    private final Long id;
    private final String NickName;
    private final String description;
    private final String profileImage;
    private final Long likesCount;
    public UserBuyerResponse(User user){
        id = user.getId();
        NickName = user.getNickName();
        description= user.getDescription();
        profileImage = user.getProfileImage();
        likesCount = user.getLikess_Seller().stream().count();
    }
}
