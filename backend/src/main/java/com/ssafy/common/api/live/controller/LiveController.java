package com.ssafy.common.api.live.controller;

import com.ssafy.common.api.live.domain.LiveList;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.dto.request.LiveroomRegistForm;
import com.ssafy.common.api.live.dto.response.LivelistResponseForm;
import com.ssafy.common.api.live.dto.response.OnairLiveroomResponseForm;
import com.ssafy.common.api.live.dto.response.SellerLiveroomForm;
import com.ssafy.common.api.live.repository.LiveRepository;
import com.ssafy.common.api.live.service.LiveService;
import com.ssafy.common.api.post.repository.PostRepository;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

import static com.ssafy.common.api.live.domain.LiveRoomStatus.STATUS_CLOSE;
import static com.ssafy.common.api.live.domain.LiveRoomStatus.STATUS_ONAIR;

@RestController
@Slf4j
@RequestMapping("/live")
@RequiredArgsConstructor
public class LiveController {
    private final LiveService liveService;

    /**
     * /live : POST
     * 판매자가 라이브를 등록할때 호출하는 api
     * 라이브 자체의 정보와 (썸네일_thumbnail , 제목_title , 예정시간_time )
     * 라이브 할 상품들(List<postId>)을 LiveList에 등록
     */
    @PostMapping
    @ApiOperation(value= "라이브 룸 등록")
    public ResponseEntity<?>  saveLiveroom ( @RequestBody LiveroomRegistForm request){
        LiveRoom liveRoom =null;
        try{
            log.info(" check req :   {}",request);
            liveRoom = liveService.saveLiveroom(request);
        }
        catch (Exception e){
            // 이미 STATUS_ONAIR 이거나 , STATUS_READY 인 liveroom이 있는 user인 경우
            // 예외 발생
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("succes");
    }


    /**
     * /live/item/{liveId} : GET
     * 라이브를 참여했을때 호출 하는 api.
     * 구매자든 판매자든 현재 라이브에 사용되는 상품(post)들의 id를 불러온다.
     */
    @GetMapping("/item")
    public ResponseEntity<?> getLiveItem (@RequestParam("liveId") Long liveId){
        //DELETE 상태인것들 제외
        List<LivelistResponseForm> livelistResponseFormList = liveService.getItems(liveId);
        return ResponseEntity.ok(livelistResponseFormList);
    }


    /**
     * /live : GET
     * 라이브 예정 , 라이브 중인것들 조회
     * 메인페이지에서 해당하는 라이브들(LiveRoom) 조회
     *  OnairLiveroomResponseForm
     *  id = Long id
     *  time =  Timestamp time
     *  title = String title
     *  thumbnail = String thumbnail
     *  sellerId = Long sellerId
     */
    @GetMapping("/getall")
    public ResponseEntity<?> getAll(){
        List<OnairLiveroomResponseForm> getall = liveService.getall();
        return ResponseEntity.ok(getall);
    }

    /**
     * /live/{sellerId} : GET
     * 판매자의 라이브 조회
     * 판매자와 조인되는 라이브예정 혹은 라이브 상태인
     * 라이브룸(LiveRoom)을 조회
     */
    @GetMapping
    public ResponseEntity<?> getSellerLiveroom(@RequestParam("sellerId") Long sellerId ){

        try {
            List<SellerLiveroomForm> sellerLiveroomFormList = liveService.getSellersLiveroom(sellerId);
            if (sellerLiveroomFormList.size()==0) {
                return ResponseEntity.ok("no live");
            }
            else{
                return ResponseEntity.ok(sellerLiveroomFormList);

            }

        }catch (NoSuchElementException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }


    /**
     * /live/onair/{liveId} : PATCH
     * 라이브룸(LiveRoom)의 상태(live_status)를
     * 라이브 중상태(onair)로 바꾸는 api
     */
    @PatchMapping("/onair")
    public ResponseEntity<?> onair (@RequestParam("liveId") Long id){
        try{
            liveService.changeStatus(STATUS_ONAIR,id);
        }
        catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(STATUS_ONAIR);
    }

    /**
     * /live/close/{liveId} : PATCH
     * 라이브룸(LiveRoom)의 상태(live_status)를
     * 라이브 종료상태(close)로 바꾸는 api
     */
    @PatchMapping("/close")
    public ResponseEntity<?> close (@RequestParam("id") Long id){
        try {
            liveService.changeStatus(STATUS_CLOSE,id);
        }
        catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(STATUS_CLOSE);
    }
}
