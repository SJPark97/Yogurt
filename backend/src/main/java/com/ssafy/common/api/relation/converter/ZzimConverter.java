package com.ssafy.common.api.relation.converter;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.relation.domain.Zzim;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ZzimConverter {
    private String status_active = "STATUS_ACTIVE";
    private String status_delete = "STATUS_DELETE";
    public Zzim createZzimRequestDtoToEntity(Post post, User user){
        return Zzim.builder()
                .buyer(user)
                .post(post)
                .status(status_active)
                .build();
    }
}
