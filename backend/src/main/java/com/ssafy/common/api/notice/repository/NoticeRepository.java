package com.ssafy.common.api.notice.repository;

import com.ssafy.common.api.notice.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
