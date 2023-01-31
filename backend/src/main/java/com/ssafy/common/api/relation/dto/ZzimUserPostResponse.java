package com.ssafy.common.api.relation.dto;


import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.relation.domain.Zzim;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Getter
public class ZzimUserPostResponse {
    private final PostAllResponse post;
    private final Long zzimId;
    public ZzimUserPostResponse(Zzim zzim) {
        zzimId = zzim.getId();
        post = new PostAllResponse(zzim.getPost());
    }
}
