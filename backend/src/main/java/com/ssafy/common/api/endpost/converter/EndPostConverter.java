package com.ssafy.common.api.endpost.converter;

import com.ssafy.common.api.endpost.domain.EndPost;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EndPostConverter {
    public EndPost createEndPostRequestDtoToEntity(Post post, User buyer,String address){
        return EndPost.builder()
                .id(post.getId())
                .buyer(buyer)
                .buyerAddress(address)
                .build();
    }
}
