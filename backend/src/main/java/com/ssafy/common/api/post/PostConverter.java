package com.ssafy.common.api.post;

import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class PostConverter {
    public Post createRequestDtoToEntity(PostInsertRequest request, User user){
        return Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .price(request.getPrice())
                .sale_price(request.getSale_price())
                .status(request.getStatus())
                .seller(user)
                .postImages(request.getPostimages())
                .build();
        }
    }
