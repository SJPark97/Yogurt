package com.ssafy.common.api.kakaopay;

import com.ssafy.common.api.kakaopay.domain.KakaoPayEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KakaoPayRepository extends JpaRepository<KakaoPayEntity, Long> {
}
