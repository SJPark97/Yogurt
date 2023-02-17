package com.ssafy.common.api.review.controller;

import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.review.dto.ReviewInsertRequest;
import com.ssafy.common.api.review.dto.ReviewResponse;
import com.ssafy.common.api.review.service.ReviewService;
import com.ssafy.common.api.user.dto.response.UserReviewResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
public class ReviewController {
    public final ReviewService reviewService;
    public final PostService postService;

    public ReviewController(ReviewService reviewService,PostService postService) {
        this.reviewService = reviewService;
        this.postService = postService;
    }

    // 판매자 리뷰 생성 API
    @PostMapping("/{postId}")
    public ResponseEntity<ReviewResponse> createReview(@PathVariable("postId") Long postId, @RequestBody ReviewInsertRequest request){
        return new ResponseEntity<>(reviewService.createReview(request, postId), HttpStatus.CREATED);
    }

    // 판매자 리뷰 조회 API
    @GetMapping("/{sellerId}")
    public ResponseEntity<UserReviewResponse> userReview(@PathVariable("sellerId") Long sellerId){
        return new ResponseEntity<>(reviewService.userReview(sellerId),HttpStatus.OK);
    }


}
