package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.review.dto.ReviewResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserReviewResponse {
    private final Long id;
    private final List<ReviewResponse> reviews;
    public UserReviewResponse(User user, PostRepository postRepository){
        id = user.getId();
        reviews = user.getReviews()
                .stream().map(review-> new ReviewResponse(postRepository,review))
                .collect(Collectors.toList());
    }
}
