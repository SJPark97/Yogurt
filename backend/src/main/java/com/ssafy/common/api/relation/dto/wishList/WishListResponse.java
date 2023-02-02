package com.ssafy.common.api.relation.dto.wishList;

import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.relation.domain.Wishlist;
import lombok.Builder;
import lombok.Getter;

@Getter
public class WishListResponse {
    private final Long id;
    private final Long buyerId;
    private final Long postId;
    private final RelationStatus status;

    public WishListResponse(Wishlist wishlist){
        id = wishlist.getId();
        buyerId = wishlist.getBuyer().getId();
        postId = wishlist.getPost().getId();
        status = wishlist.getStatus();
    }
}
