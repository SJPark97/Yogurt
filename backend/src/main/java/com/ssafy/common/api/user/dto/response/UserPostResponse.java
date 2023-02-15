package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.post.domain.PostStatus;
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
                .stream()
                .filter(post -> post.getStatus()!= PostStatus.STATUS_DELETE && post.getStatus()!=PostStatus.STATUS_END)
                .map(post -> new PostAllResponse(post))
                .collect(Collectors.toList());
    }
}
