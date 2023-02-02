package com.ssafy.common.api.live.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/live")
public class LiveController {

    /**
     * /live : POST
     * 판매자가 라이브를 등록할때 호출하는 api
     *
     */
//    @PostMapping
//    public String

    /**
     * /live/item/{liveId} : GET
     * 라이브를 참여했을때 호출 하는 api.
     * 구매자든 판매자든 현재 라이브에 사용되는 상품(post)들의 id를 불러온다.
     *
     */
//    @GetMapping

    /**
     * /live : GET
     * 라이브 예정 , 라이브 중인것들 조회
     * 메인페이지에서 해당하는 라이브들(LiveRoom) 조회
     */


    /**
     * /live/{sellerId} : GET
     * 판매자의 라이브 조회
     * 판매자와 조인되는 라이브예정 혹은 라이브 상태인
     * 라이브룸(LiveRoom)을 조회
     */


    /**
     * /live/onair/{liveId} : PATCH
     * 라이브룸(LiveRoom)의 상태(live_status)를
     * 라이브 중상태(onair)로 바꾸는 api
     */

    /**
     * /live/close/{liveId} : PATCH
     * 라이브룸(LiveRoom)의 상태(live_status)를
     * 라이브 종료상태(close)로 바꾸는 api
     */


}
