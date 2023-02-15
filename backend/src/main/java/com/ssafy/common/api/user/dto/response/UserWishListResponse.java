package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.relation.dto.wishList.WishListUserPostResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Transactional
public class UserWishListResponse {
    private final Long id;
    private final List<WishListUserPostResponse> wishLists;
    public UserWishListResponse(User user){
        id = user.getId();
        wishLists = user.getWishlists()
                .stream().map(wishlist -> new WishListUserPostResponse(wishlist))
                .filter(wishListUserPostResponse -> wishListUserPostResponse.getStatus()!= RelationStatus.STATUS_DELETE)
                .collect(Collectors.toList());
    }
}