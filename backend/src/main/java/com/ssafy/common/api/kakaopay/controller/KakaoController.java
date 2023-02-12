package com.ssafy.common.api.kakaopay.controller;

import com.ssafy.common.api.kakaopay.VO.KakaoPayApprovalVO;
import com.ssafy.common.api.kakaopay.service.Kakaopay;
import com.ssafy.common.api.kakaopay.dto.KakaoPayRequest;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
public class KakaoController {
    @Setter(onMethod_ = @Autowired)
    private Kakaopay kakaopay;

    @GetMapping("/kakaoPay")
    public void kakaoPayGet() {
    }
    @PostMapping("/kakaoPay")
    public String kakaoPay(@RequestBody KakaoPayRequest request) {
        log.info("kakaoPay post...............................");
        return "redirect:" + kakaopay.kakaoPayReady(request);
    }
    @GetMapping("/kakaoPaySuccess")
    public ResponseEntity<KakaoPayApprovalVO> kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
        log.info("kakaoPaySuccess get...............................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        return new ResponseEntity<>(kakaopay.kakaoPayInfo(pg_token), HttpStatus.OK);
    }
    @GetMapping("/kakaoPayEnd")
    public void kakaoPayEnd(){
        kakaopay.KakaopayEnd();
    }
}
