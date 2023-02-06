package com.ssafy.common.api.user.dto;

import com.ssafy.common.api.relation.dto.Likes.LikesUserResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserLikesResponse
{
    private Long id;
    private final List<LikesUserResponse> likes;
    public UserLikesResponse(User user){
        id = user.getId();
        likes = user.getLikess_Seller()
                .stream().map(likes -> new LikesUserResponse(likes))
                .collect(Collectors.toList());

    }
}