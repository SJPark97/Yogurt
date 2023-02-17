package com.ssafy.common.api.kakaopay.controller;

import com.ssafy.common.api.kakaopay.VO.KakaoPayApprovalVO;
import com.ssafy.common.api.kakaopay.service.Kakaopay;
import com.ssafy.common.api.kakaopay.dto.KakaoPayRequest;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@RequiredArgsConstructor
public class KakaoController {
    private final PostService postService;



    @Setter(onMethod_ = @Autowired)
    private Kakaopay kakaopay;

    @GetMapping("/kakaoPay")
    public void kakaoPayGet() {
    }
    @PostMapping("/kakaoPay")
    public String kakaoPay(@RequestBody KakaoPayRequest request) {
        log.info("kakaoPay post...............................");
        return kakaopay.kakaoPayReady(request);
    }
    @GetMapping("/kakaoPaySuccess")
    public ResponseEntity<KakaoPayApprovalVO> kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
        log.info("kakaoPaySuccess get...............................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        User buyer = postService.getLoginUser();
        return new ResponseEntity<>(kakaopay.kakaoPayInfo(pg_token,buyer), HttpStatus.OK);
    }
//    @GetMapping("/kakaoPayEnd/{orderId}")
//    public void kakaoPayEnd(@PathVariable("orderId") Long orderId){
//        User buyer = postService.getLoginUser();
//        kakaopay.KakaoPayEnd(buyer, orderId);
//    }
}
