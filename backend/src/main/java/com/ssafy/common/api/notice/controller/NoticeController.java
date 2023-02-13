package com.ssafy.common.api.notice.controller;

import com.ssafy.common.api.notice.dto.NoticeInsertRequest;
import com.ssafy.common.api.notice.dto.NoticeResponse;
import com.ssafy.common.api.notice.service.NoticeService;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserNoticeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    public NoticeService noticeService;
    public PostService postService;


    public NoticeController(NoticeService noticeService, PostService postService) {
        this.noticeService = noticeService;
        this.postService =postService;
    }
    // 공지 생성 API
    @PostMapping("")
    public ResponseEntity<NoticeResponse> createNotice(@RequestBody NoticeInsertRequest request) {
        User user = postService.getLoginUser();
        return new ResponseEntity<>(noticeService.createNotice(request, user), HttpStatus.CREATED);
    }
    // 공지 삭제 API
    @PatchMapping("/{noticeId}")
    public ResponseEntity<NoticeResponse> delNotice(@PathVariable("noticeId") Long noticeId){
        return new ResponseEntity<>(noticeService.deleteNotice(noticeId), HttpStatus.CREATED);
    }
    // 판매자 공지 리스트 조회 API
    @GetMapping("/{sellerId}")
    public ResponseEntity<UserNoticeResponse> userNotice(@PathVariable("sellerId") Long sellerId) {
        //DELETE상태인것들 필터링
        return new ResponseEntity<>(noticeService.userNotice(sellerId), HttpStatus.OK);
    }

}
