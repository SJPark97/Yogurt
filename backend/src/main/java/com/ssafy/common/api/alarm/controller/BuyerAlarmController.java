package com.ssafy.common.api.alarm.controller;

import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.alarm.dto.response.BuyerAlarmResponse;
import com.ssafy.common.api.alarm.dto.response.SellerAlarmResponse;
import com.ssafy.common.api.alarm.service.BuyerAlarmService;
import com.ssafy.common.api.alarm.service.SellerAlarmService;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserSellerAlarmResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buyer_alarm")
public class BuyerAlarmController {
    public BuyerAlarmService buyerAlarmService;


    public PostService postService;
    /*
     판매자 알람 ApI

     /seller_alarm/{post_id}/{user_id} , Post
     */
    @PostMapping
    public ResponseEntity<BuyerAlarm> addBuyerAlarmList(){
        User seller_id = postService.getLoginUser();
        return new ResponseEntity<>(buyerAlarmService.saveAlarm(seller_id), HttpStatus.CREATED);
    }

    // 장바구니 상품 삭제
//    @PatchMapping("/{seller_alarm_id}")
//    public ResponseEntity<BuyerAlarmResponse> deleteWishList(@PathVariable("seller_alarm_id") Long seller_alarm_id){
//        return new ResponseEntity<>(buyerAlarmService.deleteSellerAlarm(seller_alarm_id), HttpStatus.OK);
//    }

    // buyer 장바구니 리스트 조회
    // 로그인중인  유저 == buyer , 알림으로 등록된 유저 == seller
//    @GetMapping("")
//    public ResponseEntity<UserBuyerAlarmResponse> userSellerAlarm(){
//        User user = postService.getLoginUser();
//        return new ResponseEntity<>(buyerAlarmService.userBuyerAlarm(user), HttpStatus.OK);
//    }
}
