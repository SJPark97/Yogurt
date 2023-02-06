package com.ssafy.common.api.relation.dto.Likes;

import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.domain.RelationStatus;
import lombok.Getter;

@Getter
public class LikesResponse {
    private final Long id;
    private final Long buyerId;
    private final Long postId;
    private final RelationStatus status;

    public LikesResponse (Likes likes){
        id = likes.getId();
        buyerId = likes.getBuyer().getId();
        postId = likes.getSeller().getId();
        status = likes.getStatus();
    }
}
