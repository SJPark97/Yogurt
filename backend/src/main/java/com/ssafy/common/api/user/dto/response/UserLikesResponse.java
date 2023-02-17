package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.relation.dto.Likes.LikesUserBuyerResponse;
import com.ssafy.common.api.relation.dto.Likes.LikesUserSellerResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserLikesResponse
{
    private final Long id;
    private final List<LikesUserBuyerResponse> sellerLikes;
    private final List<LikesUserSellerResponse> buyerLikes;
    public UserLikesResponse(User user){
        id = user.getId();
        sellerLikes = user.getLikess_Seller()
                .stream().filter(likes -> likes.getStatus()!= RelationStatus.STATUS_DELETE).map(likes -> new LikesUserBuyerResponse(likes))
                .collect(Collectors.toList());
        buyerLikes = user.getLikess_Buyer()
                .stream().filter(likes -> likes.getStatus()!= RelationStatus.STATUS_DELETE).map(likes -> new LikesUserSellerResponse(likes))
                .collect(Collectors.toList());
    }
}