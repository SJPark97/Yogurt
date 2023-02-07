package com.ssafy.common.api.notice.controller;

import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.notice.dto.request.RequestNoticeForm;
import com.ssafy.common.api.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    /*
     /notice/{sellerId}  ,GET
     sellerId를 가진 판매자의 모든 공지사항을 불러오는 함수
     */
    @GetMapping
    public ResponseEntity<?> getAllNotice(@RequestParam("sellerId") Long sellerId){
        List<Notice> notices = noticeService.getall(sellerId);

        return ResponseEntity.ok(notices);
    }

    /*
     /notice  , POST
     받아온 내용을 기반으로 공지사항 등록
     */
    @PostMapping
    public ResponseEntity<?> addNotice(@RequestBody RequestNoticeForm requestNoticeForm){
        return ResponseEntity.ok(noticeService.save(requestNoticeForm));
    }



    /*
     /notice/{noticeId}  , DELETE
     해당 공지사항을 삭제
     */
    @DeleteMapping
    public ResponseEntity<?> deleteNotice(@RequestParam("noticeId") Long id ){
        noticeService.delete(id);
        return ResponseEntity.ok("Notice deleted");
    }



}
