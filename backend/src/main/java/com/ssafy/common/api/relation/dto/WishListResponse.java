package com.ssafy.common.api.relation.dto;

import com.ssafy.common.api.relation.domain.Wishlist;
import lombok.Builder;
import lombok.Getter;

@Getter
public class WishListResponse {
    private final Long id;
    private final Long buyerId;
    private final Long postId;
    private final String status;

    @Builder
    public WishListResponse(Long id, Long buyerId, Long postId, String status) {
        this.id = id;
        this.buyerId = buyerId;
        this.postId = postId;
        this.status = status;
    }
    public WishListResponse(Wishlist wishlist){
        id = wishlist.getId();
        buyerId = wishlist.getBuyer().getId();
        postId = wishlist.getPost().getId();
        status = wishlist.getStatus();
    }
}
