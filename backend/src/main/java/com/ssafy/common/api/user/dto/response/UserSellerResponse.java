package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

@Getter
public class UserSellerResponse {
    private final Long id;
    private final String NickName;
    private final String description;
    private final String profileImage;
    private final Long likesCount;

    public UserSellerResponse(User user){
        id = user.getId();
        NickName = user.getNickName();
        description= user.getDescription();
        profileImage = user.getProfileImage();
        likesCount = (long) user.getLikess_Seller().size();
    }
}
