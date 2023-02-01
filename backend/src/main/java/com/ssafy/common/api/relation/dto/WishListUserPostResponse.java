package com.ssafy.common.api.relation.dto;

import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.relation.domain.Wishlist;
import lombok.Getter;

@Getter
public class WishListUserPostResponse {
    private final PostAllResponse post;
    private final Long wishListId;
    public WishListUserPostResponse(Wishlist wishlist){
        wishListId = wishlist.getId();
        post = new PostAllResponse(wishlist.getPost());
    }
}
