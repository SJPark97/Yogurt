package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.endpost.dto.EndPostUserPostResponse;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserEndPostResponse {
    private final Long id;
    private final List<EndPostUserPostResponse> endPosts;

    public UserEndPostResponse(User user, PostRepository postRepository) {
        id = user.getId();
        endPosts = user.getEndPosts()
                .stream().map(EndPost-> new EndPostUserPostResponse(EndPost,postRepository))
                .collect(Collectors.toList());
    }
}
