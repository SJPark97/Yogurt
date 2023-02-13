package com.ssafy.common.api.notice.service;

import com.ssafy.common.api.notice.converter.NoticeConverter;
import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.notice.dto.NoticeInsertRequest;
import com.ssafy.common.api.notice.dto.NoticeResponse;
import com.ssafy.common.api.notice.repository.NoticeRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserStatus;
import com.ssafy.common.api.user.dto.response.UserNoticeResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class NoticeService {
    private NoticeConverter noticeConverter;
    private NoticeRepository noticeRepository;
    private UserRepository userRepository;

    public NoticeService(NoticeConverter noticeConverter,NoticeRepository noticeRepository,UserRepository userRepository) {
        this.noticeConverter = noticeConverter;
        this.noticeRepository = noticeRepository;
        this.userRepository = userRepository;
    }
    // 공지 생성
    public NoticeResponse createNotice(NoticeInsertRequest request, User user){
        Notice notice = noticeConverter.createNoticeRequestDtoToEntity(request, user);
        Notice create=noticeRepository.save(notice);
        return new NoticeResponse(create);
    }
    // 공지 삭제
    public NoticeResponse deleteNotice(Long noticeId){
        Notice notice = noticeRepository.findById(noticeId).get();
        notice.delete();
        return new NoticeResponse(notice);
    }
    // 판매자 공지 조회
    public UserNoticeResponse userNotice(Long sellerId){
        return userRepository.findById(sellerId)
                .filter(user -> user.getUserStatus()!= UserStatus.DELETE)
                .map(UserNoticeResponse::new)
                .get();
    }
}
