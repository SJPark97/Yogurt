package com.ssafy.common.api.notice.service;


import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.notice.dto.request.RequestNoticeForm;
import com.ssafy.common.api.notice.repository.NoticeRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.config.auth.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.sql.Timestamp;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
public class NoticeService {
    private  final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }


    // requestNoticeForm 을 인자로 새로운 notice 등록
    public Notice save(RequestNoticeForm requestNoticeForm) {
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        Notice notice = new Notice();
        notice=notice.builder()
                .notice_content(requestNoticeForm.getContent())
                .notice_title(requestNoticeForm.getTitle())
                .notice_createtime(ts)
                .seller(getLoginUser())
                .build();
        noticeRepository.save(notice);
        return notice;
    }

    // sellerId 를 인자로 매칭되는 Notice를 검색 후 리턴
    public List<Notice> getall(Long sellerId) {

        return null;
    }

    //noticeId를 인자로 해당 notice삭제
    public void delete(Long id) {

    }

    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        log.info("principal : {}",principal.getUser());
        return principal.getUser();
    }

}
