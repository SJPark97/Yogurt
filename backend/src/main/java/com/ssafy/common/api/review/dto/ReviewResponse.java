package com.ssafy.common.api.review.dto;

import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.review.domain.Review;
import lombok.Getter;

@Getter
public class ReviewResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final Long sellerId;
    private final PostAllResponse post;
    private final Long rate;

    public ReviewResponse(PostRepository postRepository, Review review) {
        id = review.getId();
        title = review.getTitle();
        content = review.getContent();
        sellerId = review.getSeller().getId();
        rate = review.getRate();
        post= new PostAllResponse(postRepository.findById(review.getId()).get());
    }
}

