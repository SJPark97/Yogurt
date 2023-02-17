package com.ssafy.common.api.review.converter;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.review.domain.Review;
import com.ssafy.common.api.review.dto.ReviewInsertRequest;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReviewConverter {
    public Review createReviewRequestDtoToEntity(ReviewInsertRequest request, User seller, Post post){
        return Review.builder()
                .id(post.getId())
                .seller(seller)
                .title(request.getTitle())
                .content(request.getContent())
                .rate(request.getRate())
                .build();
    }
}
