package com.ssafy.common.api.review.service;


import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.review.converter.ReviewConverter;
import com.ssafy.common.api.review.domain.Review;
import com.ssafy.common.api.review.dto.ReviewInsertRequest;
import com.ssafy.common.api.review.dto.ReviewResponse;
import com.ssafy.common.api.review.repository.ReviewRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserReviewResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ReviewService {
    private final PostRepository postRepository;
    private final ReviewConverter reviewConverter;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public ReviewService(PostRepository postRepository, ReviewConverter reviewConverter,ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewConverter = reviewConverter;
        this.postRepository = postRepository;
        this.reviewRepository =reviewRepository;
        this.userRepository = userRepository;
    }
    // 판매자 리뷰 생성
    public ReviewResponse createReview(ReviewInsertRequest request, Long postId) {
        Post post = postRepository.findById(postId).get();
        User seller = post.getSeller();
        Review review = reviewConverter.createReviewRequestDtoToEntity(request, seller, post);
        Review create = reviewRepository.save(review);
        return new ReviewResponse(postRepository, create);
    }
    // 판매자 리뷰 조회
    public UserReviewResponse userReview(Long sellerId){
        return new UserReviewResponse(userRepository.findById(sellerId).get(),postRepository);
    }
}
