package com.ssafy.common.api.live.controller;

import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.dto.request.LiveroomRegistForm;
import com.ssafy.common.api.live.service.LiveService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/live")
@RequiredArgsConstructor
public class LiveController {


    private final LiveService liveService;

    /**
     * /live : POST
     * 판매자가 라이브를 등록할때 호출하는 api
     */
    @PostMapping
    @ApiOperation(value= "라이브 룸 등록")
    public ResponseEntity<?>  saveLiveroom ( @RequestBody @NotNull LiveroomRegistForm request){
        System.out.println("make log !!!!!!!!!!!!!!!!!");
        System.out.println("req title"+request.getTitle());
        System.out.println("req thumbnail"+request.getThumbnail());
        System.out.println("req time"+request.getTime().getTime());
        log.info("한글로 쳐도 보여? -----  can you see this?  {}",request);
        LiveRoom liveRoom = liveService.saveLiveroom(request);//=null
        return ResponseEntity.ok(liveRoom);
    }


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
