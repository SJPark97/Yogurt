package com.ssafy.common.api.relation.dto.Likes;

import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.user.dto.UserBuyerResponse;
import com.ssafy.common.api.user.dto.UserSellerResponse;
import lombok.Getter;

@Getter
public class LikesUserResponse {
    private final UserSellerResponse seller;
    private final Long likesId;
    private final UserBuyerResponse buyer;
    public LikesUserResponse(Likes likes){
        likesId = likes.getId();
        seller = new UserSellerResponse(likes.getSeller());
        buyer = new UserBuyerResponse(likes.getBuyer());
    }
}
