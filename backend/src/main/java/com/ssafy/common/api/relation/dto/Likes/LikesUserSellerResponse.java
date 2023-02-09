package com.ssafy.common.api.relation.dto.Likes;

import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.user.dto.UserBuyerResponse;
import com.ssafy.common.api.user.dto.UserSellerResponse;
import lombok.Getter;

@Getter
public class LikesUserSellerResponse {
    private final UserSellerResponse seller;
    private final Long likesId;
    private final RelationStatus status;
    public LikesUserSellerResponse(Likes likes){
        likesId = likes.getId();
        seller = new UserSellerResponse(likes.getSeller());
        status = likes.getStatus();
    }
}
