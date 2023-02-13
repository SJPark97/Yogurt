package com.ssafy.common.api.relation.dto.Likes;

import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.user.dto.response.UserBuyerResponse;
import lombok.Getter;

@Getter
public class LikesUserBuyerResponse {
    private final Long likesId;
    private final UserBuyerResponse buyer;
    private final RelationStatus status;
    public LikesUserBuyerResponse(Likes likes){
        likesId = likes.getId();
        buyer = new UserBuyerResponse(likes.getBuyer());
        status = likes.getStatus();
    }
}
