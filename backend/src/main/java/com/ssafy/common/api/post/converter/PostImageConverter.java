package com.ssafy.common.api.post.converter;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.postimage.domain.Postimage;
import org.springframework.stereotype.Component;

@Component
public class PostImageConverter {
    public Postimage createImageRequestDtoToEntity(Postimage image, Post createPost){
        return Postimage.builder()
                .post_id(createPost)
                .url(image.getUrl())
                .build();
    }
}
