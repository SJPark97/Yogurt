package com.ssafy.common.api.relation.converter;

import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LikesConverter {
    public Likes createLikesRequestDtoToEntity(User user, User seller){
        return Likes.builder()
                .buyer(user)
                .seller(seller)
                .status(RelationStatus.STATUS_ACTIVE)
                .build();
    }
}
