package com.ssafy.common.api.endpost.dto;

import com.ssafy.common.api.endpost.domain.EndPost;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.repository.PostRepository;
import lombok.Getter;

@Getter
public class EndPostUserPostResponse {
    private final PostAllResponse post;
    private final Long endpostId;

    public EndPostUserPostResponse(EndPost endpost, PostRepository postRepository){
        endpostId = endpost.getId();
        post = new PostAllResponse(postRepository.findById(endpost.getId()).get());
    }
}
