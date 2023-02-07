package com.ssafy.common.api.live.repository;

import com.ssafy.common.api.live.domain.LiveList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface LiveItemRepository extends JpaRepository <LiveList ,Long> {
}
