package com.ssafy.common.api.user.dto;

import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Transactional
@Getter
public class UserPostResponse {
    private final Long id;
    private final List<PostAllResponse> posts;
    public UserPostResponse(User user){
        id = user.getId();
        posts = user.getPosts()
                .stream().map(post -> new PostAllResponse(post))
                .collect(Collectors.toList());
    }
}
