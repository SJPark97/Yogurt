package com.ssafy.common.api.user.dto;

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
    private final List<LikesUserSellerResponse> sellerLikes;
    private final List<LikesUserBuyerResponse> buyerLikes;
    public UserLikesResponse(User user){
        id = user.getId();
        sellerLikes = user.getLikess_Seller()
                .stream().map(likes -> new LikesUserSellerResponse(likes))
                .collect(Collectors.toList());
        buyerLikes = user.getLikess_Buyer()
                .stream().map(likes -> new LikesUserBuyerResponse(likes))
                .collect(Collectors.toList());
    }
}