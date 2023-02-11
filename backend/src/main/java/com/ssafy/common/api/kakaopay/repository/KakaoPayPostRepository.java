package com.ssafy.common.api.kakaopay.repository;

import com.ssafy.common.api.kakaopay.domain.KakaoPayPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KakaoPayPostRepository extends JpaRepository<KakaoPayPost,Long> {
}
