package com.ssafy.common.api.alarm.controller;

import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.alarm.dto.response.SellerAlarmResponse;
import com.ssafy.common.api.alarm.service.SellerAlarmService;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.relation.dto.wishList.WishListResponse;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserSellerAlarmResponse;
import com.ssafy.common.api.user.dto.UserWishListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller_alarm")
public class SellerAlarmController {
    public SellerAlarmService sellerAlarmService;

    public PostService postService;
    /*
     판매자 알람 ApI
     /seller_alarm/{post_id}/{user_id} , Post
     */
    @PostMapping("/{post_id}/{user_id}")
    public ResponseEntity<SellerAlarm> addWishList(@PathVariable("post_id") Long post_id , @PathVariable("user_id") Long user_id){
        return new ResponseEntity<>(sellerAlarmService.saveAlarm(post_id, user_id), HttpStatus.CREATED);
    }

    // 장바구니 상품 삭제
    @PatchMapping("/{seller_alarm_id}")
    public ResponseEntity<SellerAlarmResponse> deleteWishList(@PathVariable("seller_alarm_id") Long seller_alarm_id){
        return new ResponseEntity<>(sellerAlarmService.deleteSellerAlarm(seller_alarm_id), HttpStatus.OK);
    }

    // buyer 장바구니 리스트 조회
    @GetMapping("")
    public ResponseEntity<UserSellerAlarmResponse> userSellerAlarm(){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(sellerAlarmService.userSellerAlarm(user), HttpStatus.OK);
    }

}
