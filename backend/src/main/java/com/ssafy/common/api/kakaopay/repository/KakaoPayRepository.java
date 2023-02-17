package com.ssafy.common.api.kakaopay.repository;

import com.ssafy.common.api.kakaopay.domain.KakaoPayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface KakaoPayRepository extends JpaRepository<KakaoPayEntity, Long> {
    KakaoPayEntity findByTid(String tid);

}
