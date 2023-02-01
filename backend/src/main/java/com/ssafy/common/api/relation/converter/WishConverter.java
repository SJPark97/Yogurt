package com.ssafy.common.api.relation.converter;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WishConverter {
    private String status_active = "STATUS_ACTIVE";
    public Wishlist createWishListRequestDtoToEntitiy(Post post, User user){
        return Wishlist.builder()
                .buyer(user)
                .post(post)
                .status(status_active)
                .build();
    }
}
