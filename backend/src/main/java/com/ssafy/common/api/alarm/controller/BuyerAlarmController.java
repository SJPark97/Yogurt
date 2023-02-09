package com.ssafy.common.api.alarm.controller;

import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.alarm.dto.response.BuyerAlarmResponse;
import com.ssafy.common.api.alarm.dto.response.SellerAlarmResponse;
import com.ssafy.common.api.alarm.service.BuyerAlarmService;
import com.ssafy.common.api.alarm.service.SellerAlarmService;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserBuyerAlarmResponse;
import com.ssafy.common.api.user.dto.UserSellerAlarmResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buyer_alarm")
@RequiredArgsConstructor
public class BuyerAlarmController {
    public final BuyerAlarmService buyerAlarmService;


    public final PostService postService;
    /*
     판매자 알람 ApI

     /seller_alarm/{post_id}/{user_id} , Post
     */
    @PostMapping
    public ResponseEntity<List<BuyerAlarm>> addBuyerAlarmList(){
        User seller = postService.getLoginUser();
        return new ResponseEntity<>(buyerAlarmService.saveAlarm(seller), HttpStatus.CREATED);
    }

    //  구매자 알람 삭제
    @PatchMapping("/{buyer_alarm_id}")
    public ResponseEntity<BuyerAlarmResponse> deleteWishList(@PathVariable("buyer_alarm_id") Long buyer_alarm_id){
        return new ResponseEntity<>(buyerAlarmService.deleteBuyerAlarm(buyer_alarm_id), HttpStatus.OK);
    }

    // buyer 장바구니 리스트 조회
    // 로그인중인  유저 == buyer , 알림으로 등록된 유저 == seller
    @GetMapping("")
    public ResponseEntity<UserBuyerAlarmResponse> userBuyerAlarm(){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(buyerAlarmService.userBuyerAlarm(user), HttpStatus.OK);
    }
}
