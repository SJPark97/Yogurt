package com.ssafy.common.api.live.service;

import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.domain.LiveRoomStatus;
import com.ssafy.common.api.live.dto.request.LiveroomRegistForm;
import com.ssafy.common.api.live.repository.LiveRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import static com.ssafy.common.api.live.domain.LiveRoomStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class LiveService {

    public final LiveRepository liveRepository;
    // 라이브 등록
    // time , title , thumbnail 은 requset로 받았고
    // status , created , sellerId는 내가 만들어서 생성
    public LiveRoom saveLiveroom (@NotNull LiveroomRegistForm request ) throws Exception {
        LiveRoom liveRoom = new LiveRoom();
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        // DB에 해당 유저(판매자)가 이미 개설한 라이브 룸(liveroom)이 있는지 확인
        List<LiveRoom> liveRooms = liveRepository.findAllBySeller(getLoginUser());
        for (LiveRoom liveRoom1: liveRooms) {
            if(liveRoom1.getStatus()!=STATUS_CLOSE){
                log.info("status : {}  ,  id : {}",liveRoom1.getStatus(),liveRoom1.getId());
                throw new Exception("already exists Liveroom as STATUS_ONAIR or STATUS_READY");
            }
        }

        liveRoom= liveRoom.builder()
                .thumbnail(request.getThumbnail())
                .title(request.getTitle())
                .time(request.getTime())
                .status(STATUS_READY)
                .created(ts)
                .seller(getLoginUser())
                .build();
        // 생성된 liveroom 확인
        log.info("--------------- created liveroom id ---------------- :  {}",liveRoom.getSeller().getId() );
        return liveRepository.save(liveRoom);
    }


    //현재 모든 라이브룸(liveroom)중에서 방송중(STATUS_ONAIR)인 라이브룸 전부 조회
    public  List<LiveRoom> getall(){
//        List<LiveRoom> liveRooms = liveRepository.findAll();
//        log.info("liverooms count : {}",liveRooms.size());
//        for (int i=liveRooms.size()-1 ; i>=0 ; i--  ) {
//            LiveRoom liveRoom = liveRooms.get(i);
//            log.info("liveroom id : {}  , i value : {} ",liveRoom.getId(),i);
//            if(liveRoom.getStatus()!=STATUS_ONAIR){
//                liveRooms.remove(i);
//            }
//        }
//        log.info("livroom 순찰끝 ");
//        return liveRooms;
        return null;
    }



    @Transactional
    // 인자로 받아온 status , keyword 로 현재 상태 변경
    public LiveRoomStatus changeStatus(LiveRoomStatus status , Long id) throws Exception {
        LiveRoom liveRoom = liveRepository.findById(id).get();
        log.info("before  status :  {}",liveRoom.getStatus() );
        if(!checkCorrectStatus(status, liveRoom.getStatus() )){
            throw new Exception("Incorrect Liveroom STATUS , check your liverooms ");
        }
        liveRoom.update_status(status);
        log.info("after  status :  {}",liveRoom.getStatus() );
        return status;
    }

    // 현재 로그인 한 유저 받아오기
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        log.info("principal : {}",principal.getUser());
        return principal.getUser();
    }

    // 사용자가 라이브예정(STATUS_READY) -> 라이브중(STATUS_ONAIR) 혹은
    // 라이브중(STATUS_ONAIR) -> 라이브종료(STATUS_CLOSE) 과정을 정확하게 거치는지 확인하는 함수
    public boolean checkCorrectStatus(LiveRoomStatus endStatus , LiveRoomStatus reqStatus ){
        if(endStatus==STATUS_CLOSE){
            return  (reqStatus==STATUS_ONAIR)? true :false ;
        }
        else if(endStatus==STATUS_ONAIR) {
            return  (reqStatus==STATUS_READY)? true :false ;
        }
        else{
            return false;
        }
    }
}
