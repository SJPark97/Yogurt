package com.ssafy.common.api.relation.converter;

import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LikesConverter {
    private String status_active = "STATUS_ACTIVE";
    public Likes createLikesRequestDtoToEntity(User user, User seller){
        return Likes.builder()
                .buyer(user)
                .seller(seller)
                .status(status_active)
                .build();
    }
}
