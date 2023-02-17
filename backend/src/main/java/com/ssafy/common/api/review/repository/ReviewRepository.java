package com.ssafy.common.api.review.repository;

import com.ssafy.common.api.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
