package com.ssafy.common.api.notice.repository;

import com.ssafy.common.api.notice.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface NoticeRepository extends JpaRepository<Notice , Long> {

}
