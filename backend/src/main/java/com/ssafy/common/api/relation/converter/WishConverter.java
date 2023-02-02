package com.ssafy.common.api.relation.converter;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WishConverter {
    public Wishlist createWishListRequestDtoToEntitiy(Post post, User user){
        return Wishlist.builder()
                .buyer(user)
                .post(post)
                .status(RelationStatus.STATUS_ACTIVE)
                .build();
    }
}
