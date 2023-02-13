package com.ssafy.common.api.alarm.controller;

import com.ssafy.common.api.alarm.dto.response.BuyerAlarmResponse;
import com.ssafy.common.api.alarm.service.BuyerAlarmService;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserBuyerAlarmResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buyer_alarm")
@RequiredArgsConstructor
@Slf4j
public class BuyerAlarmController {
    public final BuyerAlarmService buyerAlarmService;


    public final PostService postService;
    /*
     판매자 알람 ApI
      판매자에게 가는 알람
     /seller_alarm/{post_id}/{user_id} , Post
     */
    @PostMapping
    public ResponseEntity<?> addBuyerAlarmList(){
        log.info("---------------before get loginuser !!!!!!  -------------------------");
        User seller = postService.getLoginUser();
        log.info("---------------after get loginuser !!!!!!  -------------------------");
        buyerAlarmService.saveAlarm(seller);
        log.info("---------------after save alarm !!!!!!  -------------------------");
        return new ResponseEntity<>( HttpStatus.CREATED);
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
